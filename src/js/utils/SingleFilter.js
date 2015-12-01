var FilterHelper = require('./FilterHelper');

export default class SingleFilter extends FilterHelper {
  addFilter(filterID) {
    this.reset();
    this.activeFilters.push(filterID);
    this.filters[filterID].active = true;
    this.active = true;
  }
};
