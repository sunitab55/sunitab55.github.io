import React from 'react';
import Head from '../components/head';

import '../styles/custom.css';

const Resume = () => (
  <div className="resume-page">
      <Head />
      <iframe frameBorder="0" className="resume-frame" src="https://souvik.me/resume.pdf"></iframe>

      <style jsx>{`
        .resume-frame {
            width: 100%;
            height: 100%;
            min-height: 100%;
            display: block;
        }

        .resume-page {
            width: 100%;
            height: 100vh;
        }
      `}</style>
  </div>
);

export default Resume;
