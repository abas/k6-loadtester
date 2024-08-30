import { check, sleep } from 'k6';
import http from 'k6/http';

// Get file paths from the environment variables
const payloadFilePath = __ENV.TARGET_PAYLOAD;
const headersFilePath = __ENV.TARGET_HEADERS;

// Read the payload and headers from the files using k6's open function
const payload = JSON.parse(open(payloadFilePath));
const headers = JSON.parse(open(headersFilePath));

export let options = {
  vus: 1, // Number of virtual users
  iterations: parseInt(__ENV.ITERATIONS, 10), // Number of iterations
};

export default function () {
  // Get the URL from the environment variable
  const url = __ENV.TARGET_URL;

  // Define the request headers
  const params = {
    headers: headers,
  };

  // Send the POST request
  const res = http.post(url, JSON.stringify(payload), params);

  // Check the response
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1); // Pause for 1 second between requests
}
