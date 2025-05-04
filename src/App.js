import './App.css';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import React, { useState } from 'react';
import Alert from './Components/Alert';
import Footer from './Components/Footer';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#000000'; // Set pure black for dark mode
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white'; // Light mode
      showAlert("Light mode has been enabled", "success");
    }
  };

  return (
    <>
        <Navbar  title="Pro Text Editor" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-4" style={{ backgroundColor: mode === 'dark' ? '#000000' : 'white', color: mode === 'dark' ? 'white' : 'black' }}>
            <TextForm showAlert={showAlert} heading="Enter Text To Analyze" mode={mode} />
        </div>
        <Footer mode={mode} />
    </>
  );
}

export default App;
