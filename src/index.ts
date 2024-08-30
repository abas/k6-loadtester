import { check, sleep } from 'k6';
import http from 'k6/http';

// Get file paths and HTTP method from the environment variables
const payloadFilePath = __ENV.TARGET_PAYLOAD;
const headersFilePath = __ENV.TARGET_HEADERS;
const httpMethod = __ENV.HTTP_METHOD || 'POST'; // Default to POST if not specified

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

  // Send the request using the specified HTTP method
  let res;
  if (httpMethod.toUpperCase() === 'POST') {
    res = http.post(url, JSON.stringify(payload), params);
  } else if (httpMethod.toUpperCase() === 'GET') {
    res = http.get(url, params);
  } else if (httpMethod.toUpperCase() === 'PUT') {
    res = http.put(url, JSON.stringify(payload), params);
  } else if (httpMethod.toUpperCase() === 'DELETE') {
    res = http.del(url, JSON.stringify(payload), params);
  } else {
    throw new Error(`Unsupported HTTP method: ${httpMethod}`);
  }

  // Check the response
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1); // Pause for 1 second between requests
}
