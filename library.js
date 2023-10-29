const myLibrary = [];

// #region Add Default Books
addBookToLibrary('Add a new book...', null, null, './img/plus.png'); //Add Book Button

addBookToLibrary(
    'The Hunger Games',
    'Suzanne Collins',
    374,
    './img/theHungerGames.png'
);
addBookToLibrary(
    'Catching Fire',
    'Suzanne Collins',
    391,
    './img/catchingFire.png'
);
addBookToLibrary(
    'The Mockingjay',
    'Suzanne Collins',
    390,
    './img/theMockingjay.png'
);

addBookToLibrary('Title 1', 'Author 1', 500, './img/theHungerGames.png');
addBookToLibrary('Title 2', 'Author 2', 500, './img/theHungerGames.png');
addBookToLibrary('Title 3', 'Author 3', 500, './img/theHungerGames.png');
addBookToLibrary('Title 4', 'Author 4', 500, './img/theHungerGames.png');
addBookToLibrary('Title 5', 'Author 5', 500, './img/theHungerGames.png');
addBookToLibrary('Title 6', 'Author 6', 500, './img/theHungerGames.png');
addBookToLibrary('Title 7', 'Author 7', 500, './img/theHungerGames.png');
addBookToLibrary('Title 8', 'Author 8', 500, './img/theHungerGames.png');
addBookToLibrary('Title 9', 'Author 9', 500, './img/theHungerGames.png');
//#endregion

displayBooks();

function Book(title, author, pages, coverURL) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.coverURL = coverURL;
}

function addBookToLibrary(title, author, pages, coverURL) {
    let book = new Book(title, author, pages, coverURL);
    myLibrary.push(book);
}

// #region Modal Handling
let btn = document.getElementById('add-button');
let modal = document.getElementById('add-book-modal');
let span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
    modal.style.display = 'block';
};

span.onclick = function () {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
// #endregion

function displayBooks() {
    const libraryDiv = document.getElementById('library-container');
    myLibrary.forEach((book) => {
        // #region Setting Constants
        const bookButton = document.createElement('button');
        bookButton.id = 'add-button';

        const bookDiv = document.createElement('div');
        bookDiv.id = 'book-container';

        const bookInfo = document.createElement('div');
        bookInfo.id = 'book-info';

        const bookCover = document.createElement('img');
        bookInfo.id = 'book-cover';
        bookCover.alt = book.title;
        bookCover.src = book.coverURL;
        // #endregion

        // #region Conditional Changes
        if (book.title === 'Add a new book...') {
            bookInfo.innerText = 'Add a new book...';
            bookCover.style.height = '100px';
            bookCover.style.width = '100px';

            bookButton.appendChild(bookCover);
            bookButton.appendChild(bookInfo);
            libraryDiv.appendChild(bookButton);
        } else {
            bookInfo.innerText =
                book.title + '\n' + book.author + '\n' + book.pages + ' pages';
            bookCover.style.height = '200px';
            bookCover.style.width = '125px';

            bookDiv.appendChild(bookCover);
            bookDiv.appendChild(bookInfo);
            libraryDiv.appendChild(bookDiv);
        }
        // #endregion
    });
}
