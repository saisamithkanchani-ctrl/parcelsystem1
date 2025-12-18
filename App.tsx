
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tracking from './pages/Tracking';
import Prediction from './pages/Prediction';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<Tracking />} />
          <Route path="/predict" element={<Prediction />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Catch-all route to redirect back home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
