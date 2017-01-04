(function() {
"use strict"

//noinspection JSUnresolvedFunction
angular.module('email', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.component('shoppingList', {
  templateUrl: 'shoppingList.html',
  controller: ShoppingListComponentController,
  binding: {
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
})

// COMPONENT
function ShoppingListComponentController() {
  var $ctrl = this
  var totalItems

  $ctrl.cookiesInList = function() {
    for(var i = 0; i < $ctrl.items.length; i++) {

    }
  }
}

// CONTROLLER
ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this
  var shoppingList = ShoppingListFactory()

  list.items = shoppingList.getItems()
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )"

  list.itemName = ''
  list.itemQuantity = ''

  list.addItem = function() {
    shoppingList.addItem(list.itemName, list.itemQuantity)
    list.title = origTitle + " (" + list.items.length + " items )"
  }

  list.removeItem = function (itemIndex) {
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    shoppingList.removeItem(itemIndex);
    this.title = origTitle + " (" + list.items.length + " items )";
  };
}

// FACTORY
function ShoppingListFactory() {
  var factory = function(maxItems) {
    return new ShoppingListService(maxItems)
  }
  return factory
}

// SERVICE
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}
})()
