import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import Categories from './components/Categories';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/land" element={<Categories/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
