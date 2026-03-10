import { test, expect } from "@playwright/test";

test("dog image is retrieved successfully when page is loaded", async ({
  page,
}) => {
  await page.goto("/");

  await page.waitForResponse(
    (response) =>
      response.url().includes("/api/dogs/random") && response.status() === 200,
  );

  const img = page.getByAltText(/random dog/i);
  await expect(img).toBeVisible();

  const src = await img.getAttribute("src");
  expect(src).toBeTruthy();
  expect(src).toMatch(/^https:\/\//);
});

test("dog image is retrieved successfully when button is clicked", async ({
  page,
}) => {
  await page.goto("/");

  await page.waitForResponse(
    (response) =>
      response.url().includes("/api/dogs/random") && response.status() === 200,
  );

  const button = page.getByRole("button", { name: /get another dog/i });

  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/dogs/random") && response.status() === 200,
  );

  await button.click();
  await responsePromise;

  const image = page.getByAltText(/random dog/i);
  await expect(image).toBeVisible();

  const src = await image.getAttribute("src");
  expect(src).toBeTruthy();
  expect(src).toMatch(/^https:\/\//);
});

test("error message is shown when API request fails", async ({ page }) => {
  await page.route("**/api/dogs/random", async (route) => {
    await route.abort();
  });

  await page.goto("/");

  await expect(page.getByText(/^Error:/i)).toBeVisible();
});
