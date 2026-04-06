import { expect, test } from '@playwright/test'

test.describe('walidacja formularza', () => {
  test('pokazuje błąd gdy pola są puste', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Wyślij' }).click()

    await expect(page.getByText('Wszystkie pola są wymagane')).toBeVisible()
  })

  test('pokazuje sukces dla poprawnych danych', async ({ page }) => {
    await page.goto('/')

    await page.getByLabel('Imię').fill('Jan')
    await page.getByLabel('Wiadomość').fill('To jest poprawna wiadomość')
    await page.getByRole('button', { name: 'Wyślij' }).click()

    await expect(page.getByText('Formularz został wysłany')).toBeVisible()
  })
})