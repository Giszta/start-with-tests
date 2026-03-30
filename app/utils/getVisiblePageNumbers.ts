export function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): number[] {
  if (currentPage < 1 || totalPages < 1 || siblingCount < 0) {
    throw new Error('Niepoprawne dane paginacji');
  }

  const start = Math.max(1, currentPage - siblingCount);
  const end = Math.min(totalPages, currentPage + siblingCount);

  const pages: number[] = [];

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return pages;
}