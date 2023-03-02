import React, { useEffect, useState } from 'react';
import './App.scss';
import { Animals } from './components/Animals/Animals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimalBig } from './components/AnimalBig/AnimalBig';




function App() {


  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Animals></Animals>}></Route>
  <Route path="/animal/:id" element={<AnimalBig></AnimalBig>}></Route>
  </Routes>
    </BrowserRouter>
    
  );
}


export default App