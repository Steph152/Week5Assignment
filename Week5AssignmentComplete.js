class Amount {
    constructor(amount, date){
        this.amount = amount;
        this.date = date;
    }
   
    describe (){
        return `${this.amount} was spend on ${this.date}.`;
    }   
}

class Transaction {
    constructor(name){
        this.name = name;
        this.transactions = []
    }

addAmount(amount){
    if (amount instanceof Amount){
        this.transactions.push(amount);
    }else{
        throw new Error(`Error`);
    }
  }

describe(){
    return `${this.name} has ${this.transactions.lenght} transactions.`;
  }
}

class Menu {
    constructor(){
        this.trxs = [];
        this.selectedTrx = null;
    }
    start(){
        let selection = this.showMainMenuOptions();
        while (selection != 0){
            switch (selection){
                case '1':
                    this.createTransaction();
                    break;
                case '2':
                    this.viewTransaction();
                    break;
                case '3':
                    this.deleteTransaction();
                    break;
                case '4':
                    this.displayTransaction();
                    break;  
                default:
                    selection = 0;       
            }
        selection = this.showMainMenuOptions();
        }
        alert('Goodbye!')
    }
showMainMenuOptions(){
    return prompt(`
    0) Exit
    1) Create New Transaction
    2) View Specific Transaction
    3) Delete Transaction
    4) Display All Transactions
    `);
  }
showTransactionMenuOptions(amountInfo) {
    return prompt(`
    0) Back
    1) Add Amount and Date
    2) Delete Amount and Date
    ------------
    ${amountInfo}
    `);
}

displayTransaction(){
    let trxString = '';
    for ( let i = 0; i < this.trxs.length; i++ ){
        trxString += i + ') ' + this.trxs[i].name + '\n';
    }
    alert(trxString);
    
}


createTransaction(){
    let name = prompt(`Enter new transaction:
     For example: Bought Groceries`);
    this.trxs.push(new Transaction(name));
}

viewTransaction(){
    let index = prompt('Enter index of transaction you wish to view:');
    if (index > -1 && index < this.trxs.length){
        this.selectedTrx = this.trxs[index];
        let description = 'Transaction: ' + this.selectedTrx.name + '\n';
        
        for ( let i = 0; i < this.selectedTrx.transactions.length; i++ ) {
            description += i + ')' + this.selectedTrx.transactions[i].amount + ' was debited/credited on ' + this.selectedTrx.transactions[i].date + '\n';
        }
        
        let selection = this.showTransactionMenuOptions(description);
        switch(selection){
            case'1':
            this.createAmount();
            break;
            case'2':
            this.deleteAmount();
        }
    }
}

deleteTransaction(){
    let index = prompt('Enter index of the transaction you wish to delete:')
        if (index > -1 && index < this.trxs.length){
            this.trxs.splice(index, 1);
        }
    }


createAmount(){
    let amount = prompt('Enter amount for transaction:');
    let date = prompt('Enter date for transaction');
    this.selectedTrx.transactions.push(new Amount(amount, date));
}

deleteAmount(){ 
    let index = prompt('Enter the index of the amount / date you wish to delete:');
    if (index > -1 && index < this.selectedTrx.transactions.length){
        this.selectedTrx.transactions.splice(index, 1);
    }
}
}


let menu = new Menu();
menu.start();

