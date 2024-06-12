#! /usr/

import inquirer from "inquirer";
import Choices from "inquirer/lib/objects/choices.js";

//Banke account interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposite(amount: number): void
    checkBalance(): void
}

//Bank account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;
    constructor(accountNumber:number, balance:number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
// Debit Money    
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`withdrawal of $${amount} successful. Remaining balance: ${this.balance}`);
    }
    else{
        console.log("You Have Insufficient Balance.");
    }
}

//Credit Money
deposite(amount: number): void {
    if(amount > 100){
        amount -= 1;        //$1 fee charged if more than $100 is deposited.
    } this.balance += amount
    console.log(`Deposite of ${amount} successful. Remaining balance: $${this.balance}`);   
}

//Check Balance
checkBalance(): void {
    console.log(`Current Balance: $${this.balance}`);
}
}

// customer class
class customer{
    firsName: string;
    lastName: string;
    gender: string;
    age: number
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName:string, lastName:string, gender:string, age:number, mobileNumber:number, account: BankAccount)
    {
        this.firsName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

//Create bank account
const accounts: BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];

//Create customers
const customers: customer[] = [
    new customer("Khushbu", "Hussain", "Female", 23, 3101234567, accounts[0]),
    new customer("Ahan", "Shah", "male", 25, 3151234567, accounts[1]),
    new customer("Khushi", "Khan", "Female", 23, 3191234567, accounts[2])
] 

//Function to interact with bank account
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accontNumber",
            type: "number",
            message: "Enter your account numbner:"
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accontNumber)
        if(customer){
            console.log(`Welcome, ${customer.firsName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name:"select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposite", "Withdraw", "Check Balance", "Exit"]
            }]);
            switch(ans.select){
                case "Deposite":
                    const depositeAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposite:"
                    })
                    customer.account.deposite(depositeAmount.amount);
                    break;
            
                case "Withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                    })
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
    } while(true)
}
    service();




















