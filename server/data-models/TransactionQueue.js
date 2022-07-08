
//FIFO queue
//In a production environment, I would use a linked list instead of an array because it would be more efficient.
class TransactionQueue extends Array{

  //inserts transaction into proper place in queue based on timestamp.
  insert(transaction){
    const queue = this;
    if(!queue[0] || transaction.timestamp < queue[0].timestamp){
      queue.unshift(transaction);
      return;
    }
    else if(transaction.timestamp > queue[queue.length - 1].timestamp){
      queue.push(transaction);
      return;
    }
    else{
      for(let i = 1; i < queue.length; i++){
        if(transaction.timestamp > queue[i - 1].timestamp && transaction.timestamp <= queue[i].timestamp){
          queue.splice(i, 0, transaction);
          return;
        }
      }
    }
  }

  peek(){
    return this[0];
  }
}


module.exports = TransactionQueue