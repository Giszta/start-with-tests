export function toggleSelection<T>(selectedItems: T[], item: T): T[] {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
        return selectedItems.filter((selectedItem) => selectedItem !== item);
    }
    return [...selectedItems, item];
}