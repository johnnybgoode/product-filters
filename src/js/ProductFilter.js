'use strict';

require('babel/polyfill');

var FilterStore = require('./stores/FilterStore');
var Filters = require('./components/Filters');
var Products = require('./components/Products');
var React = require('react');
var ReactDOM = require('react-dom');
//window.React = React; // debug

var filters = Object.keys(FilterStore.state).map(function(filterType) {
  return (
    <Filters filterType={filterType} multi={FilterStore.state[filterType].opts.multi} />
  );
});

ReactDOM.render(
  <div>
    <div className="filters">
      {filters}
    </div>
    <div className="products">
      <Products />
    </div>
  </div>,
  document.getElementById('product_filters')
);
