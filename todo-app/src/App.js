import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import Home from './components/Home.tsx';
import  {Route, Routes}  from 'react-router-dom';

const App = () => {
  <div>Welcome to the task Manager</div>
  return (

      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>

  );
};

export default App;
