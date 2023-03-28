# Introduction

This project is a collection of tests written in TypeScript that verify the functionality of a sample online shop website. The project is structured around component objects and includes UI, API and stubbed tests.

# Installation

To install the Cypress shop project on your local machine, you will need to have Node.js installed. Follow these steps:

1. Clone the repository:

        git clone https://github.com/liviu-boros/cypress-typescript.git

2. Navigate to the project directory:

        cd cypress-typescript

3. Install dependencies:

        npm install

4. Run Cypress:

        npm run cy:open

        npm run cy:run

# File structure

```
📦cypress
├── 📂components
├── 📂e2e
│   ├── 📂API
│   ├── 📂Stubs
│   └── 📂UI
├── 📂fixtures
└── 📂support
```

- **📂components** ━ contains component objects with methods that are used to locate and verify elements on the webpage: 
  - Address form
  - Cart table
  - Filters bar
  - Header bar
  - Payment form
  - Product details
  - Products list
  - Sign In form

- **📂e2e** ━ contains test organized into subfolders:
   - API ━ contains tests verifying API responses
   - Stubs ━ contains stubbed tests using fixtures
   - UI ━ contains tests for UI interactions.

- **📂fixtures** ━ contains JSON files used in stubbed tests.

- **📂support** ━ contains several files: 

  - commands.ts for custom commands
  - Data.ts for data input and assertion
  - HelperCart.ts for simulating the shop internally
  - Locators.ts for defining locators
  - Utils.ts for utility helper functions

# Tests

### UI Tests 

UI tests cover various aspects of the user interface and simulate user interactions with the website. They are organized into several categories:

- **Navigation** ━ Verify that the navigation links on the website work correctly.
- **Products** ━ Verify that the product list is being displayed correctly.
- **Filters** ━ Verify that the various filters work correctly.
- **ProductDetails** ━ Verify that the Product Details page displays correctly for various products.
- **Cart** ━ Verify that various products can be added to cart and cart table is displayed correctly.
- **SignIn** ━ Verify that user can sing in correctly.
- **End2End** ━ Verify that the order process works correctly, from adding products to the cart to completing the payment.

Many tests use **randomly** selected products, which helps with testing the robustness and flexibility of the system. By selecting random products, the tests run differently each time and cover a wider range of possible scenarios.

Backend login through api **requests** and **interceptions** is used in some tests. By doing this the tests can simulate a real-world scenario in which the user is already logged in and interacts with the system.

The **`HelperCart`** class is used to verify any combination of products in the cart (any number, type and quantity), which together with the random selection of products is useful for testing the flexibility and scalability of the system. The class makes it easier to write cart tests by providing a simple API for modifying and verifying data in the UI.

### API tests

The API tests use custom Cypress commands to make HTTP requests to the API and verify the response. They verify the behavior of the `/products`, `/categories` and `/brands` endpoints.

### Stubs tests

The tests in this section use stubs to simulate server responses and verify the behavior of the application. The **`cy.intercept()`** command is used to intercept network requests and respond with stubbed data.

# Locators and Data

The Locators object contains **CSS selectors** for elements on the web page. It is organized into several sections, each representing a different **component** of the page.

The Data object contains various data that is used for **input** and **assertion** throughout the application. It includes information about users, payment options, categories, brands, and products.

# Custom Commands

In this project, custom commands are used to make API requests with GET and POST methods. These commands are defined in commands.ts.

- **cy.GET** ━ used to make GET requests to a given URL.

- **cy.POST** ━ used to make POST requests to a given URL with a payload object.

# Utilities

This project includes a utilities file that contains several helper functions used throughout the project to accomplish tasks like **sorting**, **filtering** and **randomizing** data.

# HelperCart

The HelperCart class represents a shopping cart object that manages the list of products in the cart in parallel with the tests. Used for verifying data of all products placed in the actual Cart. It contains several methods for adding, removing and modifying products as well as retrieving information about the cart:

- **`addProduct`** ━ Adds a new product to the cart or increases the quantity of an existing product.

- **`removeProduct`** ━ Removes a product from the cart.

- **`increaseQuantity`** ━ Increases the quantity of a product in the cart by a specified amount.

- **`decreaseQuantity`** ━ Decreases the quantity of a product in the cart by a specified amount.

- **`getTotalProductPrice`** ━ Returns the total price of a specified product in the cart.

- **`getProductQuantity`** ━ Returns the quantity of a specified product in the cart.

- **`getTotalQuantity`** ━ Returns the total quantity of all products in the cart.

- **`getTotalPrice`** ━ Returns the total price of all products in the cart.

- **`getCart`** ━ Returns the list of all products in the cart.

# Fixtures

JSON fixtures are used in stubbed tests in this project as response replacements for API requests.
