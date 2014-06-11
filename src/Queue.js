function Queue() {
  this.size = 0;
  this.startingPoint = 0;
  this.elements = [];
}

Queue.prototype = {

  getSize: function() {
    return this.size;
  },

  enqueue: function(item) {
    this.elements.push(item);
    this.size++;
  },

  dequeue: function() {
    this.throwErrorIfTryingToUnderflow();
    var item = this.elements[this.startingPoint];
    this.removeItem();
    return item;
  },

  throwErrorIfTryingToUnderflow: function() {
    if (this.size === 0)
      throw new Error("Underflowed the queue, have we?");
  },

  removeItem: function() {
    this.size--;
    this.startingPoint++;

    if (this.elements.length > 100 && this.startingPoint > this.size / 2)
      this.tightenUp();
  },

  tightenUp: function() {
    this.elements = this.elements.slice(this.startingPoint);
    this.startingPoint = 0;
  }

};
