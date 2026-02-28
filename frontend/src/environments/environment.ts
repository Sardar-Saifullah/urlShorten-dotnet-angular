// Environment configuration
// Update this URL to match your backend API URL
// Based on your launchSettings.json, your backend runs on:
// - HTTPS: https://localhost:7086
// - HTTP: http://localhost:5151

export const environment = {
  production: false,
  // Use HTTP for development (easier, no SSL issues)
  // Change to HTTPS if your backend requires it
  apiUrl: 'http://localhost:5151/api'
  // Alternative (HTTPS): 'https://localhost:7086/api'
};

