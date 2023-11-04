import './App.css';
import './tailwind.css';
import {Route, Routes} from "react-router-dom";
import React, { useState, useEffect } from "react";
import {Home} from "./pages/Home";
import {Games} from "./pages/Games";
import {Activities} from "./pages/Activities";
import {activities, games} from "./data/content";
import {Navbar} from './components/common/Navbar';

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? storedTheme === 'dark' : false;
      });
    
      // Function to toggle the dark mode icon visibility
      const toggleIconVisibility = (newDarkMode) => {
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        if (darkIcon && lightIcon) {
          darkIcon.style.display = newDarkMode ? 'inline' : 'none';
          lightIcon.style.display = newDarkMode ? 'none' : 'inline';
        }
      };
    
      const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
        // Toggle the visibility of the dark and light mode icons
        toggleIconVisibility(newDarkMode);
    
        // Toggle dark mode class on the document element
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };
    
      useEffect(() => {
        // Set the icon visibility when the component mounts
        toggleIconVisibility(darkMode);
    
        // Toggle dark mode class on the document element
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [darkMode]);
    
      // Apply different CSS classes based on the darkMode state
      const containerClass = localStorage.theme === 'dark' ? 'bg-gray-900 dark' : 'bg-white';

    return (
        <div className={`${containerClass} App min-h-screen text-black dark:text-white`}>
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
        <div className="absolute top-4 right-4">
        <button
        id="theme-toggle"
        type="button"
        class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        onClick={toggleDarkMode}>
        <svg
            id="theme-toggle-dark-icon"
            class="w-5 h-5 hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            ></path>
        </svg>
        <svg
            id="theme-toggle-light-icon"
            class="w-5 h-5 hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fill-rule="evenodd"
            clip-rule="evenodd"
            ></path>
        </svg>
        </button>
        </div>
        </div>
    );
}

export default App;
