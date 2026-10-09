<<<<<<< HEAD
// ==========================================
// ELEMENTS
// ==========================================

const dashboardPage =
    document.querySelector("#dashboardPage");

const transactionsPage =
    document.querySelector("#transactionsPage");

const dashboardBtn =
    document.querySelector("#dashboardBtn");

const transactionsBtn =
    document.querySelector("#transactionsBtn");

const goToAddBtn =
    document.querySelector("#goToAddBtn");

const viewAllBtn =
    document.querySelector("#viewAllBtn");


// FORM

const form =
    document.querySelector("#addTransactionForm");

const transactionType =
    document.querySelector("#tran-type");

const amountInput =
    document.querySelector("#amount-input");

const categoryInput =
    document.querySelector("#categories");

const descriptionInput =
    document.querySelector("#description");

const dateInput =
    document.querySelector("#date");

const submitButton =
    document.querySelector("#addTransactionBtn");

const cancelEditButton =
    document.querySelector("#cancelEditBtn");

const formTitle =
    document.querySelector("#formTitle");


// TRANSACTIONS

const transactionList =
    document.querySelector("#transactionList");

const emptyMessage =
    document.querySelector("#emptyMessage");

const transactionCount =
    document.querySelector("#transactionCount");


// SEARCH / FILTER / SORT

const searchInput =
    document.querySelector("#searchInput");

const typeFilter =
    document.querySelector("#typeFilter");

const categoryFilter =
    document.querySelector("#categoryFilter");

const sortSelect =
    document.querySelector("#sortSelect");


// DASHBOARD

const balanceElement =
    document.querySelector("#balance");

const incomeElement =
    document.querySelector("#income");

const expensesElement =
    document.querySelector("#expenses");

const averageElement =
    document.querySelector("#average");

const recentTransactions =
    document.querySelector("#recentTransactions");


// ==========================================
// VARIABLES
// ==========================================

let editId = null;


// ==========================================
// LOCAL STORAGE
// ==========================================

if (localStorage.getItem("transactions") === null) {

    localStorage.setItem(
        "transactions",
        JSON.stringify([])
    );

}


// ==========================================
// GET DATA
// ==========================================

function getTransactions() {

    return JSON.parse(
        localStorage.getItem("transactions")
    );

}


// ==========================================
// SAVE DATA
// ==========================================

