import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Link from 'next/link';
import { string } from 'prop-types';

const Introduction = props => (
    <Container>
        <h1 className="name">{props.name}</h1>
        <p className="lead">{props.subtitle}</p>

        <Link prefetch href={props.resumePath}>
            <a className="resume-link">Resume</a>
        </Link>

        <style jsx>{`
            .name {
                padding-bottom: 1em;
                border-bottom: 1px solid #000000;
                border-bottom-color: rgba(0, 0, 0, 0.35);
                display: inline-block;
                font-size: 42px;
                color: #0a0a0a;
            }

            .lead {
                font-size: 27px;
                color: #0a0a0a;
            }

            .resume-link {
                font-size: 27px;
            }

            /* Light mode */
            @media (prefers-color-scheme: light) {
              .name {
                border-bottom: 1px solid #000000;
                border-bottom-color: rgba(0, 0, 0, 0.35);
                color: #0a0a0a;
              }

              .lead {
                color: #0a0a0a;
              }
            }

            /* Dark mode */
            @media (prefers-color-scheme: dark) {
              .name {
                border-bottom: 1px solid #eaeaea;
                border-bottom-color: rgba(255, 255, 255, 0.35);
                color: #fefefe;
              }

              .lead {
                color: #fefefe;
              }
            }
        `}</style>
    </Container>
);

Introduction.propTypes = {
    name: string,
    subtitle: string,
    resumePath: string,
};

export default Introduction;
