import React, { useEffect, useState } from 'react'
import { getCategories } from "../ExpenseCategories";

const MonthlyExpenses = ({ expenses }) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(null);
  const categories = getCategories();

  useEffect(() => {
    const reduced = expenses
      .filter((expense) => new Date(expense.date).getMonth() === new Date().getMonth())
      .reduce((groups, expense) => {
        const category = expense.category;
        if (!groups[category]) {
          groups[category] = 0;
        }
        groups[category] += Number(expense.amount);
        return groups;
      }, {});

    setMonthlyExpenses(reduced);
  }, [expenses])

  return (
    <div className='mt-4 grid lg:grid-cols-3 md:grid-cols-2 gap-6'>
      {monthlyExpenses && Object.entries(monthlyExpenses).map(([category, amount]) => (
        <div
          key={category}
          className='py-2 px-10 rounded-xl text-center'
          style={{ border: `2px solid #${categories[category]}` }}>
          <p>{category}</p>
          <p>${amount}</p>
        </div>
      ))}
    </div >
  )
}

export default MonthlyExpenses
