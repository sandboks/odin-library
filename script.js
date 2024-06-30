//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

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
  insertNewBookHTML(book);

  //book.info();
}

addBookToLibrary("The Hoobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry Pooter", "some biggot", 1111, false);

myLibrary.forEach((book) => {
  book.info();
});

// BUTTON LISTERNERS

const testButton = document.getElementById("testThing");
testButton.addEventListener("click", () => {
  insertNewBookHTML(new Book("TITLE", "AUTHOR", 1, false));
});

// DOM manipulation

// DIALOG
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

// INSERT NEW HTML

function insertNewBookHTML(book) {
  var toAdd = document.createDocumentFragment();
  var newDiv = document.createElement('div');
  newDiv.classList.add(`bottomSectionProjectsPanel`);
  newDiv.innerHTML = 
  `
  <div class="bottomSectionProjectsPanelContent">
      <h3>${book.title} / ${book.author}</h3>
      <p>${book.pageCount} pages</p>
      <div class="bottomSectionProjectsPanelIcons">
          <a href="https://sandboks.github.io/odin-calculator/">
              <img src="img/eye-outline.svg">
          </a>
          <a href="https://github.com/sandboks/odin-calculator">
              <img src="img/github-mark.svg">
          </a>
      </div>
  </div>`;
  toAdd.appendChild(newDiv);
  document.querySelector('.bottomSectionProjectsGrid').appendChild(toAdd);
}


