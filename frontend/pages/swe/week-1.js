import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const firstCodeString = `int& bad_function() {
  int x = 0;
  return x;
}

int main(int argc, char** argv) {
  int& result = bad_function();
  return 0;
}`;

const secondCodeString = `fn bad_function() -> &'static i32 {
  let x: i32 = 0;
  return &x;
}

fn main() {
  bad_function();
}
`;

const errorMessage = `error[E0597]: \`x\` does not live long enough
 --> test.rs:3:11
  |
3 |   return &x;
  |           ^ borrowed value does not live long enough
4 | }
  | - borrowed value only lives until here
  |
  = note: borrowed value must be valid for the static lifetime...

error: aborting due to previous error

For more information about this error, try \`rustc --explain E0597\`.`;

const pickOfTheWeek = (
  <div>
    <p>
      My tip of the week is the Rust programming language. <a href="https://www.rust-lang.org">Rust</a> is a systems programming language similar to C and C++ that compiles to native code with <a href="https://llvm.org">LLVM</a>.
      What I find most interesting about Rust is the emphasis on safety and the large amount of available libraries.
    </p>
    <p>
      Rust emphasizes safe programming in many ways. One way is discouraging the use of raw pointers as much as possible. Instead of pointers, Rust uses <i>references</i> that can never be null, like in C++.
      Unlike C++, Rust also makes sure that references are always valid. This prevents a large class of programming errors involving references to stack variables. For example, consider the following C++ code.
      <CodeBlock language="c++">
        {firstCodeString}
      </CodeBlock>

      The error here is that <code>bad_function</code> returns a reference to <code>x</code> that outlives <code>x</code>. If you try to access that reference, you would get undefined behavior.

      The same code translated to Rust looks like:
      <CodeBlock language="rust">
        {secondCodeString}
      </CodeBlock>

      If you try to compile this, you get the following error message which clearly explains the problem:
      <CodeBlock language="text">
        {errorMessage}
      </CodeBlock>
    </p>


    <p>
      Rust also has a very good collection of libraries available on <a href="https://crates.io">crates.io</a>. Cargo, the build system used for Rust, makes it extremely easy to add libraries to a Rust project. If you have used <code>npm</code> for Node.js or <code>pip</code> for Python, you will find <code>cargo</code> to be very familiar.
    </p>

    <p>
      I used Rust and a web framework called <a href="https://crates.io/crates/actix-web">actix-web</a> to host this website and blog (<a href="https://github.com/souvik1997/website">source</a>). If you are writing a backend service for a web application, consider checking out the <a href="https://www.techempower.com/benchmarks/#section=data-r17&hw=ph&test=plaintext">TechEmpower Web Framework Benchmarks</a>. Rust web frameworks tend to perform very competitively.
    </p>
    </div>
);

const pastWeek = (
  <div>
    <p>
      I spent most of this week trying to readjust to university life. I was working full-time in internships in the Bay Area, Chicago, and New York City for the past seven months, so I have become used to living on my own and not having many responsibilities other than work.
      I also began working on research. I am working with <a href="http://www.cs.utexas.edu/~vijay/">Prof. Vijay Chidambaram</a> on a research project this semester, and I read a few papers related to the topic I will be studying. I am working on a honors thesis this semester based on this project.
    </p>
    <p>
      On Friday I donated blood at the North Lamar <a href="https://weareblood.org">WeAreBlood</a> location. If you think you are eligible to donate blood I highly recommend doing so. Not only can you save up to three lives, you also get a free "mini-physical" that measures your temperature, pulse, blood pressure, and hemoglobin levels. This also tests your blood for infectious diseases like HIV or West Nile Virus.
    </p>
  </div>
);

const whatIsInMyWay = (
  <p>
    This is my last semester before I graduate and I have not yet decided on which classes I will be taking. I am double majoring in computer science and mathematics, and I need to choose between number theory and applied statistics for my last math course. I will also have to talk to my math advisor to make sure I am not missing any requirements before dropping one of those courses.
  </p>
);

const nextWeek = (
  <p>
    I have several things to do next week. The most important thing to do is to meet with my math advisor to make sure that I meet the degree requirements. I also have to meet with several PhD students and researchers at VMware for my thesis. My research topic is part of a larger project that we aim to submit to <a href="http://www.sosp.org">SOSP</a>. Finally, I am looking forward to watching <a href="https://www.imdb.com/title/tt0094625/">Akira</a> for my <a href="https://liberalarts.utexas.edu/asianstudies/faculty/js65943#courses">ANS 372: Japanese Pop Culture</a> class.
  </p>
);

const expectationsOfTheClass = (
  <p>
    I have heard mixed opinions about this class. Most people I have talked to who took this class enjoyed it, but some thought it was boring (especially those who were already familiar with the languages and tools taught in this class). Although I am somewhat familiar with web development, Python, and the tools we will be using, I hope to learn more and fill in any gaps in my knowledge. I am also looking forward to Professor Downing's lectures and working on the group project. I do not expect this class to be easy, but at the same time I do not think it will be particularly difficult either.
  </p>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 1"
          nextPost="/swe/week-2"
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
               <Row className="text-center"><Col><h2>What are your expectations of the class?</h2></Col></Row>
               <Row><Col>{expectationsOfTheClass}</Col></Row>
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
