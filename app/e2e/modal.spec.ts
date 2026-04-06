import { expect, test } from '@playwright/test'

test.describe('modal', () => {
  test('otwiera i zamyka modal', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Otwórz modal' }).click()

    await expect(page.getByRole('dialog', { name: 'Okno potwierdzenia' })).toBeVisible()
    await expect(page.getByText('Ta operacja wymaga potwierdzenia.')).toBeVisible()

    await page.getByRole('button', { name: 'Zamknij' }).click()

    await expect(page.getByRole('dialog', { name: 'Okno potwierdzenia' })).not.toBeVisible()
  })
})