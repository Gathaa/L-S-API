import React from 'react';
import SignUp from './SignUp'
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
  <Router>
            <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Login />} />
       
        </Routes>

      </Router>
    </div>
  );
}

export default App;
