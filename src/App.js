import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Navbar} from "./components/common/Navbar";
import {Games} from "./pages/Games";
import {Activities} from "./pages/Activities";
import {activities, games} from "./data/content";

import Wrapper from "./activities/components/Wrapper";
import Screen from "./activities/components/Screen";
import ButtonBox from './activities/components/ButtonBox'
import Button from './activities/components/Button'
import CalcProvider from "./activities/components/CalcContext";

function App() {
    return (
        <div className="App">
            <Navbar />
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

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

function Calculator(){
    return (
        <CalcProvider>
          <Wrapper>
            <Screen />
            <ButtonBox>
              {btnValues.flat().map((btn, i) => (
                <Button
                  value={btn}
                  key={i}
                />
              ))}
            </ButtonBox>
          </Wrapper>
        </CalcProvider>
    );
}

export default App;
