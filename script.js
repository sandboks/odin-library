//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

const myLibrary = [];
var booksMade = 0;
var booksDeleted = 0;
var bookCurrentlyEditing = null;


const inputs = document.getElementById("addNewBookForm").elements;

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
  ValidateBook(book);
  book.id = booksMade++;
  myLibrary.push(book);
  insertNewBookHTML(book);

  //book.info();
}

function ValidateBook(book) {
  if (book.title.length == 0)
    book.title = "[NO TITLE]";
  if (book.author.length == 0)
    book.author = "[NO AUTHOR]";
  if (book.pageCount == '' || book.pageCount < 0)
    book.pageCount = 0;
}

// BUTTON LISTERNERS

const testButton = document.getElementById("testThing");
testButton.addEventListener("click", () => {
  addBookToLibrary("TITLE", "AUTHOR", 1, false);
});

// DOM manipulation

// CREATE BOOK DIALOG
const createDialog = document.getElementById("addNewBookDialog");
const showButton = document.querySelector(".AddNewBookPanelButton");
const closeButton = document.getElementById("panelCloseButton");
const createNewBookButton = document.getElementById("createNewBookButton");
const dialogHeaderText = document.getElementById("dialogHeaderText");
const toggleButtonText = document.querySelector(".toggleButtonText");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  ShowDialogModal();
});

function ShowDialogModal() {
  dialogHeaderText.textContent = (bookCurrentlyEditing == null) ? "New" : "Edit";
  createNewBookButton.textContent = (bookCurrentlyEditing == null) ? "Create" : "Save changes";

  inputs["title"].value = (bookCurrentlyEditing == null) ? "" : bookCurrentlyEditing.title;
  inputs["author"].value = (bookCurrentlyEditing == null) ? "" : bookCurrentlyEditing.author;
  inputs["pageCount"].value = (bookCurrentlyEditing == null) ? "" : bookCurrentlyEditing.pageCount;
  inputs["hasRead"].checked = (bookCurrentlyEditing == null) ? false : bookCurrentlyEditing.hasRead;
  //toggleButtonText.textContent = (inputs["hasRead"].checked) ? "Read" : "Unread";
  UpdateReadToggleText();
  
  createDialog.showModal();
}

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  CloseDialog();
});

function CloseDialog() {
  bookCurrentlyEditing = null;
  createDialog.close();
}

toggleButtonText.addEventListener("click", () => {
  UpdateReadToggleText(true);
});

function UpdateReadToggleText(reversed = false) {
  if (reversed)
    toggleButtonText.textContent = (!inputs["hasRead"].checked) ? "Read" : "Unread";
  else
    toggleButtonText.textContent = (inputs["hasRead"].checked) ? "Read" : "Unread";
}

createNewBookButton.addEventListener("click", (event) => {
  //event.preventDefault(); // We don't want to submit this fake form
  //let inputs = document.querySelectorAll('input');
  const inputs = document.getElementById("addNewBookForm").elements;

  if (bookCurrentlyEditing == null) {
    addBookToLibrary(inputs["title"].value, inputs["author"].value, inputs["pageCount"].value, inputs["hasRead"].checked);

    inputs["title"].value = "";
    inputs["author"].value = "";
    inputs["pageCount"].value = "";
    inputs["hasRead"].checked = false;

    ShowDialogModal();
  }
  else {
    bookCurrentlyEditing.title = inputs["title"].value;
    bookCurrentlyEditing.author = inputs["author"].value;
    bookCurrentlyEditing.pageCount = inputs["pageCount"].value;
    bookCurrentlyEditing.hasRead = inputs["hasRead"].checked;
    ValidateBook(bookCurrentlyEditing);
    UpdateBookDisplay(bookCurrentlyEditing);

    CloseDialog();
  }
  
});

// INSERT NEW HTML

const libraryGridContainer = document.querySelector('.bottomSectionProjectsGrid');

function insertNewBookHTML(book) {
  var newPanelDiv = document.createElement('div');
  book.HtmlNode = newPanelDiv;
  newPanelDiv.classList.add(`bottomSectionProjectsPanel`);

  libraryGridContainer.appendChild(newPanelDiv);
  UpdateBookDisplay(book);
}

function UpdateBookDisplay(book) {
  var newPanelDiv = book.HtmlNode;
  // start by deleting whatever's already there
  while (newPanelDiv.firstChild) {
    newPanelDiv.removeChild(newPanelDiv.lastChild);
  }


  var closeButtonDiv = document.createElement('div');
  closeButtonDiv.classList.add('closeButtonDiv');

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
}

function DeleteBook(book) {
  myLibrary.splice(book.id - booksDeleted++, 1);
  libraryGridContainer.removeChild(book.HtmlNode);
}

function ToggleReadBook(book) {
  book.hasRead = !book.hasRead;
  book.readIconNode.src = `img/sticker-check${book.hasRead ? "" : "-outline"}.svg`;
}

function EditBookStart(book) {
  bookCurrentlyEditing = book;
  // open dialogue
  ShowDialogModal();
}




addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Twilight", "Stephenie Meyer", 544, false);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Pounded In The Butt By My Handsome Sentient Library Card Who Seems Otherworldly But In Reality Is Just A Natural Part Of The Priceless Resources Our Library System Provides", "Chuck Tingle", 48, false);
