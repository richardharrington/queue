function Queue() {
  this.size = 0;
  this.pointer = 0;
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
    if (this.size === 0)
      throw new Error("Underflowed the queue, have we?");

    var item = this.elements[this.pointer];
    this.size--;
    this.pointer++;

    if (this.pointer > this.size / 2)
      this._tightenUp();

    return item;
  },

  _tightenUp: function() {
    this.elements = this.elements.slice(this.pointer);
    this.pointer = 0;
  }

};
