import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/common/Navbar.css";
import logo from '../../logo.png';
import home_icon from '../../assets/icons/home-outline.svg';
import game_icon from '../../assets/icons/game-controller-outline.svg';
import pulse_icon from '../../assets/icons/pulse-outline.svg';

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
]
export const Navbar = () => {
    let location = useLocation();

    useEffect(() => {
        const list = document.querySelectorAll('.list');
   
        if (location.pathname === "/") {
            list[0].classList.add("active");
            list[1].classList.remove("active");
            list[2].classList.remove("active");
        }

        if (location.pathname === "/games") {
            list[0].classList.remove("active");
            list[1].classList.add("active");
            list[2].classList.remove("active");
        }

        if (location.pathname === "/activities") {
            list[0].classList.remove("active");
            list[1].classList.remove("active");
            list[2].classList.add("active");
        }

        function handleClick() {
            list.forEach((item) => item.classList.remove("active"));
            this.classList.add("active")
        }
        list.forEach((item) =>
            item.addEventListener("click", handleClick));

        console.log('location', location)
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