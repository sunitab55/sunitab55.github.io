import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
      My pick of the week is <a href="https://jupyter.org">Jupyter Notebook</a>. Jupyter Notebook is really helpful for creating interactive Python scripts, especially for data analytics. For the paper my research group is submitting, I created some graphs in Jupyter using Matplotlib (a popular Python library for creating charts) and the interactivity made it very easy to see how changes in the code affected what the graphs look like.
    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>
      I continued working on my thesis. I have written about 4200 words so far and it is already 20 pages long. One of the challenges I am facing is making the thesis understandable by anyone with a CS background. At the same time, I don't want to write a very long into and background section, since that detracts from the main focus of my thesis.
    </p>
  </div>
);

const whatIsInMyWay = (
    <div>
      <p>
        My research group is submitting a paper to SOSP this Wednesday. I most likely won't have to do anything, but I still have to be ready to help if needed. Once this is done, my thesis advisor will probably have more time to review my thesis.
      </p>
    </div>
);

const nextWeek = (
    <div>
    <p>
      I will continue to work on my thesis. I also hope to be able to go to the gym more often. I've been really busy these last few weeks and the only physical activity I have been getting is walking back and forth from North Campus to class.
    </p>
    </div>
);

const vary = (
    <div>
    <p>
      IDB3 was similar to what I expected. Adding filtering, sorting, and searching to the backend wasn't difficult. Adding UI components to the frontend to support filtering, sorting, and searching was slightly more difficult but completely doable. We also improved other aspects of our website while working on IDB3. For example, we added cards for related instances on a particular instance page, instead of simply having links to the related instance pages. We also focused a lot on improving the appearance of our website. In earlier phases we focused more on functionality instead of the appearance of our website so our website was really ugly. Now, I think it actually looks pretty decent. We also worked on refactoring our code to make it more flexible and easy to add new model attributes or relationships. I'm not sure what parts of our code will be refactored for IDB4, but I don't think we will have to refactor much since we already did that for IDB3.
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 12"
          previousPost="/swe/week-11"
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
             <Row className="text-center"><Col><h2>What was your experience of Project #4: IDB3?</h2></Col></Row>
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
