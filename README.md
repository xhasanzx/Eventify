<<<<<<< HEAD
# Event Booking Website

A full-stack event booking application built with Django and React.

## Project Structure

- `backend/` - Django backend application
- `frontend/` - React frontend application

## Prerequisites

### Backend
- Python 3.8 or higher
- pip (Python package manager)
- virtualenv (recommended)

### Frontend
- Node.js 14.0 or higher
- npm or yarn package manager

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up the database:
```bash
python manage.py migrate
```

5. Create a superuser (admin):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the frontend root directory with the following content:
```
REACT_APP_API_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The frontend will be available at `http://localhost:3000`

## Features

### Backend
- Django REST Framework for API development
- SQLite database (Development)
- PostgreSQL database (Production)
- CORS configuration for frontend integration
- Authentication endpoints
- Event management endpoints
- Booking management endpoints

### Frontend
- Modern UI with Material-UI components
- Responsive design
- Form validation
- Error handling
- Loading states
- Authentication flow
- Event browsing and booking
- User dashboard

## Development

### Backend Development
- The backend uses Django REST Framework for API development
- SQLite is used as the development database
- CORS is configured to allow requests from the frontend

### Frontend Development
- The frontend uses Create React App
- Material-UI for styling
- Axios for API requests
- React Router for navigation

## Testing

### Backend Testing
Run tests using:
```bash
python manage.py test
```

### Frontend Testing
Run tests using:
```bash
npm test
# or
yarn test
```

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
# or
yarn build
```
The build output will be in the `frontend/build/` directory.

### Backend Deployment
1. Set up a production database (PostgreSQL recommended)
2. Configure environment variables
3. Run migrations
4. Collect static files
5. Deploy using your preferred hosting service

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Tech Stack

### Backend
- Django
- Django REST Framework
- SQLite (Development)
- PostgreSQL (Production)

### Frontend
- React
- Material-UI
- Axios
- React Router

=======
## 🚧 Project Status
This project is currently under active development. New features and improvements are being added regularly.

Event Booking Website
A Django-based web application that allows users to browse, book, and manage events. The platform includes user authentication, event listings with detailed descriptions, a booking system, and an admin interface for event management.

🔧 Key Features
User Registration & Login
Secure sign-up and login functionality with session management.

Event Listings
View upcoming events with details like date, location, and availability.

Booking System
Book and manage tickets for events, with real-time availability updates.

Admin Dashboard
Event organizers can add, edit, or remove events, and view booking statistics.
>>>>>>> 1eef57819cd4f6fefeeb350c4694fdd19215f48a
