# Build-A-Schedule Application

## Overview

The **Build-A-Schedule Application** is a dynamic web application that simplifies the process of managing academic courses, sections, and instructors. Users can add new courses, assign instructors to specific sections, and manage the association between courses and sections in real-time. 

The backend is built with **Node.js** using **Express.js** and a **SQLite** database, while the frontend leverages **React.js** for an interactive user experience. The app's modular design allows for scalability and customization to suit various scheduling needs.

## Features

1. **Course Management**:
   - Add new courses with unique names.
   - View a list of existing courses and their associated sections.

2. **Section Management**:
   - Add new sections to a course by selecting an instructor.
   - Update the instructor of an existing section.
   - Delete sections as needed.

3. **Instructor Management**:
   - Display all available instructors.
   - Assign instructors to specific sections of courses.

4. **Dynamic Updates**:
   - Real-time updates to the UI upon performing CRUD operations.
   - Notifications for errors during data operations.

5. **Backend API**:
   - RESTful API endpoints for managing courses, sections, and instructors.
   - Robust error handling to ensure data consistency.

6. **Frontend Features**:
   - Clean and responsive UI built with React.
   - Form submissions for adding courses and sections.
   - Loading indicators and error handling for improved user experience.

---

## Technologies Used

### Backend:
- **Node.js**: Server-side runtime for the application.
- **Express.js**: Framework for building API endpoints and handling requests.
- **SQLite**: Lightweight relational database for persistent data storage.
- **CORS**: Middleware to enable cross-origin requests.

### Frontend:
- **React.js**: Library for building the user interface.
- **Axios**: Promise-based HTTP client for interacting with the backend API.
- **Bootstrap**: CSS framework for responsive design.

---

## API Endpoints

### Courses
- `GET /data`: Fetch all instructors, courses, and sections.
- `POST /courses`: Add a new course.

### Sections
- `POST /courses/:courseId/newSection`: Add a new section to a specific course.
- `PUT /sections/:sectionId`: Update the instructor for a section.
- `DELETE /sections/:sectionId`: Delete a section.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <https://github.com/jorgebjr28/schedule-builder-react.git>
