import { test, expect, Page } from "@playwright/test";

// Function to generate random user data
function generateUser() {
  const random = Math.floor(Math.random() * 10000);
  return {
    username: `user${random}`,
    password: "Test@123",
    firstName: "Test",
    lastName: "User",
    address: "123 Test Street",
    city: "Test City",
    state: "TS",
    zipCode: "12345",
    phone: "1234567890",
    ssn: "123456789",
  };
}

// Function to register a new user
async function registerUser(page: Page, user: ReturnType<typeof generateUser>) {
  await page.goto("/parabank/register.htm");
  await page.waitForSelector('input[name="customer.firstName"]');
  await page.fill('input[name="customer.firstName"]', user.firstName);
  await page.fill('input[name="customer.lastName"]', user.lastName);
  await page.fill('input[name="customer.address.street"]', user.address);
  await page.fill('input[name="customer.address.city"]', user.city);
  await page.fill('input[name="customer.address.state"]', user.state);
  await page.fill('input[name="customer.address.zipCode"]', user.zipCode);
  await page.fill('input[name="customer.phoneNumber"]', user.phone);
  await page.fill('input[name="customer.ssn"]', user.ssn);
  await page.fill('input[name="customer.username"]', user.username);
  await page.fill('input[name="customer.password"]', user.password);
  await page.fill('input[name="repeatedPassword"]', user.password);
  await page.screenshot({ path: "test-results/01-filled-registration.png" });
  await page.getByRole("button", { name: "Register" }).click();
  await expect(
    page.getByText(
      "Your account was created successfully. You are now logged in."
    )
  ).toBeVisible();
  await page.screenshot({ path: "test-results/02-registration-success.png" });
}

// Function to pay a bill
async function payBill(page: Page, amount: string) {
  await page.getByRole("link", { name: "Bill Pay" }).click();
  await page.screenshot({ path: "test-results/03-bill-pay-form.png" });
  await page.fill('input[name="payee.name"]', "Test Payee");
  await page.fill('input[name="payee.address.street"]', "123 Payee St");
  await page.fill('input[name="payee.address.city"]', "Payee City");
  await page.fill('input[name="payee.address.state"]', "PY");
  await page.fill('input[name="payee.address.zipCode"]', "54321");
  await page.fill('input[name="payee.phoneNumber"]', "0987654321");
  await page.fill('input[name="payee.accountNumber"]', "12345678");
  await page.fill('input[name="verifyAccount"]', "12345678");
  await page.fill('input[name="amount"]', amount);
  const fromAccount = await page
    .locator('select[name="fromAccountId"] option')
    .first()
    .getAttribute("value");
  expect(fromAccount).toBeTruthy();
  await page.selectOption('select[name="fromAccountId"]', fromAccount!);
  await page.screenshot({ path: "test-results/04-bill-pay-filled.png" });
  await page.getByRole("button", { name: "Send Payment" }).click();
  await expect(page.getByText("Bill Payment Complete")).toBeVisible();
  await page.screenshot({ path: "test-results/05-bill-pay-success.png" });
}

test.describe("Parabank full flow", () => {
  test("should register, pay bill and check confirmation", async ({ page }) => {
    const user = generateUser();
    await registerUser(page, user);
    // Directly pay a bill of $100 using the first available account
    await payBill(page, "100");
    // No need to check balance, just confirmation message
  });
});
