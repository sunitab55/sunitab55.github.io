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
            name="Sunita Bhattacharya"
            subtitle="Data Analyst"
            resumePath="/resume.pdf"
          />
          <br />
          <SocialLinks
            facebook="https://www.facebook.com/Atinus.B"
            linkedin="https://www.linkedin.com/in/atinusb/"
            github="https://github.com/sunitab55"
            email="mailto:sunitab55@gmail.com"
            instagram="https://www.instagram.com/pengatinus/"
          />
        </Jumbotron>
      </div>
    </div>
  </div>
);

export default Home;
