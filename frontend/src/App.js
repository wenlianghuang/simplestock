import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import Chart from './components/Chart';
import SaveContent from './components/SaveContent'
const App = () => {
  

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chart">Chart</Link>
            </li>
            <li>
              <Link to="/savecontent">Save Content</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/savecontent" element={<SaveContent/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
