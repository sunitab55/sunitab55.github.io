import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
      My pick of the week is <a href="https://regexr.com">https://regexr.com</a>. regexr.com is a website that parses and explains regular expressions. It tells you what each part of a regular expression means, and also lets you input sample text and see what the regular expression matches. There are a lot of really complicated regular expressions that you can find on websites like StackOverflow that would be very hard to parse manually. regexr.com does all the hard work for you and explains those regular expressions nicely.
    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>
      I started writing my thesis this week and collected data for my research group's paper. My thesis defense is coming up sooner than I would like, and I have only written a few hundred words so far. I only have a few weeks before my defense and I need to write about 20 pages and prepare a presentation. For this class, I worked on IDB3 and wrote a React component for filtering and searching. I also went to a concert at a club downtown this Saturday.
    </p>
  </div>
);

const whatIsInMyWay = (
    <div>
      <p>
        Right now IDB3 is in my way. I want to prioritize working on my research since it's much more important to me, but our group has not made much progress on IDB3. Even though we started early we will probably still be working on it right up to the deadline. I hope we can finish it earlier since I would rather work on my thesis.
      </p>
    </div>
);

const nextWeek = (
    <div>
    <p>
      Next week I plan to work on my thesis. I am hoping to at least have the introduction done by this Friday so my research advisor can review it. I am slightly concerned that I won't have enough material to write a full thesis, so I may have to run additional experiments as well.
    </p>
    </div>
);

const vary = (
    <div>
    <p>
      I really liked the in-class lectures on learning SQL and regular expressions. I have used both regular expressions and SQL before but this lecture was a good refresher. The in-class exercises were somewhat challenging which I also like. I found the Python exercises to be really easy so this was a nice change. I wish we learned about them earlier, since knowing SQL and regular expressions is necessary for IDB3.
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 11"
          previousPost="/swe/week-10"
          nextPost="/swe/week-12"
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
             <Row className="text-center"><Col><h2>What was your experience in learning about regular expressions and SQL?</h2></Col></Row>
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
