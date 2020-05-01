// CLASS BOOK //

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

    const books = Store.getBooks();
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

// CLASS STORE //
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    }else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBooks(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBooks(title){
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1)
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
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
    Store.addBooks(book);
    UI.showAlert("Book is added successflly", "info")
    UI.clearInput();
  }
})

// DELETE BOOKS //

document.querySelector('#book-list').addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  const title = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
  Store.removeBooks(title)
  UI.showAlert(`${title} is deleted`, "info")
})


