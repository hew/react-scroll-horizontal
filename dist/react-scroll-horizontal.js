'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HorizontalScroll = function (_Component) {
  _inherits(HorizontalScroll, _Component);

  function HorizontalScroll(props) {
    _classCallCheck(this, HorizontalScroll);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HorizontalScroll).call(this, props));

    _this.state = { animValues: 0 };

    _this.onScrollStart = _this.onScrollStart.bind(_this);
    _this.resetMin = _this.resetMin.bind(_this);
    _this.resetMax = _this.resetMax.bind(_this);

    return _this;
  }

  _createClass(HorizontalScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Place the 'lock__' class on the HTML element - if toggled
      if (this.props.pageLock) {
        var orig = document.firstElementChild.className;
        document.firstElementChild.className = orig + (orig ? ' ' : '') + 'locked__';
      } else return;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.pageLock) {
        document.firstElementChild.className = document.firstElementChild.className.replace(/ ?locked__/, '');
      } else return;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps, nextState) {

      // Calculate the bounds of the scroll area
      var el = _reactDom2.default.findDOMNode(this.refs['hScrollParent']);

      var max = el.lastElementChild.scrollWidth;
      var win = el.offsetWidth;

      // Get the new animation values
      var curr = this.state.animValues;

      // Establish the bounds. We do this every time b/c it might change.
      var bounds = -(max - win);

      // Logic to hold everything in place
      if (curr >= 1) {
        this.resetMin();
      } else if (curr <= bounds) {
        var x = bounds + 1;
        this.resetMax(x);
      }
    }
  }, {
    key: 'onScrollStart',
    value: function onScrollStart(e) {
      var _this2 = this;

      e.preventDefault();
      // If scrolling on x axis, change to y axis
      // Otherwise just get the y deltas
      // Basically, this for Apple mice that allow 
      // horizontal scrolling by default
      var rawData = e.deltaY ? e.deltaY : e.deltaX;
      var mouseY = Math.floor(rawData);

      // Bring in the existing animation values
      var animationValue = this.state.animValues;
      var newAnimationValue = animationValue + mouseY;
      var newAnimationValueNegative = animationValue - mouseY;

      var scrolling = function scrolling() {
        _this2.props.reverseScroll ? _this2.setState({ animValues: newAnimationValueNegative }) : _this2.setState({ animValues: newAnimationValue });
      };

      // Begin Scrolling Animation
      requestAnimationFrame(scrolling);
    }
  }, {
    key: 'resetMin',
    value: function resetMin() {
      this.setState({ animValues: 0 });
    }
  }, {
    key: 'resetMax',
    value: function resetMax(x) {
      this.setState({ animValues: x });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var config = _props.config;
      var style = _props.style;
      var width = style.width;
      var height = style.height;

      var springConfig = config ? config : _reactMotion.presets.noWobble;

      // Styles
      var styles = {
        height: height ? height : '100%',
        width: width ? width : '100%',
        overflow: 'hidden',
        position: 'relative'
      };

      return _react2.default.createElement(
        'div',
        {
          onWheel: this.onScrollStart,
          ref: 'hScrollParent',
          style: styles,
          className: 'scroll-horizontal'
        },
        _react2.default.createElement(
          _reactMotion.Motion,
          { style: { z: (0, _reactMotion.spring)(this.state.animValues, springConfig) } },
          function (_ref) {
            var z = _ref.z;

            var scrollingElementStyles = {
              transform: 'translate3d(' + z + 'px, 0,0)',
              display: 'inline-flex',
              height: '100%',
              position: 'absolute',
              willChange: 'transform'
            };
            return _react2.default.createElement(
              'div',
              { style: scrollingElementStyles },
              _this3.props.children
            );
          }
        )
      );
    }
  }]);

  return HorizontalScroll;
}(_react.Component);

exports.default = HorizontalScroll;


HorizontalScroll.proptypes = {
  reverseScroll: _react.PropTypes.bool,
  pageLock: _react.PropTypes.bool,
  config: _react.PropTypes.object,
  style: _react.PropTypes.object
};

HorizontalScroll.defaultProps = {
  reverseScroll: false,
  pageLock: false,
  config: null,
  style: { width: '100%', height: '100%' }
};