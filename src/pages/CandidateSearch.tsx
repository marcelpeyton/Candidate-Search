import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import Candidate from '../interfaces/Candidate.interface';
import {useState, useEffect } from 'react';


const CandidateSearch = () => {
  // const [searchGithub, setSearchInput] =  useState<string>('');
  const [users, setUsers] = useState<Candidate[]>([]);
  const [searchGithubCall, setSearchGithubCall] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    avatar_url: "string",
    login: "string",
    location: "string",
    email: "string",
    company: "string",
    bio: "string",
    html_url: "string",
    name: "string"
  } )

  useEffect(() => {
    const initUsers = async () => {
      const fetchedUsers = await searchGithub();      
      setUsers(fetchedUsers); // Update the users state
      await searchForCandidateByLogin(fetchedUsers[0].login)
       // Set the first candidate      
    };

    initUsers();
  }, []);

  useEffect(() => {
    //console.log("Current candidate has changed:", currentCandidate);
  }, [currentCandidate]);

  const addToPotentialCandidates = () => {
    let parsedCandidates: Candidate[] = [];
    const storedCandidates = localStorage.getItem('PotentialCandidates');
    if (typeof storedCandidates === 'string') {
      parsedCandidates = JSON.parse(storedCandidates);
    }
    parsedCandidates.push(currentCandidate);
    localStorage.setItem('PotentialCandidates', JSON.stringify(parsedCandidates));
    
    // Move to the next candidate
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;

      // Check if users array has enough candidates to discard
      if (users[newIndex]) {
        setCurrentCandidate(users[newIndex]);
      } else {
        console.warn("No more candidates to display.");
      }
      return newIndex;
    });
  };

  const searchForCandidateByLogin = async (candidate_login: string) => {
    const data: Candidate = await searchGithubUser(candidate_login);
    setCurrentCandidate(data);    
  };

  const discardCandidate = () => {
    // Move to the next candidate
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;

      // Check if users array has enough candidates to discard
      if (users[newIndex]) {
        setCurrentCandidate(users[newIndex]);
      } else {
        console.warn("No more candidates to display.");
      }
      return newIndex;
    });
  };   

  return (
    <>
      {/* Conditionally render CandidateCard only when currentCandidate is not null */}
      {currentCandidate ? (
        <CandidateCard
          currentCandidate={currentCandidate}
          addToPotentialCandidates={addToPotentialCandidates}
          discardCandidate={discardCandidate}
        />
      ) : (
        <p>No candidates to display.</p>
      )}
    </>
  );
};

export default CandidateSearch;

