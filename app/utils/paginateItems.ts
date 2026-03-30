export function paginateItems<T>(
    items: T[],
    currentPage: number,
    itemsPerPage: number
): T[] {
    if (currentPage < 1) {
        throw new Error("currentPage musi być większe od 0");
    }

    if (itemsPerPage < 1) {
        throw new Error("itemsPerPage musi być większe od 0");
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);

}