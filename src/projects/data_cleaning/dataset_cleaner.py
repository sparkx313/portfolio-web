"""Clean a user-supplied CSV without inventing or silently filling data."""

from __future__ import annotations

import argparse
import sys
import tempfile
from pathlib import Path

import pandas as pd


def clean_sales_data(
    input_file: Path,
    output_file: Path,
    drop_duplicates: bool = False,
    drop_empty_rows: bool = False,
) -> tuple[int, int, int]:
    if not input_file.is_file():
        raise ValueError(f"Input CSV does not exist: {input_file}")
    if input_file.resolve() == output_file.resolve():
        raise ValueError("The output path must not overwrite the input CSV.")

    dataframe = pd.read_csv(input_file)
    if dataframe.empty:
        raise ValueError("The input CSV contains no data rows.")

    columns = [str(column).strip() for column in dataframe.columns]
    if any(not column for column in columns):
        raise ValueError("Column names cannot be empty after trimming whitespace.")
    if len(columns) != len(set(columns)):
        raise ValueError("Column names must be unique after trimming whitespace.")
    dataframe.columns = columns

    for column in dataframe.select_dtypes(include=["object", "string"]).columns:
        values = dataframe[column].astype("string").str.strip()
        dataframe[column] = values.replace("", pd.NA)

    original_rows = len(dataframe)
    if drop_duplicates:
        dataframe = dataframe.drop_duplicates()
    if drop_empty_rows:
        dataframe = dataframe.dropna(how="all")
    removed_rows = original_rows - len(dataframe)
    missing_cells = int(dataframe.isna().sum().sum())

    output_file.parent.mkdir(parents=True, exist_ok=True)
    temporary_path: Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            prefix=f".{output_file.stem}.",
            suffix=output_file.suffix or ".csv",
            dir=output_file.parent,
            delete=False,
        ) as temporary:
            temporary_path = Path(temporary.name)
        dataframe.to_csv(temporary_path, index=False)
        temporary_path.replace(output_file)
    finally:
        if temporary_path and temporary_path.exists():
            temporary_path.unlink()

    return original_rows, removed_rows, missing_cells


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Trim CSV headers and text values while preserving missing data."
    )
    parser.add_argument("--input", required=True, type=Path, help="Source CSV file.")
    parser.add_argument("--output", required=True, type=Path, help="Cleaned CSV destination.")
    parser.add_argument(
        "--drop-duplicates",
        action="store_true",
        help="Remove fully duplicate rows after trimming text.",
    )
    parser.add_argument(
        "--drop-empty-rows",
        action="store_true",
        help="Remove rows where every value is missing.",
    )
    return parser


def main() -> int:
    args = build_parser().parse_args()
    try:
        original, removed, missing = clean_sales_data(
            args.input,
            args.output,
            drop_duplicates=args.drop_duplicates,
            drop_empty_rows=args.drop_empty_rows,
        )
    except (OSError, ValueError, pd.errors.ParserError, pd.errors.EmptyDataError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2
    print(f"Read {original} rows; removed {removed}; retained {missing} missing cell(s).")
    print(f"Wrote cleaned CSV to {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
