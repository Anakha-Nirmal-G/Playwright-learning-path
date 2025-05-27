import { test as setup, expect } from "@playwright/test";

setup("Create customer01 auth", async ({ page, context }) => {
  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer01AuthFile = ".auth/customer01.json";

  await page.goto("/auth/login");
  await page.getByLabel("Email address *").fill(email);
  await page.getByLabel("Password *").fill(password);
  await page.locator('input[type="submit"][value="Login"]').click();
  await expect(page.getByText("Jane Doe")).toBeVisible();
  await context.storageState({ path: customer01AuthFile });
});
