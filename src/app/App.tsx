import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import NotFoundPage from '../pages/404';
import ArchivePage from '../pages/Archive';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router> 
    )
    ;
}

export default App;
