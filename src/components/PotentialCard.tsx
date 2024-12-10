import React, { useEffect, useState } from "react";
import { FcDisapprove } from "react-icons/fc";
import Candidate from '../interfaces/Candidate.interface';

const CandidateTable = () => {

  const [candidates, setCandidates] = useState<Candidate[]>([]);
    // Load candidates from localStorage when the component mounts
    useEffect(() => {
      const storedCandidates = localStorage.getItem("PotentialCandidates");
      if (storedCandidates) {
        setCandidates(JSON.parse(storedCandidates));
      }
    }, []);

    const handleRemoveCandidate = (candidate: Candidate) => {
      const updatedCandidates = candidates.filter((c) => c.login !== candidate.login);
      setCandidates(updatedCandidates); // Update the state
      localStorage.setItem("PotentialCandidates", JSON.stringify(updatedCandidates)); // Update localStorage
    };

  return (
    <section className="candidate-table">
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Login</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.login}>
              <td>
                <img
                  className="candidate-pic"
                  src={candidate.avatar_url}
                  alt={candidate.name || "Candidate"}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </td>
              <td>{candidate.name || "No Name Given"}</td>
              <td>{candidate.location || "No Location Given"}</td>
              <td>{candidate.email || "No Email Given"}</td>
              <td>{candidate.company || "No Company Given"}</td>
              <td>{candidate.login || "N/A"}</td>
              <td>{candidate.bio || "No Bio Given"}</td>
              <td>
                <FcDisapprove
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => handleRemoveCandidate(candidate)} // Trigger the remove function
                  title="Reject Candidate"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CandidateTable;