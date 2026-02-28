import pandas as pd
import numpy as np

def clean_sales_data(input_file="messy_sales_data.csv", output_file="clean_sales_data.csv"):
    """
    A beginner-friendly script to clean a messy dataset using Pandas!
    It handles missing values, fixes formatting, and removes duplicates.
    """
    print("🧹 Starting Data Cleaning Process...")

    try:
        # 1. Load the messy data
        # Note: In a real project, you would have an actual messy_sales_data.csv file here!
        print(f"Loading data from {input_file} (Mocking dataset for demonstration)")
        
        # Creating a mock messy dataframe to demonstrate the cleaning process
        df = pd.DataFrame({
            'Transaction_ID': ['T001', 'T002', 'T002', 'T004', 'T005'],
            'Customer_Name': ['john doe', 'JANE SMITH ', 'JANE SMITH ', np.nan, 'Alice jones'],
            'Sale_Amount': ['$150.00', '200', '200', 'error_value', '$350.50'],
            'Date': ['2023-01-15', '15/01/2023', '15/01/2023', '2023-02-28', 'Mar-05-2023']
        })
        
        print("\n❌ Original Messy Data:")
        print(df)

        # 2. Remove Duplicates
        df = df.drop_duplicates()
        print("\n✅ Removed duplicate rows.")

        # 3. Handle Missing Values (Drop rows where Customer_Name is missing)
        df = df.dropna(subset=['Customer_Name'])
        print("✅ Handled missing missing values.")

        # 4. Standardize Text (Make names Title Case and strip extra spaces)
        df['Customer_Name'] = df['Customer_Name'].str.strip().str.title()
        print("✅ Standardized customer names.")

        # 5. Clean Numeric Data (Remove '$' and convert to float)
        df['Sale_Amount'] = df['Sale_Amount'].replace({'\$': ''}, regex=True)
        df['Sale_Amount'] = pd.to_numeric(df['Sale_Amount'], errors='coerce')
        
        # Fill any new NaN values in Sale_Amount (from 'error_value') with the median
        median_sale = df['Sale_Amount'].median()
        df['Sale_Amount'] = df['Sale_Amount'].fillna(median_sale)
        print("✅ Cleaned and converted Sales Amounts to numbers.")

        # 6. Standardize Dates (Convert everything to YYYY-MM-DD format)
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce').dt.strftime('%Y-%m-%d')
        print("✅ Standardized date formats.")

        print("\n✨ Cleaned Data:")
        print(df)

        # 7. Save the cleaned data to a new file
        # df.to_csv(output_file, index=False)
        print(f"\n📁 Data successfully cleaned and (pretend) saved to {output_file}!")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    clean_sales_data()
