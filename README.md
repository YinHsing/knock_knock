# Run and deploy your React app

This project is a React application using Vite.

## Prerequisites

- **Node.js**: You need to install Node.js to run this project. Download it from [nodejs.org](https://nodejs.org/).

## Setup & Run Locally

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```
    Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

3.  **Build for production:**
    ```bash
    npm run build
    ```

## Deployment

This project is configured to automatically deploy to **GitHub Pages** using GitHub Actions.

### Steps to enable deployment:

1.  Push this code to a GitHub repository.
2.  Go to the repository **Settings** > **Pages**.
3.  Under **Build and deployment** > **Source**, select **GitHub Actions**.
4.  The workflow defined in `.github/workflows/deploy.yml` will automatically build and deploy your app whenever you push to the `main` branch.

## File Structure

- `src/`: Source code
- `.github/workflows/`: GitHub Actions configurations
- `dist/`: Build output (created after running build)
