import React from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route} from "react-router-dom";
import LoginForm from "./components/LoginForm";

import AddBike from './components/AddBike';

import SaveChange from './components/SaveChange';
import './App.css';
function App(){


  return (
    

    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login-form" element={<LoginForm/>} />
          <Route exact path="/add-bike" element={<AddBike/>} />
          <Route exact path="/save-change" element={<SaveChange/>} />
          <Route path="/" element={ <Navigate to="/login-form"/>} />
        </Routes>
      </Router>

     
     
      
      
      
      

      
      
      
    </div>

  );
} 
export default App;