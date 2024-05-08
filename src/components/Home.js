import React from 'react';
import Card from "./card"; // Assuming Card component is in a file named Card.js
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
      <Navbar/>
      <div>
        <h1>Student Management System</h1>
        <div className="d-flex flex-row mx-4 my-4">
          <div className='my-2 mx-4'>  
            <Card title="Make a Class" content="Teachers can create a class and mark attendance manually" />
          </div>
          <div className="my-2">
            <Card title="See Class Report" content="Teachers can view their specific class report" />
          </div>
        </div>
      </div>
     </>
  );
};

export default Home;

