import React, { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from '../generated/graphql'; 


const AuthForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // Register mutation
  const [registerMutation, { data: registerData, loading: registerLoading, error: registerError }] = useRegisterMutation();
  // Login mutation
  const [loginMutation, { data: loginData, loading: loginLoading, error: loginError }] = useLoginMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerMutation({ variables: { name, email, password} });
      console.log(registerData);
    } catch (error:any) {
      // Handling errors as 'any' to capture GraphQL error object or any other error
      console.error('Registration Error:', error?.message || error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation({ variables: { email, password } });
      console.log(loginData);
    } catch (error: any) {
      // Handling errors as 'any' to capture GraphQL error object or any other error
      console.error('Login Error:', error?.message || error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      
        <button type="submit" disabled={registerLoading}>Register</button>
      </form>

      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loginLoading}>Login</button>
      </form>

      {registerError && <p>Error during registration: {registerError.message}</p>}
      {loginError && <p>Error during login: {loginError.message}</p>}
    </div>
  );
};

export default AuthForm;
