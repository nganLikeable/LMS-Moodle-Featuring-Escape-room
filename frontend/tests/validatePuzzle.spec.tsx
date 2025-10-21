import { expect, test } from "@playwright/test";

const username1 = `testuser-${Date.now()}`;
let password = "123456";

test.beforeAll(async ({ request }) => {
  console.log("Before all tests");
  // You can set up any global environment variables or configurations here
  // register
  await request.post("http://localhost:3001/api/auth/register", {
    data: { username: username1, password },
  });
  // login
  await request.post("http://localhost:3001/api/auth/login", {
    data: { username: username1, password },
  });
});

// Hook to run after each test
test.afterEach(async ({ request }) => {
  console.log("After each test");
  // Clean up after each test if needed
});

test.describe("Login Page ", () => {
  test("should allow new user to create a new account and raise error if username is already taken.", async ({
    request,
  }) => {
    const res1 = await request.post("http://localhost:3001/api/auth/login", {
      data: { username: username1, password },
    });
    expect(res1.status()).toBe(200);

    // should fail - wrong password
    password = "1234";
    const res2 = await request.post("http://localhost:3001/api/auth/login", {
      data: { username: username1, password },
    });
    expect(res2.status()).toBeGreaterThanOrEqual(400);
  });
});

test.describe("Puzzle Validation", () => {
  test("accepts correct answer", async ({ page }) => {
    await page.goto("http://localhost:3000/escape-room/1");

    await page.fill(
      'input[placeholder="Enter your answer here..."]',
      "True37H1.0"
    );
    await page.click('button:has-text("Submit")');

    const feedback = page.getByTestId("feedback");
    await expect(feedback).toBeVisible();
    await expect(feedback).toHaveText("Correct Answer!");
  });

  test("rejects incorrect answer", async ({ page }) => {
    await page.goto("http://localhost:3000/escape-room/1");

    await page.fill('input[placeholder="Enter your answer here..."]', "dragon");
    await page.click('button:has-text("Submit")');

    const feedback = page.getByTestId("feedback");
    await expect(feedback).toBeVisible();
    await expect(feedback).toHaveText(
      "Incorrect Answer!! Please try again...."
    );
  });
});
