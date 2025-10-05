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

## Setting Up the Database

This project uses PostgreSQL as the database. You have several options for setting up the database:

### Option 1: Docker Compose (Recommended)

The easiest way to get started is using Docker Compose, which will set up a PostgreSQL database with simple credentials:

1. Start the PostgreSQL database:

```sh
docker compose up -d
```

> Use `docker-compose` if you are on an older version of Docker and the above command does not work.

2. Wait for the database to be ready (you can check with `docker compose ps`)

3. Run database migrations:

```sh
pnpm drizzle-kit migrate
```

The database will be available at `localhost:5432` with these credentials:

- Database: `hacktoberfest`
- Username: `hacktoberfest`
- Password: `hacktoberfest123`

### Option 2: Local PostgreSQL Installation

If you prefer to install PostgreSQL locally:

1. Install PostgreSQL on your system
2. Create a database named `hacktoberfest`
3. Create a user `hacktoberfest` with password `hacktoberfest123`
4. Grant all privileges on the database to the user

### Option 3: Cloud Database Providers

You can also use cloud database providers like:

- **Neon** (https://neon.tech/) - Free tier available
- **Supabase** (https://supabase.com/) - Free tier available
- **Railway** (https://railway.app/) - Free tier available
- **PlanetScale** (https://planetscale.com/) - Free tier available

Simply create a PostgreSQL database and copy the connection string.

## Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```sh

# Database
DATABASE_URL="" # PostgreSQL connection string
# For Docker Compose: postgresql://hacktoberfest:hacktoberfest123@localhost:5432/hacktoberfest
# For cloud providers: copy the connection string from your provider

# Authentication
AUTH_SECRET="" # A random string
AUTH_URL="" # Should be http://localhost:3000 for local development
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
AUTH_DRIZZLE_URL="$DATABASE_URL" # Should be the same as DATABASE_URL

# Optional
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="" # Optional
NEXT_PUBLIC_ANALYTICS_WEBSITE_ID="" # Optional
```

Make sure to fill in the required values for each variable. The `AUTH_SECRET` should be a random string, and `AUTH_URL` should be set to `http://localhost:3000` for local development. The `DATABASE_URL` should point to your PostgreSQL database.

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
