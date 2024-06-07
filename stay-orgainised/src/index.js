import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './SIgnup';
import AddTodo from './AddTodo';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
   <Router>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/home/:id' element={<Home/>}/>
      <Route path='/home/:id/:name' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/addtodo' element={<AddTodo/>}/>
    </Routes>
   </Router>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

