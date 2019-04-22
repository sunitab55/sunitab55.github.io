import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
      My tip of the week is <a href="https://github.com/ggreer/the_silver_searcher">The Silver Searcher (ag)</a>. <code>ag</code> is a fast code searching tool that is really useful if you want to quickly navigate an unfamiliar codebase. <code>ag</code> is like <code>grep</code> in that it searches for text in files, but <code>ag</code> is much faster, respects your <code>.gitignore</code> so it doesn't search irrelevant files, and prints search results in color in your terminal. I use <code>ag</code> when searching for things like instances of classes, where functions are called, and searching log files. <code>ag</code> is installed on the CS machines and I recommend trying it out.
    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>
      This past week I mainly worked on the IDB project. We finished the project by the deadline and I like how my team's website turned out. In class we learned about function-like classes, comprehensions, closures, and function arguments. I also checked out a few SXSW events on Saturday. Most events require a pass, but there are a few that do not.
    </p>
  </div>
);

const whatIsInMyWay = (
    <div>
      <p>
        Research is in my way. I am trying to import three million blocks from the Ethereum blockchain into a customized Ethereum client and it is taking an extremely long time (it would take several <i>months</i> to complete). I am currently experimenting with different ways to make it faster but I have not been able to find anything yet.
      </p>
    </div>
);;

const nextWeek = (
    <div>
    <p>
      I have two exams next week: one exam in number theory and the exam for this class. I am not too worried about the SWE exam since it is on HackerRank, but I am slightly worried about my number theory exam since it involves memorizing definitions and writing proofs. The SOSP deadline is also coming up soon and I need to collect some statistics for the paper my research group is writing.
    </p>
    </div>
);

const vary = (
    <div>
    <p>
    I enjoyed working on Project 2. I had some experience with React and Bootstrap so it wasn't too hard to set up the website. We used <code>create-react-app</code> so most of the React boilerplate code was already set up. I didn't have any experience working with AWS but one of my group members did and his expertise was extremely helpful. I felt like everyone on my team contributed significantly and we all learned from each other.
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 7"
          previousPost="/swe/week-6"
          nextPost="/swe/week-8"
          sections={[
            (<Container className="text-left">
               <Row className="text-center"><Col><h2>What did you do this past week?</h2></Col></Row>
               <Row><Col>{pastWeek}</Col></Row>
             </Container>),
            (<Container className="text-left">
               <Row className="text-center"><Col><h2>What is in your way?</h2></Col></Row>
               <Row><Col>{whatIsInMyWay}</Col></Row>
             </Container>),
            (<Container className="text-left">
               <Row className="text-center"><Col><h2>What will you do next week?</h2></Col></Row>
               <Row><Col>{nextWeek}</Col></Row>
             </Container>),
            (<Container className="text-left">
             <Row className="text-center"><Col><h2>What was your experience of Project #2: IDB1?</h2></Col></Row>
               <Row><Col>{vary}</Col></Row>
             </Container>),
            (<Container className="text-left">
               <Row className="text-center"><Col><h2>What is your pick-of-the-week or tip-of-the-week?</h2></Col></Row>
               <Row><Col>{pickOfTheWeek}</Col></Row>
             </Container>)
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
