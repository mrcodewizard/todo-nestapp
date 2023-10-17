import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = {
      username,
      password
    }

    // You can make an API request to your server for user authentication.
    try {
      const response = await axios.post('http://localhost:8080/authentication/login', auth, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Res", response);

      if (response.status === 200) {
         const data = response.data;
        
         // Assuming the API returns a JWT token in the 'token' field
         const jwtToken = data.user.token;

         // Store the token in localStorage
         localStorage.setItem('token', jwtToken);
         alert("LoggedIn successfully")

        // You can also redirect the user to a different page or perform other actions.
      } else {
        alert("Can't login. Server error")
      }
    } catch (error) {
       alert("Error", error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;