import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = () => {
    // Generate a random number between 0 and 1
    const rand = Math.random();

    // If the number is less than or equal to 0.5, set the loggedIn state to true
    // Otherwise, set the loginFailed state to true
    if (rand <= 0.5) {
      setLoggedIn(true);
    } else {
      setLoginFailed(true);
    }
  };

  if (loggedIn) {
    // If the user is logged in, redirect to the main page
    return <Navigate to="/main" />;
  }

  return (
    <div>
      <h1>Login</h1>
      {loginFailed && <div>Login Failed.</div>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;