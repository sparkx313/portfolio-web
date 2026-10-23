"""Summarize transaction CSV amounts by category and save a bar chart."""

from __future__ import annotations

import argparse
import sys
from collections import defaultdict
from decimal import Decimal, InvalidOperation
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

REQUIRED_COLUMNS = {"date", "category", "amount"}


def parse_amount(value: object, row_number: int) -> Decimal:
    if pd.isna(value):
        raise ValueError(f"Row {row_number}: amount is missing.")
    text = str(value).strip().replace(",", "").replace("$", "")
    try:
        amount = Decimal(text)
    except InvalidOperation as exc:
        raise ValueError(f"Row {row_number}: amount '{value}' is not numeric.") from exc
    if not amount.is_finite():
        raise ValueError(f"Row {row_number}: amount must be finite.")
    return amount


def generate_expense_report(
    input_file: Path,
    output_file: Path,
    chart_file: Path,
    currency: str = "amount units",
) -> pd.DataFrame:
    paths = [path.resolve() for path in (output_file, chart_file)]
    if input_file.resolve() in paths:
        raise ValueError("An output path must not overwrite the input CSV.")
    if paths[0] == paths[1]:
        raise ValueError("The summary CSV and chart paths must differ.")
    if not input_file.is_file():
        raise ValueError(f"Input transaction CSV does not exist: {input_file}")

    data = pd.read_csv(input_file)
    missing = REQUIRED_COLUMNS - set(data.columns)
    if missing:
        raise ValueError("CSV is missing required column(s): " + ", ".join(sorted(missing)))
    if data.empty:
        raise ValueError("Transaction CSV contains no data rows.")

    categories = data["category"].astype("string").str.strip()
    dates = pd.to_datetime(data["date"], format="%Y-%m-%d", errors="coerce")
    if categories.isna().any() or categories.eq("").any():
        raise ValueError("Every transaction needs a non-empty category.")
    if dates.isna().any():
        raise ValueError("Dates must be valid ISO dates in YYYY-MM-DD format.")

    totals: defaultdict[str, Decimal] = defaultdict(Decimal)
    counts: defaultdict[str, int] = defaultdict(int)
    for row_number, (category, value) in enumerate(zip(categories, data["amount"], strict=True), start=2):
        totals[str(category)] += parse_amount(value, row_number)
        counts[str(category)] += 1

    report = pd.DataFrame(
        [
            {
                "category": category,
                "transaction_count": counts[category],
                "net_amount": format(total, "f"),
            }
            for category, total in sorted(totals.items())
        ]
    )
    for path in (output_file, chart_file):
        path.parent.mkdir(parents=True, exist_ok=True)
    report.to_csv(output_file, index=False)

    chart_data = sorted(totals.items(), key=lambda entry: (entry[1], entry[0]))
    labels = [category for category, _ in chart_data]
    amounts = [float(total) for _, total in chart_data]
    height = max(4.0, 0.45 * len(labels))
    figure, axis = plt.subplots(figsize=(10, height))
    axis.barh(labels, amounts, color="#3977d5")
    axis.set_title("Net transaction amount by category")
    axis.set_xlabel(currency)
    axis.grid(axis="x", alpha=0.2)
    figure.tight_layout()
    figure.savefig(chart_file, dpi=150)
    plt.close(figure)
    return report


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Summarize user-supplied transaction amounts by category."
    )
    parser.add_argument("--input", required=True, type=Path, help="Transaction CSV.")
    parser.add_argument("--output", type=Path, default=Path("expense_summary.csv"))
    parser.add_argument("--chart", type=Path, default=Path("expense_summary.png"))
    parser.add_argument("--currency", default="amount units", help="Axis label for the amount unit.")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    try:
        report = generate_expense_report(
            args.input, args.output, args.chart, currency=args.currency
        )
    except (OSError, ValueError, pd.errors.ParserError, pd.errors.EmptyDataError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2
    print(f"Summarized {len(report)} category(s) from {args.input}")
    print(f"Wrote {args.output} and {args.chart}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
