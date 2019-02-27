import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
    My pick of the week is the <code>perf</code> tool in Linux. <code>perf</code> is one of my favorite tools for profiling and diagnosing issues in Linux programs. It lets you do the following:
    <ul>
    <li><p>Trace system calls (like <code>strace</code> but more flexible)</p></li>
    <li><p>Determine the performance intensive parts of your C, C++, Ruby, Rust, JVM, Go, etc. programs easily</p></li>
    <li><p>Trace Linux kernel events</p></li>
    <li><p>Get low-level CPU information like branch mispredictions and cache misses. I used this particular feature extensively while working on low-latency trading systems at Citadel Securities last fall.</p></li>
    </ul>
    You can find a lot more information about <code>perf</code> on Julia Evan's <a href="https://jvns.ca/perf-zine.pdf">blog</a>.
    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>This week I spent most of my time working on research, number theory homework, and the Collatz project. I worked on adding <a href="https://grpc.io">gRPC</a> to the <a href="https://github.com/ethereumjs/ethereumjs-vm">Ethereum Virtual Machine</a> in order to allow storing the Ethereum state (containing account balances and smart contract code) on another computer. The Collatz project was fairly straightforward and I did not have much trouble completing it. The only tricky part for me was making sure that I did not miss any steps in the workflow. I also went to the student organization fair in the SAC and attended a few social events.</p>
  </div>
);

const whatIsInMyWay = (
    <div>
      <p>
        Research is in my way. I have to learn Go and port some of my existing research work on <a href="https://github.com/souvik1997/ethereumjs-vm">EthereumJS</a> to <a href="https://github.com/ethereum/go-ethereum">go-ethereum</a>. I have not used Go before and the go-ethereum codebase looks daunting. I hope I will be able to navigate this codebase soon since I have deadlines coming up for my research and my thesis.
      </p>
    </div>
);;

const nextWeek = (
    <div>
      <p>Next week I expect to work more on research and turn in the Collatz project. I also have a quiz I need to study for and a textbook I need to buy.</p>
    </div>
);

const experienceOfPython = (
    <div>
    <p>
My experience of learning Python has so far been mixed. I already know most of what is being taught except for some small subtleties (such as <code>list</code> can take any iterable with the <code>+=</code> operator while tuples can only take other tuples). I wish we learned more about why these subtleties exist. In the case of tuples vs. list mentioned earlier, I don't see any reason why tuples cannot use iterables and create a new tuple extended with the contents yielded from the iterable object.
    </p>

    <p>
      I also wish we spent more time learning how the tools we use work, but at a deeper level. For example, I thought the Python code coverage tool we looked at in class was really cool and I wanted to know how it works. <code>coverage</code> is just a Python package and it's not immediately obvious how it can figure out which lines of code have been run. <a href="https://coverage.readthedocs.io/en/v4.5.x/howitworks.html">It turns out</a> there is a Python function called <a href="https://docs.python.org/3/library/sys.html#sys.settrace">sys.settrace</a> that lets you implement debuggers in Python. <code>coverage</code> uses this function to internally keep track of which lines of code have been executed when running unit tests.
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 3"
          previousPost="/swe/week-2"
          nextPost="/swe/week-4"
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
               <Row className="text-center"><Col><h2>What is your experience of learning the basics of Python?</h2></Col></Row>
               <Row><Col>{experienceOfPython}</Col></Row>
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
