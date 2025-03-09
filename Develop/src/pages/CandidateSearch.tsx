import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    const data = await searchGithub();
    setCandidates(data);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    const user = await searchGithubUser(searchTerm);
    setCandidates(user ? [user] : []);
    setLoading(false);
  };

  const saveCandidate = (candidate: any) => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    if (!saved.find((c: any) => c.id === candidate.id)) {
      saved.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(saved));
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <input
        type="text"
        placeholder="Search GitHub Username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={fetchCandidates}>Fetch Candidates</button>
      {loading && <p>Loading...</p>}
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <img src={candidate.avatar_url} alt={candidate.login} width={50} />
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.login}</a>
            <button onClick={() => saveCandidate(candidate)}>Save</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;
