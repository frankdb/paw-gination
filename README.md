# Paw-gination: Dog Breeds Viewer

This project is a full-stack application that displays information about various dog breeds. It consists of a React frontend and a Flask backend.

## Project Structure

```
.
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── test_app.py
└── frontend/
    ├── src/
    │   ├── Breeds.tsx
    │   ├── Breeds.test.tsx
    │   └── ...
    ├── package.json
    └── ...
```

## Backend

The backend is built with Flask and serves as an API proxy to fetch dog breed data.

### Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Create a virtual environment (optional but recommended):

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```
   python app.py
   ```

The server will start running on `http://127.0.0.1:5000`.

### API Endpoints

- `GET /api/dogs?page=<page_number>`: Fetches a paginated list of dog breeds.

## Frontend

The frontend is built with React, TypeScript, and Vite.

### Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run lint`: Runs the linter
- `npm run preview`: Previews the built app
- `npm test`: Runs the test suite with coverage

## Technologies Used

### Backend

- Flask
- Requests
- Flask-CORS

### Frontend

- React
- TypeScript
- Vite
- React Query
- Tailwind CSS
- DaisyUI
- Vitest (for testing)

## Features

- Displays a list of dog breeds with images
- Pagination support
- Error handling and loading states

## Testing

- Backend tests can be run using pytest
- Frontend tests are written using Vitest and React Testing Library

## Notes

- The backend serves as a proxy to fetch data from `https://interview-wheat.vercel.app/api/dogs`
- CORS is configured to allow requests from the frontend (`http://localhost:5173`)
- The frontend uses React Query for efficient data fetching and caching

For more detailed information, please refer to the source code and comments within the project files.
