# URL Shortener - Angular Frontend

This is the Angular frontend for the URL Shortener application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API URL:**
   - Open `src/environments/environment.ts`
   - Update `apiUrl` to match your backend API URL
   - Default: `https://localhost:7086/api`

3. **Start development server:**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open browser:**
   - Navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── url-shortener/    # Form to create short URLs
│   │   └── url-list/          # Table showing all URLs
│   ├── models/
│   │   └── url.model.ts       # TypeScript interfaces
│   ├── services/
│   │   └── url.service.ts     # HTTP service for API calls
│   ├── app.component.ts       # Main app component
│   └── app.module.ts          # App module
├── environments/
│   └── environment.ts         # Environment configuration
└── styles.css                 # Global styles
```

## Features

- ✅ Create short URLs
- ✅ View all URLs in a table
- ✅ Delete URLs
- ✅ Update short codes
- ✅ Copy URLs to clipboard
- ✅ Modern, responsive UI

## API Endpoints Used

- `POST /api/url/shorten` - Create short URL
- `GET /api/url/getall` - Get all URLs
- `DELETE /api/url/{shortCode}` - Delete URL
- `PUT /api/url/update-shortcode/{originalUrl}` - Update short code

## Troubleshooting

### CORS Errors
Make sure your backend CORS is configured for `http://localhost:4200`

### API Connection Issues
1. Check backend is running
2. Verify API URL in `environment.ts`
3. Check browser console for errors

### Port Conflicts
Change Angular port:
```bash
ng serve --port 4201
```

## Build for Production

```bash
ng build --configuration production
```

Output will be in `dist/url-shortener-frontend/`