function saveTransactions(transactions) {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// ==========================================
// PAGE NAVIGATION
// ==========================================

function showDashboard() {

    dashboardPage.classList.remove("hidden");

    transactionsPage.classList.add("hidden");

    updateDashboard();

}


function showTransactionsPage() {

    dashboardPage.classList.add("hidden");

    transactionsPage.classList.remove("hidden");

    showTransactions();

}


// DASHBOARD BUTTON

dashboardBtn.addEventListener("click", function() {

    showDashboard();

});


// TRANSACTIONS BUTTON

transactionsBtn.addEventListener("click", function() {

    showTransactionsPage();

});


// ADD TRANSACTION BUTTON

goToAddBtn.addEventListener("click", function() {

    showTransactionsPage();

    form.scrollIntoView({
        behavior: "smooth"
    });

});


// VIEW ALL BUTTON

viewAllBtn.addEventListener("click", function() {

    showTransactionsPage();

});


// ==========================================
// CREATE TRANSACTION
// ==========================================

function createTransactionObj() {

    const transaction = {

        transType: transactionType.value,

        transAmount: Number(amountInput.value),

        transCategory: categoryInput.value,

        transDesc: descriptionInput.value,

        transDate: dateInput.value,

        transId: crypto.randomUUID()

    };

    return transaction;

}


// ==========================================
// ADD TRANSACTION
// ==========================================

function addTransaction() {

    const transactions =
        getTransactions();

    const newTransaction =
        createTransactionObj();

    transactions.push(newTransaction);

    saveTransactions(transactions);

    resetForm();

    showTransactions();

    updateDashboard();

}


// ==========================================
// DELETE
// ==========================================

function deleteTransaction(id) {

    let transactions =
        getTransactions();

    transactions = transactions.filter(
        function(transaction) {

            return transaction.transId !== id;

        }
    );

    saveTransactions(transactions);

    showTransactions();

    updateDashboard();

}


// ==========================================
// START EDIT
// ==========================================

function startEditTransaction(id) {

    const transactions =
        getTransactions();

    const transaction =
        transactions.find(
            function(transaction) {

                return transaction.transId === id;

            }
        );


    if (transaction === undefined) {

        return;

    }


    editId = id;


    transactionType.value =
        transaction.transType;

    amountInput.value =
        transaction.transAmount;

    categoryInput.value =
        transaction.transCategory;

    descriptionInput.value =
        transaction.transDesc;

    dateInput.value =
        transaction.transDate;


    formTitle.textContent =
        "Edit Transaction";

    submitButton.textContent =
        "Update Transaction";

    cancelEditButton.classList.remove(
        "hidden"
    );


    form.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// UPDATE
// ==========================================

function updateTransaction() {

    const transactions =
        getTransactions();


    for (let i = 0; i < transactions.length; i++) {

        if (transactions[i].transId === editId) {

            transactions[i].transType =
                transactionType.value;

            transactions[i].transAmount =
                Number(amountInput.value);

            transactions[i].transCategory =
                categoryInput.value;

            transactions[i].transDesc =
                descriptionInput.value;

            transactions[i].transDate =
                dateInput.value;

            break;

        }

    }


    saveTransactions(transactions);


    resetForm();

    showTransactions();

    updateDashboard();

}


// ==========================================
// RESET FORM
// ==========================================

function resetForm() {

    form.reset();

    editId = null;


    formTitle.textContent =
        "Add Transaction";

    submitButton.textContent =
        "Add Transaction";


    cancelEditButton.classList.add(
        "hidden"
    );

}


// ==========================================
// FORM SUBMIT
// ==========================================

form.addEventListener("submit", function(e) {

    e.preventDefault();


    if (editId === null) {

        addTransaction();

    } else {

        updateTransaction();

    }

});


// ==========================================
// CANCEL EDIT
// ==========================================

cancelEditButton.addEventListener(
    "click",
    function() {

        resetForm();

    }
);


// ==========================================
// FILTER + SEARCH + SORT
// ==========================================

function getFilteredTransactions() {

    let transactions =
        getTransactions();


    // SEARCH

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    if (searchValue !== "") {

        transactions =
            transactions.filter(
                function(transaction) {

                    return (

                        transaction.transDesc
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        transaction.transCategory
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        transaction.transType
                            .toLowerCase()
                            .includes(searchValue)

                    );

                }
            );

    }


    // TYPE FILTER

    if (typeFilter.value !== "all") {

        transactions =
            transactions.filter(
                function(transaction) {

                    return (
                        transaction.transType ===
                        typeFilter.value
                    );

                }
            );

    }


    // CATEGORY FILTER

    if (categoryFilter.value !== "all") {

        transactions =
            transactions.filter(
                function(transaction) {

                    return (
                        transaction.transCategory ===
                        categoryFilter.value
                    );

                }
            );

    }


    // SORT

    if (sortSelect.value === "newest") {

        transactions.sort(
            function(a, b) {

                return new Date(b.transDate) -
                    new Date(a.transDate);

            }
        );

    }


    if (sortSelect.value === "oldest") {

        transactions.sort(
            function(a, b) {

                return new Date(a.transDate) -
                    new Date(b.transDate);

            }
        );

    }


    if (sortSelect.value === "highest") {

        transactions.sort(
            function(a, b) {

                return b.transAmount -
                    a.transAmount;

            }
        );

    }


    if (sortSelect.value === "lowest") {

        transactions.sort(
            function(a, b) {

                return a.transAmount -
                    b.transAmount;

            }
        );

    }


    return transactions;

}


// ==========================================
// SHOW TRANSACTIONS
// ==========================================

function showTransactions() {

    const transactions =
        getFilteredTransactions();


    transactionList.innerHTML = "";


    transactionCount.textContent =
        `${transactions.length} transaction${
            transactions.length !== 1
                ? "s"
                : ""
        }`;


    if (transactions.length === 0) {

        emptyMessage.classList.remove(
            "hidden"
        );

        return;

    }


    emptyMessage.classList.add(
        "hidden"
    );


    for (let i = 0; i < transactions.length; i++) {

        const transaction =
            transactions[i];


        const container =
            document.createElement("div");

        container.classList.add(
            "transaction-container"
        );


        container.dataset.id =
            transaction.transId;


        const typeElement =
            document.createElement("p");

        typeElement.innerHTML =
            `<strong>Type:</strong>
            ${transaction.transType}`;


        const amountElement =
            document.createElement("p");

        amountElement.innerHTML =
            `<strong>Amount:</strong>
            ${transaction.transAmount} DH`;


        const categoryElement =
            document.createElement("p");

        categoryElement.innerHTML =
            `<strong>Category:</strong>
            ${transaction.transCategory}`;


        const descriptionElement =
            document.createElement("p");

        descriptionElement.innerHTML =
            `<strong>Description:</strong>
            ${transaction.transDesc}`;


        const dateElement =
            document.createElement("p");

        dateElement.innerHTML =
            `<strong>Date:</strong>
            ${transaction.transDate}`;


        const buttons =
            document.createElement("div");

        buttons.classList.add(
            "transaction-buttons"
        );


        const editButton =
            document.createElement("button");

        editButton.textContent =
            "Edit";

        editButton.classList.add(
            "Edit"
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "Delete";

        deleteButton.classList.add(
            "Delete"
        );


        buttons.appendChild(editButton);

        buttons.appendChild(deleteButton);


        container.appendChild(typeElement);

        container.appendChild(amountElement);

        container.appendChild(categoryElement);

        container.appendChild(descriptionElement);

        container.appendChild(dateElement);

        container.appendChild(buttons);


        transactionList.appendChild(
            container
        );

    }

}


// ==========================================
// EDIT / DELETE EVENTS
// ==========================================

transactionList.addEventListener(
    "click",
    function(e) {

        const container =
            e.target.closest(
                ".transaction-container"
            );


        if (!container) {

            return;

        }


        const id =
            container.dataset.id;


        if (
            e.target.classList.contains("Edit")
        ) {

            startEditTransaction(id);

        }


        if (
            e.target.classList.contains("Delete")
        ) {

            deleteTransaction(id);

        }

    }
);


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    function() {

        showTransactions();

    }
);


// ==========================================
// FILTERS
// ==========================================

typeFilter.addEventListener(
    "change",
    function() {

        showTransactions();

    }
);


categoryFilter.addEventListener(
    "change",
    function() {

        showTransactions();

    }
);


// ==========================================
// SORT
// ==========================================

sortSelect.addEventListener(
    "change",
    function() {

        showTransactions();

    }
);


// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {

    const transactions =
        getTransactions();


    let totalIncome = 0;

    let totalExpenses = 0;


    for (let i = 0; i < transactions.length; i++) {

        if (
            transactions[i].transType ===
            "income"
        ) {

            totalIncome +=
                Number(
                    transactions[i].transAmount
                );

        }


        if (
            transactions[i].transType ===
            "expense"
        ) {

            totalExpenses +=
                Number(
                    transactions[i].transAmount
                );

        }

    }


    const balance =
        totalIncome - totalExpenses;


    let average = 0;


    if (transactions.length > 0) {

        let total = 0;


        for (
            let i = 0;
            i < transactions.length;
            i++
        ) {

            total +=
                Number(
                    transactions[i].transAmount
                );

        }


        average =
            total / transactions.length;

    }


    balanceElement.textContent =
        `${balance.toFixed(2)} DH`;

    incomeElement.textContent =
        `${totalIncome.toFixed(2)} DH`;

    expensesElement.textContent =
        `${totalExpenses.toFixed(2)} DH`;

    averageElement.textContent =
        `${average.toFixed(2)} DH`;


    showRecentTransactions();

}


// ==========================================
// RECENT TRANSACTIONS
// ==========================================

function showRecentTransactions() {

    let transactions =
        getTransactions();


    transactions.sort(
        function(a, b) {

            return new Date(b.transDate) -
                new Date(a.transDate);

        }
    );


    transactions =
        transactions.slice(0, 5);


    recentTransactions.innerHTML = "";


    if (transactions.length === 0) {

        recentTransactions.innerHTML =
            `<p class="empty-message">
                No transactions yet.
            </p>`;

        return;

    }


    for (let i = 0; i < transactions.length; i++) {

        const transaction =
            transactions[i];


        const container =
            document.createElement("div");

        container.classList.add(
            "recent-transaction"
        );


        const info =
            document.createElement("div");


        const description =
            document.createElement("h3");

        description.textContent =
            transaction.transDesc;


        const category =
            document.createElement("p");

        category.textContent =
            `${transaction.transCategory}
             •
             ${transaction.transDate}`;


        const amount =
            document.createElement("strong");


        if (
            transaction.transType ===
            "income"
        ) {

            amount.textContent =
                `+${transaction.transAmount} DH`;

        } else {

            amount.textContent =
                `-${transaction.transAmount} DH`;

        }


        info.appendChild(description);

        info.appendChild(category);


        container.appendChild(info);

        container.appendChild(amount);


        recentTransactions.appendChild(
            container
        );

    }

}


// ==========================================
// START APP
// ==========================================

showDashboard();

showTransactions();
=======
let createNoteZone = document.querySelector("#createNote");
let newNoteTitle = document.querySelector("#newNoteTitle");
let newNoteContent = document.querySelector("#newNoteContent");
let addNoteButton = document.querySelector("#done");
let cancelNoteButton = document.querySelector("#cancel");
let letters = document.querySelector("#letters");
let words = document.querySelector("#words");
let existedNotes = document.querySelector("#existedNotes");

// to stop sendind data while clicking the buttons
function preventDefault(e) {
    e.preventDefault();
}
addNoteButton.addEventListener("click", preventDefault);
cancelNoteButton.addEventListener("click", preventDefault);

//this fct add the title id and the content in one object then push it to notes array in locale storage
function createNoteObject() {
    let myObj = {
        title: newNoteTitle.value,
        id: Date.now(),
        content: newNoteContent.value,
    };
    return myObj;
}

//create notes local storage if doesnt exist yet
if (localStorage.getItem("notes") === null) {
    localStorage.setItem("notes", "[]");
}
showNotes();
// adding the object to the local storage
function addNoteObjectToLocalStorage(note) {
    let notesAsArray = JSON.parse(localStorage.getItem("notes"));
    notesAsArray.push(note);
    localStorage.setItem("notes", JSON.stringify(notesAsArray));
}

// add note function

function addNote() {
    if (newNoteTitle.value.trim() === "") {
        alert("Title required!");
        return;
    }
    if (editingNoteId === null) {
        const note = createNoteObject();
        addNoteObjectToLocalStorage(note);
        showNotes();
        cancelNote();
    } else {
        noteEdit();
    }
}
function noteEdit() {
    let notes = JSON.parse(localStorage.getItem("notes"));
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == editingNoteId) {
            notes[i].title = newNoteTitle.value;
            notes[i].content = newNoteContent.value;
        }
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    cancelNote();
    editingNoteId = null;
}

