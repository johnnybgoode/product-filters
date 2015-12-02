var React = require('react');
var ReactDOM = require('react-dom');
var Flickity = require('flickity');

var FlickityComponent = React.createClass({

  getInitialState: function() {
    return {
      selectedIndex: 0
    };
  },

  getDefaultProps: function() {
    return {
      options: {},
      className: '',
      elementType: 'div'
    };
  },

  updateSelected: function() {
    var index = this.flkty.selectedIndex;
    this.setState({
      selectedIndex: index
    });
  },

  componentWillUnmount: function() {
    if (this.flkty) {
      this.flkty.off('cellSelect', this.updateSelected);
      ReactDOM.unmountComponentAtNode(this._node);
    }
  },

  componentDidMount: function() {
    this.flkty = new Flickity(this._node, this.props.options);
    this.flkty.on('cellSelect', this.updateSelected);

    this.renderFlickity();
  },

  componentWillReceiveProps: function(newProps) {
    this.renderFlickity(newProps);
    this.props = newProps;
  },

  render: function() {
    return (
      <div className={this.props.className} ref={(ref) => this._node = ref} />
    );
  },

  renderFlickity: function(props) {
    props = props || this.props;

    ReactDOM.render(<div>{props.children}</div>, this._node.querySelector('.flickity-slider'), function() {
      window.setTimeout(function() {
        this.flkty.reloadCells();
      }.bind(this), this.props.delay);
    }.bind(this));

  }
});

module.exports = FlickityComponent;
