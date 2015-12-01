var FilterHelper = require('./FilterHelper');

export default class MultiFilter extends FilterHelper {

  addFilter(filterID) {
    this.active = true;
    if (this.activeFilters.indexOf(filterID) === -1) {
      this.filters[filterID].active = true;
      this.activeFilters.push(filterID);
    }
  }

  removeFilter(filterID) {
    var removeIdx = this.activeFilters.indexOf(filterID);
    this.activeFilters.splice(removeIdx, 1);
    this.filters[filterID].active = false;
    if (this.activeFilters.length === 0) { this.active = false; }
  }
};
