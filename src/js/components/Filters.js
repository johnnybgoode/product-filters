var React = require('react');
var classnames = require('classnames');
var FilterStore = require('../stores/FilterStore');
var FilterItem = require('./FilterItem');
var FilterReset = require('./FilterReset');

var Filters = React.createClass({
  getInitialState: function() {
    return this._getStateFromStore();
  },

  componentDidMount: function() {
    FilterStore.addChangeListener(this.props.filterType + '-change', this._onChange);
  },

  componentWillUnmount: function() {
    FilterStore.removeChangeListener(this.props.filterType + '-change', this._onChange);
  },

  render: function() {
    var filters = this.state.filters;
    var filterItems = Object.keys(filters).map(function(filterID) {
      return (
        <FilterItem
            key={filterID}
            active={filters[filterID].active}
            name={filters[filterID].name}
            tid={filters[filterID].tid}
            image={filters[filterID].image}
            type={this.props.filterType}
            multi={this.props.multi}
        />
      );
    }.bind(this));
    return (
      <div className={classnames(
          'filter-group', 
          this.props.filterType + '-filters',
          {'element-invisible': !this.state.visible}
        )}>
        <div className="filter-content">
          <FilterReset
              active={this.state.active}
              name={this.props.filterType === 'categories' ? 'See All' : 'All'}
              type={this.props.filterType}
          />
          {filterItems}
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(this._getStateFromStore());
  },

  _getStateFromStore: function() {
    return {
      active: FilterStore.active(this.props.filterType),
      visible: FilterStore.visible(this.props.filterType),
      filters: FilterStore.get(this.props.filterType)
    };
  },

});

module.exports = Filters;
