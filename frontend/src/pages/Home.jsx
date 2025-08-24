import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ExpenseCreateForm from '../components/ExpenseCreateForm';
import useExpenseService from '../services/ExpenseService';
import MonthlyExpenses from '../components/MonthlyExpenses';
import MonthlyStatistic from '../components/MonthlyStatistic';
import { getCategories } from '../ExpenseCategories';

function Home() {
    const { getMonthlyExpenses, createExpense } = useExpenseService();
    const [recentExpenses, setRecentExpenses] = useState([]);
    const [expense, setExpense] = useState({});
    const loadRef = useRef(false);

    const setDate = (date) => {
        return new Date(date._seconds * 1000 + date._nanoseconds / 1_000_000).toISOString().split('T')[0];
    }

    const loadRecentExpenses = async () => {
        const data = await getMonthlyExpenses();

        const temp = data.map(exp => ({
            ...exp,
            date: setDate(exp.date),
        }));

        setRecentExpenses(temp);
    };

    const appendEpxenseToUI = (expense) => {
        setRecentExpenses((prev) => [expense, ...prev]);
    }

    useEffect(() => {
        loadRecentExpenses();
    }, []);

    return (<>
        <div className="relative h-[700px] p-4 lg:p-12 bg-white rounded-xl lg:grid lg:grid-cols-2 mb-6">
            <div className='lg:w-3/4'>
                <div className='h-1/2'>
                    <h1 className="text-2xl font-bold mb-4 ">Expense Tracker</h1>
                    <div className='shadow-md mb-6'>
                        <ExpenseCreateForm
                            expense={expense}
                            setExpense={setExpense}
                            mode={1}
                            sendRequest={createExpense}
                            updateUI={appendEpxenseToUI}
                            setDate={setDate}
                        />
                    </div>
                </div>
                <div>
                    {recentExpenses.length == 0
                        ?
                        <div>Loading...</div>
                        :
                        <div className='shadow-md p-6'>
                            <h3 className='text-purple-800'>Recent payments</h3>
                            <hr />
                            <ul className='mt-4'>

                                {recentExpenses
                                    .sort((exp1, exp2) => new Date(exp2.date) - new Date(exp1.date))
                                    .slice(0, 5).map(exp => (
                                        <li
                                            key={exp.id} className='mb-4'
                                        >
                                            <div className='flex items-center'>
                                                <span
                                                    className="w-3 h-3 rounded-full inline-block align-center"
                                                    style={{ backgroundColor: `#${getCategories()[exp.category]}` }}
                                                />
                                                <p className='w-1/2 pl-2'>{exp.category}</p>
                                                <p className='w-1/2 text-purple-600 text-right'>${exp.amount}</p>
                                            </div>
                                            <p className='text-black-400 text-xs ml-4'>{exp.date}</p>
                                            <div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                            <Link to='/expenses' className='text-purple-800'>Show more</Link>
                        </div>
                    }
                </div>
            </div>
            {recentExpenses.length > 0 && <div>
                <div className='h-1/2 shadow-md p-4 mt-4 sm:shadow-none sm:p-0 sm:mt-0' >
                    <h3 className='text-purple-800 font-bold'>Monthly Statistics</h3>
                    <div>
                        <MonthlyStatistic expenses={recentExpenses} />
                    </div>
                </div>
                <div className='shadow-md sm:shadow-none p-6 mt-4'>
                    <h3 className='text-purple-800'>Monthly Payments</h3>
                    <hr />
                    <MonthlyExpenses expenses={recentExpenses} />
                </div>
            </div>}
        </div>
    </>
    );
}

export default Home;
