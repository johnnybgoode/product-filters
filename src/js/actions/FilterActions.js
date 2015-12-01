var ProductFilterDispatcher = require('../dispatcher/ProductFilterDispatcher');
var ProductFilterConstants = require('../constants/ProductFilterConstants');

var ActionTypes = ProductFilterConstants.ActionTypes;

module.exports = {
  addFilter: function(filterType, tid) {
    ProductFilterDispatcher.dispatch({
      type: ActionTypes.ADD_FILTER,
      filterType: filterType,
      filterTid: tid
    });
  },
  removeFilter: function(filterType, tid) {
    ProductFilterDispatcher.dispatch({
      type: ActionTypes.REMOVE_FILTER,
      filterType: filterType,
      filterTid: tid
    });
  },
  resetFilters: function(filterType) {
    ProductFilterDispatcher.dispatch({
      type: ActionTypes.RESET_FILTERS,
      filterType: filterType
    });
  }
};
