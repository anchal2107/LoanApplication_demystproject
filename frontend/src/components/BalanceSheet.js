import React, { useState, useEffect } from 'react';

import './style.css';
import LoanApplication from './LoanApplication';

const BalanceSheet = (props) => {    
    const { bankId, bankName, yearEstablished } = props;
    const [balanceSheet, setBalanceSheet] = useState([]);
    const [SelectedEntry, setSelectedEntry] = useState([]);
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {       
              const response = await fetch(`http://localhost:3000/loan/balance-sheet?bankId=${bankId}`);      
              if (!response.ok) {
                throw new Error('Error fetching banks');
              }      
              const data = await response.json();      
              setBalanceSheet(data.balanceSheet);
            } catch (error) {
              console.error('Error fetching balance sheet:', error);
              setMessage('Error fetching balance sheet');
            }
          };
          fetchData();
      }, [bankId]);

const handleSelectAll = (isChecked) => {
    if(isChecked){
        setSelectedEntry(balanceSheet);
        setIsSelectAll(true);
    }else{
        setSelectedEntry([]);
        setIsSelectAll(false);
    }
}
      const handleSelect = (singleEntry,isChecked) => {
       if(isChecked){
        if(balanceSheet.length === SelectedEntry.length + 1){
            setIsSelectAll(true);
          }
        setSelectedEntry([...SelectedEntry,singleEntry]);      
    }
        else{
            setIsSelectAll(false);
          let index = SelectedEntry.indexOf(singleEntry);
          let newSelectedEntry = [...SelectedEntry];
          newSelectedEntry.splice(index,1);
          setSelectedEntry(newSelectedEntry);
            
        }
      };
    
    return (<>
   <div className="container">
    <div>

   
      <h1> Balance-Sheet of {bankName}</h1>
      {(message || message != '') && <p>{message}</p>}
      <button onClick={()=>handleSelectAll(!isSelectAll)}>{isSelectAll? 'UnSelect All':'Select All'}</button>
      <table>
      <thead>
        <tr>
          <th>
         select
          </th>
          <th>Year</th>
          <th>Month</th>
          <th>Profit/Loss</th>
          <th>Assets</th>
        </tr>
      </thead>
      <tbody>
        {balanceSheet.map((entry,index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"     
                checked={SelectedEntry.includes(entry)}          
                onChange={(e) => handleSelect(entry,e.target.checked)}
              />
            </td>
            <td>{entry.year}</td>
            <td>{entry.month}</td>
            <td>{entry.profitOrLoss}</td>
            <td>{entry.assetsValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
      </div>
      {SelectedEntry && SelectedEntry.length > 0 && <LoanApplication businessData={{name:bankName,yearEstablished:yearEstablished,balanceSheet:SelectedEntry}}></LoanApplication>}
    </>);
}
export default BalanceSheet;