const myLibrary = [];

function Book(title, author, pageCount, hasRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasRead = hasRead;

  this.info = function() {
    console.log(`${this.title} by ${this.author}, ${this.pageCount}, ${this.hasRead ? "has read" : "has not read"}`);
  }
}

function addBookToLibrary(title, author, pageCount, hasRead) {
  let book = new Book(title, author, pageCount, hasRead);
  myLibrary.push(book);

  book.info();
}

addBookToLibrary("The Hoobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry Pooter", "some biggot", 1111, false);

myLibrary.forEach((book) => {
  book.info();
});

// DOM manipulation

const dialog = document.getElementById("addNewBookDialog");
const showButton = document.getElementById("addNewBookOpenDialog");
const closeButton = document.querySelector("dialog button");
const submitButton = document.getElementById("submitButton");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

submitButton.addEventListener("click", (event) => {
  //event.preventDefault(); // We don't want to submit this fake form
  let inputs = document.querySelectorAll('input');
  addBookToLibrary(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);

  dialog.close();
});