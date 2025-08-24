import { setDate } from '../HelperFunctions';
import { getCategories } from '../ExpenseCategories'
import { useEffect } from 'react';

const ExpenseCreateForm = (props) => {
    const categories = getCategories();

    const {
        expense,
        setExpense,
        mode,
        sendRequest,
        updateUI,
        handleOpen
    } = props;

    const inputChangeHandle = (event) => {
        const { name, value } = event.target;
        setExpense({ ...expense, [name]: value });
    }

    const updateHandler = async () => {
        const updatedExpense = await sendRequest(expense.id, expense);
        if (updatedExpense) {
            updatedExpense.date = setDate(updatedExpense.date);
            updateUI(updatedExpense.id, updatedExpense);
        }
        setExpense({});
        handleOpen();
    }

    const createHandler = async () => {
        const created = await sendRequest(expense.category ? expense : { ...expense, "category": Object.keys(categories)[0] });
        if (created) {
            created.date = setDate(created.date);
            updateUI(created);
            setExpense({});
        }
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        if (mode === 1) {
            createHandler();
        } else {
            updateHandler();
        }
    }

    const getDate = () => {
        const today = new Date()
        const year = today.getFullYear();
        const month = today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
        const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
        return `${year}-${month}-${day}`;
    }

    return (
        <form
            onSubmit={formSubmitHandler}
            className="max-w-md mx-auto bg-white p-6">
            <div className="mb-2">
                <label className="block text-sm font-medium text-purple-600">Category</label>
                <select
                    name="category"
                    onChange={(e) => inputChangeHandle(e)}
                    value={expense.category ? expense.category : Object.keys(categories)[0]}
                    className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 p-2"
                >
                    {Object.keys(categories).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-purple-600">Amount</label>
                    <input
                        required
                        name="amount"
                        type="number"
                        placeholder="Amount"
                        className="w-full mb-4 rounded-lg border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 p-2"
                        value={expense.amount ? expense.amount : ""} onChange={(e) => inputChangeHandle(e)} />

                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-600">Date</label>

                    <input
                        required
                        type="date"
                        name="date"
                        id="date"
                        className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 p-2"
                        value={expense.date ? expense.date : getDate()} onChange={(e) => inputChangeHandle(e)} />
                </div>
            </div>
            {mode === 2 ? <div className='grid grid-cols-2 gap-2'>
                <button onClick={handleOpen}>Cancel</button>
                <input
                    type="submit"
                    value={mode === 1 ? "Add new expense" : "Edit payment"}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow transition" />
            </div>
                : <input
                    type="submit"
                    value={mode === 1 ? "Add new expense" : "Edit payment"}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow transition" />
            }
        </form>
    )
}

export default ExpenseCreateForm
