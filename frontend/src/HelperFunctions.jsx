export const setDate = (date) => {
    return new Date(date._seconds * 1000 + date._nanoseconds / 1_000_000).toISOString().split('T')[0];
}