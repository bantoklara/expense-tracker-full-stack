import { useFetchWrapper } from "../../fetchWrapper";

const useExpenseService = () => {
    const path = `https://expense-tracker-sxcc.onrender.com/api/expenses`;
    const fetchWrapper = useFetchWrapper();

    const getExpenses = async (lastDate, lastId, limit = 10) => {
        const url = lastDate && lastId
            ? `${path}?limit=${limit}&lastDate=${JSON.stringify(lastDate)}&lastId=${lastId}`
            : `${path}?limit=${limit}`;
        const response = await fetchWrapper.get(url);

        if (response.status === 200) {
            return await response.json();
        }

        return null;
    };

    const getMonthlyExpenses = async () => {
        const url = `${path}/dashboard`;

        const response = await fetchWrapper.get(url);

        return response.status === 200 ? await response.json() : null;
    }

    const createExpense = async (expense) => {
        const response = await fetchWrapper.post(path, JSON.stringify(expense));
        if (response.status === 200) {
            const createdExpense = await response.json();
            return createdExpense;
        }
        return null;
    }

    const updateExpense = async (id, expense) => {
        const response = await fetchWrapper.put(`${path}/${id}`, JSON.stringify(expense));

        if (response.status === 200) {
            const updated = await response.json();

            return updated;
        }

        return false;
    };

    const deleteExpense = async (id) => {
        const response = await fetchWrapper.delete(`${path}/${id}`);
        return response.status === 204;
    }

    return {
        getExpenses,
        getMonthlyExpenses,
        createExpense,
        updateExpense,
        deleteExpense
    };
}

export default useExpenseService;