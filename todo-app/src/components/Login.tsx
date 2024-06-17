import React, { useState } from "react";
import axios from "axios";
import  {Link, useNavigate}  from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import Navbar from "./Navbar.tsx";
import { ApiConstants } from "../api/ApiConstants.ts";



const Login:React.FC = () => {
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      try{
        const response = await axios.post('http://localhost:3000'+ ApiConstants.LOGIN, {email,password});
        const { token, userId } = response.data;
        if (!token || !userId) {
          throw new Error('Token or userId is missing in the response');
        }
        localStorage.setItem('token',token);
        localStorage.setItem('userId', userId);
        navigate('/Home');
      }
      catch(err){
          setError('Invalid credentials');
          console.log(error);
      }
    }

  

        

  return (
    <div>
      <Navbar />

      <div className="text-center py-4 bg-light">
  <h2>Welcome to the Task Manager</h2>
  <p className="lead">Please sign in to continue!</p>
</div>

      <div className="container">
      <div className="card mt-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card-body">
          <h2 className="card-title mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            
              <label htmlFor="email" className="form-label"><PersonIcon/> Email:</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"><PasswordIcon/> Password:</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary">Login</button>
            <p className="mt-2">Don't have an account? <Link to="/signUp">Register here</Link></p>
          </form>
        </div>
      </div>
    </div>
    </div>


  );
};


export default Login;
