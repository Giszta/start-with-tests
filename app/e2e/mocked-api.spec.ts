import { expect, test } from '@playwright/test'

test.describe('mockowane API', () => {
  test('ładuje użytkowników z mockowanego endpointu', async ({ page }) => {
    await page.route('https://example.com/api/users', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'Anna' },
          { id: 2, name: 'Tomek' }
        ])
      })
    })

    await page.goto('/')

    await page.getByRole('button', { name: 'Załaduj użytkowników' }).click()

    await expect(page.getByText('Użytkownicy załadowani')).toBeVisible()
    await expect(page.getByText('Anna')).toBeVisible()
    await expect(page.getByText('Tomek')).toBeVisible()
  })
})