import React from 'react';
import './styles/App.css';
import CodeLingual from './components/CodeLingual';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CodeLingual />
      </header>
      <Footer />
    </div>
  );
}

export default App;
