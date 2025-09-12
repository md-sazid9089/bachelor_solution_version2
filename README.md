# Bachelor Solution Version 2

A full-stack web application for bachelor and student living solutions. Features include property listings, maid services, shop directories, and more. Built with Node.js/Express, MongoDB (Atlas), and React/Vite.

## Features
- Property management (CRUD)
- Maid service management (CRUD)
- Shop directory (CRUD)
- User authentication
- Modern React frontend with Tailwind CSS
- MongoDB Atlas integration

## Project Structure
```
backend/    # Node.js/Express API, MongoDB models, controllers, routes
frontend/   # React app (Vite), components, styles
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
1. `cd backend`
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your MongoDB URI:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
   ```
4. Start the backend server:
   ```
   node server.js
   ```
5. (Optional) Seed the database:
   ```
   node test_maid.js
   node test_property.js
   node test_shop.js
   ```

### Frontend Setup
1. `cd frontend`
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables
- `MONGODB_URI` (backend): MongoDB Atlas connection string

## Usage
- Access the frontend to browse and manage properties, maids, and shops.
- Use the backend API for CRUD operations (`/api/properties`, `/api/maids`, `/api/shops`).
- Data is stored in MongoDB Atlas.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[ISC](LICENSE)
