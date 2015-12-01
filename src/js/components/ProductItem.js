// name
// image .src, .alt
// url


var React = require('react');

var ProductItem = React.createClass({
  render: function() {
    return (
      <div className="product-item">
        <a href={this.props.url}><img src={this.props.image} />{this.props.title}</a>
      </div>
    );
  }
});

module.exports = ProductItem;
