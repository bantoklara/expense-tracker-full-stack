import React, { useRef, useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ExpenseList from '../components/ExpenseList'

import useExpenseService from '../services/ExpenseService';
import { Link } from 'react-router-dom';
import { setDate } from '../HelperFunctions';

const Expenses = () => {
    const { getExpenses, deleteExpense } = useExpenseService();
    const [expenses, setExpenses] = useState([]);
    const [last, setLast] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const loadRef = useRef(false);

    const loadExpenses = async () => {
        const data = await getExpenses(last?.date, last?.id);
        const expensesArray = data.expenses;
        const lastDate = expensesArray[expensesArray.length - 1]?.date;
        const lastId = expensesArray[expensesArray.length - 1]?.id;
        setHasMore(data.hasMore);

        const temp = expensesArray.map(exp => ({
            ...exp,
            date: setDate(exp.date),
        }));

        setExpenses(prev => {
            const existingIds = new Set(prev.map(e => e.id));
            const newExpenses = temp.filter(e => !existingIds.has(e.id));
            return [...prev, ...newExpenses];
        });

        setLast({ "date": lastDate, "id": lastId });
    };

    const updateExpenseOnUI = (id, updatedExpense) => {
        const index = expenses.findIndex((expense) => expense.id === id);

        if (index > -1) {
            const tmp = [...expenses];
            tmp[index] = updatedExpense;
            setExpenses(tmp);
        }
    }

    const deleteExpenseFromUI = (id) => {
        const tmp = [...expenses];
        const index = tmp.findIndex(exp => exp.id === id);
        tmp.splice(index, 1);
        setExpenses(tmp);
    }

    useEffect(() => {
        if (loadRef.current) {
            loadExpenses();
        }

        return () => loadRef.current = true;
    }, []);

    return (
        <div className='overflow-auto lg:mx-20 lg:my-10 '>
            <Link to='/'>
                <svg className="w-6 h-6 text-purple-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                </svg>
            </Link>
            <div className='shadow-md'>
                <InfiniteScroll
                    dataLength={expenses.length}
                    next={loadExpenses}
                    hasMore={hasMore}
                    loader={<p>Loading...</p>}
                >
                    <ExpenseList
                        expenses={expenses}
                        updateExpenseOnUI={updateExpenseOnUI}
                        deleteExpense={deleteExpense}
                        deleteExpenseFromUI={deleteExpenseFromUI}
                    />
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Expenses
