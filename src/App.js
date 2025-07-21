import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="font-sans bg-white min-h-screen text-[#111518]">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
