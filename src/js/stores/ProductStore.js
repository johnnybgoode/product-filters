/* global Drupal */

var ProductFilterDispatcher = require('../dispatcher/ProductFilterDispatcher');
var ProductFilterConstants = require('../constants/ProductFilterConstants');
var FilterStore = require('./FilterStore');
var Request = require('../utils/Request');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var ActionTypes = ProductFilterConstants.ActionTypes;
var CHANGE_EVENT = 'products-change';


var ProductStore = assign({}, EventEmitter.prototype, {
  state: {
    products: Drupal.settings.ProductFilters.products
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  updateProducts: function() {
    var activeFilters = FilterStore.getActiveFilters();
    return Request('/api/products', activeFilters)
      .then(function(responseData) {
        this.state.products = responseData;
      }.bind(this));
  },

  get: function() {
    return this.state.products;
  }
});

ProductStore.dispatchToken = ProductFilterDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.ADD_FILTER:
    case ActionTypes.REMOVE_FILTER:
    case ActionTypes.RESET_FILTERS:
      ProductStore.updateProducts()
        .then(function() {
          ProductStore.emit(CHANGE_EVENT);
        });
    break;
  }
});

module.exports = ProductStore;
