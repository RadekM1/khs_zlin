export const ArraySort = (rows, sortingColumn, sortingOrder, setRows) => {
  const sortedArray = [...rows].sort((a, b) => {
    const aValue = a[sortingColumn];
    const bValue = b[sortingColumn];

    if (aValue === bValue) return 0;
    return (aValue > bValue ? 1 : -1) * (sortingOrder === 'asc' ? 1 : -1);
  });

  setRows(sortedArray); 
};

export default ArraySort;
