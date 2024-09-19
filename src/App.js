import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PackageDetailPage from './components/PackageDetailPage';
import VersionDetailPage from './components/VersionDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/package/:packageName" element={<PackageDetailPage />} />
        <Route path="/package/:packageName/:version" element={<VersionDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
