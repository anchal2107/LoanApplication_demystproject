import './App.css';
import React, { Suspense, lazy } from 'react';
const Loan = lazy(() => import('./components/Loan'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Loan />
    </Suspense>
      );
}


export default App;
