import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
      My pick of the week is to learn about project management. Some of the readings for this class discuss how to manage software engineering projects effectively and this is really valuable even if you never manage a project by yourself. For example, learning about effective project management helps you know if a particular project is being managed well or poorly. This can be helpful if you're in an interview for a company and you want to know what it is like to work at that company. Knowing terms like "agile" and "sprints" helps you determine whether you like that management style.
    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>
      Last week I worked on IDB3 and research and wrote the extra credit blog post for this class. I also worked on filing my taxes. Normally I would use TurboTax but each state costs $45 and I have to file income taxes in three different states, so I decided to file manually.
    </p>
  </div>
);

const whatIsInMyWay = (
    <div>
      <p>
        IDB3 and research is in my way. I've been experimenting with different ways to implement filtering and searching in IDB3 but they seem to be unacceptably slow. I'm using a forked version of <a href="https://github.com/souvik1997/flask-restless/tree/master/flask_restless">flask-restless</a> that exposes a really nice filtering and searching API, but each API request results in multiple SQL statements being run. Because of latency between my laptop and our SQL server in AWS, each API request takes around 5-10 seconds since <code>flask-restless</code> has to wait for the result of one SQL statement to return before running another statement. I'll try to see what could be improved, but in the worst case scenario we will have to implement searching and filtering by ourselves.
      </p>
    </div>
);

const nextWeek = (
    <div>
    <p>
      Next week I plan to start writing my thesis and parts of the paper my research group will be submitting to SOSP. The deadline is a little over two weeks away and I am still waiting on some experiments to run. These experiments generate a lot of data (hundreds of gigabytes) so I will have to figure out how to condense it down to something more manageable.
    </p>
    </div>
);

const vary = (
    <div>
    <p>
      I enjoyed the lectures by Dr. Rich and Dr. Cline. Ethics in technology is a topic that isn't discussed much in other CS classes. I thought it was interesting how engineering majors usually have to take ethics classes, while CS majors do not. I think ethics should be a required class for CS majors since software is so important in modern life.
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 10"
          previousPost="/swe/ethics"
          nextPost="/swe/week-11"
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
             <Row className="text-center"><Col><h2>What did you think of the talk by Dr. Rich and Dr. Cline?</h2></Col></Row>
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
