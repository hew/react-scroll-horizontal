'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactMotion = require('react-motion');

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HorizontalScroll = function (_Component) {
  _inherits(HorizontalScroll, _Component);

  function HorizontalScroll(props) {
    _classCallCheck(this, HorizontalScroll);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HorizontalScroll).call(this, props));

    _this.state = {
      currentDeltas: 0, // Gathered from mousewheel
      animValues: 0 // Fed to React Motion
    };
    _this._onScrollStart = _this._onScrollStart.bind(_this);
    _this._resetMin = _this._resetMin.bind(_this);
    _this._resetMax = _this._resetMax.bind(_this);
    return _this;
  }

  _createClass(HorizontalScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Place the 'lock__' class on the HTML element - if toggled
      if (this.props.pageLock) {
        var orig = document.firstElementChild.className;
        document.firstElementChild.className = orig + (orig ? ' ' : '') + 'locked__';
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.pageLock) {
        document.firstElementChild.className = document.firstElementChild.className.replace(/ ?locked__/, '');
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps, nextState) {
      // Calculate the bounds of the scroll area
      var max = this.refs.hscrollContainer.lastElementChild.scrollWidth;
      var win = this.refs.hscrollContainer.offsetWidth;
      var curr = this.state.animValues;
      var bounds = -(max - win);

      if (curr >= 1) {
        this._resetMin();
      }
      if (curr <= bounds) {
        var x = bounds + 1;
        this._resetMax(x);
      }
    }
  }, {
    key: '_onScrollStart',
    value: function _onScrollStart(e) {
      var _this2 = this;

      e.preventDefault();
      var mouseY = e.deltaY;
      // Bring in the existing animation values
      var animationValue = this.state.animValues;
      // Adds the reverse toggle for the component
      var mouseYReverse = -mouseY;
      // Calculate the new animation value(s)
      var newAnimationValue = animationValue + mouseY;
      var newAnimationValueNegative = animationValue + mouseYReverse;

      var scrolling = function scrolling() {
        if (_this2.props.reverseScroll) {
          _this2.setState({ animValues: newAnimationValueNegative });
        }
        _this2.setState({ animValues: newAnimationValue });
      };

      scrolling();
    }
  }, {
    key: '_resetMin',
    value: function _resetMin() {
      this.setState({ animValues: 0 });
    }
  }, {
    key: '_resetMax',
    value: function _resetMax(x) {
      this.setState({ animValues: x });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var config = _props.config;

      var springConfig = config ? config : _reactMotion.presets.noWobble;
      var styles = {
        height: width ? width : '100%',
        width: width ? width : '100%',
        overflow: 'hidden',
        position: 'relative'
      };
      return _react2.default.createElement(
        'div',
        _extends({
          onWheel: this._onScrollStart,
          ref: 'hscrollContainer',
          style: styles
        }, this.props),
        _react2.default.createElement(
          _reactMotion.Motion,
          {
            style: { z: (0, _reactMotion.spring)(this.state.animValues, springConfig)
            } },
          function (_ref) {
            var z = _ref.z;

            var scrollingElementStyles = {
              transform: 'translate3d(' + z + 'px, 0,0)',
              display: 'inline-flex',
              height: '100%',
              position: 'absolute'
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