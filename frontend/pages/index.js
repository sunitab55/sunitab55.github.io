import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import Introduction from '../components/introduction';
import SocialLinks from '../components/social';
import { Jumbotron, Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';

const Home = () => (
  <div>
    <Head title="Home" />
    <div className="main-bg">
      <div className="main">
        <Jumbotron className="main-container">
          <Introduction
            name="Souvik Banerjee"
            subtitle="Software Engineer"
            resumePath="/resume"
          />
          <br />
          <SocialLinks
            facebook="https://facebook.com/Souvik1997"
            linkedin="https://www.linkedin.com/in/sb1997/"
            github="https://github.com/souvik1997"
            email="mailto:souvik1997@gmail.com"
            instagram="https://www.instagram.com/souvik8765/"
          />
        </Jumbotron>
      </div>
    </div>

    <style jsx>{`
      .main {
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        height: 100%;
        width: 100%;
        z-index: 1;
      }

      .main-bg {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #fff;
      }

      /* Light mode */
      @media (prefers-color-scheme: light) {
        .main-bg {
          background-color: #fff;
        }
      }

      /* Dark mode */
      @media (prefers-color-scheme: dark) {
        .main-bg {
          background-color: rgba(30, 30, 30, 1.0);
        }
      }

    `}</style>
  </div>
);

export default Home;
