import { useEffect, useState } from 'react';
import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateTable from '../components/PotentialCard';

const SavedCandidates = () => {
  const [CandidatesToWatch, setCandidatesToWatch] = useState<Candidate[]>([]);



  useEffect(() => {
    const parsedCandidatesToWatch = JSON.parse(
      localStorage.getItem('PotentialCandidates') as string
    );
    setCandidatesToWatch(parsedCandidatesToWatch);
  }, []);

  return (
    <>
      <h1 className='pageHeader'>Potential Candidates</h1>
      {(!CandidatesToWatch?.length || CandidatesToWatch?.length === 0) ? (
        <h1 style={{ margin: '16px 0' }}>No Candidates Left</h1>
      ) : (
        <CandidateTable
        />
      )}
    </>
  );
};

export default SavedCandidates;
