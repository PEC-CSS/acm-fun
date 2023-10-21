import {Link} from "react-router-dom";
import "../../styles/components/common/Navbar.css";
import logo from '../../logo.png';

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
                <img src={logo} alt="FunVerse Logo" className="funVerse-logo" />
                <h1>Play, Discover, Repeat!</h1>
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