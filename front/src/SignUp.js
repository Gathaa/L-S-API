import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import 'boosted/dist/css/boosted.min.css';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState(null);
  async function handleSignUp(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: username,
          Email: email,
          Password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSignupStatus('success');
      } else {
        setSignupStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSignupStatus('error');
    } finally {
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <p><i><b><u>Sign Up</u></b></i></p>
        </div>
        {signupStatus === 'success' && (
          <div className="alert alert-success" role="alert">
            <span className="alert-icon"><span className="visually-hidden">Success</span></span>
            <p>Sign Up Successful. Please proceed to login.</p>
          </div>
        )}
        {signupStatus === 'error' && (
          <div className="alert alert-danger" role="alert">
            <span className="alert-icon"><span className="visually-hidden">Error</span></span>
            <p>Error occurred while trying to sign up.</p>
          </div>
        )}
          <div className="form-group">
            <label>Username:</label>
            <input type="text" className="form-control input-box" value={username} onChange={(e) => setUsername(e.target.value)} id="inputUsername" required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control input-box" value={email} onChange={(e) => setEmail(e.target.value)} id="inputEmail" required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control input-box" value={password} onChange={(e) => setPassword(e.target.value)} id="inputPassword" required />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSignUp}>SignUp
          </button>
      </div>
    </div>
  );
}

export default SignUp;
