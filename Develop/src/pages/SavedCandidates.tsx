import { useState, useEffect } from "react";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const removeCandidate = (id: number) => {
    const updated = savedCandidates.filter((c) => c.id !== id);
    setSavedCandidates(updated);
    localStorage.setItem('savedCandidates', JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <img src={candidate.avatar_url} alt={candidate.login} width={50} />
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.login}</a>
              <button onClick={() => removeCandidate(candidate.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
