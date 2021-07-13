import logo from './logo.svg';
import './App.css';
import WhaleWatching from './components/WhaleWatching';
import UserPortfolio from './components/UserPortfolio';
import { useState } from 'react';
import LPTracker from './components/LPTracker';

function App() {

const [whichScreen, setWhichScreen] = useState(0);

  const toggleScreen = () => {
    var cScreen = whichScreen;
    setWhichScreen((cScreen + 1) % 3);
  }

  const renderScreen = () => {
    switch(whichScreen) {
      case 0: return <WhaleWatching />;
      case 1: return <UserPortfolio />;
      case 2: return <LPTracker />;
      default: return <h4>Unhandled case</h4>;
    }
  }


  return (
    <div className="App">
      <div style={{position:'absolute', top:'20px'}}>
        <button onClick={() => toggleScreen()}>Switch Screen</button>
      </div>
      {renderScreen()}
    </div>
  );
}

export default App;
