import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
      My tip of the week is this article on Unix/Linux file names and shell scripts: <a href="https://dwheeler.com/essays/fixing-unix-linux-filenames.html">https://dwheeler.com/essays/fixing-unix-linux-filenames.html</a>. Unix file names can be any sequence of bytes excluding the forward-slash character '/' and the ASCII null character '\0'. However a lot of shell scripts and applications don't work with certain file names. For example, Makefiles don't work well when using file names with spaces. The article describes certain kinds of file names that cause problems and discusses their security implications.

    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>
      This past week I spent time preparing for my number theory and my software engineering exam. My number theory exam was more difficult than I anticipated but I think I did well. My group met for a few minutes to talk about Phase 2 but we were not able to make much progress on IDB this week.
    </p>
  </div>
);

const whatIsInMyWay = (
    <div>
      <p>
        Spring break is in my way. I wish I could spend time relaxing since this is my last spring break but unfortunately I have a lot of work to do. I put off my other classes last week because of my exams so I need to catch up on that, and I also need to work on filing my taxes now that I have all my W-2 forms.
      </p>
    </div>
);;

const nextWeek = (
    <div>
    <p>
      Next week I plan to work on IDB and research. My group members aren't all free during spring break so coordination will be an issue. Before spring break we met to split up tasks so I hope our plan works out. I am in charge of working on the frontend and I hope it isn't as time consuming as the last phase.
    </p>
    </div>
);

const vary = (
    <div>
    <p>
    I thought the test was pretty straightforward. The questions were just like the exercises we did in class both in terms of content and difficulty. The exam was fair and there weren't any trick questions. I also feel that we were given more than enough time. Initially I was kind of stressed about the exam since writing working code under a time limit isn't easy, but HackerRank allows you to run code before submitting and view all the test cases which made this much easier. I feel like I had studied too much for this exam and I should have spent more time working on IDB or research.
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 8"
          previousPost="/swe/week-7"
          nextPost="/swe/week-9"
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
             <Row className="text-center"><Col><h2>What was your experience with Test 1?</h2></Col></Row>
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
