import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const answer = (
    <div>
    <p>
      My answer depends on what the computer usage records are referring to. If the president/owner is referring to usage records for the survey, then I would refuse to examine the records to find the person responsible for the comment. The reason is that the survey is meant to be anonymous. De-anonymizing a response to the survey would not be right since it sets a precedent: any potentially negative (or even positive!) survey response could then be de-anonymized, and then the survey would not be anonymous. This would hurt employee morale and no one would take the survey in the future if they knew that it was not truly anonymous.
    </p>

    <p>
      Even if I were to be personally punished or terminated, I still would not analyze the records to find the person responsible. The software development industry suffers from a huge lack of engineers and I believe it would be fairly easy to find another company that offers the same or better compensation and benefits. Many companies also look for employees with high ethical standards, and I believe refusing to deanonymize an anonymous survey would be looked upon favorably.
    </p>

    <p>
      The only situation where I <i>would</i> examine computer usage records to find the alleged saboteur is if the records are not associated with the anonymous survey. For example, if the parts are created with a CNC machine, then I would examine the records of the computer controlling the machine. My job as a system administrator would presumably give me access to any computer owned by the company, and it would be perfectly reasonable to log into a computer and run diagnostics or look at logs to diagnose a problem. In this case, the problem is that every tenth part the machine produces is defective. If the logs say that someone is deliberately sabotaging the parts that were produced, then I would report it to the president/owner.
    </p>

    <p>
      I believe the second situation is different from the first because in the second situation I am not violating any expectations of privacy or anonymity. As a general rule, privacy is not to be expected on computers owned by the company. The exception is when privacy is explicitly granted, such as the anonymity granted by the survey.
    </p>

    <p>
      One critique of the second situation might be that the overall effect is the same, regardless of whether the logs from the survey or the part production machine were analyzed. My view is that the second situation is like a "crime tips hotline": anyone can report crimes or leads on investigations anonymously to the hotline, which helps law enforcement catch suspects faster. We also don't know whether the person who made those comments on the survey lied and was referring to someone else who was sabotaging the parts, confessed to his own "crime", or made up a completely false story. I would not be able to do anything about the last case since the survey is anonymous. However, the first two cases suggest some wrongdoing, and I believe the only ethical thing to do is to investigate further (as long as the investigation itself is ethical, i.e. does not involve analyzing computer usage logs for the survey).
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Ethics"
          previousPost="/swe/week-9"
          sections={[
            (<Container className="text-left">
               <Row className="text-center"><Col><h2>The Problem</h2></Col></Row>
               <Row className="text-center">
                 <Col>
                   <p>Your first job after graduation is system administrator for a 200 person privately held manufacturing company. The president/owner sends this message to the employees: "I want to encourage each of you to make comments to me about any facet of our operation you care to. Your response should be made through our anonymizer program so that your identity will not be disclosed."</p>
                   <p>The president/owner finds one response saying: "This company sucks. The only way I find to retaliate for the way I have been treated is sabotage. Every tenth part I turn out is defective."</p>

                   <p> The president/owner insists that you examine the computer usage records to determine the identity of the alleged saboteur. What should you do?</p>
                 </Col>
               </Row>
               <Row><Col>{answer}</Col></Row>
             </Container>),
          ]}>
        </BlogPost>
      </div>
    </div>

    <style jsx>{`
      .main {
        text-align: center;
        width: 100%;
        z-index: 1;
      }

      .main-bg {
        position: absolute;
        width: 100%;
        background-color: #fff;
      }

      /* Light mode */
      @media (prefers-color-scheme: light) {
        .main-bg {
          background-color: #fff;
          color: #000;
        }
      }

      /* Dark mode */
      @media (prefers-color-scheme: dark) {
        .main-bg {
          background-color: rgba(30, 30, 30, 1.0);
          color: #fefefe;
        }
      }

      `}</style>
  </div>
);

export default Post;
