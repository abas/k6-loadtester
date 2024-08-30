# k6 Load Testing Script

This repository contains a `k6` load testing script written in TypeScript, designed to dynamically handle payloads, headers, and HTTP methods using environment variables.

## Table of Contents

- [Cloning the Repository](#cloning-the-repository)
- [Installation](#installation)
- [Running the Script](#running-the-script)
- [Using the `.env` File](#using-the-env-file)
- [Notes](#notes)

## Cloning the Repository

To clone this repository, use the following command:

```bash
git clone https://github.com/abas/k6-loadtester.git
cd k6-loadtester
```

## Installation

1. **Ensure you have Node.js and `npm` installed.**

2. **Install the necessary packages:**

   ```bash
   npm install
   ```

   This will install the required TypeScript and `k6` packages for development.

3. **Install `k6` globally if you haven't already:**

   ```bash
   npm install -g k6
   ```

## Running the Script

1. **Run the complete build and test process:**

   ```bash
   npm test
   ```

   This command will:
   - Compile TypeScript files.
   - Copy `payloads` and `headers` directories to `dist`.
   - Run the `k6` script with the environment variables specified in the `.env` file.

2. **Alternatively, you can run individual steps:**

   - **Compile TypeScript:**

     ```bash
     npm run build
     ```

   - **Copy `payloads` and `headers` directories:**

     ```bash
     npm run postbuild
     ```

   - **Run the `k6` script:**

     ```bash
     npm run run:test
     ```

## Using the `.env` File

The `.env` file should be located in the root directory of the repository and contains environment-specific variables. Here's an example `.env` file:

```plaintext
TARGET_URL=https://example.com/api/endpoint
ITERATIONS=10
TARGET_PAYLOAD=./payloads/payload.1.json
TARGET_HEADERS=./headers/headers.json
HTTP_METHOD=POST
```

- **`TARGET_URL`**: The URL to which the request will be sent.
- **`ITERATIONS`**: The number of times the request will be sent.
- **`TARGET_PAYLOAD`**: The path to the JSON file containing the request payload.
- **`TARGET_HEADERS`**: The path to the JSON file containing the custom headers.
- **`HTTP_METHOD`**: The HTTP method to use for the request. Supported values are `POST`, `GET`, `PUT`, and `DELETE`. Defaults to `POST` if not specified.

## Notes

- Ensure that the `payloads` and `headers` folders exist in the `src` directory and contain the appropriate files as specified in the `.env` file.
- The `payloads` folder should contain JSON files with request payloads.
- The `headers` folder should contain JSON files with custom headers.
- The `HTTP_METHOD` variable allows you to specify the request method dynamically.

Feel free to customize the `.env` file according to your testing needs.