const myLibrary = [];

// #region Add Default Books
addBookToLibrary(
    'The Hunger Games',
    'Suzanne Collins',
    374,
    true,
    './img/theHungerGames.png'
);
addBookToLibrary(
    'Catching Fire',
    'Suzanne Collins',
    391,
    true,
    './img/catchingFire.png'
);
addBookToLibrary(
    'The Mockingjay',
    'Suzanne Collins',
    390,
    false,
    './img/theMockingjay.png'
);

addBookToLibrary('Title 1', 'Author 1', 500, true, './img/theHungerGames.png');
addBookToLibrary('Title 2', 'Author 2', 500, false, './img/theHungerGames.png');
addBookToLibrary('Title 3', 'Author 3', 500, false, './img/theHungerGames.png');
addBookToLibrary('Title 4', 'Author 4', 500, false, './img/theHungerGames.png');
addBookToLibrary('Title 5', 'Author 5', 500, true, './img/theHungerGames.png');
//#endregion

initializeLibrary();

function Book(title, author, pages, read, coverURL) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.coverURL = coverURL;
}

function addBookToLibrary(title, author, pages, read, coverURL) {
    let book = new Book(title, author, pages, read, coverURL);
    myLibrary.push(book);
    addBookToUI(book);
}

function initializeLibrary() {
    const libraryDiv = document.getElementById('library-container');
    libraryDiv.innerHTML = '';
    displayAddBookButton();
    myLibrary.forEach((book) => {
        addBookToUI(book);
    });
}

function displayAddBookButton() {
    const libraryDiv = document.getElementById('library-container');
    const bookButton = document.createElement('button');
    bookButton.id = 'add-button';

    const bookInfo = document.createElement('div');
    bookInfo.id = 'book-info';

    const bookCover = document.createElement('img');
    bookCover.id = 'book-cover';
    bookCover.alt = 'Add a new book...';
    bookCover.src = './img/plus.png';
    bookCover.style.height = '100px';
    bookCover.style.width = '100px';

    bookInfo.innerText = 'Add a new book...';

    bookButton.appendChild(bookCover);
    bookButton.appendChild(bookInfo);
    libraryDiv.appendChild(bookButton);
}

function addBookToUI(book) {
    const libraryDiv = document.getElementById('library-container');

    const bookDiv = document.createElement('div');
    bookDiv.id = 'book-container';

    // #region Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-button';
    const trashBinIcon = document.createElement('img');
    trashBinIcon.src = './img/trash.png';
    trashBinIcon.alt = 'Delete';
    trashBinIcon.style.height = '32px';
    trashBinIcon.style.width = '32px';
    deleteButton.appendChild(trashBinIcon);

    deleteButton.addEventListener('click', function () {
        const bookIndex = myLibrary.indexOf(book);
        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
        }
        libraryDiv.removeChild(bookDiv);
    });
    // #endregion

    const bookCover = document.createElement('img');
    bookCover.id = 'book-cover';
    bookCover.alt = book.title;
    bookCover.src = book.coverURL;
    bookCover.style.height = '200px';
    bookCover.style.width = '125px';

    const bookInfo = document.createElement('div');
    bookInfo.id = 'book-info';
    bookInfo.innerText =
        book.title +
        '\n' +
        book.author +
        '\n' +
        book.pages +
        ' pages' +
        '\n' +
        (book.read ? 'Read' : 'Not Read');

    // #region Toggle Read
    const toggleReadButton = document.createElement('button');
    toggleReadButton.id = 'toggle-read-button';
    toggleReadButton.className = 'add';
    toggleReadButton.innerText = 'Toggle Book as Read';

    toggleReadButton.addEventListener('click', function () {
        book.read = !book.read;
        updateBookInfo();
    });
    // #endregion

    bookDiv.appendChild(deleteButton);
    bookDiv.appendChild(bookCover);
    bookDiv.appendChild(bookInfo);
    bookDiv.appendChild(toggleReadButton);
    libraryDiv.appendChild(bookDiv);
}

function updateBookInfo() {
    const bookContainers = document.querySelectorAll('#book-container');
    myLibrary.forEach((book, index) => {
        const bookInfo = bookContainers[index].querySelector('#book-info');
        bookInfo.innerText =
            book.title +
            '\n' +
            book.author +
            '\n' +
            book.pages +
            ' pages' +
            '\n' +
            (book.read ? 'Read' : 'Not Read');
    });
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

document.addEventListener('DOMContentLoaded', function () {
    // #region Form Submission
    const newBookForm = document.getElementById('new-book-form');
    newBookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').value === 'true';
        const coverFile = document.getElementById('cover').files[0];

        if (title && author && pages && coverFile) {
            const reader = new FileReader();
            console.log(read);
            reader.onload = function (e) {
                const coverDataURL = e.target.result;
                addBookToLibrary(title, author, pages, read, coverDataURL);
                console.log(myLibrary);
                modal.style.display = 'none';
                newBookForm.reset();
            };

            reader.readAsDataURL(coverFile);
        } else {
            alert('Please fill out all fields and choose a cover image.');
        }
    });
    // #endregion

    // #region Toggle Read
    const toggleReadButtons = document.querySelectorAll('.toggle-read-button');
    toggleReadButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            myLibrary[index].read = !myLibrary[index].read;
            const buttonText = myLibrary[index].read ? 'Read' : 'Not Read';
            button.textContent = `Have you read this title? (${buttonText})`;
        });
    });
    // #endregion
});
