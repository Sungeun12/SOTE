import React from 'react';
import RootRouter from './components/common/RootRouter';
import './App.css';
import storage from './util/storage';

function App() {
  const user = storage.get('user');

  return (
    <div className="App">
      <RootRouter isLogin={user} />
    </div>
  );
}

export default App;
