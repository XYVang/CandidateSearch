import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p className="text-gray-500">No candidates have been accepted.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedCandidates.map((candidate) => (
            <div key={candidate.id} className="border rounded-lg p-4 shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src={candidate.avatar_url} 
                  alt={candidate.login} 
                  className="w-16 h-16 rounded-full mr-4" 
                />
                <div>
                  <h2 className="text-xl font-semibold">{candidate.name || candidate.login}</h2>
                  <p className="text-gray-600">@{candidate.login}</p>
                </div>
              </div>
              
              <div className="mb-4">
                {candidate.location && <p><span className="font-semibold">Location:</span> {candidate.location}</p>}
                {candidate.email && <p><span className="font-semibold">Email:</span> {candidate.email}</p>}
                {candidate.company && <p><span className="font-semibold">Company:</span> {candidate.company}</p>}
                <p>
                  <span className="font-semibold">GitHub:</span> 
                  <a 
                    href={candidate.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline ml-1"
                  >
                    {candidate.html_url}
                  </a>
                </p>
              </div>
              
              <button 
                onClick={() => removeCandidate(candidate.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;