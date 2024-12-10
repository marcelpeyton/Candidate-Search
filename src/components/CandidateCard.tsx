import type React from 'react';
import {FcApprove,FcDisapprove } from "react-icons/fc";
import Candidate from '../interfaces/Candidate.interface';

type CandidateCardProps = {
  currentCandidate: Candidate;
  addToPotentialCandidates?: (() => void) | null;
  onPotentialList?: boolean | null;
  discardCandidate?: (() => void) | null;
  removeFromStorage?:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyPotentialOnList: boolean | null | undefined,
        name: string | null
      ) => void)
    | null;
};

const CandidateCard = ({
  currentCandidate,
  addToPotentialCandidates,
  onPotentialList,
  discardCandidate,
  removeFromStorage,
}: CandidateCardProps) => {
  return (
    <>      
        <section className='candidate-card'>
          <img className='candidate-pic' src={`${currentCandidate.avatar_url}`} alt={`${currentCandidate.name}`} />         
          <article className='candidate-details'>
            <h2>{currentCandidate.name}</h2>
            <p>
              <strong>Location:</strong> {currentCandidate.location || "No location Given"}
            </p>
            <p>
              <strong>Email:</strong> {currentCandidate.email || "No email Given"}
            </p>
            <p>
              <strong>Company:</strong> {currentCandidate.company || "No company Given"}
            </p>
            <p>
              <strong>HTML URL:</strong> {currentCandidate.html_url || "No url Given"}
            </p>
            <p>
              <strong>Login:</strong> {currentCandidate.login}
            </p>
            <p>
              <strong>Name:</strong> {currentCandidate.name || "Name not Provided"}
            </p>
            <p>
              <strong>Bio:</strong> {currentCandidate.bio || "No Bio Given"}
            </p>
          </article>         
            <aside className='icons'>
              <FcApprove
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => addToPotentialCandidates?.()}
              />            
              <FcDisapprove
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => discardCandidate?.()}
              />
            </aside>          
        </section>      
    </>
  );
};

export default CandidateCard;