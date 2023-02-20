import Book from './Book.js';

const addBtn = document.getElementsByClassName('addBtn')[0];
const bookLibrary = document.getElementsByClassName('library')[0];

class BookArray {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('library')) || [];
  }

  addBooks(author, title) {
    if (author !== '' && title !== '') {
      const book = new Book(author, title);
      this.books.push(book);
      localStorage.setItem('library', JSON.stringify(this.books));
    }
  }

  remove(field) {
    this.books.splice(field, 1);
    localStorage.setItem('library', JSON.stringify(this.books));
  }
}

const library = new BookArray();

function display() {
  if (localStorage.getItem('library') == null) {
    library.books = [];
  } else {
    library.books = JSON.parse(localStorage.getItem('library'));
  }
  let bookDisplay = '';
  library.books.forEach((element, i) => {
    bookDisplay += `
    <div class="book flex" id= "${i}">
    <p>"${element.title}" by ${element.author}</p>
    <button class="removeBtn" id="${i}">Remove</button>
    </div>
    `;
  });
  bookLibrary.innerHTML = bookDisplay;
}

addBtn.addEventListener('click', () => {
  const author = document.getElementById('author').value.trim();
  const title = document.getElementById('title').value.trim();
  library.addBooks(author, title);
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  display();
});

function removeBtn(bookID) {
  library.remove(bookID);
  display();
}

const lib = document.querySelector('.library');
lib.addEventListener('click', (e) => {
  if (e.target.classList.contains('removeBtn')) {
    const bookID = e.target.id;
    removeBtn(bookID);
  }
});

const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetID = link.getAttribute('href');
    const targetSection = document.querySelector(targetID);
    if (targetSection) {
      sections.forEach((section) => {
        section.style.display = 'none';
      });
      targetSection.style.display = 'flex';
      links.forEach((event) => {
        event.classList.remove('active');
      });
      link.classList.add('active');
    }
  });
});

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

const currentDate = new Date();
const month = currentDate.toLocaleString('default', { month: 'long' });
const day = currentDate.getDate();
const daySuff = getDaySuffix(day);
const year = currentDate.getFullYear();
const time = currentDate.toLocaleString('en-US', {
  hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,
});

const formattedDate = `${month} ${day}${daySuff}, ${year}, ${time}`;

document.getElementById('date').textContent = formattedDate;

window.addEventListener('DOMContentLoaded', () => {
  display();
});
