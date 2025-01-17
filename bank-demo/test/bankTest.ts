import { Bank } from '../src/bank';

const accounts = [{ id: 1234567890, balance: 5000 },
{ id: 1234567891, balance: 10000 }];

const usernames = ['user1', 'user2'];

const bank = new Bank(accounts, usernames);

/** CREATING NEW BANK ACCOUNT */
console.log('--Tests for creating a new bank account--');
// Scenario 1: successful account created
const acc = bank.createAccount('user1', 20, 1234567892);
if (acc.id !== 1234567892
    || acc.balance !== 0
    || acc.id.toString().length !== 10) {
    console.log('Scenario 1 failed');
}
else {
    console.log('Scenario 1 passed');
}

try {
    bank.createAccount('user1', 20, 1234567892);
    console.log('Scenario 1 failed');
}
catch(e) {
    console.log('Scenario 1 passed');
}

// Scenario 2: unsuccessful account creation due to customer being below 18
try {
    bank.createAccount('user1', 17, 1234567899);
    console.log('Scenario 2 failed');
}
catch(e) {
    console.log('Scenario 2 passed');
}

// Scenario 3: unsuccessful account creation due to invalid username

try {
    bank.createAccount('user3', 20, 1234567888);
    console.log('Scenario 3 failed');
}
catch(e) {
    console.log('Scenario 3 passed');
}

/** DEPOSITING MONEY */
console.log('--Tests for depositing money into a bank account--');
// Scenario 1: successful deposit

try {
    bank.deposit(1234567892, 100);
    console.log('Scenario 1 passed');
}
catch(e) {
    console.log('Scenario 1 failed');
}

// Scenario 2: unsuccessful deposit due to nonexistent account
try {
    bank.deposit(1, 100);
    console.log('Scenario 2 failed');
}
catch(e) {
    console.log('Scenario 2 passed');
}

/** WITHDRAWING MONEY */
console.log('--Tests for withdrawing money from a bank account--');
// Scenario 1: successful withdraw
try {
    bank.withdraw(1234567892, 50);
    console.log('Scenario 1 passed');
}
catch(e) {
    console.log('Scenario 1 failed');
}

// Scenario 2: unsuccessful deposit due to nonexistent account
try {
    bank.withdraw(1, 100);
    console.log('Scenario 2 failed');
}
catch(e) {
    console.log('Scenario 2 passed');
}

/** CHECKING ACCOUNT BALANCE */
console.log('--Tests for checking account balance--');
// Scenario 1: successful check

if (bank.getBalance(1234567892) === 50) {
    console.log('Scenario 1 passed');
} else {
    console.log('Scenario 1 failed');
}

// Scenario 2: unsuccessful check due to nonexistent account
try {
    const x = bank.getBalance(1);
    console.log('Scenario 2 failed');
}
catch(e) {
    console.log('Scenario 2 passed');
}
