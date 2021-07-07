import React from "react";
import styles from "../styles/SocialLinks.module.css";
import { SocialIcon } from "react-social-icons";
import { string } from "prop-types";

const SocialLinks = (props) => (
  <div>
    <ul className={styles.social}>
      <li>
        <SocialIcon url={props.facebook} />
      </li>
      <li>
        <SocialIcon url={props.linkedin} />
      </li>
      <li>
        <SocialIcon bgColor="#6e6e6e" url={props.github} />
      </li>
      <li>
        <SocialIcon url={props.instagram} />
      </li>
      <li>
        <SocialIcon bgColor="#892304" url={props.email} />
      </li>
    </ul>
  </div>
);

SocialLinks.propTypes = {
  facebook: string,
  linkedin: string,
  github: string,
  email: string,
  instagram: string,
};

export default SocialLinks;
