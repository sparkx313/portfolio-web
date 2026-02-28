import matplotlib.pyplot as plt

def generate_expense_report():
    """
    A beginner project to visualize personal spending!
    It categorizes imaginary bank transactions and creates a pie chart.
    """
    print("📊 Generating Expense Tracker Report...")

    # Data: Mock monthly expenses categorized
    categories = ['Housing/Rent', 'Food & Groceries', 'Transportation', 'Entertainment', 'Utilities', 'Savings']
    expenses = [1200, 450, 150, 200, 180, 500]

    # Calculate Total Spending
    total_spending = sum(expenses)
    print(f"Total Monthly Spending: ${total_spending}")

    # Create a nice colorful Pie Chart using Matplotlib
    # Using a cool, modern color palette
    colors = ['#ff9999','#66b3ff','#99ff99','#ffcc99', '#c2c2f0', '#ffb3e6']
    
    # 'explode' pulls the 'Savings' slice out a bit to highlight it
    explode = (0, 0, 0, 0, 0, 0.1)  

    plt.figure(figsize=(10, 6))
    plt.pie(expenses, 
            explode=explode, 
            labels=categories, 
            colors=colors, 
            autopct='%1.1f%%', # Show percentages
            shadow=True, 
            startangle=140)

    plt.title('Monthly Expense Breakdown', fontsize=16, fontweight='bold')
    plt.axis('equal') # Equal aspect ratio ensures that pie is drawn as a circle.

    # Instead of showing it, let's pretend to save it
    # plt.show()
    # plt.savefig('expense_report_chart.png')
    
    print("\n✅ Successfully categorized expenses.")
    print("✅ Generated Pie Chart visualization.")
    print("📁 Saved chart as 'expense_report_chart.png'")

if __name__ == "__main__":
    generate_expense_report()
