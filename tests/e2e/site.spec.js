import { test, expect } from '@playwright/test';

for (const width of [320, 375, 390, 768, 1440]) {
  test(`layout e navegação em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    if (width <= 760) {
      await page.locator('.mobile-menu summary').click();
      await page.getByRole('navigation', { name: 'Navegação mobile' }).getByRole('link', { name: 'Serviços' }).click();
      await expect(page).toHaveURL(/#servicos$/);
      await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
    } else {
      await expect(page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Serviços' })).toBeVisible();
    }
  });
}

test('formulário prepara o orçamento sem enviar os dados', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByLabel('Nome do contato').fill('Ana Silva');
  await page.getByLabel('Empresa', { exact: true }).fill('Indústria Exemplo');
  await page.getByLabel('Serviço desejado').selectOption({ label: 'Ultrassom (UT)' });
  await page.getByLabel('Local da execução').fill('Santos / SP');
  await page.getByLabel('Descrição do serviço').fill('Inspeção de tanque');
  await page.getByRole('button', { name: 'Preparar solicitação' }).click();
  await expect(page.getByLabel('Solicitação preparada')).toHaveValue(/Descrição: Inspeção de tanque/);
  await expect(page.getByRole('button', { name: 'Copiar solicitação' })).toBeVisible();
});
