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

// Read Toggle Prototype
Book.prototype.readToggle = function () {
    if (this.read === 'Yes') {
        return (this.read = 'No');
    } else {
        return (this.read = 'Yes');
    }
};

// Function to Add Books from Array to Database
function addToDatabase() {
    myLibrary.forEach((book, index) => {
        // Table row starts
        let tr = document.createElement('tr');

        // Adding each object's value to a <td>
        for (let data in book) {
            if (book.hasOwnProperty(data)) {
                let td = document.createElement('td');
                td.textContent = book[data];
                tr.appendChild(td);
            }
        }

        // Adding a <td> for readToggleBtn
        let readBtn = document.createElement('td');
        let readToggleBtn = document.createElement('button');
        readToggleBtn.textContent = 'Change Read Status';
        readBtn.appendChild(readToggleBtn);
        tr.appendChild(readBtn);

        // Adding Event Listener to each Toggle Button
        readToggleBtn.addEventListener('click', () => {
            myLibrary[index].readToggle();
            booksDatabase.textContent = '';
            addToDatabase();
        });

        // Appending all the elements to the table row
        booksDatabase.appendChild(tr);
    });
}
