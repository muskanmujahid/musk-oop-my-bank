#! /usr/
import inquirer from "inquirer";
//Bank account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money    
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} successful. Remaining balance: ${this.balance}`);
        }
        else {
            console.log("You Have Insufficient Balance.");
        }
    }
    //Credit Money
    deposite(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than $100 is deposited.
        }
        this.balance += amount;
        console.log(`Deposite of ${amount} successful. Remaining balance: $${this.balance}`);
    }
    //Check Balance
    checkBalance() {
        console.log(`Current Balance: $${this.balance}`);
    }
}
// customer class
class customer {
    firsName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firsName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//Create bank account
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
//Create customers
const customers = [
    new customer("Khushbu", "Hussain", "Female", 23, 3101234567, accounts[0]),
    new customer("Ahan", "Shah", "male", 25, 3151234567, accounts[1]),
    new customer("Khushi", "Khan", "Female", 23, 3191234567, accounts[2])
];
//Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accontNumber",
            type: "number",
            message: "Enter your account numbner:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accontNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firsName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposite", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposite":
                    const depositeAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposite:"
                    });
                    customer.account.deposite(depositeAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid Account Number. Please Try Again.");
        }
    } while (true);
}
service();
