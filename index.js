// Library Array
const myLibrary = [];

// Query Selectors
const newBook = document.querySelector('.newBook');
const newBookDialog = document.querySelector('.newBookDialog');
const close = document.querySelector('.close');
const addBook = document.querySelector('#addBook');
const author = document.querySelector('#author');
const title = document.querySelector('#title');
const pages = document.querySelector('#pages');
const newBookForm = document.querySelector('#newBookForm');
const booksDatabase = document.querySelector('.booksDatabase > tbody');

// Fetch Read Status From Radio Buttons
function readStatus() {
    const read = document.querySelector('input[name="read"]:checked');
    if (read) {
        return read.value;
    } else {
        return null;
    }
}

// Show and Close Modal
newBook.addEventListener('click', () => {
    newBookDialog.showModal();
});

close.addEventListener('click', () => {
    newBookDialog.close();
});

// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Form Submit to Create New Book
newBookForm.addEventListener('submit', event => {
    event.preventDefault(); // Remove default form behaviour
    addBookToLibrary();
    booksDatabase.textContent = '';
    addToDatabase();
    newBookForm.reset();
});

// Function to Add New Books to Library
function addBookToLibrary() {
    let entry = new Book(title.value, author.value, pages.value, readStatus());
    myLibrary.push(entry);
    console.log(myLibrary);
}

// Function to Add Books from Array to Database
function addToDatabase() {
    myLibrary.forEach(book => {
        let tr = document.createElement('tr');

        for (let data in book) {
            let td = document.createElement('td');
            td.textContent = book[data];
            tr.appendChild(td);
        }

        booksDatabase.appendChild(tr);
    });
}
