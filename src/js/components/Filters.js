var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var classnames = require('classnames');
var FilterStore = require('../stores/FilterStore');
var Flickity = require('./FlickityComponent');
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
    var transitionDuration = 400;
    var flickityOptions = {
      cellAlign: 'left',
      cellSelector: '.filter-item',
      initialIndex: 0,
      percentPosition: false,
      contain: true,
      wrapAround: false
    };

    var filterItems = Object.keys(this.state.filters).map(function(filterID) {
      let filter = this.state.filters[filterID];
      return (
        <FilterItem
            key={filterID}
            active={filter.active}
            name={filter.name}
            tid={filter.tid}
            image={filter.image}
            type={this.props.filterType}
            multi={this.props.multi}
        />
      );
    }.bind(this));

    if (filterItems.length) {
      let filters = (
        <ReactCSSTransitionGroup
          transitionName="filter-item"
          transitionAppear={true}
          transitionAppearTimeout={transitionDuration}
          transitionEnterTimeout={transitionDuration}
          transitionLeaveTimeout={transitionDuration - 100}>
            <FilterReset
                key={this.props.filterType + '-reset'}
                active={this.state.active}
                name={this.props.filterType === 'categories' ? 'See All' : 'All'}
                type={this.props.filterType}
            />
            {filterItems}
        </ReactCSSTransitionGroup>
      );

      if (FilterStore.state[this.props.filterType].opts.carousel) {
        filters = (
          <Flickity className={this.props.filterType + '-carousel'} options={flickityOptions} delay={transitionDuration}>
              {filters}
          </Flickity>
        );
      }

      return (
        <div className={classnames(
            'filter-group',
            this.props.filterType + '-filters',
            {'element-invisible': !this.state.visible}
          )}>
          <div className="filter-content" >
            {filters}
          </div>
        </div>
      );
    }
    else {
      return ( <div /> );
    }
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
