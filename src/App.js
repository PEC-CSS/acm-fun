import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Games} from "./pages/Games";
import {Activities} from "./pages/Activities";
import {activities, games} from "./data/content";
import {Navbar} from './components/common/Navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route index element={<Home />} />
                <Route exact path="/games" element={<Games />} />
                {
                    games.map(game => {
                        return (
                            <Route exact path={`/games/${game.urlTerm}`} element={game.element} />
                        )
                    })
                }
                <Route exact path="/activities" element={<Activities />} />
                {
                    activities.map(activity => {
                        return (
                            <Route exact path={`/activities/${activity.urlTerm}`} element={activity.element} />
                        )
                    })
                }
            </Routes>
        </div>
    );
}

export default App;
