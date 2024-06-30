//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

const myLibrary = [];
var booksMade = 0;

function Book(title, author, pageCount, hasRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasRead = hasRead;

  this.id = 0;

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

const libraryGridContainer = document.querySelector('.bottomSectionProjectsGrid');

function insertNewBookHTML(book) {
  var newPanelDiv = document.createElement('div');
  newPanelDiv.classList.add(`bottomSectionProjectsPanel`);

  var closeButtonDiv = document.createElement('div');
  closeButtonDiv.classList.add('bottomSectionProjectsPanelCloseButton');

  var closeButtonImg = document.createElement("img");
  closeButtonImg.src = "img/close-circle-outline.svg";
  closeButtonImg.classList.add("panelCloseButton");
  closeButtonImg.addEventListener("click", () => {
    console.log("hello");
    libraryGridContainer.removeChild(newPanelDiv);
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
  <div class="bottomSectionProjectsPanelIcons">
      <a href="https://sandboks.github.io/odin-calculator/">
          <img src="img/cog.svg">
      </a>
      <a href="https://github.com/sandboks/odin-calculator">
          <img src="img/star.svg">
      </a>
  </div>
  `;

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

function DeleteBook(index) {
  console.log("test");
}




addBookToLibrary("The Hoobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry Pooter", "some biggot", 1111, false);