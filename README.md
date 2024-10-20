# Movie App

This README provides instructions on how to run the app both in a browser and for development purposes.

## Running Production in Browser

To run the app in a browser, you'll need a web server. I recommend using `serve` for its simplicity.

1. Install `serve` globally using npm:

   ```
   npm install -g serve
   ```

2. Navigate to the project directory in your terminal.

3. Run the following command to serve the app from the "public" folder:

   ```
   serve public
   ```

4. Open your browser and go to the URL provided by `serve` (typically `http://localhost:3000`).

## Development Setup

To work with the code and run the app in development mode, follow these steps:

1. Ensure you have [pnpm](https://pnpm.io/) installed on your system.

2. Navigate to the code directory.

3. Install the dependencies:

   ```
   pnpm install
   ```

4. Start the development server:

   ```
   pnpm run dev
   ```

5. Open your browser and go to the URL provided in the terminal (typically `http://localhost:5173`).

Now you can make changes to the code, and the app will automatically reload with your updates.
