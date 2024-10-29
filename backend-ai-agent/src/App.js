import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // State to hold the students fetched from the backend
  const [students, setStudents] = useState([]);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:4000/get-all-students')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data); // Set the students data from the response
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, []); // The empty array ensures this runs only once, when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student List</h1>
        {students.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Major</th>
              </tr>
            </thead>
            <tbody>                            
              {students.map((student) => ( //using map function to itirate over the student array 
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.major}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading students...</p>
        )}
      </header>
    </div>
  );
}

export default App;
