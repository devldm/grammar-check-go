import { test, expect } from "@playwright/test";

test("Visit challenges page and check it renders correctly", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Challenges" }).click();
  await expect(page.getByRole("heading", { name: "Challenges" })).toBeVisible();
  await page
    .getByRole("link", { name: "동-을 것이/게 아니라 proposing a" })
    .click();
  await expect(page.getByText("Solutions")).toBeVisible();
});

test.describe("Submit a solution", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/challenges/ba9d2343-5e33-4585-9783-61d2d0d09a7f");
  });

  test("should allow me to add a solution", async ({ page }) => {
    await page.getByPlaceholder("명이며 명이며").click();
    await page.getByPlaceholder("명이며 명이며").fill("e2e test 1");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page.getByRole("heading", { name: "e2e test 1" }).first(),
    ).toBeVisible();
  });

  test("should allow me to view submitted solution on my profile", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Profile" }).click();
    await expect(
      page.getByRole("heading", { name: "My Solutions" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "e2e test" }).first(),
    ).toBeVisible();
  });

  test("should clear text input field when an item is added", async ({
    page,
  }) => {
    await page.getByPlaceholder("명이며 명이며").click();
    await page.getByPlaceholder("명이며 명이며").fill("e2e test 2");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByPlaceholder("명이며 명이며")).toBeEmpty();
  });
});
