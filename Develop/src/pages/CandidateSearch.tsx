import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    setMessage('');
    const data = await searchGithub();
    if (data.length === 0) {
      setMessage('No candidates found. Try again later.');
    }
    setCandidates(data);
    setCurrentIndex(0);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setMessage('');
    const user = await searchGithubUser(searchTerm);
    if (user) {
      setCandidates(user ? [user] : []);
      setCurrentIndex(0);
    } else {
      setMessage(`No user found with username "${searchTerm}"`);
      setCandidates([]);
    }
    setLoading(false);
  };

  const saveCandidate = () => {
    if (candidates.length === 0 || currentIndex >= candidates.length) return;
    
    const candidate = candidates[currentIndex];
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    
    if (!saved.find((c: Candidate) => c.id === candidate.id)) {
      saved.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(saved));
    }
    
    nextCandidate();
  };

  const nextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // No more candidates
      setCandidates([]);
      setMessage('No more candidates available. Click "Fetch Candidates" to get more.');
    }
  };

  const currentCandidate = candidates.length > 0 && currentIndex < candidates.length 
    ? candidates[currentIndex] 
    : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Candidate Search</h1>
      
      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Search GitHub Username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded flex-grow"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
        <button 
          onClick={fetchCandidates}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Fetch Candidates
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {message && <p className="text-center text-gray-500">{message}</p>}
      
      {currentCandidate && (
        <div className="border rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <img 
              src={currentCandidate.avatar_url} 
              alt={currentCandidate.login} 
              className="w-32 h-32 rounded-full mb-4 sm:mb-0 sm:mr-6" 
            />
            <div>
              <h2 className="text-2xl font-semibold">{currentCandidate.name || currentCandidate.login}</h2>
              <p className="text-xl text-gray-600">@{currentCandidate.login}</p>
            </div>
          </div>
          
          <div className="mb-6 space-y-2">
            {currentCandidate.location && (
              <p><span className="font-semibold">Location:</span> {currentCandidate.location}</p>
            )}
            {currentCandidate.email && (
              <p><span className="font-semibold">Email:</span> {currentCandidate.email}</p>
            )}
            {currentCandidate.company && (
              <p><span className="font-semibold">Company:</span> {currentCandidate.company}</p>
            )}
            <p>
              <span className="font-semibold">GitHub:</span> 
              <a 
                href={currentCandidate.html_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline ml-1"
              >
                {currentCandidate.html_url}
              </a>
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={saveCandidate}
              className="bg-green-500 text-white px-6 py-2 rounded-full text-xl hover:bg-green-600"
            >
              +
            </button>
            <button 
              onClick={nextCandidate}
              className="bg-red-500 text-white px-6 py-2 rounded-full text-xl hover:bg-red-600"
            >
              -
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;