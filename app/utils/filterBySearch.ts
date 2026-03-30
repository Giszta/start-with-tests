export function filterBySearch<T>(items: T[], search: string, getSearchValue: (item: T) => string): T[] {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
        return items;
    }

    return items.filter((item) => getSearchValue(item).toLowerCase().includes(normalizedSearch));
} 