describe("Queue", function() {

  function enqueueMulti(queue, items) {
    var enqueue = queue.enqueue.bind(queue);
    items.forEach(enqueue);
  }

  function dequeueMulti(queue, times) {
    for (var i = 0; i < times; i++) {
      queue.dequeue();
    }
  }

  function range(n) {
    var numbers = [];
    for (var i = 0; i < n; i++) {
      numbers[i] = i;
    }
    return numbers;
  }


  var queue;

  beforeEach(function() {
    queue = new Queue();
  });

  it("makes a new queue", function() {
    expect(queue).not.toBeUndefined();
  });

  it("empty queues have size zero", function() {
    expect(queue.getSize()).toEqual(0);
  });

  it("when one thing is enqueued, the queue has size 1", function() {
    queue.enqueue("A");
    expect(queue.getSize()).toEqual(1);
  });

  it("when two things are enqueued, the queue has size 2", function() {
    queue.enqueue("A");
    queue.enqueue("B");
    expect(queue.getSize()).toEqual(2);
  });

  it("when something is enqueued then dequeued, the queue has size 0", function() {
    queue.enqueue("A");
    queue.dequeue();
    expect(queue.getSize()).toEqual(0);
  });

  it("when you try to dequeue an empty queue it throws an exception", function() {
    var dequeue = queue.dequeue.bind(queue);
    expect(dequeue).toThrow(new Error("Underflowed the queue, have we?"));
  });

  it("when you enqueue one item, dequeue returns the item", function() {
    queue.enqueue("A");
    expect(queue.dequeue()).toEqual("A");
  });

  it("when you enqueue two items, dequeue returns the second item", function() {
    queue.enqueue("A");
    queue.enqueue("B");
    expect(queue.dequeue()).toEqual("A");
  });

  it("when you enqueue 700 items and dequeue 500 items, the next dequeue returns the 501st item", function() {
    var items = range(700);
    enqueueMulti(queue, items);
    dequeueMulti(queue, 500);
    expect(queue.dequeue()).toEqual(items[500]);
  });

});

