# Kata: Next.js Game Gallery

## Brief

Build a small Next.js app that displays a gallery of video games and a detail page for each one. This is a greenfield project - you will set everything up from scratch.



## Getting started

Create a new Next.js app with TypeScript and Tailwind:

```bash
npx create-next-app@latest app-name
```

When prompted, accept the defaults.

```bash
cd app-name
npm run dev
```

Open `http://localhost:3000` and confirm the default page loads. Then clear out `app/page.tsx` and `app/globals.css` (except for the tailwind import).

## The data

Create a `data/` folder at the root of the project and add `games.json`:

```json
[
  {
    "id": 1,
    "title": "The Legend of Zelda: Breath of the Wild",
    "genre": "Action Adventure",
    "platform": "Nintendo Switch",
    "year": 2017,
    "developer": "Nintendo",
    "description": "An open-world adventure where Link explores a vast Hyrule, solving puzzles and battling enemies to defeat Calamity Ganon."
  },
  {
    "id": 2,
    "title": "Red Dead Redemption 2",
    "genre": "Action Adventure",
    "platform": "PS4 / Xbox One",
    "year": 2018,
    "developer": "Rockstar Games",
    "description": "A sprawling western epic following outlaw Arthur Morgan as the age of outlaws draws to a close."
  },
  {
    "id": 3,
    "title": "Hades",
    "genre": "Roguelike",
    "platform": "PC / Switch",
    "year": 2020,
    "developer": "Supergiant Games",
    "description": "A fast-paced dungeon crawler where you play as the son of Hades, fighting your way out of the Underworld."
  },
  {
    "id": 4,
    "title": "Hollow Knight",
    "genre": "Metroidvania",
    "platform": "PC / Switch",
    "year": 2017,
    "developer": "Team Cherry",
    "description": "A challenging underground adventure through the ruined insect kingdom of Hallownest."
  },
  {
    "id": 5,
    "title": "Disco Elysium",
    "genre": "RPG",
    "platform": "PC / PS4",
    "year": 2019,
    "developer": "ZA/UM",
    "description": "A groundbreaking detective RPG where your skills and worldview shape every conversation and investigation."
  },
  {
    "id": 6,
    "title": "Celeste",
    "genre": "Platformer",
    "platform": "PC / Switch",
    "year": 2018,
    "developer": "Maddy Makes Games",
    "description": "A precise and emotional platformer following Madeline as she climbs a mountain and confronts her inner demons."
  }
]
```



## Project structure

Build toward this structure:

```
app/
  layout.tsx
  page.tsx
  games/
    page.tsx
    [id]/
      page.tsx
components/
  GameCard.tsx
data/
  games.json
services/
  games.ts
```



## Requirements

### Step 1 - layout and navigation

Set up `app/layout.tsx` as the root shell. It should include a navbar with links to Home and Games. Every page should render inside it via `{children}`.

Use `Link` from `next/link` for navigation.

### Step 2 - the service

Create `services/games.ts`.

Define two interfaces: `Game` for the full shape and `GameSummary` for what the gallery needs - id, title, genre, platform, and year.

Expose two functions: one that returns all games as `GameSummary[]`, and one that finds a single game by id and returns `Game | undefined`.

### Step 3 - the gallery

Create `app/games/page.tsx`.

Use your service to get all games and render a `GameCard` for each one. This is a server component - no `useEffect`, no `async` on the function, no loading state.

### Step 4 - the card component

Create `components/GameCard.tsx`.

It receives a `GameSummary` as props and displays the title, genre, platform, and year. Include a link to the detail page for that game.

### Step 5 - the detail page

Create `app/games/[id]/page.tsx`.

Extract the `id` from params, convert it to a number, and use your service to find the game. If no game is found, call `notFound()`. Otherwise display the full game details.

### Step 6 - home page

Keep it simple. `app/page.tsx` should welcome the user and include a link to the games gallery.



## Reflection

Answer briefly when you are done:

- What is the difference between `page.tsx` and `layout.tsx`?
- Why is there no `<Routes>` configuration anywhere?
- Your gallery page has no `useEffect` and no loading state. Why does it not need them?
- `params.id` is always a string. Why do you need to convert it before passing it to your service?
- When does `notFound()` fire and what does it do?