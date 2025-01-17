import { BankType, AccountType } from './types';

/**
 * This class implements a bank that can
 * maintain accounts and create new accounts
 */
export class Bank implements BankType {
    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    /**
     * The constructor initialized the bank with accounts and usernames
     * @param accounts - array of accounts
     * @param usernames - array of usernames
     */
    public constructor(accounts: AccountType[], usernames: string[]) {
        this.accounts = accounts;
        this.usernames = usernames;
    }

    /**
     * Finds the account in this bank with the given ID (if it exists)
     * @param id - account id
     * @returns - true if account id exists, false otherwise
     */
    private findAccountById(id: number): AccountType | undefined {
        return this.accounts.find(account => account.id === id);
    }

    /**
     * Determines if the account with the given number is invalid
     * @param accountNumber - account number
     * @returns - true if account accountNumber is not equal to 10 characters, false otherwise
     */
    private isAccountNumberInvalid(accountNumber: number): boolean {
        return accountNumber.toString().length !== 10;
    }


    /**
     * Determines if the given username exists in this bank
     * @param username - username
     * @returns - true if the username was in the list of this bank's users, false otherwise
     */
    private isUsernameExists(username: string): boolean {
        return this.usernames.includes(username);
    }

    /**
     * Creates a new account in this bank with the following parameters
     * @param username - name of useer
     * @param age - age of user
     * @param accountNumber - number of account to be added
     * @returns - a new account with a ten-digit unique id and zero balance
     */
    createAccount(username: string, age: number, accountNumber: number): AccountType {
        if(this.isAccountNumberInvalid(accountNumber)) {
            throw new Error('Invalid account number');
        }
        if(!this.isUsernameExists(username)) {
            throw new Error('User not found');
        }
        if(age < 18) {
            throw new Error('User is under 18');
        }
        if(this.findAccountById(accountNumber)) {
            throw new Error('Account already exists');
        }
        const account: AccountType = {
            id: accountNumber,
            balance: 0
        };
        this.accounts.push(account);
        return account;
    }

    /**
     * Deposits the given amount to the account with the given id (if it exists)
     * @param id - id of account
     * @param amountToDeposit - the amount of money to be added into the account
     */
    deposit(id: number, amountToDeposit: number) {
        const acct = this.findAccountById(id);
        if (acct != undefined) {
            acct.balance = acct.balance + amountToDeposit;
        } else {
            throw new Error(`Account with id ${id} does not exist`);
        }
    }

    /**
     * Returns the balance of the account with the given id
     * @param id - id of account
     * @returns - balance left in account
     */
    getBalance(id: number): number {
        const acct = this.findAccountById(id);
        if (acct != undefined) {
            return acct.balance;
        } else {
            throw new Error(`Account with id ${id} does not exist`);
        }
    }

    /**
     * Withdraws the given amount from the account with the given id (if it exists)
     * @param id - id of account
     * @param amountToDeposit - the amount of money to be subtracted from the account
     */
    withdraw(id: number, amountToWithdraw: number) {
        this.deposit(id, -amountToWithdraw);
    }
}