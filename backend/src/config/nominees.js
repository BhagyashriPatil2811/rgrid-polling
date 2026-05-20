/**
 * nominees.js
 * Default nominees configuration — acts as a seeder.
 * Loaded into in-memory store on server startup.
 * To change nominees, update this file and restart the server.
 */

const nominees = [
  {
    id: "1",
    name: "Alice Johnson",
    party: "Progressive Party",
    symbol: "🌟",
  },
  {
    id: "2",
    name: "Bob Smith",
    party: "Liberty Party",
    symbol: "🦅",
  },
  {
    id: "3",
    name: "Carol White",
    party: "Green Party",
    symbol: "🌿",
  },
  {
    id: "4",
    name: "David Brown",
    party: "Unity Party",
    symbol: "🤝",
  },
  {
    id: "5",
    name: "Eva Martinez",
    party: "People's Party",
    symbol: "⭐",
  },
];

module.exports = nominees;