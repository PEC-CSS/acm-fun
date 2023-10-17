import {Link} from "react-router-dom";

let navbarOptions = [
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
        <div>
            {
                navbarOptions.map(item => {
                    return (
                        <Link to={item.url}>
                            {item.title}
                        </Link>
                    )
                })
            }
        </div>
    )
}