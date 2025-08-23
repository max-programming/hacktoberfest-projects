# Contributing to Hacktoberfest Projects Finder

Thank you for your interest in contributing to the Hacktoberfest Projects Finder! We welcome contributions from everyone. This document will guide you through the process of setting up the project locally and creating a GitHub OAuth application.

## Setting Up the Project

1. Fork the repository on GitHub.
2. Clone your forked repository:

```sh
git clone https://github.com/your-username/hacktoberfest-projects.git
```

3. Navigate to the project directory:

```sh
cd hacktoberfest-projects
```

4. Install dependencies (we recommend using `pnpm`):

```sh
pnpm install
```

5. Copy the `.env.example` file to `.env.local` and fill in the required environment variables.

## Creating a GitHub OAuth Application

To use GitHub authentication in the project, you need to create a GitHub OAuth application. Follow these steps:

1. Go to your GitHub account settings.
2. Navigate to "Developer settings" > "OAuth Apps".
3. Click on "New OAuth App".
4. Fill in the application details:

- Application name: "Hacktoberfest Projects Finder" (or your preferred name)
- Homepage URL: `http://localhost:3000` (for local development)
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

5. Click "Register application".
6. On the next page, you'll see your Client ID. Click "Generate a new client secret" to create your Client Secret.
7. Copy the Client ID and Client Secret to your `.env.local` file.

## Setting Up Xata

Xata is used as the database for this project. Follow these steps to set it up:

1. Sign up for a Xata account at https://lite.xata.io/
2. Create a new workspace and database from Xata dashboard
3. Install the Xata CLI globally:

```sh
npm install -g "@xata.io/cli@latest"
```

4. Authenticate with Xata:

```sh
xata auth login
```

5. Initialize the database:

```sh
xata init
```

5. Upload the database schema:

```sh
xata schema upload db-schema.json
```

6. Generate the Xata client:

```sh
xata codegen
```

## Environment Variables

Create a `.env.local` file in the root of the project and add the following variables:

```sh
AUTH_SECRET="" # A random string
AUTH_URL="" # Should be http://localhost:3000 for local development
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
XATA_API_KEY=""
XATA_BRANCH="" # Default should be "main"

XATA_HTTP_ENDPOINT="http://localhost" # Add this too for local development otherwise xata gives error while pnpm run dev

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="" # Optional
NEXT_PUBLIC_ANALYTICS_WEBSITE_ID="" # Mandatory for local add : 00000000-0000-0000-0000-000000000000
```

Make sure to fill in the required values for each variable. The `AUTH_SECRET` should be a random string, and `AUTH_URL` should be set to `http://localhost:3000` for local development. The `XATA_BRANCH` should typically be set to "main" unless you're using a different branch.

Remember to remove env variables that are optional and you are empty, they will cause validation errors

## Running the Project

After setting up the environment variables, you can start the development server:

```sh
pnpm dev
```

The application should now be running at `http://localhost:3000`.

## Making Contributions

1. Create a new branch for your feature or bug fix:

```sh
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them with a descriptive commit message.
3. Push your changes to your fork:

```sh
git push origin feature/your-feature-name
```

4. Create a pull request from your fork to the main repository.

Please ensure your code follows the project's coding standards and includes appropriate tests if applicable.

## Questions or Issues

If you have any questions or run into issues, please open an issue in the GitHub repository. We're here to help!

Thank you for contributing to the Hacktoberfest Projects Finder!
