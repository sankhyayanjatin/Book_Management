const express = require("express");
const bodyParser = require("body-parser");

const database = require("./database");

const booky = express(); //initializing express in variable booky
booky.use(bodyParser.urlencoded({ extended: true }));

booky.use(bodyParser.json());

/*
 API
route               /
discriptiton       get all books
access             public
parameters         none
method             get 

*/
booky.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*

route               /is
discriptiton       get specific books isbn
access             public
parameters         isbn
method             get 

*/

booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `no book found for this isbn of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
route               /c
discriptiton       get specific books catrgory
access             public
parameters         category
method             get 
*/

booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `no book found for this category of ${req.params.category}`,
    });
  }
  return res.json({ book: getSpecificBook });
});

/*
route               /l
discriptiton       get specific books language
access             public
parameters         language
method             get 
*/
booky.get("/l/:language", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.Language.includes(req.params.language)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `no book found for this category of ${req.params.language}`,
    });
  }
  return res.json({ book: getSpecificBook });
});

/*
route               /author
discriptiton       get author
access             public
parameters         none
method             get 
*/
booky.get("/author", (req, res) => {
  return res.json({ author: database.author });
});

/*
route               /author/id
discriptiton       get author
access             public
parameters         id
method             get 
*/
booky.get("/author/id/:id", (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.id === req.params.id
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `no author found for this id of ${req.params.id}`,
    });
  }

  return res.json({ author: getSpecificAuthor });
});

/*
route               /author/book
discriptiton       get author isbn based
access             public                        
parameters         isbn
method             get 
*/

booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `no author found for this  isbn ${req.params.isbn}`,
    });
  }
  return res.json({ book: getSpecificAuthor });
});

/*
route               /pub
discriptiton       get all publcation
access             public                        
parameters         none
method             get 
*/

booky.get("/pub", (req, res) => {
  return res.json({ publication: database.publication });
});

/*
route               /pub/book
discriptiton       get all publcation based on books
access             public                        
parameters         isbn
method             get 
*/

booky.get("/pub/book/:isbn", (req, res) => {
  const specificPublication = database.publication.filter((publication) =>
    publication.books.includes(req.params.isbn)
  );
  if (specificPublication.length === 0) {
    return res.json(`no publication found for this  isbn ${req.params.isbn}`);
  }
  return res.json({ publication: specificPublication });
});

/*
route               /pub/name
discriptiton       get all publcation based on name
access             public                        
parameters         name
method             get 
*/

booky.get("/pub/name/:name", (req, res) => {
  const specificPublication = database.publication.filter((publication) =>
    publication.name.includes(req.params.name)
  );
  if (specificPublication.length === 0) {
    return res.json(`no publication found for this  name ${req.params.name}`);
  }
  return res.json({ publication: specificPublication });
});

/*
route               /book/new
discriptiton        add new books
access              public                        
parameters          none
method              post
*/
booky.post("/book/new", (req, res) => {
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({ updateBook: database.books });
});

/*
route               /author/new
discriptiton        add new author
access              public                        
parameters          none
method              post
*/
booky.post("/author/new", (req, res) => {
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json({ updateAuthor: database.author });
});
/*
route               /publication
discriptiton        post new publicstion
access              public                    
parameters          none
method              post
*/
booky.post("/pub/new", (req, res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json({ updatePublication: database.publication });
});
/*
route               /publication/update/book
discriptiton        update/add new publication
access              public                    
parameters          isbn
method              put
*/
booky.put("/publication/update/book/:isbn", (req, res) => {
  //update the publication database
  database.publication.forEach((pub) => {
    if (pub.id == req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });

  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
  });
  return res.json({
    books: database.books,
    publications: database.publication,
    message: "successfully updated publications",
  });
});

/*
route               /book/delete
discriptiton        delete a abook
access              public                    
parameters          isbn
method              delete
*/
booky.delete("/book/delete/:isbn", (req, res) => {
  const updateBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );
  database.books = updateBookDatabase;

  return res.json({ books: database.books });
});

/*
route               
discriptiton        delete a abook
access              public                    
parameters          isbn
method              delete
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  //update the book database
  database.books.forEach((book) => {
    if (book.ISBN == req.params.isbn) {
      const newAuthorlist = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
      );
      book.author = newAuthorlist;
      return;
    }
  });
});

booky.listen(3000, () => {
  console.log("server is up and running");
});
