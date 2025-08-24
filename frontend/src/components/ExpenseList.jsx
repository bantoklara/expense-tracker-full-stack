import React, { useEffect, useState } from 'react'
import ExpenseUpdatePopup from './ExpenseUpdatePopup';
import useExpenseService from '../services/ExpenseService';

const ExpenseList = ({ expenses, updateExpenseOnUI, deleteExpense, deleteExpenseFromUI }) => {
    const [groupedExpenses, setGroupedExpenses] = useState({});
    const [months, setMonths] = useState([]);
    const [open, setOpen] = useState(false);
    const [expense, setExpense] = useState({});
    const { updateExpense } = useExpenseService();

    const handleEdit = (exp) => {
        setExpense(exp);
        handleOpen();
    };

    const handleOpen = () => setOpen(!open);


    const handleDelete = async (id) => {
        const deleted = await deleteExpense(id);

        if (deleted) {
            deleteExpenseFromUI(id);
        }
    }

    const groupByMonth = (expenses = []) => {

        return expenses.reduce((groups, expense) => {
            const date = new Date(expense.date);
            const month = `${date.toLocaleString('default', { month: 'long' })}-${date.getFullYear()}`;
            if (!groups[month]) {
                groups[month] = [];
            }
            groups[month].push(expense);

            return groups;
        }, {})
    }

    useEffect(() => {
        const group = groupByMonth(expenses);
        const sortedMonths = Object.keys(group).sort(
            (a, b) => new Date(b) - new Date(a)
        )
        setGroupedExpenses(group);
        setMonths(sortedMonths);
    }, [expenses])

    return (
        <div className="p-5">
            {months.map((month) => (
                <div key={month}>
                    <h4 className='text-purple-600'>{month}</h4>
                    <hr />
                    {groupedExpenses[month]
                        .slice()
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((exp) => (
                            <div key={exp.id} className="p-4">
                                <div className='flex justify-between'>
                                    <div>
                                        <span>{exp.category}</span>
                                    </div>
                                    <div className='flex space-x-4 justify-end'>
                                        <span>${exp.amount}</span>
                                        <button onClick={() => handleEdit(exp)}>Edit</button>
                                        <button onClick={() => handleDelete(exp.id)}>Delete</button>
                                    </div>
                                </div>
                                <div>
                                    <span className='text-xs'>{exp.date}</span>
                                </div>
                            </div>
                        ))}
                </div>
            ))}
            <ExpenseUpdatePopup
                open={open}
                handleOpen={handleOpen}
                expense={expense}
                setExpense={setExpense}
                sendRequest={updateExpense}
                updateUI={updateExpenseOnUI}
            />
        </div>
    )
}

export default ExpenseList
