import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { string } from 'prop-types';

const SocialLinks = props => (
    <div>
        <ul className="social">
            <li>
                <SocialIcon url={props.facebook} />
            </li>
            <li>
                <SocialIcon url={props.linkedin} />
            </li>
            <li>
                <SocialIcon url={props.github} />
            </li>
            <li>
                <SocialIcon url={props.instagram} />
            </li>
            <li>
                <SocialIcon url={props.email} />
            </li>
        </ul>
        <style jsx>{`
            .social {
                list-style-type: none;
                padding-left: 0;
                margin: auto;
                margin-top: 2em;
            }

            .social li {
                display: inline-block;
                margin: 0.25em;
            }

            .social a {
                color: inherit;
                opacity: 0.8;
                transition-duration: 0.15s;
            }
        `}</style>
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