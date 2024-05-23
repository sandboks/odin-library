const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.info = function() {
    console.log("${this.title} by {$this.author}, pages, not read yet");
  }
}

function addBookToLibrary() {
  // do stuff here
}

let book1 = new Book("The Hoobbit", "J.R.R. Tolkien", 295, false);
book1.info();