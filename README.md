# StudentManagementSystem
Mongodb Express.js React.js Node.js Firebase
# Attendance Management System

## Overview

The Attendance Management System is designed to facilitate the management of student attendance for educational institutions. It offers separate functionalities for administrators and teachers, catering to their specific roles and responsibilities within the system.

## User Roles and Permissions

### Administrator

Upon logging into the system, the administrator has access to the following functionalities:

1. **Add Student:** Manually add student data to the system.
2. **Class Report:** View attendance reports for each class and take necessary actions.

### Teacher

Upon logging into the system, the teacher has access to the following functionalities:

1. **Create Class:** Create a new class by specifying subject, date, time, and batch details. Additionally, mention the roll number range of students enrolled for the class.
2. **Previous Classes:** Access information about previous classes.

## Functionality Details

### Administrator

#### Add Student
- Manually add student details such as name, roll number, etc., to the system.

#### Class Report
- View attendance reports for each class.
- Take actions based on attendance data, such as follow-ups with absent students or generating reports.

### Teacher

#### Create Class
- Specify subject, date, time, and batch details for a new class.
- Mention the roll number range of students enrolled for the class.
- Upon submission, redirected to a separate window with details of enrolled students and a checklist to mark attendance.

#### Previous Classes
- Access information about previous classes, including attendance records and other relevant details.

## How to Use

### Administrator

1. Log in to the system with administrator credentials.
2. Click on the "Add Student" icon to manually add student details.
3. Click on the "Class Report" icon to view attendance reports and take necessary actions.

### Teacher

1. Log in to the system with teacher credentials.
2. Click on the "Create Class" icon to create a new class, specifying subject, date, time, batch, and roll number range.
3. Upon submission, mark attendance for the class using the checklist provided.
4. Access information about previous classes by clicking on the "Previous Classes" icon.

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Configure environment variables.
5. Run the application using `npm start`.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is completed by Shruti Sonal 20/ECE/149
