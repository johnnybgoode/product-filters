/* global Drupal */

var SingleFilter = require('../utils/SingleFilter');
var MultiFilter = require('../utils/MultiFilter');
var ProductFilterDispatcher = require('../dispatcher/ProductFilterDispatcher');
var ProductFilterConstants = require('../constants/ProductFilterConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var ActionTypes = ProductFilterConstants.ActionTypes;
var EVENT_TYPE = '-change';
var CHANGE_EVENT = 'filters' + EVENT_TYPE;


var FilterStore = assign({}, EventEmitter.prototype, {
  init: function() {
    var settings = Drupal.settings.ProductFilters;
    this.state = {};

    for (let filterType of Object.keys(settings.filter_types)) {
      var filterSettings = settings.filter_types[filterType];

      if (filterSettings.opts.multi) {
        this.state[filterType] = new MultiFilter(filterSettings.filters, filterSettings.opts);
      }
      else {
        this.state[filterType] = new SingleFilter(filterSettings.filters, filterSettings.opts);
      }
    }

    // set up "page type" as static filter.
    this.state[settings.page_type].addStaticFilter(settings.main_tid);
  },

  emitChange: function(eventType) {
    this.emit(eventType);
  },

  addChangeListener: function(eventType, callback) {
    this.on(eventType, callback);
  },

  removeChangeListener: function(eventType, callback) {
    this.removeListener(eventType, callback);
  },

  getActiveFilters: function(filterTypes) {
    var filterTypes = filterTypes || Object.keys(this.state);
    var data = {};
    for (let filterType of filterTypes) {
      data[filterType] = this.state[filterType].activeFilters;
    }
    return data;
  },

  get: function(type) {
    if (!type) { return this.state; }
    return this.state[type].filters || {};
  },

  active: function(type) {
    if (typeof type !== 'undefined') {
      return this.state[type].active;
    }
  },

  visible: function(type) {
    if (typeof type !== 'undefined') {
      return this.state[type].visible;
    }
  }

});

FilterStore.init();

FilterStore.dispatchToken = ProductFilterDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.ADD_FILTER:
      FilterStore.state[action.filterType].addFilter(action.filterTid);
      FilterStore.emitChange(action.filterType + EVENT_TYPE);

      for (let filterType of Object.keys(FilterStore.state)) {
        if (FilterStore.state[filterType].depends(action.filterType)) {
          FilterStore.state[filterType].update()
            .then(function() {
              FilterStore.emitChange(filterType + EVENT_TYPE);
            });
        }
      }
    break;

    case ActionTypes.REMOVE_FILTER:
      if (FilterStore.state[action.filterType].opts.multi) {
        FilterStore.state[action.filterType].removeFilter(action.filterTid);
        FilterStore.emitChange(action.filterType + EVENT_TYPE);
      }
    break;

    case ActionTypes.RESET_FILTERS:
      FilterStore.state[action.filterType].reset();
      FilterStore.emitChange(action.filterType + EVENT_TYPE);

      for (let filterType of Object.keys(FilterStore.state)) {
        if (FilterStore.state[filterType].depends(action.filterType)) {
          FilterStore.state[filterType].update()
            .then(function() {
              FilterStore.emitChange(filterType + EVENT_TYPE);
            });
        }
      }
    break;
  }
  // Always fire 'filters-changed' event.
  FilterStore.emitChange(CHANGE_EVENT);
});

module.exports = FilterStore;
