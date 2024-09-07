import QuoteGenerator from './components/QuoteGenerator';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Quotes Generator - Qualifio";
  }, []);
  return (
    <div className="App">
      <QuoteGenerator></QuoteGenerator>
    </div>
  );
}

export default App;
