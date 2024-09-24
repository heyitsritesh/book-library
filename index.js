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
const booksDatabase = document.querySelector('.booksDatabase');
const keepOpenCheckbox = document.querySelector('#keepOpen');
const blurBackground = document.querySelector('.blur-background');

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
    blurBackground.style.display = 'block';
});

close.addEventListener('click', () => {
    newBookDialog.close();
    blurBackground.style.display = 'none';
});

// Book Class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    readToggle() {
        if (this.read === 'Yes') {
            return (this.read = 'No');
        } else {
            return (this.read = 'Yes');
        }
    }
}

// Function to Rebuild Grid
function rebuild() {
    booksDatabase.textContent = '';
    addToDatabase();
}

// Form Submit to Create New Book
newBookForm.addEventListener('submit', event => {
    event.preventDefault(); // Remove default form behaviour
    addBookToLibrary();
    rebuild();
    if (!keepOpenCheckbox.checked) {
        newBookDialog.close();
        blurBackground.style.display = 'none';
    }
    const keepOpenState = keepOpenCheckbox.checked; // Store the checkbox state
    newBookForm.reset();
    keepOpenCheckbox.checked = keepOpenState; // Restore the checkbox state
});

// Function to Add New Books to Library
function addBookToLibrary() {
    let entry = new Book(title.value, author.value, pages.value, readStatus());
    myLibrary.push(entry);
}

// Function to Add Books from Array to Database
function addToDatabase() {
    myLibrary.forEach((book, index) => {
        let card = document.createElement('div');
        card.className =
            'book-card bg-white rounded-lg shadow-md p-6 flex flex-col justify-between';

        let content = document.createElement('div');
        content.innerHTML = `
            <h3 class="text-xl font-semibold mb-2">${book.title}</h3>
            <p class="text-gray-600 mb-1">Author: ${book.author}</p>
            <p class="text-gray-600 mb-1">Pages: ${book.pages}</p>
            <p class="text-gray-600 mb-4">Read: ${book.read}</p>
        `;

        let buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'flex justify-between';

        let readToggleBtn = document.createElement('button');
        readToggleBtn.textContent = 'Change Read Status';
        readToggleBtn.className =
            'btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2';

        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className =
            'btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded';

        buttonsContainer.appendChild(readToggleBtn);
        buttonsContainer.appendChild(delBtn);

        card.appendChild(content);
        card.appendChild(buttonsContainer);

        // Adding Event Listener to each Toggle Button
        readToggleBtn.addEventListener('click', () => {
            myLibrary[index].readToggle();
            rebuild();
        });

        // Adding Event Listener to each Delete Button
        delBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            rebuild();
        });

        // Appending the card to the grid
        booksDatabase.appendChild(card);
    });
}
