import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

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
      <Col xs="2"></Col>
      <Col xs="8">
        {s}
      </Col>
      <Col xs="2"></Col>
    </Row>
  ));

  return (
    <Container fluid={true}>
      {nav}
      <Jumbotron>
        <Container>
          <Row>
            <Col className="text-center">
              <h1>CS373 Spring 2019: Souvik Banerjee - {props.title}</h1>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      {sections}
      <Row>
        <Col className="text-center">
          <img src="/static/swe-profile.png" />
        </Col>
      </Row>
    </Container>
  );
};

BlogPost.propTypes = {
  previousPost: PropTypes.string,
  nextPost: PropTypes.string,
  title: PropTypes.string.isRequired,
  sections: PropTypes.array.isRequired,
};

export default BlogPost;
