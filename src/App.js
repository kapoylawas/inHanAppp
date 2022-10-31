import React from 'react';
import Routes from "./routes/routes";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
     <Toaster />
     <Routes />
  </div>
  );
}

export default App;
