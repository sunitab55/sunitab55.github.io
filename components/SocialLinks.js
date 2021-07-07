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
        <SocialIcon bgColor="#7e7e7e" url={props.github} />
      </li>
      <li>
        <SocialIcon url={props.instagram} />
      </li>
      <li>
        <SocialIcon url={props.email} />
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
