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
// delete accounts after tests to avoid dumping data
test.afterAll(async ({ request }) => {
  console.log("After each test");
  
  try {
    if (createdUserIds.length > 0) {
      for (const userId of createdUserIds) {
        try {
          const deleteResponse = await request.delete(
            `http://ec2-3-86-173-183.compute-1.amazonaws.com:4080/api/users/${userId}`
          );
          if (deleteResponse.ok()) {
            console.log(`Deleted user ID: ${userId}`);
          }
        } catch (error) {
          console.log(`Failed to delete user ID ${userId}:`, error);
        }
      }
      // clear the array after cleanup
      createdUserIds.length = 0;
    }
  } catch (error) {
    console.log("Error during user cleanup:", error);
  }
});

let username1 = "";
let username2 = "";
let password = "";
let createdUserIds: number[] = []; // Track created user IDs for cleanup

test.describe("Register Page", () => {
  test("should allow new user to create a new account and raise error if username is already taken.", async ({
    request,
  }) => {
    username1 = `testuser-${Date.now()}`;
    username2 = username1;
    password = "123456";

    // should pass
    const res1 = await request.post("http://ec2-3-86-173-183.compute-1.amazonaws.com:4080/api/auth/register", {
      data: { username: username1, password },
    });
    expect(res1.status()).toBe(201);
    
    // Extract user ID from response for cleanup
    if (res1.ok()) {
      const userData = await res1.json();
      if (userData.id) {
        createdUserIds.push(userData.id);
        console.log(`Created user ID ${userData.id} for cleanup`);
      }
    }

    // should fail - username already taken
    const res2 = await request.post("http://ec2-3-86-173-183.compute-1.amazonaws.com:4080/api/auth/register", {
      data: { username: username2, password },
    });
    expect(res2.status()).toBeGreaterThanOrEqual(400);
  });
});

test.describe("Login Page ", () => {
  test("should allow new user to create a new account and raise error if username is already taken.", async ({
    request,
  }) => {
    const res1 = await request.post("http://ec2-3-86-173-183.compute-1.amazonaws.com:4080/api/auth/login", {
      data: { username: username1, password },
    });
    expect(res1.status()).toBe(200);

    // should fail - wrong password
    password = "1234";
    const res2 = await request.post("http://ec2-3-86-173-183.compute-1.amazonaws.com:4080/api/auth/login", {
      data: { username: username1, password },
    });
    expect(res2.status()).toBeGreaterThanOrEqual(400);
  });
});


