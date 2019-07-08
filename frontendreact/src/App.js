import React from 'react';
import './App.scss';
import Grid from './components/grid/grid';

function App() {
  return (
    <div className="App">
      <Grid value={'cunt'}
            width={10}
            height={10}
            squareWidth={10}
            squareHeight={10}/>
    </div>
  );
}

export default App;
