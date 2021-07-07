import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { string } from "prop-types";
import styles from "../styles/Introduction.module.css";

const Introduction = (props) => (
  <Container>
    <h1 className={styles.name}>{props.name}</h1>
    <p className={styles.subtitle}>{props.subtitle}</p>

    <Link href={props.resumePath}>
      <a className={styles.resume}>Resume</a>
    </Link>
  </Container>
);

Introduction.propTypes = {
  name: string,
  subtitle: string,
  resumePath: string,
};

export default Introduction;
