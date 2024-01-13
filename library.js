class Book {
    constructor(title, author, pages, read, coverURL) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.coverURL = coverURL;
    }
}

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

addBookToLibrary(
    'Animal Farm',
    'George Orwell',
    128,
    true,
    './img/animalFarm.png'
);
addBookToLibrary(
    'The Hatchet',
    'Gary Paulson',
    195,
    false,
    './img/theHatchet.png'
);
addBookToLibrary('Life of Pi', 'Yann Martel', 368, false, './img/lifeOfPi.png');
addBookToLibrary(
    'Romeo and Juliet',
    'Author 4',
    309,
    false,
    './img/romeoAndJuliet.png'
);
addBookToLibrary(
    "Harry Potter And The Sorcerer's Stone",
    'J.K. Rowling',
    309,
    true,
    './img/harryPotterAndTheSorcerersStone.jpg'
);
addBookToLibrary(
    'Harry Potter And The Chamber of Secrets',
    'J.K. Rowling',
    341,
    true,
    './img/harryPotterAndTheChamberOfSecrets.jpg'
);
addBookToLibrary(
    'Harry Potter And The Prisoner of Azkaban',
    'J.K. Rowling',
    435,
    true,
    './img/harryPotterAndThePrisonerOfAzkaban.jpg'
);
addBookToLibrary(
    'Harry Potter And The Goblet of Fire',
    'J.K. Rowling',
    734,
    true,
    './img/harryPotterAndTheGobletOfFire.jpg'
);
addBookToLibrary(
    'Harry Potter And The Order of The Phoenix',
    'J.K. Rowling',
    870,
    false,
    './img/harryPotterAndTheOrderOfThePhoenix.jpg'
);
addBookToLibrary(
    'Harry Potter And The Hald-Blood Prince',
    'J.K. Rowling',
    652,
    false,
    './img/harryPotterAndTheHalfBloodPrince.jpg'
);
addBookToLibrary(
    'Harry Potter And The Deathly Hallows',
    'J.K. Rowling',
    759,
    false,
    './img/harryPotterAndTheDeathlyHallows.jpg'
);
//#endregion

initializeLibrary();

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
    bookInfo.innerHTML = `${book.title}<br>${book.author}<br>${
        book.pages
    } pages<br>${
        book.read
            ? '<span class="bold green">Read</span>'
            : '<span class="bold red">Not Read</span>'
    }`;

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
        bookInfo.innerHTML = `${book.title}<br>${book.author}<br>${
            book.pages
        } pages<br>${
            book.read
                ? '<span class="bold green">Read</span>'
                : '<span class="bold red">Not Read</span>'
        }`;
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
