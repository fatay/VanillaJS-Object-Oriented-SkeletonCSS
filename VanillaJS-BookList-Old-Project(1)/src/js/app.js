// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {
    //Add Book To List
    UI.prototype.addBookToList = function (book) {
        const list = document.getElementById('bookList');
        // Creating row element
        const row = document.createElement('tr');
        // Insert columns
        // OR We Can Use Dom Creators Creating data elements
        const bookTitle = document.createElement('td');
        bookTitle.className = 'book-title';
        bookTitle.textContent = book.title;
        const bookAuthor = document.createElement('td');
        bookAuthor.className = 'book-author';
        bookAuthor.textContent = book.author;
        const bookISBN = document.createElement('td');
        bookISBN.className = 'book-isbn';
        bookISBN.textContent = book.isbn;
        const deleteTag = document.createElement('td');
        const item = document.createElement('a');
        item.className = 'delete-book';
        item.setAttribute('href', '#')
        item.textContent = 'X';
        deleteTag.appendChild(item);
        row.appendChild(bookTitle);
        row.appendChild(bookAuthor);
        row.appendChild(bookISBN);
        row.appendChild(deleteTag);
        list.appendChild(row);
    }

    UI.prototype.deleteBookFromList = function(target) {
        if (target.className === 'delete-book') {
            target.parentElement.parentElement.remove();
        }
    }

    // Clear Fields
    UI.prototype.clearFields = function () {
        document.querySelector('#bookTitle').value = "";
        document.querySelector('#bookAuthor').value = "";
        document.querySelector('#bookISBN').value = "";
    }
}

// Event Listener For Adding a New Book
document.getElementById('bookForm').addEventListener('submit', function (e) {
    console.log('test');
    const title = document.querySelector('#bookTitle').value,
          author = document.querySelector('#bookAuthor').value,
          isbn = document.querySelector('#bookISBN').value;

    // Validation
    if (title === "" || author === "" || isbn === "") {
        const error = document.getElementById('error');
        error.className = 'error';
        error.textContent = 'Error! Please check your entries.';
        error.style.visibility = "visible";
        setTimeout(function(){
            error.style.visibility = "hidden";
        }, 4000);
    } else {
        // Instantiate Book
        const book = new Book(title, author, isbn);
        // Instantiate UI
        const ui = new UI();

        // Adding a book and clearing inputs
        ui.addBookToList(book);
        ui.clearFields();

        // Success !
        const error = document.getElementById('error');
        error.className = 'success';
        error.textContent = 'Success! Book is added to list.';
        error.style.visibility = "visible";
        setTimeout(function(){
            error.style.visibility = "hidden";
        }, 4000);
    }

    e.preventDefault();
});

// Event Delegation for Deleting Book --> choose parent
document.getElementById('bookList').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteBookFromList(e.target);

    e.preventDefault();
});