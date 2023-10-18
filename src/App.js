import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Navbar} from "./components/common/Navbar";
import {Games} from "./pages/Games";
import {Activities} from "./pages/Activities";
import {activities} from "./data/content";


function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route index element={<Home />} />
                <Route exact path="/games" element={<Games />} />
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
