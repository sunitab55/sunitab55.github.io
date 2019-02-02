import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
      Here are several related websites for anyone interested in a career in software engineering:
    </p>
    <p>
    <ul>
      <li>
        <p><a href="https://reddit.com/r/cscareerquestions">/r/cscareerquestions</a> is a subreddit dedicated to questions about software engineering careers. There are a lot of subscribers and many high-quality discussion threads. There are several posts about <a href="https://www.reddit.com/r/cscareerquestions/comments/a2mafb/official_salary_sharing_thread_for_interns/">intern compensation</a>, <a href="https://www.reddit.com/r/cscareerquestions/comments/8cta0d/my_first_negotiation_a_success_story/">salary negotiation</a>, and <a href="https://www.reddit.com/r/cscareerquestions/comments/a31cm1/the_5_mistakes_i_see_candidates_make_the_most/">interview tips</a> which I personally found to be very helpful. Here is my favorite post from this subreddit: <a href="https://www.reddit.com/r/cscareerquestions/comments/6ez8ag/accidentally_destroyed_production_database_on/">Accidentally destroyed production database on first day of a job, and was told to leave, on top of this i was told by the CTO that they need to get legal involved, how screwed am i? </a>.</p>
      </li>
      <li>
        <p><a href="https://www.teamblind.com">Blind</a> is a anonymous work chat/forum. It is open to anyone but most people on the platform are in the Bay Area or Seattle working at tech companies. You need to be a verified employee to post (they send a link to your work email account), but you can browse discussions online without having to register. I found some of the discussions here interesting, especially those about workplace culture. However, since this is an anonymous forum, there is a lot of trolling and questionable content similar to what you would find on 4chan.</p>
      </li>
      <li>
        <p><a href="https://www.levels.fyi/">levels.fyi</a> is a centralized place to find compensation information for top tech companies. You can compare levels across different companies and the salary/RSU/bonus structure for each level.</p>
      </li>
      <li>
        <p><a href="https://haseebq.com/my-ten-rules-for-negotiating-a-job-offer/">Ten Rules for Negotiating</a> is a blog post written by <a href="https://haseebq.com">Haseeb Qureshi</a> on how to effectively negotiate with tech companies.</p>
      </li>
      </ul>
    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>This week I started to get more accustomed to my classes. I received a lot of assignments and I am slowly making progress on them. I started working on research more seriously. My research project has to do with improving the scalability of Ethereum, and I have been reading a lot of blog posts and research papers to try to understand the problem and the potential solutions.</p>
  </div>
);

const whatIsInMyWay = (
    <div>
    <p>Deciphering Ethereum research papers and blog posts is in my way. They can involve a surprising amount of <a href="https://ethereum.github.io/yellowpaper/paper.pdf">math</a> and several concepts are only <a href="https://ethresear.ch/t/the-stateless-client-concept/172">informally specified</a>. I had a few meetings with my team during the week which clarified a lot of the questions I had, but I will still need to do a significant amount of reading this weekend.</p>
    </div>
);;

const nextWeek = (
    <div>
      <p>Next week I expect to work more on my research, do the reading for this class, and start working on the Collatz assignment. I already have a GitLab account but I have not used GitLab Pipelines nor some of the other tools (like <code>coverage</code> and <code>black</code>) so I will also look at how to get those to work.</p>
    </div>
);

const experienceOfTheClass = (
    <div>
    <p>

I like the reading and I wish we spent more time in class discussing it. The concepts mentioned in Extreme Programming and the tips in the three articles we were required to read this week were all very interesting and seemed useful to know when working in industry. Personally, I am much more interested in these software engineering concepts than learning Python. I think anyone with a CS background can learn Python in around a week by following tutorials online, but learning how to work in teams effectively and how to estimate time needed for a task is much more difficult.

I wish we could learn more about the tools we will be using, but at a deeper level. For example, I thought the Python code coverage tool we looked at in class was really cool and I wanted to know how it works. <code>coverage</code> is just a Python package and it's not immediately obvious how it can figure out which lines of code have been run. <a href="https://coverage.readthedocs.io/en/v4.5.x/howitworks.html">It turns out</a> there is a Python function called <a href="https://docs.python.org/3/library/sys.html#sys.settrace">sys.settrace</a> that lets you implement debuggers in Python. Similarly, I would have liked to know how Docker works. Learning the specific command lines as we did in class isn't useful since it is trivially Googleable and there is no point to learning about it in class. Instead, learning about concepts like <a href="https://docs.docker.com/engine/docker-overview/#namespaces">namespaces</a> and <a href="https://docs.docker.com/engine/docker-overview/#union-file-systems">union file systems</a> would be a lot more interesting.

</p>
    </div>
);


const experienceOfTheClassExercises = (
  <div>
    <p>
      I really enjoy the in-class exercises. They provide instant feedback and it seems to be good practice for the exams. Applying the concepts you learn in class to real code makes it easier to remember later.
    </p>
  </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 2"
          previousPost="/swe/week-1"
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
               <Row className="text-center"><Col><h2>What is your experience of the in-class exercises?</h2></Col></Row>
               <Row><Col>{experienceOfTheClassExercises}</Col></Row>
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
