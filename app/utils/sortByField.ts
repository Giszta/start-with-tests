type SortDirection = 'asc' | 'desc';

export function sortByField<T, K extends keyof T>(
  items: T[],
  field: K,
  direction: SortDirection = 'asc'
): T[] {
  const sortedItems = [...items].sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (valueA < valueB) return direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sortedItems;
}