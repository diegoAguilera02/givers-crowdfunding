


export const calculatePercentage = (total: number, value: number) => {
    const percentage = (value * 100) / total;
    return percentage.toFixed(2);
}