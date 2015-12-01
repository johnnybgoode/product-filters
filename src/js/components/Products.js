var React = require('react');
var FilterStore = require('../stores/FilterStore');
var ProductStore = require('../stores/ProductStore');
var ProductItem = require('./ProductItem');

var Products = React.createClass({
  getInitialState: function() {
    return this._getStateFromStore();
  },

  componentDidMount: function() {
    ProductStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var products = this.state.products;
    var productItems = Object.keys(products).map(function(productID) {
      return (
        <ProductItem
            key={productID}
            title={products[productID].title}
            image={products[productID].image}
            url={products[productID].url}
        />
      );
    });
    return (
      <div className={'products-list'}>
        {productItems}
      </div>
    );
  },

  _onChange: function() {
    this.setState(this._getStateFromStore());
  },

  _getStateFromStore: function() {
    return {
      products: ProductStore.get()
    };
  }
});

module.exports = Products;
