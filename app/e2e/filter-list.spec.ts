import { expect, test } from '@playwright/test'

test.describe('filtrowanie listy', () => {
  test('filtruje produkty po wpisanym tekście', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Laptop')).toBeVisible()
    await expect(page.getByText('Monitor')).toBeVisible()

    await page.getByPlaceholder('Wpisz nazwę produktu').fill('lap')

    await expect(page.getByText('Laptop')).toBeVisible()
    await expect(page.getByText('Monitor')).not.toBeVisible()
    await expect(page.getByText('Keyboard')).not.toBeVisible()
  })
})