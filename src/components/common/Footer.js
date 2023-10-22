import React from 'react';
import "../../styles/components/common/Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';



function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; {currentYear} ACM FUN </p>
                <div className="social-icons">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} className="icon" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="icon" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} className="icon" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="icon" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

