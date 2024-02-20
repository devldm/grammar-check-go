import { test, expect } from "@playwright/test";

test("is signed in", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Profile" }).click();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("sign out from profile page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Profile" }).click();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
});

test("sign out from profile image in navbar", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open user button" }).click();
  await page.getByRole("menuitem", { name: "Sign out" }).click();
  await expect(page.getByRole("button", { name: "Sign-in" })).toBeVisible();
});
