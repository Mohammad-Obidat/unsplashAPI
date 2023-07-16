# Project Name

React.js Technical Test for TA'AL

## Prerequisites

- Node.js
- Git

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mohammad-Obidat/unsplashAPI.git

   ```

2. Navigate to the project directory

   ```bash
   cd unsplashAPI

   ```

3. Install the dependencies

either on root (backend), or cd client (frontend)

```bash
npm install

```

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

```makefile
UNSPLASH_ACCESS_KEY=<your-Unsplash-API-key>
PORT=<your-app-port>
```

## Running the App

To start the MERN app, follow these steps:

1. Start the Node.js server:

```bash
npm run server
```

2. Start the React development server (in a new terminal tab):

```bash
npm start
```

3. Open your web browser and visit `http://localhost:<your-app-port>` to see the app in action.

## Project Structure

Describe the structure of your project directory, including key files and directories.

## Additional Information

### Unsplash API

This project utilizes the Unsplash API to fetch and display high-quality images. Follow the instructions below to obtain the necessary credentials and configure the API integration.

#### Getting API Credentials

To use the Unsplash API, you'll need to create an account and obtain an API access key. Here's how:

1. Visit the [Unsplash Developer](https://unsplash.com/developers) website.
2. Sign in or create a new account.
3. Create a new application to generate an API access key.
4. Note down the access key for future use.

#### Configuration

Once you have obtained the API access key, follow these steps to configure the project:

1. In the project directory, locate the `.env` file.
2. Open the `.env` file in a text editor.
3. Set the `UNSPLASH_ACCESS_KEY` environment variable with your API access key:

UNSPLASH_ACCESS_KEY=<your-unsplash-api-access-key>

#### Usage

To fetch images from the Unsplash API, you can utilize the provided functions and endpoints. Here's an example of how to use the API integration:

```javascript
// Example code for fetching images using the Unsplash API

// Import the necessary libraries or modules
// ...

// Set up the API request
const accessKey = process.env.UNSPLASH_ACCESS_KEY;
const endpoint = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;

// Make the API request to fetch a random image
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    // Handle the API response and use the image data
    // ...
  })
  .catch((error) => {
    // Handle any errors that occurred during the API request
    // ...
  });
```

For more details on using the Unsplash API, visit the [Unsplash Documentation](https://unsplash.com/documentation) website.

## License

This project is licensed under the [MIT License](LICENSE).
