const { test, expect } = require('@playwright/test');

// Define page elements as locators
const loginPageUrl = 'https://easecommerce.in/app/login';
const usernameInput = 'input[id="email"]'; // Adjust selector based on actual ID/class
const passwordInput = 'input[id="password"]'; // Adjust selector based on actual ID/class
const loginButton = 'button[type="submit"]'; // Adjust selector
const tripleDotsMenu = '.triple-dots'; // Adjust selector for triple dots
const employeeViewOption = 'text=Employee View'; // Adjust selector
const taskSection = '.task-section'; // Adjust selector for Task Section
const addTaskButton = 'button:has-text("Add Task")'; // Adjust selector
const taskForm = '.task-form'; // Adjust selector for task form
const taskNameInput = 'input[id="task-name"]'; // Adjust selector
const taskDescriptionInput = 'textarea[id="task-description"]'; // Adjust selector
const submitTaskButton = 'button:has-text("Submit")'; // Adjust selector
const taskList = '.task-list'; // Adjust selector for task list
const errorMessage = '.error-message'; // Adjust selector for validation errors

// Test suite
test.describe('EaseCommerce Platform Automation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto(loginPageUrl);
  });

  // Test 1: Login Test
  test('User can log in and is redirected to the dashboard', async ({ page }) => {
    await page.fill(usernameInput, 'demouser@easecommerce.in');
    await page.fill(passwordInput, 'cE7iQPP^');
    await page.click(loginButton);
    // Verify dashboard redirection (adjust based on actual dashboard indicator)
    await expect(page.locator('body')).toHaveClass(/dashboard/);
  });

  // Test 2: Switch to Employee View
  test('User can switch to Employee View and Task Section opens by default', async ({ page }) => {
    // Perform login
    await page.fill(usernameInput, 'demouser@easecommerce.in');
    await page.fill(passwordInput, 'cE7iQPP^');
    await page.click(loginButton);

    // Switch to Employee View
    await page.click(tripleDotsMenu);
    await page.click(employeeViewOption);
    // Verify Task Section is displayed
    await expect(page.locator(taskSection)).toBeVisible();
  });

  // Test 3: Task Creation
  test('User can create a task successfully', async ({ page }) => {
    // Perform login and switch to Employee View
    await page.fill(usernameInput, 'demouser@easecommerce.in');
    await page.fill(passwordInput, 'cE7iQPP^');
    await page.click(loginButton);
    await page.click(tripleDotsMenu);
    await page.click(employeeViewOption);

    // Create a new task
    await page.click(addTaskButton);
    await expect(page.locator(taskForm)).toBeVisible();
    await page.fill(taskNameInput, 'Test Task');
    await page.fill(taskDescriptionInput, 'This is a test task description');
    // Add other required fields as needed (e.g., due date, priority)
    await page.click(submitTaskButton);
    // Verify task appears in Task List
    await expect(page.locator(${taskList} >> text=Test Task)).toBeVisible();
  });

  // Test 4: Form Validation (Negative Test Case)
  test('Submit button is disabled when required fields are missing', async ({ page }) => {
    // Perform login and switch to Employee View
    await page.fill(usernameInput, 'demouser@easecommerce.in');
    await page.fill(passwordInput, 'cE7iQPP^');
    await page.click(loginButton);
    await page.click(tripleDotsMenu);
    await page.click(employeeViewOption);

    // Open task form
    await page.click(addTaskButton);
    await expect(page.locator(taskForm)).toBeVisible();

    // Case 1: Missing task name, description filled
    await page.fill(taskDescriptionInput, 'This is a test task description');
    await expect(page.locator(submitTaskButton)).toBeDisabled();
    await expect(page.locator(errorMessage)).toBeVisible();

    // Case 2: Task name filled, missing description
    await page.fill(taskNameInput, 'Test Task');
    await page.fill(taskDescriptionInput, ''); // Clear description
    await expect(page.locator(submitTaskButton)).toBeDisabled();
    await expect(page.locator(errorMessage)).toBeVisible();

    // Case 3: All required fields filled
    await page.fill(taskNameInput, 'Test Task');
    await page.fill(taskDescriptionInput, 'This is a test task description');
    await expect(page.locator(submitTaskButton)).not.toBeDisabled();
  });
});