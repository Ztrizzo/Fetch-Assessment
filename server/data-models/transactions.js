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




}

Transaction.getAll = () => {
  return activeTransactions;
}

Transaction.spendPoints = (points) => {
  
  
  while(points > 0){
    if (activeTransactions.peek().points > points){
      activeTransactions.peek().points -= points;
      points = 0;
    }
    else{
      const transaction = activeTransactions.queue.dequeue();
    }
  }
}

module.exports = Transaction;