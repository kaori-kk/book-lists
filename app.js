class Book {
  constructor(title, author, startDate, endDate, rating) {
    this.title = title;
    this.author = author;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rating = rating;
  }
}

class UI {
  static displayBooks(){
    const StoredBooks = [
      {
        title: "Book one",
        author: "AAAA",
        startDate: "2020-04-10",
        endDate: "2020-04-15",
        rating: "5"
      },
      {
        title: "Book two",
        author: "AAAA",
        startDate: "2020-03-25",
        endDate: "2020-03-28",
        rating: "4"
      }
    ];

    const books = StoredBooks;
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.startDate}</td>
      <td>${book.endDate}</td>
      <td>${book.rating}</td>
      <td><a href="#" class="btn btn-secondary btn-sm delete">Delete</a></td>
    `;

    list.appendChild(row);
  }
}

// DISPLAY //

document.addEventListener('DOMContentLoaded', UI.displayBooks)

// ADD //

document.querySelector("#book-form").addEventListener("submit", (e) => {

  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;
  const rating = document.querySelector("#rating").value;

  const book = new Book(title, author, startDate, endDate, rating);
  console.log(book)
  UI.addBookToList(book);
})





