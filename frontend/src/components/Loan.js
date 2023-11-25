// src/components/Loan.js
import React, { useState, useEffect } from 'react';
import './style.css';
import BalanceSheet from './BalanceSheet';
const Loan = () => {

  const [bankData, setBankData] = useState([]);
  const [message, setMessage] = useState('');
  const [selectBank, setSelectedBank] = useState(null);

  const selectBankHandler = (bankId, bankName) => {
    setSelectedBank({bankId, bankName});
    console.log(bankId, bankName)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {       
        const response = await fetch('http://localhost:3000/loan/banks');

        if (!response.ok) {
          throw new Error('Error fetching banks');
        }

        const data = await response.json();

        setBankData(data.bankNames);
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching balance sheet:', error);
        setMessage('Error fetching balance sheet');
      }
    };

    fetchData();

  }, []); 



  return (
    <div className="container">
      <div >
      <h1>Loan Application</h1>
      <p>{message}</p>
      <h2>Bank Names</h2>
      <table>
        <thead>
          <tr>
            <th >Bank Name</th>
            <th>Established On</th>       
            <th>Show BalanceSheet</th>  
          </tr>
        </thead>
        <tbody>
          {bankData.map(entry => (
            <tr key={`${entry.id}`}>
              <td>{entry.name}</td>
              <td>{entry.yearEstablished }</td>       
              <td>
              <button  onClick={()=>selectBankHandler(entry.id,entry.name)}> {(selectBank && selectBank.bankId == entry.id)? 'selected' : 'Get '}</button>
              </td>     
            </tr>
          ))}
        </tbody>
      </table>
      </div>     
     { selectBank &&  <BalanceSheet bankId={selectBank.bankId} bankName={selectBank.bankName} yearEstablished={selectBank.yearEstablished}/>}
    </div>
  );
};

export default Loan;
