import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
      My tip of the week is the new 1990s StackOverflow April Fools theme (<a href="https://meta.stackoverflow.com/questions/382047/am-i-the-only-one-seeing-the-90s-retro-theme-with-the-unicorns-and-sparkles">example</a>). According to StackOverflow it is best viewed in Netscape 3.0  🙂.
    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>
      This week I tried to get back into my normal school routine after Spring Break. I spent most of this week working on IDB2 and on research. In class, we learned about relational databases and the select, project, and join operations in relational algebra.
    </p>
  </div>
);

const whatIsInMyWay = (
    <div>
      <p>
        Research is in my way. The paper deadline is coming up in about 3 weeks so I feel kind of stressed. I am currently working on getting statistics for the intro section of the paper, but these experiments take a while to run so I hope I will be able to finish this soon. I also have to start writing my thesis eventually but I first need to collect the data from my experiments so I have something to write about.
      </p>
    </div>
);;

const nextWeek = (
    <div>
    <p>
      Next week I plan to work on IDB3. IDB2 was pretty stressful for me and my group since we didn't make much progress during the week of our exam and over spring break. I hope that by starting early on IDB3 we won't be as stressed near the deadline.
    </p>
    </div>
);

const vary = (
    <div>
    <p>
      IDB2 was surprisingly difficult and I don't think we were given enough time for this phase. IDB2 involves new technologies that most people are unfamiliar with, such as Flask, SQL, Selenium, and React. My group was able to finish everything before the original deadline and we didn't have much to add after the deadline was extended. However, even though we were able to finish, the quality of our code base isn't great and the design of our website could be improved a lot. I did feel like I learned a lot in this phase though, especially about relational database design. I have used SQL before but only for very simple data with only one table and no relations. The tables and relations we created for this project are much more complicated: we have 14 tables, 8 model tables and 6 associative tables relating models. I learned about design principles such as third-normal form and SQL primary keys and foreign keys which helped when designing the database structure.
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 9"
          previousPost="/swe/week-8"
          nextPost="/swe/ethics"
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
             <Row className="text-center"><Col><h2>What was your experience of Project #3: IDB2?</h2></Col></Row>
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
