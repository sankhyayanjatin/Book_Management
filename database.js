const books = [
  {
    ISBN: "12345book",
    Title: "Tesla",
    pubDate: "2023-05-13",
    Language: "EN",
    numPage: 250,
    author: [1, 2],
    publication: [1],
    category: ["tech", "space", "education"],
  },
];

const author = [
  {
    id: 1,
    name: "Henry",
    books: ["12345book", "secretbook"],
  },
  {
    id: 2,
    name: "ElonMusk",
    books: ["12345book"],
  },
];

const publication = [
  {
    id: 1,
    name: "techie",
    books: ["12345book"],
  },
  {
    id: 2,
    name: "techie2",
    books: [],
  },
];

module.exports = { books, author, publication };
