const TransactionQueue = require('./TransactionQueue');

const activeTransactions = new TransactionQueue();
const loggedTransactions = [];

let id = 1;

class Transaction{
  constructor({payer, points, timestamp}){
    this.id = id++;
    this.payer = payer;
    this.points = points;
    this.timestamp = new Date(timestamp);

    if(points < 0)
      loggedTransactions.push(this)
    else
      activeTransactions.insert(this);
  }

  deactivateTransaction(){

  }

  addTransaction(transaction){

  }
}

Transaction.getAll = () => {
  return activeTransactions.queue;
}


module.exports = Transaction;