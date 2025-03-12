import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Nav />
        <div className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<CandidateSearch />} />
            <Route path="/saved" element={<SavedCandidates />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;