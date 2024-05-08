import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateTimeDisplay from './DateTimeDisplay';
const DestinationComponent = () => {
  const [startRoll, setStartRoll] = useState('');
  const [endRoll, setEndRoll] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const navigate = useNavigate();
  const host = "http://localhost:5000"; // corrected the host

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'startRoll') {
      setStartRoll(value);
    } else {
      setEndRoll(value);
    }
  };

  const handleFetchStudents = async () => {
    try {
      const response = await fetch(`${host}/api/student/${startRoll}/${endRoll}`, {
        method: 'GET', // This is optional since GET is the default method
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you need, for example:
          // 'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setStudents(data);
  
      const initialAttendance = {};
      data.forEach((student) => {
        initialAttendance[student._id] = false;
      });
      setAttendance(initialAttendance);
    } catch (error) {
      console.error('There was an error fetching the students:', error.message);
    }
  };
  

  const handleCheckboxChange = (event, studentId) => {
    const { checked } = event.target;
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Attendance:', attendance);
    navigate('/thankyou');
  };

  return (
    <div>
      <h2>Mark Student Attendance</h2>
      <DateTimeDisplay/>
      <form onSubmit={handleSubmit}>
        <label>
          Start Roll Number:
          <input type="text" name="startRoll" value={startRoll} onChange={handleChange} />
        </label>
        <label>
          End Roll Number:
          <input type="text" name="endRoll" value={endRoll} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleFetchStudents}>Fetch Students</button>
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              <input
                type="checkbox"
                id={student._id}
                checked={attendance[student._id] || false}
                onChange={(e) => handleCheckboxChange(e, student._id)}
              />
              <label htmlFor={student._id}>
                {student.name} - Roll Number: {student.roll_number}
              </label>
            </li>
          ))}
        </ul>
        <button type="submit">Submit Attendance</button>
      </form>
    </div>
  );
};

export default DestinationComponent;
