import React, { useState } from "react";
import axios from "axios";
import  {useNavigate}  from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import Navbar from './Navbar.tsx';
import { ApiConstants } from "../api/ApiConstants.ts";

const SignUp:React.FC = () => {

    const[firstname,setFirstName] = useState('');
    const[lastname,setLastName] = useState('');
    const[email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault();
        setError('');

        try{
            const response = await axios.post('http://localhost:3000'+ApiConstants.USER.SIGN_UP,{firstname,lastname,email,password});
            console.log(response);
            navigate('/Login');
        }
        catch(err){
            setError('Invalid credentials');
            console.log(error);
        }
    }


    return (
        <div>
      <Navbar />
                    <div className="container">
        <div className="card mt-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className="card-body">
            <h2 className="card-title mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                <label htmlFor="firstname" className="form-label"><PersonIcon/> Firstname:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="firstname" 
                  value={firstname} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label"><PersonIcon/> Lastname:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="lastname" 
                  value={lastname} 
                  onChange={(e) => setLastName(e.target.value)} 
                  required 
                />
              </div>
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
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>

        </div>

    )
}

export default SignUp;