// adding the note after clicking the done button
addNoteButton.addEventListener("click", function () {
    addNote();
});
//cancel the note
function cancelNote() {
    newNoteTitle.value = "";
    newNoteContent.value = "";
    editingNoteId = null;
}
cancelNoteButton.addEventListener("click", cancelNote);
// show all notes in the page
function showNotes() {
    existedNotes.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes"));
    for (let i = 0; i < notes.length; i++) {
        let note = document.createElement("div");
        let title = document.createElement("h3");
        title.classList.add("title");
        let titleText = document.createTextNode(notes[i].title);
        title.appendChild(titleText);
        let content = document.createElement("p");
        content.classList.add("content");
        let contentText = document.createTextNode(notes[i].content);
        content.appendChild(contentText);
        let words = document.createElement("span");
        words.classList.add("words");
        let wordsText = document.createTextNode(
            `Words : ${notes[i].content.split(" ").length}`,
        );
        words.appendChild(wordsText);
        let buttonsBox = document.createElement("div");
        let edit = document.createElement("button");
        let editText = document.createTextNode("Edit");
        let remove = document.createElement("button");
        let removeText = document.createTextNode("remove");
        let id = document.createElement("p");
        let idValue = document.createTextNode(notes[i].id);
        buttonsBox.classList.add("buttonsBox");
        edit.classList.add("edit");
        remove.classList.add("remove");
        id.classList.add("id");
        edit.appendChild(editText);
        remove.appendChild(removeText);
        id.appendChild(idValue);
        buttonsBox.appendChild(edit);
        buttonsBox.appendChild(remove);
        note.appendChild(title);
        note.appendChild(content);
        note.appendChild(words);
        note.appendChild(id);
        note.appendChild(buttonsBox);
        existedNotes.appendChild(note);
    }
}

existedNotes.addEventListener("click", function removeNote(event) {
    if (event.target.classList.contains("remove")) {
        let notes = JSON.parse(localStorage.getItem("notes"));
        let comparedId =
            event.target.parentElement.parentElement.querySelector(
                "p.id",
            ).textContent;
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == comparedId) {
                notes.splice(notes.indexOf(notes[i]), 1);
            }
        }

        localStorage.setItem("notes", JSON.stringify(notes));
    }
    showNotes();
});

let editingNoteId = null;
//ediit function
existedNotes.addEventListener("click", function editNote(event) {
    if (event.target.classList.contains("edit")) {
        editingNoteId =
            event.target.parentElement.parentElement.querySelector(
                "p.id",
            ).textContent; //id dyal task li an editiiw
        newNoteTitle.value =
            event.target.parentElement.parentElement.querySelector(
                "h3.title",
            ).textContent;
        newNoteContent.value =
            event.target.parentElement.parentElement.querySelector(
                "p.content",
            ).textContent;
    }
});
>>>>>>> 5c489352730e08058a69d58682cf458c5f157416
