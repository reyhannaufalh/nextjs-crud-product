# Culinary Recipe List Frontend

This application is the frontend for the Culinary Recipe List, connected to the previously built backend using Express JS and Prisma. The frontend is built using Next.js and Tailwind CSS.

## Overview

The Culinary Recipe List frontend provides an interface for users to manage and view culinary recipes. It includes a dashboard for product and category management, a main page for viewing all users' products, a search feature, and a "My Recipes" page for viewing and adding a user's own products. The system includes authentication using JWT.

## Features

- **Dashboard**: Interface for managing product and category data.
- **Main Page**: View a list of products created by all users and search for products.
- **My Recipes**: View a user's own products and add new products.
- **Authentication**: Secure login and registration using JWT.

## Installation

1. Clone this repository
   ```bash
   git clone https://github.com/reyhannaufalh/nextjs-culinary-recipes.git
   ```
2. Navigate to the project directory
   ```bash
   cd culinary-recipe-list-frontend
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Configure the `.env` file according to your backend configuration
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```
5. Start the development server
   ```bash
   npm run dev
   ```

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`. The available features include:

- **Dashboard**
  - Manage product and category data.
- **Main Page**
  - View a list of all products.
  - Search for products.
- **My Recipes**
  - View and manage a user's own products.
  - Add new products.
- **Authentication**
  - Secure login and registration.

## Contributing

If you want to contribute to this project, please create a pull request or open an issue for further discussion.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
