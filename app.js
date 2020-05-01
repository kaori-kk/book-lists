class Book {
  constructor(title, author, startDate, endDate, rating) {
    this.title = title;
    this.author = author;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rating = rating;
  }
}

// CLASS UI //

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

  static clearInput(){
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#startDate").value = "";
    document.querySelector("#endDate").value = "";
    document.querySelector("#rating").value = "";
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".book-container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form)

    setTimeout(() => document.querySelector(".alert").remove(), 4000)
  }

  static deleteBook(target){
    if(target.classList.contains("delete")){
      target.parentElement.parentElement.remove();
    }
  }

}

// DISPLAY BOOKS //

document.addEventListener('DOMContentLoaded', UI.displayBooks)

// ADD BOOKS //

document.querySelector("#book-form").addEventListener("submit", (e) => {

  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;
  const rating = document.querySelector("#rating").value;

  // VALIDATION //

  if( title === "" || author === "" || startDate === "" || endDate === "" || rating === "") {
    UI.showAlert("Please fill in all fields", "primary")
  }else {
    const book = new Book(title, author, startDate, endDate, rating);

    UI.addBookToList(book);
    UI.showAlert("Book is added successflly", "info")
    UI.clearInput();
  }
})

// DELETE BOOKS //

document.querySelector('#book-list').addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  UI.showAlert("Book is deleted", "info")
})


