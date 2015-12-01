var Request = require('./Request');

export default class FilterHelper {
  constructor(filters, opts) {
    this.opts = opts || {};
    this.state = {
      active: false,
      filters: filters,
      activeFilters: [],
      visible: opts.visible
    };
  }

  update() {
    var FilterStore = require('../stores/FilterStore');
    var activeFilters = FilterStore.getActiveFilters(this.opts.depends);

      this.state.visible = false;
      for (let dep of this.opts.depends) {
        if (FilterStore.state[dep].active) {
          this.state.visible = true;
          break;
        }
      }

    this.reset();
    return Request('/api/product-categories', activeFilters).then(function(responseData) {
      this.filters = responseData;
    }.bind(this));
  }

  reset() {
    this.activeFilters = [];
    if (this.opts.staticFilter !== undefined) {
      this.activeFilters.push(this.opts.staticFilter);
    }
    for(let filterID of Object.keys(this.filters)) {
      this.filters[filterID].active = false;
    }
    this.active = false;
  }

  depends(filterName) {
    return (this.opts.depends && (this.opts.depends.indexOf(filterName) >= 0));
  }

  addStaticFilter(filterID) {
    this.opts.staticFilter = filterID;
    this.activeFilters.push(filterID);
  }

  get filters() {
    return this.state.filters;
  }

  set filters(newFilters) {
    this.state.filters = newFilters;
  }

  get active() {
    return this.state.active;
  }

  set active(status) {
    this.state.active = status;
  }

  get visible() {
    return this.state.visible;
  }

  set visible(visibility) {
    this.state.visible = visibility;
  }

  get activeFilters() {
    return this.state.activeFilters;
  }

  set activeFilters(newActiveFilters) {
    this.state.activeFilters = newActiveFilters;
  }

};
