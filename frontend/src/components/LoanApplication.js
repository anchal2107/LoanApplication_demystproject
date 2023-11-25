// Import necessary libraries and dependencies
import React, { useState,useEffect } from 'react';
import './style.css';
const LoanApplication = ({businessData}) => {
  const [initiateMessage, setInitiateMessage] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  useEffect(() => {
    setInitiateMessage('');
    setSubmitMessage('');
  }, [businessData]);
  const handleInitiate = async () => {
    try {
      const response = await fetch('http://localhost:3000/loan/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
     setInitiateMessage(`Simple Message API Called : ${data.message}`);
    } catch (error) {
      console.error('Error initiating application:', error);
      setInitiateMessage('Error initiating application');
    }
  };

  // Function to submit the application
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/loan/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business: businessData,
        })
      });

      const data = await response.json();
      let message =`Calculated On Base of SelectedEntry :  preAssessment ${data.preAssessment} ` + data.message ;
     
      setSubmitMessage(message);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitMessage('Error submitting application');
    }
  };
  return (
    <div className="container">
      <h1>CalCulate </h1>
      <button onClick={()=>handleInitiate()}>Initiate Application</button>
      <p> {initiateMessage}</p>
      <button onClick={()=>handleSubmit()}>Submit Application</button>
      <p>{submitMessage}</p>
    </div>
  );
};

export default LoanApplication;
