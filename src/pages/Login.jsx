import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/home");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name='username'
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              required
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name='password'
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              required
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        <p className="text-center text-sm mt-4">
          Don't you have an account?{' '}
          <Link to='/register' className="text-teal-700 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login