import React from 'react';
import '../../styles/pages/Home/Footer.css';
import { Link } from 'react-router-dom';
import { LogoDiscord, LogoFacebook, LogoInstagram, LogoLinkedin, LogoGithub, LogoYoutube } from 'react-ionicons'
import pecacm from '../../assets/icons/acm.webp'
import pec from '../../assets/icons/pec_centenary_logo.jpg'
function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="waves">
                {/* Your wave divs */}
            </div>

            <div className="container">
                <div className="row ">
                    <div className=" col-md-4 justify-content-center  text-center  p-3">
                        <h2>Socials</h2>
                        <ul className="social_icon list-inline d-flex p-3 justify-content-around">
                            <li>
                                <Link to="https://www.facebook.com/pecacm/" target="_blank">
                                    <LogoFacebook className='ion'/>
                                </Link>
                            </li>
                            <li>
                                <Link to="https://discord.com/invite/59mDGtSyGD" target="_blank">
                                    <LogoDiscord />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://www.instagram.com/pecacm/" target="_blank">
                                    <LogoInstagram />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://www.linkedin.com/company/pec-acm-student-chapter/" target="_blank">
                                    <LogoLinkedin />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://github.com/PEC-CSS/" target="_blank">
                                    <LogoGithub />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://www.youtube.com/c/PECACMStudentChapter" target="_blank">
                                    <LogoYoutube />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="container-fluid col-md-4">
                        <div className='row justify-content-center p-3 links'>

                        <h2>Links</h2>
                        <ul className="events p-3">
                            <li className='p-3'>
                                <Link to="https://www.pecacm.com/" target="_blank">
                                    <img src={pecacm} className="pecacm img-fluid" alt="PEC ACM" />
                                </Link>
                            </li>
                            <li className='p-3'>
                                <Link to="https://pec.ac.in/campus-life/ACM" target="_blank">
                                    <img src={pec} className="pec img-fluid" alt="PEC" />
                                </Link>
                            </li>
                        </ul>
                        </div>
                    </div>

                    <div className="col-md-4 p-3 menuItem">
                        <h2>Community</h2>
                        <ul className="comm list-group list-group-flush">
                            <li className="list-group-item"><Link aria-label="Development Web/App" to="https://www.pecacm.com//branches/development" target="_blank">Development Web/App</Link></li>
                            <li className="list-group-item"><Link aria-label="Machine Learning" to="https://www.pecacm.com//branches/ai" target="_blank">Machine Learning</Link></li>
                            <li className="list-group-item"><Link aria-label="Competitive Programming" to="https://www.pecacm.com//branches/cp" target="_blank">Competitive Programming</Link></li>
                            <li className="list-group-item"><Link aria-label="Cyber Security" to="https://www.pecacm.com//branches/cyber" target="_blank">Cyber Security</Link></li>
                            <li className="list-group-item"><Link aria-label="Designing and Socials" to="https://www.pecacm.com//branches/socials" target="_blank">Designing and Socials</Link></li>
                            <li className="list-group-item"><Link aria-label="Women in Tech" to="https://www.pecacm.com//branches/wit" target="_blank">Women in Tech</Link></li>

                        </ul>
                    </div>
                </div>
            </div>

            <p className="text-center">
                {new Date().getFullYear()} &copy; PEC ACM
            </p>
        </footer>

    );
}

export default Footer;