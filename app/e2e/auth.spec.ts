import { expect, test } from '@playwright/test'

test.describe('logowanie', () => {
  test('pozwala zalogować się poprawnymi danymi', async ({ page }) => {
    await page.goto('/')

    await page.getByLabel('Email').fill('admin@example.com')
    await page.getByLabel('Hasło').fill('secret123')
    await page.getByRole('button', { name: 'Zaloguj' }).click()

    await expect(page.getByText('Zalogowano poprawnie')).toBeVisible()
  })

  test('pokazuje błąd dla niepoprawnych danych', async ({ page }) => {
    await page.goto('/')

    await page.getByLabel('Email').fill('wrong@example.com')
    await page.getByLabel('Hasło').fill('wrong-pass')
    await page.getByRole('button', { name: 'Zaloguj' }).click()

    await expect(page.getByText('Nieprawidłowe dane logowania')).toBeVisible()
  })
})