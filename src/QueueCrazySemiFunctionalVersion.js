var List = {

  EMPTY_LIST: [],

  first: function(list) {
    if (List.isEmpty(list)) {
      throw new Error('cannot take first of empty list');
    }
    return list[0];
  },

  rest: function(list) {
    if (List.isEmpty(list)) {
      throw new Error('cannot take rest of empty list');
    }
    return list[1];
  },

  cons: function(element, list) {
    return [element, list];
  },

  isEmpty: function(list) {
    return list === List.EMPTY_LIST;
  },

  getSize: function(list) {
    if (List.isEmpty(list)) {
      return 0;
    }
    return List.getSize(List.rest(list)) + 1;
  },

  reverse: function(list) {
    function aux(list, newList) {
      if (List.isEmpty(list)) {
        return newList;
      }
      return aux(List.rest(list), List.cons(List.first(list), newList));
    }
    return aux(list, List.EMPTY_LIST);
  }

};

function QueueCrazySemiFunctionalVersion() {
  this.primaryList = List.EMPTY_LIST;
  this.secondaryList = List.EMPTY_LIST;
}

QueueCrazySemiFunctionalVersion.prototype = {

  getSize: function() {
    return List.getSize(this.primaryList);
  },

  enqueue: function(element) {
    this.primaryList = List.cons(element, this.primaryList);
  },

  dequeue: function() {
    if (List.isEmpty(this.secondaryList)) {
      if (List.isEmpty(this.primaryList)) {
        throw new Error("Underflowed the queue, have we?");
      }
      this.secondaryList = List.reverse(this.primaryList);
      this.primaryList = List.EMPTY_LIST;
    }
    var element = List.first(this.secondaryList);
    this.secondaryList = List.rest(this.secondaryList);
    return element;
  }

};

