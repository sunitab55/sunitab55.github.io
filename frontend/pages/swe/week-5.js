import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
      My tip of the week is to learn about investing. Learning how the markets work is really important because retirement accounts like IRAs and 401(k)s contain investment assets like stocks, ETFs, and mutual funds. Also, many tech companies give Restricted Stock Units (RSUs) or stock options as part of their compensation package, so it is important to at least know what those terms mean before deciding on an offer. I found <a href="https://robinhood.com">Robinhood</a> to be a good introductory resource for learning about stock and options trading. What I like about Robinhood is that trading is free (no commissions) and the UI is very easy to use unlike more established brokers like ETrade. Also, if you're interested in working in finance (such as a hedge fund or proprietary trading company), showing that you have some interest and experience in trading helps in the interview process.
    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>
      Like every other week so far, I have spent most of my time working on research. I found a second reader for my thesis and made a lot of progress in my research. I was originally working on the "official" Go ethereum client, but I don't have enough time to implement everything I need and learn Go at the same time. I am currently working on the <a href="https://github.com/souvik1997/parity-ethereum">Parity Ethereum</a> client, which is written in Rust and has good documentation so it should be easier to use. I got some preliminary results for my project which I will be discussing with my research group.
    </p>
    <p>
      For this class, I met with my group for IDB and decided on a project idea. We set up Slack, GitLab integration, and created some GitLab issues to help use track progress for the first IDB milestone. We also set up Elastic Beanstalk and Postgres on AWS in class on Friday.
    </p>
    <p>
      I also bought Amtrak tickets for spring break travel back home in Dallas. I normally use Megabus, but Megabus tickets are around $50-$60 each way while Amtrak is only $25. The downside is that there is only one train per day departing from Austin, which places some constraints on my travel schedule.
    </p>
  </div>
);

const whatIsInMyWay = (
    <div>
      <p>
        Finding time to go to the gym is in my way. I used to go to the gym about 3 times a week earlier in the semester, but lately I have been so busy with research that I haven't had any free time.
      </p>
    </div>
);;

const nextWeek = (
    <div>
    <p>
      This weekend and next week will be spent on phase 1 of IDB and research.
    </p>
    </div>
);

const vary = (
    <div>
    <p>
      I enjoyed both presentations on GCP and AWS. The GCP presentation was pretty informative but I felt that it didn't really show how to actually set up a website. Hannah's presentation was much better in this aspect and I liked how she went through the workflow for setting up things like RDS and IAM.
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 5"
          previousPost="/swe/week-4"
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
             <Row className="text-center"><Col><h2>What did you think of the talk by Ed on GCP and Hannah on AWS?</h2></Col></Row>
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
