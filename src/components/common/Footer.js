import { React } from 'react';
import "../../styles/components/common/Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="footer-content">
                <p>ACM</p>
                <p>Copyright {currentYear}</p>
            </div>
        </footer>
    );
};

export default Footer;
