// ES 6+ Version (Cleaner Code)
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('bookList');
        // Creating row element
        const row = document.createElement('tr');
        // Insert columns
        row.innerHTML = `
            <td class = "book-title"> ${book.title} </td>
            <td class = "book-author"> ${book.author} </td>
            <td class = "book-isbn"> ${book.isbn} </td>
            <td><a class = "delete-book" href="#" > X </a></td>       
        `;
        list.appendChild(row);
    }

    deleteBookFromList(target) {
        if (target.className === 'delete-book') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.querySelector('#bookTitle').value = "";
        document.querySelector('#bookAuthor').value = "";
        document.querySelector('#bookISBN').value = "";
    }

    showMessage(type,text) {
        const message = document.getElementById('message');
        message.className = type;
        message.textContent = text;
        message.style.visibility = "visible";
        setTimeout(function(){
            message.style.visibility = "hidden";
        }, 4000);
    }

}

// Event Listener For Adding a New Book
document.getElementById('bookForm').addEventListener('submit', function (e) {
    const title = document.querySelector('#bookTitle').value,
          author = document.querySelector('#bookAuthor').value,
          isbn = document.querySelector('#bookISBN').value;

    // Validation
    const ui = new UI();
    if (title === "" || author === "" || isbn === "") {
        ui.showMessage('error', 'Error! Please check your entries.');
    } else {
        // Instantiate Book
        const book = new Book(title, author, isbn);
        // Adding a book and clearing inputs
        ui.addBookToList(book);
        ui.clearFields();
        // Success message !
        ui.showMessage('success', 'Success! Book is added to list.');
    }

    e.preventDefault();
});

// Event Delegation for Deleting Book --> choose parent
document.getElementById('bookList').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteBookFromList(e.target);

    e.preventDefault();
});