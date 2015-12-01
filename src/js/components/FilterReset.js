var React = require('react');
var FilterActions = require('../actions/FilterActions');
var classnames = require('classnames');

var FilterReset = React.createClass({
  getInitialState: function() {
    return {
      active: this.props.active
    };
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({
      active: newProps.active
    });
  },
  render: function() {
    return (
      <div className={classnames(
        'filter-item',
        'filter-reset',
        {'active': !this.state.active}
      )}>
        <div className="filter-item-content">
          <a href="#" rel={this.props.type} onClick={this._handleClick}><span className="filter-item-name">{this.props.name}</span></a>
        </div>
      </div>
    );
  },

  _handleClick: function(e) {
    e.preventDefault();

    FilterActions.resetFilters(this.props.type);

    return false;
  }
});

module.exports = FilterReset;
