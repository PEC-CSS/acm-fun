# ACM FUN - React.js Project

ACM FUN is an exciting initiative by PECACM, aimed at engaging beginners in the world of development and open source contributions. 😄

Live URL:- https://acm-fun.vercel.app/

## Table of Contents

- [Description](#acm-fun---reactjs-project)
- [Features](#features)
- [Tech Used](#tech-used)
- [How to start](#how-to-start)
- [Contributing](#contributing)

##Overview

The ACM FUN website is designed to provide learning through fun and interactive challenges. It helps beginners explore coding, logic, and web concepts while enjoying games and tools.

Games

The "Games" section offers engaging interactive challenges:

Magic Squares – Solve a number arrangement puzzle.

Tic-Tac-Toe – The classic strategic duel (with a twist!).

Jitter Click Game – Test your clicking speed under pressure.

Wordle Game – Enjoy unlimited rounds of the popular word-guessing game.

Guess The Flag – Learn world flags in a fun quiz format.

Activities

The "Activities" section includes lightweight tools and generators:

Quote & Joke Generators – Random quotes, anime quotes, and jokes.

Random Memes – Displays new memes at random.

Fortune Card – Try your luck with a fun fortune card.

Search Words – Dictionary tool for word meanings.

Calculator – Simple tool for basic mathematical calculations.

Dog/Cat HTTP Status Code – Fun animal-based meme generator inspired by HTTP codes.

## Features

- A fun and interactive web application built using React.js.
- Engage with open source contributions in a beginner-friendly environment.
- Collaborate with a community of like-minded individuals.

## Tech Used

React is a JavaScript library for building fast and interactive UIs.

Vercel is a cloud platform for deploying and scaling React applications.

## How to start

1. Clone the repository

```
  git clone https://github.com/PEC-CSS/acm-fun.git
```

2. Change the working directory

```
  cd acm-fun
```

3. Install dependencies

```
  npm install
```

4. Run the app

```
  npm start
```

5. Open your web browser and navigate to http://localhost:3000 to view the app.

The page will automatically reload when you make changes, and any lint errors will be displayed in the console.

6. Make sure to follow the directory structure while adding a new **game** or **activity**
 - Your game or activity should be created inside a react component, the file for which should be created in `src/pages/games` for games and `src/pages/activities` for activities.
 - The css file for your component must be created inside the `src/styles/pages/games` folder for games and `src/styles/pages/activities` for activities.
 - To ensure that your created component appears on the website, you must add an entry for your game or activity in the `content.js` file present in `src/data` folder.
 - Refer to this [pull request](https://github.com/PEC-CSS/acm-fun/pull/37/files) to get an idea of the changes you need to make. **Do not make any changes other than these unless explicitly required.**

# Contributing

- To contribute to ACM FUN, refer to [Contributing Guidlines](./Contributing.md)

# Contributors

<a href="https://github.com/PEC-CSS/acm-fun/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=PEC-CSS/acm-fun" />
</a>

<br>

We welcome your contributions and hope you enjoy your journey with ACM FUN!
