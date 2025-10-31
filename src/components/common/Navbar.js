import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/common/Navbar.css";
import logo from '../../logo.png';
import home_icon from '../../assets/icons/home-outline.svg';
import game_icon from '../../assets/icons/game-controller-outline.svg';
import pulse_icon from '../../assets/icons/pulse-outline.svg';
import star_icon from '../../assets/icons/star-outline.svg';

const navbarOptions = [
    {
        icon: home_icon,
        title: "Home",
        url: "/"
    },
    {
        icon: game_icon,
        title: "Games",
        url: "/games"
    },
    {
        icon: pulse_icon,
        title: "Activities",
        url: "/activities"
    }
    ,
    {
        icon: star_icon,
        title: "Favorites",
        url: "/favorites"
    }
]
export const Navbar = () => {
    let location = useLocation();

    useEffect(() => {
        const listItems = document.querySelectorAll('.list');
        // clear all
        listItems.forEach(li => li.classList.remove('active'));

        // find the link whose href best matches the current path
        const anchors = document.querySelectorAll('.list a');
        let matched = null;
        anchors.forEach(a => {
            const href = a.getAttribute('href');
            if (!href) return;
            // exact match or startsWith
            if (location.pathname === href || location.pathname.startsWith(href)) {
                matched = a;
            }
        });
        if (matched && matched.parentElement) {
            matched.parentElement.classList.add('active');
        } else if (location.pathname === '/') {
            // default to first
            if (listItems[0]) listItems[0].classList.add('active');
        }

        function handleClick() {
            listItems.forEach((item) => item.classList.remove('active'));
            this.classList.add('active')
        }
        listItems.forEach((item) => item.addEventListener('click', handleClick));

        // console.log('location', location)
    }, [location])

    return (
      <div className="navbar-wrapper">
        <div className="navbar-root">
            <div className="navbar-heading">
                <Link 
                    to="/"
                    className="nav-logo"
                >
                    <img src={logo} alt="ACM Fun Logo" />
                    {/* <h1>ACM FUN</h1> */}
                </Link>
            </div>
            <ul>
                {
                    navbarOptions.map((item, i) => {
                        
                        return (
                            <li 
                                key={i}
                                className="list "
                            >
                                <Link 
                                    to={item.url} 
                                    class="navbar-item" 
                                >
                                    <span class="icon">
                                        <img src={item.icon} alt={item.title} />
                                    </span>
                                    <span class="text">
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        )
                    })
                }
            <   div class="indicator"></div>
            </ul>
        </div>
      </div>
    );
}