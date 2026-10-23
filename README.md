# Muhammed Rabeeh — Portfolio

A personal portfolio site with source links to three small, runnable tools that process files supplied by the user. No synthetic datasets or mocked service responses are included.

## Website

Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

```bash
npm install
npm run dev
```

The development server prints its local URL. `npm run build` creates the static site in `dist/`.

## Python data tools

Install the utilities' dependencies from the repository root:

```bash
python -m pip install -r src/projects/requirements.txt
```

### CSV cleaner

```bash
python src/projects/data_cleaning/dataset_cleaner.py --input path/to/raw.csv --output path/to/clean.csv --drop-duplicates --drop-empty-rows
```

It trims headers and text values, optionally removes duplicate or fully empty rows, and preserves missing values for review. It does not create data or guess how missing cells should be filled.

### Transaction category report

```bash
python src/projects/expense_tracker/expense_tracker.py --input path/to/transactions.csv --output path/to/category_totals.csv --chart path/to/category_totals.png --currency USD
```

The input CSV needs `date`, `category`, and `amount` columns. Dates must use `YYYY-MM-DD`; amounts can use digits, optional commas, and an optional `$` prefix. Use one currency or unit per file. Negative amounts reduce the category net total.

### Weather observations dashboard

```bash
python src/projects/weather_dashboard/weather_dashboard.py --input path/to/observations.csv --chart path/to/weather.png --location "Location name"
```

The observations CSV needs `date`, `temperature_c`, and `precipitation_mm` columns. Dates use `YYYY-MM-DD`, temperatures are Celsius, and precipitation is millimeters. The script charts and summarizes the observations in the file; it does not fetch weather or generate readings.

Each card links to the corresponding source folder. The site describes the current code and does not claim live APIs, machine-learning models, or analytics that are not implemented here.
