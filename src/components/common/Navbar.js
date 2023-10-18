import {Link} from "react-router-dom";
import "../../styles/components/common/Navbar.css";
import logo from '../../logo.svg';

const navbarOptions = [
    {
        title: "Home",
        url: "/"
    },
    {
        title: "Games",
        url: "/games"
    },
    {
        title: "Activities",
        url: "/activities"
    }
]

export const Navbar = () => {
    return (
        <div className="navbar-root">
            <div className="navbar-heading">
                <img src={logo} />
                <h1>ACM FUN</h1>
            </div>
            <div className="navbar-content">
                {
                    navbarOptions.map(item => {
                        return (
                            <Link to={item.url} className="navbar-item">
                                {item.title}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}