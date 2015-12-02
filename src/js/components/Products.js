var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
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
        <ReactCSSTransitionGroup
          transitionName="product-item"
          transitionAppear={true}
          transitionAppearTimeout={400}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={300}>
            {productItems}
        </ReactCSSTransitionGroup>
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
