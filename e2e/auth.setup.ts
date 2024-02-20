import { test as setup, expect } from "@playwright/test";

const authFile = "./e2e/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("/");
  await page.getByRole("button", { name: "Sign-in" }).click();
  await page.getByLabel("Email address or username").click();
  await page
    .getByLabel("Email address or username")
    .fill(process.env.TEST_ACCOUNT_USERNAME!);
  await page.getByLabel("Email address or username").press("Enter");
  await page
    .getByLabel("Password", { exact: true })
    .fill(process.env.TEST_ACCOUNT_PASSWORD!);

  await page.getByLabel("Password", { exact: true }).press("Enter");
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL("/");
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole("button", { name: "Profile" })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
