import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">CandidateSearch</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Search
          </Link>
          <Link to="/saved" className="text-white hover:text-gray-300">
            Saved Candidates
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;