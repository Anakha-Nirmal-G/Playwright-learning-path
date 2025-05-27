import { expect, test } from "@playwright/test";

test.describe("Home Page tests without auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  //test("Visual Test", async ({ page }) => {
  // await expect(page).toHaveScreenshot("homepage-no-auth.png");
  // });
  test("Home should have correct title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });
  test("Sign in link is displayed", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
  });
  test("should display 9 item links in the container", async ({ page }) => {
    const itemLinks = page.locator(".col-md-9").getByRole("link");

    await expect(itemLinks).toHaveCount(9);
  });
  test("Search for Thor Hammer", async ({ page }) => {
    page.locator("#search-query").fill("Thor Hammer");
    page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByTestId("search_completed")).toBeVisible();
    const result = await page.locator(".card-title").innerText();
    expect(result).toBe("Thor Hammer");
  });
});

test.describe("Home Page tests for customer01 auth", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  // test("Visual Test for customer01", async ({ page }) => {
  //  await page.waitForLoadState("domcontentloaded");
  //  await expect(page).toHaveScreenshot("homepage-customer01.png");
  // });
  test("Verify that customer01 is logged in", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Sign in" })).not.toBeVisible();
    await expect(page.getByText("Jane Doe")).toBeVisible();
  });
});
