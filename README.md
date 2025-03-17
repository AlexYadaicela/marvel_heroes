# Marvel Character Explorer
This project is a simple web application built with Vite and vanilla JavaScript that interacts with the Marvel API to display information about Marvel characters. 

## Prerequisites

* **A Marvel Developer Account:** You need a Marvel developer account to obtain API keys. Sign up at [developer.marvel.com](https://developer.marvel.com/).
* **A modern web browser:** Chrome, Firefox, Safari, or Edge.

## Getting Started

1.  **Download the project files:**
    * Download the project files as a ZIP archive and extract them to a folder on your computer.
    * Alternatively, clone the repository using HTTPS `git clone <https://github.com/AlexYadaicela/marvel_heroes.git>`.

2.  **Set up Marvel API Keys:**

    * Create a `.env` file in the root directory of the project.
    * Add your Marvel API keys to the `.env` file in the following format:

    ```
    VITE_PRIVATE_KEY=your_private_key
    VITE_PUBLIC_KEY=your_public_key
    ```

3.  **Open `index.html` in your browser:**

    * Navigate to the project folder in your file explorer.
    * Double-click the `index.html` file. This will open the application in your default web browser.

4.  **Development and Build (using Vite CLI):**

    While the application can be opened directly, for optimal development and production builds, it's recommended to use Vite's CLI.

    * **Install Node.js and npm:** While the application itself doesn't require Node.js at runtime, Vite's build tools do. You can download Node.js from [nodejs.org](https://nodejs.org/). npm is included with Node.js.

    * **Install Vite:** Open your terminal or command prompt, navigate to the project directory, and run:

    ```bash
    npm install
    ```
    * **Start the development server:**

    ```bash
    npm run dev
    ```

    This will start the Vite development server, and you can access the application in your browser at `http://localhost:5173/` (or the port Vite indicates).
    
    * **Build for production:**

    ```bash
    npm run build
    ```

    This will create a `dist` folder containing the optimized production build. You can then deploy the contents of this folder to a web server.
    * **Preview the build locally:**
    ```bash
    npm run preview
    ```

