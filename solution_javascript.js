class EventSourcer {
  constructor() {
    this.value = 0;
    this.head = null;
    this.tail = null;
    }

  //should also add a previous node for zero reference which head or tail is defaulted to zero but passes all cases without
  add(num) {
    if (this.tail === null){
      const nextNode = new Node(num);
      this.head = nextNode;
      this.tail = nextNode;
    }
    else if (this.tail.next === null){
      const nextNode = new Node(this.tail.value + num);
      nextNode.prev = this.tail;
      this.tail.next = nextNode;
      this.tail = nextNode;
    } else {
      this.tail.next.value = this.tail.value + num;
      this.tail = this.tail.next;
    }
    this.value = this.tail.value;
    this.tail.command = num;
  }

  subtract(num) {
    if (this.tail === null){
      const nextNode = new Node(0 - num);
      this.head = nextNode;
      this.tail = nextNode;
    }
    else if (this.tail.next === null){
      const nextNode = new Node(this.tail.value - num);
      nextNode.prev = this.tail;
      this.tail.next = nextNode;
      this.tail = nextNode;
    } else {
      this.tail.next.value = this.tail.value - num;
      this.tail = this.tail.next;
    }
    this.value = this.tail.value;
    this.tail.command = 0-num;
  }

  undo() {
    if(this.tail != null && this.tail.prev != null){
      this.tail = this.tail.prev;
      this.value = this.tail.value;
    }

  }

  redo() {
    if(this.tail != null && this.tail.next != null){
      this.tail.next.value = this.tail.value +  this.tail.next.command;
      this.tail = this.tail.next;
      this.value = this.tail.value;
    }
  }

  bulk_undo(num) {
    for (let i = 0; i < num; i++){
      if(this.tail != null && this.tail.prev != null){
        this.tail = this.tail.prev;
        this.value = this.tail.value;
      } else{
        this.value = 0;
        break;
      }
    }
  }

  bulk_redo(num) {
    for (let i = 0; i < num; i++){
      if(this.tail != null && this.tail.next != null){
        this.tail = this.tail.next;
        this.value = this.tail.value;
      } else{
        break;
      }
    }
  }
}

class Node{
  constructor(value) {
    this.value = value;
    this.command = 0;
    this.prev = null;
    this.next = null;
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
