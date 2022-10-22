const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Last
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// 5 Add Transactions
function addTransaction(e) {
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert("Please add amount and text");
    }
    else {
        const transaction = {
            id:generateID(),
            text:text.value,
            amount:+amount.value
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value='';
        amount.value='';
    }
}

// 5 Generate Random ID
function generateID() {
    return Math.floor(Math.random()*100000000);
} 

// 2. Add Transactions to DOM list
function addTransactionDOM(transaction) {
    // Get Sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    // Add class based on value
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
            transaction.amount
        )}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}


// 4 Update balance income and expense
function updateValues() {
    const amounts = transactions.map(
      (transaction) => transaction.amount
    );
    const total = amounts
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const expense =
      (amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) *
      -1).toFixed(2);
  
      balance.innerText=`$${total}`;
      money_plus.innerText = `$${income}`;
      money_minus.innerText = `$${expense}`;
  }


// 6 Remove Transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}

// Last : Update the Local Storage Transaction
function updateLocalStorage() {
    localStorage.setItem('transactions' , JSON.stringify(transactions));
}


// 3 Init App
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();

form.addEventListener('submit',addTransaction);