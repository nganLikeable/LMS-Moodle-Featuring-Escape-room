import { expect, test } from "@playwright/test";

test.beforeAll(async () => {
  console.log("Before all tests");
  // You can set up any global environment variables or configurations here
});

// Hook to run before each test (use `page` here)
test.beforeEach(async () => {
  console.log("Before each test");
  // Prepare the page before each test runs
});

// Hook to run after each test
test.afterEach(async ({ request }) => {
  console.log("After each test");
  // Clean up after each test if needed
});

let username1 = "";
let username2 = "";
let password = "";

test.describe("Register Page", () => {
  test("should allow new user to create a new account and raise error if username is already taken.", async ({
    request,
  }) => {
    username1 = `testuser-${Date.now()}`;
    username2 = username1;
    password = "123456";

    // should pass
    const res1 = await request.post("http://ec2-98-93-8-168.compute-1.amazonaws.com:4080/api/auth/register", {
      data: { username: username1, password },
    });
    expect(res1.status()).toBe(201);

    // should fail - username already taken
    const res2 = await request.post("http://ec2-98-93-8-168.compute-1.amazonaws.com:4080/api/auth/register", {
      data: { username: username2, password },
    });
    expect(res2.status()).toBeGreaterThanOrEqual(400);
  });
});

test.describe("Login Page ", () => {
  test("should allow new user to create a new account and raise error if username is already taken.", async ({
    request,
  }) => {
    const res1 = await request.post("http://ec2-98-93-8-168.compute-1.amazonaws.com:4080/api/auth/login", {
      data: { username: username1, password },
    });
    expect(res1.status()).toBe(200);

    // should fail - wrong password
    password = "1234";
    const res2 = await request.post("http://ec2-98-93-8-168.compute-1.amazonaws.com:4080/api/auth/login", {
      data: { username: username1, password },
    });
    expect(res2.status()).toBeGreaterThanOrEqual(400);
  });
});
