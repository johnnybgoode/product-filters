var React = require('react');
var classNames = require('classnames');
var FilterActions = require('../actions/FilterActions');

var FilterItem = React.createClass({
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
    var image = '';
    if (typeof this.props.image !== 'undefined') {
      image = <img src={this.props.image} />;
    }
    return (
      <div className={classNames({
        'filter-item': true,
        'active': this.state.active,
        'has-image': typeof this.props.image !== 'undefined' && this.props.image !== ''
      })}>
        <div className="filter-item-content">
          <a href="#" rel={this.props.type} onClick={this._handleClick}>{image}<span className="name" dangerouslySetInnerHTML={this._termName()} /></a>
        </div>
      </div>
    );
  },

  _handleClick: function(e) {
    e.preventDefault();

    if (this.props.multi && this.state.active) {
      FilterActions.removeFilter(this.props.type, this.props.tid);
    }
    else if (!this.state.active) {
      FilterActions.addFilter(this.props.type, this.props.tid);
    }

    if (this.props.multi || !this.state.active) {
      this.setState({
        active: !this.state.active
      });
    }

    return false;
  },

  _termName: function() {
    return {__html: this.props.name};
  }
});

module.exports = FilterItem;
