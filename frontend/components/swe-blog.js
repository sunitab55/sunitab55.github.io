import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Media from 'react-media';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { solarizedDark } from 'react-syntax-highlighter/dist/styles/hljs';

const BlogPost = props => {
  let previousNavLink = (props.previousPost ?
                         (<NavItem>
                          <Link prefetch passHref href={props.previousPost}>
                          <NavLink href="#">Previous</NavLink>
                          </Link>
                          </NavItem>)
                         : null );
  let nextNavLink = (props.nextPost ?
                         (<NavItem>
                          <Link prefetch passHref href={props.nextPost}>
                          <NavLink href="#">Next</NavLink>
                          </Link>
                          </NavItem>)
                         : null );
  let nav = (
    <Nav>
      <NavItem>
        <Link prefetch passHref href="/">
          <NavLink href="#">Home</NavLink>
        </Link>
      </NavItem>
      {previousNavLink}
      {nextNavLink}
    </Nav>
  );

  let sections = props.sections.map((s) => (
    <Row>
      <Col xs="0" sm="1" md="2" lg="3"></Col>
      <Col xs="12" sm="10" md="8" lg="6">
        {s}
      </Col>
      <Col xs="0" sm="1" md="2" lg="3"></Col>
    </Row>
  ));

  return (
    <Container fluid={true}>
      {nav}
      <Jumbotron>
        <Container>
          <Row>
            <Col className="text-center">
              <h1>CS373 Spring 2019: Souvik Banerjee</h1>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <h2>{props.title}</h2>
            </Col>
            </Row>
        </Container>
      </Jumbotron>
      {sections}
      <Row>
        <Col className="text-center">
          <img src="/static/swe-profile.png" className="profile-picture"/>
        </Col>
      </Row>
      <style jsx>{`
      .profile-picture {
        max-width: 100%;
      }
      `}</style>
    </Container>
  );
};

const CodeBlock = props => {
  return (<Media query="(prefers-color-scheme: dark)">
          { matches => matches ?  (<SyntaxHighlighter style={solarizedDark} {...props}>{props.children}</SyntaxHighlighter>)
            : (<SyntaxHighlighter {...props}>{props.children}</SyntaxHighlighter>) }
          </Media>);
};

BlogPost.propTypes = {
  previousPost: PropTypes.string,
  nextPost: PropTypes.string,
  title: PropTypes.string.isRequired,
  sections: PropTypes.array.isRequired,
};

export default BlogPost;
export { CodeBlock };
