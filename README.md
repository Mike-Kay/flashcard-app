# Frontend Mentor - Flashcard app solution

This is a solution to the [Flashcard app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/flashcard-app). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

#### Flashcard Management

- Create new flashcards with a question, answer, and category
- Edit existing flashcards to update their details
- Delete flashcards they no longer need
- See form validation messages when trying to submit a card without all fields completed
- View all their flashcards in a grid layout
- See flashcard details including question, answer, category, and mastery progress

#### Study Mode

- Study flashcards one at a time in Study Mode
- Click on a flashcard to reveal the answer
- Mark a flashcard as known by clicking "I Know This" to track mastery progress
- Navigate between flashcards using Previous and Next buttons
- See which card they're currently viewing (e.g., "Card 1 of 40")
- Track mastery progress for each card on a scale of 0 to 5
- Reset progress on a flashcard to start learning it again

#### Filtering & Organization

- Filter flashcards by selecting one or multiple categories
- See the number of cards in each category within the filter dropdown
- Hide mastered cards to focus on cards that still need practice
- Shuffle flashcards to randomize the study order

#### Statistics & Progress

- View study statistics showing total cards, mastered, in progress, and not started counts

#### UI & Navigation

- Toggle between Study Mode and All Cards views
- Load more flashcards when viewing the full card list with more than 12 cards
- See a toast message when a card is created, updated, or deleted
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app using only their keyboard

### Links

- Solution URL: [Solution URL](https://www.frontendmentor.io/challenges/flashcard-app)
- Live Site URL: [Live site URL](https://mike-kay.github.io/flashcard-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

I had a nice experience discussing the app logics with Claude, it helped me refine some ideas i already had, and gave me some ideas to try as well. It was fun. This project helped me reinforce some basic JS concepts like higher order functions, array methods for data structures, e.t.c. Also learnt a custom "focus trap" method by using the useRef hook to manage focus in React components, especially when dealing with modals and dropdowns, and how to create a custom toast as well. The "useFocusTrap" function is a good example of how to create a reusable hook that can handle focus management for different types of modals and dropdowns. Lastly, i learnt more about buiding interactive and accessible web apps through this project, it encouraged me to seek, learn, understand, and utilize the related concepts.

### Continued development

Writing simplified and easy to understand code and logic, utilize AI tools a bit more to hasten work flow and improve efficiency.

### Useful resources

- [Custom Toast](https://www.youtube.com/watch?v=EAOzhLrnE2E)

### AI Collaboration

Claude was provided as the AI agent for this project, and it helped me hasten my work flow by reinforcing my ideas and logics while also giving me some ideas to try in setting up the app logic especially the state management and in understanding the UI states too. It helped me identify some edge cases and how they may affect different aspects of the app. Rather than get to the point where i start thinking about how to make the logic work, by planning out with Claude from the start, i already had a general overview of how to go about and integrate the most connected implementations needed.

## Author

- Frontend Mentor - [Mike-Kay](https://www.frontendmentor.io/profile/Mike-Kay)
