import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
      My tip of the week is to invest in good ergonomic accessories. Ergonomics is really important especially if you're sitting at a computer for most of the day. There are a lot of bad health conditions that can be caused from prolonged computer usage, including:
      <ul>
        <li>Bad posture</li>
        <li>Carpal tunnel syndrome</li>
        <li>Blurry vision and headaches</li>
      </ul>

      Fortunately there are many ergonomic accessories that can help:
      <ul>
        <li><p>An external monitor:</p>
          <p>
            This is probably the most important computer peripheral for ergonomics. Laptops aren't designed for prolonged use since the screen and keyboard are so close together and you have to constantly look down to view the screen, which is bad posture. Having an external monitor keeps your neck straight so you can look straight ahead when using a computer.
        </p></li>
        <li>
          <p>A keyboard:</p>
          <p>
            If you get an external monitor, you will also want an external keyboard. Having a good keyboard can prevent or alleviate conditions like <a href="https://www.nhs.uk/conditions/repetitive-strain-injury-rsi/">RSI</a> and <a href="https://www.webmd.com/pain-management/carpal-tunnel/carpal-tunnel-syndrome">carpal tunnel syndrome</a>. A good keyboard also makes typing a lot more fun in my opinion. There are a lot of good keyboards at a variety of price points, from the <a href="https://www.microsoft.com/accessories/en-us/products/keyboards/natural-ergonomic-keyboard-4000/b2m-00012">Microsoft Ergonomic Keyboard</a> to the <a href="https://www.amazon.com/Kinesis-Advantage2-Ergonomic-Keyboard-Switches/dp/B01KBKFPNU/ref=asc_df_B01KBKFPNU/?tag=hyprod-20&linkCode=df0&hvadid=309743296044&hvpos=1o1&hvnetw=g&hvrand=7097365337030869753&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9028288&hvtargid=pla-490539422086&psc=1">Kinesis Advantage</a> and <a href="http://www.pfu.fujitsu.com/hhkeyboard/type-s/">Happy Hacking Professional Type-S</a> (I have this keyboard and highly recommend it despite the ridiculous price).
          </p>
        </li>
        <li>
          <p>A standing desk:</p>
          <p>
            A standing desk lets you stand while working. Standing desks are typically adjustable, so you can alternate between sitting and standing by changing the height of the desk. Standing has many <a href="https://medium.com/the-mission/7-benefits-of-switching-to-standing-desks-and-an-active-workstation-fa5affadfaf1">health benefits</a>, which includes correcting bad posture and decreasing risk of cardiovascular disease.
          </p>
        </li>
      </ul>
    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>
    I worked mainly on research and completing all the required steps for Collatz. On Saturday I attended a <a href="https://cns.utexas.edu/tides/undergraduate/events-workshops/science-sprints-and-inventors-sprints">Science Sprint</a>, which is like a hackathon but more open ended and focused on data analysis. The goal was to analyze GPS data from vehicles owned by UT Facilities to help improve productivity and travel efficiency during class changes and employee breaks. I used Python to extract GPS data from Google Earth KML files that were provided to us and created a few charts using <a href="https://www.tableau.com">Tableau</a>. There wasn't enough time to make any meaningful conclusions, but I enjoyed the process of extracting and visualizing data.
    </p>
  </div>
);

const whatIsInMyWay = (
    <div>
      <p>
        Nothing is in my way.
      </p>
    </div>
);;

const nextWeek = (
    <div>
    <p>
      Next week I will work more on research. Research work is dynamic and constantly changing, and it is sometimes difficult to keep up. Fortunately I feel like I am making progress and I am on track to getting results soon.
    </p>
    </div>
);

const experienceOfProject = (
    <div>
    <p>
    I thought the first project was a good experience. As I expected, implementing the algorithm was fairly straightforward (although some of the optimizations like the meta cache were slightly tricky to implement). The workflow was longer than I would like and some of the steps seemed unnecessary, especially for a small project like this, but I can see the educational value in learning how tools like GitLab, pylint, and continuous integration work.
    </p>
    <p>
    Two aspects of the project that I think could be improved would be clearer requirements and better instructions. The requirement for the number of acceptance tests was changed shortly before the project was due, and I had to submit another pull request to update my set of acceptance tests. The workflow instructions were fairly clear but I think it should be noted that you should work inside of Docker. Setting up the same environment outside of Docker on macOS or Linux can be surprisingly difficult since there are subtle Python 2 vs. Python 3 compatibility issues, old versions of Python on your $PATH, and other annoying issues that detract from the main goal of the project.
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 4"
          previousPost="/swe/week-3"
          nextPost="/swe/week-5"
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
               <Row className="text-center"><Col><h2>What was your experience of Project 1 (the problem, the overkill requirements of submission, etc.)?</h2></Col></Row>
               <Row><Col>{experienceOfProject}</Col></Row>
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
