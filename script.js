//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

const myLibrary = [];
var booksMade = 0;
var booksDeleted = 0;
var bookCurrentlyEditing = null;

function Book(title, author, pageCount, hasRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasRead = hasRead;

  this.id = 0;
  this.HtmlNode;
  this.readIconNode;

  this.info = function() {
    console.log(`${this.title} by ${this.author}, ${this.pageCount}, ${this.hasRead ? "has read" : "has not read"}`);
  }
}

function addBookToLibrary(title, author, pageCount, hasRead) {
  let book = new Book(title, author, pageCount, hasRead);
  book.id = booksMade++;
  myLibrary.push(book);
  insertNewBookHTML(book);

  //book.info();
}

myLibrary.forEach((book) => {
  book.info();
});

// BUTTON LISTERNERS

const testButton = document.getElementById("testThing");
testButton.addEventListener("click", () => {
  addBookToLibrary("TITLE", "AUTHOR", 1, false);
});

// DOM manipulation

// CREATE BOOK DIALOG
const createDialog = document.getElementById("addNewBookDialog");
const showButton = document.getElementById("addNewBookOpenDialog");
const closeButton = document.querySelector("dialog button");
const createNewBookButton = document.getElementById("createNewBookButton");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  createDialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  createDialog.close();
});

createNewBookButton.addEventListener("click", (event) => {
  //event.preventDefault(); // We don't want to submit this fake form
  //let inputs = document.querySelectorAll('input');
  const inputs = document.getElementById("addNewBookForm").elements;
  addBookToLibrary(inputs["title"].value, inputs["author"].value, inputs["pageCount"].value, inputs["haveRead"].checked);

  inputs["title"].value = "";
  inputs["author"].value = "";
  inputs["pageCount"].value = "";
  inputs["haveRead"].checked = false;
});

// INSERT NEW HTML

const libraryGridContainer = document.querySelector('.bottomSectionProjectsGrid');

function insertNewBookHTML(book) {
  var newPanelDiv = document.createElement('div');
  book.HtmlNode = newPanelDiv;
  newPanelDiv.classList.add(`bottomSectionProjectsPanel`);

  var closeButtonDiv = document.createElement('div');
  closeButtonDiv.classList.add('bottomSectionProjectsPanelCloseButton');

  var closeButtonImg = document.createElement("img");
  closeButtonImg.src = "img/close-circle-outline.svg";
  closeButtonImg.classList.add("panelCloseButton");
  closeButtonImg.addEventListener("click", () => {
    DeleteBook(book);
  });

  closeButtonDiv.appendChild(closeButtonImg);

  var panelContentDiv = document.createElement('div');
  panelContentDiv.classList.add('bottomSectionProjectsPanelContent');
  panelContentDiv.innerHTML = 
  `
  <h3>${book.title}</h3>
  <h4>${book.author}</h4>
  <p>${book.pageCount} pages</p>
  <p>ID: ${book.id}</p>
  `;


  var panelBottomIcons = document.createElement(`div`);
  panelBottomIcons.classList.add("bottomSectionProjectsPanelIcons");
  var editIcon = document.createElement('img');
  editIcon.src = "img/text-box-edit-outline.svg";
  editIcon.addEventListener('click', () => {
    EditBookStart(book);
  });

  var readIcon = document.createElement('img');
  book.readIconNode = readIcon;
  readIcon.src = `img/sticker-check${book.hasRead ? "" : "-outline"}.svg`;
  readIcon.addEventListener('click', () => {
    ToggleReadBook(book);
  });
  panelBottomIcons.appendChild(editIcon);
  panelBottomIcons.appendChild(readIcon);

  panelContentDiv.appendChild(panelBottomIcons);


  newPanelDiv.appendChild(closeButtonDiv);
  newPanelDiv.appendChild(panelContentDiv);

  /*
  newPanelDiv.innerHTML = 
  `
  <div class="bottomSectionProjectsPanelCloseButton">
    <img src="img/close-circle-outline.svg" class="panelCloseButton">
  </div>
  <div class="bottomSectionProjectsPanelContent">
    <h3>${book.title}</h3>
      <h4>${book.author}</h4>
      <p>${book.pageCount} pages</p>
      <p>ID: ${book.id}</p>
      <div class="bottomSectionProjectsPanelIcons">
          <a href="https://sandboks.github.io/odin-calculator/">
              <img src="img/cog.svg">
          </a>
          <a href="https://github.com/sandboks/odin-calculator">
              <img src="img/star.svg">
          </a>
      </div>
  </div>`;
  */

  libraryGridContainer.appendChild(newPanelDiv);
  
  //const darkModeSwitch = document.querySelector("#darkModeToggle");
  //darkModeSwitch.addEventListener("click", ToggleDarkMode)
}

function DeleteBook(book) {
  myLibrary.splice(book.id - booksDeleted++, 1);
  console.log(myLibrary.length);
  libraryGridContainer.removeChild(book.HtmlNode);
}

function ToggleReadBook(book) {
  book.hasRead = !book.hasRead;
  book.readIconNode.src = `img/sticker-check${book.hasRead ? "" : "-outline"}.svg`;
}

function EditBookStart(book) {
  bookCurrentlyEditing = book;
  // open dialogue
}




addBookToLibrary("The Hoobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry Pooter", "some biggot", 1111, false);