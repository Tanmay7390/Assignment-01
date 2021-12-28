import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Data from './App';
import { useNavigate} from "react-router-dom";

export default function Pages () {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('login-state')==='logined')
    {
      navigate('/get-patient');
    }else{
      navigate('/login');
    }
  },[])
    return(<>
    <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/get-patient" element={<Data/>} />
    </Routes>
    </>
  )
}