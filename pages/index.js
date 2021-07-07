import styles from "../styles/Home.module.css";

import React from "react";
import Head from "next/head";
import Introduction from "../components/Introduction";
import SocialLinks from "../components/SocialLinks";
import { Jumbotron, Container } from "reactstrap";

const Home = () => (
  <div>
    <Head>
      <title>Souvik Banerjee</title>
    </Head>
    <div className={styles["main-bg"]}>
      <div className={styles.main}>
        <Jumbotron className={styles.main_container}>
          <Introduction
            name="Souvik Banerjee"
            subtitle="Software Engineer"
            resumePath="/resume.pdf"
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
  </div>
);

export default Home;
