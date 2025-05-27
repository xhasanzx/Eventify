# Event Booking Website

A Django-based web application that allows users to browse, book, and manage events. The platform includes user authentication, event listings with detailed descriptions, a booking system, and an admin interface for event management.

## Features

- User Registration & Login
- Event Listings with Images
- Event Booking System
- Admin Dashboard for Event Management
- Responsive Design with Tailwind CSS

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/xhasanzx/ATC_01000178066
cd EventBooking
```

2. Install dependencies:
```bash
pip install django
pip install pillow
```

3. Set up the database:
```bash
python manage.py migrate
```

4. Create a superuser (admin):
```bash
python manage.py createsuperuser
```

5. Run the development server:
```bash
python manage.py runserver
```

The application will be available at `http://127.0.0.1:8000`

## Usage

### Admin Interface
1. Access the admin interface at `http://127.0.0.1:8000/admin`
2. Log in with your superuser credentials
3. Manage events

### User Features
1. Register a new account or login
2. Browse available events
3. View event details
4. Book events

## Project Structure

```
EventBooking/
├── eventBookingApp/          # Main application directory
│   ├── templates/            # HTML templates
│   ├── models.py            # Database models
│   ├── views.py             # View functions
│   └── urls.py              # URL configurations
├── EventBooking/            # Project settings
├── manage.py                # Django management script
└── db.sqlite3              # SQLite database
```


### Styling
The application uses Tailwind CSS for styling. The templates are located in `eventBookingApp/templates/`.

## Tech Stack

- Django
- SQLite (Development)
- Tailwind CSS
- HTML/CSS/JavaScript
