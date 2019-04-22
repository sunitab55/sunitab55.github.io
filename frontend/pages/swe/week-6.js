import React from 'react';
import Link from 'next/link';
import Head from '../../components/head';
import BlogPost, { CodeBlock } from '../../components/swe-blog';
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const pickOfTheWeek = (
  <div>
    <p>
      My tip of the week is three very useful Git commands:
      <ol>
        <li><code>git commit --fixup COMMIT_SHA</code>. Running <code>git commit</code> with the special flag <code>--fixup</code> generates a "fixup" commit. Suppose you are working on adding a new feature to your website and you find a problem in your code, but that problem is unrelated to the new feature you are adding so you don't want to fix the problem and commit that along with the new feature changes. You can instead create a fixup commit, where the changes are only those that fix the problem you found and fix a previous commit.</li>
        <li><code>git rebase -i</code>: <code>git rebase</code> has an option to rebase interactively using the <code>-i</code> flag. This is useful if you want to reorder commits, squash commits together, or edit a commit message from several commits ago. The Git SCM website has a really nice tutorial on how to use interactive rebase: <a href="https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History">https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History</a>. Interactive rebase also handles fixup commits using the <code>--autosquash</code> flag, which will take all the fixup commits you created, reorder them to be with the commit they reference, and squash the changes together (tutorial link: <a href="https://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html">https://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html</a>). I've found this to be really useful for cleaning up commit history before pushing my changes. I like to add a lot of small commits while developing, and squash/reorder them into larger commits split logically before pushing. </li>
        <li><code>git blame</code>: If you have ever wondered which commit introduced a specific line of code you are interested in, then <code>git blame</code> is the perfect tool for you. Running <code>git blame</code> on a file in a Git repository will show you the file along with specific commit hashes for each line. You can also view <code>git blame</code> on GitHub or GitLab by clicking on the "Blame" button when viewing a file.</li>
      </ol>
    </p>
  </div>
);

const pastWeek = (
  <div>
    <p>
      This past week I met with my group and decided on what each member should work on. We created a basic website using React and deployed it to AWS. I think we have made signicant progress and we should be in good shape for the IDB1 deadline next Tuesday.
    </p>
    <p>
      I also continued working on research. I've finished most of the implementation work and now I need to run benchmarks and collect data. There were several interesting bugs in my implementation that I found, and I am also working on fixing them.
    </p>
  </div>
);

const whatIsInMyWay = (
    <div>
      <p>
        I'm unfortunately sick so I'm not able to do much aside from working from home. I went to UHS and they think it's just a cold so hopefully I will start feeling better soon.
      </p>
    </div>
);;

const nextWeek = (
    <div>
    <p>
      Next week I will finish IDB before the deadline on Tuesday and collect data for my research. I am also planning on attending a political event with Democratic presidential candidate <a href="https://www.eventbrite.com/e/presidential-candidate-andrew-yang-in-austin-tx-tickets-57067923696?aff=efbeventtix&fbclid=IwAR1B3u4lO02ZUaN-isSkemL8VxS73c-eTwRIhEt9I9z0D9IROrN1bHEob_A">Andrew Yang</a> next Friday.
    </p>
    </div>
);

const vary = (
    <div>
    <p>
      I enjoyed Jesse's talk but I felt that audience participation was really low which made it seem kind of awkward. If you don't already know HTML, CSS, and JavaScript then learning about cross-site scripting is almost impossible. This talk would have made more sense to include maybe after IDB2 when most of the class should be familiar with those technologies.
    </p>
    </div>
);

const Post = () => (
  <div>
    <Head title="CS373 Spring 2019: Souvik Banerjee" />
    <div className="main-bg">
      <div className="main">
        <BlogPost
          title="Week 6"
          previousPost="/swe/week-5"
          nextPost="/swe/week-7"
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
             <Row className="text-center"><Col><h2>What did you think of the talk by Jesse on security?</h2></Col></Row>
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
