import React from 'react';
import RootRouter from './components/common/RootRouter';
import './App.css';

function App() {
  const loginUser = true;

  return (
    <div className="App">
      <RootRouter isLogin={loginUser} />
    </div>
  );
}

export default App;
