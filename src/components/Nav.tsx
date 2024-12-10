import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;
  return (
    <nav>
      <h1>
        <Link to='/' className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>
          Home
        </Link>
      </h1>
      <h1>
        <Link to='/CandidateSearch' className={currentPage === '/CandidateSearch' ? 'nav-link active' : 'nav-link'}>
          Candidate Search
        </Link>
      </h1>
      <h1>
        <Link to='/SavedCandidates' className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}>
          Saved Candidates
        </Link>
      </h1>        
    </nav>
  );
};

export default Nav;
