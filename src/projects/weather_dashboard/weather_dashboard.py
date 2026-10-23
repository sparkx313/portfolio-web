"""Summarize real weather observations from a user-provided CSV."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.dates as mdates
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

REQUIRED_COLUMNS = {"date", "temperature_c", "precipitation_mm"}


def build_weather_dashboard(input_file: Path, chart_file: Path, location: str) -> dict[str, float | int | str]:
    if input_file.resolve() == chart_file.resolve():
        raise ValueError("The chart path must not overwrite the input CSV.")
    if not location.strip():
        raise ValueError("Location label cannot be empty.")
    if not input_file.is_file():
        raise ValueError(f"Weather observations CSV does not exist: {input_file}")
    data = pd.read_csv(input_file)
    missing = REQUIRED_COLUMNS - set(data.columns)
    if missing:
        raise ValueError("CSV is missing required column(s): " + ", ".join(sorted(missing)))
    if data.empty:
        raise ValueError("Weather observations CSV contains no rows.")

    dates = pd.to_datetime(data["date"], format="%Y-%m-%d", errors="coerce")
    temperatures = pd.to_numeric(data["temperature_c"], errors="coerce")
    precipitation = pd.to_numeric(data["precipitation_mm"], errors="coerce")
    valid = (
        dates.notna()
        & temperatures.notna()
        & precipitation.notna()
        & np.isfinite(temperatures)
        & np.isfinite(precipitation)
    )
    if not valid.all():
        raise ValueError(
            f"Found {int((~valid).sum())} row(s) with invalid dates or numeric weather values."
        )
    if (precipitation < 0).any():
        raise ValueError("precipitation_mm cannot be negative.")

    observed = pd.DataFrame(
        {
            "date": dates,
            "temperature_c": temperatures,
            "precipitation_mm": precipitation,
        }
    ).sort_values("date")
    summary: dict[str, float | int | str] = {
        "location": location,
        "observations": int(len(observed)),
        "start_date": observed["date"].min().strftime("%Y-%m-%d"),
        "end_date": observed["date"].max().strftime("%Y-%m-%d"),
        "mean_temperature_c": float(observed["temperature_c"].mean()),
        "minimum_temperature_c": float(observed["temperature_c"].min()),
        "maximum_temperature_c": float(observed["temperature_c"].max()),
        "total_precipitation_mm": float(observed["precipitation_mm"].sum()),
    }

    chart_file.parent.mkdir(parents=True, exist_ok=True)
    figure, (temperature_axis, rain_axis) = plt.subplots(
        2, 1, figsize=(11, 7), sharex=True
    )
    temperature_axis.plot(
        observed["date"], observed["temperature_c"], color="#d65a4a", marker="o"
    )
    temperature_axis.set_ylabel("Temperature (°C)")
    temperature_axis.set_title(f"Weather observations — {location}")
    temperature_axis.grid(alpha=0.2)
    rain_axis.bar(observed["date"], observed["precipitation_mm"], color="#3977d5")
    rain_axis.set_ylabel("Precipitation (mm)")
    rain_axis.grid(axis="y", alpha=0.2)
    date_locator = mdates.AutoDateLocator()
    rain_axis.xaxis.set_major_locator(date_locator)
    rain_axis.xaxis.set_major_formatter(mdates.ConciseDateFormatter(date_locator))
    figure.tight_layout()
    figure.savefig(chart_file, dpi=150)
    plt.close(figure)
    return summary


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Chart weather observations from a supplied CSV; no mock data is created."
    )
    parser.add_argument("--input", required=True, type=Path, help="Weather observations CSV.")
    parser.add_argument("--chart", type=Path, default=Path("weather_dashboard.png"))
    parser.add_argument("--location", required=True, help="Location label for the chart.")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    try:
        summary = build_weather_dashboard(args.input, args.chart, args.location)
    except (OSError, ValueError, pd.errors.ParserError, pd.errors.EmptyDataError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2
    for key, value in summary.items():
        print(f"{key}: {value}")
    print(f"Wrote chart to {args.chart}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
