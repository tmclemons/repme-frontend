exports.ids = [0];
exports.modules = Array(20).concat([
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(21);

var _VoteForm = __webpack_require__(89);

var _VoteForm2 = _interopRequireDefault(_VoteForm);

var _Header = __webpack_require__(116);

var _Header2 = _interopRequireDefault(_Header);

var _BannerComponent = __webpack_require__(118);

var _BannerComponent2 = _interopRequireDefault(_BannerComponent);

var _MainFooter = __webpack_require__(121);

var _MainFooter2 = _interopRequireDefault(_MainFooter);

var _results = __webpack_require__(279);

var _results2 = _interopRequireDefault(_results);

var _axios = __webpack_require__(31);

var _axios2 = _interopRequireDefault(_axios);

var _constants = __webpack_require__(122);

var _constants2 = _interopRequireDefault(_constants);

var _reactCookies = __webpack_require__(19);

var _reactCookies2 = _interopRequireDefault(_reactCookies);

var _cookieComponent = __webpack_require__(298);

var _cookieComponent2 = _interopRequireDefault(_cookieComponent);

var _ballot = __webpack_require__(299);

var _ballot2 = _interopRequireDefault(_ballot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ballotCopy = _constants2.default.ballotCopy;

var Ballot = function (_React$Component) {
  _inherits(Ballot, _React$Component);

  function Ballot(props) {
    _classCallCheck(this, Ballot);

    var _this = _possibleConstructorReturn(this, (Ballot.__proto__ || Object.getPrototypeOf(Ballot)).call(this, props));

    _this.locationCheckForWidget = function () {
      var regex = new RegExp('([^=&?]+)=([^&]+)');
      var queryString = _this.props.location.search ? _this.props.location.search.match(regex) : null;
      var apiCheckForWidget = queryString && queryString[2] === 'true' ? true : false;
      return apiCheckForWidget;
    };

    _this.urlCheck = function (urlProps) {
      var billIdCheck = urlProps ? urlProps.split('-') : '';
      var apiUrl = urlProps && urlProps !== _this.states[3] && urlProps !== _this.states[4] ? '/' + urlProps : '';
      var apiCheckForImage = urlProps === _this.states[3];

      return {
        url: billIdCheck.length > 1 ? '/bill/' + urlProps : '/profile' + apiUrl
      };
    };

    _this.onValueChange = function (data, inUse) {
      var bannerProps = data / _this.state.step || _this.state.bannerProps;
      _this.voteValue = 100 - data;
      _this.sliderDebounce = inUse ? inUse : false;
      _cookieComponent2.default.setUserFlow('firstTimeVote', false);
      _cookieComponent2.default.setUserFlow('secondTimeAttempt', false);
      _cookieComponent2.default.setUserFlow('sliderPristine', false);
      _this.setState({
        bannerProps: bannerProps
      });
    };

    _this.loadingSpinnerToggle = function (show) {
      var spinner = document.getElementById('loading-spinner');
      var wrapper = document.getElementById('app-wrapper');

      if (spinner && show === 'hide') {
        spinner.style.display = 'none';
        wrapper.style.display = 'inherit';
      } else {
        spinner.style.display = 'flex';
        wrapper.style.display = 'none';
      }
    };

    _this.submitDataToApi = function (voteData) {
      var params = _this.state;

      var data = {
        "guid": _cookieComponent2.default.get('guid') ? _cookieComponent2.default.get('guid') : '',
        "vote": _this.voteValue,
        "email": voteData['userEmail'] || '',
        "zip_code": voteData['zipCode'] || '',
        "opt_in": voteData['hotBillSubscribe'] ? 1 : 0 || 0,
        "opt_in_two": voteData['otherLegislationSubscribe'] ? 1 : 0 || 0,
        "bill_id": _this.voteResults.bill['id'] || null
      };

      if (_this.props.match.params.org && _this.props.match.params.zip_code) {
        data.guid = 0;
        data.zip_code = _this.props.match.params.zip_code;
      }

      _axios2.default.post('http://' + _this.ipAddress + '/api/vote', data).then(function (res) {
        _this.voteResults = res.data.results;
        if (res.data.legislators) {
          _this.legislators = res.data.legislators;
        }
        _this.setState({
          activeState: _this.locationCheckForWidget() ? _this.states[4] : _this.states[1]
        });
        _this.loadingSpinnerToggle('hide');
      }).then(function () {

        _cookieComponent2.default.setUserFlow('firstTimeVote', false);

        if (_this.state.isWidget) {
          _cookieComponent2.default.set(_this.state.isWidget, _this.states[1], _this.voteResults);
        } else {
          _cookieComponent2.default.set(_this.state.isWidget, _this.states[1], _this.voteResults);
        }
      }).then(function () {
        _this.setState({
          firstTimeUse: true
        });
      }).catch(function (error) {
        console.log(error);
      });
    };

    _this.receiveDataFromApi = function (slug) {
      slug = slug ? slug : _this.state.org;
      _axios2.default.post('http://' + _this.ipAddress + '/api' + _this.urlCheck(slug).url, _cookieComponent2.default.get('guid') ? _cookieComponent2.default.get('guid') : { guid: '' }).then(function (res) {
        _this.voteResults = res.data.results;
        if (_this.voteResults.legislators) {
          Object.keys(_this.voteResults.legislators).map(function (key) {
            var obj = {};
            obj[key] = _this.voteResults.legislators[key].data;
            _this.legislators.push(obj);
          });
        }
        _this.setState({
          activeState: res.data.page_state || _this.states[0],
          isWidget: _this.locationCheckForWidget(),
          submitCount: 0
        });
        _this.loadingSpinnerToggle('hide');
      }).then(function () {
        if (_this.state.activeState === _this.states[1]) {
          _cookieComponent2.default.setUserFlow('firstTimeVote', false);
          _cookieComponent2.default.setUserFlow('secondTimeAttempt', false);
        } else {
          _cookieComponent2.default.setUserFlow('firstTimeVote', true);
          _cookieComponent2.default.setUserFlow('secondTimeAttempt', false);
        }
      }).catch(function (error) {
        console.log(error);
      });
    };

    _this.submitVote = function (voteData) {
      if (_this.locationCheckForWidget()) {
        window.open('/', '_blank');
      } else {
        if (_cookieComponent2.default.getUserFlow('sliderPristine')) {
          _this.state.submitCount++;
          _cookieComponent2.default.setUserFlow('firstTimeVote', _this.state.submitCount > 0 ? false : true);
          _cookieComponent2.default.setUserFlow('secondTimeAttempt', _this.state.submitCount === 1 ? true : false);
        }
        _this.sliderDebounce = false;
        _this.setState({
          firstTimeUse: _cookieComponent2.default.getUserFlow('firstTimeVote')
        });

        if (_cookieComponent2.default.getUserFlow('firstTimeVote') && _this.state.submitCount > 1 && _this.voteValue === 50) {
          return null;
        } else {
          if (!_cookieComponent2.default.getUserFlow('firstTimeVote') && !_cookieComponent2.default.getUserFlow('secondTimeAttempt')) {
            if (_this.state.activeState === _this.states[1] || voteData['userIsSure']) {
              _this.loadingSpinnerToggle('show');
              _this.submitDataToApi(voteData);
            }
          }
        }
      }
    };

    _this.states = ['vote', 'results', 'revote', 'print', 'widget'];
    _this.voteResults = {};
    _this.legislators = [];
    _this.voteValue = 50;
    _this.sliderDebounce = false;
    _this.ipAddress = '54.201.100.159';
    _this.sampleBG = 'https://static.pexels.com/photos/109919/pexels-photo-109919.jpeg';
    _this.state = {
      bannerProps: 10,
      org: props.match.params.org,
      isWidget: false,
      activeState: _this.states[0],
      firstTimeUse: true,
      secondTimeAttempt: false,
      defaultValue: 50,
      step: 5,
      submitCount: 0,
      exportView: false
    };
    return _this;
  }

  // capture slider data


  _createClass(Ballot, [{
    key: 'componentWillReceiveProps',


    // LIFE CYCLE HOOKS
    value: function componentWillReceiveProps(nextProps) {
      var urlProps = nextProps.match.params.org;
      _cookieComponent2.default.setUserFlow('firstTimeVote', true);
      _cookieComponent2.default.setUserFlow('secondTimeAttempt', false);
      this.voteResults = 50;
      this.receiveDataFromApi(urlProps);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _cookieComponent2.default.setUserFlow('sliderPristine', true);
      _cookieComponent2.default.setUserFlow('firstTimeVote', true);
      _cookieComponent2.default.setUserFlow('secondTimeAttempt', false);
      this.receiveDataFromApi();
    }
  }, {
    key: 'render',
    value: function render() {
      //vote view
      var bill = this.voteResults.bill;
      var submitCount = this.state.submitCount;

      var exportCheck = this.props.match.params.org && this.props.match.params.zipcode;

      if (this.state.activeState === this.states[0] && !exportCheck) {
        if (Object.keys(this.voteResults).length > 0 && this.voteResults.constructor === Object) {
          var _React$createElement;

          return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'ballot__wrapper ' + (this.state.isWidget ? 'widget-view' : '') },
              _react2.default.createElement(_Header2.default, { org: this.voteResults.org }),
              _react2.default.createElement(_BannerComponent2.default, (_React$createElement = {
                ballotInfo: this.voteResults.bill,
                backgroundImg: { url: this.sampleBG },
                callback: this.submitVote,
                firstTimeUse: _cookieComponent2.default.getUserFlow('firstTimeVote'),
                secondAttempt: _cookieComponent2.default.getUserFlow('secondTimeAttempt'),
                defaultValue: this.state.defaultValue,
                bannerProps: this.state.bannerProps
              }, _defineProperty(_React$createElement, 'callback', this.onValueChange), _defineProperty(_React$createElement, 'showSlider', true), _React$createElement)),
              _react2.default.createElement(_VoteForm2.default, {
                firstSubmission: true,
                chamber: bill.chamber,
                callback: this.submitVote,
                firstTimeUse: _cookieComponent2.default.getUserFlow('firstTimeVote'),
                secondAttempt: _cookieComponent2.default.getUserFlow('secondTimeAttempt'),
                copy: ballotCopy,
                debounce: this.sliderDebounce
              }),
              _react2.default.createElement(_MainFooter2.default, null)
            )
          );
        } else {
          return _react2.default.createElement('div', { className: 'ballot__wrapper' });
        }
      }

      //results view
      if (this.state.activeState === this.states[1]) {
        if (Object.keys(this.voteResults).length > 0 && this.voteResults.constructor === Object) {
          var _React$createElement2;

          return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'ballot__wrapper' },
              _react2.default.createElement(_Header2.default, { org: this.voteResults.org }),
              _react2.default.createElement(_BannerComponent2.default, (_React$createElement2 = {
                ballotInfo: this.voteResults.bill,
                backgroundImg: { url: this.sampleBG },
                callback: this.submitVote,
                firstTimeUse: false,
                secondAttempt: false,
                defaultValue: this.state.defaultValue,
                bannerProps: this.state.bannerProps
              }, _defineProperty(_React$createElement2, 'callback', this.onValueChange), _defineProperty(_React$createElement2, 'showSlider', true), _React$createElement2)),
              _react2.default.createElement(_VoteForm2.default, {
                firstSubmission: false,
                chamber: bill.chamber,
                callback: this.submitVote,
                copy: ballotCopy,
                debounce: true
              }),
              _react2.default.createElement(_results2.default, _extends({ resultsTitle: 'Current Constituent Results', toImage: false }, this.voteResults)),
              _react2.default.createElement(_MainFooter2.default, null)
            )
          );
        } else {
          return _react2.default.createElement('div', { className: 'ballot__wrapper' });
        }
      }

      //results resubmit view
      if (this.state.activeState === this.states[2]) {
        if (Object.keys(this.voteResults).length > 0 && this.voteResults.constructor === Object) {
          var _React$createElement3;

          return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'ballot__wrapper' },
              _react2.default.createElement(_Header2.default, { org: this.voteResults.org }),
              _react2.default.createElement(_BannerComponent2.default, (_React$createElement3 = {
                ballotInfo: this.voteResults.bill,
                backgroundImg: { url: this.sampleBG },
                callback: this.submitVote,
                firstTimeUse: _cookieComponent2.default.getUserFlow('firstTimeVote'),
                defaultValue: this.state.defaultValue,
                bannerProps: this.state.bannerProps
              }, _defineProperty(_React$createElement3, 'callback', this.onValueChange), _defineProperty(_React$createElement3, 'showSlider', true), _React$createElement3)),
              _react2.default.createElement(_VoteForm2.default, {
                firstSubmission: false,
                chamber: bill.chamber,
                callback: this.submitVote,
                copy: ballotCopy,
                debounce: true
              }),
              _react2.default.createElement(_results2.default, _extends({ toImage: false }, this.voteResults)),
              _react2.default.createElement(_MainFooter2.default, null)
            )
          );
        } else {
          return _react2.default.createElement('div', { className: 'ballot__wrapper' });
        }
      }

      //results print view
      if (this.state.activeState === this.states[0] && exportCheck) {
        if (Object.keys(this.voteResults).length > 0 && this.voteResults.constructor === Object && this.legislators.length) {
          return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'ballot__wrapper' },
              _react2.default.createElement(
                'div',
                { id: 'delete-results' },
                _react2.default.createElement(
                  'div',
                  { id: 'your-results' },
                  _react2.default.createElement(_results2.default, _extends({
                    resultsTitle: 'Country Results',
                    toImage: true,
                    showDemographics: true
                  }, this.voteResults)),
                  this.legislators.map(function (legislator, index) {
                    var legislatorID = Object.keys(legislator)[0];
                    return _react2.default.createElement(_results2.default, _extends({
                      resultsTitle: 'Current Constituent Results',
                      legislatorsID: legislatorID,
                      id: index,
                      key: index,
                      toImage: true,
                      showDemographics: false
                    }, { bill: { data: legislator[legislatorID] } }));
                  })
                )
              )
            )
          );
        } else {
          return _react2.default.createElement('div', { className: 'ballot__wrapper' });
        }
      } else {
        return _react2.default.createElement(
          'div',
          null,
          ' Something went wrong'
        );
      }
    }
  }]);

  return Ballot;
}(_react2.default.Component);

exports.default = Ballot;

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(134);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(97);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(157);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(161);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(97);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(125);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

  easeOut: function easeOut(duration, property, delay, easeFunction) {
    easeFunction = easeFunction || this.easeOutFunction;

    if (property && Object.prototype.toString.call(property) === '[object Array]') {
      var transitions = '';
      for (var i = 0; i < property.length; i++) {
        if (transitions) transitions += ',';
        transitions += this.create(duration, property[i], delay, easeFunction);
      }

      return transitions;
    } else {
      return this.create(duration, property, delay, easeFunction);
    }
  },
  create: function create(duration, property, delay, easeFunction) {
    duration = duration || '450ms';
    property = property || 'all';
    delay = delay || '0ms';
    easeFunction = easeFunction || 'linear';

    return property + ' ' + duration + ' ' + easeFunction + ' ' + delay;
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(236);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(76)('wks');
var uid = __webpack_require__(64);
var Symbol = __webpack_require__(45).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(45);
var core = __webpack_require__(42);
var ctx = __webpack_require__(70);
var hide = __webpack_require__(49);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(50);
var IE8_DOM_DEFINE = __webpack_require__(90);
var toPrimitive = __webpack_require__(71);
var dP = Object.defineProperty;

exports.f = __webpack_require__(47) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(52)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 48 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(46);
var createDesc = __webpack_require__(58);
module.exports = __webpack_require__(47) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(51);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(93);
var defined = __webpack_require__(73);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Paper = __webpack_require__(185);

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Paper2.default;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shouldUpdate = __webpack_require__(187);

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _shallowEqual = __webpack_require__(66);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _setDisplayName = __webpack_require__(108);

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = __webpack_require__(109);

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pure = function pure(BaseComponent) {
  var hoc = (0, _shouldUpdate2.default)(function (props, nextProps) {
    return !(0, _shallowEqual2.default)(props, nextProps);
  });

  if (process.env.NODE_ENV !== 'production') {
    return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'pure'))(hoc(BaseComponent));
  }

  return hoc(BaseComponent);
};

exports.default = pure;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _SvgIcon = __webpack_require__(190);

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SvgIcon2.default;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedValue;
function getPrefixedValue(prefixedValue, value, keepUnprefixed) {
  if (keepUnprefixed) {
    return [prefixedValue, value];
  }
  return prefixedValue;
}
module.exports = exports["default"];

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(92);
var enumBugKeys = __webpack_require__(77);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(73);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getMuiTheme = __webpack_require__(69);

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MuiThemeProvider = function (_Component) {
  (0, _inherits3.default)(MuiThemeProvider, _Component);

  function MuiThemeProvider() {
    (0, _classCallCheck3.default)(this, MuiThemeProvider);
    return (0, _possibleConstructorReturn3.default)(this, (MuiThemeProvider.__proto__ || (0, _getPrototypeOf2.default)(MuiThemeProvider)).apply(this, arguments));
  }

  (0, _createClass3.default)(MuiThemeProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.props.muiTheme || (0, _getMuiTheme2.default)()
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return MuiThemeProvider;
}(_react.Component);

MuiThemeProvider.childContextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
MuiThemeProvider.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.element,
  muiTheme: _propTypes2.default.object
} : {};
exports.default = MuiThemeProvider;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var red50 = exports.red50 = '#ffebee';
var red100 = exports.red100 = '#ffcdd2';
var red200 = exports.red200 = '#ef9a9a';
var red300 = exports.red300 = '#e57373';
var red400 = exports.red400 = '#ef5350';
var red500 = exports.red500 = '#f44336';
var red600 = exports.red600 = '#e53935';
var red700 = exports.red700 = '#d32f2f';
var red800 = exports.red800 = '#c62828';
var red900 = exports.red900 = '#b71c1c';
var redA100 = exports.redA100 = '#ff8a80';
var redA200 = exports.redA200 = '#ff5252';
var redA400 = exports.redA400 = '#ff1744';
var redA700 = exports.redA700 = '#d50000';

var pink50 = exports.pink50 = '#fce4ec';
var pink100 = exports.pink100 = '#f8bbd0';
var pink200 = exports.pink200 = '#f48fb1';
var pink300 = exports.pink300 = '#f06292';
var pink400 = exports.pink400 = '#ec407a';
var pink500 = exports.pink500 = '#e91e63';
var pink600 = exports.pink600 = '#d81b60';
var pink700 = exports.pink700 = '#c2185b';
var pink800 = exports.pink800 = '#ad1457';
var pink900 = exports.pink900 = '#880e4f';
var pinkA100 = exports.pinkA100 = '#ff80ab';
var pinkA200 = exports.pinkA200 = '#ff4081';
var pinkA400 = exports.pinkA400 = '#f50057';
var pinkA700 = exports.pinkA700 = '#c51162';

var purple50 = exports.purple50 = '#f3e5f5';
var purple100 = exports.purple100 = '#e1bee7';
var purple200 = exports.purple200 = '#ce93d8';
var purple300 = exports.purple300 = '#ba68c8';
var purple400 = exports.purple400 = '#ab47bc';
var purple500 = exports.purple500 = '#9c27b0';
var purple600 = exports.purple600 = '#8e24aa';
var purple700 = exports.purple700 = '#7b1fa2';
var purple800 = exports.purple800 = '#6a1b9a';
var purple900 = exports.purple900 = '#4a148c';
var purpleA100 = exports.purpleA100 = '#ea80fc';
var purpleA200 = exports.purpleA200 = '#e040fb';
var purpleA400 = exports.purpleA400 = '#d500f9';
var purpleA700 = exports.purpleA700 = '#aa00ff';

var deepPurple50 = exports.deepPurple50 = '#ede7f6';
var deepPurple100 = exports.deepPurple100 = '#d1c4e9';
var deepPurple200 = exports.deepPurple200 = '#b39ddb';
var deepPurple300 = exports.deepPurple300 = '#9575cd';
var deepPurple400 = exports.deepPurple400 = '#7e57c2';
var deepPurple500 = exports.deepPurple500 = '#673ab7';
var deepPurple600 = exports.deepPurple600 = '#5e35b1';
var deepPurple700 = exports.deepPurple700 = '#512da8';
var deepPurple800 = exports.deepPurple800 = '#4527a0';
var deepPurple900 = exports.deepPurple900 = '#311b92';
var deepPurpleA100 = exports.deepPurpleA100 = '#b388ff';
var deepPurpleA200 = exports.deepPurpleA200 = '#7c4dff';
var deepPurpleA400 = exports.deepPurpleA400 = '#651fff';
var deepPurpleA700 = exports.deepPurpleA700 = '#6200ea';

var indigo50 = exports.indigo50 = '#e8eaf6';
var indigo100 = exports.indigo100 = '#c5cae9';
var indigo200 = exports.indigo200 = '#9fa8da';
var indigo300 = exports.indigo300 = '#7986cb';
var indigo400 = exports.indigo400 = '#5c6bc0';
var indigo500 = exports.indigo500 = '#3f51b5';
var indigo600 = exports.indigo600 = '#3949ab';
var indigo700 = exports.indigo700 = '#303f9f';
var indigo800 = exports.indigo800 = '#283593';
var indigo900 = exports.indigo900 = '#1a237e';
var indigoA100 = exports.indigoA100 = '#8c9eff';
var indigoA200 = exports.indigoA200 = '#536dfe';
var indigoA400 = exports.indigoA400 = '#3d5afe';
var indigoA700 = exports.indigoA700 = '#304ffe';

var blue50 = exports.blue50 = '#e3f2fd';
var blue100 = exports.blue100 = '#bbdefb';
var blue200 = exports.blue200 = '#90caf9';
var blue300 = exports.blue300 = '#64b5f6';
var blue400 = exports.blue400 = '#42a5f5';
var blue500 = exports.blue500 = '#2196f3';
var blue600 = exports.blue600 = '#1e88e5';
var blue700 = exports.blue700 = '#1976d2';
var blue800 = exports.blue800 = '#1565c0';
var blue900 = exports.blue900 = '#0d47a1';
var blueA100 = exports.blueA100 = '#82b1ff';
var blueA200 = exports.blueA200 = '#448aff';
var blueA400 = exports.blueA400 = '#2979ff';
var blueA700 = exports.blueA700 = '#2962ff';

var lightBlue50 = exports.lightBlue50 = '#e1f5fe';
var lightBlue100 = exports.lightBlue100 = '#b3e5fc';
var lightBlue200 = exports.lightBlue200 = '#81d4fa';
var lightBlue300 = exports.lightBlue300 = '#4fc3f7';
var lightBlue400 = exports.lightBlue400 = '#29b6f6';
var lightBlue500 = exports.lightBlue500 = '#03a9f4';
var lightBlue600 = exports.lightBlue600 = '#039be5';
var lightBlue700 = exports.lightBlue700 = '#0288d1';
var lightBlue800 = exports.lightBlue800 = '#0277bd';
var lightBlue900 = exports.lightBlue900 = '#01579b';
var lightBlueA100 = exports.lightBlueA100 = '#80d8ff';
var lightBlueA200 = exports.lightBlueA200 = '#40c4ff';
var lightBlueA400 = exports.lightBlueA400 = '#00b0ff';
var lightBlueA700 = exports.lightBlueA700 = '#0091ea';

var cyan50 = exports.cyan50 = '#e0f7fa';
var cyan100 = exports.cyan100 = '#b2ebf2';
var cyan200 = exports.cyan200 = '#80deea';
var cyan300 = exports.cyan300 = '#4dd0e1';
var cyan400 = exports.cyan400 = '#26c6da';
var cyan500 = exports.cyan500 = '#00bcd4';
var cyan600 = exports.cyan600 = '#00acc1';
var cyan700 = exports.cyan700 = '#0097a7';
var cyan800 = exports.cyan800 = '#00838f';
var cyan900 = exports.cyan900 = '#006064';
var cyanA100 = exports.cyanA100 = '#84ffff';
var cyanA200 = exports.cyanA200 = '#18ffff';
var cyanA400 = exports.cyanA400 = '#00e5ff';
var cyanA700 = exports.cyanA700 = '#00b8d4';

var teal50 = exports.teal50 = '#e0f2f1';
var teal100 = exports.teal100 = '#b2dfdb';
var teal200 = exports.teal200 = '#80cbc4';
var teal300 = exports.teal300 = '#4db6ac';
var teal400 = exports.teal400 = '#26a69a';
var teal500 = exports.teal500 = '#009688';
var teal600 = exports.teal600 = '#00897b';
var teal700 = exports.teal700 = '#00796b';
var teal800 = exports.teal800 = '#00695c';
var teal900 = exports.teal900 = '#004d40';
var tealA100 = exports.tealA100 = '#a7ffeb';
var tealA200 = exports.tealA200 = '#64ffda';
var tealA400 = exports.tealA400 = '#1de9b6';
var tealA700 = exports.tealA700 = '#00bfa5';

var green50 = exports.green50 = '#e8f5e9';
var green100 = exports.green100 = '#c8e6c9';
var green200 = exports.green200 = '#a5d6a7';
var green300 = exports.green300 = '#81c784';
var green400 = exports.green400 = '#66bb6a';
var green500 = exports.green500 = '#4caf50';
var green600 = exports.green600 = '#43a047';
var green700 = exports.green700 = '#388e3c';
var green800 = exports.green800 = '#2e7d32';
var green900 = exports.green900 = '#1b5e20';
var greenA100 = exports.greenA100 = '#b9f6ca';
var greenA200 = exports.greenA200 = '#69f0ae';
var greenA400 = exports.greenA400 = '#00e676';
var greenA700 = exports.greenA700 = '#00c853';

var lightGreen50 = exports.lightGreen50 = '#f1f8e9';
var lightGreen100 = exports.lightGreen100 = '#dcedc8';
var lightGreen200 = exports.lightGreen200 = '#c5e1a5';
var lightGreen300 = exports.lightGreen300 = '#aed581';
var lightGreen400 = exports.lightGreen400 = '#9ccc65';
var lightGreen500 = exports.lightGreen500 = '#8bc34a';
var lightGreen600 = exports.lightGreen600 = '#7cb342';
var lightGreen700 = exports.lightGreen700 = '#689f38';
var lightGreen800 = exports.lightGreen800 = '#558b2f';
var lightGreen900 = exports.lightGreen900 = '#33691e';
var lightGreenA100 = exports.lightGreenA100 = '#ccff90';
var lightGreenA200 = exports.lightGreenA200 = '#b2ff59';
var lightGreenA400 = exports.lightGreenA400 = '#76ff03';
var lightGreenA700 = exports.lightGreenA700 = '#64dd17';

var lime50 = exports.lime50 = '#f9fbe7';
var lime100 = exports.lime100 = '#f0f4c3';
var lime200 = exports.lime200 = '#e6ee9c';
var lime300 = exports.lime300 = '#dce775';
var lime400 = exports.lime400 = '#d4e157';
var lime500 = exports.lime500 = '#cddc39';
var lime600 = exports.lime600 = '#c0ca33';
var lime700 = exports.lime700 = '#afb42b';
var lime800 = exports.lime800 = '#9e9d24';
var lime900 = exports.lime900 = '#827717';
var limeA100 = exports.limeA100 = '#f4ff81';
var limeA200 = exports.limeA200 = '#eeff41';
var limeA400 = exports.limeA400 = '#c6ff00';
var limeA700 = exports.limeA700 = '#aeea00';

var yellow50 = exports.yellow50 = '#fffde7';
var yellow100 = exports.yellow100 = '#fff9c4';
var yellow200 = exports.yellow200 = '#fff59d';
var yellow300 = exports.yellow300 = '#fff176';
var yellow400 = exports.yellow400 = '#ffee58';
var yellow500 = exports.yellow500 = '#ffeb3b';
var yellow600 = exports.yellow600 = '#fdd835';
var yellow700 = exports.yellow700 = '#fbc02d';
var yellow800 = exports.yellow800 = '#f9a825';
var yellow900 = exports.yellow900 = '#f57f17';
var yellowA100 = exports.yellowA100 = '#ffff8d';
var yellowA200 = exports.yellowA200 = '#ffff00';
var yellowA400 = exports.yellowA400 = '#ffea00';
var yellowA700 = exports.yellowA700 = '#ffd600';

var amber50 = exports.amber50 = '#fff8e1';
var amber100 = exports.amber100 = '#ffecb3';
var amber200 = exports.amber200 = '#ffe082';
var amber300 = exports.amber300 = '#ffd54f';
var amber400 = exports.amber400 = '#ffca28';
var amber500 = exports.amber500 = '#ffc107';
var amber600 = exports.amber600 = '#ffb300';
var amber700 = exports.amber700 = '#ffa000';
var amber800 = exports.amber800 = '#ff8f00';
var amber900 = exports.amber900 = '#ff6f00';
var amberA100 = exports.amberA100 = '#ffe57f';
var amberA200 = exports.amberA200 = '#ffd740';
var amberA400 = exports.amberA400 = '#ffc400';
var amberA700 = exports.amberA700 = '#ffab00';

var orange50 = exports.orange50 = '#fff3e0';
var orange100 = exports.orange100 = '#ffe0b2';
var orange200 = exports.orange200 = '#ffcc80';
var orange300 = exports.orange300 = '#ffb74d';
var orange400 = exports.orange400 = '#ffa726';
var orange500 = exports.orange500 = '#ff9800';
var orange600 = exports.orange600 = '#fb8c00';
var orange700 = exports.orange700 = '#f57c00';
var orange800 = exports.orange800 = '#ef6c00';
var orange900 = exports.orange900 = '#e65100';
var orangeA100 = exports.orangeA100 = '#ffd180';
var orangeA200 = exports.orangeA200 = '#ffab40';
var orangeA400 = exports.orangeA400 = '#ff9100';
var orangeA700 = exports.orangeA700 = '#ff6d00';

var deepOrange50 = exports.deepOrange50 = '#fbe9e7';
var deepOrange100 = exports.deepOrange100 = '#ffccbc';
var deepOrange200 = exports.deepOrange200 = '#ffab91';
var deepOrange300 = exports.deepOrange300 = '#ff8a65';
var deepOrange400 = exports.deepOrange400 = '#ff7043';
var deepOrange500 = exports.deepOrange500 = '#ff5722';
var deepOrange600 = exports.deepOrange600 = '#f4511e';
var deepOrange700 = exports.deepOrange700 = '#e64a19';
var deepOrange800 = exports.deepOrange800 = '#d84315';
var deepOrange900 = exports.deepOrange900 = '#bf360c';
var deepOrangeA100 = exports.deepOrangeA100 = '#ff9e80';
var deepOrangeA200 = exports.deepOrangeA200 = '#ff6e40';
var deepOrangeA400 = exports.deepOrangeA400 = '#ff3d00';
var deepOrangeA700 = exports.deepOrangeA700 = '#dd2c00';

var brown50 = exports.brown50 = '#efebe9';
var brown100 = exports.brown100 = '#d7ccc8';
var brown200 = exports.brown200 = '#bcaaa4';
var brown300 = exports.brown300 = '#a1887f';
var brown400 = exports.brown400 = '#8d6e63';
var brown500 = exports.brown500 = '#795548';
var brown600 = exports.brown600 = '#6d4c41';
var brown700 = exports.brown700 = '#5d4037';
var brown800 = exports.brown800 = '#4e342e';
var brown900 = exports.brown900 = '#3e2723';

var blueGrey50 = exports.blueGrey50 = '#eceff1';
var blueGrey100 = exports.blueGrey100 = '#cfd8dc';
var blueGrey200 = exports.blueGrey200 = '#b0bec5';
var blueGrey300 = exports.blueGrey300 = '#90a4ae';
var blueGrey400 = exports.blueGrey400 = '#78909c';
var blueGrey500 = exports.blueGrey500 = '#607d8b';
var blueGrey600 = exports.blueGrey600 = '#546e7a';
var blueGrey700 = exports.blueGrey700 = '#455a64';
var blueGrey800 = exports.blueGrey800 = '#37474f';
var blueGrey900 = exports.blueGrey900 = '#263238';

var grey50 = exports.grey50 = '#fafafa';
var grey100 = exports.grey100 = '#f5f5f5';
var grey200 = exports.grey200 = '#eeeeee';
var grey300 = exports.grey300 = '#e0e0e0';
var grey400 = exports.grey400 = '#bdbdbd';
var grey500 = exports.grey500 = '#9e9e9e';
var grey600 = exports.grey600 = '#757575';
var grey700 = exports.grey700 = '#616161';
var grey800 = exports.grey800 = '#424242';
var grey900 = exports.grey900 = '#212121';

var black = exports.black = '#000000';
var white = exports.white = '#ffffff';

var transparent = exports.transparent = 'rgba(0, 0, 0, 0)';
var fullBlack = exports.fullBlack = 'rgba(0, 0, 0, 1)';
var darkBlack = exports.darkBlack = 'rgba(0, 0, 0, 0.87)';
var lightBlack = exports.lightBlack = 'rgba(0, 0, 0, 0.54)';
var minBlack = exports.minBlack = 'rgba(0, 0, 0, 0.26)';
var faintBlack = exports.faintBlack = 'rgba(0, 0, 0, 0.12)';
var fullWhite = exports.fullWhite = 'rgba(255, 255, 255, 1)';
var darkWhite = exports.darkWhite = 'rgba(255, 255, 255, 0.87)';
var lightWhite = exports.lightWhite = 'rgba(255, 255, 255, 0.54)';

/***/ }),
/* 64 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shallowEqual = __webpack_require__(164);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _shallowEqual2.default;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertColorToString = convertColorToString;
exports.convertHexToRGB = convertHexToRGB;
exports.decomposeColor = decomposeColor;
exports.getContrastRatio = getContrastRatio;
exports.getLuminance = getLuminance;
exports.emphasize = emphasize;
exports.fade = fade;
exports.darken = darken;
exports.lighten = lighten;

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

/**
 * Converts a color object with type and values to a string.
 *
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of, 'rgb', 'rgba', 'hsl', 'hsla'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
function convertColorToString(color) {
  var type = color.type,
      values = color.values;


  if (type.indexOf('rgb') > -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    for (var i = 0; i < 3; i++) {
      values[i] = parseInt(values[i]);
    }
  }

  var colorString = void 0;

  if (type.indexOf('hsl') > -1) {
    colorString = color.type + '(' + values[0] + ', ' + values[1] + '%, ' + values[2] + '%';
  } else {
    colorString = color.type + '(' + values[0] + ', ' + values[1] + ', ' + values[2];
  }

  if (values.length === 4) {
    colorString += ', ' + color.values[3] + ')';
  } else {
    colorString += ')';
  }

  return colorString;
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 *  @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 *  @returns {string} A CSS rgb color string
 */
function convertHexToRGB(color) {
  if (color.length === 4) {
    var extendedColor = '#';
    for (var i = 1; i < color.length; i++) {
      extendedColor += color.charAt(i) + color.charAt(i);
    }
    color = extendedColor;
  }

  var values = {
    r: parseInt(color.substr(1, 2), 16),
    g: parseInt(color.substr(3, 2), 16),
    b: parseInt(color.substr(5, 2), 16)
  };

  return 'rgb(' + values.r + ', ' + values.g + ', ' + values.b + ')';
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values and color names.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {{type: string, values: number[]}} A MUI color object
 */
function decomposeColor(color) {
  if (color.charAt(0) === '#') {
    return decomposeColor(convertHexToRGB(color));
  }

  var marker = color.indexOf('(');

  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(marker !== -1, 'Material-UI: The ' + color + ' color was not parsed correctly,\n  because it has an unsupported format (color name or RGB %). This may cause issues in component rendering.') : void 0;

  var type = color.substring(0, marker);
  var values = color.substring(marker + 1, color.length - 1).split(',');
  values = values.map(function (value) {
    return parseFloat(value);
  });

  return { type: type, values: values };
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 *
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21 with 2 digit precision.
 */
function getContrastRatio(foreground, background) {
  var lumA = getLuminance(foreground);
  var lumB = getLuminance(background);
  var contrastRatio = (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);

  return Number(contrastRatio.toFixed(2)); // Truncate at two digits
}

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
function getLuminance(color) {
  color = decomposeColor(color);

  if (color.type.indexOf('rgb') > -1) {
    var rgb = color.values.map(function (val) {
      val /= 255; // normalized
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3)); // Truncate at 3 digits
  } else if (color.type.indexOf('hsl') > -1) {
    return color.values[2] / 100;
  }
}

/**
 * Darken or lighten a colour, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function emphasize(color) {
  var coefficient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.15;

  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} value - value to set the alpha channel to in the range 0 -1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function fade(color, value) {
  color = decomposeColor(color);
  value = clamp(value, 0, 1);

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }
  color.values[3] = value;

  return convertColorToString(color);
}

/**
 * Darkens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function darken(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient, 0, 1);

  if (color.type.indexOf('hsl') > -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') > -1) {
    for (var i = 0; i < 3; i++) {
      color.values[i] *= 1 - coefficient;
    }
  }
  return convertColorToString(color);
}

/**
 * Lightens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function lighten(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient, 0, 1);

  if (color.type.indexOf('hsl') > -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf('rgb') > -1) {
    for (var i = 0; i < 3; i++) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  }

  return convertColorToString(color);
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _events = __webpack_require__(194);

var _events2 = _interopRequireDefault(_events);

var _keycode = __webpack_require__(16);

var _keycode2 = _interopRequireDefault(_keycode);

var _FocusRipple = __webpack_require__(103);

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

var _TouchRipple = __webpack_require__(104);

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleInjected = false;
var listening = false;
var tabPressed = false;

function injectStyle() {
  if (!styleInjected) {
    // Remove inner padding and border in Firefox 4+.
    var style = document.createElement('style');
    style.innerHTML = '\n      button::-moz-focus-inner,\n      input::-moz-focus-inner {\n        border: 0;\n        padding: 0;\n      }\n    ';

    document.body.appendChild(style);
    styleInjected = true;
  }
}

function listenForTabPresses() {
  if (!listening) {
    _events2.default.on(window, 'keydown', function (event) {
      tabPressed = (0, _keycode2.default)(event) === 'tab';
    });
    listening = true;
  }
}

var EnhancedButton = function (_Component) {
  (0, _inherits3.default)(EnhancedButton, _Component);

  function EnhancedButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, EnhancedButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EnhancedButton.__proto__ || (0, _getPrototypeOf2.default)(EnhancedButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isKeyboardFocused: false
    }, _this.handleKeyDown = function (event) {
      if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
        if ((0, _keycode2.default)(event) === 'enter' && _this.state.isKeyboardFocused) {
          _this.handleClick(event);
        }
        if ((0, _keycode2.default)(event) === 'esc' && _this.state.isKeyboardFocused) {
          _this.removeKeyboardFocus(event);
        }
      }
      _this.props.onKeyDown(event);
    }, _this.handleKeyUp = function (event) {
      if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
        if ((0, _keycode2.default)(event) === 'space' && _this.state.isKeyboardFocused) {
          _this.handleClick(event);
        }
      }
      _this.props.onKeyUp(event);
    }, _this.handleBlur = function (event) {
      _this.cancelFocusTimeout();
      _this.removeKeyboardFocus(event);
      _this.props.onBlur(event);
    }, _this.handleFocus = function (event) {
      if (event) event.persist();
      if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
        // setTimeout is needed because the focus event fires first
        // Wait so that we can capture if this was a keyboard focus
        // or touch focus
        _this.focusTimeout = setTimeout(function () {
          if (tabPressed) {
            _this.setKeyboardFocus(event);
            tabPressed = false;
          }
        }, 150);

        _this.props.onFocus(event);
      }
    }, _this.handleClick = function (event) {
      _this.cancelFocusTimeout();
      if (!_this.props.disabled) {
        tabPressed = false;
        _this.removeKeyboardFocus(event);
        _this.props.onClick(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(EnhancedButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          disabled = _props.disabled,
          disableKeyboardFocus = _props.disableKeyboardFocus,
          keyboardFocused = _props.keyboardFocused;

      if (!disabled && keyboardFocused && !disableKeyboardFocus) {
        this.setState({ isKeyboardFocused: true });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      injectStyle();
      listenForTabPresses();
      if (this.state.isKeyboardFocused) {
        this.button.focus();
        this.props.onKeyboardFocus(null, true);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((nextProps.disabled || nextProps.disableKeyboardFocus) && this.state.isKeyboardFocused) {
        this.setState({ isKeyboardFocused: false });
        if (nextProps.onKeyboardFocus) {
          nextProps.onKeyboardFocus(null, false);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.focusTimeout) {
        clearTimeout(this.focusTimeout);
      }
    }
  }, {
    key: 'isKeyboardFocused',
    value: function isKeyboardFocused() {
      return this.state.isKeyboardFocused;
    }
  }, {
    key: 'removeKeyboardFocus',
    value: function removeKeyboardFocus(event) {
      if (this.state.isKeyboardFocused) {
        this.setState({ isKeyboardFocused: false });
        this.props.onKeyboardFocus(event, false);
      }
    }
  }, {
    key: 'setKeyboardFocus',
    value: function setKeyboardFocus(event) {
      if (!this.state.isKeyboardFocused) {
        this.setState({ isKeyboardFocused: true });
        this.props.onKeyboardFocus(event, true);
      }
    }
  }, {
    key: 'cancelFocusTimeout',
    value: function cancelFocusTimeout() {
      if (this.focusTimeout) {
        clearTimeout(this.focusTimeout);
        this.focusTimeout = null;
      }
    }
  }, {
    key: 'createButtonChildren',
    value: function createButtonChildren() {
      var _props2 = this.props,
          centerRipple = _props2.centerRipple,
          children = _props2.children,
          disabled = _props2.disabled,
          disableFocusRipple = _props2.disableFocusRipple,
          disableKeyboardFocus = _props2.disableKeyboardFocus,
          disableTouchRipple = _props2.disableTouchRipple,
          focusRippleColor = _props2.focusRippleColor,
          focusRippleOpacity = _props2.focusRippleOpacity,
          touchRippleColor = _props2.touchRippleColor,
          touchRippleOpacity = _props2.touchRippleOpacity;
      var isKeyboardFocused = this.state.isKeyboardFocused;

      // Focus Ripple

      var focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? _react2.default.createElement(_FocusRipple2.default, {
        color: focusRippleColor,
        opacity: focusRippleOpacity,
        show: isKeyboardFocused,
        style: {
          overflow: 'hidden'
        },
        key: 'focusRipple'
      }) : undefined;

      // Touch Ripple
      var touchRipple = !disabled && !disableTouchRipple ? _react2.default.createElement(
        _TouchRipple2.default,
        {
          centerRipple: centerRipple,
          color: touchRippleColor,
          opacity: touchRippleOpacity,
          key: 'touchRipple'
        },
        children
      ) : undefined;

      return [focusRipple, touchRipple, touchRipple ? undefined : children];
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          centerRipple = _props3.centerRipple,
          children = _props3.children,
          containerElement = _props3.containerElement,
          disabled = _props3.disabled,
          disableFocusRipple = _props3.disableFocusRipple,
          disableKeyboardFocus = _props3.disableKeyboardFocus,
          disableTouchRipple = _props3.disableTouchRipple,
          focusRippleColor = _props3.focusRippleColor,
          focusRippleOpacity = _props3.focusRippleOpacity,
          href = _props3.href,
          keyboardFocused = _props3.keyboardFocused,
          touchRippleColor = _props3.touchRippleColor,
          touchRippleOpacity = _props3.touchRippleOpacity,
          onBlur = _props3.onBlur,
          onClick = _props3.onClick,
          onFocus = _props3.onFocus,
          onKeyUp = _props3.onKeyUp,
          onKeyDown = _props3.onKeyDown,
          onKeyboardFocus = _props3.onKeyboardFocus,
          style = _props3.style,
          tabIndex = _props3.tabIndex,
          type = _props3.type,
          other = (0, _objectWithoutProperties3.default)(_props3, ['centerRipple', 'children', 'containerElement', 'disabled', 'disableFocusRipple', 'disableKeyboardFocus', 'disableTouchRipple', 'focusRippleColor', 'focusRippleOpacity', 'href', 'keyboardFocused', 'touchRippleColor', 'touchRippleOpacity', 'onBlur', 'onClick', 'onFocus', 'onKeyUp', 'onKeyDown', 'onKeyboardFocus', 'style', 'tabIndex', 'type']);
      var _context$muiTheme = this.context.muiTheme,
          prepareStyles = _context$muiTheme.prepareStyles,
          enhancedButton = _context$muiTheme.enhancedButton;


      var mergedStyles = (0, _simpleAssign2.default)({
        border: 10,
        boxSizing: 'border-box',
        display: 'inline-block',
        fontFamily: this.context.muiTheme.baseTheme.fontFamily,
        WebkitTapHighlightColor: enhancedButton.tapHighlightColor, // Remove mobile color flashing (deprecated)
        cursor: disabled ? 'default' : 'pointer',
        textDecoration: 'none',
        margin: 0,
        padding: 0,
        outline: 'none',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        position: 'relative', // This is needed so that ripples do not bleed past border radius.
        verticalAlign: href ? 'middle' : null
      }, style);

      // Passing both background:none & backgroundColor can break due to object iteration order
      if (!mergedStyles.backgroundColor && !mergedStyles.background) {
        mergedStyles.background = 'none';
      }

      if (disabled && href) {
        return _react2.default.createElement(
          'span',
          (0, _extends3.default)({}, other, {
            style: mergedStyles
          }),
          children
        );
      }

      var buttonProps = (0, _extends3.default)({}, other, {
        style: prepareStyles(mergedStyles),
        ref: function ref(node) {
          return _this2.button = node;
        },
        disabled: disabled,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyUp: this.handleKeyUp,
        onKeyDown: this.handleKeyDown,
        onClick: this.handleClick,
        tabIndex: disabled || disableKeyboardFocus ? -1 : tabIndex
      });

      if (href) buttonProps.href = href;

      var buttonChildren = this.createButtonChildren();

      if (_react2.default.isValidElement(containerElement)) {
        return _react2.default.cloneElement(containerElement, buttonProps, buttonChildren);
      }

      if (!href && containerElement === 'button') {
        buttonProps.type = type;
      }

      return _react2.default.createElement(href ? 'a' : containerElement, buttonProps, buttonChildren);
    }
  }]);
  return EnhancedButton;
}(_react.Component);

EnhancedButton.defaultProps = {
  containerElement: 'button',
  onBlur: function onBlur() {},
  onClick: function onClick() {},
  onFocus: function onFocus() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {},
  onKeyboardFocus: function onKeyboardFocus() {},
  tabIndex: 0,
  type: 'button'
};
EnhancedButton.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
EnhancedButton.propTypes = process.env.NODE_ENV !== "production" ? {
  centerRipple: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  containerElement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  disableFocusRipple: _propTypes2.default.bool,
  disableKeyboardFocus: _propTypes2.default.bool,
  disableTouchRipple: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  focusRippleColor: _propTypes2.default.string,
  focusRippleOpacity: _propTypes2.default.number,
  href: _propTypes2.default.string,
  keyboardFocused: _propTypes2.default.bool,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onKeyboardFocus: _propTypes2.default.func,
  style: _propTypes2.default.object,
  tabIndex: _propTypes2.default.number,
  touchRippleColor: _propTypes2.default.string,
  touchRippleOpacity: _propTypes2.default.number,
  type: _propTypes2.default.string
} : {};
exports.default = EnhancedButton;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(105);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = getMuiTheme;

var _lodash = __webpack_require__(23);

var _lodash2 = _interopRequireDefault(_lodash);

var _colorManipulator = __webpack_require__(67);

var _lightBaseTheme = __webpack_require__(195);

var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

var _zIndex = __webpack_require__(197);

var _zIndex2 = _interopRequireDefault(_zIndex);

var _autoprefixer = __webpack_require__(198);

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _callOnce = __webpack_require__(220);

var _callOnce2 = _interopRequireDefault(_callOnce);

var _rtl = __webpack_require__(221);

var _rtl2 = _interopRequireDefault(_rtl);

var _compose = __webpack_require__(224);

var _compose2 = _interopRequireDefault(_compose);

var _typography = __webpack_require__(225);

var _typography2 = _interopRequireDefault(_typography);

var _colors = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the MUI theme corresponding to a base theme.
 * It's possible to override the computed theme values
 * by providing a second argument. The calculated
 * theme will be deeply merged with the second argument.
 */
function getMuiTheme(muiTheme) {
  for (var _len = arguments.length, more = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    more[_key - 1] = arguments[_key];
  }

  muiTheme = _lodash2.default.apply(undefined, [{
    zIndex: _zIndex2.default,
    isRtl: false,
    userAgent: undefined
  }, _lightBaseTheme2.default, muiTheme].concat(more));

  var _muiTheme = muiTheme,
      spacing = _muiTheme.spacing,
      fontFamily = _muiTheme.fontFamily,
      palette = _muiTheme.palette;

  var baseTheme = { spacing: spacing, fontFamily: fontFamily, palette: palette };

  muiTheme = (0, _lodash2.default)({
    appBar: {
      color: palette.primary1Color,
      textColor: palette.alternateTextColor,
      height: spacing.desktopKeylineIncrement,
      titleFontWeight: _typography2.default.fontWeightNormal,
      padding: spacing.desktopGutter
    },
    avatar: {
      color: palette.canvasColor,
      backgroundColor: (0, _colorManipulator.emphasize)(palette.canvasColor, 0.26)
    },
    badge: {
      color: palette.alternateTextColor,
      textColor: palette.textColor,
      primaryColor: palette.primary1Color,
      primaryTextColor: palette.alternateTextColor,
      secondaryColor: palette.accent1Color,
      secondaryTextColor: palette.alternateTextColor,
      fontWeight: _typography2.default.fontWeightMedium
    },
    bottomNavigation: {
      backgroundColor: palette.canvasColor,
      unselectedColor: (0, _colorManipulator.fade)(palette.textColor, 0.54),
      selectedColor: palette.primary1Color,
      height: 56,
      unselectedFontSize: 12,
      selectedFontSize: 14
    },
    button: {
      height: 36,
      minWidth: 88,
      iconButtonSize: spacing.iconSize * 2
    },
    card: {
      titleColor: (0, _colorManipulator.fade)(palette.textColor, 0.87),
      subtitleColor: (0, _colorManipulator.fade)(palette.textColor, 0.54),
      fontWeight: _typography2.default.fontWeightMedium
    },
    cardMedia: {
      color: _colors.darkWhite,
      overlayContentBackground: _colors.lightBlack,
      titleColor: _colors.darkWhite,
      subtitleColor: _colors.lightWhite
    },
    cardText: {
      textColor: palette.textColor
    },
    checkbox: {
      boxColor: palette.textColor,
      checkedColor: palette.primary1Color,
      requiredColor: palette.primary1Color,
      disabledColor: palette.disabledColor,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor
    },
    chip: {
      backgroundColor: (0, _colorManipulator.emphasize)(palette.canvasColor, 0.12),
      deleteIconColor: (0, _colorManipulator.fade)(palette.textColor, 0.26),
      textColor: (0, _colorManipulator.fade)(palette.textColor, 0.87),
      fontSize: 14,
      fontWeight: _typography2.default.fontWeightNormal,
      shadow: '0 1px 6px ' + (0, _colorManipulator.fade)(palette.shadowColor, 0.12) + ',\n        0 1px 4px ' + (0, _colorManipulator.fade)(palette.shadowColor, 0.12)
    },
    datePicker: {
      color: palette.primary1Color,
      textColor: palette.alternateTextColor,
      calendarTextColor: palette.textColor,
      selectColor: palette.primary2Color,
      selectTextColor: palette.alternateTextColor,
      calendarYearBackgroundColor: palette.canvasColor,
      headerColor: palette.pickerHeaderColor || palette.primary1Color
    },
    dialog: {
      titleFontSize: 22,
      bodyFontSize: 16,
      bodyColor: (0, _colorManipulator.fade)(palette.textColor, 0.6)
    },
    dropDownMenu: {
      accentColor: palette.borderColor
    },
    enhancedButton: {
      tapHighlightColor: _colors.transparent
    },
    flatButton: {
      color: _colors.transparent,
      buttonFilterColor: '#999999',
      disabledTextColor: (0, _colorManipulator.fade)(palette.textColor, 0.3),
      textColor: palette.textColor,
      primaryTextColor: palette.primary1Color,
      secondaryTextColor: palette.accent1Color,
      fontSize: _typography2.default.fontStyleButtonFontSize,
      fontWeight: _typography2.default.fontWeightMedium
    },
    floatingActionButton: {
      buttonSize: 56,
      miniSize: 40,
      color: palette.primary1Color,
      iconColor: palette.alternateTextColor,
      secondaryColor: palette.accent1Color,
      secondaryIconColor: palette.alternateTextColor,
      disabledTextColor: palette.disabledColor,
      disabledColor: (0, _colorManipulator.emphasize)(palette.canvasColor, 0.12)
    },
    gridTile: {
      textColor: _colors.white
    },
    icon: {
      color: palette.canvasColor,
      backgroundColor: palette.primary1Color
    },
    inkBar: {
      backgroundColor: palette.accent1Color
    },
    drawer: {
      width: spacing.desktopKeylineIncrement * 4,
      color: palette.canvasColor
    },
    listItem: {
      nestedLevelDepth: 18,
      secondaryTextColor: palette.secondaryTextColor,
      leftIconColor: _colors.grey600,
      rightIconColor: _colors.grey600
    },
    menu: {
      backgroundColor: palette.canvasColor,
      containerBackgroundColor: palette.canvasColor
    },
    menuItem: {
      dataHeight: 32,
      height: 48,
      hoverColor: (0, _colorManipulator.fade)(palette.textColor, 0.1),
      padding: spacing.desktopGutter,
      selectedTextColor: palette.accent1Color,
      rightIconDesktopFill: _colors.grey600
    },
    menuSubheader: {
      padding: spacing.desktopGutter,
      borderColor: palette.borderColor,
      textColor: palette.primary1Color
    },
    overlay: {
      backgroundColor: _colors.lightBlack
    },
    paper: {
      color: palette.textColor,
      backgroundColor: palette.canvasColor,
      zDepthShadows: [[1, 6, 0.12, 1, 4, 0.12], [3, 10, 0.16, 3, 10, 0.23], [10, 30, 0.19, 6, 10, 0.23], [14, 45, 0.25, 10, 18, 0.22], [19, 60, 0.30, 15, 20, 0.22]].map(function (d) {
        return '0 ' + d[0] + 'px ' + d[1] + 'px ' + (0, _colorManipulator.fade)(palette.shadowColor, d[2]) + ',\n         0 ' + d[3] + 'px ' + d[4] + 'px ' + (0, _colorManipulator.fade)(palette.shadowColor, d[5]);
      })
    },
    radioButton: {
      borderColor: palette.textColor,
      backgroundColor: palette.alternateTextColor,
      checkedColor: palette.primary1Color,
      requiredColor: palette.primary1Color,
      disabledColor: palette.disabledColor,
      size: 24,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor
    },
    raisedButton: {
      color: palette.alternateTextColor,
      textColor: palette.textColor,
      primaryColor: palette.primary1Color,
      primaryTextColor: palette.alternateTextColor,
      secondaryColor: palette.accent1Color,
      secondaryTextColor: palette.alternateTextColor,
      disabledColor: (0, _colorManipulator.darken)(palette.alternateTextColor, 0.1),
      disabledTextColor: (0, _colorManipulator.fade)(palette.textColor, 0.3),
      fontSize: _typography2.default.fontStyleButtonFontSize,
      fontWeight: _typography2.default.fontWeightMedium
    },
    refreshIndicator: {
      strokeColor: palette.borderColor,
      loadingStrokeColor: palette.primary1Color
    },
    ripple: {
      color: (0, _colorManipulator.fade)(palette.textColor, 0.87)
    },
    slider: {
      trackSize: 2,
      trackColor: palette.primary3Color,
      trackColorSelected: palette.accent3Color,
      handleSize: 12,
      handleSizeDisabled: 8,
      handleSizeActive: 18,
      handleColorZero: palette.primary3Color,
      handleFillColor: palette.alternateTextColor,
      selectionColor: palette.primary1Color,
      rippleColor: palette.primary1Color
    },
    snackbar: {
      textColor: palette.alternateTextColor,
      backgroundColor: palette.textColor,
      actionColor: palette.accent1Color
    },
    subheader: {
      color: (0, _colorManipulator.fade)(palette.textColor, 0.54),
      fontWeight: _typography2.default.fontWeightMedium
    },
    stepper: {
      backgroundColor: 'transparent',
      hoverBackgroundColor: (0, _colorManipulator.fade)(_colors.black, 0.06),
      iconColor: palette.primary1Color,
      hoveredIconColor: _colors.grey700,
      inactiveIconColor: _colors.grey500,
      textColor: (0, _colorManipulator.fade)(_colors.black, 0.87),
      disabledTextColor: (0, _colorManipulator.fade)(_colors.black, 0.26),
      connectorLineColor: _colors.grey400
    },
    svgIcon: {
      color: palette.textColor
    },
    table: {
      backgroundColor: palette.canvasColor
    },
    tableFooter: {
      borderColor: palette.borderColor,
      textColor: palette.accent3Color
    },
    tableHeader: {
      borderColor: palette.borderColor
    },
    tableHeaderColumn: {
      textColor: palette.accent3Color,
      height: 56,
      spacing: 24
    },
    tableRow: {
      hoverColor: palette.accent2Color,
      stripeColor: (0, _colorManipulator.fade)((0, _colorManipulator.lighten)(palette.primary1Color, 0.5), 0.4),
      selectedColor: palette.borderColor,
      textColor: palette.textColor,
      borderColor: palette.borderColor,
      height: 48
    },
    tableRowColumn: {
      height: 48,
      spacing: 24
    },
    tabs: {
      backgroundColor: palette.primary1Color,
      textColor: (0, _colorManipulator.fade)(palette.alternateTextColor, 0.7),
      selectedTextColor: palette.alternateTextColor
    },
    textField: {
      textColor: palette.textColor,
      hintColor: palette.disabledColor,
      floatingLabelColor: palette.disabledColor,
      disabledTextColor: palette.disabledColor,
      errorColor: _colors.red500,
      focusColor: palette.primary1Color,
      backgroundColor: 'transparent',
      borderColor: palette.borderColor
    },
    timePicker: {
      color: palette.alternateTextColor,
      textColor: palette.alternateTextColor,
      accentColor: palette.primary1Color,
      clockColor: palette.textColor,
      clockCircleColor: palette.clockCircleColor,
      headerColor: palette.pickerHeaderColor || palette.primary1Color,
      selectColor: palette.primary2Color,
      selectTextColor: palette.alternateTextColor
    },
    toggle: {
      thumbOnColor: palette.primary1Color,
      thumbOffColor: palette.accent2Color,
      thumbDisabledColor: palette.borderColor,
      thumbRequiredColor: palette.primary1Color,
      trackOnColor: (0, _colorManipulator.fade)(palette.primary1Color, 0.5),
      trackOffColor: palette.primary3Color,
      trackDisabledColor: palette.primary3Color,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor,
      trackRequiredColor: (0, _colorManipulator.fade)(palette.primary1Color, 0.5)
    },
    toolbar: {
      color: (0, _colorManipulator.fade)(palette.textColor, 0.54),
      hoverColor: (0, _colorManipulator.fade)(palette.textColor, 0.87),
      backgroundColor: (0, _colorManipulator.darken)(palette.accent2Color, 0.05),
      height: 56,
      titleFontSize: 20,
      iconColor: (0, _colorManipulator.fade)(palette.textColor, 0.4),
      separatorColor: (0, _colorManipulator.fade)(palette.textColor, 0.175),
      menuHoverColor: (0, _colorManipulator.fade)(palette.textColor, 0.1)
    },
    tooltip: {
      color: _colors.white,
      rippleBackgroundColor: _colors.grey700,
      opacity: 0.9
    }
  }, muiTheme, {
    baseTheme: baseTheme, // To provide backward compatibility.
    rawTheme: baseTheme // To provide backward compatibility.
  });

  var transformers = [_autoprefixer2.default, _rtl2.default, _callOnce2.default].map(function (t) {
    return t(muiTheme);
  }).filter(function (t) {
    return t;
  });

  muiTheme.prepareStyles = _compose2.default.apply(undefined, (0, _toConsumableArray3.default)(transformers));

  return muiTheme;
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(128);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(51);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(76)('keys');
var uid = __webpack_require__(64);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(45);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 78 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(50);
var dPs = __webpack_require__(141);
var enumBugKeys = __webpack_require__(77);
var IE_PROTO = __webpack_require__(75)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(91)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(142).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(46).f;
var has = __webpack_require__(48);
var TAG = __webpack_require__(43)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(43);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(45);
var core = __webpack_require__(42);
var LIBRARY = __webpack_require__(79);
var wksExt = __webpack_require__(82);
var defineProperty = __webpack_require__(46).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  set: function set(style, key, value) {
    style[key] = value;
  }
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chainFunction = __webpack_require__(22);

var _chainFunction2 = _interopRequireDefault(_chainFunction);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

var _ChildMapping = __webpack_require__(173);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  component: _propTypes2.default.any,
  childFactory: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  component: 'span',
  childFactory: function childFactory(child) {
    return child;
  }
};

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.performAppear = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key, component));
      } else {
        _this._handleDoneAppearing(key, component);
      }
    };

    _this._handleDoneAppearing = function (key, component) {
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully appeared. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performEnter = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key, component));
      } else {
        _this._handleDoneEntering(key, component);
      }
    };

    _this._handleDoneEntering = function (key, component) {
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully entered. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performLeave = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key, component));
      } else {
        // Note that this is somewhat dangerous b/c it calls setState()
        // again, effectively mutating the component before all the work
        // is done.
        _this._handleDoneLeaving(key, component);
      }
    };

    _this._handleDoneLeaving = function (key, component) {
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        // This entered again before it fully left. Add it again.
        _this.keysToEnter.push(key);
      } else {
        _this.setState(function (state) {
          var newChildren = _extends({}, state.children);
          delete newChildren[key];
          return { children: newChildren };
        });
      }
    };

    _this.childRefs = Object.create(null);

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children)
    };
    return _this;
  }

  TransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key, this.childRefs[key]);
      }
    }
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);
    var prevChildMapping = this.state.children;

    this.setState({
      children: (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping)
    });

    for (var key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (var _key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(_key);
      if (prevChildMapping[_key] && !hasNext && !this.currentlyTransitioningKeys[_key]) {
        this.keysToLeave.push(_key);
      }
    }

    // If we want to someday check for reordering, we could do it here.
  };

  TransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(function (key) {
      return _this2.performEnter(key, _this2.childRefs[key]);
    });

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(function (key) {
      return _this2.performLeave(key, _this2.childRefs[key]);
    });
  };

  TransitionGroup.prototype.render = function render() {
    var _this3 = this;

    // TODO: we could get rid of the need for the wrapper node
    // by cloning a single child
    var childrenToRender = [];

    var _loop = function _loop(key) {
      var child = _this3.state.children[key];
      if (child) {
        var isCallbackRef = typeof child.ref !== 'string';
        var factoryChild = _this3.props.childFactory(child);
        var ref = function ref(r) {
          _this3.childRefs[key] = r;
        };

        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(isCallbackRef, 'string refs are not supported on children of TransitionGroup and will be ignored. ' + 'Please use a callback ref instead: https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute') : void 0;

        // Always chaining the refs leads to problems when the childFactory
        // wraps the child. The child ref callback gets called twice with the
        // wrapper and the child. So we only need to chain the ref if the
        // factoryChild is not different from child.
        if (factoryChild === child && isCallbackRef) {
          ref = (0, _chainFunction2.default)(child.ref, ref);
        }

        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(_react2.default.cloneElement(factoryChild, {
          key: key,
          ref: ref
        }));
      }
    };

    for (var key in this.state.children) {
      _loop(key);
    }

    // Do not forward TransitionGroup props to primitive DOM nodes
    var props = _extends({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return _react2.default.createElement(this.props.component, props, childrenToRender);
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.displayName = 'TransitionGroup';


TransitionGroup.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var horizontal = _propTypes2.default.oneOf(['left', 'middle', 'right']);
var vertical = _propTypes2.default.oneOf(['top', 'center', 'bottom']);

exports.default = {

  corners: _propTypes2.default.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),

  horizontal: horizontal,

  vertical: vertical,

  origin: _propTypes2.default.shape({
    horizontal: horizontal,
    vertical: vertical
  }),

  cornersAndCenter: _propTypes2.default.oneOf(['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right']),

  stringOrNumber: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  zDepth: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5])

};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeString;
function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = exports["default"];

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;
var regex = /-webkit-|-moz-|-ms-/;

function isPrefixedValue(value) {
  return typeof value === 'string' && regex.test(value);
}
module.exports = exports['default'];

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TextField = __webpack_require__(123);

var _TextField2 = _interopRequireDefault(_TextField);

var _Checkbox = __webpack_require__(169);

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _RaisedButton = __webpack_require__(192);

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _MuiThemeProvider = __webpack_require__(62);

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = __webpack_require__(69);

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _Dialog = __webpack_require__(226);

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = __webpack_require__(115);

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formValidation = __webpack_require__(233);

var _formValidation2 = _interopRequireDefault(_formValidation);

var _colors = __webpack_require__(63);

var _voteForm = __webpack_require__(234);

var _voteForm2 = _interopRequireDefault(_voteForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoteForm = function (_React$Component) {
  _inherits(VoteForm, _React$Component);

  function VoteForm(props) {
    _classCallCheck(this, VoteForm);

    var _this = _possibleConstructorReturn(this, (VoteForm.__proto__ || Object.getPrototypeOf(VoteForm)).call(this, props));

    _this.submitThruModal = function () {
      if (_this.state.modalOpen) {
        _this.submitData({ userIsSure: true });
        _this.handleClose();
      }
    };

    _this.submitThruForm = function () {
      _this.setState({
        isDirty: true
      });
      if (_this.state.email_isValid && _this.state.zip_isValid) {
        _this.submitData({ userIsSure: true });
      } else {
        _this.submitData({ userIsSure: false });
      }
    };

    _this.submitData = function (param) {
      var dataSet = {
        userEmail: _this.state.userEmail,
        zipCode: _this.state.zipCode,
        otherLegislationSubscribe: _this.state.otherLegislationSubscribe,
        hotBillSubscribe: _this.state.hotBillSubscribe,
        userIsSure: param.userIsSure ? param.userIsSure : false
        //hack to rerender
      };_this.props.callback(dataSet);
      _this.forceUpdate();
    };

    _this.handleClose = function () {
      _this.setState({
        modalOpen: false
      });
    };

    _this.state = {
      userEmail: _this.props.userEmail,
      zipCode: _this.props.zipCode,
      otherLegislationSubscribe: _this.props.otherLegislationSubscribe,
      hotBillSubscribe: _this.props.hotBillSubscribe,
      email_isValid: _this.props.email_isValid,
      zip_isValid: _this.props.zip_isValid,
      emailLimit: _this.props.emailLimit,
      vote_isValid: _this.props.vote_isValid,
      defaultValue: _this.props.defaultValue,
      modalOpen: _this.props.modalOpen,
      isDirty: false
    };
    return _this;
  }

  _createClass(VoteForm, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.debounce) {
        if (!this.state.modalOpen && !nextProps.firstTimeUse && !nextProps.secondAttempt) {
          if (!this.state.email_isValid || !this.state.zip_isValid) {
            this.setState({ modalOpen: true });
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = {
        checkbox: {
          marginBottom: 0
        },
        errorStyle: {
          color: _colors.green500
        },
        labelStyle: {
          fontSize: '12px',
          lineHeight: '18px',
          fontStyle: 'italic'
        },
        iconStyle: {
          marginRight: '10px',
          fill: 'rgb(0, 76, 135)'
        },
        buttonStyle: {
          height: '50px'
        },
        buttonLabelStyle: {
          fontSize: '18px',
          margin: '20px',
          lineHeight: '50px',
          textTransform: 'capitalized',
          fontStyle: 'italic'
        }
      };

      var actions = [_react2.default.createElement(_FlatButton2.default, {
        label: 'Go Back',
        style: {
          color: 'rgb(0, 76, 135)'
        },
        primary: true,
        onClick: this.handleClose
      }), _react2.default.createElement(_RaisedButton2.default, {
        buttonStyle: {
          backgroundColor: 'rgb(0, 76, 135)'
        },
        label: 'No Thanks, Continue',
        primary: true,
        onClick: this.submitThruModal
      })];

      return _react2.default.createElement(
        _MuiThemeProvider2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'vote__form' },
          _react2.default.createElement(
            _Dialog2.default,
            {
              title: this.props.copy.validationTitle,
              titleStyle: {
                textTransform: 'uppercase'
              },
              actions: actions,
              modal: false,
              open: this.state.modalOpen,
              onRequestClose: this.handleClose
            },
            this.props.copy['validationPartOne'] + ' ' + ('' + (!this.state.email_isValid ? 'Email ' : '')) + ('' + (!this.state.email_isValid && !this.state.zip_isValid ? ' or ' : '')) + ('' + (!this.state.zip_isValid ? 'Zip Code ' : '')) + ('' + this.props.copy['validationPartTwo'])
          ),
          this.props.firstSubmission ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'vote__form--notice' },
              this.props.copy.formNotice
            ),
            _react2.default.createElement(
              'div',
              { className: 'vote__form--text-input' },
              _react2.default.createElement(_TextField2.default, {
                hintText: 'Email Address',
                errorText: this.props.copy['emailInput' + this.props.chamber],
                errorStyle: styles.errorStyle,
                onChange: function onChange(event, newValue) {
                  if (_formValidation2.default.emailValidation(newValue, _this2.state.emailLimit)) {
                    _this2.setState({
                      email_isValid: true,
                      userEmail: newValue
                    });
                  } else {
                    _this2.setState({
                      email_isValid: false,
                      userEmail: ''
                    });
                  }
                }
              }),
              _react2.default.createElement('br', null),
              _react2.default.createElement(_TextField2.default, {
                hintText: 'Zip Code',
                errorText: this.props.copy['zipCodeInput' + this.props.chamber],
                errorStyle: styles.errorStyle,
                onChange: function onChange(event, newValue) {
                  if (_formValidation2.default.zipCodeValidation(newValue)) {
                    _this2.setState({
                      zip_isValid: true,
                      zipCode: newValue
                    });
                  } else {
                    _this2.setState({
                      zip_isValid: false,
                      zipCode: ''
                    });
                  }
                }
              }),
              _react2.default.createElement('br', null)
            )
          ) : null,
          _react2.default.createElement(
            'div',
            { className: 'vote__form--subscribe ' + (this.props.firstSubmission ? '' : 'resubmit') + '\n            ' },
            _react2.default.createElement(
              'div',
              { className: 'vote__form--subscribe--input' },
              _react2.default.createElement(
                'div',
                { className: 'vote__form--subscribe--input-title' },
                _react2.default.createElement(
                  'span',
                  null,
                  this.props.copy.subscribeToHotBillTitle
                )
              ),
              _react2.default.createElement(_Checkbox2.default, {
                iconStyle: styles.iconStyle,
                label: this.props.copy.subscribeToHotBill,
                labelStyle: styles.labelStyle,
                style: styles.checkbox,
                onCheck: function onCheck(event, checked) {
                  if (checked) {
                    _this2.setState({
                      hotBillSubscribe: true
                    });
                  } else {
                    _this2.setState({
                      hotBillSubscribe: false
                    });
                  }
                }
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'vote__form--subscribe--input' },
              _react2.default.createElement(
                'div',
                { className: 'vote__form--subscribe--input-title' },
                _react2.default.createElement(
                  'span',
                  null,
                  this.props.copy.subscribeToOtherLegislationInfoTitle
                )
              ),
              _react2.default.createElement(_Checkbox2.default, {
                iconStyle: styles.iconStyle,
                label: this.props.copy.subscribeToOtherLegislationInfo,
                labelStyle: styles.labelStyle,
                style: styles.checkbox,
                inputStyle: {
                  color: 'rgb(0, 76, 135)'
                },
                onCheck: function onCheck(event, checked) {
                  if (checked) {
                    _this2.setState({
                      otherLegislationSubscribe: true
                    });
                  } else {
                    _this2.setState({
                      otherLegislationSubscribe: false
                    });
                  }
                }
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'vote__form--submit' },
            _react2.default.createElement(_RaisedButton2.default, {
              label: this.props.copy.submissionCTA,
              primary: true,
              labelStyle: styles.buttonLabelStyle,
              style: styles.buttonStyle,
              onClick: this.submitThruForm
            })
          )
        )
      );
    }
  }]);

  return VoteForm;
}(_react2.default.Component);

VoteForm.propTypes = {
  userEmail: _propTypes2.default.string,
  zipCode: _propTypes2.default.string,
  otherLegislationSubscribe: _propTypes2.default.bool,
  hotBillSubscribe: _propTypes2.default.bool,
  zip_isValid: _propTypes2.default.bool,
  email_isValid: _propTypes2.default.bool,
  emailLimit: _propTypes2.default.number,
  vote_isValid: _propTypes2.default.bool,
  defaultValue: _propTypes2.default.number,
  modalOpen: _propTypes2.default.bool,
  userIsSure: _propTypes2.default.bool
};
VoteForm.defaultProps = {
  userEmail: '',
  zipCode: '',
  otherLegislationSubscribe: false,
  hotBillSubscribe: false,
  email_isValid: false,
  zip_isValid: false,
  emailLimit: 64,
  vote_isValid: false,
  defaultValue: 50,
  modalOpen: false
};
exports.default = VoteForm;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(47) && !__webpack_require__(52)(function () {
  return Object.defineProperty(__webpack_require__(91)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(51);
var document = __webpack_require__(45).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(48);
var toIObject = __webpack_require__(53);
var arrayIndexOf = __webpack_require__(130)(false);
var IE_PROTO = __webpack_require__(75)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(72);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(74);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(48);
var toObject = __webpack_require__(60);
var IE_PROTO = __webpack_require__(75)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(44);
var core = __webpack_require__(42);
var fails = __webpack_require__(52);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(137);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(147);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(139)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(99)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(79);
var $export = __webpack_require__(44);
var redefine = __webpack_require__(100);
var hide = __webpack_require__(49);
var has = __webpack_require__(48);
var Iterators = __webpack_require__(61);
var $iterCreate = __webpack_require__(140);
var setToStringTag = __webpack_require__(81);
var getPrototypeOf = __webpack_require__(95);
var ITERATOR = __webpack_require__(43)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(49);


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(92);
var hiddenKeys = __webpack_require__(77).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(65);
var createDesc = __webpack_require__(58);
var toIObject = __webpack_require__(53);
var toPrimitive = __webpack_require__(71);
var has = __webpack_require__(48);
var IE8_DOM_DEFINE = __webpack_require__(90);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(47) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _shallowEqual = __webpack_require__(66);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _autoPrefix = __webpack_require__(84);

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

var _ScaleIn = __webpack_require__(172);

var _ScaleIn2 = _interopRequireDefault(_ScaleIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pulsateDuration = 750;

var FocusRipple = function (_Component) {
  (0, _inherits3.default)(FocusRipple, _Component);

  function FocusRipple() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FocusRipple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FocusRipple.__proto__ || (0, _getPrototypeOf2.default)(FocusRipple)).call.apply(_ref, [this].concat(args))), _this), _this.pulsate = function () {
      var innerCircle = _reactDom2.default.findDOMNode(_this.refs.innerCircle);
      if (!innerCircle) return;

      var startScale = 'scale(1)';
      var endScale = 'scale(0.85)';
      var currentScale = innerCircle.style.transform || startScale;
      var nextScale = currentScale === startScale ? endScale : startScale;

      _autoPrefix2.default.set(innerCircle.style, 'transform', nextScale);
      _this.timeout = setTimeout(_this.pulsate, pulsateDuration);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FocusRipple, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.show) {
        this.setRippleSize();
        this.pulsate();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.show) {
        this.setRippleSize();
        this.pulsate();
      } else {
        if (this.timeout) clearTimeout(this.timeout);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'getRippleElement',
    value: function getRippleElement(props) {
      var color = props.color,
          innerStyle = props.innerStyle,
          opacity = props.opacity;
      var _context$muiTheme = this.context.muiTheme,
          prepareStyles = _context$muiTheme.prepareStyles,
          ripple = _context$muiTheme.ripple;


      var innerStyles = (0, _simpleAssign2.default)({
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        opacity: opacity ? opacity : 0.16,
        backgroundColor: color || ripple.color,
        transition: _transitions2.default.easeOut(pulsateDuration + 'ms', 'transform', null, _transitions2.default.easeInOutFunction)
      }, innerStyle);

      return _react2.default.createElement('div', { ref: 'innerCircle', style: prepareStyles((0, _simpleAssign2.default)({}, innerStyles)) });
    }
  }, {
    key: 'setRippleSize',
    value: function setRippleSize() {
      var el = _reactDom2.default.findDOMNode(this.refs.innerCircle);
      var height = el.offsetHeight;
      var width = el.offsetWidth;
      var size = Math.max(height, width);

      var oldTop = 0;
      // For browsers that don't support endsWith()
      if (el.style.top.indexOf('px', el.style.top.length - 2) !== -1) {
        oldTop = parseInt(el.style.top);
      }
      el.style.height = size + 'px';
      el.style.top = height / 2 - size / 2 + oldTop + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          show = _props.show,
          style = _props.style;


      var mergedRootStyles = (0, _simpleAssign2.default)({
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }, style);

      var ripple = show ? this.getRippleElement(this.props) : null;

      return _react2.default.createElement(
        _ScaleIn2.default,
        {
          maxScale: 0.85,
          style: mergedRootStyles
        },
        ripple
      );
    }
  }]);
  return FocusRipple;
}(_react.Component);

FocusRipple.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
FocusRipple.propTypes = process.env.NODE_ENV !== "production" ? {
  color: _propTypes2.default.string,
  innerStyle: _propTypes2.default.object,
  opacity: _propTypes2.default.number,
  show: _propTypes2.default.bool,
  style: _propTypes2.default.object
} : {};
exports.default = FocusRipple;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(105);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _toArray2 = __webpack_require__(183);

var _toArray3 = _interopRequireDefault(_toArray2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TransitionGroup = __webpack_require__(85);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _dom = __webpack_require__(107);

var _dom2 = _interopRequireDefault(_dom);

var _CircleRipple = __webpack_require__(184);

var _CircleRipple2 = _interopRequireDefault(_CircleRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Remove the first element of the array
var shift = function shift(_ref) {
  var _ref2 = (0, _toArray3.default)(_ref),
      newArray = _ref2.slice(1);

  return newArray;
};

var TouchRipple = function (_Component) {
  (0, _inherits3.default)(TouchRipple, _Component);

  function TouchRipple(props, context) {
    (0, _classCallCheck3.default)(this, TouchRipple);

    // Touch start produces a mouse down event for compat reasons. To avoid
    // showing ripples twice we skip showing a ripple for the first mouse down
    // after a touch start. Note we don't store ignoreNextMouseDown in this.state
    // to avoid re-rendering when we change it.
    var _this = (0, _possibleConstructorReturn3.default)(this, (TouchRipple.__proto__ || (0, _getPrototypeOf2.default)(TouchRipple)).call(this, props, context));

    _this.handleMouseDown = function (event) {
      // only listen to left clicks
      if (event.button === 0) {
        _this.start(event, false);
      }
    };

    _this.handleMouseUp = function () {
      _this.end();
    };

    _this.handleMouseLeave = function () {
      _this.end();
    };

    _this.handleTouchStart = function (event) {
      event.stopPropagation();
      // If the user is swiping (not just tapping), save the position so we can
      // abort ripples if the user appears to be scrolling.
      if (_this.props.abortOnScroll && event.touches) {
        _this.startListeningForScrollAbort(event);
        _this.startTime = Date.now();
      }
      _this.start(event, true);
    };

    _this.handleTouchEnd = function () {
      _this.end();
    };

    _this.handleTouchMove = function (event) {
      // Stop trying to abort if we're already 300ms into the animation
      var timeSinceStart = Math.abs(Date.now() - _this.startTime);
      if (timeSinceStart > 300) {
        _this.stopListeningForScrollAbort();
        return;
      }

      // If the user is scrolling...
      var deltaY = Math.abs(event.touches[0].clientY - _this.firstTouchY);
      var deltaX = Math.abs(event.touches[0].clientX - _this.firstTouchX);
      // Call it a scroll after an arbitrary 6px (feels reasonable in testing)
      if (deltaY > 6 || deltaX > 6) {
        var currentRipples = _this.state.ripples;
        var ripple = currentRipples[0];
        // This clone will replace the ripple in ReactTransitionGroup with a
        // version that will disappear immediately when removed from the DOM
        var abortedRipple = _react2.default.cloneElement(ripple, { aborted: true });
        // Remove the old ripple and replace it with the new updated one
        currentRipples = shift(currentRipples);
        currentRipples = [].concat((0, _toConsumableArray3.default)(currentRipples), [abortedRipple]);
        _this.setState({ ripples: currentRipples }, function () {
          // Call end after we've set the ripple to abort otherwise the setState
          // in end() merges with this and the ripple abort fails
          _this.end();
        });
      }
    };

    _this.ignoreNextMouseDown = false;

    _this.state = {
      // This prop allows us to only render the ReactTransitionGroup
      // on the first click of the component, making the inital render faster.
      hasRipples: false,
      nextKey: 0,
      ripples: []
    };
    return _this;
  }

  (0, _createClass3.default)(TouchRipple, [{
    key: 'start',
    value: function start(event, isRippleTouchGenerated) {
      var theme = this.context.muiTheme.ripple;

      if (this.ignoreNextMouseDown && !isRippleTouchGenerated) {
        this.ignoreNextMouseDown = false;
        return;
      }

      var ripples = this.state.ripples;

      // Add a ripple to the ripples array
      ripples = [].concat((0, _toConsumableArray3.default)(ripples), [_react2.default.createElement(_CircleRipple2.default, {
        key: this.state.nextKey,
        style: !this.props.centerRipple ? this.getRippleStyle(event) : {},
        color: this.props.color || theme.color,
        opacity: this.props.opacity,
        touchGenerated: isRippleTouchGenerated
      })]);

      this.ignoreNextMouseDown = isRippleTouchGenerated;
      this.setState({
        hasRipples: true,
        nextKey: this.state.nextKey + 1,
        ripples: ripples
      });
    }
  }, {
    key: 'end',
    value: function end() {
      var currentRipples = this.state.ripples;
      this.setState({
        ripples: shift(currentRipples)
      });
      if (this.props.abortOnScroll) {
        this.stopListeningForScrollAbort();
      }
    }

    // Check if the user seems to be scrolling and abort the animation if so

  }, {
    key: 'startListeningForScrollAbort',
    value: function startListeningForScrollAbort(event) {
      this.firstTouchY = event.touches[0].clientY;
      this.firstTouchX = event.touches[0].clientX;
      // Note that when scolling Chrome throttles this event to every 200ms
      // Also note we don't listen for scroll events directly as there's no general
      // way to cover cases like scrolling within containers on the page
      document.body.addEventListener('touchmove', this.handleTouchMove);
    }
  }, {
    key: 'stopListeningForScrollAbort',
    value: function stopListeningForScrollAbort() {
      document.body.removeEventListener('touchmove', this.handleTouchMove);
    }
  }, {
    key: 'getRippleStyle',
    value: function getRippleStyle(event) {
      var el = _reactDom2.default.findDOMNode(this);
      var elHeight = el.offsetHeight;
      var elWidth = el.offsetWidth;
      var offset = _dom2.default.offset(el);
      var isTouchEvent = event.touches && event.touches.length;
      var pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
      var pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
      var pointerX = pageX - offset.left;
      var pointerY = pageY - offset.top;
      var topLeftDiag = this.calcDiag(pointerX, pointerY);
      var topRightDiag = this.calcDiag(elWidth - pointerX, pointerY);
      var botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY);
      var botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY);
      var rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
      var rippleSize = rippleRadius * 2;
      var left = pointerX - rippleRadius;
      var top = pointerY - rippleRadius;

      return {
        directionInvariant: true,
        height: rippleSize,
        width: rippleSize,
        top: top,
        left: left
      };
    }
  }, {
    key: 'calcDiag',
    value: function calcDiag(a, b) {
      return Math.sqrt(a * a + b * b);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          style = _props.style;
      var _state = this.state,
          hasRipples = _state.hasRipples,
          ripples = _state.ripples;
      var prepareStyles = this.context.muiTheme.prepareStyles;


      var rippleGroup = void 0;

      if (hasRipples) {
        var mergedStyles = (0, _simpleAssign2.default)({
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1 // This is also needed so that ripples do not bleed past a parent border radius.
        }, style);

        rippleGroup = _react2.default.createElement(
          _TransitionGroup2.default,
          { style: prepareStyles(mergedStyles) },
          ripples
        );
      }

      return _react2.default.createElement(
        'div',
        {
          onMouseUp: this.handleMouseUp,
          onMouseDown: this.handleMouseDown,
          onMouseLeave: this.handleMouseLeave,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        },
        rippleGroup,
        children
      );
    }
  }]);
  return TouchRipple;
}(_react.Component);

TouchRipple.defaultProps = {
  abortOnScroll: true
};
TouchRipple.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
TouchRipple.propTypes = process.env.NODE_ENV !== "production" ? {
  abortOnScroll: _propTypes2.default.bool,
  centerRipple: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  color: _propTypes2.default.string,
  opacity: _propTypes2.default.number,
  style: _propTypes2.default.object
} : {};
exports.default = TouchRipple;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(106);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(175), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  isDescendant: function isDescendant(parent, child) {
    var node = child.parentNode;

    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }

    return false;
  },
  offset: function offset(el) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  }
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setStatic = __webpack_require__(188);

var _setStatic2 = _interopRequireDefault(_setStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setDisplayName = function setDisplayName(displayName) {
  return (0, _setStatic2.default)('displayName', displayName);
};

exports.default = setDisplayName;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getDisplayName = __webpack_require__(189);

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + '(' + (0, _getDisplayName2.default)(BaseComponent) + ')';
};

exports.default = wrapDisplayName;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixValue;
function prefixValue(plugins, property, value, style, metaData) {
  for (var i = 0, len = plugins.length; i < len; ++i) {
    var processedValue = plugins[i](property, value, style, metaData);

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    if (processedValue) {
      return processedValue;
    }
  }
}
module.exports = exports["default"];

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addNewValuesOnly;
function addIfNew(list, value) {
  if (list.indexOf(value) === -1) {
    list.push(value);
  }
}

function addNewValuesOnly(list, values) {
  if (Array.isArray(values)) {
    for (var i = 0, len = values.length; i < len; ++i) {
      addIfNew(list, values[i]);
    }
  } else {
    addIfNew(list, values);
  }
}
module.exports = exports["default"];

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
function isObject(value) {
  return value instanceof Object && !Array.isArray(value);
}
module.exports = exports["default"];

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;

var _hyphenateStyleName = __webpack_require__(25);

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(222), __esModule: true };

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _FlatButton = __webpack_require__(231);

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FlatButton2.default;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = __webpack_require__(62);

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = __webpack_require__(69);

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _AppBar = __webpack_require__(237);

var _AppBar2 = _interopRequireDefault(_AppBar);

var _logoComponent = __webpack_require__(245);

var _logoComponent2 = _interopRequireDefault(_logoComponent);

var _classnames = __webpack_require__(17);

var _classnames2 = _interopRequireDefault(_classnames);

var _header = __webpack_require__(246);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var styles = {
        appBar: {
          minHeight: '100px',
          backgroundColor: '#f5f5f5',
          paddingLeft: '80px',
          paddingRight: '80px'
        },
        appBarTitle: {
          color: 'black',
          whiteSpace: 'normal',
          textOverflow: 'initial',
          maxWidth: '200px',
          lineHeight: '30px',
          fontSize: '20px',
          marginTop: '20px'
        },
        appBarIconLeft: {
          display: 'inherit',
          maxWidth: '80px',
          minWidth: '300px'
        },
        appBarIconRight: {
          maxHeight: '100px',
          marginRight: '0'
        }
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _MuiThemeProvider2.default,
          null,
          _react2.default.createElement(_AppBar2.default, {
            className: 'header rep-me-logo',
            iconElementLeft: _react2.default.createElement(_logoComponent2.default, null),
            iconElementRight: _react2.default.createElement('img', { style: { maxHeight: '100%' }, src: this.props.org.image || '', alt: this.props.org.name + ' Logo' }),
            style: styles.appBar,
            titleStyle: styles.appBarTitle,
            iconStyleLeft: styles.appBarIconLeft,
            iconStyleRight: styles.appBarIconRight
          })
        )
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

exports.default = Header;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _IconButton = __webpack_require__(239);

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _IconButton2.default;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = __webpack_require__(62);

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = __webpack_require__(69);

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _Card = __webpack_require__(248);

var _FlatButton = __webpack_require__(115);

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _classnames = __webpack_require__(17);

var _classnames2 = _interopRequireDefault(_classnames);

var _HorizontalSlider = __webpack_require__(259);

var _HorizontalSlider2 = _interopRequireDefault(_HorizontalSlider);

var _DataComponent = __webpack_require__(269);

var _DataComponent2 = _interopRequireDefault(_DataComponent);

var _star = __webpack_require__(270);

var _star2 = _interopRequireDefault(_star);

var _colors = __webpack_require__(63);

var _bannerComponent = __webpack_require__(271);

var _bannerComponent2 = _interopRequireDefault(_bannerComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Banner = function (_React$Component) {
  _inherits(Banner, _React$Component);

  function Banner(props) {
    _classCallCheck(this, Banner);

    var _this = _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).call(this, props));

    _this.styleForOverlay = {
      width: '100%',
      height: '100%'
    };

    _this.getFormattedData = function () {
      var dataLabels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

      return {
        dataLabels: dataLabels
      };
    };

    _this.state = {
      max: 100,
      defaultValue: _this.props.defaultValue,
      ballotNumber: null,
      ballotTitle: null,
      ballotContent: null,
      ballotClosingDate: null,
      bannerProps: props.bannerProps
    };
    return _this;
  }

  _createClass(Banner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props && this.props.ballotInfo) {
        this.setState({
          ballotNumber: this.props.ballotInfo.number,
          ballotTitle: this.props.ballotInfo.title,
          ballotContent: this.props.ballotInfo.description,
          ballotClosingDate: this.props.ballotInfo.closing_date
        });
      }
      this.forceUpdate();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.bannerProps !== nextProps.bannerProps;
    }
  }, {
    key: 'render',
    value: function render() {
      var overflowCheck = false;
      var firstTimeUseClassCheck = this.props.firstTimeUse || this.props.secondAttempt ? 'overlay first-time-use' : 'slider__color--stop-' + this.props.bannerProps;
      var styles = {
        cardMedia: {
          maxHeight: '500px',
          minHeight: '500px',
          overflow: 'hidden',
          backgroundImage: 'url(' + this.props.backgroundImg.url + ')',
          backgroundSize: 'cover'
        },
        starIcon: _colors.grey50
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _MuiThemeProvider2.default,
          null,
          _react2.default.createElement(
            _Card.Card,
            null,
            _react2.default.createElement(
              _Card.CardMedia,
              {
                mediaStyle: styles.cardMedia,
                overlay: _react2.default.createElement(
                  'div',
                  {
                    className: (0, _classnames2.default)('' + firstTimeUseClassCheck)
                  },
                  _react2.default.createElement(
                    'div',
                    { className: 'overlay-content' },
                    _react2.default.createElement(
                      'div',
                      { className: 'main' },
                      _react2.default.createElement(
                        'div',
                        { className: 'icon' },
                        _react2.default.createElement(_star2.default, { color: styleMedia.starIcon })
                      ),
                      _react2.default.createElement(
                        'span',
                        { className: 'bill-number' },
                        this.state.ballotNumber
                      ),
                      _react2.default.createElement(
                        'h1',
                        { ref: function ref(elem) {
                            return null;
                          } },
                        this.state.ballotTitle || null
                      ),
                      _react2.default.createElement(
                        'span',
                        { className: 'closing-date'
                        },
                        'Ballot Closing Date:\u2003',
                        _react2.default.createElement(_DataComponent2.default, {
                          data: this.state.ballotClosingDate || null,
                          type: 'date'
                        })
                      )
                    ),
                    _react2.default.createElement('div', { className: 'divider ' + (this.state.ballotContent ? 'hide' : '') }),
                    _react2.default.createElement('div', { className: 'subtitle',
                      dangerouslySetInnerHTML: { __html: this.state.ballotContent || null } })
                  )
                ),
                overlayContainerStyle: this.styleForOverlay,
                overlayContentStyle: this.styleForOverlay
              },
              _react2.default.createElement('div', null)
            )
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          this.props.showSlider ? _react2.default.createElement(
            'div',
            { className: 'slider--horizontal' },
            _react2.default.createElement(_HorizontalSlider2.default, {
              max: this.state.max,
              defaultValue: this.state.defaultValue,
              callback: this.props.callback,
              firstTimeUse: this.props.firstTimeUse,
              secondAttempt: this.props.secondAttempt,
              labels: this.getFormattedData().dataLabels
            })
          ) : null
        )
      );
    }
  }]);

  return Banner;
}(_react2.default.Component);

exports.default = Banner;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _keyboardArrowUp = __webpack_require__(250);

var _keyboardArrowUp2 = _interopRequireDefault(_keyboardArrowUp);

var _keyboardArrowDown = __webpack_require__(251);

var _keyboardArrowDown2 = _interopRequireDefault(_keyboardArrowDown);

var _IconButton = __webpack_require__(117);

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles() {
  return {
    root: {
      top: 0,
      bottom: 0,
      right: 4,
      margin: 'auto',
      position: 'absolute'
    }
  };
}

var CardExpandable = function (_Component) {
  (0, _inherits3.default)(CardExpandable, _Component);

  function CardExpandable() {
    (0, _classCallCheck3.default)(this, CardExpandable);
    return (0, _possibleConstructorReturn3.default)(this, (CardExpandable.__proto__ || (0, _getPrototypeOf2.default)(CardExpandable)).apply(this, arguments));
  }

  (0, _createClass3.default)(CardExpandable, [{
    key: 'render',
    value: function render() {
      var styles = getStyles(this.props, this.context);

      return _react2.default.createElement(
        _IconButton2.default,
        {
          style: (0, _simpleAssign2.default)(styles.root, this.props.style),
          onClick: this.props.onExpanding,
          iconStyle: this.props.iconStyle
        },
        this.props.expanded ? this.props.openIcon : this.props.closeIcon
      );
    }
  }]);
  return CardExpandable;
}(_react.Component);

CardExpandable.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
CardExpandable.defaultProps = {
  closeIcon: _react2.default.createElement(_keyboardArrowDown2.default, null),
  openIcon: _react2.default.createElement(_keyboardArrowUp2.default, null)
};
CardExpandable.propTypes = process.env.NODE_ENV !== "production" ? {
  closeIcon: _propTypes2.default.node,
  expanded: _propTypes2.default.bool,
  iconStyle: _propTypes2.default.object,
  onExpanding: _propTypes2.default.func.isRequired,
  openIcon: _propTypes2.default.node,
  style: _propTypes2.default.object
} : {};
exports.default = CardExpandable;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _chartLabelComponent = __webpack_require__(263);

var _chartLabelComponent2 = _interopRequireDefault(_chartLabelComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartLabelComponent = function (_React$Component) {
  _inherits(ChartLabelComponent, _React$Component);

  function ChartLabelComponent(props) {
    _classCallCheck(this, ChartLabelComponent);

    return _possibleConstructorReturn(this, (ChartLabelComponent.__proto__ || Object.getPrototypeOf(ChartLabelComponent)).call(this, props));
  }

  _createClass(ChartLabelComponent, [{
    key: 'render',
    value: function render() {
      var labels = [];
      var keys = Object.keys(this.props);
      if (_typeof(this.props) === 'object') {
        for (var key in this.props) {
          if (this.props.hasOwnProperty(key)) {
            var prop = this.props[key];
            if (prop.length > 0) {
              labels.push(_react2.default.createElement(
                'div',
                { key: key },
                _react2.default.createElement(
                  'span',
                  null,
                  prop
                )
              ));
            }
          }
        }
      }
      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: 'vote-labels' },
        labels
      );
    }
  }]);

  return ChartLabelComponent;
}(_react2.default.Component);

exports.default = ChartLabelComponent;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = __webpack_require__(62);

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _BottomNavigation = __webpack_require__(273);

var _logoComponentFooter = __webpack_require__(276);

var _logoComponentFooter2 = _interopRequireDefault(_logoComponentFooter);

var _mainFooter = __webpack_require__(277);

var _mainFooter2 = _interopRequireDefault(_mainFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainFooter = function (_React$Component) {
  _inherits(MainFooter, _React$Component);

  function MainFooter(props) {
    _classCallCheck(this, MainFooter);

    var _this = _possibleConstructorReturn(this, (MainFooter.__proto__ || Object.getPrototypeOf(MainFooter)).call(this, props));

    _this.state = {
      nav: [{
        name: 'facebook',
        path: 'ion-social-facebook',
        callback: function callback() {
          window.open('https://www.facebook.com/representmeplease', '_blank');
        }
      }, {
        name: 'twitter',
        path: 'ion-social-twitter'
      }, {
        name: 'linkedin',
        path: 'ion-social-linkedin'
      }, {
        name: 'google',
        path: 'ion-social-googleplus'
      }, {
        name: 'email',
        path: 'ion-ios-email',
        callback: function callback() {
          window.open('mailto:mike@represent-me.com?subject="Subscribe to Represent Me"');
        }
      }, {
        name: 'instagram',
        path: 'ion-social-instagram-outline'
      }]
    };
    return _this;
  }

  _createClass(MainFooter, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = {
        iconButtonStyle: {
          minWidth: '32px',
          maxWidth: '32px',
          height: '32px',
          border: '2px solid #c1c2c2',
          background: '#F5F5F5',
          borderRadius: '200px',
          padding: '0',
          margin: '0 10px'
        },
        bottomNavStyles: {
          backgroundColor: '#F5F5F5',
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'center',
          paddingTop: '20px',
          paddingBottom: '60px'
        },
        footerLogo: {
          maxWidth: '60px',
          minWidth: '450px'
        }
      };

      return _react2.default.createElement(
        _MuiThemeProvider2.default,
        null,
        _react2.default.createElement(
          'footer',
          null,
          _react2.default.createElement(
            'div',
            { className: 'footer-logo' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { style: styles.footerLogo
                },
                _react2.default.createElement(_logoComponentFooter2.default, null)
              )
            )
          ),
          _react2.default.createElement(
            _BottomNavigation.BottomNavigation,
            {
              selectedIndex: 0,
              style: styles.bottomNavStyles },
            this.state.nav.map(function (navItem, index) {
              return _react2.default.createElement(_BottomNavigation.BottomNavigationItem, {
                className: 'social-nav',
                key: index,
                disableTouchRipple: true,
                style: styles.iconButtonStyle,
                icon: _react2.default.createElement('i', {
                  className: 'social-nav--icon ' + navItem.path
                }),
                onClick: function onClick() {
                  navItem.callback ? navItem.callback() : _this2.select(index);
                }
              });
            })
          )
        )
      );
    }
  }]);

  return MainFooter;
}(_react2.default.Component);

exports.default = MainFooter;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var repMeConstants = function repMeConstants() {
    return {
        ballotCopy: {
            headerTagLine: 'by the people 2.0',
            formNotice: '**We will not use any of your information for any 3rd\n          Party. Nor will we send you emails unless you opt-in to receive \n          them**',
            emailInputSenate: 'To receive results including final Senate Floor Votes',
            emailInputHouse: 'To receive results including final House Votes',
            zipCodeInputSenate: 'This will allow us to include your private ballot along with your constituents that we will provide your Senators',
            zipCodeInputHouse: 'This will allow us to include your private ballot along with your constituents that we will provide your Representative',
            subscribeToHotBill: 'To receive other Hot \n          Congressional Bill Ballots and track their results',
            subscribeToOtherLegislationInfo: 'To receive information \n          from your Legislators about Ballots and Voting results',
            subscribeToHotBillTitle: 'Opt-In',
            subscribeToOtherLegislationInfoTitle: 'Legislator Opt-In',
            validationPartOne: 'Are you sure you do not want to enter your',
            validationPartTwo: 'it will help connect you with fellow constituents and communicate to your elected officials.',
            validationTitle: 'Ready to submit?',
            //deprecated
            //   preSubmitInfo: (billData) => {
            //       return `This is your private Ballot for 
            //       (Your Ballot No. H.R. ${billData.number}-${billData.hash})` },
            sliderHint: 'Slide to Cast',
            submissionCTA: 'Submit my VOTE'
        },
        colorStops: [{
            prop: 'stop-0',
            hex: '#f14724'
        }, {
            prop: 'stop-1',
            hex: '#f25527'
        }, {
            prop: 'stop-2',
            hex: '#f36329'
        }, {
            prop: 'stop-3',
            hex: '#f5712c'
        }, {
            prop: 'stop-4',
            hex: '#f67f2e'
        }, {
            prop: 'stop-5',
            hex: '#f78d31'
        }, {
            prop: 'stop-6',
            hex: '#f89b34'
        }, {
            prop: 'stop-7',
            hex: '#f9a936'
        }, {
            prop: 'stop-8',
            hex: '#fbb739'
        }, {
            prop: 'stop-9',
            hex: '#fcc53b'
        }, {
            prop: 'stop-10',
            hex: '#868686'
        }, {
            prop: 'stop-11',
            hex: '#f0d23f'
        }, {
            prop: 'stop-12',
            hex: '#e2d040'
        }, {
            prop: 'stop-13',
            hex: '#d5cf41'
        }, {
            prop: 'stop-14',
            hex: '#c7cd42'
        }, {
            prop: 'stop-15',
            hex: '#bacc43'
        }, {
            prop: 'stop-16',
            hex: '#acca43'
        }, {
            prop: 'stop-17',
            hex: '#9fc944'
        }, {
            prop: 'stop-18',
            hex: '#91c745'
        }, {
            prop: 'stop-19',
            hex: '#84c646'
        }, {
            prop: 'stop-20',
            hex: '#76c447'
        }],
        sampleData: {
            "response_code": 200,
            "results": {
                "ballot_number": null,
                "bill": {
                    "bill_created_date": null,
                    "bill_modified_date": null,
                    "bill_result": "",
                    "chamber": "House",
                    "closing_date": "2018-01-05T04:03:49",
                    "created_on": "2018-01-05T04:03:49",
                    "data": {
                        "50": 8,
                        "0-4": 9,
                        "10-14": 0,
                        "15-19": 0,
                        "20-24": 2,
                        "25-29": 3,
                        "30-34": 0,
                        "35-39": 0,
                        "40-44": 0,
                        "45-49": 0,
                        "5-9": 0,
                        "51-55": 5,
                        "56-60": 40,
                        "61-65": 9,
                        "66-70": 8,
                        "71-75": 2,
                        "76-80": 1,
                        "81-85": 1,
                        "86-90": 0,
                        "91-95": 0,
                        "96-100": 0
                    },
                    "description": "<p>(This measure has not been amended since it was introduced. The summary of that version is repeated here.)</p> <p>Authorizes the Speaker of the House and the Majority Leader of the Senate, or their respective designees, to notify the Members of the House and the Senate to assemble at a place outside the District of Columbia whenever, in their opinion, the public interest shall warrant it.</p>",
                    "hash_id": "9f5e2b0e-8e46-4f66-9dfc-dcf421",
                    "id": 7783,
                    "image": "",
                    "introduced_date": null,
                    "is_default": null,
                    "number": "hconres12-115",
                    "rollcall_id": 6,
                    "sponsor_id": "B001293",
                    "status": null,
                    "title": "Supporting the designation of the week of September 11 to September 17 as \"Patriot Week\".",
                    "updated_on": "2018-01-05T04:03:49"
                },
                "bill_id": 7783,
                "created_on": "2018-01-15T01:11:15.734359",
                "email": "tmclemons87@gmail.com",
                "hash_id": "0c10890f-cf17-418d-9309-8951fe",
                "id": 111,
                "opt_in": 1,
                "opt_in_two": 0,
                "org": {
                    "image": "https://static.wixstatic.com/media/ce7760_aa512d49a4804c2c953b01b48442740a~mv2.jpg/v1/fill/w_668,h_82,al_c,q_80,usm_0.66_1.00_0.01/ce7760_aa512d49a4804c2c953b01b48442740a~mv2.webp",
                    "name": "Represent Me",
                    "slug": "repme"
                },
                "state_code": null,
                "timestamp": null,
                "updated_on": "2018-01-15T01:11:15.734364",
                "user": {
                    "address": null,
                    "address_cont": null,
                    "admin": false,
                    "api_key": null,
                    "city": null,
                    "created_on": "2018-01-11T19:05:11.666831",
                    "email": "tmclemons87@gmail.com",
                    "first_name": null,
                    "hash_id": "5df03c25-9741-4d8a-a82b-51fdd3",
                    "id": 22,
                    "images": null,
                    "last_login": "2018-01-11T19:05:11.668268",
                    "last_name": null,
                    "opt_in": 1,
                    "opt_in_two": 0,
                    "password": null,
                    "password_reset_token": null,
                    "phone": null,
                    "profile_image": null,
                    "registration_token": null,
                    "state": null,
                    "super_admin": false,
                    "timezone": "US/Eastern",
                    "updated_on": "2018-01-11T19:05:11.666850",
                    "user_type": null,
                    "zip_code": "48331"
                },
                "user_id": 22,
                "vote": 60,
                "zip_code": "48331"
            },
            "success": true
        }
    };
};

exports.default = repMeConstants();

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _TextField = __webpack_require__(124);

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TextField2.default;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _shallowEqual = __webpack_require__(66);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

var _EnhancedTextarea = __webpack_require__(165);

var _EnhancedTextarea2 = _interopRequireDefault(_EnhancedTextarea);

var _TextFieldHint = __webpack_require__(166);

var _TextFieldHint2 = _interopRequireDefault(_TextFieldHint);

var _TextFieldLabel = __webpack_require__(167);

var _TextFieldLabel2 = _interopRequireDefault(_TextFieldLabel);

var _TextFieldUnderline = __webpack_require__(168);

var _TextFieldUnderline2 = _interopRequireDefault(_TextFieldUnderline);

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyles = function getStyles(props, context, state) {
  var _context$muiTheme = context.muiTheme,
      baseTheme = _context$muiTheme.baseTheme,
      _context$muiTheme$tex = _context$muiTheme.textField,
      floatingLabelColor = _context$muiTheme$tex.floatingLabelColor,
      focusColor = _context$muiTheme$tex.focusColor,
      textColor = _context$muiTheme$tex.textColor,
      disabledTextColor = _context$muiTheme$tex.disabledTextColor,
      backgroundColor = _context$muiTheme$tex.backgroundColor,
      errorColor = _context$muiTheme$tex.errorColor;


  var styles = {
    root: {
      fontSize: 16,
      lineHeight: '24px',
      width: props.fullWidth ? '100%' : 256,
      height: (props.rows - 1) * 24 + (props.floatingLabelText ? 72 : 48),
      display: 'inline-block',
      position: 'relative',
      backgroundColor: backgroundColor,
      fontFamily: baseTheme.fontFamily,
      transition: _transitions2.default.easeOut('200ms', 'height'),
      cursor: props.disabled ? 'not-allowed' : 'auto'
    },
    error: {
      position: 'relative',
      bottom: 2,
      fontSize: 12,
      lineHeight: '12px',
      color: errorColor,
      transition: _transitions2.default.easeOut()
    },
    floatingLabel: {
      color: props.disabled ? disabledTextColor : floatingLabelColor,
      pointerEvents: 'none'
    },
    input: {
      padding: 0,
      position: 'relative',
      width: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0)',
      color: props.disabled ? disabledTextColor : textColor,
      cursor: 'inherit',
      font: 'inherit',
      WebkitOpacity: 1,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)' // Remove mobile color flashing (deprecated style).
    },
    inputNative: {
      appearance: 'textfield' // Improve type search style.
    }
  };

  styles.textarea = (0, _simpleAssign2.default)({}, styles.input, {
    marginTop: props.floatingLabelText ? 36 : 12,
    marginBottom: props.floatingLabelText ? -36 : -12,
    boxSizing: 'border-box',
    font: 'inherit'
  });

  // Do not assign a height to the textarea as he handles it on his own.
  styles.input.height = '100%';

  if (state.isFocused) {
    styles.floatingLabel.color = focusColor;
  }

  if (props.floatingLabelText) {
    styles.input.boxSizing = 'border-box';

    if (!props.multiLine) {
      styles.input.marginTop = 14;
    }

    if (state.errorText) {
      styles.error.bottom = !props.multiLine ? styles.error.fontSize + 3 : 3;
    }
  }

  if (state.errorText) {
    if (state.isFocused) {
      styles.floatingLabel.color = styles.error.color;
    }
  }

  return styles;
};

/**
 * Check if a value is valid to be displayed inside an input.
 *
 * @param The value to check.
 * @returns True if the string provided is valid, false otherwise.
 */
function isValid(value) {
  return value !== '' && value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0);
}

var TextField = function (_Component) {
  (0, _inherits3.default)(TextField, _Component);

  function TextField() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TextField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TextField.__proto__ || (0, _getPrototypeOf2.default)(TextField)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isFocused: false,
      errorText: undefined,
      hasValue: false
    }, _this.handleInputBlur = function (event) {
      _this.setState({ isFocused: false });
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleInputChange = function (event) {
      if (!_this.props.hasOwnProperty('value')) {
        _this.setState({ hasValue: isValid(event.target.value) });
      }
      if (_this.props.onChange) {
        _this.props.onChange(event, event.target.value);
      }
    }, _this.handleInputFocus = function (event) {
      if (_this.props.disabled) {
        return;
      }
      _this.setState({ isFocused: true });
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.handleHeightChange = function (event, height) {
      var newHeight = height + 24;
      if (_this.props.floatingLabelText) {
        newHeight += 24;
      }
      _reactDom2.default.findDOMNode(_this).style.height = newHeight + 'px';
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TextField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          children = _props.children,
          name = _props.name,
          hintText = _props.hintText,
          floatingLabelText = _props.floatingLabelText,
          id = _props.id;


      var propsLeaf = children ? children.props : this.props;

      this.setState({
        errorText: this.props.errorText,
        hasValue: isValid(propsLeaf.value) || isValid(propsLeaf.defaultValue)
      });

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(name || hintText || floatingLabelText || id, 'Material-UI: We don\'t have enough information\n      to build a robust unique id for the TextField component. Please provide an id or a name.') : void 0;

      var uniqueId = name + '-' + hintText + '-' + floatingLabelText + '-' + Math.floor(Math.random() * 0xFFFF);
      this.uniqueId = uniqueId.replace(/[^A-Za-z0-9-]/gi, '');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.disabled && !this.props.disabled) {
        this.setState({
          isFocused: false
        });
      }

      if (nextProps.errorText !== this.props.errorText) {
        this.setState({
          errorText: nextProps.errorText
        });
      }

      if (nextProps.children && nextProps.children.props) {
        nextProps = nextProps.children.props;
      }

      if (nextProps.hasOwnProperty('value')) {
        var hasValue = isValid(nextProps.value);

        this.setState({
          hasValue: hasValue
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState) || !(0, _shallowEqual2.default)(this.context, nextContext);
    }
  }, {
    key: 'blur',
    value: function blur() {
      if (this.input) {
        this.getInputNode().blur();
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.input) {
        this.getInputNode().focus();
      }
    }
  }, {
    key: 'select',
    value: function select() {
      if (this.input) {
        this.getInputNode().select();
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.input ? this.getInputNode().value : undefined;
    }
  }, {
    key: 'getInputNode',
    value: function getInputNode() {
      return this.props.children || this.props.multiLine ? this.input.getInputNode() : _reactDom2.default.findDOMNode(this.input);
    }
  }, {
    key: '_isControlled',
    value: function _isControlled() {
      return this.props.hasOwnProperty('value');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          children = _props2.children,
          className = _props2.className,
          disabled = _props2.disabled,
          errorStyle = _props2.errorStyle,
          errorText = _props2.errorText,
          floatingLabelFixed = _props2.floatingLabelFixed,
          floatingLabelFocusStyle = _props2.floatingLabelFocusStyle,
          floatingLabelShrinkStyle = _props2.floatingLabelShrinkStyle,
          floatingLabelStyle = _props2.floatingLabelStyle,
          floatingLabelText = _props2.floatingLabelText,
          fullWidth = _props2.fullWidth,
          hintText = _props2.hintText,
          hintStyle = _props2.hintStyle,
          id = _props2.id,
          inputStyle = _props2.inputStyle,
          multiLine = _props2.multiLine,
          onBlur = _props2.onBlur,
          onChange = _props2.onChange,
          onFocus = _props2.onFocus,
          style = _props2.style,
          type = _props2.type,
          underlineDisabledStyle = _props2.underlineDisabledStyle,
          underlineFocusStyle = _props2.underlineFocusStyle,
          underlineShow = _props2.underlineShow,
          underlineStyle = _props2.underlineStyle,
          rows = _props2.rows,
          rowsMax = _props2.rowsMax,
          textareaStyle = _props2.textareaStyle,
          other = (0, _objectWithoutProperties3.default)(_props2, ['children', 'className', 'disabled', 'errorStyle', 'errorText', 'floatingLabelFixed', 'floatingLabelFocusStyle', 'floatingLabelShrinkStyle', 'floatingLabelStyle', 'floatingLabelText', 'fullWidth', 'hintText', 'hintStyle', 'id', 'inputStyle', 'multiLine', 'onBlur', 'onChange', 'onFocus', 'style', 'type', 'underlineDisabledStyle', 'underlineFocusStyle', 'underlineShow', 'underlineStyle', 'rows', 'rowsMax', 'textareaStyle']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);
      var inputId = id || this.uniqueId;

      var errorTextElement = this.state.errorText && _react2.default.createElement(
        'div',
        { style: prepareStyles((0, _simpleAssign2.default)(styles.error, errorStyle)) },
        this.state.errorText
      );

      var floatingLabelTextElement = floatingLabelText && _react2.default.createElement(
        _TextFieldLabel2.default,
        {
          muiTheme: this.context.muiTheme,
          style: (0, _simpleAssign2.default)(styles.floatingLabel, floatingLabelStyle, this.state.isFocused ? floatingLabelFocusStyle : null),
          shrinkStyle: floatingLabelShrinkStyle,
          htmlFor: inputId,
          shrink: this.state.hasValue || this.state.isFocused || floatingLabelFixed,
          disabled: disabled
        },
        floatingLabelText
      );

      var inputProps = {
        id: inputId,
        ref: function ref(elem) {
          return _this2.input = elem;
        },
        disabled: this.props.disabled,
        onBlur: this.handleInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.handleInputFocus
      };

      var childStyleMerged = (0, _simpleAssign2.default)(styles.input, inputStyle);

      var inputElement = void 0;
      if (children) {
        inputElement = _react2.default.cloneElement(children, (0, _extends3.default)({}, inputProps, children.props, {
          style: (0, _simpleAssign2.default)(childStyleMerged, children.props.style)
        }));
      } else {
        inputElement = multiLine ? _react2.default.createElement(_EnhancedTextarea2.default, (0, _extends3.default)({
          style: childStyleMerged,
          textareaStyle: (0, _simpleAssign2.default)(styles.textarea, styles.inputNative, textareaStyle),
          rows: rows,
          rowsMax: rowsMax,
          hintText: hintText
        }, other, inputProps, {
          onHeightChange: this.handleHeightChange
        })) : _react2.default.createElement('input', (0, _extends3.default)({
          type: type,
          style: prepareStyles((0, _simpleAssign2.default)(styles.inputNative, childStyleMerged))
        }, other, inputProps));
      }

      var rootProps = {};

      if (children) {
        rootProps = other;
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, rootProps, {
          className: className,
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
        }),
        floatingLabelTextElement,
        hintText ? _react2.default.createElement(_TextFieldHint2.default, {
          muiTheme: this.context.muiTheme,
          show: !(this.state.hasValue || floatingLabelText && !this.state.isFocused) || !this.state.hasValue && floatingLabelText && floatingLabelFixed && !this.state.isFocused,
          style: hintStyle,
          text: hintText
        }) : null,
        inputElement,
        underlineShow ? _react2.default.createElement(_TextFieldUnderline2.default, {
          disabled: disabled,
          disabledStyle: underlineDisabledStyle,
          error: !!this.state.errorText,
          errorStyle: errorStyle,
          focus: this.state.isFocused,
          focusStyle: underlineFocusStyle,
          muiTheme: this.context.muiTheme,
          style: underlineStyle
        }) : null,
        errorTextElement
      );
    }
  }]);
  return TextField;
}(_react.Component);

TextField.defaultProps = {
  disabled: false,
  floatingLabelFixed: false,
  multiLine: false,
  fullWidth: false,
  type: 'text',
  underlineShow: true,
  rows: 1
};
TextField.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
TextField.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.node,
  /**
   * The css class name of the root element.
   */
  className: _propTypes2.default.string,
  /**
   * The text string to use for the default value.
   */
  defaultValue: _propTypes2.default.any,
  /**
   * Disables the text field if set to true.
   */
  disabled: _propTypes2.default.bool,
  /**
   * The style object to use to override error styles.
   */
  errorStyle: _propTypes2.default.object,
  /**
   * The error content to display.
   */
  errorText: _propTypes2.default.node,
  /**
   * If true, the floating label will float even when there is no value.
   */
  floatingLabelFixed: _propTypes2.default.bool,
  /**
   * The style object to use to override floating label styles when focused.
   */
  floatingLabelFocusStyle: _propTypes2.default.object,
  /**
   * The style object to use to override floating label styles when shrunk.
   */
  floatingLabelShrinkStyle: _propTypes2.default.object,
  /**
   * The style object to use to override floating label styles.
   */
  floatingLabelStyle: _propTypes2.default.object,
  /**
   * The content to use for the floating label element.
   */
  floatingLabelText: _propTypes2.default.node,
  /**
   * If true, the field receives the property width 100%.
   */
  fullWidth: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the TextField's hint text element.
   */
  hintStyle: _propTypes2.default.object,
  /**
   * The hint content to display.
   */
  hintText: _propTypes2.default.node,
  /**
   * The id prop for the text field.
   */
  id: _propTypes2.default.string,
  /**
   * Override the inline-styles of the TextField's input element.
   * When multiLine is false: define the style of the input element.
   * When multiLine is true: define the style of the container of the textarea.
   */
  inputStyle: _propTypes2.default.object,
  /**
   * If true, a textarea element will be rendered.
   * The textarea also grows and shrinks according to the number of lines.
   */
  multiLine: _propTypes2.default.bool,
  /**
   * Name applied to the input.
   */
  name: _propTypes2.default.string,
  /** @ignore */
  onBlur: _propTypes2.default.func,
  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {object} event Change event targeting the text field.
   * @param {string} newValue The new value of the text field.
   */
  onChange: _propTypes2.default.func,
  /** @ignore */
  onFocus: _propTypes2.default.func,
  /**
   * Number of rows to display when multiLine option is set to true.
   */
  rows: _propTypes2.default.number,
  /**
   * Maximum number of rows to display when
   * multiLine option is set to true.
   */
  rowsMax: _propTypes2.default.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * Override the inline-styles of the TextField's textarea element.
   * The TextField use either a textarea or an input,
   * this property has effects only when multiLine is true.
   */
  textareaStyle: _propTypes2.default.object,
  /**
   * Specifies the type of input to display
   * such as "password" or "text".
   */
  type: _propTypes2.default.string,
  /**
   * Override the inline-styles of the
   * TextField's underline element when disabled.
   */
  underlineDisabledStyle: _propTypes2.default.object,
  /**
   * Override the inline-styles of the TextField's
   * underline element when focussed.
   */
  underlineFocusStyle: _propTypes2.default.object,
  /**
   * If true, shows the underline for the text field.
   */
  underlineShow: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the TextField's underline element.
   */
  underlineStyle: _propTypes2.default.object,
  /**
   * The value of the text field.
   */
  value: _propTypes2.default.any
} : {};
exports.default = TextField;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(126), __esModule: true };

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(127);
module.exports = __webpack_require__(42).Object.assign;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(44);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(129) });


/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(59);
var gOPS = __webpack_require__(78);
var pIE = __webpack_require__(65);
var toObject = __webpack_require__(60);
var IObject = __webpack_require__(93);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(52)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(53);
var toLength = __webpack_require__(94);
var toAbsoluteIndex = __webpack_require__(131);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(74);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(133);
module.exports = __webpack_require__(42).Object.getPrototypeOf;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(60);
var $getPrototypeOf = __webpack_require__(95);

__webpack_require__(96)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
var $Object = __webpack_require__(42).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(44);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(47), 'Object', { defineProperty: __webpack_require__(46).f });


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(98);
__webpack_require__(143);
module.exports = __webpack_require__(82).f('iterator');


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(74);
var defined = __webpack_require__(73);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(80);
var descriptor = __webpack_require__(58);
var setToStringTag = __webpack_require__(81);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(49)(IteratorPrototype, __webpack_require__(43)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(46);
var anObject = __webpack_require__(50);
var getKeys = __webpack_require__(59);

module.exports = __webpack_require__(47) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(45).document;
module.exports = document && document.documentElement;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(144);
var global = __webpack_require__(45);
var hide = __webpack_require__(49);
var Iterators = __webpack_require__(61);
var TO_STRING_TAG = __webpack_require__(43)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(145);
var step = __webpack_require__(146);
var Iterators = __webpack_require__(61);
var toIObject = __webpack_require__(53);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(99)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(148), __esModule: true };

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
module.exports = __webpack_require__(42).Symbol;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(45);
var has = __webpack_require__(48);
var DESCRIPTORS = __webpack_require__(47);
var $export = __webpack_require__(44);
var redefine = __webpack_require__(100);
var META = __webpack_require__(150).KEY;
var $fails = __webpack_require__(52);
var shared = __webpack_require__(76);
var setToStringTag = __webpack_require__(81);
var uid = __webpack_require__(64);
var wks = __webpack_require__(43);
var wksExt = __webpack_require__(82);
var wksDefine = __webpack_require__(83);
var enumKeys = __webpack_require__(151);
var isArray = __webpack_require__(152);
var anObject = __webpack_require__(50);
var isObject = __webpack_require__(51);
var toIObject = __webpack_require__(53);
var toPrimitive = __webpack_require__(71);
var createDesc = __webpack_require__(58);
var _create = __webpack_require__(80);
var gOPNExt = __webpack_require__(153);
var $GOPD = __webpack_require__(102);
var $DP = __webpack_require__(46);
var $keys = __webpack_require__(59);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(101).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(65).f = $propertyIsEnumerable;
  __webpack_require__(78).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(79)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(49)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(64)('meta');
var isObject = __webpack_require__(51);
var has = __webpack_require__(48);
var setDesc = __webpack_require__(46).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(52)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(59);
var gOPS = __webpack_require__(78);
var pIE = __webpack_require__(65);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(72);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(53);
var gOPN = __webpack_require__(101).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 154 */
/***/ (function(module, exports) {



/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83)('asyncIterator');


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83)('observable');


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(158), __esModule: true };

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(159);
module.exports = __webpack_require__(42).Object.setPrototypeOf;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(44);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(160).set });


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(51);
var anObject = __webpack_require__(50);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(70)(Function.call, __webpack_require__(102).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(162), __esModule: true };

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(163);
var $Object = __webpack_require__(42).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(44);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(80) });


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactEventListener = __webpack_require__(15);

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowsHeight = 24;

function getStyles(props, context, state) {
  return {
    root: {
      position: 'relative' // because the shadow has position: 'absolute'
    },
    textarea: {
      height: state.height,
      width: '100%',
      resize: 'none',
      font: 'inherit',
      padding: 0,
      cursor: 'inherit'
    },
    shadow: {
      resize: 'none',
      // Overflow also needed to here to remove the extra row
      // added to textareas in Firefox.
      overflow: 'hidden',
      // Visibility needed to hide the extra text area on ipads
      visibility: 'hidden',
      position: 'absolute',
      height: 'auto'
    }
  };
}

var EnhancedTextarea = function (_Component) {
  (0, _inherits3.default)(EnhancedTextarea, _Component);

  function EnhancedTextarea() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, EnhancedTextarea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EnhancedTextarea.__proto__ || (0, _getPrototypeOf2.default)(EnhancedTextarea)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      height: null
    }, _this.handleResize = function (event) {
      _this.syncHeightWithShadow(_this.props.value, event);
    }, _this.handleChange = function (event) {
      if (!_this.props.hasOwnProperty('value')) {
        _this.syncHeightWithShadow(event.target.value);
      }

      if (_this.props.hasOwnProperty('valueLink')) {
        _this.props.valueLink.requestChange(event.target.value);
      }

      if (_this.props.onChange) {
        _this.props.onChange(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(EnhancedTextarea, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        height: this.props.rows * rowsHeight
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.syncHeightWithShadow(this.props.value);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value || nextProps.rowsMax !== this.props.rowsMax) {
        this.syncHeightWithShadow(nextProps.value, null, nextProps);
      }
    }
  }, {
    key: 'getInputNode',
    value: function getInputNode() {
      return this.refs.input;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.getInputNode().value = value;
      this.syncHeightWithShadow(value);
    }
  }, {
    key: 'syncHeightWithShadow',
    value: function syncHeightWithShadow(newValue, event, props) {
      var shadow = this.refs.shadow;
      var displayText = this.props.hintText && (newValue === '' || newValue === undefined || newValue === null) ? this.props.hintText : newValue;

      if (displayText !== undefined) {
        shadow.value = displayText;
      }

      var newHeight = shadow.scrollHeight;

      // Guarding for jsdom, where scrollHeight isn't present.
      // See https://github.com/tmpvar/jsdom/issues/1013
      if (newHeight === undefined) return;

      props = props || this.props;

      if (props.rowsMax >= props.rows) {
        newHeight = Math.min(props.rowsMax * rowsHeight, newHeight);
      }

      newHeight = Math.max(newHeight, rowsHeight);

      if (this.state.height !== newHeight) {
        var input = this.refs.input;
        var cursorPosition = input.selectionStart;
        this.setState({
          height: newHeight
        }, function () {
          input.setSelectionRange(cursorPosition, cursorPosition);
        });

        if (props.onHeightChange) {
          props.onHeightChange(event, newHeight);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onChange = _props.onChange,
          onHeightChange = _props.onHeightChange,
          rows = _props.rows,
          rowsMax = _props.rowsMax,
          shadowStyle = _props.shadowStyle,
          style = _props.style,
          hintText = _props.hintText,
          textareaStyle = _props.textareaStyle,
          valueLink = _props.valueLink,
          other = (0, _objectWithoutProperties3.default)(_props, ['onChange', 'onHeightChange', 'rows', 'rowsMax', 'shadowStyle', 'style', 'hintText', 'textareaStyle', 'valueLink']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);
      var rootStyles = (0, _simpleAssign2.default)(styles.root, style);
      var textareaStyles = (0, _simpleAssign2.default)(styles.textarea, textareaStyle);
      var shadowStyles = (0, _simpleAssign2.default)({}, textareaStyles, styles.shadow, shadowStyle);
      var props = {};

      if (this.props.hasOwnProperty('valueLink')) {
        other.value = valueLink.value;
        props.valueLink = valueLink;
      }

      return _react2.default.createElement(
        'div',
        { style: prepareStyles(rootStyles) },
        _react2.default.createElement(_reactEventListener2.default, { target: 'window', onResize: this.handleResize }),
        _react2.default.createElement('textarea', (0, _extends3.default)({
          ref: 'shadow',
          style: prepareStyles(shadowStyles),
          tabIndex: '-1',
          rows: this.props.rows,
          defaultValue: this.props.defaultValue,
          readOnly: true,
          value: this.props.value
        }, props)),
        _react2.default.createElement('textarea', (0, _extends3.default)({}, other, {
          ref: 'input',
          rows: this.props.rows,
          style: prepareStyles(textareaStyles),
          onChange: this.handleChange
        }))
      );
    }
  }]);
  return EnhancedTextarea;
}(_react.Component);

EnhancedTextarea.defaultProps = {
  rows: 1
};
EnhancedTextarea.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
EnhancedTextarea.propTypes = process.env.NODE_ENV !== "production" ? {
  defaultValue: _propTypes2.default.any,
  disabled: _propTypes2.default.bool,
  hintText: _propTypes2.default.node,
  onChange: _propTypes2.default.func,
  onHeightChange: _propTypes2.default.func,
  rows: _propTypes2.default.number,
  rowsMax: _propTypes2.default.number,
  shadowStyle: _propTypes2.default.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  textareaStyle: _propTypes2.default.object,
  value: _propTypes2.default.string,
  valueLink: _propTypes2.default.object
} : {};
exports.default = EnhancedTextarea;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props) {
  var hintColor = props.muiTheme.textField.hintColor,
      show = props.show;


  return {
    root: {
      position: 'absolute',
      opacity: show ? 1 : 0,
      color: hintColor,
      transition: _transitions2.default.easeOut(),
      bottom: 12
    }
  };
}

var TextFieldHint = function TextFieldHint(props) {
  var prepareStyles = props.muiTheme.prepareStyles,
      style = props.style,
      text = props.text;


  var styles = getStyles(props);

  return _react2.default.createElement(
    'div',
    { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) },
    text
  );
};

TextFieldHint.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @ignore
   * The material-ui theme applied to this component.
   */
  muiTheme: _propTypes2.default.object.isRequired,
  /**
   * True if the hint text should be visible.
   */
  show: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * The hint text displayed.
   */
  text: _propTypes2.default.node
} : {};

TextFieldHint.defaultProps = {
  show: true
};

exports.default = TextFieldHint;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props) {
  var defaultStyles = {
    position: 'absolute',
    lineHeight: '22px',
    top: 38,
    transition: _transitions2.default.easeOut(),
    zIndex: 1, // Needed to display label above Chrome's autocomplete field background
    transform: 'scale(1) translate(0, 0)',
    transformOrigin: 'left top',
    pointerEvents: 'auto',
    userSelect: 'none'
  };

  var shrinkStyles = props.shrink ? (0, _simpleAssign2.default)({
    transform: 'scale(0.75) translate(0, -28px)',
    pointerEvents: 'none'
  }, props.shrinkStyle) : null;

  return {
    root: (0, _simpleAssign2.default)(defaultStyles, props.style, shrinkStyles)
  };
}

var TextFieldLabel = function TextFieldLabel(props) {
  var muiTheme = props.muiTheme,
      className = props.className,
      children = props.children,
      htmlFor = props.htmlFor,
      onClick = props.onClick;
  var prepareStyles = muiTheme.prepareStyles;

  var styles = getStyles(props);

  return _react2.default.createElement(
    'label',
    {
      className: className,
      style: prepareStyles(styles.root),
      htmlFor: htmlFor,
      onClick: onClick
    },
    children
  );
};

TextFieldLabel.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The label contents.
   */
  children: _propTypes2.default.node,
  /**
   * The css class name of the root element.
   */
  className: _propTypes2.default.string,
  /**
   * Disables the label if set to true.
   */
  disabled: _propTypes2.default.bool,
  /**
   * The id of the target element that this label should refer to.
   */
  htmlFor: _propTypes2.default.string,
  /**
   * @ignore
   * The material-ui theme applied to this component.
   */
  muiTheme: _propTypes2.default.object.isRequired,
  /**
   * Callback function for when the label is selected via a click.
   *
   * @param {object} event Click event targeting the text field label.
   */
  onClick: _propTypes2.default.func,
  /**
   * True if the floating label should shrink.
   */
  shrink: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element when shrunk.
   */
  shrinkStyle: _propTypes2.default.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};

TextFieldLabel.defaultProps = {
  disabled: false,
  shrink: false
};

exports.default = TextFieldLabel;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  /**
   * True if the parent `TextField` is disabled.
   */
  disabled: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the underline when parent `TextField` is disabled.
   */
  disabledStyle: _propTypes2.default.object,
  /**
   * True if the parent `TextField` has an error.
   */
  error: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the underline when parent `TextField` has an error.
   */
  errorStyle: _propTypes2.default.object,
  /**
   * True if the parent `TextField` is focused.
   */
  focus: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the underline when parent `TextField` is focused.
   */
  focusStyle: _propTypes2.default.object,
  /**
   * @ignore
   * The material-ui theme applied to this component.
   */
  muiTheme: _propTypes2.default.object.isRequired,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
};

var defaultProps = {
  disabled: false,
  disabledStyle: {},
  error: false,
  errorStyle: {},
  focus: false,
  focusStyle: {},
  style: {}
};

var TextFieldUnderline = function TextFieldUnderline(props) {
  var disabled = props.disabled,
      disabledStyle = props.disabledStyle,
      error = props.error,
      errorStyle = props.errorStyle,
      focus = props.focus,
      focusStyle = props.focusStyle,
      muiTheme = props.muiTheme,
      style = props.style;
  var errorStyleColor = errorStyle.color;
  var prepareStyles = muiTheme.prepareStyles,
      _muiTheme$textField = muiTheme.textField,
      borderColor = _muiTheme$textField.borderColor,
      disabledTextColor = _muiTheme$textField.disabledTextColor,
      errorColor = _muiTheme$textField.errorColor,
      focusColor = _muiTheme$textField.focusColor;


  var styles = {
    root: {
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: borderColor,
      bottom: 8,
      boxSizing: 'content-box',
      margin: 0,
      position: 'absolute',
      width: '100%'
    },
    disabled: {
      borderBottomStyle: 'dotted',
      borderBottomWidth: 2,
      borderColor: disabledTextColor
    },
    focus: {
      borderBottomStyle: 'solid',
      borderBottomWidth: 2,
      borderColor: focusColor,
      transform: 'scaleX(0)',
      transition: _transitions2.default.easeOut()
    },
    error: {
      borderColor: errorStyleColor ? errorStyleColor : errorColor,
      transform: 'scaleX(1)'
    }
  };

  var underline = (0, _simpleAssign2.default)({}, styles.root, style);
  var focusedUnderline = (0, _simpleAssign2.default)({}, underline, styles.focus, focusStyle);

  if (disabled) underline = (0, _simpleAssign2.default)({}, underline, styles.disabled, disabledStyle);
  if (focus) focusedUnderline = (0, _simpleAssign2.default)({}, focusedUnderline, { transform: 'scaleX(1)' });
  if (error) focusedUnderline = (0, _simpleAssign2.default)({}, focusedUnderline, styles.error);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('hr', { 'aria-hidden': 'true', style: prepareStyles(underline) }),
    _react2.default.createElement('hr', { 'aria-hidden': 'true', style: prepareStyles(focusedUnderline) })
  );
};

TextFieldUnderline.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
TextFieldUnderline.defaultProps = defaultProps;

exports.default = TextFieldUnderline;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Checkbox = __webpack_require__(170);

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Checkbox2.default;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EnhancedSwitch = __webpack_require__(171);

var _EnhancedSwitch2 = _interopRequireDefault(_EnhancedSwitch);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

var _checkBoxOutlineBlank = __webpack_require__(186);

var _checkBoxOutlineBlank2 = _interopRequireDefault(_checkBoxOutlineBlank);

var _checkBox = __webpack_require__(191);

var _checkBox2 = _interopRequireDefault(_checkBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var checkbox = context.muiTheme.checkbox;

  var checkboxSize = 24;

  return {
    icon: {
      height: checkboxSize,
      width: checkboxSize
    },
    check: {
      position: 'absolute',
      opacity: 0,
      transform: 'scale(0)',
      transitionOrigin: '50% 50%',
      transition: _transitions2.default.easeOut('450ms', 'opacity', '0ms') + ', ' + _transitions2.default.easeOut('0ms', 'transform', '450ms'),
      fill: checkbox.checkedColor
    },
    checkWhenSwitched: {
      opacity: 1,
      transform: 'scale(1)',
      transition: _transitions2.default.easeOut('0ms', 'opacity', '0ms') + ', ' + _transitions2.default.easeOut('800ms', 'transform', '0ms')
    },
    checkWhenDisabled: {
      fill: checkbox.disabledColor
    },
    box: {
      position: 'absolute',
      opacity: 1,
      fill: checkbox.boxColor,
      transition: _transitions2.default.easeOut('1000ms', 'opacity', '200ms')
    },
    boxWhenSwitched: {
      opacity: 0,
      transition: _transitions2.default.easeOut('650ms', 'opacity', '150ms'),
      fill: checkbox.checkedColor
    },
    boxWhenDisabled: {
      fill: props.checked ? 'transparent' : checkbox.disabledColor
    },
    label: {
      color: props.disabled ? checkbox.labelDisabledColor : checkbox.labelColor
    }
  };
}

var Checkbox = function (_Component) {
  (0, _inherits3.default)(Checkbox, _Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Checkbox.__proto__ || (0, _getPrototypeOf2.default)(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      switched: false
    }, _this.handleStateChange = function (newSwitched) {
      _this.setState({
        switched: newSwitched
      });
    }, _this.handleCheck = function (event, isInputChecked) {
      if (_this.props.onCheck) {
        _this.props.onCheck(event, isInputChecked);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Checkbox, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          checked = _props.checked,
          defaultChecked = _props.defaultChecked,
          valueLink = _props.valueLink;


      if (checked || defaultChecked || valueLink && valueLink.value) {
        this.setState({
          switched: true
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.checked !== nextProps.checked) {
        this.setState({
          switched: nextProps.checked
        });
      }
    }
  }, {
    key: 'isChecked',
    value: function isChecked() {
      return this.refs.enhancedSwitch.isSwitched();
    }
  }, {
    key: 'setChecked',
    value: function setChecked(newCheckedValue) {
      this.refs.enhancedSwitch.setSwitched(newCheckedValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          iconStyle = _props2.iconStyle,
          onCheck = _props2.onCheck,
          checkedIcon = _props2.checkedIcon,
          uncheckedIcon = _props2.uncheckedIcon,
          other = (0, _objectWithoutProperties3.default)(_props2, ['iconStyle', 'onCheck', 'checkedIcon', 'uncheckedIcon']);

      var styles = getStyles(this.props, this.context);
      var boxStyles = (0, _simpleAssign2.default)(styles.box, this.state.switched && styles.boxWhenSwitched, iconStyle, this.props.disabled && styles.boxWhenDisabled);
      var checkStyles = (0, _simpleAssign2.default)(styles.check, this.state.switched && styles.checkWhenSwitched, iconStyle, this.props.disabled && styles.checkWhenDisabled);

      var checkedElement = checkedIcon ? _react2.default.cloneElement(checkedIcon, {
        style: (0, _simpleAssign2.default)(checkStyles, checkedIcon.props.style)
      }) : _react2.default.createElement(_checkBox2.default, {
        style: checkStyles
      });

      var unCheckedElement = uncheckedIcon ? _react2.default.cloneElement(uncheckedIcon, {
        style: (0, _simpleAssign2.default)(boxStyles, uncheckedIcon.props.style)
      }) : _react2.default.createElement(_checkBoxOutlineBlank2.default, {
        style: boxStyles
      });

      var checkboxElement = _react2.default.createElement(
        'div',
        null,
        unCheckedElement,
        checkedElement
      );

      var rippleColor = this.state.switched ? checkStyles.fill : boxStyles.fill;
      var mergedIconStyle = (0, _simpleAssign2.default)(styles.icon, iconStyle);

      var labelStyle = (0, _simpleAssign2.default)(styles.label, this.props.labelStyle);

      var enhancedSwitchProps = {
        ref: 'enhancedSwitch',
        inputType: 'checkbox',
        switched: this.state.switched,
        switchElement: checkboxElement,
        rippleColor: rippleColor,
        iconStyle: mergedIconStyle,
        onSwitch: this.handleCheck,
        labelStyle: labelStyle,
        onParentShouldUpdate: this.handleStateChange,
        labelPosition: this.props.labelPosition
      };

      return _react2.default.createElement(_EnhancedSwitch2.default, (0, _extends3.default)({}, other, enhancedSwitchProps));
    }
  }]);
  return Checkbox;
}(_react.Component);

Checkbox.defaultProps = {
  labelPosition: 'right',
  disabled: false
};
Checkbox.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
Checkbox.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Checkbox is checked if true.
   */
  checked: _propTypes2.default.bool,
  /**
   * The SvgIcon to use for the checked state.
   * This is useful to create icon toggles.
   */
  checkedIcon: _propTypes2.default.element,
  /**
   * The default state of our checkbox component.
   * **Warning:** This cannot be used in conjunction with `checked`.
   * Decide between using a controlled or uncontrolled input element and remove one of these props.
   * More info: https://fb.me/react-controlled-components
   */
  defaultChecked: _propTypes2.default.bool,
  /**
   * Disabled if true.
   */
  disabled: _propTypes2.default.bool,
  /**
   * Overrides the inline-styles of the icon element.
   */
  iconStyle: _propTypes2.default.object,
  /**
   * Overrides the inline-styles of the input element.
   */
  inputStyle: _propTypes2.default.object,
  /**
   * Where the label will be placed next to the checkbox.
   */
  labelPosition: _propTypes2.default.oneOf(['left', 'right']),
  /**
   * Overrides the inline-styles of the Checkbox element label.
   */
  labelStyle: _propTypes2.default.object,
  /**
   * Callback function that is fired when the checkbox is checked.
   *
   * @param {object} event `change` event targeting the underlying checkbox `input`.
   * @param {boolean} isInputChecked The `checked` value of the underlying checkbox `input`.
   */
  onCheck: _propTypes2.default.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * The SvgIcon to use for the unchecked state.
   * This is useful to create icon toggles.
   */
  uncheckedIcon: _propTypes2.default.element,
  /**
   * ValueLink for when using controlled checkbox.
   */
  valueLink: _propTypes2.default.object
} : {};
exports.default = Checkbox;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactEventListener = __webpack_require__(15);

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _keycode = __webpack_require__(16);

var _keycode2 = _interopRequireDefault(_keycode);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

var _FocusRipple = __webpack_require__(103);

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

var _TouchRipple = __webpack_require__(104);

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

var _Paper = __webpack_require__(54);

var _Paper2 = _interopRequireDefault(_Paper);

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var baseTheme = context.muiTheme.baseTheme;


  return {
    root: {
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      position: 'relative',
      overflow: 'visible',
      display: 'table',
      height: 'auto',
      width: '100%'
    },
    input: {
      position: 'absolute',
      cursor: 'inherit',
      pointerEvents: 'all',
      opacity: 0,
      width: '100%',
      height: '100%',
      zIndex: 2,
      left: 0,
      boxSizing: 'border-box',
      padding: 0,
      margin: 0
    },
    controls: {
      display: 'flex',
      width: '100%',
      height: '100%'
    },
    label: {
      float: 'left',
      position: 'relative',
      display: 'block',
      width: 'calc(100% - 60px)',
      lineHeight: '24px',
      color: baseTheme.palette.textColor,
      fontFamily: baseTheme.fontFamily
    },
    wrap: {
      transition: _transitions2.default.easeOut(),
      float: 'left',
      position: 'relative',
      display: 'block',
      flexShrink: 0,
      width: 60 - baseTheme.spacing.desktopGutterLess,
      marginRight: props.labelPosition === 'right' ? baseTheme.spacing.desktopGutterLess : 0,
      marginLeft: props.labelPosition === 'left' ? baseTheme.spacing.desktopGutterLess : 0
    },
    ripple: {
      color: props.rippleColor || baseTheme.palette.primary1Color,
      height: '200%',
      width: '200%',
      top: -12,
      left: -12
    }
  };
}

var EnhancedSwitch = function (_Component) {
  (0, _inherits3.default)(EnhancedSwitch, _Component);

  function EnhancedSwitch() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, EnhancedSwitch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EnhancedSwitch.__proto__ || (0, _getPrototypeOf2.default)(EnhancedSwitch)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isKeyboardFocused: false
    }, _this.handleChange = function (event) {
      _this.tabPressed = false;
      _this.setState({
        isKeyboardFocused: false
      });

      var isInputChecked = _this.refs.checkbox.checked;

      if (!_this.props.hasOwnProperty('checked') && _this.props.onParentShouldUpdate) {
        _this.props.onParentShouldUpdate(isInputChecked);
      }

      if (_this.props.onSwitch) {
        _this.props.onSwitch(event, isInputChecked);
      }
    }, _this.handleKeyDown = function (event) {
      var code = (0, _keycode2.default)(event);

      if (code === 'tab') {
        _this.tabPressed = true;
      }
      if (_this.state.isKeyboardFocused && code === 'space') {
        _this.handleChange(event);
      }
    }, _this.handleKeyUp = function (event) {
      if (_this.state.isKeyboardFocused && (0, _keycode2.default)(event) === 'space') {
        _this.handleChange(event);
      }
    }, _this.handleMouseDown = function (event) {
      // only listen to left clicks
      if (event.button === 0) {
        _this.refs.touchRipple.start(event);
      }
    }, _this.handleMouseUp = function () {
      _this.refs.touchRipple.end();
    }, _this.handleMouseLeave = function () {
      _this.refs.touchRipple.end();
    }, _this.handleTouchStart = function (event) {
      _this.refs.touchRipple.start(event);
    }, _this.handleTouchEnd = function () {
      _this.refs.touchRipple.end();
    }, _this.handleBlur = function (event) {
      _this.setState({
        isKeyboardFocused: false
      });

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleFocus = function (event) {
      // setTimeout is needed becuase the focus event fires first
      // Wait so that we can capture if this was a keyboard focus
      // or touch focus
      setTimeout(function () {
        if (_this.tabPressed) {
          _this.setState({
            isKeyboardFocused: true
          });
        }
      }, 150);

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(EnhancedSwitch, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.componentWillReceiveProps(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var inputNode = this.refs.checkbox;
      if ((!this.props.switched || inputNode.checked !== this.props.switched) && this.props.onParentShouldUpdate) {
        this.props.onParentShouldUpdate(inputNode.checked);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var hasCheckedProp = nextProps.hasOwnProperty('checked');
      var hasNewDefaultProp = nextProps.hasOwnProperty('defaultChecked') && nextProps.defaultChecked !== this.props.defaultChecked;

      if (hasCheckedProp || hasNewDefaultProp) {
        var switched = nextProps.checked || nextProps.defaultChecked || false;

        this.setState({
          switched: switched
        });

        if (this.props.onParentShouldUpdate && switched !== this.props.switched) {
          this.props.onParentShouldUpdate(switched);
        }
      }
    }
  }, {
    key: 'isSwitched',
    value: function isSwitched() {
      return this.refs.checkbox.checked;
    }

    // no callback here because there is no event

  }, {
    key: 'setSwitched',
    value: function setSwitched(newSwitchedValue) {
      if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
        if (this.props.onParentShouldUpdate) {
          this.props.onParentShouldUpdate(newSwitchedValue);
        }
        this.refs.checkbox.checked = newSwitchedValue;
      } else {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI: Cannot call set method while checked is defined as a property.') : void 0;
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.refs.checkbox.value;
    }

    // Checkbox inputs only use SPACE to change their state. Using ENTER will
    // update the ui but not the input.


    /**
     * Because both the ripples and the checkbox input cannot share pointer
     * events, the checkbox input takes control of pointer events and calls
     * ripple animations manually.
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          value = _props.value,
          checked = _props.checked,
          iconStyle = _props.iconStyle,
          inputStyle = _props.inputStyle,
          inputType = _props.inputType,
          label = _props.label,
          labelStyle = _props.labelStyle,
          labelPosition = _props.labelPosition,
          onSwitch = _props.onSwitch,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          onMouseUp = _props.onMouseUp,
          onMouseDown = _props.onMouseDown,
          onMouseLeave = _props.onMouseLeave,
          onTouchStart = _props.onTouchStart,
          onTouchEnd = _props.onTouchEnd,
          onParentShouldUpdate = _props.onParentShouldUpdate,
          disabled = _props.disabled,
          disableTouchRipple = _props.disableTouchRipple,
          disableFocusRipple = _props.disableFocusRipple,
          className = _props.className,
          rippleColor = _props.rippleColor,
          rippleStyle = _props.rippleStyle,
          style = _props.style,
          switched = _props.switched,
          switchElement = _props.switchElement,
          thumbStyle = _props.thumbStyle,
          trackStyle = _props.trackStyle,
          other = (0, _objectWithoutProperties3.default)(_props, ['name', 'value', 'checked', 'iconStyle', 'inputStyle', 'inputType', 'label', 'labelStyle', 'labelPosition', 'onSwitch', 'onBlur', 'onFocus', 'onMouseUp', 'onMouseDown', 'onMouseLeave', 'onTouchStart', 'onTouchEnd', 'onParentShouldUpdate', 'disabled', 'disableTouchRipple', 'disableFocusRipple', 'className', 'rippleColor', 'rippleStyle', 'style', 'switched', 'switchElement', 'thumbStyle', 'trackStyle']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);
      var wrapStyles = (0, _simpleAssign2.default)(styles.wrap, iconStyle);
      var mergedRippleStyle = (0, _simpleAssign2.default)(styles.ripple, rippleStyle);

      if (thumbStyle) {
        wrapStyles.marginLeft /= 2;
        wrapStyles.marginRight /= 2;
      }

      var labelElement = label && _react2.default.createElement(
        'label',
        { style: prepareStyles((0, _simpleAssign2.default)(styles.label, labelStyle)) },
        label
      );

      var showTouchRipple = !disabled && !disableTouchRipple;
      var showFocusRipple = !disabled && !disableFocusRipple;

      var touchRipple = _react2.default.createElement(_TouchRipple2.default, {
        ref: 'touchRipple',
        key: 'touchRipple',
        style: mergedRippleStyle,
        color: mergedRippleStyle.color,
        muiTheme: this.context.muiTheme,
        centerRipple: true
      });

      var focusRipple = _react2.default.createElement(_FocusRipple2.default, {
        key: 'focusRipple',
        innerStyle: mergedRippleStyle,
        color: mergedRippleStyle.color,
        muiTheme: this.context.muiTheme,
        show: this.state.isKeyboardFocused
      });

      var ripples = [showTouchRipple ? touchRipple : null, showFocusRipple ? focusRipple : null];

      var touchHandlers = showTouchRipple ? {
        onMouseUp: this.handleMouseUp,
        onMouseDown: this.handleMouseDown,
        onMouseLeave: this.handleMouseLeave,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd
      } : {};

      var inputElement = _react2.default.createElement('input', (0, _extends3.default)({}, other, {
        ref: 'checkbox',
        type: inputType,
        style: prepareStyles((0, _simpleAssign2.default)(styles.input, inputStyle)),
        name: name,
        value: value,
        checked: this.state.switched,
        disabled: disabled,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onChange: this.handleChange
      }, touchHandlers));

      // If toggle component (indicated by whether the style includes thumb) manually lay out
      // elements in order to nest ripple elements
      var switchOrThumbElement = !thumbStyle ? _react2.default.createElement(
        'div',
        { style: prepareStyles(wrapStyles) },
        switchElement,
        ripples
      ) : _react2.default.createElement(
        'div',
        { style: prepareStyles(wrapStyles) },
        _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)({}, trackStyle)) }),
        _react2.default.createElement(
          _Paper2.default,
          { style: thumbStyle, zDepth: 1, circle: true },
          ' ',
          ripples,
          ' '
        )
      );

      var elementsInOrder = labelPosition === 'right' ? _react2.default.createElement(
        'div',
        { style: styles.controls },
        switchOrThumbElement,
        labelElement
      ) : _react2.default.createElement(
        'div',
        { style: styles.controls },
        labelElement,
        switchOrThumbElement
      );

      return _react2.default.createElement(
        'div',
        { ref: 'root', className: className, style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) },
        _react2.default.createElement(_reactEventListener2.default, {
          target: 'window',
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp
        }),
        inputElement,
        elementsInOrder
      );
    }
  }]);
  return EnhancedSwitch;
}(_react.Component);

EnhancedSwitch.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
EnhancedSwitch.propTypes = process.env.NODE_ENV !== "production" ? {
  checked: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  defaultChecked: _propTypes2.default.bool,
  disableFocusRipple: _propTypes2.default.bool,
  disableTouchRipple: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  iconStyle: _propTypes2.default.object,
  inputStyle: _propTypes2.default.object,
  inputType: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.node,
  labelPosition: _propTypes2.default.oneOf(['left', 'right']),
  labelStyle: _propTypes2.default.object,
  name: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onParentShouldUpdate: _propTypes2.default.func,
  onSwitch: _propTypes2.default.func,
  onTouchEnd: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  rippleColor: _propTypes2.default.string,
  rippleStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  switchElement: _propTypes2.default.element.isRequired,
  switched: _propTypes2.default.bool.isRequired,
  thumbStyle: _propTypes2.default.object,
  trackStyle: _propTypes2.default.object,
  value: _propTypes2.default.any
} : {};
exports.default = EnhancedSwitch;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = __webpack_require__(85);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _ScaleInChild = __webpack_require__(174);

var _ScaleInChild2 = _interopRequireDefault(_ScaleInChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScaleIn = function (_Component) {
  (0, _inherits3.default)(ScaleIn, _Component);

  function ScaleIn() {
    (0, _classCallCheck3.default)(this, ScaleIn);
    return (0, _possibleConstructorReturn3.default)(this, (ScaleIn.__proto__ || (0, _getPrototypeOf2.default)(ScaleIn)).apply(this, arguments));
  }

  (0, _createClass3.default)(ScaleIn, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          childStyle = _props.childStyle,
          enterDelay = _props.enterDelay,
          maxScale = _props.maxScale,
          minScale = _props.minScale,
          style = _props.style,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'childStyle', 'enterDelay', 'maxScale', 'minScale', 'style']);
      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        position: 'relative',
        height: '100%'
      }, style);

      var newChildren = _react2.default.Children.map(children, function (child) {
        return _react2.default.createElement(
          _ScaleInChild2.default,
          {
            key: child.key,
            enterDelay: enterDelay,
            maxScale: maxScale,
            minScale: minScale,
            style: childStyle
          },
          child
        );
      });

      return _react2.default.createElement(
        _TransitionGroup2.default,
        (0, _extends3.default)({}, other, {
          style: prepareStyles(mergedRootStyles),
          component: 'div'
        }),
        newChildren
      );
    }
  }]);
  return ScaleIn;
}(_react.Component);

ScaleIn.defaultProps = {
  enterDelay: 0
};
ScaleIn.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
ScaleIn.propTypes = process.env.NODE_ENV !== "production" ? {
  childStyle: _propTypes2.default.object,
  children: _propTypes2.default.node,
  enterDelay: _propTypes2.default.number,
  maxScale: _propTypes2.default.number,
  minScale: _propTypes2.default.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};
exports.default = ScaleIn;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__(0);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children) {
  if (!children) {
    return children;
  }
  var result = {};
  _react.Children.map(children, function (child) {
    return child;
  }).forEach(function (child) {
    result[child.key] = child;
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    if (next.hasOwnProperty(key)) {
      return next[key];
    }

    return prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = {};

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _autoPrefix = __webpack_require__(84);

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScaleInChild = function (_Component) {
  (0, _inherits3.default)(ScaleInChild, _Component);

  function ScaleInChild() {
    (0, _classCallCheck3.default)(this, ScaleInChild);
    return (0, _possibleConstructorReturn3.default)(this, (ScaleInChild.__proto__ || (0, _getPrototypeOf2.default)(ScaleInChild)).apply(this, arguments));
  }

  (0, _createClass3.default)(ScaleInChild, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.enterTimer);
      clearTimeout(this.leaveTimer);
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(callback) {
      this.initializeAnimation(callback);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      this.initializeAnimation(callback);
    }
  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      this.animate();
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      this.animate();
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      var style = _reactDom2.default.findDOMNode(this).style;

      style.opacity = '0';
      _autoPrefix2.default.set(style, 'transform', 'scale(' + this.props.minScale + ')');

      this.leaveTimer = setTimeout(callback, 450);
    }
  }, {
    key: 'animate',
    value: function animate() {
      var style = _reactDom2.default.findDOMNode(this).style;

      style.opacity = '1';
      _autoPrefix2.default.set(style, 'transform', 'scale(' + this.props.maxScale + ')');
    }
  }, {
    key: 'initializeAnimation',
    value: function initializeAnimation(callback) {
      var style = _reactDom2.default.findDOMNode(this).style;

      style.opacity = '0';
      _autoPrefix2.default.set(style, 'transform', 'scale(0)');

      this.enterTimer = setTimeout(callback, this.props.enterDelay);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          enterDelay = _props.enterDelay,
          maxScale = _props.maxScale,
          minScale = _props.minScale,
          style = _props.style,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'enterDelay', 'maxScale', 'minScale', 'style']);
      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        transition: _transitions2.default.easeOut(null, ['transform', 'opacity'])
      }, style);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, { style: prepareStyles(mergedRootStyles) }),
        children
      );
    }
  }]);
  return ScaleInChild;
}(_react.Component);

ScaleInChild.defaultProps = {
  enterDelay: 0,
  maxScale: 1,
  minScale: 0
};
ScaleInChild.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
ScaleInChild.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.node,
  enterDelay: _propTypes2.default.number,
  maxScale: _propTypes2.default.number,
  minScale: _propTypes2.default.number,
  style: _propTypes2.default.object
} : {};
exports.default = ScaleInChild;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(98);
__webpack_require__(176);
module.exports = __webpack_require__(42).Array.from;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(70);
var $export = __webpack_require__(44);
var toObject = __webpack_require__(60);
var call = __webpack_require__(177);
var isArrayIter = __webpack_require__(178);
var toLength = __webpack_require__(94);
var createProperty = __webpack_require__(179);
var getIterFn = __webpack_require__(180);

$export($export.S + $export.F * !__webpack_require__(182)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(50);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(61);
var ITERATOR = __webpack_require__(43)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(46);
var createDesc = __webpack_require__(58);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(181);
var ITERATOR = __webpack_require__(43)('iterator');
var Iterators = __webpack_require__(61);
module.exports = __webpack_require__(42).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(72);
var TAG = __webpack_require__(43)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(43)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(106);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  return Array.isArray(arr) ? arr : (0, _from2.default)(arr);
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _shallowEqual = __webpack_require__(66);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _autoPrefix = __webpack_require__(84);

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CircleRipple = function (_Component) {
  (0, _inherits3.default)(CircleRipple, _Component);

  function CircleRipple() {
    (0, _classCallCheck3.default)(this, CircleRipple);
    return (0, _possibleConstructorReturn3.default)(this, (CircleRipple.__proto__ || (0, _getPrototypeOf2.default)(CircleRipple)).apply(this, arguments));
  }

  (0, _createClass3.default)(CircleRipple, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual2.default)(this.props, nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.enterTimer);
      clearTimeout(this.leaveTimer);
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(callback) {
      this.initializeAnimation(callback);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      this.initializeAnimation(callback);
    }
  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      this.animate();
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      this.animate();
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      var style = _reactDom2.default.findDOMNode(this).style;
      style.opacity = 0;
      // If the animation is aborted, remove from the DOM immediately
      var removeAfter = this.props.aborted ? 0 : 2000;
      this.enterTimer = setTimeout(callback, removeAfter);
    }
  }, {
    key: 'animate',
    value: function animate() {
      var style = _reactDom2.default.findDOMNode(this).style;
      var transitionValue = _transitions2.default.easeOut('2s', 'opacity') + ', ' + _transitions2.default.easeOut('1s', 'transform');
      _autoPrefix2.default.set(style, 'transition', transitionValue);
      _autoPrefix2.default.set(style, 'transform', 'scale(1)');
    }
  }, {
    key: 'initializeAnimation',
    value: function initializeAnimation(callback) {
      var style = _reactDom2.default.findDOMNode(this).style;
      style.opacity = this.props.opacity;
      _autoPrefix2.default.set(style, 'transform', 'scale(0)');
      this.leaveTimer = setTimeout(callback, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          aborted = _props.aborted,
          color = _props.color,
          opacity = _props.opacity,
          style = _props.style,
          touchGenerated = _props.touchGenerated,
          other = (0, _objectWithoutProperties3.default)(_props, ['aborted', 'color', 'opacity', 'style', 'touchGenerated']);
      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedStyles = (0, _simpleAssign2.default)({
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        backgroundColor: color
      }, style);

      return _react2.default.createElement('div', (0, _extends3.default)({}, other, { style: prepareStyles(mergedStyles) }));
    }
  }]);
  return CircleRipple;
}(_react.Component);

CircleRipple.defaultProps = {
  opacity: 0.1,
  aborted: false
};
CircleRipple.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
CircleRipple.propTypes = process.env.NODE_ENV !== "production" ? {
  aborted: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  opacity: _propTypes2.default.number,
  style: _propTypes2.default.object,
  touchGenerated: _propTypes2.default.bool
} : {};
exports.default = CircleRipple;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propTypes3 = __webpack_require__(86);

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var rounded = props.rounded,
      circle = props.circle,
      transitionEnabled = props.transitionEnabled,
      zDepth = props.zDepth;
  var _context$muiTheme = context.muiTheme,
      baseTheme = _context$muiTheme.baseTheme,
      paper = _context$muiTheme.paper,
      borderRadius = _context$muiTheme.borderRadius;


  return {
    root: {
      color: paper.color,
      backgroundColor: paper.backgroundColor,
      transition: transitionEnabled && _transitions2.default.easeOut(),
      boxSizing: 'border-box',
      fontFamily: baseTheme.fontFamily,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      boxShadow: paper.zDepthShadows[zDepth - 1], // No shadow for 0 depth papers
      borderRadius: circle ? '50%' : rounded ? borderRadius : '0px'
    }
  };
}

var Paper = function (_Component) {
  (0, _inherits3.default)(Paper, _Component);

  function Paper() {
    (0, _classCallCheck3.default)(this, Paper);
    return (0, _possibleConstructorReturn3.default)(this, (Paper.__proto__ || (0, _getPrototypeOf2.default)(Paper)).apply(this, arguments));
  }

  (0, _createClass3.default)(Paper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          circle = _props.circle,
          rounded = _props.rounded,
          style = _props.style,
          transitionEnabled = _props.transitionEnabled,
          zDepth = _props.zDepth,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'circle', 'rounded', 'style', 'transitionEnabled', 'zDepth']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
        children
      );
    }
  }]);
  return Paper;
}(_react.Component);

Paper.defaultProps = {
  circle: false,
  rounded: true,
  transitionEnabled: true,
  zDepth: 1
};
Paper.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
Paper.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Children passed into the paper element.
   */
  children: _propTypes2.default.node,
  /**
   * Set to true to generate a circular paper container.
   */
  circle: _propTypes2.default.bool,
  /**
   * By default, the paper container will have a border radius.
   * Set this to false to generate a container with sharp corners.
   */
  rounded: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * Set to false to disable CSS transitions for the paper element.
   */
  transitionEnabled: _propTypes2.default.bool,
  /**
   * This number represents the zDepth of the paper shadow.
   */
  zDepth: _propTypes4.default.zDepth
} : {};
exports.default = Paper;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pure = __webpack_require__(55);

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = __webpack_require__(56);

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToggleCheckBoxOutlineBlank = function ToggleCheckBoxOutlineBlank(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' })
  );
};
ToggleCheckBoxOutlineBlank = (0, _pure2.default)(ToggleCheckBoxOutlineBlank);
ToggleCheckBoxOutlineBlank.displayName = 'ToggleCheckBoxOutlineBlank';
ToggleCheckBoxOutlineBlank.muiName = 'SvgIcon';

exports.default = ToggleCheckBoxOutlineBlank;

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(0);

var _setDisplayName = __webpack_require__(108);

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = __webpack_require__(109);

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shouldUpdate = function shouldUpdate(test) {
  return function (BaseComponent) {
    var factory = (0, _react.createFactory)(BaseComponent);

    var ShouldUpdate = function (_Component) {
      _inherits(ShouldUpdate, _Component);

      function ShouldUpdate() {
        _classCallCheck(this, ShouldUpdate);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      ShouldUpdate.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return test(this.props, nextProps);
      };

      ShouldUpdate.prototype.render = function render() {
        return factory(this.props);
      };

      return ShouldUpdate;
    }(_react.Component);

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'shouldUpdate'))(ShouldUpdate);
    }
    return ShouldUpdate;
  };
};

exports.default = shouldUpdate;

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var setStatic = function setStatic(key, value) {
  return function (BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */
    return BaseComponent;
  };
};

exports.default = setStatic;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

exports.default = getDisplayName;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgIcon = function (_Component) {
  (0, _inherits3.default)(SvgIcon, _Component);

  function SvgIcon() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SvgIcon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SvgIcon.__proto__ || (0, _getPrototypeOf2.default)(SvgIcon)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hovered: false
    }, _this.handleMouseLeave = function (event) {
      _this.setState({ hovered: false });
      _this.props.onMouseLeave(event);
    }, _this.handleMouseEnter = function (event) {
      _this.setState({ hovered: true });
      _this.props.onMouseEnter(event);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SvgIcon, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          color = _props.color,
          hoverColor = _props.hoverColor,
          onMouseEnter = _props.onMouseEnter,
          onMouseLeave = _props.onMouseLeave,
          style = _props.style,
          viewBox = _props.viewBox,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'color', 'hoverColor', 'onMouseEnter', 'onMouseLeave', 'style', 'viewBox']);
      var _context$muiTheme = this.context.muiTheme,
          svgIcon = _context$muiTheme.svgIcon,
          prepareStyles = _context$muiTheme.prepareStyles;


      var offColor = color ? color : 'currentColor';
      var onColor = hoverColor ? hoverColor : offColor;

      var mergedStyles = (0, _simpleAssign2.default)({
        display: 'inline-block',
        color: svgIcon.color,
        fill: this.state.hovered ? onColor : offColor,
        height: 24,
        width: 24,
        userSelect: 'none',
        transition: _transitions2.default.easeOut()
      }, style);

      return _react2.default.createElement(
        'svg',
        (0, _extends3.default)({}, other, {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          style: prepareStyles(mergedStyles),
          viewBox: viewBox
        }),
        children
      );
    }
  }]);
  return SvgIcon;
}(_react.Component);

SvgIcon.muiName = 'SvgIcon';
SvgIcon.defaultProps = {
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},
  viewBox: '0 0 24 24'
};
SvgIcon.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
SvgIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Elements passed into the SVG Icon.
   */
  children: _propTypes2.default.node,
  /**
   * This is the fill color of the svg icon.
   * If not specified, this component will default
   * to muiTheme.palette.textColor.
   */
  color: _propTypes2.default.string,
  /**
   * This is the icon color when the mouse hovers over the icon.
   */
  hoverColor: _propTypes2.default.string,
  /** @ignore */
  onMouseEnter: _propTypes2.default.func,
  /** @ignore */
  onMouseLeave: _propTypes2.default.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * Allows you to redefine what the coordinates
   * without units mean inside an svg element. For example,
   * if the SVG element is 500 (width) by 200 (height), and you
   * pass viewBox="0 0 50 20", this means that the coordinates inside
   * the svg will go from the top left corner (0,0) to bottom right (50,20)
   * and each unit will be worth 10px.
   */
  viewBox: _propTypes2.default.string
} : {};
exports.default = SvgIcon;

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pure = __webpack_require__(55);

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = __webpack_require__(56);

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToggleCheckBox = function ToggleCheckBox(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' })
  );
};
ToggleCheckBox = (0, _pure2.default)(ToggleCheckBox);
ToggleCheckBox.displayName = 'ToggleCheckBox';
ToggleCheckBox.muiName = 'SvgIcon';

exports.default = ToggleCheckBox;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _RaisedButton = __webpack_require__(193);

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _RaisedButton2.default;

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

var _colorManipulator = __webpack_require__(67);

var _EnhancedButton = __webpack_require__(68);

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

var _Paper = __webpack_require__(54);

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateLabel(props, propName, componentName) {
  if (process.env.NODE_ENV !== 'production') {
    if (!props.children && props.label !== 0 && !props.label && !props.icon) {
      return new Error('Required prop label or children or icon was not specified in ' + componentName + '.');
    }
  }
}

function getStyles(props, context, state) {
  var _context$muiTheme = context.muiTheme,
      baseTheme = _context$muiTheme.baseTheme,
      button = _context$muiTheme.button,
      raisedButton = _context$muiTheme.raisedButton,
      borderRadius = _context$muiTheme.borderRadius;
  var disabled = props.disabled,
      disabledBackgroundColor = props.disabledBackgroundColor,
      disabledLabelColor = props.disabledLabelColor,
      fullWidth = props.fullWidth,
      icon = props.icon,
      label = props.label,
      labelPosition = props.labelPosition,
      primary = props.primary,
      secondary = props.secondary,
      style = props.style;


  var amount = primary || secondary ? 0.4 : 0.08;

  var backgroundColor = raisedButton.color;
  var labelColor = raisedButton.textColor;

  if (disabled) {
    backgroundColor = disabledBackgroundColor || raisedButton.disabledColor;
    labelColor = disabledLabelColor || raisedButton.disabledTextColor;
  } else if (primary) {
    backgroundColor = raisedButton.primaryColor;
    labelColor = raisedButton.primaryTextColor;
  } else if (secondary) {
    backgroundColor = raisedButton.secondaryColor;
    labelColor = raisedButton.secondaryTextColor;
  } else {
    if (props.backgroundColor) {
      backgroundColor = props.backgroundColor;
    }
    if (props.labelColor) {
      labelColor = props.labelColor;
    }
  }

  var buttonHeight = style && style.height || button.height;

  return {
    root: {
      display: 'inline-block',
      transition: _transitions2.default.easeOut(),
      minWidth: fullWidth ? '100%' : button.minWidth
    },
    button: {
      height: buttonHeight,
      lineHeight: buttonHeight + 'px',
      width: '100%',
      padding: 0,
      borderRadius: borderRadius,
      transition: _transitions2.default.easeOut(),
      backgroundColor: backgroundColor,
      // That's the default value for a button but not a link
      textAlign: 'center'
    },
    label: {
      position: 'relative',
      opacity: 1,
      fontSize: raisedButton.fontSize,
      letterSpacing: 0,
      textTransform: raisedButton.textTransform || button.textTransform || 'uppercase',
      fontWeight: raisedButton.fontWeight,
      margin: 0,
      userSelect: 'none',
      paddingLeft: icon && labelPosition !== 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      paddingRight: icon && labelPosition === 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      color: labelColor
    },
    icon: {
      verticalAlign: 'middle',
      marginLeft: label && labelPosition !== 'before' ? 12 : 0,
      marginRight: label && labelPosition === 'before' ? 12 : 0
    },
    overlay: {
      height: buttonHeight,
      borderRadius: borderRadius,
      backgroundColor: (state.keyboardFocused || state.hovered) && !disabled && (0, _colorManipulator.fade)(labelColor, amount),
      transition: _transitions2.default.easeOut(),
      top: 0
    },
    ripple: {
      color: labelColor,
      opacity: !(primary || secondary) ? 0.1 : 0.16
    }
  };
}

var RaisedButton = function (_Component) {
  (0, _inherits3.default)(RaisedButton, _Component);

  function RaisedButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RaisedButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RaisedButton.__proto__ || (0, _getPrototypeOf2.default)(RaisedButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hovered: false,
      keyboardFocused: false,
      touched: false,
      initialZDepth: 0,
      zDepth: 0
    }, _this.handleMouseDown = function (event) {
      // only listen to left clicks
      if (event.button === 0) {
        _this.setState({
          zDepth: _this.state.initialZDepth + 1
        });
      }
      if (_this.props.onMouseDown) {
        _this.props.onMouseDown(event);
      }
    }, _this.handleMouseUp = function (event) {
      _this.setState({
        zDepth: _this.state.initialZDepth
      });
      if (_this.props.onMouseUp) {
        _this.props.onMouseUp(event);
      }
    }, _this.handleMouseLeave = function (event) {
      if (!_this.state.keyboardFocused) {
        _this.setState({
          zDepth: _this.state.initialZDepth,
          hovered: false
        });
      }
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    }, _this.handleMouseEnter = function (event) {
      if (!_this.state.keyboardFocused && !_this.state.touched) {
        _this.setState({
          hovered: true
        });
      }
      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    }, _this.handleTouchStart = function (event) {
      _this.setState({
        touched: true,
        zDepth: _this.state.initialZDepth + 1
      });

      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(event);
      }
    }, _this.handleTouchEnd = function (event) {
      _this.setState({
        touched: true,
        zDepth: _this.state.initialZDepth
      });

      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(event);
      }
    }, _this.handleKeyboardFocus = function (event, keyboardFocused) {
      var zDepth = keyboardFocused && !_this.props.disabled ? _this.state.initialZDepth + 1 : _this.state.initialZDepth;

      _this.setState({
        zDepth: zDepth,
        keyboardFocused: keyboardFocused
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RaisedButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var zDepth = this.props.disabled ? 0 : 1;
      this.setState({
        zDepth: zDepth,
        initialZDepth: zDepth
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var zDepth = nextProps.disabled ? 0 : 1;
      var nextState = {
        zDepth: zDepth,
        initialZDepth: zDepth
      };

      if (nextProps.disabled) {
        nextState.hovered = false;
      }

      this.setState(nextState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          backgroundColor = _props.backgroundColor,
          buttonStyle = _props.buttonStyle,
          children = _props.children,
          className = _props.className,
          disabled = _props.disabled,
          disabledBackgroundColor = _props.disabledBackgroundColor,
          disabledLabelColor = _props.disabledLabelColor,
          fullWidth = _props.fullWidth,
          icon = _props.icon,
          label = _props.label,
          labelColor = _props.labelColor,
          labelPosition = _props.labelPosition,
          labelStyle = _props.labelStyle,
          overlayStyle = _props.overlayStyle,
          primary = _props.primary,
          rippleStyle = _props.rippleStyle,
          secondary = _props.secondary,
          style = _props.style,
          other = (0, _objectWithoutProperties3.default)(_props, ['backgroundColor', 'buttonStyle', 'children', 'className', 'disabled', 'disabledBackgroundColor', 'disabledLabelColor', 'fullWidth', 'icon', 'label', 'labelColor', 'labelPosition', 'labelStyle', 'overlayStyle', 'primary', 'rippleStyle', 'secondary', 'style']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);
      var mergedRippleStyles = (0, _simpleAssign2.default)({}, styles.ripple, rippleStyle);

      var buttonEventHandlers = disabled ? {} : {
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
        onMouseEnter: this.handleMouseEnter,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd,
        onKeyboardFocus: this.handleKeyboardFocus
      };

      var labelElement = label && _react2.default.createElement(
        'span',
        { style: prepareStyles((0, _simpleAssign2.default)(styles.label, labelStyle)), key: 'labelElement' },
        label
      );

      var iconCloned = icon && (0, _react.cloneElement)(icon, {
        color: icon.props.color || styles.label.color,
        style: (0, _simpleAssign2.default)(styles.icon, icon.props.style),
        key: 'iconCloned'
      });

      // Place label before or after children.
      var enhancedButtonChildren = labelPosition === 'before' ? [labelElement, iconCloned, children] : [children, iconCloned, labelElement];

      return _react2.default.createElement(
        _Paper2.default,
        {
          className: className,
          style: (0, _simpleAssign2.default)(styles.root, style),
          zDepth: this.state.zDepth
        },
        _react2.default.createElement(
          _EnhancedButton2.default,
          (0, _extends3.default)({}, other, buttonEventHandlers, {
            ref: 'container',
            disabled: disabled,
            style: (0, _simpleAssign2.default)(styles.button, buttonStyle),
            focusRippleColor: mergedRippleStyles.color,
            touchRippleColor: mergedRippleStyles.color,
            focusRippleOpacity: mergedRippleStyles.opacity,
            touchRippleOpacity: mergedRippleStyles.opacity
          }),
          _react2.default.createElement(
            'div',
            {
              ref: 'overlay',
              style: prepareStyles((0, _simpleAssign2.default)(styles.overlay, overlayStyle))
            },
            enhancedButtonChildren
          )
        )
      );
    }
  }]);
  return RaisedButton;
}(_react.Component);

RaisedButton.muiName = 'RaisedButton';
RaisedButton.defaultProps = {
  disabled: false,
  labelPosition: 'after',
  fullWidth: false,
  primary: false,
  secondary: false
};
RaisedButton.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
RaisedButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Override the default background color for the button,
   * but not the default disabled background color
   * (use `disabledBackgroundColor` for this).
   */
  backgroundColor: _propTypes2.default.string,
  /**
   * Override the inline-styles of the button element.
   */
  buttonStyle: _propTypes2.default.object,
  /**
   * The content of the button.
   * If a label is provided via the `label` prop, the text within the label
   * will be displayed in addition to the content provided here.
   */
  children: _propTypes2.default.node,
  /**
   * The CSS class name of the root element.
   */
  className: _propTypes2.default.string,
  /**
    * The element to use as the container for the RaisedButton. Either a string to
    * use a DOM element or a ReactElement. This is useful for wrapping the
    * RaisedButton in a custom Link component. If a ReactElement is given, ensure
    * that it passes all of its given props through to the underlying DOM
    * element and renders its children prop for proper integration.
    */
  containerElement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  /**
   * If true, the element's ripple effect will be disabled.
   */
  disableTouchRipple: _propTypes2.default.bool,
  /**
   * If true, the button will be disabled.
   */
  disabled: _propTypes2.default.bool,
  /**
   * Override the default background color for the button
   * when it is disabled.
   */
  disabledBackgroundColor: _propTypes2.default.string,
  /**
   * The color of the button's label when the button is disabled.
   */
  disabledLabelColor: _propTypes2.default.string,
  /**
   * If true, the button will take up the full width of its container.
   */
  fullWidth: _propTypes2.default.bool,
  /**
   * The URL to link to when the button is clicked.
   */
  href: _propTypes2.default.string,
  /**
   * An icon to be displayed within the button.
   */
  icon: _propTypes2.default.node,
  /**
   * The label to be displayed within the button.
   * If content is provided via the `children` prop, that content will be
   * displayed in addition to the label provided here.
   */
  label: validateLabel,
  /**
   * The color of the button's label.
   */
  labelColor: _propTypes2.default.string,
  /**
   * The position of the button's label relative to the button's `children`.
   */
  labelPosition: _propTypes2.default.oneOf(['before', 'after']),
  /**
   * Override the inline-styles of the button's label element.
   */
  labelStyle: _propTypes2.default.object,
  /**
   * Callback function fired when the button is clicked.
   *
   * @param {object} event Click event targeting the button.
   */
  onClick: _propTypes2.default.func,
  /** @ignore */
  onMouseDown: _propTypes2.default.func,
  /** @ignore */
  onMouseEnter: _propTypes2.default.func,
  /** @ignore */
  onMouseLeave: _propTypes2.default.func,
  /** @ignore */
  onMouseUp: _propTypes2.default.func,
  /** @ignore */
  onTouchEnd: _propTypes2.default.func,
  /** @ignore */
  onTouchStart: _propTypes2.default.func,
  /**
   * Override the inline style of the button overlay.
   */
  overlayStyle: _propTypes2.default.object,
  /**
   * If true, the button will use the theme's primary color.
   */
  primary: _propTypes2.default.bool,
  /**
   * Override the inline style of the ripple element.
   */
  rippleStyle: _propTypes2.default.object,
  /**
   * If true, the button will use the theme's secondary color.
   * If both `secondary` and `primary` are true, the button will use
   * the theme's primary color.
   */
  secondary: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};
exports.default = RaisedButton;

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  once: function once(el, type, callback) {
    var typeArray = type ? type.split(' ') : [];
    var recursiveFunction = function recursiveFunction(event) {
      event.target.removeEventListener(event.type, recursiveFunction);
      return callback(event);
    };

    for (var i = typeArray.length - 1; i >= 0; i--) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },
  on: function on(el, type, callback) {
    if (el.addEventListener) {
      el.addEventListener(type, callback);
    } else {
      // IE8+ Support
      el.attachEvent('on' + type, function () {
        callback.call(el);
      });
    }
  },
  off: function off(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback);
    } else {
      // IE8+ Support
      el.detachEvent('on' + type, callback);
    }
  },
  isKeyboard: function isKeyboard(event) {
    return ['keydown', 'keypress', 'keyup'].indexOf(event.type) !== -1;
  }
};

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = __webpack_require__(63);

var _colorManipulator = __webpack_require__(67);

var _spacing = __webpack_require__(196);

var _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
exports.default = {
  spacing: _spacing2.default,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: _colors.cyan500,
    primary2Color: _colors.cyan700,
    primary3Color: _colors.grey400,
    accent1Color: _colors.pinkA200,
    accent2Color: _colors.grey100,
    accent3Color: _colors.grey500,
    textColor: _colors.darkBlack,
    secondaryTextColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.54),
    alternateTextColor: _colors.white,
    canvasColor: _colors.white,
    borderColor: _colors.grey300,
    disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
    pickerHeaderColor: _colors.cyan500,
    clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
    shadowColor: _colors.fullBlack
  }
}; /**
    * NB: If you update this file, please also update `docs/src/app/customization/Themes.js`
    */

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  iconSize: 24,

  desktopGutter: 24,
  desktopGutterMore: 32,
  desktopGutterLess: 16,
  desktopGutterMini: 8,
  desktopKeylineIncrement: 64,
  desktopDropDownMenuItemHeight: 32,
  desktopDropDownMenuFontSize: 15,
  desktopDrawerMenuItemHeight: 48,
  desktopSubheaderHeight: 48,
  desktopToolbarHeight: 56
};

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  menu: 1000,
  appBar: 1100,
  drawerOverlay: 1200,
  drawer: 1300,
  dialogOverlay: 1400,
  dialog: 1500,
  layer: 2000,
  popover: 2100,
  snackbar: 2900,
  tooltip: 3000
};

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (muiTheme) {
  var isClient = typeof navigator !== 'undefined';
  var userAgent = muiTheme.userAgent;

  if (userAgent === undefined && isClient) {
    userAgent = navigator.userAgent;
  }

  if (userAgent === undefined && !hasWarnedAboutUserAgent) {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI: userAgent should be supplied in the muiTheme context\n      for server-side rendering.') : void 0;

    hasWarnedAboutUserAgent = true;
  }

  var prefixAll = (0, _createPrefixer2.default)(_autoprefixerStatic2.default);

  if (userAgent === false) {
    // Disabled autoprefixer
    return null;
  } else if (userAgent === 'all' || userAgent === undefined) {
    // Prefix for all user agent
    return function (style) {
      var isFlex = ['flex', 'inline-flex'].indexOf(style.display) !== -1;
      var stylePrefixed = prefixAll(style);

      if (isFlex) {
        var display = stylePrefixed.display;
        if (isClient) {
          // We can't apply this join with react-dom:
          // #https://github.com/facebook/react/issues/6467
          stylePrefixed.display = display[display.length - 1];
        } else {
          stylePrefixed.display = display.join('; display: ');
        }
      }

      return stylePrefixed;
    };
  } else {
    var Prefixer = (0, _createPrefixer4.default)(_autoprefixerDynamic2.default, prefixAll);
    var prefixer = new Prefixer({
      userAgent: userAgent
    });

    return function (style) {
      return prefixer.prefix(style);
    };
  }
};

var _createPrefixer = __webpack_require__(199);

var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

var _createPrefixer3 = __webpack_require__(201);

var _createPrefixer4 = _interopRequireDefault(_createPrefixer3);

var _autoprefixerDynamic = __webpack_require__(204);

var _autoprefixerDynamic2 = _interopRequireDefault(_autoprefixerDynamic);

var _autoprefixerStatic = __webpack_require__(212);

var _autoprefixerStatic2 = _interopRequireDefault(_autoprefixerStatic);

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasWarnedAboutUserAgent = false;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPrefixer;

var _prefixProperty = __webpack_require__(200);

var _prefixProperty2 = _interopRequireDefault(_prefixProperty);

var _prefixValue = __webpack_require__(110);

var _prefixValue2 = _interopRequireDefault(_prefixValue);

var _addNewValuesOnly = __webpack_require__(111);

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = __webpack_require__(112);

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;

  function prefixAll(style) {
    for (var property in style) {
      var value = style[property];

      // handle nested objects
      if ((0, _isObject2.default)(value)) {
        style[property] = prefixAll(value);
        // handle array values
      } else if (Array.isArray(value)) {
        var combinedValue = [];

        for (var i = 0, len = value.length; i < len; ++i) {
          var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
          (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
        }

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (combinedValue.length > 0) {
          style[property] = combinedValue;
        }
      } else {
        var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (_processedValue) {
          style[property] = _processedValue;
        }

        (0, _prefixProperty2.default)(prefixMap, property, style);
      }
    }

    return style;
  }

  return prefixAll;
}
module.exports = exports['default'];

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;

var _capitalizeString = __webpack_require__(87);

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (prefixProperties.hasOwnProperty(property)) {
    var requiredPrefixes = prefixProperties[property];
    for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
      style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
    }
  }
}
module.exports = exports['default'];

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createPrefixer;

var _getBrowserInformation = __webpack_require__(202);

var _getBrowserInformation2 = _interopRequireDefault(_getBrowserInformation);

var _getPrefixedKeyframes = __webpack_require__(203);

var _getPrefixedKeyframes2 = _interopRequireDefault(_getPrefixedKeyframes);

var _capitalizeString = __webpack_require__(87);

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _addNewValuesOnly = __webpack_require__(111);

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = __webpack_require__(112);

var _isObject2 = _interopRequireDefault(_isObject);

var _prefixValue = __webpack_require__(110);

var _prefixValue2 = _interopRequireDefault(_prefixValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (style) {
    return style;
  };

  return function () {
    /**
    * Instantiante a new prefixer
    * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
    * @param {string} keepUnprefixed - keeps unprefixed properties and values
    */
    function Prefixer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Prefixer);

      var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

      this._userAgent = options.userAgent || defaultUserAgent;
      this._keepUnprefixed = options.keepUnprefixed || false;

      if (this._userAgent) {
        this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);
      }

      // Checks if the userAgent was resolved correctly
      if (this._browserInfo && this._browserInfo.cssPrefix) {
        this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo.browserName, this._browserInfo.browserVersion, this._browserInfo.cssPrefix);
      } else {
        this._useFallback = true;
        return false;
      }

      var prefixData = this._browserInfo.browserName && prefixMap[this._browserInfo.browserName];
      if (prefixData) {
        this._requiresPrefix = {};

        for (var property in prefixData) {
          if (prefixData[property] >= this._browserInfo.browserVersion) {
            this._requiresPrefix[property] = true;
          }
        }

        this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
      } else {
        this._useFallback = true;
      }

      this._metaData = {
        browserVersion: this._browserInfo.browserVersion,
        browserName: this._browserInfo.browserName,
        cssPrefix: this._browserInfo.cssPrefix,
        jsPrefix: this._browserInfo.jsPrefix,
        keepUnprefixed: this._keepUnprefixed,
        requiresPrefix: this._requiresPrefix
      };
    }

    _createClass(Prefixer, [{
      key: 'prefix',
      value: function prefix(style) {
        // use static prefixer as fallback if userAgent can not be resolved
        if (this._useFallback) {
          return fallback(style);
        }

        // only add prefixes if needed
        if (!this._hasPropsRequiringPrefix) {
          return style;
        }

        return this._prefixStyle(style);
      }
    }, {
      key: '_prefixStyle',
      value: function _prefixStyle(style) {
        for (var property in style) {
          var value = style[property];

          // handle nested objects
          if ((0, _isObject2.default)(value)) {
            style[property] = this.prefix(value);
            // handle array values
          } else if (Array.isArray(value)) {
            var combinedValue = [];

            for (var i = 0, len = value.length; i < len; ++i) {
              var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, this._metaData);
              (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
            }

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (combinedValue.length > 0) {
              style[property] = combinedValue;
            }
          } else {
            var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, this._metaData);

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (_processedValue) {
              style[property] = _processedValue;
            }

            // add prefixes to properties
            if (this._requiresPrefix.hasOwnProperty(property)) {
              style[this._browserInfo.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
              if (!this._keepUnprefixed) {
                delete style[property];
              }
            }
          }
        }

        return style;
      }

      /**
      * Returns a prefixed version of the style object using all vendor prefixes
      * @param {Object} styles - Style object that gets prefixed properties added
      * @returns {Object} - Style object with prefixed properties and values
      */

    }], [{
      key: 'prefixAll',
      value: function prefixAll(styles) {
        return fallback(styles);
      }
    }]);

    return Prefixer;
  }();
}
module.exports = exports['default'];

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBrowserInformation;

var _bowser = __webpack_require__(24);

var _bowser2 = _interopRequireDefault(_bowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixByBrowser = {
  chrome: 'Webkit',
  safari: 'Webkit',
  ios: 'Webkit',
  android: 'Webkit',
  phantom: 'Webkit',
  opera: 'Webkit',
  webos: 'Webkit',
  blackberry: 'Webkit',
  bada: 'Webkit',
  tizen: 'Webkit',
  chromium: 'Webkit',
  vivaldi: 'Webkit',
  firefox: 'Moz',
  seamoney: 'Moz',
  sailfish: 'Moz',
  msie: 'ms',
  msedge: 'ms'
};


var browserByCanIuseAlias = {
  chrome: 'chrome',
  chromium: 'chrome',
  safari: 'safari',
  firfox: 'firefox',
  msedge: 'edge',
  opera: 'opera',
  vivaldi: 'opera',
  msie: 'ie'
};

function getBrowserName(browserInfo) {
  if (browserInfo.firefox) {
    return 'firefox';
  }

  if (browserInfo.mobile || browserInfo.tablet) {
    if (browserInfo.ios) {
      return 'ios_saf';
    } else if (browserInfo.android) {
      return 'android';
    } else if (browserInfo.opera) {
      return 'op_mini';
    }
  }

  for (var browser in browserByCanIuseAlias) {
    if (browserInfo.hasOwnProperty(browser)) {
      return browserByCanIuseAlias[browser];
    }
  }
}

/**
 * Uses bowser to get default browser browserInformation such as version and name
 * Evaluates bowser browserInfo and adds vendorPrefix browserInformation
 * @param {string} userAgent - userAgent that gets evaluated
 */
function getBrowserInformation(userAgent) {
  var browserInfo = _bowser2.default._detect(userAgent);

  if (browserInfo.yandexbrowser) {
    browserInfo = _bowser2.default._detect(userAgent.replace(/YaBrowser\/[0-9.]*/, ''));
  }

  for (var browser in prefixByBrowser) {
    if (browserInfo.hasOwnProperty(browser)) {
      var prefix = prefixByBrowser[browser];

      browserInfo.jsPrefix = prefix;
      browserInfo.cssPrefix = '-' + prefix.toLowerCase() + '-';
      break;
    }
  }

  browserInfo.browserName = getBrowserName(browserInfo);

  // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
  if (browserInfo.version) {
    browserInfo.browserVersion = parseFloat(browserInfo.version);
  } else {
    browserInfo.browserVersion = parseInt(parseFloat(browserInfo.osversion), 10);
  }

  browserInfo.osVersion = parseFloat(browserInfo.osversion);

  // iOS forces all browsers to use Safari under the hood
  // as the Safari version seems to match the iOS version
  // we just explicitely use the osversion instead
  // https://github.com/rofrischmann/inline-style-prefixer/issues/72
  if (browserInfo.browserName === 'ios_saf' && browserInfo.browserVersion > browserInfo.osVersion) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // seperate native android chrome
  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
  if (browserInfo.browserName === 'android' && browserInfo.chrome && browserInfo.browserVersion > 37) {
    browserInfo.browserName = 'and_chr';
  }

  // For android < 4.4 we want to check the osversion
  // not the chrome version, see issue #26
  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
  if (browserInfo.browserName === 'android' && browserInfo.osVersion < 5) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // Samsung browser are basically build on Chrome > 44
  // https://github.com/rofrischmann/inline-style-prefixer/issues/102
  if (browserInfo.browserName === 'android' && browserInfo.samsungBrowser) {
    browserInfo.browserName = 'and_chr';
    browserInfo.browserVersion = 44;
  }

  return browserInfo;
}
module.exports = exports['default'];

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedKeyframes;
function getPrefixedKeyframes(browserName, browserVersion, cssPrefix) {
  var prefixedKeyframes = 'keyframes';

  if (browserName === 'chrome' && browserVersion < 43 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 || browserName === 'opera' && browserVersion < 30 || browserName === 'android' && browserVersion <= 4.4 || browserName === 'and_uc') {
    return cssPrefix + prefixedKeyframes;
  }
  return prefixedKeyframes;
}
module.exports = exports['default'];

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calc = __webpack_require__(205);

var _calc2 = _interopRequireDefault(_calc);

var _flex = __webpack_require__(206);

var _flex2 = _interopRequireDefault(_flex);

var _flexboxIE = __webpack_require__(207);

var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

var _flexboxOld = __webpack_require__(208);

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _gradient = __webpack_require__(209);

var _gradient2 = _interopRequireDefault(_gradient);

var _sizing = __webpack_require__(210);

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = __webpack_require__(211);

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  plugins: [_calc2.default, _flex2.default, _flexboxIE2.default, _flexboxOld2.default, _gradient2.default, _sizing2.default, _transition2.default],
  prefixMap: { "chrome": { "transform": 35, "transformOrigin": 35, "transformOriginX": 35, "transformOriginY": 35, "backfaceVisibility": 35, "perspective": 35, "perspectiveOrigin": 35, "transformStyle": 35, "transformOriginZ": 35, "animation": 42, "animationDelay": 42, "animationDirection": 42, "animationFillMode": 42, "animationDuration": 42, "animationIterationCount": 42, "animationName": 42, "animationPlayState": 42, "animationTimingFunction": 42, "appearance": 60, "userSelect": 53, "fontKerning": 32, "textEmphasisPosition": 60, "textEmphasis": 60, "textEmphasisStyle": 60, "textEmphasisColor": 60, "boxDecorationBreak": 60, "clipPath": 54, "maskImage": 60, "maskMode": 60, "maskRepeat": 60, "maskPosition": 60, "maskClip": 60, "maskOrigin": 60, "maskSize": 60, "maskComposite": 60, "mask": 60, "maskBorderSource": 60, "maskBorderMode": 60, "maskBorderSlice": 60, "maskBorderWidth": 60, "maskBorderOutset": 60, "maskBorderRepeat": 60, "maskBorder": 60, "maskType": 60, "textDecorationStyle": 56, "textDecorationSkip": 56, "textDecorationLine": 56, "textDecorationColor": 56, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 49, "breakBefore": 49, "breakInside": 49, "columnCount": 49, "columnFill": 49, "columnGap": 49, "columnRule": 49, "columnRuleColor": 49, "columnRuleStyle": 49, "columnRuleWidth": 49, "columns": 49, "columnSpan": 49, "columnWidth": 49 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 10.1, "userSelect": 10.1, "backdropFilter": 10.1, "fontKerning": 9, "scrollSnapType": 10, "scrollSnapPointsX": 10, "scrollSnapPointsY": 10, "scrollSnapDestination": 10, "scrollSnapCoordinate": 10, "textEmphasisPosition": 7, "textEmphasis": 7, "textEmphasisStyle": 7, "textEmphasisColor": 7, "boxDecorationBreak": 10.1, "clipPath": 10.1, "maskImage": 10.1, "maskMode": 10.1, "maskRepeat": 10.1, "maskPosition": 10.1, "maskClip": 10.1, "maskOrigin": 10.1, "maskSize": 10.1, "maskComposite": 10.1, "mask": 10.1, "maskBorderSource": 10.1, "maskBorderMode": 10.1, "maskBorderSlice": 10.1, "maskBorderWidth": 10.1, "maskBorderOutset": 10.1, "maskBorderRepeat": 10.1, "maskBorder": 10.1, "maskType": 10.1, "textDecorationStyle": 10.1, "textDecorationSkip": 10.1, "textDecorationLine": 10.1, "textDecorationColor": 10.1, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10.1, "flowInto": 10.1, "flowFrom": 10.1, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 10.1, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 55, "userSelect": 55, "boxSizing": 28, "textAlignLast": 48, "textDecorationStyle": 35, "textDecorationSkip": 35, "textDecorationLine": 35, "textDecorationColor": 35, "tabSize": 55, "hyphens": 42, "fontFeatureSettings": 33, "breakAfter": 51, "breakBefore": 51, "breakInside": 51, "columnCount": 51, "columnFill": 51, "columnGap": 51, "columnRule": 51, "columnRuleColor": 51, "columnRuleStyle": 51, "columnRuleWidth": 51, "columns": 51, "columnSpan": 51, "columnWidth": 51 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 45, "userSelect": 40, "fontKerning": 19, "textEmphasisPosition": 45, "textEmphasis": 45, "textEmphasisStyle": 45, "textEmphasisColor": 45, "boxDecorationBreak": 45, "clipPath": 41, "maskImage": 45, "maskMode": 45, "maskRepeat": 45, "maskPosition": 45, "maskClip": 45, "maskOrigin": 45, "maskSize": 45, "maskComposite": 45, "mask": 45, "maskBorderSource": 45, "maskBorderMode": 45, "maskBorderSlice": 45, "maskBorderWidth": 45, "maskBorderOutset": 45, "maskBorderRepeat": 45, "maskBorder": 45, "maskType": 45, "textDecorationStyle": 43, "textDecorationSkip": 43, "textDecorationLine": 43, "textDecorationColor": 43, "filter": 39, "fontFeatureSettings": 34, "breakAfter": 36, "breakBefore": 36, "breakInside": 36, "columnCount": 36, "columnFill": 36, "columnGap": 36, "columnRule": 36, "columnRuleColor": 36, "columnRuleStyle": 36, "columnRuleWidth": 36, "columns": 36, "columnSpan": 36, "columnWidth": 36 }, "ie": { "flex": 10, "flexDirection": 10, "flexFlow": 10, "flexWrap": 10, "transform": 9, "transformOrigin": 9, "transformOriginX": 9, "transformOriginY": 9, "userSelect": 11, "wrapFlow": 11, "wrapThrough": 11, "wrapMargin": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "touchAction": 10, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "gridTemplateColumns": 11, "gridTemplateRows": 11, "gridTemplateAreas": 11, "gridTemplate": 11, "gridAutoColumns": 11, "gridAutoRows": 11, "gridAutoFlow": 11, "grid": 11, "gridRowStart": 11, "gridColumnStart": 11, "gridRowEnd": 11, "gridRow": 11, "gridColumn": 11, "gridColumnEnd": 11, "gridColumnGap": 11, "gridRowGap": 11, "gridArea": 11, "gridGap": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 15, "wrapFlow": 15, "wrapThrough": 15, "wrapMargin": 15, "scrollSnapType": 15, "scrollSnapPointsX": 15, "scrollSnapPointsY": 15, "scrollSnapDestination": 15, "scrollSnapCoordinate": 15, "hyphens": 15, "flowInto": 15, "flowFrom": 15, "breakBefore": 15, "breakAfter": 15, "breakInside": 15, "regionFragment": 15, "gridTemplateColumns": 15, "gridTemplateRows": 15, "gridTemplateAreas": 15, "gridTemplate": 15, "gridAutoColumns": 15, "gridAutoRows": 15, "gridAutoFlow": 15, "grid": 15, "gridRowStart": 15, "gridColumnStart": 15, "gridRowEnd": 15, "gridRow": 15, "gridColumn": 15, "gridColumnEnd": 15, "gridColumnGap": 15, "gridRowGap": 15, "gridArea": 15, "gridGap": 15 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 10, "userSelect": 10, "backdropFilter": 10, "fontKerning": 10, "scrollSnapType": 10, "scrollSnapPointsX": 10, "scrollSnapPointsY": 10, "scrollSnapDestination": 10, "scrollSnapCoordinate": 10, "boxDecorationBreak": 10, "clipPath": 10, "maskImage": 10, "maskMode": 10, "maskRepeat": 10, "maskPosition": 10, "maskClip": 10, "maskOrigin": 10, "maskSize": 10, "maskComposite": 10, "mask": 10, "maskBorderSource": 10, "maskBorderMode": 10, "maskBorderSlice": 10, "maskBorderWidth": 10, "maskBorderOutset": 10, "maskBorderRepeat": 10, "maskBorder": 10, "maskType": 10, "textSizeAdjust": 10, "textDecorationStyle": 10, "textDecorationSkip": 10, "textDecorationLine": 10, "textDecorationColor": 10, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10, "flowInto": 10, "flowFrom": 10, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 10, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "borderImage": 4.2, "borderImageOutset": 4.2, "borderImageRepeat": 4.2, "borderImageSlice": 4.2, "borderImageSource": 4.2, "borderImageWidth": 4.2, "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 53, "userSelect": 53, "fontKerning": 4.4, "textEmphasisPosition": 53, "textEmphasis": 53, "textEmphasisStyle": 53, "textEmphasisColor": 53, "boxDecorationBreak": 53, "clipPath": 53, "maskImage": 53, "maskMode": 53, "maskRepeat": 53, "maskPosition": 53, "maskClip": 53, "maskOrigin": 53, "maskSize": 53, "maskComposite": 53, "mask": 53, "maskBorderSource": 53, "maskBorderMode": 53, "maskBorderSlice": 53, "maskBorderWidth": 53, "maskBorderOutset": 53, "maskBorderRepeat": 53, "maskBorder": 53, "maskType": 53, "filter": 4.4, "fontFeatureSettings": 4.4, "breakAfter": 53, "breakBefore": 53, "breakInside": 53, "columnCount": 53, "columnFill": 53, "columnGap": 53, "columnRule": 53, "columnRuleColor": 53, "columnRuleStyle": 53, "columnRuleWidth": 53, "columns": 53, "columnSpan": 53, "columnWidth": 53 }, "and_chr": { "appearance": 56, "textEmphasisPosition": 56, "textEmphasis": 56, "textEmphasisStyle": 56, "textEmphasisColor": 56, "boxDecorationBreak": 56, "maskImage": 56, "maskMode": 56, "maskRepeat": 56, "maskPosition": 56, "maskClip": 56, "maskOrigin": 56, "maskSize": 56, "maskComposite": 56, "mask": 56, "maskBorderSource": 56, "maskBorderMode": 56, "maskBorderSlice": 56, "maskBorderWidth": 56, "maskBorderOutset": 56, "maskBorderRepeat": 56, "maskBorder": 56, "maskType": 56, "textDecorationStyle": 56, "textDecorationSkip": 56, "textDecorationLine": 56, "textDecorationColor": 56 }, "and_uc": { "flex": 11, "flexBasis": 11, "flexDirection": 11, "flexGrow": 11, "flexFlow": 11, "flexShrink": 11, "flexWrap": 11, "alignContent": 11, "alignItems": 11, "alignSelf": 11, "justifyContent": 11, "order": 11, "transition": 11, "transitionDelay": 11, "transitionDuration": 11, "transitionProperty": 11, "transitionTimingFunction": 11, "transform": 11, "transformOrigin": 11, "transformOriginX": 11, "transformOriginY": 11, "backfaceVisibility": 11, "perspective": 11, "perspectiveOrigin": 11, "transformStyle": 11, "transformOriginZ": 11, "animation": 11, "animationDelay": 11, "animationDirection": 11, "animationFillMode": 11, "animationDuration": 11, "animationIterationCount": 11, "animationName": 11, "animationPlayState": 11, "animationTimingFunction": 11, "appearance": 11, "userSelect": 11, "fontKerning": 11, "textEmphasisPosition": 11, "textEmphasis": 11, "textEmphasisStyle": 11, "textEmphasisColor": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textSizeAdjust": 11, "filter": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "fontFeatureSettings": 11, "columnCount": 11, "columnFill": 11, "columnGap": 11, "columnRule": 11, "columnRuleColor": 11, "columnRuleStyle": 11, "columnRuleWidth": 11, "columns": 11, "columnSpan": 11, "columnWidth": 11 }, "op_mini": {} }
}; /* eslint-disable */

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calc;

var _getPrefixedValue = __webpack_require__(57);

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calc(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('calc(') > -1 && (browserName === 'firefox' && browserVersion < 15 || browserName === 'chrome' && browserVersion < 25 || browserName === 'safari' && browserVersion < 6.1 || browserName === 'ios_saf' && browserVersion < 7)) {
    return (0, _getPrefixedValue2.default)(value.replace(/calc\(/g, cssPrefix + 'calc('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;

var _getPrefixedValue = __webpack_require__(57);

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = {
  flex: true,
  'inline-flex': true
};
function flex(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'display' && values[value] && (browserName === 'chrome' && browserVersion < 29 && browserVersion > 20 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 && browserVersion > 6 || browserName === 'opera' && (browserVersion === 15 || browserVersion === 16))) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxIE;

var _getPrefixedValue = __webpack_require__(57);

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  flex: 'flexbox',
  'inline-flex': 'inline-flexbox'
};

var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msFlexPreferredSize'
};

function flexboxIE(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if ((alternativeProps.hasOwnProperty(property) || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browserName === 'ie_mob' || browserName === 'ie') && browserVersion === 10) {
    delete requiresPrefix[property];

    if (!keepUnprefixed && !Array.isArray(style[property])) {
      delete style[property];
    }
    if (property === 'display' && alternativeValues.hasOwnProperty(value)) {
      return (0, _getPrefixedValue2.default)(cssPrefix + alternativeValues[value], value, keepUnprefixed);
    }
    if (alternativeProps.hasOwnProperty(property)) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }
}
module.exports = exports['default'];

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;

var _getPrefixedValue = __webpack_require__(57);

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
};


var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];
var properties = Object.keys(alternativeProps).concat(otherProps);

function flexboxOld(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if ((properties.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browserName === 'firefox' && browserVersion < 22 || browserName === 'chrome' && browserVersion < 21 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion <= 6.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    delete requiresPrefix[property];

    if (!keepUnprefixed && !Array.isArray(style[property])) {
      delete style[property];
    }
    if (property === 'flexDirection' && typeof value === 'string') {
      if (value.indexOf('column') > -1) {
        style.WebkitBoxOrient = 'vertical';
      } else {
        style.WebkitBoxOrient = 'horizontal';
      }
      if (value.indexOf('reverse') > -1) {
        style.WebkitBoxDirection = 'reverse';
      } else {
        style.WebkitBoxDirection = 'normal';
      }
    }
    if (property === 'display' && alternativeValues.hasOwnProperty(value)) {
      return (0, _getPrefixedValue2.default)(cssPrefix + alternativeValues[value], value, keepUnprefixed);
    }
    if (alternativeProps.hasOwnProperty(property)) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }
}
module.exports = exports['default'];

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _getPrefixedValue = __webpack_require__(57);

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
function gradient(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && values.test(value) && (browserName === 'firefox' && browserVersion < 16 || browserName === 'chrome' && browserVersion < 26 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 7 || (browserName === 'opera' || browserName === 'op_mini') && browserVersion < 12.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;

var _getPrefixedValue = __webpack_require__(57);

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};

var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true

  // TODO: chrome & opera support it
};function sizing(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // This might change in the future
  // Keep an eye on it
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateProperty = __webpack_require__(113);

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var requiresPrefixDashCased = void 0;

function transition(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    // memoize the prefix array for later use
    if (!requiresPrefixDashCased) {
      requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
        return (0, _hyphenateProperty2.default)(prop);
      });
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    requiresPrefixDashCased.forEach(function (prop) {
      multipleValues.forEach(function (val, index) {
        if (val.indexOf(prop) > -1 && prop !== 'order') {
          multipleValues[index] = val.replace(prop, cssPrefix + prop) + (keepUnprefixed ? ',' + val : '');
        }
      });
    });

    return multipleValues.join(',');
  }
}
module.exports = exports['default'];

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calc = __webpack_require__(213);

var _calc2 = _interopRequireDefault(_calc);

var _flex = __webpack_require__(214);

var _flex2 = _interopRequireDefault(_flex);

var _flexboxIE = __webpack_require__(215);

var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

var _flexboxOld = __webpack_require__(216);

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _gradient = __webpack_require__(217);

var _gradient2 = _interopRequireDefault(_gradient);

var _sizing = __webpack_require__(218);

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = __webpack_require__(219);

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  plugins: [_calc2.default, _flex2.default, _flexboxIE2.default, _flexboxOld2.default, _gradient2.default, _sizing2.default, _transition2.default],
  prefixMap: { "transform": ["Webkit", "ms"], "transformOrigin": ["Webkit", "ms"], "transformOriginX": ["Webkit", "ms"], "transformOriginY": ["Webkit", "ms"], "backfaceVisibility": ["Webkit"], "perspective": ["Webkit"], "perspectiveOrigin": ["Webkit"], "transformStyle": ["Webkit"], "transformOriginZ": ["Webkit"], "animation": ["Webkit"], "animationDelay": ["Webkit"], "animationDirection": ["Webkit"], "animationFillMode": ["Webkit"], "animationDuration": ["Webkit"], "animationIterationCount": ["Webkit"], "animationName": ["Webkit"], "animationPlayState": ["Webkit"], "animationTimingFunction": ["Webkit"], "appearance": ["Webkit", "Moz"], "userSelect": ["Webkit", "Moz", "ms"], "fontKerning": ["Webkit"], "textEmphasisPosition": ["Webkit"], "textEmphasis": ["Webkit"], "textEmphasisStyle": ["Webkit"], "textEmphasisColor": ["Webkit"], "boxDecorationBreak": ["Webkit"], "clipPath": ["Webkit"], "maskImage": ["Webkit"], "maskMode": ["Webkit"], "maskRepeat": ["Webkit"], "maskPosition": ["Webkit"], "maskClip": ["Webkit"], "maskOrigin": ["Webkit"], "maskSize": ["Webkit"], "maskComposite": ["Webkit"], "mask": ["Webkit"], "maskBorderSource": ["Webkit"], "maskBorderMode": ["Webkit"], "maskBorderSlice": ["Webkit"], "maskBorderWidth": ["Webkit"], "maskBorderOutset": ["Webkit"], "maskBorderRepeat": ["Webkit"], "maskBorder": ["Webkit"], "maskType": ["Webkit"], "textDecorationStyle": ["Webkit", "Moz"], "textDecorationSkip": ["Webkit", "Moz"], "textDecorationLine": ["Webkit", "Moz"], "textDecorationColor": ["Webkit", "Moz"], "filter": ["Webkit"], "fontFeatureSettings": ["Webkit", "Moz"], "breakAfter": ["Webkit", "Moz", "ms"], "breakBefore": ["Webkit", "Moz", "ms"], "breakInside": ["Webkit", "Moz", "ms"], "columnCount": ["Webkit", "Moz"], "columnFill": ["Webkit", "Moz"], "columnGap": ["Webkit", "Moz"], "columnRule": ["Webkit", "Moz"], "columnRuleColor": ["Webkit", "Moz"], "columnRuleStyle": ["Webkit", "Moz"], "columnRuleWidth": ["Webkit", "Moz"], "columns": ["Webkit", "Moz"], "columnSpan": ["Webkit", "Moz"], "columnWidth": ["Webkit", "Moz"], "flex": ["Webkit", "ms"], "flexBasis": ["Webkit"], "flexDirection": ["Webkit", "ms"], "flexGrow": ["Webkit"], "flexFlow": ["Webkit", "ms"], "flexShrink": ["Webkit"], "flexWrap": ["Webkit", "ms"], "alignContent": ["Webkit"], "alignItems": ["Webkit"], "alignSelf": ["Webkit"], "justifyContent": ["Webkit"], "order": ["Webkit"], "transitionDelay": ["Webkit"], "transitionDuration": ["Webkit"], "transitionProperty": ["Webkit"], "transitionTimingFunction": ["Webkit"], "backdropFilter": ["Webkit"], "scrollSnapType": ["Webkit", "ms"], "scrollSnapPointsX": ["Webkit", "ms"], "scrollSnapPointsY": ["Webkit", "ms"], "scrollSnapDestination": ["Webkit", "ms"], "scrollSnapCoordinate": ["Webkit", "ms"], "shapeImageThreshold": ["Webkit"], "shapeImageMargin": ["Webkit"], "shapeImageOutside": ["Webkit"], "hyphens": ["Webkit", "Moz", "ms"], "flowInto": ["Webkit", "ms"], "flowFrom": ["Webkit", "ms"], "regionFragment": ["Webkit", "ms"], "boxSizing": ["Moz"], "textAlignLast": ["Moz"], "tabSize": ["Moz"], "wrapFlow": ["ms"], "wrapThrough": ["ms"], "wrapMargin": ["ms"], "touchAction": ["ms"], "gridTemplateColumns": ["ms"], "gridTemplateRows": ["ms"], "gridTemplateAreas": ["ms"], "gridTemplate": ["ms"], "gridAutoColumns": ["ms"], "gridAutoRows": ["ms"], "gridAutoFlow": ["ms"], "grid": ["ms"], "gridRowStart": ["ms"], "gridColumnStart": ["ms"], "gridRowEnd": ["ms"], "gridRow": ["ms"], "gridColumn": ["ms"], "gridColumnEnd": ["ms"], "gridColumnGap": ["ms"], "gridRowGap": ["ms"], "gridArea": ["ms"], "gridGap": ["ms"], "textSizeAdjust": ["Webkit", "ms"], "borderImage": ["Webkit"], "borderImageOutset": ["Webkit"], "borderImageRepeat": ["Webkit"], "borderImageSlice": ["Webkit"], "borderImageSource": ["Webkit"], "borderImageWidth": ["Webkit"] }
}; /* eslint-disable */

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calc;

var _isPrefixedValue = __webpack_require__(88);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];
function calc(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('calc(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  'inline-flex': ['-webkit-inline-box', '-moz-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex']
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return values[value];
  }
}
module.exports = exports['default'];

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxIE;
var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msFlexPreferredSize'
};

function flexboxIE(property, value, style) {
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;
var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical';
    } else {
      style.WebkitBoxOrient = 'horizontal';
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse';
    } else {
      style.WebkitBoxDirection = 'normal';
    }
  }
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _isPrefixedValue = __webpack_require__(88);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;
var prefixes = ['-webkit-', '-moz-', ''];

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateProperty = __webpack_require__(113);

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

var _isPrefixedValue = __webpack_require__(88);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

var _capitalizeString = __webpack_require__(87);

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
};

function prefixValue(value, propertyPrefixMap) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  for (var i = 0, len = multipleValues.length; i < len; ++i) {
    var singleValue = multipleValues[i];
    var values = [singleValue];
    for (var property in propertyPrefixMap) {
      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        var prefixes = propertyPrefixMap[property];
        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
        }
      }
    }

    multipleValues[i] = values.join(',');
  }

  return multipleValues.join(',');
}

function transition(property, value, style, propertyPrefixMap) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var outputValue = prefixValue(value, propertyPrefixMap);
    // if the property is already prefixed
    var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-moz-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput;
    }

    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-webkit-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Moz') > -1) {
      return mozOutput;
    }

    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
    return outputValue;
  }
}
module.exports = exports['default'];

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = callOnce;

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CALLED_ONCE = 'muiPrepared';

function callOnce() {
  if (process.env.NODE_ENV !== 'production') {
    return function (style) {
      if (style[CALLED_ONCE]) {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI: You cannot call prepareStyles() on the same style object more than once.') : void 0;
      }
      style[CALLED_ONCE] = true;
      return style;
    };
  }
}

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(114);

var _keys2 = _interopRequireDefault(_keys);

exports.default = rtl;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reTranslate = /((^|\s)translate(3d|X)?\()(\-?[\d]+)/;
var reSkew = /((^|\s)skew(x|y)?\()\s*(\-?[\d]+)(deg|rad|grad)(,\s*(\-?[\d]+)(deg|rad|grad))?/;

/**
 * This function ensures that `style` supports both ltr and rtl directions by
 * checking `styleConstants` in `muiTheme` and replacing attribute keys if
 * necessary.
 */
function rtl(muiTheme) {
  if (muiTheme.isRtl) {
    return function (style) {
      if (style.directionInvariant === true) {
        return style;
      }

      var flippedAttributes = {
        // Keys and their replacements.
        right: 'left',
        left: 'right',
        marginRight: 'marginLeft',
        marginLeft: 'marginRight',
        paddingRight: 'paddingLeft',
        paddingLeft: 'paddingRight',
        borderRight: 'borderLeft',
        borderLeft: 'borderRight'
      };

      var newStyle = {};

      (0, _keys2.default)(style).forEach(function (attribute) {
        var value = style[attribute];
        var key = attribute;

        if (flippedAttributes.hasOwnProperty(attribute)) {
          key = flippedAttributes[attribute];
        }

        switch (attribute) {
          case 'float':
          case 'textAlign':
            if (value === 'right') {
              value = 'left';
            } else if (value === 'left') {
              value = 'right';
            }
            break;

          case 'direction':
            if (value === 'ltr') {
              value = 'rtl';
            } else if (value === 'rtl') {
              value = 'ltr';
            }
            break;

          case 'transform':
            if (!value) break;
            var matches = void 0;
            if (matches = value.match(reTranslate)) {
              value = value.replace(matches[0], matches[1] + -parseFloat(matches[4]));
            }
            if (matches = value.match(reSkew)) {
              value = value.replace(matches[0], matches[1] + -parseFloat(matches[4]) + matches[5] + matches[6] ? ', ' + (-parseFloat(matches[7]) + matches[8]) : '');
            }
            break;

          case 'transformOrigin':
            if (!value) break;
            if (value.indexOf('right') > -1) {
              value = value.replace('right', 'left');
            } else if (value.indexOf('left') > -1) {
              value = value.replace('left', 'right');
            }
            break;
        }

        newStyle[key] = value;
      });

      return newStyle;
    };
  }
}

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(223);
module.exports = __webpack_require__(42).Object.keys;


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(60);
var $keys = __webpack_require__(59);

__webpack_require__(96)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = compose;
function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _colors = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Typography = function Typography() {
  (0, _classCallCheck3.default)(this, Typography);

  // text colors
  this.textFullBlack = _colors.fullBlack;
  this.textDarkBlack = _colors.darkBlack;
  this.textLightBlack = _colors.lightBlack;
  this.textMinBlack = _colors.minBlack;
  this.textFullWhite = _colors.fullWhite;
  this.textDarkWhite = _colors.darkWhite;
  this.textLightWhite = _colors.lightWhite;

  // font weight
  this.fontWeightLight = 300;
  this.fontWeightNormal = 400;
  this.fontWeightMedium = 500;

  this.fontStyleButtonFontSize = 14;
};

exports.default = new Typography();

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Dialog = __webpack_require__(227);

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Dialog2.default;

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactEventListener = __webpack_require__(15);

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _keycode = __webpack_require__(16);

var _keycode2 = _interopRequireDefault(_keycode);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

var _Overlay = __webpack_require__(228);

var _Overlay2 = _interopRequireDefault(_Overlay);

var _RenderToLayer = __webpack_require__(230);

var _RenderToLayer2 = _interopRequireDefault(_RenderToLayer);

var _Paper = __webpack_require__(54);

var _Paper2 = _interopRequireDefault(_Paper);

var _TransitionGroup = __webpack_require__(85);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransitionItem = function (_Component) {
  (0, _inherits3.default)(TransitionItem, _Component);

  function TransitionItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TransitionItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TransitionItem.__proto__ || (0, _getPrototypeOf2.default)(TransitionItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      style: {}
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TransitionItem, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.enterTimeout);
      clearTimeout(this.leaveTimeout);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      this.componentWillAppear(callback);
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(callback) {
      var spacing = this.context.muiTheme.baseTheme.spacing;

      this.setState({
        style: {
          opacity: 1,
          transform: 'translate(0, ' + spacing.desktopKeylineIncrement + 'px)'
        }
      });

      this.enterTimeout = setTimeout(callback, 450); // matches transition duration
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      this.setState({
        style: {
          opacity: 0,
          transform: 'translate(0, 0)'
        }
      });

      this.leaveTimeout = setTimeout(callback, 450); // matches transition duration
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          children = _props.children,
          other = (0, _objectWithoutProperties3.default)(_props, ['style', 'children']);
      var prepareStyles = this.context.muiTheme.prepareStyles;


      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, { style: prepareStyles((0, _simpleAssign2.default)({}, this.state.style, style)) }),
        children
      );
    }
  }]);
  return TransitionItem;
}(_react.Component);

TransitionItem.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
TransitionItem.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.node,
  style: _propTypes2.default.object
} : {};


function getStyles(props, context) {
  var autoScrollBodyContent = props.autoScrollBodyContent,
      open = props.open;
  var _context$muiTheme = context.muiTheme,
      _context$muiTheme$bas = _context$muiTheme.baseTheme,
      spacing = _context$muiTheme$bas.spacing,
      palette = _context$muiTheme$bas.palette,
      dialog = _context$muiTheme.dialog,
      zIndex = _context$muiTheme.zIndex;


  var gutter = spacing.desktopGutter;
  var borderScroll = '1px solid ' + palette.borderColor;

  return {
    root: {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      zIndex: zIndex.dialog,
      top: 0,
      left: open ? 0 : -10000,
      width: '100%',
      height: '100%',
      transition: open ? _transitions2.default.easeOut('0ms', 'left', '0ms') : _transitions2.default.easeOut('0ms', 'left', '450ms')
    },
    content: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      transition: _transitions2.default.easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: spacing.desktopKeylineIncrement * 12,
      margin: '0 auto',
      zIndex: zIndex.dialog
    },
    actionsContainer: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      padding: 8,
      width: '100%',
      textAlign: 'right',
      marginTop: autoScrollBodyContent ? -1 : 0
    },
    overlay: {
      zIndex: zIndex.dialogOverlay
    },
    title: {
      margin: 0,
      padding: gutter + 'px ' + gutter + 'px 20px ' + gutter + 'px',
      color: palette.textColor,
      fontSize: dialog.titleFontSize,
      lineHeight: '32px',
      fontWeight: 400,
      marginBottom: autoScrollBodyContent ? -1 : 0
    },
    body: {
      fontSize: dialog.bodyFontSize,
      color: dialog.bodyColor,
      padding: (props.title ? 0 : gutter) + 'px ' + gutter + 'px ' + gutter + 'px',
      boxSizing: 'border-box',
      overflowY: autoScrollBodyContent ? 'auto' : 'hidden',
      borderTop: autoScrollBodyContent ? borderScroll : 'none',
      borderBottom: autoScrollBodyContent ? borderScroll : 'none'
    }
  };
}

var DialogInline = function (_Component2) {
  (0, _inherits3.default)(DialogInline, _Component2);

  function DialogInline() {
    var _ref2;

    var _temp2, _this2, _ret2;

    (0, _classCallCheck3.default)(this, DialogInline);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref2 = DialogInline.__proto__ || (0, _getPrototypeOf2.default)(DialogInline)).call.apply(_ref2, [this].concat(args))), _this2), _this2.handleClickOverlay = function () {
      _this2.requestClose(false);
    }, _this2.handleKeyUp = function (event) {
      if ((0, _keycode2.default)(event) === 'esc') {
        _this2.requestClose(false);
      }
    }, _this2.handleResize = function () {
      _this2.positionDialog();
    }, _temp2), (0, _possibleConstructorReturn3.default)(_this2, _ret2);
  }

  (0, _createClass3.default)(DialogInline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.positionDialog();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.positionDialog();
    }
  }, {
    key: 'positionDialog',
    value: function positionDialog() {
      var _props2 = this.props,
          actions = _props2.actions,
          autoDetectWindowHeight = _props2.autoDetectWindowHeight,
          autoScrollBodyContent = _props2.autoScrollBodyContent,
          bodyStyle = _props2.bodyStyle,
          open = _props2.open,
          repositionOnUpdate = _props2.repositionOnUpdate,
          title = _props2.title;


      if (!open) {
        return;
      }

      var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var container = _reactDom2.default.findDOMNode(this);
      var dialogWindow = _reactDom2.default.findDOMNode(this.refs.dialogWindow);
      var dialogContent = _reactDom2.default.findDOMNode(this.refs.dialogContent);
      var minPaddingTop = 16;

      // Reset the height in case the window was resized.
      dialogWindow.style.height = '';
      dialogContent.style.height = '';

      var dialogWindowHeight = dialogWindow.offsetHeight;
      var paddingTop = (clientHeight - dialogWindowHeight) / 2 - 64;
      if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;

      // Vertically center the dialog window, but make sure it doesn't
      // transition to that position.
      if (repositionOnUpdate || !container.style.paddingTop) {
        container.style.paddingTop = paddingTop + 'px';
      }

      // Force a height if the dialog is taller than clientHeight
      if (autoDetectWindowHeight || autoScrollBodyContent) {
        var styles = getStyles(this.props, this.context);
        styles.body = (0, _simpleAssign2.default)(styles.body, bodyStyle);
        var maxDialogContentHeight = clientHeight - 2 * 64;

        if (title) maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;

        if (_react2.default.Children.count(actions)) {
          maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;
        }

        dialogContent.style.maxHeight = maxDialogContentHeight + 'px';
        if (maxDialogContentHeight > dialogWindowHeight) {
          dialogContent.style.borderBottom = 'none';
          dialogContent.style.borderTop = 'none';
        }
      }
    }
  }, {
    key: 'requestClose',
    value: function requestClose(buttonClicked) {
      if (!buttonClicked && this.props.modal) {
        return;
      }

      if (this.props.onRequestClose) {
        this.props.onRequestClose(!!buttonClicked);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          actions = _props3.actions,
          actionsContainerClassName = _props3.actionsContainerClassName,
          actionsContainerStyle = _props3.actionsContainerStyle,
          bodyClassName = _props3.bodyClassName,
          bodyStyle = _props3.bodyStyle,
          children = _props3.children,
          className = _props3.className,
          contentClassName = _props3.contentClassName,
          contentStyle = _props3.contentStyle,
          overlayClassName = _props3.overlayClassName,
          overlayStyle = _props3.overlayStyle,
          open = _props3.open,
          paperClassName = _props3.paperClassName,
          paperProps = _props3.paperProps,
          style = _props3.style,
          titleClassName = _props3.titleClassName,
          titleStyle = _props3.titleStyle,
          title = _props3.title;
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      styles.root = (0, _simpleAssign2.default)(styles.root, style);
      styles.content = (0, _simpleAssign2.default)(styles.content, contentStyle);
      styles.body = (0, _simpleAssign2.default)(styles.body, bodyStyle);
      styles.actionsContainer = (0, _simpleAssign2.default)(styles.actionsContainer, actionsContainerStyle);
      styles.overlay = (0, _simpleAssign2.default)(styles.overlay, overlayStyle);
      styles.title = (0, _simpleAssign2.default)(styles.title, titleStyle);

      var actionsContainer = _react2.default.Children.count(actions) > 0 && _react2.default.createElement(
        'div',
        { className: actionsContainerClassName, style: prepareStyles(styles.actionsContainer) },
        _react2.default.Children.toArray(actions)
      );

      var titleElement = title;
      if (_react2.default.isValidElement(title)) {
        titleElement = _react2.default.cloneElement(title, {
          className: title.props.className || titleClassName,
          style: prepareStyles((0, _simpleAssign2.default)(styles.title, title.props.style))
        });
      } else if (typeof title === 'string') {
        titleElement = _react2.default.createElement(
          'h3',
          { className: titleClassName, style: prepareStyles(styles.title) },
          title
        );
      }

      return _react2.default.createElement(
        'div',
        { className: className, style: prepareStyles(styles.root) },
        open && _react2.default.createElement(_reactEventListener2.default, {
          target: 'window',
          onKeyUp: this.handleKeyUp,
          onResize: this.handleResize
        }),
        _react2.default.createElement(
          _TransitionGroup2.default,
          {
            component: 'div',
            ref: 'dialogWindow',
            transitionAppear: true,
            transitionAppearTimeout: 450,
            transitionEnter: true,
            transitionEnterTimeout: 450
          },
          open && _react2.default.createElement(
            TransitionItem,
            {
              className: contentClassName,
              style: styles.content
            },
            _react2.default.createElement(
              _Paper2.default,
              (0, _extends3.default)({ className: paperClassName, zDepth: 4 }, paperProps),
              titleElement,
              _react2.default.createElement(
                'div',
                {
                  ref: 'dialogContent',
                  className: bodyClassName,
                  style: prepareStyles(styles.body)
                },
                children
              ),
              actionsContainer
            )
          )
        ),
        _react2.default.createElement(_Overlay2.default, {
          show: open,
          className: overlayClassName,
          style: styles.overlay,
          onClick: this.handleClickOverlay
        })
      );
    }
  }]);
  return DialogInline;
}(_react.Component);

DialogInline.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
DialogInline.propTypes = process.env.NODE_ENV !== "production" ? {
  actions: _propTypes2.default.node,
  actionsContainerClassName: _propTypes2.default.string,
  actionsContainerStyle: _propTypes2.default.object,
  autoDetectWindowHeight: _propTypes2.default.bool,
  autoScrollBodyContent: _propTypes2.default.bool,
  bodyClassName: _propTypes2.default.string,
  bodyStyle: _propTypes2.default.object,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  contentClassName: _propTypes2.default.string,
  contentStyle: _propTypes2.default.object,
  modal: _propTypes2.default.bool,
  onRequestClose: _propTypes2.default.func,
  open: _propTypes2.default.bool.isRequired,
  overlayClassName: _propTypes2.default.string,
  overlayStyle: _propTypes2.default.object,
  paperClassName: _propTypes2.default.string,
  paperProps: _propTypes2.default.object,
  repositionOnUpdate: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  title: _propTypes2.default.node,
  titleClassName: _propTypes2.default.string,
  titleStyle: _propTypes2.default.object
} : {};

var Dialog = function (_Component3) {
  (0, _inherits3.default)(Dialog, _Component3);

  function Dialog() {
    var _ref3;

    var _temp3, _this3, _ret3;

    (0, _classCallCheck3.default)(this, Dialog);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref3 = Dialog.__proto__ || (0, _getPrototypeOf2.default)(Dialog)).call.apply(_ref3, [this].concat(args))), _this3), _this3.renderLayer = function () {
      return _react2.default.createElement(DialogInline, _this3.props);
    }, _temp3), (0, _possibleConstructorReturn3.default)(_this3, _ret3);
  }

  (0, _createClass3.default)(Dialog, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_RenderToLayer2.default, { render: this.renderLayer, open: true, useLayerForClickAway: false });
    }
  }]);
  return Dialog;
}(_react.Component);

Dialog.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
Dialog.defaultProps = {
  autoDetectWindowHeight: true,
  autoScrollBodyContent: false,
  modal: false,
  repositionOnUpdate: true
};
Dialog.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Action buttons to display below the Dialog content (`children`).
   * This property accepts either a React element, or an array of React elements.
   */
  actions: _propTypes2.default.node,
  /**
   * The `className` to add to the actions container's root element.
   */
  actionsContainerClassName: _propTypes2.default.string,
  /**
   * Overrides the inline-styles of the actions container's root element.
   */
  actionsContainerStyle: _propTypes2.default.object,
  /**
   * If set to true, the height of the `Dialog` will be auto detected. A max height
   * will be enforced so that the content does not extend beyond the viewport.
   */
  autoDetectWindowHeight: _propTypes2.default.bool,
  /**
   * If set to true, the body content of the `Dialog` will be scrollable.
   */
  autoScrollBodyContent: _propTypes2.default.bool,
  /**
   * The `className` to add to the content's root element under the title.
   */
  bodyClassName: _propTypes2.default.string,
  /**
   * Overrides the inline-styles of the content's root element under the title.
   */
  bodyStyle: _propTypes2.default.object,
  /**
   * The contents of the `Dialog`.
   */
  children: _propTypes2.default.node,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * The `className` to add to the content container.
   */
  contentClassName: _propTypes2.default.string,
  /**
   * Overrides the inline-styles of the content container.
   */
  contentStyle: _propTypes2.default.object,
  /**
   * Force the user to use one of the actions in the `Dialog`.
   * Clicking outside the `Dialog` will not trigger the `onRequestClose`.
   */
  modal: _propTypes2.default.bool,
  /**
   * Fired when the `Dialog` is requested to be closed by a click outside the `Dialog` or on the buttons.
   *
   * @param {bool} buttonClicked Determines whether a button click triggered this request.
   */
  onRequestClose: _propTypes2.default.func,
  /**
   * Controls whether the Dialog is opened or not.
   */
  open: _propTypes2.default.bool.isRequired,
  /**
   * The `className` to add to the `Overlay` component that is rendered behind the `Dialog`.
   */
  overlayClassName: _propTypes2.default.string,
  /**
   * Overrides the inline-styles of the `Overlay` component that is rendered behind the `Dialog`.
   */
  overlayStyle: _propTypes2.default.object,
  /**
   * The CSS class name of the `Paper` element.
   */
  paperClassName: _propTypes2.default.string,
  /**
   * Properties applied to the `Paper` element.
   */
  paperProps: _propTypes2.default.object,
  /**
   * Determines whether the `Dialog` should be repositioned when it's contents are updated.
   */
  repositionOnUpdate: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * The title to display on the `Dialog`. Could be number, string, element or an array containing these types.
   */
  title: _propTypes2.default.node,
  /**
   * The `className` to add to the title's root container element.
   */
  titleClassName: _propTypes2.default.string,
  /**
   * Overrides the inline-styles of the title's root container element.
   */
  titleStyle: _propTypes2.default.object
} : {};
exports.default = Dialog;

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

var _AutoLockScrolling = __webpack_require__(229);

var _AutoLockScrolling2 = _interopRequireDefault(_AutoLockScrolling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var overlay = context.muiTheme.overlay;


  var style = {
    root: {
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: 0,
      left: '-100%',
      opacity: 0,
      backgroundColor: overlay.backgroundColor,
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', // Remove mobile color flashing (deprecated)

      // Two ways to promote overlay to its own render layer
      willChange: 'opacity',
      transform: 'translateZ(0)',

      transition: props.transitionEnabled && _transitions2.default.easeOut('0ms', 'left', '400ms') + ', ' + _transitions2.default.easeOut('400ms', 'opacity')
    }
  };

  if (props.show) {
    (0, _simpleAssign2.default)(style.root, {
      left: 0,
      opacity: 1,
      transition: _transitions2.default.easeOut('0ms', 'left') + ', ' + _transitions2.default.easeOut('400ms', 'opacity')
    });
  }

  return style;
}

var Overlay = function (_Component) {
  (0, _inherits3.default)(Overlay, _Component);

  function Overlay() {
    (0, _classCallCheck3.default)(this, Overlay);
    return (0, _possibleConstructorReturn3.default)(this, (Overlay.__proto__ || (0, _getPrototypeOf2.default)(Overlay)).apply(this, arguments));
  }

  (0, _createClass3.default)(Overlay, [{
    key: 'setOpacity',
    value: function setOpacity(opacity) {
      this.refs.overlay.style.opacity = opacity;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          autoLockScrolling = _props.autoLockScrolling,
          show = _props.show,
          style = _props.style,
          transitionEnabled = _props.transitionEnabled,
          other = (0, _objectWithoutProperties3.default)(_props, ['autoLockScrolling', 'show', 'style', 'transitionEnabled']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, { ref: 'overlay', style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
        autoLockScrolling && _react2.default.createElement(_AutoLockScrolling2.default, { lock: show })
      );
    }
  }]);
  return Overlay;
}(_react.Component);

Overlay.defaultProps = {
  autoLockScrolling: true,
  style: {},
  transitionEnabled: true
};
Overlay.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
Overlay.propTypes = process.env.NODE_ENV !== "production" ? {
  autoLockScrolling: _propTypes2.default.bool,
  show: _propTypes2.default.bool.isRequired,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  transitionEnabled: _propTypes2.default.bool
} : {};
exports.default = Overlay;

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var originalBodyOverflow = null;
var lockingCounter = 0;

var AutoLockScrolling = function (_Component) {
  (0, _inherits3.default)(AutoLockScrolling, _Component);

  function AutoLockScrolling() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AutoLockScrolling);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutoLockScrolling.__proto__ || (0, _getPrototypeOf2.default)(AutoLockScrolling)).call.apply(_ref, [this].concat(args))), _this), _this.locked = false, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AutoLockScrolling, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.lock === true) {
        this.preventScrolling();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.lock !== nextProps.lock) {
        if (nextProps.lock) {
          this.preventScrolling();
        } else {
          this.allowScrolling();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.allowScrolling();
    }

    // force to only lock/unlock once

  }, {
    key: 'preventScrolling',
    value: function preventScrolling() {
      if (this.locked === true) {
        return;
      }

      lockingCounter = lockingCounter + 1;
      this.locked = true;

      // only lock the first time the component is mounted.
      if (lockingCounter === 1) {
        var body = document.getElementsByTagName('body')[0];
        originalBodyOverflow = body.style.overflow;
        body.style.overflow = 'hidden';
      }
    }
  }, {
    key: 'allowScrolling',
    value: function allowScrolling() {
      if (this.locked === true) {
        lockingCounter = lockingCounter - 1;
        this.locked = false;
      }

      if (lockingCounter === 0 && originalBodyOverflow !== null) {
        var body = document.getElementsByTagName('body')[0];
        body.style.overflow = originalBodyOverflow || '';
        originalBodyOverflow = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return AutoLockScrolling;
}(_react.Component);

AutoLockScrolling.propTypes = process.env.NODE_ENV !== "production" ? {
  lock: _propTypes2.default.bool.isRequired
} : {};
exports.default = AutoLockScrolling;

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(13);

var _dom = __webpack_require__(107);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
var RenderToLayer = function (_Component) {
  (0, _inherits3.default)(RenderToLayer, _Component);

  function RenderToLayer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RenderToLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RenderToLayer.__proto__ || (0, _getPrototypeOf2.default)(RenderToLayer)).call.apply(_ref, [this].concat(args))), _this), _this.onClickAway = function (event) {
      if (event.defaultPrevented) {
        return;
      }

      if (!_this.props.componentClickAway) {
        return;
      }

      if (!_this.props.open) {
        return;
      }

      var el = _this.layer;
      if (event.target !== el && event.target === window || document.documentElement.contains(event.target) && !_dom2.default.isDescendant(el, event.target)) {
        _this.props.componentClickAway(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RenderToLayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderLayer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderLayer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unrenderLayer();
    }
  }, {
    key: 'getLayer',
    value: function getLayer() {
      return this.layer;
    }
  }, {
    key: 'unrenderLayer',
    value: function unrenderLayer() {
      if (!this.layer) {
        return;
      }

      if (this.props.useLayerForClickAway) {
        this.layer.style.position = 'relative';
        this.layer.removeEventListener('click', this.onClickAway);
      } else {
        window.removeEventListener('click', this.onClickAway);
      }

      (0, _reactDom.unmountComponentAtNode)(this.layer);
      document.body.removeChild(this.layer);
      this.layer = null;
    }

    /**
     * By calling this method in componentDidMount() and
     * componentDidUpdate(), you're effectively creating a "wormhole" that
     * funnels React's hierarchical updates through to a DOM node on an
     * entirely different part of the page.
     */

  }, {
    key: 'renderLayer',
    value: function renderLayer() {
      var _this2 = this;

      var _props = this.props,
          open = _props.open,
          render = _props.render;


      if (open) {
        if (!this.layer) {
          this.layer = document.createElement('div');
          document.body.appendChild(this.layer);

          if (this.props.useLayerForClickAway) {
            this.layer.addEventListener('click', this.onClickAway);
            this.layer.style.position = 'fixed';
            this.layer.style.top = 0;
            this.layer.style.bottom = 0;
            this.layer.style.left = 0;
            this.layer.style.right = 0;
            this.layer.style.zIndex = this.context.muiTheme.zIndex.layer;
          } else {
            setTimeout(function () {
              window.addEventListener('click', _this2.onClickAway);
            }, 0);
          }
        }

        var layerElement = render();
        this.layerElement = (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, layerElement, this.layer);
      } else {
        this.unrenderLayer();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return RenderToLayer;
}(_react.Component);

RenderToLayer.defaultProps = {
  useLayerForClickAway: true
};
RenderToLayer.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
RenderToLayer.propTypes = process.env.NODE_ENV !== "production" ? {
  componentClickAway: _propTypes2.default.func,
  open: _propTypes2.default.bool.isRequired,
  render: _propTypes2.default.func.isRequired,
  useLayerForClickAway: _propTypes2.default.bool
} : {};
exports.default = RenderToLayer;

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

var _colorManipulator = __webpack_require__(67);

var _EnhancedButton = __webpack_require__(68);

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

var _FlatButtonLabel = __webpack_require__(232);

var _FlatButtonLabel2 = _interopRequireDefault(_FlatButtonLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateLabel(props, propName, componentName) {
  if (process.env.NODE_ENV !== 'production') {
    if (!props.children && props.label !== 0 && !props.label && !props.icon) {
      return new Error('Required prop label or children or icon was not specified in ' + componentName + '.');
    }
  }
}

var FlatButton = function (_Component) {
  (0, _inherits3.default)(FlatButton, _Component);

  function FlatButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FlatButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FlatButton.__proto__ || (0, _getPrototypeOf2.default)(FlatButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hovered: false,
      isKeyboardFocused: false,
      touch: false
    }, _this.handleKeyboardFocus = function (event, isKeyboardFocused) {
      _this.setState({ isKeyboardFocused: isKeyboardFocused });
      _this.props.onKeyboardFocus(event, isKeyboardFocused);
    }, _this.handleMouseEnter = function (event) {
      // Cancel hover styles for touch devices
      if (!_this.state.touch) _this.setState({ hovered: true });
      _this.props.onMouseEnter(event);
    }, _this.handleMouseLeave = function (event) {
      _this.setState({ hovered: false });
      _this.props.onMouseLeave(event);
    }, _this.handleTouchStart = function (event) {
      _this.setState({ touch: true });
      _this.props.onTouchStart(event);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FlatButton, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.disabled) {
        this.setState({
          hovered: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          backgroundColor = _props.backgroundColor,
          children = _props.children,
          disabled = _props.disabled,
          fullWidth = _props.fullWidth,
          hoverColor = _props.hoverColor,
          icon = _props.icon,
          label = _props.label,
          labelStyle = _props.labelStyle,
          labelPosition = _props.labelPosition,
          primary = _props.primary,
          rippleColor = _props.rippleColor,
          secondary = _props.secondary,
          style = _props.style,
          other = (0, _objectWithoutProperties3.default)(_props, ['backgroundColor', 'children', 'disabled', 'fullWidth', 'hoverColor', 'icon', 'label', 'labelStyle', 'labelPosition', 'primary', 'rippleColor', 'secondary', 'style']);
      var _context$muiTheme = this.context.muiTheme,
          borderRadius = _context$muiTheme.borderRadius,
          _context$muiTheme$but = _context$muiTheme.button,
          buttonHeight = _context$muiTheme$but.height,
          buttonMinWidth = _context$muiTheme$but.minWidth,
          buttonTextTransform = _context$muiTheme$but.textTransform,
          _context$muiTheme$fla = _context$muiTheme.flatButton,
          buttonFilterColor = _context$muiTheme$fla.buttonFilterColor,
          buttonColor = _context$muiTheme$fla.color,
          disabledTextColor = _context$muiTheme$fla.disabledTextColor,
          fontSize = _context$muiTheme$fla.fontSize,
          fontWeight = _context$muiTheme$fla.fontWeight,
          primaryTextColor = _context$muiTheme$fla.primaryTextColor,
          secondaryTextColor = _context$muiTheme$fla.secondaryTextColor,
          textColor = _context$muiTheme$fla.textColor,
          _context$muiTheme$fla2 = _context$muiTheme$fla.textTransform,
          textTransform = _context$muiTheme$fla2 === undefined ? buttonTextTransform || 'uppercase' : _context$muiTheme$fla2;

      var defaultTextColor = disabled ? disabledTextColor : primary ? primaryTextColor : secondary ? secondaryTextColor : textColor;

      var defaultHoverColor = (0, _colorManipulator.fade)(buttonFilterColor, 0.2);
      var defaultRippleColor = buttonFilterColor;
      var buttonHoverColor = hoverColor || defaultHoverColor;
      var buttonRippleColor = rippleColor || defaultRippleColor;
      var buttonBackgroundColor = backgroundColor || buttonColor;
      var hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;

      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        height: buttonHeight,
        lineHeight: buttonHeight + 'px',
        minWidth: fullWidth ? '100%' : buttonMinWidth,
        color: defaultTextColor,
        transition: _transitions2.default.easeOut(),
        borderRadius: borderRadius,
        userSelect: 'none',
        overflow: 'hidden',
        backgroundColor: hovered ? buttonHoverColor : buttonBackgroundColor,
        padding: 0,
        margin: 0,
        textAlign: 'center'
      }, style);

      var iconCloned = void 0;
      var labelStyleIcon = {};

      if (icon) {
        var iconStyles = (0, _simpleAssign2.default)({
          verticalAlign: 'middle',
          marginLeft: label && labelPosition !== 'before' ? 12 : 0,
          marginRight: label && labelPosition === 'before' ? 12 : 0
        }, icon.props.style);
        iconCloned = _react2.default.cloneElement(icon, {
          color: icon.props.color || mergedRootStyles.color,
          style: iconStyles,
          key: 'iconCloned'
        });

        if (labelPosition === 'before') {
          labelStyleIcon.paddingRight = 8;
        } else {
          labelStyleIcon.paddingLeft = 8;
        }
      }

      var mergedLabelStyles = (0, _simpleAssign2.default)({
        letterSpacing: 0,
        textTransform: textTransform,
        fontWeight: fontWeight,
        fontSize: fontSize
      }, labelStyleIcon, labelStyle);

      var labelElement = label ? _react2.default.createElement(_FlatButtonLabel2.default, { key: 'labelElement', label: label, style: mergedLabelStyles }) : undefined;

      // Place label before or after children.
      var enhancedButtonChildren = labelPosition === 'before' ? [labelElement, iconCloned, children] : [children, iconCloned, labelElement];

      return _react2.default.createElement(
        _EnhancedButton2.default,
        (0, _extends3.default)({}, other, {
          disabled: disabled,
          focusRippleColor: buttonRippleColor,
          focusRippleOpacity: 0.3,
          onKeyboardFocus: this.handleKeyboardFocus,
          onMouseLeave: this.handleMouseLeave,
          onMouseEnter: this.handleMouseEnter,
          onTouchStart: this.handleTouchStart,
          style: mergedRootStyles,
          touchRippleColor: buttonRippleColor,
          touchRippleOpacity: 0.3
        }),
        enhancedButtonChildren
      );
    }
  }]);
  return FlatButton;
}(_react.Component);

FlatButton.muiName = 'FlatButton';
FlatButton.defaultProps = {
  disabled: false,
  fullWidth: false,
  labelStyle: {},
  labelPosition: 'after',
  onKeyboardFocus: function onKeyboardFocus() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},
  onTouchStart: function onTouchStart() {},
  primary: false,
  secondary: false
};
FlatButton.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
FlatButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Color of button when mouse is not hovering over it.
   */
  backgroundColor: _propTypes2.default.string,
  /**
   * This is what will be displayed inside the button.
   * If a label is specified, the text within the label prop will
   * be displayed. Otherwise, the component will expect children
   * which will then be displayed. (In our example,
   * we are nesting an `<input type="file" />` and a `span`
   * that acts as our label to be displayed.) This only
   * applies to flat and raised buttons.
   */
  children: _propTypes2.default.node,
  /**
   * The CSS class name of the root element.
   */
  className: _propTypes2.default.string,
  /**
   * The element to use as the container for the FlatButton. Either a string to
   * use a DOM element or a ReactElement. This is useful for wrapping the
   * FlatButton in a custom Link component. If a ReactElement is given, ensure
   * that it passes all of its given props through to the underlying DOM
   * element and renders its children prop for proper integration.
   */
  containerElement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  /**
   * If true, the element's ripple effect will be disabled.
   */
  disableTouchRipple: _propTypes2.default.bool,
  /**
   * Disables the button if set to true.
   */
  disabled: _propTypes2.default.bool,
  /**
   * If true, the button will take up the full width of its container.
   */
  fullWidth: _propTypes2.default.bool,
  /**
   * Color of button when mouse hovers over.
   */
  hoverColor: _propTypes2.default.string,
  /**
   * The URL to link to when the button is clicked.
   */
  href: _propTypes2.default.string,
  /**
   * Use this property to display an icon.
   */
  icon: _propTypes2.default.node,
  /**
   * Label for the button.
   */
  label: validateLabel,
  /**
   * Place label before or after the passed children.
   */
  labelPosition: _propTypes2.default.oneOf(['before', 'after']),
  /**
   * Override the inline-styles of the button's label element.
   */
  labelStyle: _propTypes2.default.object,
  /**
   * Callback function fired when the button is clicked.
   *
   * @param {object} event Click event targeting the button.
   */
  onClick: _propTypes2.default.func,
  /**
   * Callback function fired when the element is focused or blurred by the keyboard.
   *
   * @param {object} event `focus` or `blur` event targeting the element.
   * @param {boolean} isKeyboardFocused Indicates whether the element is focused.
   */
  onKeyboardFocus: _propTypes2.default.func,
  /** @ignore */
  onMouseEnter: _propTypes2.default.func,
  /** @ignore */
  onMouseLeave: _propTypes2.default.func,
  /** @ignore */
  onTouchStart: _propTypes2.default.func,
  /**
   * If true, colors button according to
   * primaryTextColor from the Theme.
   */
  primary: _propTypes2.default.bool,
  /**
   * Color for the ripple after button is clicked.
   */
  rippleColor: _propTypes2.default.string,
  /**
   * If true, colors button according to secondaryTextColor from the theme.
   * The primary prop has precendent if set to true.
   */
  secondary: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};
exports.default = FlatButton;

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var baseTheme = context.muiTheme.baseTheme;


  return {
    root: {
      position: 'relative',
      paddingLeft: baseTheme.spacing.desktopGutterLess,
      paddingRight: baseTheme.spacing.desktopGutterLess,
      verticalAlign: 'middle'
    }
  };
}

var FlatButtonLabel = function (_Component) {
  (0, _inherits3.default)(FlatButtonLabel, _Component);

  function FlatButtonLabel() {
    (0, _classCallCheck3.default)(this, FlatButtonLabel);
    return (0, _possibleConstructorReturn3.default)(this, (FlatButtonLabel.__proto__ || (0, _getPrototypeOf2.default)(FlatButtonLabel)).apply(this, arguments));
  }

  (0, _createClass3.default)(FlatButtonLabel, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          style = _props.style;
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      return _react2.default.createElement(
        'span',
        { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) },
        label
      );
    }
  }]);
  return FlatButtonLabel;
}(_react.Component);

FlatButtonLabel.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
FlatButtonLabel.propTypes = process.env.NODE_ENV !== "production" ? {
  label: _propTypes2.default.node,
  style: _propTypes2.default.object
} : {};
exports.default = FlatButtonLabel;

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emailValidation = function emailValidation(address, characterLimit) {
  if (address.length > 0) {
    var regExTest = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
    var passRegexTest = regExTest.test(address.toLowerCase());
    var characterLimitTest = address.length > (characterLimit || 64) ? false : true;
    return passRegexTest && characterLimitTest;
  } else {
    return true;
  }
};

var zipCodeValidation = function zipCodeValidation(zipCode) {
  if (zipCode.length > 0) {
    var regExTest = /^\d{5}(\-?\d{4})?$/;
    var passRegexTest = regExTest.test(zipCode);
    return passRegexTest;
  } else {
    return true;
  }
};

exports.default = {
  emailValidation: emailValidation,
  zipCodeValidation: zipCodeValidation
};

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(235);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./voteForm.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./voteForm.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".vote__form {\n  font-family: Roboto, sans-serif;\n  padding-bottom: 80px;\n  border-top: 1px solid #c1c2c2; }\n  .vote__form--text-input {\n    display: flex;\n    flex-flow: row wrap;\n    justify-content: space-around;\n    height: 100%;\n    padding-bottom: 20px;\n    max-width: 650px;\n    margin: auto; }\n    .vote__form--text-input > div {\n      margin: 0 15px; }\n  .vote__form--notice {\n    max-width: 650px;\n    font-size: 12px;\n    margin: auto;\n    padding: 20px;\n    padding-bottom: 20px;\n    margin-top: 50px; }\n  .vote__form--subscribe {\n    display: flex;\n    flex-flow: column nowrap;\n    align-items: center;\n    padding: 40px;\n    margin: auto;\n    width: 350px;\n    margin-top: 20px;\n    font-size: 12px; }\n    .vote__form--subscribe label {\n      color: #c1c2c2; }\n    .vote__form--subscribe.resubmit {\n      flex-flow: row wrap;\n      width: auto;\n      align-items: flex-start;\n      justify-content: center; }\n      .vote__form--subscribe.resubmit .vote__form--subscribe--input {\n        margin: 0 20px; }\n      .vote__form--subscribe.resubmit label {\n        max-width: 300px; }\n    .vote__form--subscribe--input {\n      display: flex;\n      flex-flow: row nowrap; }\n      .vote__form--subscribe--input-title {\n        font-size: 12px;\n        text-transform: uppercase;\n        min-width: 75px;\n        margin-right: 12px;\n        text-align: right;\n        flex: 1 1 75px;\n        padding-top: 2px;\n        font-weight: 700;\n        color: #004c87; }\n  .vote__form--submit {\n    display: flex;\n    flex-flow: row;\n    justify-content: center;\n    padding: 10px;\n    padding-bottom: 20px; }\n    .vote__form--submit button {\n      background-color: #004c87 !important; }\n", ""]);

// exports


/***/ }),
/* 236 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AppBar = __webpack_require__(238);

var _AppBar2 = _interopRequireDefault(_AppBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AppBar2.default;

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _keys = __webpack_require__(114);

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.getStyles = getStyles;

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IconButton = __webpack_require__(117);

var _IconButton2 = _interopRequireDefault(_IconButton);

var _menu = __webpack_require__(244);

var _menu2 = _interopRequireDefault(_menu);

var _Paper = __webpack_require__(54);

var _Paper2 = _interopRequireDefault(_Paper);

var _propTypes3 = __webpack_require__(86);

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var _context$muiTheme = context.muiTheme,
      appBar = _context$muiTheme.appBar,
      iconButtonSize = _context$muiTheme.button.iconButtonSize,
      zIndex = _context$muiTheme.zIndex;


  var flatButtonSize = 36;

  var styles = {
    root: {
      position: 'relative',
      zIndex: zIndex.appBar,
      width: '100%',
      display: 'flex',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: appBar.titleFontWeight,
      color: appBar.textColor,
      height: appBar.height,
      lineHeight: appBar.height + 'px'
    },
    mainElement: {
      boxFlex: 1,
      flex: '1'
    },
    iconButtonStyle: {
      marginTop: (appBar.height - iconButtonSize) / 2,
      marginRight: 8,
      marginLeft: -16
    },
    iconButtonIconStyle: {
      fill: appBar.textColor,
      color: appBar.textColor
    },
    flatButton: {
      color: appBar.textColor,
      marginTop: (iconButtonSize - flatButtonSize) / 2 + 1
    }
  };

  return styles;
}

var AppBar = function (_Component) {
  (0, _inherits3.default)(AppBar, _Component);

  function AppBar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AppBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AppBar.__proto__ || (0, _getPrototypeOf2.default)(AppBar)).call.apply(_ref, [this].concat(args))), _this), _this.handleClickLeftIconButton = function (event) {
      if (_this.props.onLeftIconButtonClick) {
        _this.props.onLeftIconButtonClick(event);
      }
    }, _this.handleClickRightIconButton = function (event) {
      if (_this.props.onRightIconButtonClick) {
        _this.props.onRightIconButtonClick(event);
      }
    }, _this.handleTitleClick = function (event) {
      if (_this.props.onTitleClick) {
        _this.props.onTitleClick(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AppBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!this.props.iconElementLeft || !this.props.iconClassNameLeft, 'Material-UI: Properties iconElementLeft\n      and iconClassNameLeft cannot be simultaneously defined. Please use one or the other.') : void 0;

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!this.props.iconElementRight || !this.props.iconClassNameRight, 'Material-UI: Properties iconElementRight\n      and iconClassNameRight cannot be simultaneously defined. Please use one or the other.') : void 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          titleStyle = _props.titleStyle,
          iconStyleLeft = _props.iconStyleLeft,
          iconStyleRight = _props.iconStyleRight,
          onTitleClick = _props.onTitleClick,
          showMenuIconButton = _props.showMenuIconButton,
          iconElementLeft = _props.iconElementLeft,
          iconElementRight = _props.iconElementRight,
          iconClassNameLeft = _props.iconClassNameLeft,
          iconClassNameRight = _props.iconClassNameRight,
          onLeftIconButtonClick = _props.onLeftIconButtonClick,
          onRightIconButtonClick = _props.onRightIconButtonClick,
          className = _props.className,
          style = _props.style,
          zDepth = _props.zDepth,
          children = _props.children,
          other = (0, _objectWithoutProperties3.default)(_props, ['title', 'titleStyle', 'iconStyleLeft', 'iconStyleRight', 'onTitleClick', 'showMenuIconButton', 'iconElementLeft', 'iconElementRight', 'iconClassNameLeft', 'iconClassNameRight', 'onLeftIconButtonClick', 'onRightIconButtonClick', 'className', 'style', 'zDepth', 'children']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      var menuElementLeft = void 0;
      var menuElementRight = void 0;

      // If the title is a string, wrap in an h1 tag.
      // If not, wrap in a div tag.
      var titleComponent = typeof title === 'string' || title instanceof String ? 'h1' : 'div';

      var titleElement = _react2.default.createElement(titleComponent, {
        onClick: this.handleTitleClick,
        style: prepareStyles((0, _simpleAssign2.default)(styles.title, styles.mainElement, titleStyle))
      }, title);

      var iconLeftStyle = (0, _simpleAssign2.default)({}, styles.iconButtonStyle, iconStyleLeft);

      if (showMenuIconButton) {
        if (iconElementLeft) {
          var iconElementLeftProps = {};

          if (iconElementLeft.type.muiName === 'IconButton') {
            var iconElemLeftChildren = iconElementLeft.props.children;
            var iconButtonIconStyle = !(iconElemLeftChildren && iconElemLeftChildren.props && iconElemLeftChildren.props.color) ? styles.iconButtonIconStyle : null;

            iconElementLeftProps.iconStyle = (0, _simpleAssign2.default)({}, iconButtonIconStyle, iconElementLeft.props.iconStyle);
          }

          if (!iconElementLeft.props.onClick && this.props.onLeftIconButtonClick) {
            iconElementLeftProps.onClick = this.handleClickLeftIconButton;
          }

          menuElementLeft = _react2.default.createElement(
            'div',
            { style: prepareStyles(iconLeftStyle) },
            (0, _keys2.default)(iconElementLeftProps).length > 0 ? (0, _react.cloneElement)(iconElementLeft, iconElementLeftProps) : iconElementLeft
          );
        } else {
          menuElementLeft = _react2.default.createElement(
            _IconButton2.default,
            {
              style: iconLeftStyle,
              iconStyle: styles.iconButtonIconStyle,
              iconClassName: iconClassNameLeft,
              onClick: this.handleClickLeftIconButton
            },
            iconClassNameLeft ? '' : _react2.default.createElement(_menu2.default, { style: (0, _simpleAssign2.default)({}, styles.iconButtonIconStyle) })
          );
        }
      }

      var iconRightStyle = (0, _simpleAssign2.default)({}, styles.iconButtonStyle, {
        marginRight: -16,
        marginLeft: 'auto'
      }, iconStyleRight);

      if (iconElementRight) {
        var iconElementRightProps = {};

        switch (iconElementRight.type.muiName) {
          case 'IconMenu':
          case 'IconButton':
            var iconElemRightChildren = iconElementRight.props.children;
            var _iconButtonIconStyle = !(iconElemRightChildren && iconElemRightChildren.props && iconElemRightChildren.props.color) ? styles.iconButtonIconStyle : null;

            iconElementRightProps.iconStyle = (0, _simpleAssign2.default)({}, _iconButtonIconStyle, iconElementRight.props.iconStyle);
            break;

          case 'FlatButton':
            iconElementRightProps.style = (0, _simpleAssign2.default)({}, styles.flatButton, iconElementRight.props.style);
            break;

          default:
        }

        if (!iconElementRight.props.onClick && this.props.onRightIconButtonClick) {
          iconElementRightProps.onClick = this.handleClickRightIconButton;
        }

        menuElementRight = _react2.default.createElement(
          'div',
          { style: prepareStyles(iconRightStyle) },
          (0, _keys2.default)(iconElementRightProps).length > 0 ? (0, _react.cloneElement)(iconElementRight, iconElementRightProps) : iconElementRight
        );
      } else if (iconClassNameRight) {
        menuElementRight = _react2.default.createElement(_IconButton2.default, {
          style: iconRightStyle,
          iconStyle: styles.iconButtonIconStyle,
          iconClassName: iconClassNameRight,
          onClick: this.handleClickRightIconButton
        });
      }

      return _react2.default.createElement(
        _Paper2.default,
        (0, _extends3.default)({}, other, {
          rounded: false,
          className: className,
          style: (0, _simpleAssign2.default)({}, styles.root, style),
          zDepth: zDepth
        }),
        menuElementLeft,
        titleElement,
        menuElementRight,
        children
      );
    }
  }]);
  return AppBar;
}(_react.Component);

AppBar.muiName = 'AppBar';
AppBar.defaultProps = {
  showMenuIconButton: true,
  title: '',
  zDepth: 1
};
AppBar.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
AppBar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Can be used to render a tab inside an app bar for instance.
   */
  children: _propTypes2.default.node,
  /**
   * Applied to the app bar's root element.
   */
  className: _propTypes2.default.string,
  /**
   * The classname of the icon on the left of the app bar.
   * If you are using a stylesheet for your icons, enter the class name for the icon to be used here.
   */
  iconClassNameLeft: _propTypes2.default.string,
  /**
   * Similiar to the iconClassNameLeft prop except that
   * it applies to the icon displayed on the right of the app bar.
   */
  iconClassNameRight: _propTypes2.default.string,
  /**
   * The custom element to be displayed on the left side of the
   * app bar such as an SvgIcon.
   */
  iconElementLeft: _propTypes2.default.element,
  /**
   * Similiar to the iconElementLeft prop except that this element is displayed on the right of the app bar.
   */
  iconElementRight: _propTypes2.default.element,
  /**
   * Override the inline-styles of the element displayed on the left side of the app bar.
   */
  iconStyleLeft: _propTypes2.default.object,
  /**
   * Override the inline-styles of the element displayed on the right side of the app bar.
   */
  iconStyleRight: _propTypes2.default.object,
  /**
   * Callback function for when the left icon is selected via a click.
   *
   * @param {object} event Click event targeting the left `IconButton`.
   */
  onLeftIconButtonClick: _propTypes2.default.func,
  /**
   * Callback function for when the right icon is selected via a click.
   *
   * @param {object} event Click event targeting the right `IconButton`.
   */
  onRightIconButtonClick: _propTypes2.default.func,
  /**
   * Callback function for when the title text is selected via a click.
   *
   * @param {object} event Click event targeting the `title` node.
   */
  onTitleClick: _propTypes2.default.func,
  /**
   * Determines whether or not to display the Menu icon next to the title.
   * Setting this prop to false will hide the icon.
   */
  showMenuIconButton: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * The title to display on the app bar.
   */
  title: _propTypes2.default.node,
  /**
   * Override the inline-styles of the app bar's title element.
   */
  titleStyle: _propTypes2.default.object,
  /**
   * The zDepth of the component.
   * The shadow of the app bar is also dependent on this property.
   */
  zDepth: _propTypes4.default.zDepth
} : {};
exports.default = AppBar;

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

var _propTypes3 = __webpack_require__(86);

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _EnhancedButton = __webpack_require__(68);

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

var _FontIcon = __webpack_require__(240);

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Tooltip = __webpack_require__(242);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _childUtils = __webpack_require__(243);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var baseTheme = context.muiTheme.baseTheme;


  return {
    root: {
      boxSizing: 'border-box',
      overflow: 'visible',
      transition: _transitions2.default.easeOut(),
      padding: baseTheme.spacing.iconSize / 2,
      width: baseTheme.spacing.iconSize * 2,
      height: baseTheme.spacing.iconSize * 2,
      fontSize: 0
    },
    tooltip: {
      boxSizing: 'border-box'
    },
    disabled: {
      color: baseTheme.palette.disabledColor,
      fill: baseTheme.palette.disabledColor,
      cursor: 'default'
    }
  };
}

var IconButton = function (_Component) {
  (0, _inherits3.default)(IconButton, _Component);

  function IconButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, IconButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = IconButton.__proto__ || (0, _getPrototypeOf2.default)(IconButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hovered: false,
      isKeyboardFocused: false,
      // Not to be confonded with the touch property.
      // This state is to determined if it's a mobile device.
      touch: false,
      tooltipShown: false
    }, _this.handleBlur = function (event) {
      _this.hideTooltip();
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleFocus = function (event) {
      _this.showTooltip();
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.handleMouseLeave = function (event) {
      if (!_this.button.isKeyboardFocused()) {
        _this.hideTooltip();
      }
      _this.setState({ hovered: false });
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    }, _this.handleMouseOut = function (event) {
      if (_this.props.disabled) _this.hideTooltip();
      if (_this.props.onMouseOut) _this.props.onMouseOut(event);
    }, _this.handleMouseEnter = function (event) {
      _this.showTooltip();

      // Cancel hover styles for touch devices
      if (!_this.state.touch) {
        _this.setState({ hovered: true });
      }
      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    }, _this.handleTouchStart = function (event) {
      _this.setState({ touch: true });

      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(event);
      }
    }, _this.handleKeyboardFocus = function (event, isKeyboardFocused) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          onKeyboardFocus = _this$props.onKeyboardFocus;

      if (isKeyboardFocused && !disabled) {
        _this.showTooltip();
        if (onFocus) {
          onFocus(event);
        }
      } else {
        _this.hideTooltip();
        if (onBlur) {
          onBlur(event);
        }
      }

      _this.setState({ isKeyboardFocused: isKeyboardFocused });
      if (onKeyboardFocus) {
        onKeyboardFocus(event, isKeyboardFocused);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(IconButton, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.disabled) {
        this.setState({ hovered: false });
      }
    }
  }, {
    key: 'setKeyboardFocus',
    value: function setKeyboardFocus() {
      this.button.setKeyboardFocus();
    }
  }, {
    key: 'showTooltip',
    value: function showTooltip() {
      if (this.props.tooltip) {
        this.setState({ tooltipShown: true });
      }
    }
  }, {
    key: 'hideTooltip',
    value: function hideTooltip() {
      if (this.props.tooltip) this.setState({ tooltipShown: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          disabled = _props.disabled,
          hoveredStyle = _props.hoveredStyle,
          disableTouchRipple = _props.disableTouchRipple,
          children = _props.children,
          iconClassName = _props.iconClassName,
          style = _props.style,
          tooltip = _props.tooltip,
          tooltipPositionProp = _props.tooltipPosition,
          tooltipStyles = _props.tooltipStyles,
          touch = _props.touch,
          iconStyle = _props.iconStyle,
          other = (0, _objectWithoutProperties3.default)(_props, ['disabled', 'hoveredStyle', 'disableTouchRipple', 'children', 'iconClassName', 'style', 'tooltip', 'tooltipPosition', 'tooltipStyles', 'touch', 'iconStyle']);

      var fonticon = void 0;

      var styles = getStyles(this.props, this.context);
      var tooltipPosition = tooltipPositionProp.split('-');

      var hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;

      var mergedRootStyles = (0, _simpleAssign2.default)(styles.root, style, hovered ? hoveredStyle : {});

      var tooltipElement = tooltip ? _react2.default.createElement(_Tooltip2.default, {
        label: tooltip,
        show: this.state.tooltipShown,
        touch: touch,
        style: (0, _simpleAssign2.default)(styles.tooltip, tooltipStyles),
        verticalPosition: tooltipPosition[0],
        horizontalPosition: tooltipPosition[1]
      }) : null;

      if (iconClassName) {
        var iconHoverColor = iconStyle.iconHoverColor,
            iconStyleFontIcon = (0, _objectWithoutProperties3.default)(iconStyle, ['iconHoverColor']);


        fonticon = _react2.default.createElement(
          _FontIcon2.default,
          {
            className: iconClassName,
            hoverColor: disabled ? null : iconHoverColor,
            style: (0, _simpleAssign2.default)({}, disabled && styles.disabled, iconStyleFontIcon),
            color: this.context.muiTheme.baseTheme.palette.textColor
          },
          children
        );
      }

      var childrenStyle = disabled ? (0, _simpleAssign2.default)({}, iconStyle, styles.disabled) : iconStyle;

      return _react2.default.createElement(
        _EnhancedButton2.default,
        (0, _extends3.default)({
          ref: function ref(_ref2) {
            return _this2.button = _ref2;
          }
        }, other, {
          centerRipple: true,
          disabled: disabled,
          onTouchStart: this.handleTouchStart,
          style: mergedRootStyles,
          disableTouchRipple: disableTouchRipple,
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onMouseLeave: this.handleMouseLeave,
          onMouseEnter: this.handleMouseEnter,
          onMouseOut: this.handleMouseOut,
          onKeyboardFocus: this.handleKeyboardFocus
        }),
        tooltipElement,
        fonticon,
        (0, _childUtils.extendChildren)(children, {
          style: childrenStyle
        })
      );
    }
  }]);
  return IconButton;
}(_react.Component);

IconButton.muiName = 'IconButton';
IconButton.defaultProps = {
  disabled: false,
  disableTouchRipple: false,
  iconStyle: {},
  tooltipPosition: 'bottom-center',
  touch: false
};
IconButton.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
IconButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Can be used to pass a `FontIcon` element as the icon for the button.
   */
  children: _propTypes2.default.node,
  /**
   * The CSS class name of the root element.
   */
  className: _propTypes2.default.string,
  /**
   * If true, the element's ripple effect will be disabled.
   */
  disableTouchRipple: _propTypes2.default.bool,
  /**
   * If true, the element will be disabled.
   */
  disabled: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element when the component is hovered.
   */
  hoveredStyle: _propTypes2.default.object,
  /**
   * The URL to link to when the button is clicked.
   */
  href: _propTypes2.default.string,
  /**
   * The CSS class name of the icon. Used for setting the icon with a stylesheet.
   */
  iconClassName: _propTypes2.default.string,
  /**
   * Override the inline-styles of the icon element.
   * Note: you can specify iconHoverColor as a String inside this object.
   */
  iconStyle: _propTypes2.default.object,
  /** @ignore */
  onBlur: _propTypes2.default.func,
  /**
   * Callback function fired when the button is clicked.
   *
   * @param {object} event Click event targeting the button.
   */
  onClick: _propTypes2.default.func,
  /** @ignore */
  onFocus: _propTypes2.default.func,
  /**
   * Callback function fired when the element is focused or blurred by the keyboard.
   *
   * @param {object} event `focus` or `blur` event targeting the element.
   * @param {boolean} keyboardFocused Indicates whether the element is focused.
   */
  onKeyboardFocus: _propTypes2.default.func,
  /** @ignore */
  onMouseEnter: _propTypes2.default.func,
  /** @ignore */
  onMouseLeave: _propTypes2.default.func,
  /** @ignore */
  onMouseOut: _propTypes2.default.func,
  /** @ignore */
  onTouchStart: _propTypes2.default.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * The text to supply to the element's tooltip.
   */
  tooltip: _propTypes2.default.node,
  /**
   * The vertical and horizontal positions, respectively, of the element's tooltip.
   * Possible values are: "bottom-center", "top-center", "bottom-right", "top-right",
   * "bottom-left", and "top-left".
   */
  tooltipPosition: _propTypes4.default.cornersAndCenter,
  /**
   * Override the inline-styles of the tooltip element.
   */
  tooltipStyles: _propTypes2.default.object,
  /**
   * If true, increase the tooltip element's size. Useful for increasing tooltip
   * readability on mobile devices.
   */
  touch: _propTypes2.default.bool
} : {};
exports.default = IconButton;

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _FontIcon = __webpack_require__(241);

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FontIcon2.default;

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context, state) {
  var color = props.color,
      hoverColor = props.hoverColor;
  var baseTheme = context.muiTheme.baseTheme;

  var offColor = color || baseTheme.palette.textColor;
  var onColor = hoverColor || offColor;

  return {
    root: {
      color: state.hovered ? onColor : offColor,
      position: 'relative',
      fontSize: baseTheme.spacing.iconSize,
      display: 'inline-block',
      userSelect: 'none',
      transition: _transitions2.default.easeOut()
    }
  };
}

var FontIcon = function (_Component) {
  (0, _inherits3.default)(FontIcon, _Component);

  function FontIcon() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FontIcon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FontIcon.__proto__ || (0, _getPrototypeOf2.default)(FontIcon)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hovered: false
    }, _this.handleMouseLeave = function (event) {
      // hover is needed only when a hoverColor is defined
      if (_this.props.hoverColor !== undefined) {
        _this.setState({ hovered: false });
      }
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    }, _this.handleMouseEnter = function (event) {
      // hover is needed only when a hoverColor is defined
      if (_this.props.hoverColor !== undefined) {
        _this.setState({ hovered: true });
      }
      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FontIcon, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          hoverColor = _props.hoverColor,
          onMouseLeave = _props.onMouseLeave,
          onMouseEnter = _props.onMouseEnter,
          style = _props.style,
          other = (0, _objectWithoutProperties3.default)(_props, ['hoverColor', 'onMouseLeave', 'onMouseEnter', 'style']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);

      return _react2.default.createElement('span', (0, _extends3.default)({}, other, {
        onMouseLeave: this.handleMouseLeave,
        onMouseEnter: this.handleMouseEnter,
        style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
      }));
    }
  }]);
  return FontIcon;
}(_react.Component);

FontIcon.muiName = 'FontIcon';
FontIcon.defaultProps = {
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {}
};
FontIcon.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
FontIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * This is the font color of the font icon. If not specified,
   * this component will default to muiTheme.palette.textColor.
   */
  color: _propTypes2.default.string,
  /**
   * This is the icon color when the mouse hovers over the icon.
   */
  hoverColor: _propTypes2.default.string,
  /** @ignore */
  onMouseEnter: _propTypes2.default.func,
  /** @ignore */
  onMouseLeave: _propTypes2.default.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};
exports.default = FontIcon;

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = __webpack_require__(39);

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context, state) {
  var verticalPosition = props.verticalPosition;
  var horizontalPosition = props.horizontalPosition;
  var touchMarginOffset = props.touch ? 10 : 0;
  var touchOffsetTop = props.touch ? -20 : -10;
  var offset = verticalPosition === 'bottom' ? 14 + touchMarginOffset : -14 - touchMarginOffset;

  var _context$muiTheme = context.muiTheme,
      baseTheme = _context$muiTheme.baseTheme,
      zIndex = _context$muiTheme.zIndex,
      tooltip = _context$muiTheme.tooltip,
      borderRadius = _context$muiTheme.borderRadius;


  var styles = {
    root: {
      position: 'absolute',
      fontFamily: baseTheme.fontFamily,
      fontSize: '10px',
      lineHeight: '22px',
      padding: '0 8px',
      zIndex: zIndex.tooltip,
      color: tooltip.color,
      overflow: 'hidden',
      top: -10000,
      borderRadius: borderRadius,
      userSelect: 'none',
      opacity: 0,
      right: horizontalPosition === 'left' ? 12 : null,
      left: horizontalPosition === 'center' ? (state.offsetWidth - 48) / 2 * -1 : horizontalPosition === 'right' ? 12 : null,
      transition: _transitions2.default.easeOut('0ms', 'top', '450ms') + ', ' + _transitions2.default.easeOut('450ms', 'transform', '0ms') + ', ' + _transitions2.default.easeOut('450ms', 'opacity', '0ms')
    },
    label: {
      position: 'relative',
      whiteSpace: 'nowrap'
    },
    ripple: {
      position: 'absolute',
      left: horizontalPosition === 'center' ? '50%' : horizontalPosition === 'left' ? '100%' : '0%',
      top: verticalPosition === 'bottom' ? 0 : '100%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      transition: _transitions2.default.easeOut('0ms', 'width', '450ms') + ', ' + _transitions2.default.easeOut('0ms', 'height', '450ms') + ', ' + _transitions2.default.easeOut('450ms', 'backgroundColor', '0ms')
    },
    rootWhenShown: {
      top: verticalPosition === 'top' ? touchOffsetTop : 36,
      opacity: tooltip.opacity,
      transform: 'translate(0px, ' + offset + 'px)',
      transition: _transitions2.default.easeOut('0ms', 'top', '0ms') + ', ' + _transitions2.default.easeOut('450ms', 'transform', '0ms') + ', ' + _transitions2.default.easeOut('450ms', 'opacity', '0ms')
    },
    rootWhenTouched: {
      fontSize: '14px',
      lineHeight: '32px',
      padding: '0 16px'
    },
    rippleWhenShown: {
      backgroundColor: tooltip.rippleBackgroundColor,
      transition: _transitions2.default.easeOut('450ms', 'width', '0ms') + ', ' + _transitions2.default.easeOut('450ms', 'height', '0ms') + ', ' + _transitions2.default.easeOut('450ms', 'backgroundColor', '0ms')
    }
  };

  return styles;
}

var Tooltip = function (_Component) {
  (0, _inherits3.default)(Tooltip, _Component);

  function Tooltip() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tooltip.__proto__ || (0, _getPrototypeOf2.default)(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      offsetWidth: null
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Tooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setRippleSize();
      this.setTooltipPosition();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setTooltipPosition();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setRippleSize();
    }
  }, {
    key: 'setRippleSize',
    value: function setRippleSize() {
      var ripple = this.refs.ripple;
      var tooltip = this.refs.tooltip;
      var tooltipWidth = parseInt(tooltip.offsetWidth, 10) / (this.props.horizontalPosition === 'center' ? 2 : 1);
      var tooltipHeight = parseInt(tooltip.offsetHeight, 10);

      var rippleDiameter = Math.ceil(Math.sqrt(Math.pow(tooltipHeight, 2) + Math.pow(tooltipWidth, 2)) * 2);
      if (this.props.show) {
        ripple.style.height = rippleDiameter + 'px';
        ripple.style.width = rippleDiameter + 'px';
      } else {
        ripple.style.width = '0px';
        ripple.style.height = '0px';
      }
    }
  }, {
    key: 'setTooltipPosition',
    value: function setTooltipPosition() {
      this.setState({ offsetWidth: this.refs.tooltip.offsetWidth });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          horizontalPosition = _props.horizontalPosition,
          label = _props.label,
          show = _props.show,
          touch = _props.touch,
          verticalPosition = _props.verticalPosition,
          other = (0, _objectWithoutProperties3.default)(_props, ['horizontalPosition', 'label', 'show', 'touch', 'verticalPosition']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, {
          ref: 'tooltip',
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, this.props.show && styles.rootWhenShown, this.props.touch && styles.rootWhenTouched, this.props.style))
        }),
        _react2.default.createElement('div', {
          ref: 'ripple',
          style: prepareStyles((0, _simpleAssign2.default)(styles.ripple, this.props.show && styles.rippleWhenShown))
        }),
        _react2.default.createElement(
          'span',
          { style: prepareStyles(styles.label) },
          label
        )
      );
    }
  }]);
  return Tooltip;
}(_react.Component);

Tooltip.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
Tooltip.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The css class name of the root element.
   */
  className: _propTypes2.default.string,
  horizontalPosition: _propTypes2.default.oneOf(['left', 'right', 'center']),
  label: _propTypes2.default.node.isRequired,
  show: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  touch: _propTypes2.default.bool,
  verticalPosition: _propTypes2.default.oneOf(['top', 'bottom'])
} : {};
exports.default = Tooltip;

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendChildren = extendChildren;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extendChildren(children, extendedProps, extendedChildren) {
  return _react2.default.Children.map(children, function (child) {
    if (!_react2.default.isValidElement(child)) {
      return child;
    }

    var newProps = typeof extendedProps === 'function' ? extendedProps(child) : extendedProps;

    var newChildren = typeof extendedChildren === 'function' ? extendedChildren(child) : extendedChildren ? extendedChildren : child.props.children;

    return _react2.default.cloneElement(child, newProps, newChildren);
  });
}

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pure = __webpack_require__(55);

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = __webpack_require__(56);

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationMenu = function NavigationMenu(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' })
  );
};
NavigationMenu = (0, _pure2.default)(NavigationMenu);
NavigationMenu.displayName = 'NavigationMenu';
NavigationMenu.muiName = 'SvgIcon';

exports.default = NavigationMenu;

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepMeLogo = function (_React$Component) {
  _inherits(RepMeLogo, _React$Component);

  function RepMeLogo(props) {
    _classCallCheck(this, RepMeLogo);

    return _possibleConstructorReturn(this, (RepMeLogo.__proto__ || Object.getPrototypeOf(RepMeLogo)).call(this, props));
  }

  _createClass(RepMeLogo, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'svg',
        { width: '100%', height: '100%', viewBox: '0 0 1092 204', xmlns: 'http://www.w3.org/2000/svg', fillRule: 'evenodd',
          clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1.414' },
        _react2.default.createElement('path', { d: 'M151.69,94L211,28C205.474,26.404 199.752,25.593 194,25.59L123.63,25.59C89.909,25.59 62.16,53.339 62.16,87.06C62.16,120.781 89.909,148.53 123.63,148.53L126.18,148.53L146.35,184.61L146.35,158.11L92.9,65.69L135.64,66.58L151.69,94Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M238.16,44.33L181,148.54L194.004,148.54C227.72,148.54 255.464,120.796 255.464,87.08C255.464,71.13 249.255,55.79 238.16,44.33Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M146.35,184.62L238.32,33.17L238.32,19.81L146.35,158.11L146.35,184.62Z',
          fill: '#d1232c', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M353.9,45.52C353.9,55.247 350.05,61.527 342.35,64.36L357.72,86.07L341,86.07L327.58,66.71L318.2,66.71L318.2,86.07L304.66,86.07L304.66,25.37L327.66,25.37C337.1,25.37 343.83,26.963 347.85,30.15C351.87,33.337 353.887,38.46 353.9,45.52ZM337.57,52.73C339.25,51.22 340.09,48.84 340.09,45.56C340.09,42.28 339.22,40.05 337.48,38.83C335.74,37.61 332.71,37 328.37,37L318.2,37L318.2,55L328.1,55C332.74,55 335.89,54.23 337.57,52.73Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M411.56,25.37L411.56,37.44L381.34,37.44L381.34,50L408.52,50L408.52,61.5L381.34,61.5L381.34,74.09L412.51,74.09L412.51,86.09L367.79,86.09L367.79,25.37L411.56,25.37Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M466.39,30.8C470.65,34.42 472.78,39.977 472.78,47.47C472.78,54.963 470.593,60.45 466.22,63.93C461.847,67.403 455.18,69.14 446.22,69.14L438.15,69.14L438.15,86.07L424.58,86.07L424.58,25.37L446,25.37C455.333,25.37 462.13,27.18 466.39,30.8ZM456.45,54.68C458.07,52.86 458.88,50.193 458.88,46.68C458.88,43.167 457.823,40.677 455.71,39.21C453.603,37.737 450.32,37 445.86,37L438.13,37L438.13,57.42L447.25,57.42C451.75,57.42 454.817,56.507 456.45,54.68Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M532.61,45.52C532.61,55.247 528.76,61.527 521.06,64.36L536.43,86.07L519.75,86.07L506.29,66.71L496.92,66.71L496.92,86.07L483.37,86.07L483.37,25.37L506.37,25.37C515.81,25.37 522.54,26.963 526.56,30.15C530.58,33.337 532.597,38.46 532.61,45.52ZM516.28,52.73C517.96,51.22 518.8,48.84 518.8,45.56C518.8,42.28 517.93,40.05 516.19,38.83C514.45,37.61 511.42,37 507.08,37L496.92,37L496.92,55L506.82,55C511.45,55 514.6,54.23 516.28,52.73Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M590.27,25.37L590.27,37.44L560.05,37.44L560.05,50L587.23,50L587.23,61.5L560.05,61.5L560.05,74.09L591.22,74.09L591.22,86.09L546.5,86.09L546.5,25.37L590.27,25.37Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M617.49,37.49C616.191,38.511 615.449,40.088 615.49,41.74C615.459,43.495 616.393,45.133 617.92,46C619.52,47.047 623.187,48.28 628.92,49.7C634.653,51.12 639.137,53.22 642.37,56C645.55,58.84 647.14,63 647.14,68.42C647.289,73.558 645.013,78.478 641,81.69C636.92,85.083 631.55,86.777 624.89,86.77C615.277,86.77 606.61,83.21 598.89,76.09L606.96,66.19C613.513,71.917 619.567,74.783 625.12,74.79C627.203,74.91 629.269,74.344 631,73.18C632.379,72.174 633.174,70.547 633.12,68.84C633.165,67.102 632.314,65.458 630.87,64.49C629.363,63.423 626.38,62.34 621.92,61.24C614.86,59.56 609.693,57.373 606.42,54.68C603.147,51.987 601.527,47.76 601.56,42C601.56,36.24 603.627,31.797 607.76,28.67C611.893,25.543 617.063,23.987 623.27,24C627.408,24.017 631.514,24.723 635.42,26.09C639.284,27.384 642.872,29.389 646,32L639.14,41.9C633.873,37.9 628.43,35.9 622.81,35.9C620.906,35.792 619.023,36.355 617.49,37.49Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M702.46,25.37L702.46,37.44L672.24,37.44L672.24,50L699.42,50L699.42,61.5L672.24,61.5L672.24,74.09L703.42,74.09L703.42,86.09L658.69,86.09L658.69,25.37L702.46,25.37Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M758,25.37L771.54,25.37L771.54,86.07L758,86.07L729,48L729,86L715.48,86L715.48,25.37L728.16,25.37L758,64.45L758,25.37Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M812.14,37.1L812.14,86.1L798.59,86.1L798.59,37.1L781.39,37.1L781.39,25.37L829.33,25.37L829.33,37.1L812.14,37.1Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('rect', { x: '833', y: '54.2', width: '30.92', height: '11.55', fill: '#015792', fillRule: 'nonzero'
        }),
        _react2.default.createElement('path', { d: 'M888.05,39.2L886.38,36.29C891.119,32.102 896.367,28.527 902,25.65C906.74,23.363 910.353,22.22 912.84,22.22C913.628,22.142 914.416,22.38 915.03,22.88C915.472,23.374 915.641,24.057 915.48,24.7C914.942,26.635 914.219,28.514 913.32,30.31C911.48,34.39 910.147,37.62 909.32,40C923.033,28.147 932.967,22.22 939.12,22.22C940.399,22.09 941.667,22.577 942.53,23.53C943.2,24.41 943.36,25.79 943.03,27.69C942.7,29.59 941.33,33.2 939.03,38.11C945.59,32.33 951.127,28.237 955.64,25.83C960.153,23.423 963.55,22.22 965.83,22.22C967.474,22.103 969.082,22.762 970.17,24C971.08,25.17 971.32,27 970.89,29.39C970.539,31.173 969.989,32.91 969.25,34.57C968.41,36.57 965.567,42.643 960.72,52.79C954.66,65.35 951.42,72.843 951,75.27C950.71,76.92 951.25,77.75 952.61,77.75C953.621,77.723 954.606,77.422 955.46,76.88C959.011,74.591 962.4,72.058 965.6,69.3L967.54,71.92C966.38,72.747 964.163,74.447 960.89,77.02C957.976,79.405 954.91,81.596 951.71,83.58C948.61,85.23 946.08,86.06 944.14,86.06C942.672,86.039 941.329,85.212 940.65,83.91C939.79,82.483 939.573,80.513 940,78C940.55,75.193 941.374,72.446 942.46,69.8C943.693,66.673 946.927,59.64 952.16,48.7C956.08,40.493 958.197,35.513 958.51,33.76C958.8,32.11 958.21,31.29 956.76,31.29C954.909,31.498 953.128,32.12 951.55,33.11C947.053,35.544 942.964,38.665 939.43,42.36C937.037,44.893 934.63,48.893 932.21,54.36C926.83,66.36 922.673,76.15 919.74,83.73L909.42,83.73L928.13,39.2C928.95,37.395 929.668,35.545 930.28,33.66C930.439,33.055 930.341,32.411 930.01,31.88C929.618,31.432 929.032,31.2 928.44,31.26C927.107,31.26 924.89,32.28 921.79,34.32C916.377,37.773 912.333,41.107 909.66,44.32C906.987,47.533 904.32,52.45 901.66,59.07L891.71,83.71L881.22,83.71L895.58,49C899.787,38.94 901.967,33.473 902.12,32.6C902.32,31.48 901.987,30.92 901.12,30.92C899.22,30.9 894.863,33.66 888.05,39.2Z',
          fill: '#ea2126', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M1012.19,65.43L1014.03,68.64C1000.13,79.973 988.93,85.64 980.43,85.64C976.983,85.64 974.553,84.473 973.14,82.14C971.727,79.807 971.477,76.067 972.39,70.92C974.223,60.52 979.203,50.187 987.33,39.92C996.49,28.207 1006,22.35 1015.86,22.35C1019.31,22.35 1021.8,23.22 1023.31,24.94C1024.82,26.66 1025.31,29.03 1024.79,32.05C1024.06,35.557 1022.35,38.787 1019.87,41.37C1017.14,44.43 1012.66,47.613 1006.45,50.92C1003.35,52.52 996.817,55.41 986.85,59.59C985.99,62.038 985.322,64.549 984.85,67.1C984.25,70.547 984.373,72.95 985.22,74.31C986.07,75.67 987.55,76.31 989.64,76.31C992.013,76.224 994.344,75.655 996.49,74.64C999.977,73.113 1005.21,70.043 1012.19,65.43ZM988.55,54.87C996.99,51.37 1003.53,47.603 1008.17,43.57C1011.35,40.76 1013.17,37.96 1013.66,35.19C1014.1,33.49 1013.83,31.682 1012.9,30.19C1012,28.935 1010.51,28.23 1008.97,28.33C1006.94,28.4 1004.98,29.099 1003.36,30.33C1000.41,32.515 997.961,35.295 996.16,38.49C993.069,43.675 990.519,49.164 988.55,54.87Z',
          fill: '#ea2126', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M342.61,145.45C343.952,144.017 345.515,142.809 347.24,141.87C348.414,141.197 349.729,140.807 351.08,140.73C352.25,140.679 353.36,141.27 353.97,142.27C354.712,143.696 354.968,145.325 354.7,146.91C354.406,150.02 353.433,153.027 351.85,155.72C350.459,158.308 348.504,160.55 346.13,162.28C344.345,163.644 342.184,164.43 339.94,164.53C338.506,164.621 337.102,164.08 336.1,163.05C335.189,161.989 334.787,160.582 335,159.2C335.223,157.409 335.622,155.643 336.19,153.93L340.65,139.41C341.423,136.531 342.648,133.794 344.28,131.3C345.59,129.459 347.3,127.938 349.28,126.85C350.972,125.839 352.891,125.268 354.86,125.19C355.636,125.123 356.413,125.313 357.07,125.73C357.512,126.068 357.738,126.619 357.66,127.17C357.616,127.717 357.334,128.218 356.89,128.54C356.34,128.931 355.674,129.124 355,129.09C353.991,129.032 352.988,128.895 352,128.68C351.434,128.559 350.858,128.496 350.28,128.49C349.3,128.537 348.416,129.101 347.96,129.97C347.043,131.847 346.303,133.806 345.75,135.82L342.61,145.45ZM348.08,143.78C346.836,143.945 345.679,144.514 344.79,145.4C343.079,147.013 341.718,148.96 340.79,151.12C339.533,153.643 338.746,156.375 338.47,159.18C338.353,160.069 338.611,160.968 339.18,161.66C339.684,162.298 340.457,162.668 341.27,162.66C343.27,162.66 345.197,161.057 347.05,157.85C348.8,154.921 349.888,151.644 350.24,148.25C350.404,147.038 350.198,145.804 349.65,144.71C349.341,144.133 348.735,143.773 348.08,143.78Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M357.49,146.25L356.74,144.96L358.86,143.58C360.251,142.624 361.7,141.755 363.2,140.98C363.594,140.778 364.028,140.665 364.47,140.65C364.893,140.687 365.269,140.936 365.47,141.31C367.078,143.813 368.194,146.599 368.76,149.52C369.522,152.795 369.771,156.168 369.5,159.52C369.5,159.94 369.39,160.58 369.28,161.44C372.82,155.74 374.737,151.217 375.03,147.87C375.079,146.938 375.009,146.004 374.82,145.09C374.637,144.189 374.553,143.27 374.57,142.35C374.603,141.848 374.825,141.376 375.19,141.03C375.535,140.688 376.004,140.501 376.49,140.51C377.072,140.483 377.628,140.764 377.95,141.25C378.328,141.884 378.47,142.632 378.35,143.36C377.965,146.397 377.168,149.368 375.98,152.19C374.373,156.172 372.363,159.978 369.98,163.55C367.982,166.796 365.635,169.814 362.98,172.55C361.275,174.26 359.307,175.684 357.15,176.77C355.563,177.561 353.823,177.998 352.05,178.05C351.124,178.12 350.2,177.885 349.42,177.38C348.896,177.019 348.602,176.405 348.65,175.77C348.713,175.203 349.015,174.69 349.48,174.36C350.038,173.944 350.725,173.736 351.42,173.77C352.256,173.802 353.087,173.919 353.9,174.12C354.653,174.322 355.423,174.453 356.2,174.51C357.518,174.425 358.779,173.936 359.81,173.11C361.549,171.877 363.036,170.322 364.19,168.53C365.269,166.923 365.938,165.075 366.14,163.15C366.345,160.094 366.245,157.026 365.84,153.99C365.642,151.128 364.83,148.341 363.46,145.82C363.108,145.01 362.34,144.453 361.46,144.37C360.55,144.44 359.24,145 357.49,146.25Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M400.31,136.42L404.75,134.75L402.13,142.43L407.73,142.43L407.13,144.38L401.53,144.38L398.36,153.58C397.612,155.435 397.069,157.367 396.74,159.34C396.661,159.71 396.737,160.097 396.95,160.41C397.157,160.641 397.46,160.763 397.77,160.74C398.719,160.605 399.627,160.264 400.43,159.74C402.031,158.853 403.565,157.85 405.02,156.74L405.94,158C403.26,160.031 400.451,161.884 397.53,163.55C396.512,164.111 395.388,164.451 394.23,164.55C393.629,164.586 393.052,164.305 392.71,163.81C392.326,163.069 392.196,162.222 392.34,161.4C392.647,159.351 393.17,157.339 393.9,155.4L397.61,144.47L393.23,144.47L393.88,142.52L398.27,142.52L400.31,136.42Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M430.28,157.91L430.89,158.91C429.257,160.625 427.408,162.121 425.39,163.36C424.5,163.98 423.468,164.365 422.39,164.48C421.801,164.507 421.241,164.212 420.93,163.71C420.542,162.981 420.408,162.143 420.55,161.33C420.695,160.243 420.94,159.172 421.28,158.13C421.7,156.73 422.807,153.73 424.6,149.13C425.116,147.829 425.537,146.492 425.86,145.13C425.91,144.54 425.63,144.25 425.02,144.25C423.934,144.353 422.897,144.751 422.02,145.4C420.291,146.502 418.745,147.869 417.44,149.45C416.393,150.853 415.619,152.441 415.16,154.13L412.16,163.71L408.16,163.71C409.3,160.52 410.16,157.9 410.84,155.87L416.36,138.27C417.089,135.58 418.276,133.036 419.87,130.75C421.204,128.996 422.912,127.561 424.87,126.55C426.635,125.561 428.617,125.022 430.64,124.98C431.289,124.935 431.931,125.143 432.43,125.56C432.838,125.938 433.042,126.488 432.98,127.04C432.913,127.569 432.631,128.047 432.2,128.36C431.667,128.756 431.014,128.957 430.35,128.93C429.791,128.919 429.233,128.872 428.68,128.79C427.625,128.607 426.56,128.49 425.49,128.44C424.668,128.432 423.886,128.801 423.37,129.44C422.445,130.92 421.769,132.541 421.37,134.24L417.17,147.79C419.431,145.567 421.952,143.626 424.68,142.01C425.775,141.238 427.048,140.756 428.38,140.61C428.977,140.571 429.561,140.803 429.97,141.24C430.355,141.74 430.514,142.378 430.41,143C430.356,143.633 430.228,144.257 430.03,144.86C429.697,145.94 428.977,147.9 427.87,150.74C426.35,154.65 425.44,157.09 425.15,158.04C424.883,158.869 424.705,159.724 424.62,160.59C424.579,160.814 424.611,161.045 424.71,161.25C424.798,161.4 424.966,161.486 425.14,161.47C426.109,161.169 426.988,160.633 427.7,159.91C428.38,159.38 429.25,158.7 430.28,157.91Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M447.19,156.84L447.97,158.05C443.177,162.317 439.207,164.45 436.06,164.45C434.955,164.534 433.884,164.032 433.24,163.13C432.566,161.829 432.341,160.342 432.6,158.9C433.059,154.674 434.622,150.642 437.13,147.21C440.15,142.803 443.483,140.597 447.13,140.59C448.177,140.512 449.211,140.874 449.98,141.59C450.617,142.323 450.899,143.301 450.75,144.26C450.602,145.558 450.073,146.783 449.23,147.78C447.909,149.255 446.325,150.473 444.56,151.37C443.47,151.98 441.13,153.07 437.56,154.64C437.322,155.569 437.158,156.515 437.07,157.47C436.897,158.393 437.026,159.347 437.44,160.19C437.842,160.719 438.488,161.006 439.15,160.95C440.015,160.918 440.864,160.704 441.64,160.32C443.585,159.318 445.441,158.154 447.19,156.84ZM438.07,152.84C440.603,151.831 442.944,150.393 444.99,148.59C445.935,147.781 446.56,146.659 446.75,145.43C446.85,144.769 446.689,144.094 446.3,143.55C445.94,143.081 445.37,142.819 444.78,142.85C444.047,142.881 443.345,143.152 442.78,143.62C441.754,144.444 440.932,145.495 440.38,146.69C439.39,148.658 438.616,150.726 438.07,152.86L438.07,152.84Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M465.23,147.46L464.23,146.36C465.739,144.61 467.522,143.118 469.51,141.94C470.816,141.112 472.307,140.621 473.85,140.51C474.214,140.494 474.571,140.615 474.85,140.85C475.1,141.118 475.211,141.488 475.15,141.85C475.103,142.403 474.996,142.95 474.83,143.48C474.67,144.04 474.19,145.36 473.39,147.48C475.293,145.599 477.335,143.864 479.5,142.29C480.91,141.298 482.569,140.716 484.29,140.61C485.212,140.61 486.063,141.118 486.5,141.93C487.125,143.164 487.335,144.567 487.1,145.93C486.651,150.531 484.88,154.904 482,158.52C478.927,162.52 475.743,164.52 472.45,164.52C471.11,164.512 469.797,164.142 468.65,163.45L465.55,172.51C465.387,172.945 465.276,173.399 465.22,173.86C465.114,174.425 465.364,175.002 465.85,175.31C467.366,175.971 468.989,176.353 470.64,176.44L470.17,177.81C467.29,177.57 465.02,177.45 463.36,177.45C461.7,177.45 459.473,177.57 456.68,177.81L457.15,176.44C458.277,176.393 459.36,175.986 460.24,175.28C461.099,174.336 461.713,173.196 462.03,171.96L468.75,151.13C470.003,147.25 470.65,145.09 470.69,144.65C470.69,144.17 470.53,143.93 470.08,143.93C469.293,143.917 467.677,145.093 465.23,147.46ZM469.57,160.41C470.579,161.713 472.113,162.508 473.76,162.58C475.92,162.58 477.963,160.87 479.89,157.45C481.698,154.392 482.83,150.982 483.21,147.45C483.349,146.625 483.178,145.777 482.73,145.07C482.306,144.525 481.64,144.222 480.95,144.26C479.84,144.366 478.791,144.817 477.95,145.55C476.376,146.681 474.969,148.027 473.77,149.55C472.783,151.096 472.035,152.781 471.55,154.55L469.57,160.41Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M502.52,156.84L503.31,158.05C498.517,162.317 494.547,164.45 491.4,164.45C490.295,164.534 489.224,164.032 488.58,163.13C487.902,161.831 487.673,160.343 487.93,158.9C488.398,154.674 489.963,150.644 492.47,147.21C495.49,142.803 498.823,140.597 502.47,140.59C503.515,140.51 504.546,140.873 505.31,141.59C505.955,142.318 506.242,143.299 506.09,144.26C505.942,145.558 505.413,146.783 504.57,147.78C503.249,149.255 501.665,150.473 499.9,151.37C498.81,151.98 496.47,153.07 492.9,154.64C492.662,155.569 492.498,156.515 492.41,157.47C492.237,158.393 492.366,159.347 492.78,160.19C493.182,160.719 493.828,161.006 494.49,160.95C495.352,160.918 496.197,160.704 496.97,160.32C498.917,159.323 500.774,158.159 502.52,156.84ZM493.41,152.84C495.943,151.831 498.284,150.393 500.33,148.59C501.275,147.781 501.9,146.659 502.09,145.43C502.188,144.77 502.031,144.098 501.65,143.55C501.283,143.084 500.713,142.823 500.12,142.85C499.387,142.881 498.685,143.152 498.12,143.62C497.094,144.444 496.272,145.495 495.72,146.69C494.73,148.658 493.956,150.726 493.41,152.86L493.41,152.84Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M522,140.65C523.675,140.611 525.262,141.415 526.22,142.79C527.356,144.569 527.798,146.706 527.46,148.79C527.067,152.93 525.233,156.803 522.28,159.73C519.193,162.957 516.08,164.57 512.94,164.57C511.225,164.663 509.56,163.953 508.44,162.65C507.32,161.15 506.848,159.261 507.13,157.41C507.48,153.532 508.93,149.832 511.31,146.75C514.383,142.683 517.947,140.65 522,140.65ZM519.52,142.71C517.993,142.71 516.413,143.82 514.78,146.04C512.983,148.787 511.964,151.97 511.83,155.25C511.546,157.167 511.835,159.126 512.66,160.88C513.111,161.821 514.076,162.414 515.12,162.39C516.64,162.39 518.103,161.437 519.51,159.53C521.396,156.818 522.497,153.637 522.69,150.34C522.94,147.59 522.69,145.64 522.11,144.46C521.673,143.415 520.653,142.726 519.52,142.71Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M530.54,147.46L529.59,146.36C531.099,144.61 532.882,143.118 534.87,141.94C536.176,141.112 537.667,140.621 539.21,140.51C539.574,140.496 539.93,140.617 540.21,140.85C540.46,141.118 540.571,141.488 540.51,141.85C540.459,142.403 540.351,142.949 540.19,143.48C540.02,144.04 539.54,145.36 538.75,147.48C540.65,145.6 542.689,143.865 544.85,142.29C546.264,141.297 547.926,140.716 549.65,140.61C550.572,140.61 551.423,141.118 551.86,141.93C552.476,143.167 552.686,144.567 552.46,145.93C551.989,150.553 550.186,154.942 547.27,158.56C544.203,162.56 541.023,164.56 537.73,164.56C536.39,164.553 535.077,164.183 533.93,163.49L530.83,172.55C530.66,172.984 530.546,173.437 530.49,173.9C530.384,174.465 530.634,175.042 531.12,175.35C532.64,176.009 534.266,176.392 535.92,176.48L535.45,177.85C532.56,177.61 530.3,177.49 528.64,177.49C526.98,177.49 524.7,177.61 521.96,177.85L522.43,176.48C523.557,176.433 524.64,176.026 525.52,175.32C526.375,174.373 526.989,173.234 527.31,172L534.02,151.17C535.28,147.29 535.947,145.13 536.02,144.69C536.02,144.21 535.86,143.97 535.41,143.97C534.603,143.93 532.98,145.093 530.54,147.46ZM534.89,160.41C535.895,161.713 537.426,162.508 539.07,162.58C541.23,162.58 543.28,160.87 545.2,157.45C547.012,154.394 548.145,150.983 548.52,147.45C548.664,146.625 548.493,145.775 548.04,145.07C547.62,144.525 546.957,144.222 546.27,144.26C545.16,144.368 544.112,144.819 543.27,145.55C541.7,146.686 540.294,148.032 539.09,149.55C538.107,151.097 537.362,152.782 536.88,154.55L534.89,160.41Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M564.9,157.12L565.73,158.12C564.113,159.786 562.312,161.263 560.36,162.52C558.32,163.853 556.68,164.52 555.44,164.52C554.919,164.54 554.42,164.3 554.11,163.88C553.767,163.358 553.631,162.727 553.73,162.11C554.283,159.006 555.109,155.958 556.2,153L560.2,140.95C561.101,137.939 562.252,135.009 563.64,132.19C564.882,130.021 566.676,128.22 568.84,126.97C570.842,125.772 573.127,125.129 575.46,125.11C576.104,125.065 576.742,125.269 577.24,125.68C577.634,126.019 577.837,126.533 577.78,127.05C577.743,127.621 577.462,128.149 577.01,128.5C576.421,128.9 575.708,129.077 575,129C574.24,128.971 573.484,128.877 572.74,128.72C571.955,128.578 571.158,128.504 570.36,128.5C569.754,128.463 569.152,128.628 568.65,128.97C567.873,129.736 567.302,130.685 566.99,131.73C566.45,133.13 565.52,135.897 564.2,140.03L560.5,151.53C558.66,157.303 557.73,160.303 557.71,160.53C557.71,161.12 557.84,161.41 558.25,161.41C558.899,161.324 559.517,161.08 560.05,160.7C561.779,159.667 563.403,158.468 564.9,157.12Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M581.12,156.84L581.9,158.05C577.113,162.317 573.143,164.45 569.99,164.45C568.885,164.534 567.814,164.032 567.17,163.13C566.496,161.829 566.271,160.342 566.53,158.9C566.989,154.674 568.552,150.642 571.06,147.21C574.08,142.803 577.413,140.597 581.06,140.59C582.107,140.512 583.141,140.874 583.91,141.59C584.552,142.32 584.834,143.3 584.68,144.26C584.532,145.558 584.003,146.783 583.16,147.78C581.839,149.255 580.255,150.473 578.49,151.37C577.403,151.983 575.07,153.073 571.49,154.64C571.252,155.569 571.088,156.515 571,157.47C570.827,158.393 570.956,159.347 571.37,160.19C571.772,160.719 572.418,161.006 573.08,160.95C573.945,160.919 574.794,160.705 575.57,160.32C577.516,159.321 579.373,158.157 581.12,156.84ZM572,152.84C574.533,151.831 576.874,150.393 578.92,148.59C579.865,147.781 580.49,146.659 580.68,145.43C580.778,144.77 580.621,144.098 580.24,143.55C579.876,143.085 579.309,142.824 578.72,142.85C577.987,142.882 577.285,143.153 576.72,143.62C575.696,144.447 574.875,145.497 574.32,146.69C573.327,148.657 572.549,150.726 572,152.86L572,152.84Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M605.67,139.08L604.36,138.4C605.554,136.066 607.239,134.019 609.3,132.4C610.842,131.312 612.683,130.729 614.57,130.73C616.561,130.614 618.498,131.428 619.81,132.93C621.019,134.349 621.591,136.206 621.39,138.06C621.277,139.336 620.938,140.582 620.39,141.74C619.665,143.165 618.738,144.478 617.64,145.64C615.605,147.622 613.454,149.482 611.2,151.21C607.603,154.018 604.257,157.133 601.2,160.52C603.567,160.407 606.003,160.353 608.51,160.36L610.62,160.36C611.551,160.481 612.497,160.349 613.36,159.98C614.384,159.086 615.274,158.049 616,156.9L617.87,156.9C616.07,159.22 614.568,161.756 613.4,164.45C612.077,164.202 610.742,164.021 609.4,163.91C607.993,163.79 606.503,163.73 604.93,163.73C603.07,163.73 600.327,163.85 596.7,164.09L597.4,162.36C599.811,159.307 602.517,156.5 605.48,153.98C607.875,151.966 610.149,149.813 612.29,147.53C613.627,146.014 614.766,144.333 615.68,142.53C616.216,141.463 616.555,140.308 616.68,139.12C616.894,137.707 616.534,136.266 615.68,135.12C614.931,134.153 613.762,133.602 612.54,133.64C611.35,133.677 610.201,134.09 609.26,134.82C607.811,136.007 606.594,137.451 605.67,139.08Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M624.48,157.78C625.143,157.762 625.776,158.063 626.18,158.59C626.612,159.162 626.805,159.879 626.72,160.59C626.678,161.618 626.294,162.604 625.63,163.39C625.081,164.032 624.275,164.398 623.43,164.39C622.777,164.414 622.148,164.133 621.73,163.63C621.286,163.091 621.087,162.392 621.18,161.7C621.271,160.59 621.716,159.538 622.45,158.7C622.949,158.099 623.699,157.759 624.48,157.78Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M651.06,130.82C653.419,130.688 655.687,131.777 657.06,133.7C658.45,135.63 658.98,138.5 658.65,142.33C658.173,147.762 656.325,152.986 653.28,157.51C650.173,162.177 646.7,164.51 642.86,164.51C640.647,164.527 638.579,163.389 637.41,161.51C636.023,159.51 635.48,156.79 635.78,153.35C636.163,149.213 637.306,145.183 639.15,141.46C641.03,137.587 643.03,134.84 645.15,133.22C646.803,131.793 648.88,130.949 651.06,130.82ZM650.43,132.44C649.31,132.44 648.11,133.19 646.81,134.71C645.51,136.23 644.21,138.98 642.87,143C641.603,146.725 640.771,150.584 640.39,154.5C640.14,157.43 640.39,159.57 641.09,160.9C641.527,162.031 642.581,162.812 643.79,162.9C644.943,162.827 646.021,162.302 646.79,161.44C648.297,160 649.787,157.277 651.26,153.27C652.707,149.387 653.628,145.327 654,141.2C654.28,138.07 654,135.73 653.21,134.2C652.735,133.1 651.628,132.399 650.43,132.44Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M309,180.32C308.386,180.32 307.88,179.814 307.88,179.2L307.88,110.86C307.88,110.246 308.386,109.74 309,109.74C309.614,109.74 310.12,110.246 310.12,110.86L310.12,179.2C310.12,179.814 309.614,180.32 309,180.32Z',
          fill: '#005792', fillRule: 'nonzero' })
      );
    }
  }]);

  return RepMeLogo;
}(_react2.default.Component);

exports.default = RepMeLogo;

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(247);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/lib/loader.js!./header.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/lib/loader.js!./header.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, "header.rep-me-logo--first-line {\n  text-transform: uppercase;\n  font-weight: 700;\n  color: #004c87; }\n  header.rep-me-logo--first-line span {\n    text-transform: lowercase;\n    color: red;\n    font-size: 27px;\n    font-style: italic;\n    margin-left: 5px; }\n\nheader.rep-me-logo--second-line {\n  font-size: 15px;\n  font-style: italic;\n  color: #004c87; }\n", ""]);

// exports


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CardExpandable = exports.CardActions = exports.CardText = exports.CardMedia = exports.CardTitle = exports.CardHeader = exports.Card = undefined;

var _Card2 = __webpack_require__(249);

var _Card3 = _interopRequireDefault(_Card2);

var _CardHeader2 = __webpack_require__(252);

var _CardHeader3 = _interopRequireDefault(_CardHeader2);

var _CardTitle2 = __webpack_require__(255);

var _CardTitle3 = _interopRequireDefault(_CardTitle2);

var _CardMedia2 = __webpack_require__(256);

var _CardMedia3 = _interopRequireDefault(_CardMedia2);

var _CardText2 = __webpack_require__(257);

var _CardText3 = _interopRequireDefault(_CardText2);

var _CardActions2 = __webpack_require__(258);

var _CardActions3 = _interopRequireDefault(_CardActions2);

var _CardExpandable2 = __webpack_require__(119);

var _CardExpandable3 = _interopRequireDefault(_CardExpandable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Card = _Card3.default;
exports.CardHeader = _CardHeader3.default;
exports.CardTitle = _CardTitle3.default;
exports.CardMedia = _CardMedia3.default;
exports.CardText = _CardText3.default;
exports.CardActions = _CardActions3.default;
exports.CardExpandable = _CardExpandable3.default;
exports.default = _Card3.default;

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Paper = __webpack_require__(54);

var _Paper2 = _interopRequireDefault(_Paper);

var _CardExpandable = __webpack_require__(119);

var _CardExpandable2 = _interopRequireDefault(_CardExpandable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Card = function (_Component) {
  (0, _inherits3.default)(Card, _Component);

  function Card() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Card);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Card.__proto__ || (0, _getPrototypeOf2.default)(Card)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: null
    }, _this.handleExpanding = function (event) {
      event.preventDefault();
      var newExpandedState = !_this.state.expanded;
      // no automatic state update when the component is controlled
      if (_this.props.expanded === null) {
        _this.setState({ expanded: newExpandedState });
      }
      if (_this.props.onExpandChange) {
        _this.props.onExpandChange(newExpandedState);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Card, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        expanded: this.props.expanded === null ? this.props.initiallyExpanded === true : this.props.expanded
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // update the state when the component is controlled.
      if (nextProps.expanded !== null) this.setState({ expanded: nextProps.expanded });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          containerStyle = _props.containerStyle,
          children = _props.children,
          expandable = _props.expandable,
          expandedProp = _props.expanded,
          initiallyExpanded = _props.initiallyExpanded,
          onExpandChange = _props.onExpandChange,
          other = (0, _objectWithoutProperties3.default)(_props, ['style', 'containerStyle', 'children', 'expandable', 'expanded', 'initiallyExpanded', 'onExpandChange']);


      var lastElement = void 0;
      var expanded = this.state.expanded;
      var newChildren = _react2.default.Children.map(children, function (currentChild) {
        var doClone = false;
        var newChild = undefined;
        var newProps = {};
        var element = currentChild;
        if (!currentChild || !currentChild.props) {
          return null;
        }
        if (expanded === false && currentChild.props.expandable === true) return;
        if (currentChild.props.actAsExpander === true) {
          doClone = true;
          newProps.onClick = _this2.handleExpanding;
          newProps.style = (0, _simpleAssign2.default)({ cursor: 'pointer' }, currentChild.props.style);
        }
        if (currentChild.props.showExpandableButton === true) {
          doClone = true;
          newChild = _react2.default.createElement(_CardExpandable2.default, {
            closeIcon: currentChild.props.closeIcon,
            expanded: expanded,
            onExpanding: _this2.handleExpanding,
            openIcon: currentChild.props.openIcon,
            iconStyle: currentChild.props.iconStyle
          });
        }
        if (doClone) {
          element = _react2.default.cloneElement(currentChild, newProps, currentChild.props.children, newChild);
        }
        lastElement = element;
        return element;
      }, this);

      // If the last element is text or a title we should add
      // 8px padding to the bottom of the card
      var addBottomPadding = lastElement && (lastElement.type.muiName === 'CardText' || lastElement.type.muiName === 'CardTitle');

      var mergedStyles = (0, _simpleAssign2.default)({
        zIndex: 1
      }, style);
      var containerMergedStyles = (0, _simpleAssign2.default)({
        paddingBottom: addBottomPadding ? 8 : 0
      }, containerStyle);

      return _react2.default.createElement(
        _Paper2.default,
        (0, _extends3.default)({}, other, { style: mergedStyles }),
        _react2.default.createElement(
          'div',
          { style: containerMergedStyles },
          newChildren
        )
      );
    }
  }]);
  return Card;
}(_react.Component);

Card.defaultProps = {
  expandable: false,
  expanded: null,
  initiallyExpanded: false
};
Card.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Can be used to render elements inside the Card.
   */
  children: _propTypes2.default.node,
  /**
   * Override the inline-styles of the container element.
   */
  containerStyle: _propTypes2.default.object,
  /**
   * If true, this card component is expandable. Can be set on any child of the `Card` component.
   */
  expandable: _propTypes2.default.bool,
  /**
   * Whether this card is expanded.
   * If `true` or `false` the component is controlled.
   * if `null` the component is uncontrolled.
   */
  expanded: _propTypes2.default.bool,
  /**
   * Whether this card is initially expanded.
   */
  initiallyExpanded: _propTypes2.default.bool,
  /**
   * Callback function fired when the `expandable` state of the card has changed.
   *
   * @param {boolean} newExpandedState Represents the new `expanded` state of the card.
   */
  onExpandChange: _propTypes2.default.func,
  /**
   * If true, this card component will include a button to expand the card. `CardTitle`,
   * `CardHeader` and `CardActions` implement `showExpandableButton`. Any child component
   * of `Card` can implements `showExpandableButton` or forwards the property to a child
   * component supporting it.
   */
  showExpandableButton: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};
exports.default = Card;

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pure = __webpack_require__(55);

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = __webpack_require__(56);

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HardwareKeyboardArrowUp = function HardwareKeyboardArrowUp(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z' })
  );
};
HardwareKeyboardArrowUp = (0, _pure2.default)(HardwareKeyboardArrowUp);
HardwareKeyboardArrowUp.displayName = 'HardwareKeyboardArrowUp';
HardwareKeyboardArrowUp.muiName = 'SvgIcon';

exports.default = HardwareKeyboardArrowUp;

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pure = __webpack_require__(55);

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = __webpack_require__(56);

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HardwareKeyboardArrowDown = function HardwareKeyboardArrowDown(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z' })
  );
};
HardwareKeyboardArrowDown = (0, _pure2.default)(HardwareKeyboardArrowDown);
HardwareKeyboardArrowDown.displayName = 'HardwareKeyboardArrowDown';
HardwareKeyboardArrowDown.muiName = 'SvgIcon';

exports.default = HardwareKeyboardArrowDown;

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Avatar = __webpack_require__(253);

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var card = context.muiTheme.card;


  return {
    root: {
      padding: 16,
      fontWeight: card.fontWeight,
      boxSizing: 'border-box',
      position: 'relative',
      whiteSpace: 'nowrap'
    },
    text: {
      display: 'inline-block',
      verticalAlign: 'top',
      whiteSpace: 'normal',
      paddingRight: '90px'
    },
    avatar: {
      marginRight: 16
    },
    title: {
      color: props.titleColor || card.titleColor,
      display: 'block',
      fontSize: 15
    },
    subtitle: {
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
      fontSize: 14
    }
  };
}

var CardHeader = function (_Component) {
  (0, _inherits3.default)(CardHeader, _Component);

  function CardHeader() {
    (0, _classCallCheck3.default)(this, CardHeader);
    return (0, _possibleConstructorReturn3.default)(this, (CardHeader.__proto__ || (0, _getPrototypeOf2.default)(CardHeader)).apply(this, arguments));
  }

  (0, _createClass3.default)(CardHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          actAsExpander = _props.actAsExpander,
          avatarProp = _props.avatar,
          children = _props.children,
          closeIcon = _props.closeIcon,
          expandable = _props.expandable,
          openIcon = _props.openIcon,
          showExpandableButton = _props.showExpandableButton,
          style = _props.style,
          subtitle = _props.subtitle,
          subtitleColor = _props.subtitleColor,
          subtitleStyle = _props.subtitleStyle,
          textStyle = _props.textStyle,
          title = _props.title,
          titleColor = _props.titleColor,
          titleStyle = _props.titleStyle,
          iconStyle = _props.iconStyle,
          other = (0, _objectWithoutProperties3.default)(_props, ['actAsExpander', 'avatar', 'children', 'closeIcon', 'expandable', 'openIcon', 'showExpandableButton', 'style', 'subtitle', 'subtitleColor', 'subtitleStyle', 'textStyle', 'title', 'titleColor', 'titleStyle', 'iconStyle']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      var avatar = avatarProp;

      if ((0, _react.isValidElement)(avatarProp)) {
        avatar = _react2.default.cloneElement(avatar, {
          style: (0, _simpleAssign2.default)(styles.avatar, avatar.props.style)
        });
      } else if (avatar !== null) {
        avatar = _react2.default.createElement(_Avatar2.default, { src: avatarProp, style: styles.avatar });
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
        avatar,
        _react2.default.createElement(
          'div',
          { style: prepareStyles((0, _simpleAssign2.default)(styles.text, textStyle)) },
          _react2.default.createElement(
            'span',
            { style: prepareStyles((0, _simpleAssign2.default)(styles.title, titleStyle)) },
            title
          ),
          _react2.default.createElement(
            'span',
            { style: prepareStyles((0, _simpleAssign2.default)(styles.subtitle, subtitleStyle)) },
            subtitle
          )
        ),
        children
      );
    }
  }]);
  return CardHeader;
}(_react.Component);

CardHeader.muiName = 'CardHeader';
CardHeader.defaultProps = {
  avatar: null
};
CardHeader.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
CardHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If true, a click on this card component expands the card.
   */
  actAsExpander: _propTypes2.default.bool,
  /**
   * This is the [Avatar](/#/components/avatar) element to be displayed on the Card Header.
   * If `avatar` is an `Avatar` or other element, it will be rendered.
   * If `avatar` is a string, it will be used as the image `src` for an `Avatar`.
   */
  avatar: _propTypes2.default.node,
  /**
   * Can be used to render elements inside the Card Header.
   */
  children: _propTypes2.default.node,
  /**
   * Can be used to pass a closeIcon if you don't like the default expandable close Icon.
   */
  closeIcon: _propTypes2.default.node,
  /**
   * If true, this card component is expandable.
   */
  expandable: _propTypes2.default.bool,
  /**
   * Override the iconStyle of the Icon Button.
   */
  iconStyle: _propTypes2.default.object,
  /**
   * Can be used to pass a openIcon if you don't like the default expandable open Icon.
   */
  openIcon: _propTypes2.default.node,
  /**
   * If true, this card component will include a button to expand the card.
   */
  showExpandableButton: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * Can be used to render a subtitle in Card Header.
   */
  subtitle: _propTypes2.default.node,
  /**
   * Override the subtitle color.
   */
  subtitleColor: _propTypes2.default.string,
  /**
   * Override the inline-styles of the subtitle.
   */
  subtitleStyle: _propTypes2.default.object,
  /**
   * Override the inline-styles of the text.
   */
  textStyle: _propTypes2.default.object,
  /**
   * Can be used to render a title in Card Header.
   */
  title: _propTypes2.default.node,
  /**
   * Override the title color.
   */
  titleColor: _propTypes2.default.string,
  /**
   * Override the inline-styles of the title.
   */
  titleStyle: _propTypes2.default.object
} : {};
exports.default = CardHeader;

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Avatar = __webpack_require__(254);

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Avatar2.default;

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var backgroundColor = props.backgroundColor,
      color = props.color,
      size = props.size;
  var avatar = context.muiTheme.avatar;


  var styles = {
    root: {
      color: color || avatar.color,
      backgroundColor: backgroundColor || avatar.backgroundColor,
      userSelect: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size / 2,
      borderRadius: '50%',
      height: size,
      width: size
    },
    icon: {
      color: color || avatar.color,
      width: size * 0.6,
      height: size * 0.6,
      fontSize: size * 0.6,
      margin: size * 0.2
    }
  };

  return styles;
}

var Avatar = function (_Component) {
  (0, _inherits3.default)(Avatar, _Component);

  function Avatar() {
    (0, _classCallCheck3.default)(this, Avatar);
    return (0, _possibleConstructorReturn3.default)(this, (Avatar.__proto__ || (0, _getPrototypeOf2.default)(Avatar)).apply(this, arguments));
  }

  (0, _createClass3.default)(Avatar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          backgroundColor = _props.backgroundColor,
          icon = _props.icon,
          src = _props.src,
          style = _props.style,
          className = _props.className,
          other = (0, _objectWithoutProperties3.default)(_props, ['backgroundColor', 'icon', 'src', 'style', 'className']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      if (src) {
        return _react2.default.createElement('img', (0, _extends3.default)({
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
        }, other, {
          src: src,
          className: className
        }));
      } else {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({}, other, {
            style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)),
            className: className
          }),
          icon && _react2.default.cloneElement(icon, {
            color: styles.icon.color,
            style: (0, _simpleAssign2.default)(styles.icon, icon.props.style)
          }),
          this.props.children
        );
      }
    }
  }]);
  return Avatar;
}(_react.Component);

Avatar.muiName = 'Avatar';
Avatar.defaultProps = {
  size: 40
};
Avatar.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
Avatar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The backgroundColor of the avatar. Does not apply to image avatars.
   */
  backgroundColor: _propTypes2.default.string,
  /**
   * Can be used, for instance, to render a letter inside the avatar.
   */
  children: _propTypes2.default.node,
  /**
   * The css class name of the root `div` or `img` element.
   */
  className: _propTypes2.default.string,
  /**
   * The icon or letter's color.
   */
  color: _propTypes2.default.string,
  /**
   * This is the SvgIcon or FontIcon to be used inside the avatar.
   */
  icon: _propTypes2.default.element,
  /**
   * This is the size of the avatar in pixels.
   */
  size: _propTypes2.default.number,
  /**
   * If passed in, this component will render an img element. Otherwise, a div will be rendered.
   */
  src: _propTypes2.default.string,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};
exports.default = Avatar;

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var card = context.muiTheme.card;


  return {
    root: {
      padding: 16,
      position: 'relative'
    },
    title: {
      fontSize: 24,
      color: props.titleColor || card.titleColor,
      display: 'block',
      lineHeight: '36px'
    },
    subtitle: {
      fontSize: 14,
      color: props.subtitleColor || card.subtitleColor,
      display: 'block'
    }
  };
}

var CardTitle = function (_Component) {
  (0, _inherits3.default)(CardTitle, _Component);

  function CardTitle() {
    (0, _classCallCheck3.default)(this, CardTitle);
    return (0, _possibleConstructorReturn3.default)(this, (CardTitle.__proto__ || (0, _getPrototypeOf2.default)(CardTitle)).apply(this, arguments));
  }

  (0, _createClass3.default)(CardTitle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          actAsExpander = _props.actAsExpander,
          children = _props.children,
          closeIcon = _props.closeIcon,
          expandable = _props.expandable,
          showExpandableButton = _props.showExpandableButton,
          style = _props.style,
          subtitle = _props.subtitle,
          subtitleColor = _props.subtitleColor,
          subtitleStyle = _props.subtitleStyle,
          title = _props.title,
          titleColor = _props.titleColor,
          titleStyle = _props.titleStyle,
          other = (0, _objectWithoutProperties3.default)(_props, ['actAsExpander', 'children', 'closeIcon', 'expandable', 'showExpandableButton', 'style', 'subtitle', 'subtitleColor', 'subtitleStyle', 'title', 'titleColor', 'titleStyle']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);
      var rootStyle = (0, _simpleAssign2.default)({}, styles.root, style);
      var extendedTitleStyle = (0, _simpleAssign2.default)({}, styles.title, titleStyle);
      var extendedSubtitleStyle = (0, _simpleAssign2.default)({}, styles.subtitle, subtitleStyle);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, { style: prepareStyles(rootStyle) }),
        _react2.default.createElement(
          'span',
          { style: prepareStyles(extendedTitleStyle) },
          title
        ),
        _react2.default.createElement(
          'span',
          { style: prepareStyles(extendedSubtitleStyle) },
          subtitle
        ),
        children
      );
    }
  }]);
  return CardTitle;
}(_react.Component);

CardTitle.muiName = 'CardTitle';
CardTitle.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
CardTitle.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If true, a click on this card component expands the card.
   */
  actAsExpander: _propTypes2.default.bool,
  /**
   * Can be used to render elements inside the Card Title.
   */
  children: _propTypes2.default.node,
  /**
   * Can be used to pass a closeIcon if you don't like the default expandable close Icon.
   */
  closeIcon: _propTypes2.default.node,
  /**
   * If true, this card component is expandable.
   */
  expandable: _propTypes2.default.bool,
  /**
   * If true, this card component will include a button to expand the card.
   */
  showExpandableButton: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * Can be used to render a subtitle in the Card Title.
   */
  subtitle: _propTypes2.default.node,
  /**
   * Override the subtitle color.
   */
  subtitleColor: _propTypes2.default.string,
  /**
   * Override the inline-styles of the subtitle.
   */
  subtitleStyle: _propTypes2.default.object,
  /**
   * Can be used to render a title in the Card Title.
   */
  title: _propTypes2.default.node,
  /**
   * Override the title color.
   */
  titleColor: _propTypes2.default.string,
  /**
   * Override the inline-styles of the title.
   */
  titleStyle: _propTypes2.default.object
} : {};
exports.default = CardTitle;

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var cardMedia = context.muiTheme.cardMedia;


  return {
    root: {
      position: 'relative'
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    },
    overlay: {
      height: '100%',
      position: 'relative'
    },
    overlayContent: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      paddingTop: 8,
      background: cardMedia.overlayContentBackground
    },
    media: {},
    mediaChild: {
      verticalAlign: 'top',
      maxWidth: '100%',
      minWidth: '100%',
      width: '100%'
    }
  };
}

var CardMedia = function (_Component) {
  (0, _inherits3.default)(CardMedia, _Component);

  function CardMedia() {
    (0, _classCallCheck3.default)(this, CardMedia);
    return (0, _possibleConstructorReturn3.default)(this, (CardMedia.__proto__ || (0, _getPrototypeOf2.default)(CardMedia)).apply(this, arguments));
  }

  (0, _createClass3.default)(CardMedia, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          actAsExpander = _props.actAsExpander,
          children = _props.children,
          expandable = _props.expandable,
          mediaStyle = _props.mediaStyle,
          overlay = _props.overlay,
          overlayContainerStyle = _props.overlayContainerStyle,
          overlayContentStyle = _props.overlayContentStyle,
          overlayStyle = _props.overlayStyle,
          style = _props.style,
          other = (0, _objectWithoutProperties3.default)(_props, ['actAsExpander', 'children', 'expandable', 'mediaStyle', 'overlay', 'overlayContainerStyle', 'overlayContentStyle', 'overlayStyle', 'style']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);
      var rootStyle = (0, _simpleAssign2.default)(styles.root, style);
      var extendedMediaStyle = (0, _simpleAssign2.default)(styles.media, mediaStyle);
      var extendedOverlayContainerStyle = (0, _simpleAssign2.default)(styles.overlayContainer, overlayContainerStyle);
      var extendedOverlayContentStyle = (0, _simpleAssign2.default)(styles.overlayContent, overlayContentStyle);
      var extendedOverlayStyle = (0, _simpleAssign2.default)(styles.overlay, overlayStyle);
      var titleColor = this.context.muiTheme.cardMedia.titleColor;
      var subtitleColor = this.context.muiTheme.cardMedia.subtitleColor;
      var color = this.context.muiTheme.cardMedia.color;

      var styledChildren = _react2.default.Children.map(children, function (child) {
        if (!child) {
          return child;
        }

        return _react2.default.cloneElement(child, {
          style: prepareStyles((0, _simpleAssign2.default)({}, styles.mediaChild, child.props.style))
        });
      });

      var overlayChildren = _react2.default.Children.map(overlay, function (child) {
        var childMuiName = child && child.type ? child.type.muiName : null;

        if (childMuiName === 'CardHeader' || childMuiName === 'CardTitle') {
          return _react2.default.cloneElement(child, {
            titleColor: titleColor,
            subtitleColor: subtitleColor
          });
        } else if (childMuiName === 'CardText') {
          return _react2.default.cloneElement(child, {
            color: color
          });
        } else {
          return child;
        }
      });

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, { style: prepareStyles(rootStyle) }),
        _react2.default.createElement(
          'div',
          { style: prepareStyles(extendedMediaStyle) },
          styledChildren
        ),
        overlay ? _react2.default.createElement(
          'div',
          { style: prepareStyles(extendedOverlayContainerStyle) },
          _react2.default.createElement(
            'div',
            { style: prepareStyles(extendedOverlayStyle) },
            _react2.default.createElement(
              'div',
              { style: prepareStyles(extendedOverlayContentStyle) },
              overlayChildren
            )
          )
        ) : ''
      );
    }
  }]);
  return CardMedia;
}(_react.Component);

CardMedia.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
CardMedia.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If true, a click on this card component expands the card.
   */
  actAsExpander: _propTypes2.default.bool,
  /**
   * Can be used to render elements inside the Card Media.
   */
  children: _propTypes2.default.node,
  /**
   * If true, this card component is expandable.
   */
  expandable: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the Card Media.
   */
  mediaStyle: _propTypes2.default.object,
  /**
   * Can be used to render overlay element in Card Media.
   */
  overlay: _propTypes2.default.node,
  /**
   * Override the inline-styles of the overlay container.
   */
  overlayContainerStyle: _propTypes2.default.object,
  /**
   * Override the inline-styles of the overlay content.
   */
  overlayContentStyle: _propTypes2.default.object,
  /**
   * Override the inline-styles of the overlay element.
   */
  overlayStyle: _propTypes2.default.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};
exports.default = CardMedia;

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var cardText = context.muiTheme.cardText;


  return {
    root: {
      padding: 16,
      fontSize: 14,
      color: props.color || cardText.textColor
    }
  };
}

var CardText = function (_Component) {
  (0, _inherits3.default)(CardText, _Component);

  function CardText() {
    (0, _classCallCheck3.default)(this, CardText);
    return (0, _possibleConstructorReturn3.default)(this, (CardText.__proto__ || (0, _getPrototypeOf2.default)(CardText)).apply(this, arguments));
  }

  (0, _createClass3.default)(CardText, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          actAsExpander = _props.actAsExpander,
          children = _props.children,
          color = _props.color,
          expandable = _props.expandable,
          style = _props.style,
          other = (0, _objectWithoutProperties3.default)(_props, ['actAsExpander', 'children', 'color', 'expandable', 'style']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);
      var rootStyle = (0, _simpleAssign2.default)(styles.root, style);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, { style: prepareStyles(rootStyle) }),
        children
      );
    }
  }]);
  return CardText;
}(_react.Component);

CardText.muiName = 'CardText';
CardText.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
CardText.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If true, a click on this card component expands the card.
   */
  actAsExpander: _propTypes2.default.bool,
  /**
   * Can be used to render elements inside the Card Text.
   */
  children: _propTypes2.default.node,
  /**
   * Override the CardText color.
   */
  color: _propTypes2.default.string,
  /**
   * If true, this card component is expandable.
   */
  expandable: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};
exports.default = CardText;

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles() {
  return {
    root: {
      padding: 8,
      position: 'relative'
    },
    action: {
      marginRight: 8
    }
  };
}

var CardActions = function (_Component) {
  (0, _inherits3.default)(CardActions, _Component);

  function CardActions() {
    (0, _classCallCheck3.default)(this, CardActions);
    return (0, _possibleConstructorReturn3.default)(this, (CardActions.__proto__ || (0, _getPrototypeOf2.default)(CardActions)).apply(this, arguments));
  }

  (0, _createClass3.default)(CardActions, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          actAsExpander = _props.actAsExpander,
          children = _props.children,
          expandable = _props.expandable,
          showExpandableButton = _props.showExpandableButton,
          style = _props.style,
          other = (0, _objectWithoutProperties3.default)(_props, ['actAsExpander', 'children', 'expandable', 'showExpandableButton', 'style']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      var styledChildren = _react2.default.Children.map(children, function (child) {
        if (_react2.default.isValidElement(child)) {
          return _react2.default.cloneElement(child, {
            style: (0, _simpleAssign2.default)({}, styles.action, child.props.style)
          });
        }
      });

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
        styledChildren
      );
    }
  }]);
  return CardActions;
}(_react.Component);

CardActions.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
CardActions.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If true, a click on this card component expands the card.
   */
  actAsExpander: _propTypes2.default.bool,
  /**
   * Can be used to render elements inside the Card Action.
   */
  children: _propTypes2.default.node,
  /**
   * If true, this card component is expandable.
   */
  expandable: _propTypes2.default.bool,
  /**
   * If true, this card component will include a button to expand the card.
   */
  showExpandableButton: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};
exports.default = CardActions;

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _customSlider = __webpack_require__(260);

var _customSlider2 = _interopRequireDefault(_customSlider);

var _horizontalSlider = __webpack_require__(267);

var _horizontalSlider2 = _interopRequireDefault(_horizontalSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Horizontal = function (_React$Component) {
  _inherits(Horizontal, _React$Component);

  function Horizontal(props, context) {
    _classCallCheck(this, Horizontal);

    var _this = _possibleConstructorReturn(this, (Horizontal.__proto__ || Object.getPrototypeOf(Horizontal)).call(this, props, context));

    _this.handleChangeStart = function () {
      // console.log('Change event started')
    };

    _this.handleChange = function (value) {
      _this.setState({
        value: value,
        changed: true
      });
      _this.props.callback(value, true);
    };

    _this.handleChangeComplete = function () {
      // console.log('Change event completed')
    };

    _this.state = {
      value: _this.props.defaultValue,
      changed: false,
      isValid: false,
      validationCount: 0
    };
    return _this;
  }

  _createClass(Horizontal, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          step = _state.step;

      return _react2.default.createElement(
        'div',
        { className: 'slider' },
        _react2.default.createElement(_customSlider2.default, {
          min: this.props.min || 0,
          max: this.props.max || 100,
          value: this.state.value || 0,
          onChangeStart: this.handleChangeStart,
          onChange: this.handleChange,
          onChangeComplete: this.handleChangeComplete,
          firstTimeUse: this.props.firstTimeUse,
          secondAttempt: this.props.secondAttempt,
          changed: this.state.changed,
          labels: this.props.labels
        })
      );
    }
  }]);

  return Horizontal;
}(_react2.default.Component);

exports.default = Horizontal;

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(17);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resizeObserverPolyfill = __webpack_require__(26);

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _customSliderUtils = __webpack_require__(261);

var _SliderIconComponent = __webpack_require__(262);

var _SliderIconComponent2 = _interopRequireDefault(_SliderIconComponent);

var _ChartLabelComponent = __webpack_require__(120);

var _ChartLabelComponent2 = _interopRequireDefault(_ChartLabelComponent);

var _customslider = __webpack_require__(265);

var _customslider2 = _interopRequireDefault(_customslider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Predefined constants
 * @type {Object}
*/

var constants = {
  axis: {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      reverse: 'right',
      coordinate: 'x'
    },
    vertical: {
      dimension: 'height',
      direction: 'top',
      reverse: 'bottom',
      coordinate: 'y'
    }
  }
};

var CustomSlider = function (_React$Component) {
  _inherits(CustomSlider, _React$Component);

  function CustomSlider(props) {
    _classCallCheck(this, CustomSlider);

    var _this = _possibleConstructorReturn(this, (CustomSlider.__proto__ || Object.getPrototypeOf(CustomSlider)).call(this, props));

    _this.formatHandle = function (value) {
      var format = _this.props.format;

      return format ? format(value) : value;
    };

    _this.getHandleUpdate = function () {
      if (!_this.slider) {
        // for shallow rendering
        return;
      }
      var axis = _this.props.axis;

      var dimension = (0, _customSliderUtils.capitalize)(constants.axis[axis].dimension);
      var sliderPos = _this.slider['offset' + dimension];
      var handlePos = _this.handle['offset' + dimension];
      // let updatedStep = this.getStepUpdates(sliderPos);
      _this.setState({
        limit: sliderPos - handlePos,
        grab: handlePos / 2,
        sliderSize: sliderPos
        // step: updatedStep
      });
    };

    _this.handleOnStart = function (event) {
      var onChangeStart = _this.props.onChangeStart;

      document.addEventListener('mousemove', _this.handleOnDrag);
      document.addEventListener('mouseup', _this.handleOnComplete);
      _this.setState({
        active: true
      }, function () {
        onChangeStart && onChangeStart(event);
      });
    };

    _this.handleOnDrag = function (event) {
      event.stopPropagation();
      var onChange = _this.props.onChange;
      var _event$target = event.target,
          className = _event$target.className,
          classList = _event$target.classList,
          dataset = _event$target.dataset;

      if (!onChange || className === 'customslider__labels') return;

      var value = _this.getPosition(event);
      if (classList && classList.contains('customslider__label-item') && dataset.value) {
        value = parseFloat(dataset.value);
      }

      onChange && onChange(value, event);
    };

    _this.handleOnComplete = function (event) {
      var onChangeComplete = _this.props.onChangeComplete;

      _this.setState({
        active: false
      }, function () {
        onChangeComplete && onChangeComplete(event);
      });
      document.removeEventListener('mousemove', _this.handleOnDrag);
      document.removeEventListener('mouseup', _this.handleOnComplete);
    };

    _this.handleKeyPress = function (event) {
      event.preventDefault();
      var keyCode = event.keyCode;
      var _this$props = _this.props,
          value = _this$props.value,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step,
          onChange = _this$props.onChange;

      var sliderValue = void 0;

      switch (keyCode) {
        case 38:
        case 39:
          sliderValue = value + step > max ? max : value + step;
          onChange && onChange(sliderValue, event);
          break;
        case 37:
        case 40:
          sliderValue = value - step < min ? min : value - step;
          onChange && onChange(sliderValue, event);
          break;
      }
    };

    _this.getHandleCoordsFromValue = function (value) {
      var limit = _this.state.limit;
      var _this$props2 = _this.props,
          min = _this$props2.min,
          max = _this$props2.max;

      var differenceMaxMin = max - min;
      var differenceValMin = value - min;
      var factor = differenceValMin / differenceMaxMin;
      var position = Math.round(factor * limit);

      return position;
    };

    _this.getValueFromHandleCoords = function (coords) {
      var limit = _this.state.limit;
      var _this$props3 = _this.props,
          axis = _this$props3.axis,
          min = _this$props3.min,
          max = _this$props3.max,
          step = _this$props3.step;

      var factor = (0, _customSliderUtils.clamp)(coords, 0, limit) / (limit || 1);
      var position = Math.round(factor * limit);
      var baseValue = step * Math.round(factor * (max - min) / step);
      var value = axis === "horizontal" ? baseValue + min : max - baseValue;

      return (0, _customSliderUtils.clamp)(value, min, max);
    };

    _this.getPosition = function (event) {
      var grab = _this.state.grab;
      var _this$props4 = _this.props,
          axis = _this$props4.axis,
          reverse = _this$props4.reverse;


      var node = _this.slider;
      var constantsAxis = constants.axis[axis];
      var coordinateStyle = constantsAxis.coordinate;
      var directionStyle = reverse ? constantsAxis.reverse : constantsAxis.direction;
      var clientCoordinateStyle = 'client' + (0, _customSliderUtils.capitalize)(coordinateStyle);
      var coordinate = !event.touches ? event[clientCoordinateStyle] : event.touches[0][clientCoordinateStyle];
      var direction = node.getBoundingClientRect()[directionStyle];
      var position = reverse ? direction - coordinate - grab : coordinate - direction - grab;
      var value = _this.getValueFromHandleCoords(position);
      return value;
    };

    _this.getHandleCoords = function (coords) {
      var _this$state = _this.state,
          limit = _this$state.limit,
          grab = _this$state.grab;
      var axis = _this.props.axis;

      var value = _this.getValueFromHandleCoords(coords);
      var position = _this.getHandleCoordsFromValue(value);
      var handleCoords = axis === "horizontal" ? position + grab : position;
      var fillPosition = axis === "horizontal" ? handleCoords : limit - handleCoords;

      return {
        fill: fillPosition,
        handle: handleCoords,
        label: handleCoords
      };
    };

    _this.renderHandleLabels = function (labels) {
      _react2.default.createElement(
        'ul',
        {
          ref: function ref(labelData) {
            _this.labels = labelData;
          },
          className: (0, _classnames2.default)('customslider__labels')
        },
        labels
      );
    };

    _this.positionLabels = function () {
      var _this$props5 = _this.props,
          min = _this$props5.min,
          max = _this$props5.max,
          step = _this$props5.step;
      var _this$state2 = _this.state,
          limit = _this$state2.limit,
          sliderSize = _this$state2.sliderSize,
          grab = _this$state2.grab;

      var steps = (max - min) / step;
      var updateLabels = [];
      if (updateLabels.length < 1 && steps > 1) {
        for (var index = 0; index < steps + 1; index++) {
          _this.props.labels[index].styles = {
            left: _this.getHandleCoords(_this.getHandleCoordsFromValue(index * step)).handle - grab + 'px'
          };
          updateLabels.push(_this.props.labels[index]);
        }
      } else {
        updateLabels = null;
      }
      return updateLabels;
    };

    _this.getMarkerPositions = function () {
      var _this$props6 = _this.props,
          min = _this$props6.min,
          max = _this$props6.max,
          step = _this$props6.step;
      var _this$state3 = _this.state,
          limit = _this$state3.limit,
          sliderSize = _this$state3.sliderSize;

      var steps = (max - min) / step;
      var stepIcons = [];
      var inBetweenClassScale = -1;

      var inBetweensCreateClasses = function inBetweensCreateClasses(index) {
        var createdClasses = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { className: 'minor-step step-hide-tablet step-icon-stop-' + (index * 2 + inBetweenClassScale) }),
          _react2.default.createElement('div', { className: 'minor-step step-hide-mobile step-icon-stop-' + (index * 2 + inBetweenClassScale + 1) }),
          _react2.default.createElement('div', { className: 'minor-step step-hide-mobile step-icon-stop-' + (index * 2 + inBetweenClassScale + 2) }),
          _react2.default.createElement('div', { className: 'minor-step step-hide-tablet step-icon-stop-' + (index * 2 + inBetweenClassScale + 3) })
        );
        inBetweenClassScale = inBetweenClassScale + 1;
        return createdClasses;
      };

      var sliderSpacer = function sliderSpacer(index) {
        if (index % 2 < 1) {
          return _react2.default.createElement(
            'div',
            { key: index, className: 'slider__marker' },
            _react2.default.createElement(
              'div',
              {
                key: index,
                className: 'step-icon-wrapper' },
              _react2.default.createElement('div', { className: 'step-icon step-icon-stop-' + index / 2 * 5 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'slider__marker--label-wrapper' },
              _react2.default.createElement(
                'div',
                { className: 'slider__marker--label-content' },
                _this.props.labels[Math.floor(index / 2)]
              )
            )
          );
        } else {
          return _react2.default.createElement(
            'div',
            { key: index, className: 'slider__marker slider__in-between' },
            inBetweensCreateClasses(index)
          );
        }
      };

      //create markers
      if (stepIcons.length < 1 && steps > 1) {
        for (var index = 0; index < 9; index++) {
          stepIcons.push(sliderSpacer(index));
        }
      } else {
        stepIcons = null;
      }

      return stepIcons;
    };

    _this.state = {
      active: false,
      limit: 0,
      grab: 0,
      firstUser: false,
      sliderSize: null
    };
    return _this;
  }

  _createClass(CustomSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getHandleUpdate();
      var resizeObserver = new _resizeObserverPolyfill2.default(this.getHandleUpdate);
      resizeObserver.observe(this.slider);
    }

    /**
     * Format label/tooltip value
     * @param  {Number} - value
     * @return {Formatted Number}
     */


    /**
     * Update steps for slider state on change
     * @return {void}
     */

    /**
    * Update slider state on change
    * @return {void}
    */


    /**
     * Attach event listeners to mousemove/mouseup events
     * @return {void}
     */


    /**
     * Handle drag/mousemove event
     * @param  {Object} event - Event object
     * @return {void}
     */


    /**
     * Detach event listeners to mousemove/mouseup events
     * @return {void}
     */


    /**
     * Support for key events on the slider handle
     * @param  {Object} event - Event object
     * @return {void}
     */


    /**
     * Calculate position of slider based on its value
     * @param  {number} value - Current value of slider
     * @return {position} pos - Calculated position of slider based on value
     */


    /**
     * Translate position of slider to slider value
     * @param  {number} coords - Current position/coordinates of slider
     * @return {number} value - Slider value
     */

    /**
     * Calculate position of slider based on value
     * @param  {Object} event - Event object
     * @return {number} value - Slider value
     */

    /**
     * Grab coordinates of slider
     * @param  {Object} coords - Position object
     * @return {Object} - Slider fill/handle coordinates
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          axis = _props.axis,
          className = _props.className,
          labels = _props.labels,
          handleLabel = _props.handleLabel,
          min = _props.min,
          max = _props.max,
          reverse = _props.reverse,
          tooltip = _props.tooltip,
          step = _props.step,
          value = _props.value;
      var _state = this.state,
          active = _state.active,
          grab = _state.grab;

      var getAxisProps = constants.axis[axis];
      var dimension = getAxisProps.dimension;
      var direction = reverse ? getAxisProps.reverse : getAxisProps.direction;
      var position = this.getHandleCoordsFromValue(value);
      var coords = this.getHandleCoords(position);
      var fillStyle = _defineProperty({}, dimension, coords.fill + 'px');
      var handleStyle = _defineProperty({}, direction, coords.handle + 'px');
      var showTooltip = tooltip;
      var labelItems = [];
      var labelKeys = Object.keys(labels);

      if (labelKeys.length > 0) {

        labelKeys = labelKeys.sort(function (oldValue, newValue) {
          return reverse ? oldValue - newValue : newValue - oldValue;
        });

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = labelKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var labelPosition = this.getHandleCoordsFromValue(key);
            var labelCoords = this.getHandleCoords(labelPosition);
            var labelStyle = _defineProperty({}, direction, labelCoords.label + 'px');

            labelItems.push(_react2.default.createElement(
              'li',
              {
                key: key,
                className: (0, _classnames2.default)('customslider__label-item'),
                'data-value': key,
                onMouseDown: this.handleOnDrag,
                onTouchStart: this.handleOnStart,
                onTouchEnd: this.handleOnComplete,
                style: labelStyle
              },
              this.props.labels[key]
            ));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      var GetTooltip = function GetTooltip(state) {
        var stateCheck = state.firstTime && !state.secondTime;
        if (!state.changed) {
          if (stateCheck) {
            return _react2.default.createElement(
              'div',
              { className: 'label' },
              _react2.default.createElement(
                'span',
                null,
                'Touch or Click the thumbprint & drag it to cast your vote'
              ),
              _react2.default.createElement(
                'div',
                { className: 'slider-hint' },
                _react2.default.createElement('i', { className: 'ion-arrow-left-b' }),
                _react2.default.createElement(
                  'span',
                  null,
                  'Slide to cast'
                ),
                _react2.default.createElement('i', { className: 'ion-arrow-right-b' })
              )
            );
          } else {
            return _react2.default.createElement(
              'div',
              { className: 'label' },
              _react2.default.createElement(
                'span',
                null,
                'Are you sure this is your vote?'
              ),
              _react2.default.createElement(
                'div',
                { className: 'slider-hint' },
                _react2.default.createElement('i', { className: 'ion-arrow-left-b' }),
                _react2.default.createElement(
                  'span',
                  null,
                  'Slide to cast'
                ),
                _react2.default.createElement('i', { className: 'ion-arrow-right-b' })
              )
            );
          }
          return _react2.default.createElement('div', null);
        } else {
          return null;
        }
        return _react2.default.createElement('div', null);
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          {
            ref: function ref(data) {
              _this2.slider = data;
            },
            className: (0, _classnames2.default)('customslider', 'customslider-' + axis, { 'customslider-reverse': reverse }, className),
            onMouseDown: this.handleOnDrag,
            onMouseUp: this.handleOnComplete,
            onTouchStart: this.handleOnStart,
            onTouchEnd: this.handleOnComplete,
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-valuenow': value,
            'aria-orientation': axis
          },
          _react2.default.createElement(
            'div',
            { className: 'step-container' },
            this.getMarkerPositions().map(function (icon, index) {
              return icon;
            })
          ),
          _react2.default.createElement(
            'div',
            {
              ref: function ref(handleData) {
                _this2.handle = handleData;
              },
              className: 'customslider__handle',
              onMouseDown: this.handleOnStart,
              onTouchMove: this.handleOnDrag,
              onTouchEnd: this.handleOnComplete,
              onKeyDown: this.handleKeyPress,
              style: handleStyle,
              tabIndex: 0
            },
            _react2.default.createElement(
              'div',
              { className: 'thumb-button' },
              _react2.default.createElement(_SliderIconComponent2.default, {
                error: !this.props.changed && !this.props.firstTimeUse && this.props.secondAttempt
              })
            ),
            showTooltip ? _react2.default.createElement(
              'div',
              {
                ref: function ref(toolTipData) {
                  _this2.tooltip = toolTipData;
                },
                className: 'customslider__handle-tooltip \n                      ' + (this.props.firstTimeUse && !this.props.changed ? 'first-time-use' : '') + '\n                      ' + (this.props.secondAttempt && !this.props.changed ? 'second-attempt' : '')
              },
              _react2.default.createElement(GetTooltip, {
                firstTime: this.props.firstTimeUse,
                secondTime: this.props.secondAttempt,
                changed: this.props.changed
              })
            ) : null,
            _react2.default.createElement(
              'div',
              { className: 'customslider__handle-label' },
              handleLabel
            )
          ),
          labels ? this.renderHandleLabels(labelItems) : null
        )
      );
    }
  }]);

  return CustomSlider;
}(_react2.default.Component);

CustomSlider.propTypes = {
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  step: _propTypes2.default.number,
  value: _propTypes2.default.number,
  axis: _propTypes2.default.string,
  tooltip: _propTypes2.default.bool,
  reverse: _propTypes2.default.bool,
  labels: _propTypes2.default.array,
  handleLabel: _propTypes2.default.string,
  format: _propTypes2.default.func,
  onChangeStart: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onChangeComplete: _propTypes2.default.func,
  firstUser: _propTypes2.default.bool

};
CustomSlider.defaultProps = {
  min: 0,
  max: 100,
  step: 5,
  value: 0,
  axis: 'horizontal',
  tooltip: true,
  reverse: false,
  labels: {},
  handleLabel: '',
  firstUser: false
};
exports.default = CustomSlider;

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
exports.clamp = clamp;
/**
 * Capitalize first letter of string
 * @private
 * @param  {string} - String
 * @return {string} - String with first letter capitalized
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

/**
 * Clamp position between a range
 * @param  {number} - Value to be clamped
 * @param  {number} - Minimum value in range
 * @param  {number} - Maximum value in range
 * @return {number} - Clamped value
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SliderIconComponent = function (_React$Component) {
  _inherits(SliderIconComponent, _React$Component);

  function SliderIconComponent(props) {
    _classCallCheck(this, SliderIconComponent);

    return _possibleConstructorReturn(this, (SliderIconComponent.__proto__ || Object.getPrototypeOf(SliderIconComponent)).call(this, props));
  }

  _createClass(SliderIconComponent, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'svg',
        { viewBox: '0 0 236 110', xmlns: 'http://www.w3.org/2000/svg', fillRule: 'evenodd',
          clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1.414' },
        _react2.default.createElement(
          'g',
          { id: 'Artboard1', transform: 'translate(-.097 -.018)' },
          _react2.default.createElement('rect', { x: '.097', y: '.018', width: '235.014', height: '109.758', fill: 'none' }),
          _react2.default.createElement(
            'clippath',
            { id: '_clip1' },
            _react2.default.createElement('rect', { x: '.097', y: '.018', width: '235.014', height: '109.758' })
          ),
          _react2.default.createElement(
            'g',
            { clipPath: 'url(#_clip1)' },
            _react2.default.createElement(
              'g',
              { transform: 'matrix(.78972 0 0 .7928 -17.05 -12.217)' },
              _react2.default.createElement('path', { d: 'M74.32,15.298L273.572,15.589L320.549,85.836L273.426,154.048L74.029,153.32L21.961,84.964L74.32,15.298Z',
                fill: this.props.error ? '#FF0000' : '#015692' }),
              _react2.default.createElement('path', { d: 'M278.662,76.383L278.662,94.563L287.534,85.109L278.662,76.383Z',
                fill: '#4e89b3' }),
              _react2.default.createElement('path', { d: 'M278.662,76.383L278.662,94.563L287.534,85.109L278.662,76.383Z',
                fill: '#4e89b3', transform: 'matrix(-1 0 0 1 340.765 0)' }),
              _react2.default.createElement(
                'g',
                { id: 'noun_39403_cc', fillRule: 'nonzero', stroke: '#fff' },
                _react2.default.createElement('path', { d: 'M71.548,42.286C71.431,42.286 71.314,42.274 71.195,42.248C70.314,42.054 69.757,41.183 69.95,40.301C70.641,37.154 71.784,29.046 67.464,21.751C64.595,16.907 59.891,13.481 54.219,12.105C40.398,8.752 29.854,18.538 26.952,29.456L26.734,30.408C26.532,31.288 25.652,31.836 24.775,31.635C23.895,31.432 23.346,30.555 23.549,29.676L23.78,28.671C27.096,16.202 39.155,5.08 54.99,8.929C61.525,10.515 66.954,14.476 70.276,20.085C75.19,28.382 73.918,37.478 73.142,41.003C72.975,41.766 72.299,42.286 71.548,42.286Z',
                  fill: '#fff', transform: 'translate(110.416 29.363) scale(1.30552)' }),
                _react2.default.createElement('path', { d: 'M44.488,89.716C43.985,89.716 43.489,89.485 43.168,89.048C42.635,88.32 42.793,87.298 43.52,86.764C46.749,84.397 49.688,81.645 52.257,78.584C52.601,78.173 53.127,77.956 53.659,78.007C54.193,78.056 54.668,78.364 54.932,78.831C55.865,80.488 56.929,82.026 58.093,83.403C58.676,84.092 58.589,85.123 57.9,85.705C57.212,86.287 56.181,86.201 55.597,85.512C54.772,84.536 53.993,83.49 53.27,82.384C50.905,84.97 48.283,87.323 45.453,89.399C45.161,89.613 44.823,89.716 44.488,89.716Z',
                  fill: '#fff', transform: 'translate(110.416 29.363) scale(1.30552)' }),
                _react2.default.createElement('path', { d: 'M32.996,87.562C32.398,87.562 31.822,87.233 31.535,86.663C31.129,85.857 31.452,84.875 32.259,84.469C44.947,78.076 50.522,68.708 54.655,59.536C54.971,58.836 55.729,58.455 56.482,58.61C57.232,58.769 57.772,59.429 57.778,60.197C57.779,60.31 57.942,71.588 64.476,78.795C65.082,79.464 65.032,80.497 64.363,81.104C63.694,81.711 62.66,81.658 62.055,80.991C57.816,76.316 55.958,70.336 55.145,65.991C51.006,73.78 44.892,81.763 33.728,87.388C33.493,87.506 33.242,87.562 32.996,87.562Z',
                  fill: '#fff', transform: 'translate(110.416 29.363) scale(1.30552)' }),
                _react2.default.createElement('path', { d: 'M78.36,57.522C77.532,57.522 76.823,56.896 76.736,56.055C76.32,52.008 76.62,46.976 77.558,42.25L77.592,42.082C78.499,37.98 79.971,27.474 74.213,17.753C70.257,11.073 63.814,6.361 56.068,4.483C37.4,-0.058 23.232,12.922 19.374,27.441L19.039,28.895C18.236,32.994 16.603,36.841 14.2,40.278C13.684,41.018 12.667,41.198 11.925,40.68C11.185,40.163 11.005,39.144 11.523,38.404C13.664,35.343 15.118,31.914 15.844,28.212L16.204,26.653C20.474,10.583 36.162,-3.722 56.842,1.307C65.449,3.393 72.618,8.643 77.027,16.087C83.379,26.811 81.777,38.307 80.793,42.753L80.767,42.886C79.89,47.306 79.607,51.984 79.99,55.721C80.083,56.618 79.429,57.421 78.532,57.513C78.472,57.52 78.416,57.522 78.36,57.522Z',
                  fill: '#fff', transform: 'translate(110.416 29.363) scale(1.30552)' }),
                _react2.default.createElement('path', { d: 'M73.529,68.175C72.985,68.175 72.452,67.904 72.142,67.408C66.808,58.895 69.056,44.801 69.872,40.683L69.913,40.475C70.635,37.258 71.819,29.104 67.465,21.749C64.596,16.906 59.892,13.48 54.22,12.103C40.398,8.747 29.855,18.54 26.953,29.455L26.735,30.407C24.633,41.112 18.625,48.105 13.956,52.076C13.269,52.661 12.236,52.577 11.652,51.89C11.067,51.202 11.15,50.171 11.838,49.587C16.11,45.953 21.609,39.556 23.539,29.726L23.782,28.669C27.094,16.203 39.152,5.082 54.99,8.929C61.525,10.515 66.954,14.476 70.276,20.085C75.228,28.446 73.909,37.595 73.112,41.14L73.077,41.323C72.539,44.038 70.095,57.988 74.912,65.675C75.391,66.439 75.16,67.447 74.394,67.927C74.125,68.095 73.825,68.175 73.529,68.175Z',
                  fill: '#fff8f8', transform: 'translate(110.416 29.363) scale(1.30552)' }),
                _react2.default.createElement('path', { d: 'M69.05,75.307C68.604,75.307 68.159,75.126 67.837,74.769C58.417,64.354 60.742,46.394 62.179,39.156L62.224,38.921C62.655,37.045 63.755,30.882 60.716,25.749C58.907,22.696 56.021,20.614 52.37,19.728C43.298,17.535 36.53,23.97 34.535,31.471L34.433,31.918C31.133,48.722 19.694,57.958 14.929,61.146C14.178,61.646 13.163,61.446 12.662,60.697C12.16,59.947 12.361,58.932 13.111,58.43C17.537,55.469 28.162,46.89 31.236,31.238L31.362,30.686C33.779,21.595 42.029,13.858 53.14,16.553C57.667,17.652 61.259,20.257 63.528,24.085C67.087,30.096 66.043,36.904 65.429,39.552L65.383,39.794C64.337,45.064 61.598,63.002 70.26,72.579C70.866,73.248 70.814,74.282 70.144,74.887C69.833,75.167 69.44,75.307 69.05,75.307Z',
                  fill: '#fff', transform: 'translate(110.416 29.363) scale(1.30552)' }),
                _react2.default.createElement('path', { d: 'M27.204,81.626C26.576,81.626 25.977,81.262 25.707,80.649C25.344,79.823 25.719,78.859 26.544,78.495C50.163,68.103 54.47,37.767 54.511,37.461C54.521,37.391 54.534,37.32 54.553,37.252C54.564,37.21 55.727,32.703 53.963,29.737C53.236,28.516 52.109,27.735 50.52,27.348C44.265,25.832 42.201,33.174 42.116,33.488C38.237,53.256 24.594,64.146 18.91,67.904C18.157,68.402 17.144,68.195 16.646,67.443C16.148,66.69 16.355,65.677 17.107,65.179C22.449,61.647 35.268,51.416 38.934,32.75C39.949,28.92 43.802,22.355 51.29,24.174C53.751,24.771 55.597,26.086 56.779,28.083C59.085,31.975 57.946,37.144 57.737,37.99C57.413,40.315 52.731,70.545 27.862,81.489C27.647,81.582 27.424,81.626 27.204,81.626Z',
                  fill: '#fff', transform: 'translate(110.416 29.363) scale(1.30552)' }),
                _react2.default.createElement('path', { d: 'M20.586,75.325C19.958,75.325 19.358,74.96 19.089,74.347C18.726,73.521 19.101,72.556 19.927,72.194C41.612,62.663 46.889,34.875 46.941,34.595C47.101,33.709 47.95,33.122 48.84,33.279C49.727,33.44 50.317,34.289 50.156,35.177C49.938,36.387 44.538,64.947 21.242,75.186C21.029,75.28 20.806,75.325 20.586,75.325Z',
                  fill: '#fff', transform: 'translate(110.416 29.363) scale(1.30552)' })
              )
            )
          )
        )
      );
    }
  }]);

  return SliderIconComponent;
}(_react2.default.Component);

exports.default = SliderIconComponent;

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(264);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./chartLabelComponent.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./chartLabelComponent.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".highcharts-container {\n  overflow: visible !important; }\n\n.vote-labels {\n  display: flex;\n  flex-flow: row nowrap;\n  display: flex;\n  flex-flow: row nowrap;\n  background: #efefef;\n  padding: 20px 15px;\n  border-top: 3px solid rgba(193, 194, 194, 0.6); }\n  .vote-labels div {\n    flex: 1 1 20%;\n    justify-content: center;\n    display: flex;\n    min-height: 100%;\n    align-items: center;\n    position: relative; }\n    .vote-labels div span {\n      max-width: 90px;\n      font-family: \"Playfair Display\", serif;\n      text-align: center;\n      font-size: 18px;\n      font-weight: 600; }\n    .vote-labels div:nth-child(2), .vote-labels div:nth-child(4) {\n      margin: 0 15%; }\n      @media screen and (max-width: 1024px) {\n        .vote-labels div:nth-child(2), .vote-labels div:nth-child(4) {\n          margin: 0 10%; } }\n      @media screen and (max-width: 768px) {\n        .vote-labels div:nth-child(2), .vote-labels div:nth-child(4) {\n          margin: 0; } }\n    .vote-labels div:first-child {\n      justify-content: flex-start; }\n    .vote-labels div:last-child {\n      justify-content: flex-end; }\n", ""]);

// exports


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(266);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./customslider.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./customslider.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, "/**\n* custom slider\n*/\n.customslider {\n  margin: 20px 0;\n  position: relative;\n  background: #e6e6e6;\n  -ms-touch-action: none;\n  touch-action: none; }\n\n.customslider__fill {\n  display: block;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4); }\n\n.customslider__handle {\n  cursor: pointer;\n  display: inline-block;\n  position: absolute; }\n  .customslider__handle .customslider__active {\n    opacity: 1; }\n\n.customslider__handle-tooltip {\n  width: 50px;\n  height: 75px;\n  text-align: center;\n  position: absolute;\n  background-color: #004c87;\n  font-weight: normal;\n  font-size: 14px;\n  transition: all 100ms ease-in;\n  display: inline-block;\n  color: white;\n  left: 50%;\n  transform: translate3d(-50%, 0, 0); }\n\n/**\n  * Customslider - Horizontal slider\n  */\n.customslider-horizontal {\n  height: 8px;\n  border-radius: 10px;\n  position: relative; }\n  .customslider-horizontal .step-container {\n    display: flex;\n    position: relative;\n    flex-flow: row nowrap;\n    width: 100%;\n    top: -2px;\n    font-family: \"Playfair Display\", serif;\n    text-align: center;\n    font-size: 18px;\n    font-weight: 700;\n    font-style: italic;\n    text-transform: uppercase; }\n    .customslider-horizontal .step-container .slider__marker {\n      flex: 1 1 60px;\n      position: relative;\n      top: -10px; }\n      .customslider-horizontal .step-container .slider__marker.slider__in-between {\n        flex: 1 1 100%;\n        display: flex;\n        flex-flow: row wrap; }\n        .customslider-horizontal .step-container .slider__marker.slider__in-between div {\n          display: flex;\n          flex-flow: row wrap;\n          width: 100%; }\n          .customslider-horizontal .step-container .slider__marker.slider__in-between div .minor-step {\n            width: 20px;\n            height: 20px;\n            border-radius: 20px;\n            border: 5px solid white;\n            margin: 0 auto;\n            display: block; }\n          @media screen and (max-width: 1023px) and (min-width: 960px) {\n            .customslider-horizontal .step-container .slider__marker.slider__in-between div .minor-step.step-hide-tablet {\n              display: none; }\n            .customslider-horizontal .step-container .slider__marker.slider__in-between div .minor-step.step-hide-mobile {\n              display: block; } }\n          @media screen and (max-width: 959px) {\n            .customslider-horizontal .step-container .slider__marker.slider__in-between div .minor-step.step-hide-tablet {\n              display: none; }\n            .customslider-horizontal .step-container .slider__marker.slider__in-between div .minor-step.step-hide-mobile {\n              display: none; } }\n      .customslider-horizontal .step-container .slider__marker--label-wrapper {\n        position: absolute;\n        top: 80px;\n        left: -3px; }\n      .customslider-horizontal .step-container .slider__marker .step-icon-wrapper {\n        width: 60px;\n        height: 60px;\n        flex: auto;\n        display: flex;\n        justify-content: center; }\n        .customslider-horizontal .step-container .slider__marker .step-icon-wrapper .step-icon {\n          width: 40px;\n          height: 40px;\n          border: 5px solid white;\n          border-radius: 25px;\n          position: relative;\n          display: block;\n          top: -9px; }\n      .customslider-horizontal .step-container .slider__marker:nth-child(n+5) .slider__marker--label-wrapper {\n        left: -12px; }\n      .customslider-horizontal .step-container .slider__marker:nth-child(5) .slider__marker--label-wrapper {\n        left: -12px; }\n      .customslider-horizontal .step-container .slider__marker:first-child .step-icon-wrapper {\n        justify-content: flex-start; }\n      .customslider-horizontal .step-container .slider__marker:first-child .slider__marker--label-wrapper {\n        left: -25px; }\n      .customslider-horizontal .step-container .slider__marker:last-child .step-icon-wrapper {\n        justify-content: flex-end; }\n      .customslider-horizontal .step-container .slider__marker:last-child .slider__marker--label-wrapper {\n        left: -15px; }\n  .customslider-horizontal .customslider__fill {\n    height: 100%;\n    background-color: #7cb342;\n    border-radius: 10px;\n    top: 0; }\n  .customslider-horizontal .customslider__handle {\n    width: 175px;\n    height: 90px;\n    top: 50%;\n    position: relative;\n    z-index: 3;\n    transform: translate3d(-50%, -110%, 0);\n    outline: none; }\n  .customslider-horizontal .customslider__handle-tooltip {\n    top: -100px;\n    display: none;\n    padding: 30px 35px; }\n    .customslider-horizontal .customslider__handle-tooltip .label {\n      transform: rotate(0deg);\n      display: flex;\n      flex-flow: column nowrap;\n      margin-top: 20px;\n      min-width: 100%;\n      font-family: \"Playfair Display\", serif; }\n    .customslider-horizontal .customslider__handle-tooltip span:nth-child(2) {\n      font-size: 20px; }\n    .customslider-horizontal .customslider__handle-tooltip .slider-hint {\n      position: absolute;\n      bottom: -255px;\n      left: 65px;\n      display: flex;\n      flex-flow: row nowrap;\n      max-width: 200px;\n      text-transform: uppercase;\n      color: red;\n      font-size: 20px; }\n      .customslider-horizontal .customslider__handle-tooltip .slider-hint span {\n        font-size: 14px;\n        margin: 0 10px;\n        padding-top: 5px; }\n    .customslider-horizontal .customslider__handle-tooltip.first-time-use {\n      height: 100%;\n      font-size: 25px;\n      top: -189px;\n      width: 250px;\n      height: 100px;\n      display: inherit; }\n      .customslider-horizontal .customslider__handle-tooltip.first-time-use .label {\n        display: inherit;\n        height: 100%;\n        margin-top: 5px; }\n    .customslider-horizontal .customslider__handle-tooltip:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0; }\n    .customslider-horizontal .customslider__handle-tooltip:after {\n      border-left: 25px solid transparent;\n      border-right: 25px solid transparent;\n      border-top: 25px solid #004c87;\n      left: 50%;\n      bottom: -24px;\n      transform: translate3d(-50%, 0, 0); }\n    .customslider-horizontal .customslider__handle-tooltip.second-attempt {\n      background: red;\n      top: -195px;\n      width: 300px;\n      height: 110px;\n      display: inherit; }\n      .customslider-horizontal .customslider__handle-tooltip.second-attempt .label {\n        margin-top: 10px;\n        font-size: 35px; }\n      .customslider-horizontal .customslider__handle-tooltip.second-attempt .label .slider-hint {\n        left: 80px;\n        bottom: -265px; }\n      .customslider-horizontal .customslider__handle-tooltip.second-attempt:after {\n        border-top: 25px solid red; }\n\n.widget-view .customslider-horizontal .step-container .slider__marker .minor-step {\n  display: none !important; }\n\n/**\n* Customslider - Vertical slider\n*/\n.customslider-vertical {\n  margin: 20px auto;\n  height: 150px;\n  max-width: 10px;\n  background-color: transparent; }\n  .customslider-vertical .customslider__fill,\n  .customslider-vertical .customslider__handle {\n    position: absolute; }\n  .customslider-vertical .customslider__fill {\n    width: 100%;\n    background-color: #7cb342;\n    box-shadow: none;\n    bottom: 0; }\n  .customslider-vertical .customslider__handle {\n    width: 30px;\n    height: 10px;\n    left: -10px;\n    box-shadow: none; }\n  .customslider-vertical .customslider__handle-tooltip {\n    left: -100%;\n    top: 50%;\n    transform: translate3d(-50%, -50%, 0); }\n    .customslider-vertical .customslider__handle-tooltip:after {\n      border-top: 8px solid transparent;\n      border-bottom: 8px solid transparent;\n      border-left: 8px solid rgba(0, 0, 0, 0.8);\n      left: 100%;\n      top: 12px; }\n\n/**\n* Customslider - Reverse\n*/\n.customslider-reverse.customslider-horizontal .customslider__fill {\n  right: 0; }\n\n.customslider-reverse.customslider-vertical .customslider__fill {\n  top: 0;\n  bottom: inherit; }\n\n/**\n* Customslider - Labels\n*/\n.customslider__labels {\n  position: relative; }\n  .customslider__labels .customslider-vertical {\n    position: relative;\n    list-style-type: none;\n    margin: 0 0 0 24px;\n    padding: 0;\n    text-align: left;\n    width: 250px;\n    height: 100%;\n    left: 10px; }\n    .customslider__labels .customslider-vertical .customslider__label-item {\n      position: absolute;\n      transform: translate3d(0, -50%, 0); }\n      .customslider__labels .customslider-vertical .customslider__label-item::before {\n        content: '';\n        width: 10px;\n        height: 2px;\n        background: black;\n        position: absolute;\n        left: -14px;\n        top: 50%;\n        transform: translateY(-50%);\n        z-index: -1; }\n  .customslider__labels .customslider__label-item {\n    position: absolute;\n    font-size: 14px;\n    cursor: pointer;\n    display: inline-block;\n    top: 10px;\n    transform: translate3d(-50%, 0, 0); }\n", ""]);

// exports


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(268);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./horizontalSlider.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./horizontalSlider.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".slider--horizontal {\n  max-width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n  min-height: 135px;\n  padding: 25px 100px; }\n  .slider--horizontal .slider {\n    margin-top: 35px; }\n\n.overlay, .slider__color--stop-0, .slider__color--stop-1, .slider__color--stop-2, .slider__color--stop-3, .slider__color--stop-4, .slider__color--stop-5, .slider__color--stop-6, .slider__color--stop-7, .slider__color--stop-8, .slider__color--stop-9, .slider__color--stop-10, .slider__color--stop-11, .slider__color--stop-12, .slider__color--stop-13, .slider__color--stop-14, .slider__color--stop-15, .slider__color--stop-16, .slider__color--stop-17, .slider__color--stop-18, .slider__color--stop-19, .slider__color--stop-20, .slider__color--stop-21 {\n  width: 100%;\n  height: 100%;\n  background-color: rgba(250, 250, 250, 0.83); }\n  .overlay.first-time-use .overlay-content, .first-time-use.slider__color--stop-0 .overlay-content, .first-time-use.slider__color--stop-1 .overlay-content, .first-time-use.slider__color--stop-2 .overlay-content, .first-time-use.slider__color--stop-3 .overlay-content, .first-time-use.slider__color--stop-4 .overlay-content, .first-time-use.slider__color--stop-5 .overlay-content, .first-time-use.slider__color--stop-6 .overlay-content, .first-time-use.slider__color--stop-7 .overlay-content, .first-time-use.slider__color--stop-8 .overlay-content, .first-time-use.slider__color--stop-9 .overlay-content, .first-time-use.slider__color--stop-10 .overlay-content, .first-time-use.slider__color--stop-11 .overlay-content, .first-time-use.slider__color--stop-12 .overlay-content, .first-time-use.slider__color--stop-13 .overlay-content, .first-time-use.slider__color--stop-14 .overlay-content, .first-time-use.slider__color--stop-15 .overlay-content, .first-time-use.slider__color--stop-16 .overlay-content, .first-time-use.slider__color--stop-17 .overlay-content, .first-time-use.slider__color--stop-18 .overlay-content, .first-time-use.slider__color--stop-19 .overlay-content, .first-time-use.slider__color--stop-20 .overlay-content, .first-time-use.slider__color--stop-21 .overlay-content {\n    color: black; }\n  .overlay.first-time-use .icon svg, .first-time-use.slider__color--stop-0 .icon svg, .first-time-use.slider__color--stop-1 .icon svg, .first-time-use.slider__color--stop-2 .icon svg, .first-time-use.slider__color--stop-3 .icon svg, .first-time-use.slider__color--stop-4 .icon svg, .first-time-use.slider__color--stop-5 .icon svg, .first-time-use.slider__color--stop-6 .icon svg, .first-time-use.slider__color--stop-7 .icon svg, .first-time-use.slider__color--stop-8 .icon svg, .first-time-use.slider__color--stop-9 .icon svg, .first-time-use.slider__color--stop-10 .icon svg, .first-time-use.slider__color--stop-11 .icon svg, .first-time-use.slider__color--stop-12 .icon svg, .first-time-use.slider__color--stop-13 .icon svg, .first-time-use.slider__color--stop-14 .icon svg, .first-time-use.slider__color--stop-15 .icon svg, .first-time-use.slider__color--stop-16 .icon svg, .first-time-use.slider__color--stop-17 .icon svg, .first-time-use.slider__color--stop-18 .icon svg, .first-time-use.slider__color--stop-19 .icon svg, .first-time-use.slider__color--stop-20 .icon svg, .first-time-use.slider__color--stop-21 .icon svg {\n    fill: red !important; }\n  .overlay.first-time-use .closing-date, .first-time-use.slider__color--stop-0 .closing-date, .first-time-use.slider__color--stop-1 .closing-date, .first-time-use.slider__color--stop-2 .closing-date, .first-time-use.slider__color--stop-3 .closing-date, .first-time-use.slider__color--stop-4 .closing-date, .first-time-use.slider__color--stop-5 .closing-date, .first-time-use.slider__color--stop-6 .closing-date, .first-time-use.slider__color--stop-7 .closing-date, .first-time-use.slider__color--stop-8 .closing-date, .first-time-use.slider__color--stop-9 .closing-date, .first-time-use.slider__color--stop-10 .closing-date, .first-time-use.slider__color--stop-11 .closing-date, .first-time-use.slider__color--stop-12 .closing-date, .first-time-use.slider__color--stop-13 .closing-date, .first-time-use.slider__color--stop-14 .closing-date, .first-time-use.slider__color--stop-15 .closing-date, .first-time-use.slider__color--stop-16 .closing-date, .first-time-use.slider__color--stop-17 .closing-date, .first-time-use.slider__color--stop-18 .closing-date, .first-time-use.slider__color--stop-19 .closing-date, .first-time-use.slider__color--stop-20 .closing-date, .first-time-use.slider__color--stop-21 .closing-date {\n    color: red; }\n\n.slider__color--stop-0 {\n  background-color: rgba(241, 71, 36, 0.83); }\n\n.step-icon-stop-0 {\n  background-color: #f14724; }\n\n.slider__color--stop-1 {\n  background-color: rgba(242, 84, 38, 0.83); }\n\n.step-icon-stop-1 {\n  background-color: #f25426; }\n\n.slider__color--stop-2 {\n  background-color: rgba(243, 96, 41, 0.83); }\n\n.step-icon-stop-2 {\n  background-color: #f36029; }\n\n.slider__color--stop-3 {\n  background-color: rgba(244, 109, 43, 0.83); }\n\n.step-icon-stop-3 {\n  background-color: #f46d2b; }\n\n.slider__color--stop-4 {\n  background-color: rgba(245, 122, 45, 0.83); }\n\n.step-icon-stop-4 {\n  background-color: #f57a2d; }\n\n.slider__color--stop-5 {\n  background-color: rgba(246, 135, 48, 0.83); }\n\n.step-icon-stop-5 {\n  background-color: #f68730; }\n\n.slider__color--stop-6 {\n  background-color: rgba(248, 147, 50, 0.83); }\n\n.step-icon-stop-6 {\n  background-color: #f89332; }\n\n.slider__color--stop-7 {\n  background-color: rgba(249, 160, 53, 0.83); }\n\n.step-icon-stop-7 {\n  background-color: #f9a035; }\n\n.slider__color--stop-8 {\n  background-color: rgba(250, 173, 55, 0.83); }\n\n.step-icon-stop-8 {\n  background-color: #faad37; }\n\n.slider__color--stop-9 {\n  background-color: rgba(251, 186, 57, 0.83); }\n\n.step-icon-stop-9 {\n  background-color: #fbba39; }\n\n.slider__color--stop-10 {\n  background-color: rgba(252, 198, 60, 0.83); }\n\n.step-icon-stop-10 {\n  background-color: #fcc63c; }\n\n.slider__color--stop-11 {\n  background-color: rgba(253, 211, 62, 0.83); }\n\n.step-icon-stop-11 {\n  background-color: #fdd33e; }\n\n.slider__color--stop-12 {\n  background-color: rgba(241, 210, 63, 0.83); }\n\n.step-icon-stop-12 {\n  background-color: #f1d23f; }\n\n.slider__color--stop-13 {\n  background-color: rgba(228, 208, 64, 0.83); }\n\n.step-icon-stop-13 {\n  background-color: #e4d040; }\n\n.slider__color--stop-14 {\n  background-color: rgba(216, 207, 64, 0.83); }\n\n.step-icon-stop-14 {\n  background-color: #d8cf40; }\n\n.slider__color--stop-15 {\n  background-color: rgba(204, 206, 65, 0.83); }\n\n.step-icon-stop-15 {\n  background-color: #ccce41; }\n\n.slider__color--stop-16 {\n  background-color: rgba(192, 204, 66, 0.83); }\n\n.step-icon-stop-16 {\n  background-color: #c0cc42; }\n\n.slider__color--stop-17 {\n  background-color: rgba(179, 203, 67, 0.83); }\n\n.step-icon-stop-17 {\n  background-color: #b3cb43; }\n\n.slider__color--stop-18 {\n  background-color: rgba(167, 201, 68, 0.83); }\n\n.step-icon-stop-18 {\n  background-color: #a7c944; }\n\n.slider__color--stop-19 {\n  background-color: rgba(155, 200, 69, 0.83); }\n\n.step-icon-stop-19 {\n  background-color: #9bc845; }\n\n.slider__color--stop-20 {\n  background-color: rgba(143, 199, 69, 0.83); }\n\n.step-icon-stop-20 {\n  background-color: #8fc745; }\n\n.slider__color--stop-21 {\n  background-color: rgba(130, 197, 70, 0.83); }\n\n.step-icon-stop-21 {\n  background-color: #82c546; }\n\n.step-icon-stop-10 {\n  background-color: #848484; }\n\n.customslider {\n  background: rgba(241, 71, 36, 0.83);\n  background: linear-gradient(to right, #f14724 0%, #fdd33e 50%, #76c447 100%); }\n", ""]);

// exports


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(27);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataComponent = function (_React$Component) {
  _inherits(DataComponent, _React$Component);

  function DataComponent(props) {
    _classCallCheck(this, DataComponent);

    return _possibleConstructorReturn(this, (DataComponent.__proto__ || Object.getPrototypeOf(DataComponent)).call(this, props));
  }

  _createClass(DataComponent, [{
    key: 'render',
    value: function render() {
      if (this.props.type === "date") {
        return _react2.default.createElement(
          'span',
          null,
          (0, _moment2.default)(this.props.data).format('YYYY-MM-DD')
        );
      } else {
        return _react2.default.createElement(
          'span',
          null,
          this.props.data
        );
      }
    }
  }]);

  return DataComponent;
}(_react2.default.Component);

exports.default = DataComponent;

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pure = __webpack_require__(55);

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = __webpack_require__(56);

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToggleStar = function ToggleStar(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' })
  );
};
ToggleStar = (0, _pure2.default)(ToggleStar);
ToggleStar.displayName = 'ToggleStar';
ToggleStar.muiName = 'SvgIcon';

exports.default = ToggleStar;

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(272);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./bannerComponent.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./bannerComponent.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".overlay-content {\n  display: flex;\n  flex-flow: column nowrap;\n  color: white;\n  padding: 40px 80px;\n  overflow: hidden;\n  font-family: \"Playfair Display\", serif; }\n  .overlay-content .main {\n    padding-bottom: 70px; }\n    .overlay-content .main .icon {\n      padding-bottom: 15px; }\n    .overlay-content .main h1 {\n      margin-bottom: 10px;\n      overflow: hidden;\n      font-size: 32px;\n      max-height: 95px; }\n    .overlay-content .main .bill-number {\n      text-transform: uppercase;\n      font-family: \"Lato\", sans-serif; }\n    .overlay-content .main .closing-date {\n      font-family: \"Lato\", sans-serif;\n      font-size: 12px; }\n  .overlay-content .divider {\n    height: 3px;\n    background-color: black;\n    max-width: 500px;\n    margin: 5px 0;\n    opacity: .2; }\n    .overlay-content .divider.hide {\n      display: none; }\n  .overlay-content .subtitle {\n    max-width: 500px;\n    font-size: 14px; }\n    .overlay-content .subtitle p {\n      max-height: 200px;\n      color: white;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      display: -webkit-box;\n      -webkit-line-clamp: 3;\n      -webkit-box-orient: vertical; }\n\n.overlay.first-time-use .overlay-content .subtitle p {\n  color: black; }\n", ""]);

// exports


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BottomNavigationItem = exports.BottomNavigation = undefined;

var _BottomNavigation2 = __webpack_require__(274);

var _BottomNavigation3 = _interopRequireDefault(_BottomNavigation2);

var _BottomNavigationItem2 = __webpack_require__(275);

var _BottomNavigationItem3 = _interopRequireDefault(_BottomNavigationItem2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BottomNavigation = _BottomNavigation3.default;
exports.BottomNavigationItem = _BottomNavigationItem3.default;
exports.default = _BottomNavigation3.default;

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var bottomNavigation = context.muiTheme.bottomNavigation;


  var styles = {
    root: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: bottomNavigation.backgroundColor,
      height: bottomNavigation.height
    },
    item: {
      flex: '1'
    }
  };

  return styles;
}

var BottomNavigation = function BottomNavigation(props, context) {
  var children = props.children,
      style = props.style,
      selectedIndex = props.selectedIndex,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'style', 'selectedIndex']);
  var prepareStyles = context.muiTheme.prepareStyles;

  var styles = getStyles(props, context);

  var preparedChildren = _react.Children.map(children, function (child, index) {
    if (!child) {
      return null;
    }

    return (0, _react.cloneElement)(child, {
      style: (0, _simpleAssign2.default)({}, styles.item, child.props.style),
      selected: index === selectedIndex
    });
  });

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, other, { style: prepareStyles((0, _simpleAssign2.default)({}, styles.root, style)) }),
    preparedChildren
  );
};

BottomNavigation.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The `BottomNavigationItem`s to populate the element with.
   */
  children: _propTypes2.default.node,
  /**
   * The index of the currently selected navigation item.
   */
  selectedIndex: _propTypes2.default.number,
  /**
   * @ignore
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};

BottomNavigation.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};

exports.default = BottomNavigation;

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(38);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _simpleAssign = __webpack_require__(12);

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EnhancedButton = __webpack_require__(68);

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var selected = props.selected;
  var bottomNavigation = context.muiTheme.bottomNavigation;


  var color = selected ? bottomNavigation.selectedColor : bottomNavigation.unselectedColor;

  var styles = {
    root: {
      transition: 'padding-top 0.3s',
      paddingTop: selected ? 6 : 8,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
      minWidth: 80,
      maxWidth: 168
    },
    label: {
      fontSize: selected ? bottomNavigation.selectedFontSize : bottomNavigation.unselectedFontSize,
      transition: 'color 0.3s, font-size 0.3s',
      color: color
    },
    icon: {
      display: 'block',
      /**
       * Used to ensure SVG icons are centered
       */
      width: '100%'
    },
    iconColor: color
  };

  return styles;
}

var BottomNavigationItem = function BottomNavigationItem(props, context) {
  var label = props.label,
      icon = props.icon,
      style = props.style,
      other = (0, _objectWithoutProperties3.default)(props, ['label', 'icon', 'style']);
  var prepareStyles = context.muiTheme.prepareStyles;

  var styles = getStyles(props, context);

  var styledIcon = (0, _react.cloneElement)(icon, {
    style: (0, _simpleAssign2.default)({}, styles.icon, icon.props.style),
    color: icon.props.color || styles.iconColor
  });

  return _react2.default.createElement(
    _EnhancedButton2.default,
    (0, _extends3.default)({}, other, { style: (0, _simpleAssign2.default)({}, styles.root, style) }),
    styledIcon,
    _react2.default.createElement(
      'div',
      { style: prepareStyles(styles.label) },
      label
    )
  );
};

BottomNavigationItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Set the icon representing the view for this item.
   */
  icon: _propTypes2.default.node,
  /**
   * Set the label describing the view for this item.
   */
  label: _propTypes2.default.node,
  /**
   * @ignore
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
} : {};

BottomNavigationItem.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};

exports.default = BottomNavigationItem;

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepMeLogoFooter = function (_React$Component) {
  _inherits(RepMeLogoFooter, _React$Component);

  function RepMeLogoFooter(props) {
    _classCallCheck(this, RepMeLogoFooter);

    return _possibleConstructorReturn(this, (RepMeLogoFooter.__proto__ || Object.getPrototypeOf(RepMeLogoFooter)).call(this, props));
  }

  _createClass(RepMeLogoFooter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'svg',
        { width: '100%', height: '100%', viewBox: '0 0 1092 204', xmlns: 'http://www.w3.org/2000/svg', fillRule: 'evenodd',
          clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1.414' },
        _react2.default.createElement('path', { d: 'M74,97.74L110.42,57.25C107.023,56.272 103.505,55.774 99.97,55.77L56.73,55.77C36.032,55.77 19,72.802 19,93.5C19,114.198 36.032,131.23 56.73,131.23L58.3,131.23L70.67,153.38L70.67,137.11L37.87,80.38L64.1,80.93L74,97.74Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M127,67.27L91.89,131.27L99.89,131.27C99.912,131.27 99.934,131.27 99.955,131.27C120.642,131.27 137.665,114.247 137.665,93.56C137.665,83.745 133.833,74.307 126.99,67.27L127,67.27Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M70.67,153.38L127.13,60.42L127.13,52.22L70.67,137.11L70.67,153.38Z',
          fill: '#d1232c', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M193.7,88.67C193.7,95.47 191.01,99.86 185.63,101.84L196.37,117L184.72,117L175.31,103.46L168.75,103.46L168.75,117L159.28,117L159.28,74.59L175.37,74.59C181.957,74.59 186.66,75.703 189.48,77.93C192.29,80.15 193.7,83.74 193.7,88.67ZM182.29,93.67C183.463,92.617 184.05,90.95 184.05,88.67C184.05,86.39 183.443,84.833 182.23,84C181.01,83.15 178.89,82.72 175.85,82.72L168.75,82.72L168.75,95.29L175.67,95.29C178.91,95.29 181.11,94.76 182.29,93.71L182.29,93.67Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M234,74.59L234,83L212.88,83L212.88,91.74L231.88,91.74L231.88,99.81L212.88,99.81L212.88,108.61L234.67,108.61L234.67,117L203.41,117L203.41,74.59L234,74.59Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M272.33,78.38C275.303,80.913 276.79,84.8 276.79,90.04C276.79,95.28 275.263,99.113 272.21,101.54C269.15,103.967 264.483,105.18 258.21,105.18L252.56,105.18L252.56,117L243.1,117L243.1,74.59L258.1,74.59C264.613,74.59 269.357,75.853 272.33,78.38ZM265.38,95.08C266.614,93.489 267.22,91.498 267.08,89.49C267.08,87.043 266.34,85.303 264.86,84.27C263.39,83.27 261.09,82.72 257.98,82.72L252.57,82.72L252.57,97L259,97C262.1,97 264.25,96.35 265.38,95.08Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M318.61,88.67C318.61,95.47 315.92,99.86 310.54,101.84L321.28,117L309.63,117L300.22,103.46L293.66,103.46L293.66,117L284.2,117L284.2,74.59L300.28,74.59C306.873,74.59 311.577,75.703 314.39,77.93C317.2,80.15 318.61,83.74 318.61,88.67ZM307.2,93.67C308.373,92.617 308.96,90.95 308.96,88.67C308.96,86.39 308.353,84.833 307.14,84C305.92,83.153 303.797,82.727 300.77,82.72L293.66,82.72L293.66,95.29L300.58,95.29C303.82,95.29 306.027,94.763 307.2,93.71L307.2,93.67Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M358.91,74.59L358.91,83L337.79,83L337.79,91.74L356.79,91.74L356.79,99.81L337.79,99.81L337.79,108.61L359.58,108.61L359.58,117L328.32,117L328.32,74.59L358.91,74.59Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M377.94,83.06C377.034,83.785 376.525,84.9 376.57,86.06C376.537,87.288 377.179,88.441 378.24,89.06C379.36,89.78 381.93,90.637 385.95,91.63C389.383,92.31 392.601,93.809 395.33,96C397.563,98 398.677,100.893 398.67,104.68C398.768,108.26 397.183,111.687 394.39,113.93C391.543,116.297 387.79,117.48 383.13,117.48C376.41,117.48 370.36,114.993 364.98,110.02L370.63,103.1C375.203,107.1 379.43,109.1 383.31,109.1C384.763,109.182 386.204,108.784 387.41,107.97C388.369,107.277 388.927,106.153 388.9,104.97C388.916,103.768 388.32,102.637 387.32,101.97C385.371,100.885 383.261,100.119 381.07,99.7C376.13,98.52 372.517,96.993 370.23,95.12C367.943,93.247 366.8,90.29 366.8,86.25C366.62,82.624 368.247,79.134 371.14,76.94C374.288,74.653 378.112,73.484 382,73.62C384.892,73.627 387.762,74.121 390.49,75.08C393.196,75.977 395.71,77.374 397.9,79.2L393.1,86.12C389.871,83.491 385.853,82.016 381.69,81.93C380.346,81.853 379.017,82.253 377.94,83.06Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M437.33,74.59L437.33,83L416.21,83L416.21,91.74L435.21,91.74L435.21,99.81L416.21,99.81L416.21,108.61L438,108.61L438,117L406.74,117L406.74,74.59L437.33,74.59Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M476.12,74.59L485.58,74.59L485.58,117L476.12,117L455.9,90.43L455.9,117L446.43,117L446.43,74.59L455.3,74.59L476.12,101.9L476.12,74.59Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M514,82.78L514,117L504.53,117L504.53,82.78L492.53,82.78L492.53,74.59L526,74.59L526,82.78L514,82.78Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('rect', { x: '528.56', y: '94.74', width: '21.6', height: '8.07', fill: '#015792', fillRule: 'nonzero'
        }),
        _react2.default.createElement('path', { d: 'M567.05,84.25L565.88,82.25C569.188,79.324 572.85,76.824 576.78,74.81C580.09,73.21 582.62,72.42 584.36,72.42C584.909,72.368 585.457,72.53 585.89,72.87C586.2,73.218 586.316,73.699 586.2,74.15C585.826,75.48 585.321,76.77 584.69,78C583.41,80.847 582.47,83.103 581.87,84.77C591.463,76.49 598.407,72.35 602.7,72.35C603.592,72.257 604.477,72.596 605.08,73.26C605.59,74.141 605.716,75.193 605.43,76.17C604.769,78.694 603.826,81.136 602.62,83.45C606.163,80.172 610.056,77.295 614.23,74.87C617.377,73.19 619.75,72.35 621.35,72.35C622.518,72.239 623.671,72.693 624.45,73.57C625.09,74.38 625.25,75.64 624.95,77.34C624.709,78.599 624.327,79.827 623.81,81C623.223,82.4 621.223,86.647 617.81,93.74C613.57,102.527 611.303,107.773 611.01,109.48C610.8,110.63 611.18,111.21 612.13,111.21C612.84,111.195 613.532,110.983 614.13,110.6C616.616,108.999 618.988,107.228 621.23,105.3L622.58,107.13C621.767,107.71 620.217,108.9 617.93,110.7C615.893,112.362 613.752,113.892 611.52,115.28C609.913,116.265 608.098,116.861 606.22,117.02C605.192,117.013 604.251,116.428 603.79,115.51C603.146,114.226 602.99,112.751 603.35,111.36C603.736,109.399 604.312,107.48 605.07,105.63C605.93,103.443 608.19,98.53 611.85,90.89C614.59,85.15 616.07,81.667 616.29,80.44C616.49,79.29 616.08,78.71 615.07,78.71C613.785,78.864 612.551,79.305 611.46,80C608.322,81.694 605.468,83.867 603,86.44C600.888,88.953 599.199,91.794 598,94.85C594.24,103.243 591.333,110.087 589.28,115.38L582,115.38L595.08,84.25C595.647,82.987 596.148,81.695 596.58,80.38C596.693,79.958 596.624,79.508 596.39,79.14C596.116,78.825 595.706,78.661 595.29,78.7C594.38,78.7 592.83,79.42 590.65,80.84C587.483,82.731 584.62,85.091 582.16,87.84C579.794,90.981 577.907,94.455 576.56,98.15L569.61,115.37L562.29,115.37L572.29,91.07C575.22,84.07 576.75,80.22 576.85,79.61C576.99,78.83 576.76,78.44 576.14,78.44C574.84,78.447 571.81,80.383 567.05,84.25Z',
          fill: '#ea2126', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M653.82,102.59L655.11,104.83C645.39,112.737 637.56,116.693 631.62,116.7C629.21,116.7 627.51,115.88 626.53,114.26C625.55,112.64 625.36,110.01 626,106.41C627.28,99.15 630.763,91.917 636.45,84.71C642.85,76.53 649.497,72.44 656.39,72.44C658.797,72.44 660.533,73.043 661.6,74.25C662.707,75.663 663.078,77.52 662.6,79.25C662.083,81.701 660.892,83.96 659.16,85.77C657.247,87.91 654.12,90.133 649.78,92.44C647.613,93.56 643.047,95.583 636.08,98.51C635.482,100.218 635.021,101.97 634.7,103.75C634.27,106.16 634.36,107.84 634.95,108.75C635.642,109.752 636.828,110.301 638.04,110.18C639.699,110.117 641.329,109.719 642.83,109.01C646.656,107.162 650.331,105.016 653.82,102.59ZM637.3,95.21C643.193,92.763 647.763,90.13 651.01,87.31C653.23,85.31 654.51,83.357 654.85,81.45C655.154,80.263 654.962,79.003 654.32,77.96C653.686,77.088 652.646,76.601 651.57,76.67C650.148,76.724 648.777,77.22 647.65,78.09C645.599,79.619 643.895,81.565 642.65,83.8C640.473,87.406 638.68,91.23 637.3,95.21Z',
          fill: '#ea2126', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M731.49,95.33C732.965,93.766 734.675,92.443 736.56,91.41C737.849,90.669 739.295,90.241 740.78,90.16C742.078,90.089 743.315,90.735 744,91.84C744.811,93.405 745.092,95.192 744.8,96.93C744.473,100.34 743.405,103.637 741.67,106.59C740.15,109.43 738.006,111.888 735.4,113.78C733.445,115.275 731.079,116.137 728.62,116.25C727.044,116.349 725.5,115.753 724.4,114.62C723.386,113.468 722.926,111.929 723.14,110.41C723.389,108.446 723.828,106.51 724.45,104.63L729.34,88.71C730.196,85.554 731.546,82.554 733.34,79.82C734.78,77.801 736.656,76.133 738.83,74.94C740.684,73.828 742.789,73.202 744.95,73.12C745.799,73.048 746.649,73.256 747.37,73.71C747.849,74.085 748.097,74.686 748.02,75.29C747.961,75.89 747.652,76.438 747.17,76.8C746.568,77.228 745.838,77.44 745.1,77.4C743.976,77.34 742.859,77.19 741.76,76.95C741.145,76.819 740.519,76.749 739.89,76.74C738.812,76.781 737.836,77.401 737.34,78.36C736.331,80.416 735.517,82.562 734.91,84.77L731.49,95.33ZM737.49,93.5C736.126,93.679 734.857,94.301 733.88,95.27C732.031,97.05 730.561,99.186 729.56,101.55C728.177,104.313 727.313,107.306 727.01,110.38C726.879,111.355 727.162,112.342 727.79,113.1C728.339,113.804 729.187,114.211 730.08,114.2C732.267,114.2 734.377,112.44 736.41,108.92C738.333,105.712 739.528,102.121 739.91,98.4C740.091,97.072 739.868,95.719 739.27,94.52C738.922,93.868 738.229,93.47 737.49,93.5Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M747.81,96.21L747,94.79L749.33,93.29C750.852,92.238 752.438,91.283 754.08,90.43C754.515,90.21 754.993,90.087 755.48,90.07C755.951,90.104 756.374,90.376 756.6,90.79C758.355,93.537 759.576,96.591 760.2,99.79C761.039,103.392 761.312,107.104 761.01,110.79C760.97,111.25 760.89,111.95 760.77,112.89C764.663,106.65 766.767,101.693 767.08,98.02C767.129,97.014 767.048,96.006 766.84,95.02C766.644,94.032 766.553,93.027 766.57,92.02C766.607,91.472 766.85,90.957 767.25,90.58C767.631,90.207 768.147,90.002 768.68,90.01C769.317,89.984 769.924,90.291 770.28,90.82C770.692,91.518 770.845,92.34 770.71,93.14C770.294,96.467 769.423,99.721 768.12,102.81C766.35,107.175 764.142,111.35 761.53,115.27C759.327,118.84 756.742,122.16 753.82,125.17C751.953,127.049 749.795,128.616 747.43,129.81C745.687,130.676 743.776,131.154 741.83,131.21C740.815,131.287 739.802,131.027 738.95,130.47C738.384,130.069 738.066,129.402 738.11,128.71C738.176,128.087 738.508,127.522 739.02,127.16C739.635,126.708 740.387,126.478 741.15,126.51C742.068,126.544 742.98,126.674 743.87,126.9C744.692,127.118 745.532,127.258 746.38,127.32C747.84,127.24 749.239,126.705 750.38,125.79C752.287,124.445 753.919,122.747 755.19,120.79C756.372,119.031 757.104,117.008 757.32,114.9C757.549,111.564 757.442,108.214 757,104.9C756.778,101.749 755.889,98.681 754.39,95.9C754,95.012 753.156,94.402 752.19,94.31C751.183,94.25 749.723,94.883 747.81,96.21Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M794.74,85.43L799.61,83.6L796.74,92L802.88,92L802.22,94.14L796.08,94.14L792.61,104.23C791.793,106.264 791.196,108.379 790.83,110.54C790.75,110.949 790.836,111.374 791.07,111.72C791.298,111.973 791.631,112.106 791.97,112.08C793.01,111.923 794.003,111.541 794.88,110.96C796.628,109.973 798.299,108.856 799.88,107.62L800.88,109.01C797.939,111.231 794.86,113.262 791.66,115.09C790.546,115.712 789.312,116.091 788.04,116.2C787.385,116.235 786.756,115.928 786.38,115.39C785.955,114.576 785.81,113.644 785.97,112.74C786.302,110.479 786.875,108.259 787.68,106.12L791.74,94.12L787,94.12L787.7,92L792.51,92L794.74,85.43Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M827.6,109L828.27,110.11C826.49,111.987 824.473,113.624 822.27,114.98C821.282,115.674 820.132,116.102 818.93,116.22C818.286,116.243 817.676,115.923 817.33,115.38C816.915,114.574 816.771,113.655 816.92,112.76C817.078,111.568 817.346,110.393 817.72,109.25C818.18,107.717 819.393,104.423 821.36,99.37C821.908,97.944 822.362,96.485 822.72,95C822.767,94.333 822.457,94 821.79,94C820.62,94.123 819.504,94.558 818.56,95.26C816.671,96.469 814.984,97.967 813.56,99.7C812.416,101.24 811.568,102.98 811.06,104.83L807.8,115.34L803.39,115.34C804.64,111.83 805.63,108.96 806.33,106.74L812.38,87.44C813.182,84.493 814.484,81.706 816.23,79.2C817.687,77.278 819.556,75.706 821.7,74.6C823.631,73.532 825.794,72.952 828,72.91C828.724,72.856 829.442,73.085 830,73.55C830.444,73.965 830.666,74.566 830.6,75.17C830.528,75.752 830.216,76.278 829.74,76.62C829.165,77.053 828.459,77.275 827.74,77.25C827.131,77.235 826.523,77.182 825.92,77.09C824.763,76.886 823.594,76.759 822.42,76.71C821.483,76.673 820.583,77.086 820,77.82C818.965,79.44 818.208,81.221 817.76,83.09L813.15,97.94C815.633,95.505 818.4,93.376 821.39,91.6C822.591,90.76 823.984,90.234 825.44,90.07C826.097,90.025 826.74,90.279 827.19,90.76C827.61,91.309 827.784,92.008 827.67,92.69C827.608,93.37 827.47,94.041 827.26,94.69C826.9,95.88 826.1,98.02 824.88,101.13C823.22,105.43 822.22,108.13 821.88,109.13C821.585,110.04 821.387,110.978 821.29,111.93C821.246,112.174 821.281,112.427 821.39,112.65C821.488,112.813 821.671,112.906 821.86,112.89C822.33,112.89 823.27,112.32 824.67,111.17C825.52,110.6 826.47,109.86 827.6,109Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M846.13,107.82L847,109.15C841.74,113.817 837.383,116.15 833.93,116.15C832.721,116.244 831.548,115.692 830.85,114.7C830.19,113.7 829.95,112.2 830.14,110.07C830.655,105.433 832.379,101.011 835.14,97.25C838.473,92.41 842.14,89.993 846.14,90C847.283,89.904 848.416,90.293 849.26,91.07C849.969,91.869 850.285,92.945 850.12,94C849.954,95.42 849.373,96.759 848.45,97.85C847.003,99.47 845.267,100.806 843.33,101.79C842.13,102.46 839.57,103.65 835.67,105.37C835.412,106.388 835.232,107.425 835.13,108.47C834.932,109.488 835.076,110.543 835.54,111.47C835.969,112.057 836.675,112.38 837.4,112.32C838.35,112.287 839.281,112.048 840.13,111.62C842.235,110.528 844.243,109.257 846.13,107.82ZM836.13,103.46C838.906,102.35 841.47,100.77 843.71,98.79C844.752,97.908 845.441,96.679 845.65,95.33C845.756,94.606 845.581,93.868 845.16,93.27C844.762,92.758 844.138,92.47 843.49,92.5C842.68,92.532 841.903,92.831 841.28,93.35C840.155,94.255 839.255,95.409 838.65,96.72C837.575,98.87 836.733,101.13 836.14,103.46L836.13,103.46Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M865.91,97.53L864.91,96.33C866.567,94.413 868.522,92.776 870.7,91.48C872.134,90.576 873.769,90.04 875.46,89.92C875.873,89.892 876.282,90.025 876.6,90.29C876.875,90.585 876.997,90.992 876.93,91.39C876.873,91.997 876.756,92.597 876.58,93.18C876.4,93.79 875.87,95.24 875,97.53C877.084,95.468 879.32,93.566 881.69,91.84C883.227,90.764 885.028,90.127 886.9,90C887.908,89.999 888.84,90.553 889.32,91.44C889.998,92.786 890.229,94.314 889.98,95.8C889.467,100.868 887.493,105.681 884.3,109.65C880.927,114.023 877.437,116.21 873.83,116.21C872.364,116.198 870.928,115.794 869.67,115.04L866.27,124.97C866.088,125.443 865.963,125.937 865.9,126.44C865.789,127.062 866.061,127.694 866.59,128.04C868.256,128.761 870.037,129.178 871.85,129.27L871.33,130.77C868.17,130.51 865.683,130.38 863.87,130.38C862.057,130.38 859.613,130.51 856.54,130.77L857.06,129.27C858.292,129.219 859.476,128.778 860.44,128.01C861.396,126.976 862.083,125.722 862.44,124.36L869.8,101.52C871.18,97.273 871.89,94.907 871.93,94.42C871.98,93.9 871.75,93.64 871.26,93.64C870.373,93.647 868.59,94.943 865.91,97.53ZM870.67,111.74C871.778,113.164 873.458,114.031 875.26,114.11C877.633,114.11 879.873,112.233 881.98,108.48C883.972,105.119 885.214,101.366 885.62,97.48C885.775,96.579 885.589,95.652 885.1,94.88C884.626,94.267 883.873,93.932 883.1,93.99C881.873,94.101 880.712,94.594 879.78,95.4C878.057,96.636 876.516,98.107 875.2,99.77C874.127,101.443 873.308,103.266 872.77,105.18L870.67,111.74Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M906.8,107.82L907.66,109.15C902.413,113.817 898.06,116.15 894.6,116.15C893.388,116.242 892.214,115.69 891.51,114.7C890.86,113.7 890.62,112.2 890.81,110.07C891.32,105.432 893.045,101.009 895.81,97.25C899.143,92.41 902.81,89.993 906.81,90C907.953,89.904 909.086,90.293 909.93,91.07C910.636,91.871 910.951,92.945 910.79,94C910.62,95.42 910.036,96.76 909.11,97.85C907.67,99.476 905.937,100.816 904,101.8C902.79,102.47 900.24,103.66 896.33,105.38C896.07,106.397 895.893,107.434 895.8,108.48C895.6,109.497 895.741,110.551 896.2,111.48C896.635,112.066 897.343,112.388 898.07,112.33C899.02,112.297 899.951,112.058 900.8,111.63C902.905,110.533 904.912,109.258 906.8,107.82ZM896.8,103.46C899.575,102.347 902.138,100.768 904.38,98.79C905.42,97.908 906.105,96.678 906.31,95.33C906.424,94.607 906.252,93.868 905.83,93.27C905.432,92.758 904.808,92.47 904.16,92.5C903.35,92.532 902.573,92.831 901.95,93.35C900.825,94.255 899.925,95.409 899.32,96.72C898.236,98.867 897.394,101.127 896.81,103.46L896.8,103.46Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M928.15,90.07C929.987,90.02 931.73,90.901 932.78,92.41C933.92,93.983 934.37,96.16 934.13,98.94C933.703,103.479 931.696,107.728 928.46,110.94C925.067,114.48 921.65,116.25 918.21,116.25C916.331,116.358 914.507,115.575 913.29,114.14C912.05,112.499 911.53,110.422 911.85,108.39C912.231,104.143 913.821,100.092 916.43,96.72C919.797,92.28 923.703,90.063 928.15,90.07ZM925.43,92.32C923.75,92.32 922.02,93.54 920.24,95.98C918.45,98.42 917.38,101.78 917,106.08C916.691,108.181 917.008,110.327 917.91,112.25C918.411,113.277 919.468,113.922 920.61,113.9C922.27,113.9 923.873,112.857 925.42,110.77C927.492,107.797 928.7,104.308 928.91,100.69C929.17,97.683 928.957,95.537 928.27,94.25C927.791,93.102 926.673,92.343 925.43,92.32Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M937.52,97.53L936.52,96.33C938.172,94.412 940.124,92.774 942.3,91.48C943.716,90.586 945.33,90.05 947,89.92C947.414,89.889 947.823,90.022 948.14,90.29C948.423,90.58 948.547,90.992 948.47,91.39C948.417,91.997 948.303,92.596 948.13,93.18C947.94,93.79 947.42,95.24 946.54,97.53C948.629,95.47 950.869,93.568 953.24,91.84C954.789,90.752 956.61,90.115 958.5,90C959.511,90 960.445,90.553 960.93,91.44C961.599,92.789 961.827,94.315 961.58,95.8C961.071,100.87 959.097,105.683 955.9,109.65C952.567,114.023 949.077,116.21 945.43,116.21C943.964,116.198 942.528,115.794 941.27,115.04L937.87,124.97C937.692,125.445 937.568,125.938 937.5,126.44C937.389,127.062 937.661,127.694 938.19,128.04C939.856,128.761 941.637,129.178 943.45,129.27L942.93,130.77C939.77,130.51 937.29,130.38 935.47,130.38C933.65,130.38 931.15,130.51 928.14,130.77L928.66,129.27C929.895,129.221 931.083,128.78 932.05,128.01C933.002,126.973 933.688,125.72 934.05,124.36L941.41,101.52C942.79,97.273 943.503,94.907 943.55,94.42C943.55,93.9 943.37,93.64 942.87,93.64C941.977,93.647 940.193,94.943 937.52,97.53ZM942.28,111.74C943.386,113.161 945.061,114.028 946.86,114.11C949.227,114.11 951.47,112.233 953.59,108.48C955.574,105.115 956.815,101.364 957.23,97.48C957.382,96.578 957.193,95.651 956.7,94.88C956.226,94.267 955.473,93.932 954.7,93.99C953.473,94.101 952.312,94.594 951.38,95.4C949.659,96.639 948.118,98.109 946.8,99.77C945.727,101.442 944.911,103.266 944.38,105.18L942.28,111.74Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M975.18,108.12L976.09,109.21C974.311,111.021 972.335,112.627 970.2,114C967.967,115.447 966.17,116.173 964.81,116.18C964.239,116.201 963.694,115.934 963.36,115.47C962.978,114.9 962.825,114.208 962.93,113.53C963.07,111.93 963.973,108.597 965.64,103.53L970,90.37C970.986,87.069 972.251,83.857 973.78,80.77C975.128,78.377 977.089,76.386 979.46,75C981.662,73.699 984.172,73.008 986.73,73C987.432,72.953 988.126,73.175 988.67,73.62C989.103,73.991 989.324,74.554 989.26,75.12C989.221,75.748 988.915,76.331 988.42,76.72C987.806,77.164 987.057,77.383 986.3,77.34C985.463,77.312 984.63,77.211 983.81,77.04C982.948,76.886 982.075,76.806 981.2,76.8C980.539,76.761 979.883,76.937 979.33,77.3C978.49,78.138 977.866,79.168 977.51,80.3C976.923,81.84 975.923,84.873 974.51,89.4L970.4,102C968.4,108.32 967.38,111.623 967.34,111.91C967.28,112.577 967.48,112.91 967.94,112.91C968.66,112.816 969.346,112.548 969.94,112.13C971.811,110.964 973.566,109.621 975.18,108.12Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M993,107.82L993.86,109.15C988.613,113.817 984.26,116.15 980.8,116.15C979.588,116.246 978.411,115.694 977.71,114.7C977.05,113.7 976.81,112.2 977,110.07C977.516,105.433 979.24,101.012 982,97.25C985.3,92.41 988.967,89.993 993,90C994.104,89.942 995.186,90.331 996,91.08C996.702,91.883 997.013,92.956 996.85,94.01C996.689,95.431 996.107,96.771 995.18,97.86C993.733,99.48 991.997,100.816 990.06,101.8C988.86,102.47 986.3,103.66 982.4,105.38C982.142,106.398 981.962,107.435 981.86,108.48C981.662,109.498 981.806,110.553 982.27,111.48C982.704,112.067 983.412,112.39 984.14,112.33C985.087,112.297 986.015,112.058 986.86,111.63C989.013,110.54 991.067,109.265 993,107.82ZM983,103.46C985.778,102.347 988.345,100.768 990.59,98.79C991.626,97.905 992.311,96.677 992.52,95.33C992.626,94.606 992.451,93.868 992.03,93.27C991.632,92.758 991.008,92.47 990.36,92.5C989.553,92.533 988.779,92.832 988.16,93.35C987.029,94.252 986.125,95.406 985.52,96.72C984.441,98.87 983.596,101.13 983,103.46Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M1019.88,88.35L1018.43,87.6C1019.75,85.059 1021.6,82.827 1023.85,81.05C1025.54,79.864 1027.56,79.229 1029.63,79.23C1031.81,79.102 1033.93,79.993 1035.37,81.64C1036.7,83.196 1037.33,85.235 1037.11,87.27C1036.96,88.661 1036.57,90.015 1035.95,91.27C1035.16,92.829 1034.15,94.267 1032.95,95.54C1030.74,97.71 1028.4,99.75 1025.95,101.65C1021.99,104.725 1018.31,108.142 1014.95,111.86C1017.54,111.73 1020.22,111.67 1022.95,111.67C1023.84,111.67 1024.61,111.67 1025.26,111.67C1026.28,111.798 1027.32,111.649 1028.26,111.24C1029.41,110.255 1030.4,109.098 1031.2,107.81L1033.2,107.81C1031.22,110.353 1029.57,113.135 1028.29,116.09C1026.84,115.818 1025.37,115.621 1023.9,115.5C1022.35,115.37 1020.72,115.31 1019,115.31C1017,115.31 1014,115.44 1010,115.7L1010.76,113.8C1013.4,110.454 1016.38,107.378 1019.63,104.62C1022.25,102.405 1024.74,100.042 1027.09,97.54C1028.56,95.866 1029.81,94.011 1030.8,92.02C1031.4,90.856 1031.77,89.591 1031.9,88.29C1032.13,86.759 1031.75,85.198 1030.83,83.95C1030.01,82.889 1028.72,82.283 1027.38,82.32C1026.08,82.366 1024.82,82.821 1023.79,83.62C1022.2,84.94 1020.88,86.544 1019.88,88.35Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M1040.49,108.85C1041.21,108.828 1041.91,109.156 1042.35,109.73C1042.84,110.37 1043.05,111.181 1042.94,111.98C1042.89,113.105 1042.48,114.184 1041.76,115.05C1041.16,115.754 1040.28,116.16 1039.35,116.16C1038.63,116.183 1037.94,115.877 1037.48,115.33C1036.99,114.74 1036.77,113.969 1036.88,113.21C1036.97,111.985 1037.46,110.823 1038.27,109.9C1038.81,109.225 1039.63,108.836 1040.49,108.85Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M1069.63,79.29C1072.2,79.168 1074.66,80.364 1076.16,82.46C1077.68,84.56 1078.26,87.72 1077.89,91.91C1077.37,97.865 1075.35,103.593 1072.01,108.55C1068.6,113.683 1064.79,116.25 1060.59,116.25C1058.16,116.274 1055.88,115.03 1054.59,112.97C1053.07,110.783 1052.48,107.783 1052.81,103.97C1053.23,99.447 1054.48,95.04 1056.5,90.97C1058.57,86.73 1060.75,83.73 1063.04,81.97C1064.87,80.363 1067.19,79.419 1069.63,79.29ZM1068.94,81.07C1067.72,81.07 1066.39,81.897 1064.94,83.55C1063.49,85.203 1062.05,88.237 1060.61,92.65C1059.22,96.734 1058.31,100.966 1057.9,105.26C1057.62,108.467 1057.87,110.8 1058.66,112.26C1059.45,113.73 1060.44,114.46 1061.66,114.46C1062.91,114.366 1064.07,113.797 1064.91,112.87C1066.57,111.283 1068.2,108.283 1069.81,103.87C1071.39,99.609 1072.4,95.157 1072.81,90.63C1073.11,87.19 1072.82,84.62 1071.94,82.92C1071.4,81.761 1070.22,81.031 1068.94,81.07Z',
          fill: '#015792', fillRule: 'nonzero' }),
        _react2.default.createElement('path', { d: 'M694.59,133.56C693.915,133.56 693.36,133.005 693.36,132.33L693.36,57.41C693.36,56.735 693.915,56.18 694.59,56.18C695.265,56.18 695.82,56.735 695.82,57.41L695.82,132.33C695.82,133.005 695.265,133.56 694.59,133.56Z',
          fill: '#005792', fillRule: 'nonzero' })
      );
    }
  }]);

  return RepMeLogoFooter;
}(_react2.default.Component);

exports.default = RepMeLogoFooter;

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(278);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./mainFooter.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./mainFooter.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, "footer .footer-logo div {\n  display: flex;\n  flex-flow: row nowrap;\n  line-height: 20px;\n  justify-content: center; }\n  footer .footer-logo div .rep-me-logo--first-line {\n    margin-right: 10px;\n    font-size: 22px;\n    line-height: 26px;\n    margin-top: 12px;\n    margin-left: 5px span;\n      margin-left-line-height: 21px; }\n  footer .footer-logo div .rep-me-logo--second-line {\n    margin-top: 14px;\n    font-size: 20px; }\n\nfooter {\n  background-color: #f5f5f5;\n  border-top: 1px solid #c1c2c2;\n  font-family: Roboto, sans-serif;\n  flex: auto; }\n  footer .footer-logo {\n    text-align: center;\n    padding: 20px;\n    padding-top: 40px;\n    padding-bottom: 0; }\n  footer .social-nav {\n    color: #a7a7a7;\n    padding: 0 !important; }\n    footer .social-nav--icon {\n      font-size: 18px; }\n", ""]);

// exports


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _VoteForm = __webpack_require__(89);

var _VoteForm2 = _interopRequireDefault(_VoteForm);

var _Header = __webpack_require__(116);

var _Header2 = _interopRequireDefault(_Header);

var _BannerComponent = __webpack_require__(118);

var _BannerComponent2 = _interopRequireDefault(_BannerComponent);

var _MainFooter = __webpack_require__(121);

var _MainFooter2 = _interopRequireDefault(_MainFooter);

var _BarChartComponent = __webpack_require__(280);

var _BarChartComponent2 = _interopRequireDefault(_BarChartComponent);

var _chart = __webpack_require__(18);

var _chart2 = _interopRequireDefault(_chart);

var _BarChartComponent3 = __webpack_require__(284);

var _BarChartComponent4 = _interopRequireDefault(_BarChartComponent3);

var _ChartLabelComponent = __webpack_require__(120);

var _ChartLabelComponent2 = _interopRequireDefault(_ChartLabelComponent);

var _DemographicComponent = __webpack_require__(285);

var _DemographicComponent2 = _interopRequireDefault(_DemographicComponent);

var _RepresentativeCardComponent = __webpack_require__(288);

var _RepresentativeCardComponent2 = _interopRequireDefault(_RepresentativeCardComponent);

var _TitleBarComponent = __webpack_require__(293);

var _TitleBarComponent2 = _interopRequireDefault(_TitleBarComponent);

var _constants = __webpack_require__(122);

var _constants2 = _interopRequireDefault(_constants);

var _domToImage = __webpack_require__(29);

var _domToImage2 = _interopRequireDefault(_domToImage);

var _fileSaver = __webpack_require__(30);

var _fileSaver2 = _interopRequireDefault(_fileSaver);

var _results = __webpack_require__(296);

var _results2 = _interopRequireDefault(_results);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colorStops = _constants2.default.colorStops;

var BallotResults = function (_React$Component) {
  _inherits(BallotResults, _React$Component);

  function BallotResults(props) {
    _classCallCheck(this, BallotResults);

    var _this = _possibleConstructorReturn(this, (BallotResults.__proto__ || Object.getPrototypeOf(BallotResults)).call(this, props));

    _this.getColorStops = function () {
      var colorBuffer = [];
      colorStops.forEach(function (stop) {
        colorBuffer.push(stop.hex);
      });

      return colorBuffer.length ? colorBuffer : null;
    };

    _this.getFormattedData = function () {
      var textLabels = ['Strongly Disagree', "", "", "", "", 'Disagree', "", "", "", "", 'Neutral', "", "", "", "", 'Agree', "", "", "", "", 'Strongly Agree'];

      var formattedData = [];
      var formattedDataBuffer = [];
      var dataLabels = [];
      var param = _this.props.bill.data;

      // this.props.bill.data
      var sortBuffer = [];
      for (var prop in param) {
        if (param.hasOwnProperty(prop)) {
          sortBuffer.push({
            minOrder: Number(prop.split('-')[0]),
            maxOrder: Number(prop.split('-')[1]),
            label: prop,
            value: param[prop]
          });
        }
      }

      sortBuffer.sort(function (a, b) {
        return b.minOrder - a.minOrder;
      });

      sortBuffer.forEach(function (buffer) {
        formattedDataBuffer.push(buffer.value);
        dataLabels.push(buffer.label);
      });

      formattedDataBuffer.forEach(function (dataItem, index) {
        formattedData.push({
          y: dataItem,
          color: _this.getColorStops()[index]
        });
      });

      return {
        data: formattedData,
        textLabels: textLabels,
        dataLabels: dataLabels
      };
    };

    _this.getSampleDistrictResultsArray = function (resultType) {
      var voteResult = _this.props.vote;
      var getFormattedData = _this.getFormattedData(resultType);
      var setVoteIconPosition = _this.setVoteIconPosition;
      var param = _this.props.bill.data;
      var resultTypeCheck = resultType ? true : false;
      var results = {
        title: 'none',
        chart: {
          type: 'column',
          spacing: [0, 35, 0, 35]
        },
        plotOptions: {
          series: {
            groupPadding: 0,
            pointPadding: 0,
            colorsByPoint: true
          }
        },
        colors: _this.getColorStops(),
        series: [{
          data: getFormattedData.data,
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: '#FFFFFF',
            align: 'left',
            y: -30,
            useHTML: true,
            formatter: function formatter() {
              var pointWidth = Math.round(this.point.pointWidth);
              var results = '<div>' + ('<div style=\'width:' + pointWidth + 'px;text-align: center;position: absolute;left: -5px;color:' + (this.point.y < 3 ? 'black' : 'white') + '\'>' + this.point.y + '</div>') + '</div>';
              return this.point.y < 1 ? null : results;
            },
            style: {
              fontSize: '16px',
              fontFamily: 'Roboto, sans-serif'
            }
          }
        }],
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
            text: null
          },
          reversed: true,
          labels: {
            enabled: false
          },
          gridLineWidth: 0,
          tickAmount: 0
        },
        xAxis: {
          lineWidth: 0,
          tickAmount: 0,
          tickWidth: 0,
          gridLineWidth: 0,
          opposite: true,
          labels: {
            enabled: true,
            useHTML: true,
            autoRotation: [0],
            align: 'left',
            formatter: function formatter() {
              var positionTest = setVoteIconPosition({
                value: this.value,
                comparableValue: voteResult
              });
              var results = void 0;
              if (positionTest) {
                var barData = this.chart.series[0].data[this.pos];
                if (barData) {
                  var pointWidth = Math.floor(barData.pointWidth);
                  var positionLeft = -(pointWidth / 2);
                  var pointHeight = pointWidth * 2.7;
                  var positionTop = -1 * pointHeight + 20;
                  results = '<div style=" left: ' + positionLeft + 'px; position: absolute; width: ' + pointWidth + 'px; height:' + pointHeight + 'px; top: ' + positionTop + 'px; background-image:url(\'/images/yourVoteIcon.png\'); background-size:cover; background-repeat: no-repeat">' + '</div>';
                }
              } else {
                results = null;
              }
              return results;
            }
          },
          categories: getFormattedData.dataLabels
        }
      };
      return results;
    };

    _this.getStateDemographic = function () {
      if (_this.props.showDemographics && !_this.props.toImage) {
        return _react2.default.createElement(_DemographicComponent2.default, _this.state.repDemographics);
      }
      return null;
    };

    _this.styles = {
      print: {
        display: '' + (_this.props.toImage ? 'block' : 'none'),
        height: '' + (_this.props.toImage ? '100px' : '0'),
        background: 'white'
      }
    };


    _this.state = {
      repDemographics: {
        state: _this.props.user && _this.props.user.state ? _this.props.user.state : 'illinois',
        districtCity: _this.props.user && _this.props.user.city ? _this.props.user.city : 'chicago',
        stateCode: _this.props.state_code ? _this.props.state_code : 'IL'
      }
    };
    return _this;
  }

  _createClass(BallotResults, [{
    key: 'setVoteIconPosition',
    value: function setVoteIconPosition(data) {
      var voteRanges = [];
      var splitRange = data.value.split('-');
      var vote = data.comparableValue;
      if (Number(splitRange[0]) <= vote) {
        if (Number(splitRange[1]) >= vote) {
          return true;
        }
      } else {
        return false;
      }
    }
  }, {
    key: 'convertResultsToPng',
    value: function convertResultsToPng() {
      var node = document.getElementById('your-results');
      _domToImage2.default.toPng(node).then(function (dataUrl) {
        if (dataUrl) {
          _fileSaver2.default.saveAs(dataUrl, 'results.png');
        }
      }).catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.toImage) {
        setTimeout(function () {
          _this2.convertResultsToPng();
        }, 1000);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.bill.data !== nextProps.bill.data;
    }
  }, {
    key: 'render',
    value: function render() {
      var barChartData = {
        labels: this.getSampleDistrictResultsArray().xAxis.categories,
        datasets: [{
          label: 'Dataset 1',
          borderWidth: 1,
          data: this.getSampleDistrictResultsArray().series[0].data
        }]
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'ballot__results--barchart' },
          _react2.default.createElement(_TitleBarComponent2.default, { superTitle: null, title: this.props.resultsTitle }),
          this.getStateDemographic(),
          _react2.default.createElement(
            'div',
            { id: 'your-results' },
            _react2.default.createElement('div', { style: this.styles }),
            _react2.default.createElement(_ChartLabelComponent2.default, this.getFormattedData().textLabels),
            _react2.default.createElement(_BarChartComponent4.default, this.getSampleDistrictResultsArray())
          )
        )
      );
    }
  }]);

  return BallotResults;
}(_react2.default.Component);

exports.default = BallotResults;

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ChartsWrapperComponent = __webpack_require__(281);

var _ChartsWrapperComponent2 = _interopRequireDefault(_ChartsWrapperComponent);

var _barChartComponent = __webpack_require__(282);

var _barChartComponent2 = _interopRequireDefault(_barChartComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChart = function (_React$Component) {
  _inherits(BarChart, _React$Component);

  function BarChart(props) {
    _classCallCheck(this, BarChart);

    return _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, props));
  }

  _createClass(BarChart, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ChartsWrapperComponent2.default, _extends({
        chartType: 'bar',
        methodNames: ['getBarsAtEvent']
      }, this.props));
    }
  }]);

  return BarChart;
}(_react2.default.Component);

exports.default = BarChart;

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _chart = __webpack_require__(18);

var _chart2 = _interopRequireDefault(_chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartComponent = function (_React$Component) {
  _inherits(ChartComponent, _React$Component);

  function ChartComponent(props) {
    _classCallCheck(this, ChartComponent);

    var _this = _possibleConstructorReturn(this, (ChartComponent.__proto__ || Object.getPrototypeOf(ChartComponent)).call(this, props));

    _this.updatePoints = function (nextProps, chart, dataKey) {
      var name = chart.name;

      if (name === 'PolarArea' || name === 'Pie' || name === 'Doughnut') {
        nextProps.data.forEach(function (segment, segmentIndex) {
          if (!chart.segments[segmentIndex]) {
            chart.addData(segment);
          } else {
            Object.keys(segment).forEach(function (key) {
              chart.segments[segmentIndex][key] = segment[key];
            });
          }
        });

        while (nextProps.data.length < chart.segments.length) {
          chart.removeData();
        }
      } else if (name === "Radar") {
        chart.removeData();
        nextProps.data.datasets.forEach(function (set, setIndex) {
          set.data.forEach(function (val, pointIndex) {
            if (typeof chart.datasets[setIndex][dataKey][pointIndex] == "undefined") {
              addData(nextProps, chart, setIndex, pointIndex);
            } else {
              chart.datasets[setIndex][dataKey][pointIndex].value = val;
            }
          });
        });
      } else {
        while (chart.scale.xLabels.length > nextProps.data.labels.length) {
          chart.removeData();
        }
        nextProps.data.datasets.forEach(function (set, setIndex) {
          set.data.forEach(function (val, pointIndex) {
            if (typeof chart.datasets[setIndex][dataKey][pointIndex] == "undefined") {
              addData(nextProps, chart, setIndex, pointIndex);
            } else {
              chart.datasets[setIndex][dataKey][pointIndex].value = val;
            }
          });
        });
      }
    };

    _this.addData = function (nextProps, chart, setIndex, pointIndex) {
      var values = [];
      nextProps.data.datasets.forEach(function (set) {
        values.push(set.data[pointIndex]);
      });
      chart.addData(values, nextProps.data.labels[setIndex]);
    };

    _this.displayName = _this.props.chartType + 'Chart';
    _this.chart = {};
    _this.canvas = null;
    _this.excludedProps = ['data', 'options', 'redraw', 'chartType', 'methodNames', 'dataKeys'];
    return _this;
  }

  _createClass(ChartComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initializeChart();

      this.canvas = _reactDom2.default.findDOMNode(this);

      var extras = ['clear', 'stop', 'resize', 'toBase64Image', 'generateLegend', 'update', 'addData', 'removeData'],
          i = void 0;
      for (i = 0; i < extras.length; i++) {
        this.extra(extras[i]);
      }
      for (i = 0; i < this.props.methodNames.length; i++) {
        this.extra(this.props.methodNames[i]);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var chart = this.chart;
      if (chart) {
        chart.destroy();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var chart = this.chart;
      var dataKeys = this.props.dataKeys ? this.props.dataKeys : {
        'Line': 'points',
        'Radar': 'points',
        'Bar': 'bars'
      };

      if (nextProps.redraw) {
        chart.destroy();
        this.initializeChart(nextProps);
      } else {
        dataKey = dataKey || this.props.dataKeys[chart.name];
        updatePoints(nextProps, chart, dataKey);
        if (chart.scale) {
          chart.scale.xLabels = nextProps.data.labels;

          if (chart.scale.calculateXLabelRotation) {
            chart.scale.calculateXLabelRotation();
          }
        }
        chart.update();
      }
    }
  }, {
    key: 'initializeChart',
    value: function initializeChart() {
      var el = _reactDom2.default.findDOMNode(this);
      var ctx = el.getContext("2d");
      var chart = new _chart2.default(ctx, {
        type: this.props.chartType || 'bar',
        data: this.props.data || null,
        options: this.props.options || {}
      });
      this.chart = chart;
    }
  }, {
    key: 'extra',
    value: function extra(type) {
      this[type] = function () {
        return this.chart[type].apply(this.chart, arguments);
      };
    }
  }, {
    key: 'getChart',


    // return the chartjs instance
    value: function getChart() {
      return this.chart;
    }

    // return the canvass element that contains the chart

  }, {
    key: '_getCanvas',
    value: function _getCanvas() {
      return this.canvas;
    }
  }, {
    key: 'getCanvas',
    value: function getCanvas() {
      return this._getCanvas();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = {};
      for (var name in this.props) {
        if (this.props.hasOwnProperty(name)) {
          if (this.excludedProps.indexOf(name) === -1) {
            _props[name] = this.props[name];
          }
        }
      }
      return _react2.default.createElement('canvas', _props);
    }
  }]);

  return ChartComponent;
}(_react2.default.Component);

var CreateChart = function (_React$Component2) {
  _inherits(CreateChart, _React$Component2);

  function CreateChart(props) {
    _classCallCheck(this, CreateChart);

    return _possibleConstructorReturn(this, (CreateChart.__proto__ || Object.getPrototypeOf(CreateChart)).call(this, props));
  }

  _createClass(CreateChart, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(ChartComponent, this.props);
    }
  }]);

  return CreateChart;
}(_react2.default.Component);

exports.default = CreateChart;

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(283);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./barChartComponent.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./barChartComponent.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHighcharts = __webpack_require__(28);

var _reactHighcharts2 = _interopRequireDefault(_reactHighcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChartComponent = function (_React$Component) {
  _inherits(BarChartComponent, _React$Component);

  function BarChartComponent(props) {
    _classCallCheck(this, BarChartComponent);

    //passing in data set
    var _this = _possibleConstructorReturn(this, (BarChartComponent.__proto__ || Object.getPrototypeOf(BarChartComponent)).call(this, props));

    _this.config = {
      results: _this.props
    };
    return _this;
  }

  _createClass(BarChartComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //update chart data after render
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactHighcharts2.default, { config: this.props })
      );
    }
  }]);

  return BarChartComponent;
}(_react2.default.Component);

exports.default = BarChartComponent;

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _demographicComponent = __webpack_require__(286);

var _demographicComponent2 = _interopRequireDefault(_demographicComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StateDemographic = function (_React$Component) {
  _inherits(StateDemographic, _React$Component);

  function StateDemographic(props) {
    _classCallCheck(this, StateDemographic);

    return _possibleConstructorReturn(this, (StateDemographic.__proto__ || Object.getPrototypeOf(StateDemographic)).call(this, props));
  }

  _createClass(StateDemographic, [{
    key: 'render',
    value: function render() {
      var Component = this.props.component;
      var styles = {
        stateImg: {
          backgroundImage: 'url(\'' + ('/images/' + this.props.stateCode + '.svg') + '\')',
          width: '200px',
          height: '200px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'demo_data' },
          _react2.default.createElement(
            'div',
            { className: 'demo_data--data' },
            _react2.default.createElement(
              'div',
              { className: 'demo_data--data-point' },
              _react2.default.createElement(
                'span',
                null,
                'State:'
              ),
              _react2.default.createElement(
                'div',
                null,
                this.props.state
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'demo_data--data-point' },
              _react2.default.createElement(
                'span',
                null,
                'your District:'
              ),
              _react2.default.createElement(
                'div',
                null,
                this.props.districtCity
              )
            )
          ),
          _react2.default.createElement('div', {
            style: styles.stateImg,
            className: 'demo_data--icon' })
        )
      );
    }
  }]);

  return StateDemographic;
}(_react2.default.Component);

exports.default = StateDemographic;

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(287);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./demographicComponent.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./demographicComponent.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".demo_data {\n  font-family: \"Playfair Display\", serif;\n  display: flex;\n  flex-flow: row nowrap;\n  margin: auto;\n  padding: 0 30px 40px 30px;\n  justify-content: center; }\n  .demo_data--data {\n    display: flex;\n    flex-flow: column nowrap; }\n    .demo_data--data-point {\n      padding-bottom: 10px; }\n      .demo_data--data-point span {\n        font-size: 14px; }\n      .demo_data--data-point div {\n        text-transform: capitalize;\n        font-size: 28px;\n        font-weight: 600; }\n  .demo_data--icon {\n    max-width: 200px;\n    padding: 20px; }\n", ""]);

// exports


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = __webpack_require__(62);

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _Paper = __webpack_require__(54);

var _Paper2 = _interopRequireDefault(_Paper);

var _DemocraticLogo = __webpack_require__(289);

var _DemocraticLogo2 = _interopRequireDefault(_DemocraticLogo);

var _RepublicanLogo = __webpack_require__(290);

var _RepublicanLogo2 = _interopRequireDefault(_RepublicanLogo);

var _representativeCardComponent = __webpack_require__(291);

var _representativeCardComponent2 = _interopRequireDefault(_representativeCardComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepCard = function (_React$Component) {
  _inherits(RepCard, _React$Component);

  function RepCard(props) {
    _classCallCheck(this, RepCard);

    var _this = _possibleConstructorReturn(this, (RepCard.__proto__ || Object.getPrototypeOf(RepCard)).call(this, props));

    _this.toCapitalize = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    _this.getPartyLogo = function () {
      if (_this.props.party === 'democratic') {
        return _react2.default.createElement(_DemocraticLogo2.default, null);
      }
      if (_this.props.party === 'republican') {
        return _react2.default.createElement(_RepublicanLogo2.default, null);
      }
    };

    return _this;
  }

  _createClass(RepCard, [{
    key: 'render',
    value: function render() {
      var Component = this.props.component;
      return _react2.default.createElement(
        _MuiThemeProvider2.default,
        null,
        _react2.default.createElement(
          _Paper2.default,
          { className: 'rep__card',
            style: {
              boxSizing: 'unset',
              backgroundColor: '' + (this.props.voted ? 'green' : 'red')
            },
            zDepth: 2 },
          _react2.default.createElement(
            'div',
            { className: 'rep__card--profile' },
            _react2.default.createElement(
              'div',
              { className: 'rep__card--profile-title' },
              _react2.default.createElement(
                'span',
                { className: 'rep__card--profile-position' },
                this.props.position
              ),
              _react2.default.createElement(
                'span',
                null,
                this.props.firstName
              ),
              _react2.default.createElement(
                'span',
                null,
                this.props.lastName
              )
            ),
            _react2.default.createElement('div', {
              className: 'rep__card--profile-profile-img',
              style: { backgroundImage: 'url(' + this.props.profileImg + ')' }
            }),
            _react2.default.createElement(
              'div',
              { className: 'rep__card--profile-profile-description' },
              _react2.default.createElement(
                'div',
                { className: 'rep__card--profile-party-icon' },
                this.getPartyLogo()
              ),
              _react2.default.createElement(
                'span',
                null,
                this.toCapitalize(this.props.party) + ' Party'
              ),
              _react2.default.createElement(
                'span',
                null,
                '-'
              ),
              _react2.default.createElement(
                'span',
                null,
                'Member of the U.S. ' + this.toCapitalize(this.props.body) + ' \n                  from ' + this.toCapitalize(this.props.state) + '\'s\n                  ' + this.props.district + 'th District'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'rep__card--vote-data' },
            _react2.default.createElement(
              'div',
              { className: 'rep__card--voted' },
              _react2.default.createElement(
                'div',
                null,
                'voted for this bill'
              ),
              _react2.default.createElement('i', { className: '' + (this.props.voted ? 'ion-checkmark' : 'ion-close') })
            ),
            _react2.default.createElement('div', { className: 'rep__card--voting-divider' }),
            _react2.default.createElement(
              'div',
              { className: 'rep__card--voting-parity' },
              _react2.default.createElement(
                'div',
                null,
                'In the Past: Voted'
              ),
              _react2.default.createElement(
                'div',
                { className: 'rep__card--voting-parity-amount' },
                (this.props.votingParity / 1 * 100 || 0) + '%'
              ),
              _react2.default.createElement(
                'div',
                null,
                'of the times on the same side as you!'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'rep__card--voting-state' },
              _react2.default.createElement(
                'div',
                { className: 'rep__card--voting-state-wrapper' },
                _react2.default.createElement(Component, null)
              )
            )
          )
        )
      );
    }
  }]);

  return RepCard;
}(_react2.default.Component);

var RepresentativeCard = function (_React$Component2) {
  _inherits(RepresentativeCard, _React$Component2);

  function RepresentativeCard(props) {
    _classCallCheck(this, RepresentativeCard);

    return _possibleConstructorReturn(this, (RepresentativeCard.__proto__ || Object.getPrototypeOf(RepresentativeCard)).call(this, props));
  }

  _createClass(RepresentativeCard, [{
    key: 'render',
    value: function render() {
      var Component = this.props.component;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'rep_card--wrapper' },
          this.props.votes.map(function (vote, index) {
            return _react2.default.createElement(RepCard, _extends({ component: Component, key: index }, vote));
          })
        )
      );
    }
  }]);

  return RepresentativeCard;
}(_react2.default.Component);

exports.default = RepresentativeCard;

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DemocraticLogo = function (_React$Component) {
  _inherits(DemocraticLogo, _React$Component);

  function DemocraticLogo(props) {
    _classCallCheck(this, DemocraticLogo);

    return _possibleConstructorReturn(this, (DemocraticLogo.__proto__ || Object.getPrototypeOf(DemocraticLogo)).call(this, props));
  }

  _createClass(DemocraticLogo, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        { width: "100%", height: "100%", viewBox: "0 0 320 312", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink",
          xmlSpace: "preserve",
          style: {
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            strokeLinejoin: 'round',
            strokeMiterlimit: '1.41421' } },
        _react2.default.createElement("path", { id: "rect4483", d: "M54.379,4.191C54.224,4.2 54.068,4.232 53.914,4.285C53.76,4.338 53.606,4.412 53.451,4.508C53.339,4.577 53.198,4.706 53.033,4.885C52.703,5.243 52.276,5.808 51.785,6.527C51.54,6.887 51.279,7.284 51.006,7.715C50.459,8.576 49.866,9.567 49.258,10.633C48.649,11.699 48.026,12.84 47.422,14.008C46.913,14.99 46.463,15.869 46.064,16.668C45.666,17.467 45.319,18.187 45.018,18.852C44.716,19.516 44.458,20.126 44.24,20.705C43.804,21.863 43.522,22.9 43.34,24.012C43.066,25.679 43.016,27.512 43.012,30.178C43.011,30.893 43.005,31.557 42.99,32.172C42.976,32.787 42.953,33.354 42.924,33.877C42.806,35.968 42.561,37.357 42.145,38.318C42.04,38.559 41.926,38.772 41.799,38.963C41.672,39.154 41.533,39.322 41.383,39.473C41.208,39.648 41.048,39.803 40.896,39.936C40.594,40.201 40.329,40.38 40.068,40.479C39.938,40.528 39.811,40.556 39.678,40.564C39.412,40.581 39.132,40.515 38.803,40.371C38.638,40.299 38.461,40.207 38.268,40.096C38.074,39.984 37.864,39.855 37.633,39.705C37.469,39.599 37.298,39.466 37.121,39.313C36.766,39.005 36.387,38.605 35.984,38.117C35.38,37.385 34.726,36.457 34.035,35.359C33.575,34.627 33.099,33.819 32.609,32.941C31.631,31.186 30.603,29.153 29.555,26.896C28.506,24.64 27.438,22.16 26.381,19.512C25.504,17.315 24.542,15.214 23.699,13.6C23.067,12.389 22.502,11.451 22.09,10.951C21.952,10.785 21.831,10.665 21.73,10.602C21.588,10.512 21.446,10.433 21.305,10.365C21.163,10.298 21.022,10.241 20.881,10.195C20.74,10.149 20.599,10.114 20.459,10.09C19.76,9.967 19.077,10.108 18.42,10.488C18.157,10.64 17.9,10.831 17.646,11.059C16.634,11.967 15.704,13.461 14.908,15.439C14.51,16.429 14.145,17.54 13.82,18.758C13.658,19.367 13.505,20.003 13.363,20.664C12.939,22.648 12.612,24.862 12.402,27.26C12.333,28.059 12.275,28.878 12.232,29.717C12.133,31.678 12.092,33.388 12.141,34.928C12.157,35.441 12.184,35.935 12.221,36.414C12.331,37.85 12.539,39.145 12.875,40.381C12.987,40.793 13.113,41.198 13.254,41.6C13.678,42.805 14.237,43.978 14.963,45.203C15.205,45.611 15.466,46.025 15.746,46.447C16.866,48.138 18.299,49.968 20.111,52.133C21.181,53.41 22.154,54.78 22.859,55.959C23.036,56.254 23.196,56.538 23.336,56.805C23.757,57.604 24.003,58.255 24.004,58.639C24.006,59.662 22.376,63.724 20.379,67.664C19.955,68.501 19.578,69.253 19.244,69.951C18.91,70.649 18.618,71.294 18.361,71.914C17.848,73.155 17.475,74.302 17.188,75.6C16.612,78.196 16.38,81.397 16.059,87.164C15.912,89.792 15.772,91.924 15.609,93.711C15.447,95.498 15.262,96.939 15.025,98.188C14.907,98.812 14.776,99.386 14.629,99.932C14.482,100.478 14.318,100.994 14.135,101.5C13.951,102.006 13.746,102.502 13.52,103.006C13.293,103.509 13.043,104.02 12.766,104.559C12.4,105.269 12.035,106.082 11.678,106.977C11.32,107.871 10.968,108.846 10.629,109.877C10.29,110.908 9.964,111.995 9.654,113.117C9.345,114.239 9.054,115.395 8.785,116.561C7.979,120.058 7.377,123.648 7.127,126.703C7.085,127.212 7.055,127.707 7.033,128.184C7.012,128.66 7,129.119 7,129.557C7,130.039 7.009,130.481 7.027,130.889C7.046,131.297 7.074,131.671 7.117,132.02C7.374,134.108 8.122,135.245 9.982,136.982C10.448,137.417 11.019,137.845 11.676,138.26C12.333,138.674 13.074,139.074 13.877,139.455C14.68,139.836 15.545,140.197 16.447,140.531C17.35,140.865 18.291,141.171 19.248,141.445C20.683,141.857 22.153,142.194 23.582,142.434C25.963,142.833 28.23,142.965 30.021,142.725C30.376,142.677 30.739,142.616 31.109,142.543C31.851,142.397 32.624,142.2 33.418,141.959C35.403,141.356 37.521,140.473 39.625,139.385C40.467,138.95 41.306,138.482 42.133,137.986C43.787,136.995 45.394,135.895 46.877,134.721C47.619,134.134 48.33,133.528 49,132.91C52.041,130.107 54.04,128.298 55.512,127.189C56.247,126.635 56.85,126.256 57.387,126.014C57.566,125.933 57.738,125.868 57.904,125.816C58.237,125.714 58.548,125.668 58.859,125.666C59.015,125.665 59.171,125.673 59.328,125.693C59.485,125.713 59.645,125.745 59.809,125.783C60.136,125.86 60.483,125.97 60.865,126.104C61.233,126.232 61.618,126.399 62.018,126.604C62.417,126.808 62.833,127.046 63.26,127.32C63.686,127.594 64.124,127.902 64.572,128.24C66.366,129.592 68.316,131.434 70.262,133.578C70.748,134.114 71.235,134.669 71.719,135.24C72.202,135.811 72.682,136.398 73.158,136.998C73.634,137.598 74.105,138.211 74.568,138.834C77.348,142.574 79.854,146.683 81.555,150.529L83.975,156L290.842,156L291.412,153.25C291.619,152.253 291.82,151.242 292.014,150.221C292.208,149.2 292.396,148.167 292.576,147.131C292.937,145.058 293.27,142.963 293.572,140.879C293.875,138.794 294.146,136.721 294.385,134.691C295.1,128.603 295.513,122.913 295.543,118.521C295.548,117.79 295.542,117.095 295.525,116.439C295.509,115.784 295.482,115.169 295.443,114.598C295.366,113.456 295.242,112.491 295.07,111.738C294.896,110.972 294.689,110.19 294.449,109.396C294.21,108.603 293.939,107.797 293.641,106.984C293.043,105.359 292.333,103.703 291.535,102.051C291.136,101.225 290.714,100.399 290.273,99.578C289.833,98.758 289.373,97.943 288.896,97.137C287.944,95.524 286.928,93.95 285.869,92.445C284.281,90.188 282.6,88.089 280.904,86.262C280.339,85.653 279.772,85.074 279.207,84.529C277.511,82.896 275.827,81.573 274.236,80.672C273.971,80.522 273.709,80.384 273.449,80.258C273.19,80.132 272.933,80.017 272.68,79.916C270.931,79.218 266.652,77.366 263.17,75.799C261.878,75.217 260.688,74.698 259.582,74.236C258.476,73.775 257.453,73.37 256.492,73.021C255.532,72.673 254.634,72.378 253.779,72.135C252.924,71.891 252.112,71.699 251.322,71.553C249.348,71.188 247.514,71.117 245.51,71.283C245.109,71.316 244.702,71.359 244.285,71.41C243.451,71.513 242.578,71.653 241.648,71.824C240.506,72.035 239.323,72.273 238.08,72.545C236.837,72.817 235.535,73.122 234.15,73.467C231.382,74.156 228.288,75.005 224.705,76.061C221.122,77.116 217.049,78.379 212.32,79.898C209.956,80.658 207.426,81.483 204.713,82.377C202,83.271 199.103,84.235 196,85.275L174.5,92.484L158,92.492C155.562,92.493 153.417,92.49 151.504,92.461C150.547,92.446 149.649,92.427 148.801,92.396C145.409,92.276 142.826,92.007 140.564,91.42C139.999,91.273 139.453,91.107 138.92,90.918C137.854,90.539 136.841,90.07 135.814,89.488C135.301,89.197 134.786,88.879 134.26,88.529C133.734,88.18 133.197,87.799 132.643,87.385C132.089,86.971 131.517,86.523 130.92,86.039C130.323,85.556 129.699,85.037 129.043,84.479C127.731,83.361 126.289,82.088 124.652,80.639C121.842,78.149 119.302,75.922 116.979,73.918C114.655,71.914 112.549,70.134 110.6,68.543C105.726,64.566 101.843,61.767 98.066,59.584C96.556,58.711 95.063,57.937 93.529,57.225C89.696,55.444 85.615,54.054 80.4,52.49C79.177,52.123 77.948,51.744 76.775,51.373C75.603,51.002 74.487,50.639 73.486,50.305C72.486,49.97 71.6,49.666 70.893,49.408C70.185,49.151 69.656,48.941 69.361,48.801C69.154,48.702 68.955,48.596 68.766,48.482C67.439,47.686 66.541,46.508 66.023,44.797C65.876,44.308 65.759,43.777 65.672,43.197C65.629,42.907 65.593,42.605 65.564,42.291C65.422,40.722 65.463,38.845 65.672,36.607C65.739,35.892 65.791,35.237 65.826,34.617C66.037,30.898 65.605,28.493 63.66,22.574C63.336,21.588 62.969,20.503 62.557,19.299C62.021,17.735 61.518,16.307 61.039,15.008C60.56,13.709 60.106,12.541 59.676,11.494C59.245,10.448 58.837,9.524 58.447,8.717C58.057,7.91 57.686,7.218 57.328,6.637C57.149,6.346 56.973,6.084 56.801,5.848C55.939,4.665 55.153,4.146 54.379,4.191ZM110.021,107.49L114.744,122.02L130.023,122.02L117.662,131.002L122.383,145.531L110.021,136.553L97.662,145.531L102.383,131.002L90.021,122.02L105.301,122.02L110.021,107.49ZM161.922,107.49L166.645,122.02L181.922,122.02L169.563,131.002L174.283,145.531L161.922,136.553L149.561,145.531L154.281,131.002L141.922,122.02L157.201,122.02L161.922,107.49ZM214.021,107.49L218.744,122.02L234.021,122.02L221.662,131.002L226.383,145.531L214.021,136.553L201.662,145.531L206.383,131.002L194.021,122.02L209.301,122.02L214.021,107.49ZM264.699,107.49L269.422,122.02L284.701,122.02L272.34,131.002L277.061,145.531L264.699,136.553L252.34,145.531L257.061,131.002L244.699,122.02L259.979,122.02L264.699,107.49Z",
          style: {
            fill: 'rgb(3,27,187)',
            fillRule: 'nonzero' }
        }),
        _react2.default.createElement("rect", { id: "rect4487", x: "137.169", y: "103.754", width: "0.185", height: "3.785",
          style: { fill: 'rgb(3,27,187)' } }),
        _react2.default.createElement("path", { id: "path4160", d: "M252.142,306.626C248.967,306.003 245.251,303.617 244.199,301.525C242.818,298.778 243.735,297.262 251.68,289.151L258.887,281.794L259.428,275.623C260.078,268.209 260.089,268.155 262.425,261.245L264.279,255.763L263.913,239.35L263.547,222.937L258.131,211.936C255.152,205.885 251.858,199.936 250.81,198.715C248.563,196.098 246.848,195.811 245.526,197.829C244.725,199.05 244.719,199.39 245.452,201.876C245.892,203.369 247.22,207.101 248.402,210.169C250.809,216.415 251.026,218.685 249.516,221.805C248.579,223.741 241.83,230.707 231.624,240.274L228.099,243.578L228.099,252.339C228.099,262.379 228.192,262.119 222.341,268.387C218.48,272.522 215.236,277.084 211.64,283.434C208.191,289.523 205.247,293.814 203.97,294.611C202.415,295.582 195.199,296.359 191.025,296.005C180.501,295.111 177.147,291.059 181.272,284.221C182.225,282.641 187.258,275.57 192.457,268.506C206.609,249.276 209.301,244.848 209.301,240.795C209.301,239.959 210.123,237.145 211.128,234.542C212.23,231.689 212.956,228.891 212.956,227.496C212.956,224.424 210.729,218.672 205.092,207.181C199.341,195.459 198.055,193.611 195.086,192.802C192.306,192.045 185.816,192.453 178.451,193.847C170.872,195.282 166.995,195.759 152.69,197.018C145.822,197.623 139.759,198.355 139.216,198.646C137.058,199.801 130.893,211.295 128.382,218.847C125.994,226.03 125.113,231.129 125.073,238.009C125.039,243.819 125.175,244.712 126.934,250.28C127.978,253.582 129.309,257.937 129.892,259.957C131.07,264.038 132.24,265.42 137.502,268.942C141.64,271.712 142.666,272.897 142.276,274.452C141.576,277.24 124.412,296.231 122.592,296.231C122.134,296.231 120.603,295.408 119.189,294.403C116.377,292.404 114.076,292.035 113.483,293.489C113.278,293.992 112.925,296.015 112.698,297.986C112.461,300.042 111.939,301.914 111.472,302.381C110.44,303.413 98.916,303.96 87.813,303.504C80.676,303.211 80.094,303.109 79.197,302.002C78.669,301.349 78.236,300.163 78.236,299.366C78.236,296.599 82.522,289.091 91.204,276.649C92.836,274.311 93.515,272.722 93.883,270.383C94.155,268.66 94.754,264.839 95.216,261.891C95.678,258.944 96.688,254.832 97.459,252.753C98.85,249.006 98.861,248.869 98.764,236.451C98.667,224.002 97.975,213.237 96.952,208.245C96.657,206.809 94.559,198.467 92.289,189.708C86.902,168.919 85.999,164.753 86.773,164.251C87.103,164.036 132.538,163.798 187.739,163.721L288.104,163.581L288.677,165.809C289.922,170.647 290.892,173.008 293.513,177.581C298.833,186.864 306.284,195.955 309.487,197.072C313.745,198.556 315.034,211.152 311.699,218.692C310.237,221.997 309.339,221.712 307.979,217.513C307.351,215.575 306.081,212.69 305.156,211.103C302.995,207.392 302.25,205.212 302.236,202.554C302.219,199.42 300.786,196.779 296.397,191.797C291.158,185.849 287.375,182.397 286.096,182.397C285.438,182.397 284.717,183.028 284.175,184.076C283.449,185.478 283.357,186.785 283.612,192.039C283.948,198.956 285.247,205.683 288.857,219.211C293.153,235.303 293.192,239.538 289.095,245.08C287.654,247.027 287.175,251.467 286.633,267.886L286.146,282.62L281.351,290.6C275.217,300.809 273.406,303.16 270.45,304.754C266.517,306.874 257.903,307.755 252.142,306.626L252.142,306.626Z",
          style: {
            fill: 'rgb(255,0,0)',
            fillRule: 'nonzero' } })
      );
    }
  }]);

  return DemocraticLogo;
}(_react2.default.Component);

exports.default = DemocraticLogo;

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepublicanLogo = function (_React$Component) {
  _inherits(RepublicanLogo, _React$Component);

  function RepublicanLogo(props) {
    _classCallCheck(this, RepublicanLogo);

    return _possibleConstructorReturn(this, (RepublicanLogo.__proto__ || Object.getPrototypeOf(RepublicanLogo)).call(this, props));
  }

  _createClass(RepublicanLogo, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        { width: "100%",
          height: "100%",
          viewBox: "0 0 600 521",
          version: "1.1",
          xmlns: "http://www.w3.org/2000/svg",
          xmlnsXlink: "http://www.w3.org/1999/xlink",
          xmlSpace: "preserve",
          style: {
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            strokeLinejoin: 'round',
            strokeMiterlimit: '1.41421'
          } },
        _react2.default.createElement(
          "g",
          { id: "layer1" },
          _react2.default.createElement("path", { id: "back",
            d: "M25.557,181.244C25.559,217.708 26.808,220.645 48.107,220.581C69.176,220.516 485.025,220.076 485.331,220.08C501.606,220.282 505.954,216.326 505.876,188.51C505.473,42.935 413.172,9.928 264.088,10.864C136.305,11.666 25.547,40.414 25.557,181.244Z",
            style: {
              fill: 'rgb(20,4,189)'
            }
          }),
          _react2.default.createElement(
            "g",
            { id: "star1", transform: "matrix(1,0,0,1,-0.501116,-1.75391)" },
            _react2.default.createElement("path", { d: "M127.785,186.255L113.337,142.791L67.734,142.626L104.606,115.454L90.671,72.032L127.907,98.703L164.898,72.032L151.039,115.687L187.835,142.626L142.034,142.935L127.785,186.255Z",
              style: {
                fill: 'white'
              }
            })
          ),
          _react2.default.createElement(
            "g",
            { id: "star2", transform: "matrix(1,0,0,1,139.31,-2.27102)" },
            _react2.default.createElement("path", { d: "M127.785,186.255L113.337,142.791L67.734,142.626L104.606,115.454L90.671,72.032L127.907,98.703L164.898,72.032L151.039,115.687L187.835,142.626L142.034,142.935L127.785,186.255Z",
              style: {
                fill: 'white'
              }
            })
          ),
          _react2.default.createElement(
            "g",
            { id: "star3", transform: "matrix(1,0,0,1,278.871,-1.76991)" },
            _react2.default.createElement("path", { d: "M127.785,186.255L113.337,142.791L67.734,142.626L104.606,115.454L90.671,72.032L127.907,98.703L164.898,72.032L151.039,115.687L187.835,142.626L142.034,142.935L127.785,186.255Z",
              style: {
                fill: 'white'
              }
            })
          ),
          _react2.default.createElement("path", { id: "trunk", d: "M44.599,235.113C31.424,235.038 26.81,238.621 26.81,249.896C26.81,273.22 25.045,453.357 26.058,482.665C26.456,494.188 32.824,497.586 41.342,497.698C60.386,497.949 107.742,498.572 125.279,498.199C137.306,497.949 142.483,492.199 143.069,474.897C143.617,458.676 142.811,431.797 143.319,407.748C143.49,399.638 146.326,393.717 154.594,393.466C175.551,392.831 256.102,392.82 272.106,393.215C292.401,393.717 295.658,393.466 296.159,414.513C296.755,439.524 296.661,454.853 295.909,474.146C295.106,494.758 301.922,496.696 312.947,496.946C329.229,497.316 366.817,496.418 385.609,496.696C410.593,497.054 410.128,489.441 410.414,456.857C410.543,442.824 410.434,393.944 409.913,371.668C409.783,366.134 412.669,362.209 416.427,362.146C431.746,361.896 434.936,401.991 438.727,422.03C452.781,496.315 485.267,505.79 514.896,505.967C552.038,506.199 587.429,475.406 587.558,412.007C587.578,402.461 585.554,394.218 578.538,394.218C547.21,394.218 565.505,394.677 548.972,394.218C540.203,393.967 532.436,395.22 534.189,408.75C535.943,422.28 536.714,447.499 519.657,448.088C512.391,448.338 506.628,443.077 506.628,428.294C506.628,413.511 505.587,262.916 505.125,250.899C504.874,244.384 504.624,234.612 491.595,234.863C475.312,235.189 71.014,235.257 44.599,235.113Z",
            style: {
              fill: 'rgb(222,1,0)'
            }
          })
        )
      );
    }
  }]);

  return RepublicanLogo;
}(_react2.default.Component);

exports.default = RepublicanLogo;

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(292);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./representativeCardComponent.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./representativeCardComponent.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".rep_card--wrapper {\n  display: flex;\n  flex-flow: row wrap;\n  min-height: 660px;\n  padding: 40px 0;\n  justify-content: center; }\n\n@media (max-width: 1220px) {\n  .rep_card--wrapper {\n    display: flex;\n    flex-flow: column nowrap;\n    min-height: 660px;\n    padding: 40px 0;\n    justify-content: center;\n    align-items: center; }\n    .rep_card--wrapper .rep-card {\n      flex: 1; } }\n\n.rep__card {\n  flex: 0;\n  flex: auto;\n  display: flex;\n  flex-flow: row nowrap;\n  max-width: 550px;\n  min-height: 660px;\n  max-height: 660px;\n  background: beige;\n  margin: 20px;\n  font-family: Roboto, sans-serif;\n  padding: 20px; }\n  .rep__card--profile {\n    flex: 1 1 60%;\n    display: flex;\n    flex-flow: column nowrap;\n    background: white;\n    padding: 30px; }\n    .rep__card--profile-title {\n      display: flex;\n      flex-flow: column nowrap; }\n      .rep__card--profile-title span {\n        font-size: 48px;\n        font-weight: 700; }\n      .rep__card--profile-title .rep__card--profile-position {\n        font-size: 18px;\n        font-weight: 600;\n        color: #c1c2c2;\n        text-transform: uppercase; }\n    .rep__card--profile-profile-img {\n      margin: 25px 0;\n      width: 200px;\n      height: 200px;\n      border-radius: 200px;\n      overflow: hidden;\n      border: 15px solid #c1c2c2;\n      background-size: cover;\n      background-position: center; }\n    .rep__card--profile-party-icon {\n      max-width: 45px;\n      max-height: 45px;\n      padding: 5px 0; }\n    .rep__card--profile-profile-description {\n      display: flex;\n      flex-flow: column nowrap;\n      font-size: 18px; }\n      .rep__card--profile-profile-description div,\n      .rep__card--profile-profile-description span {\n        line-height: 25px; }\n  .rep__card--vote-data {\n    flex: 1 1 40%;\n    display: flex;\n    flex-flow: column nowrap; }\n  .rep__card--voting-divider {\n    height: 0;\n    border-left: 120px solid transparent;\n    border-right: 120px solid transparent;\n    border-bottom: 35px solid white; }\n  .rep__card--voted {\n    flex: 1 1 25%;\n    text-align: center;\n    padding: 30px 30px 20px 30px;\n    color: white; }\n    .rep__card--voted div {\n      text-transform: uppercase;\n      max-width: 100px;\n      font-size: 16px;\n      text-align: left; }\n    .rep__card--voted i {\n      font-size: 120px; }\n  .rep__card--voting-parity {\n    flex: 1 1 75%;\n    font-size: 22px;\n    display: flex;\n    flex-flow: column nowrap;\n    text-align: center;\n    padding: 40px 50px 20px 50px;\n    background: white; }\n    .rep__card--voting-parity-amount {\n      color: green;\n      font-size: 30px;\n      font-weight: 700; }\n  .rep__card--voting-state {\n    background: white;\n    display: flex;\n    flex-flow: row nowrap;\n    justify-content: center;\n    padding: 0px 0 20px 0; }\n    .rep__card--voting-state-wrapper {\n      width: 270px; }\n", ""]);

// exports


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _titleBarComponent = __webpack_require__(294);

var _titleBarComponent2 = _interopRequireDefault(_titleBarComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartTitleBarComponent = function (_React$Component) {
  _inherits(ChartTitleBarComponent, _React$Component);

  function ChartTitleBarComponent(props) {
    _classCallCheck(this, ChartTitleBarComponent);

    return _possibleConstructorReturn(this, (ChartTitleBarComponent.__proto__ || Object.getPrototypeOf(ChartTitleBarComponent)).call(this, props));
  }

  _createClass(ChartTitleBarComponent, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'chart-title' },
        _react2.default.createElement('div', { className: 'divider' }),
        _react2.default.createElement(
          'div',
          { className: 'content' },
          _react2.default.createElement(
            'div',
            null,
            this.props.superTitle || null
          ),
          _react2.default.createElement(
            'h2',
            { className: '' + (this.props.superTitle ? 'with-super' : '') },
            this.props.title || null
          )
        ),
        _react2.default.createElement('div', { className: 'divider' })
      );
    }
  }]);

  return ChartTitleBarComponent;
}(_react2.default.Component);

exports.default = ChartTitleBarComponent;

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(295);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./titleBarComponent.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./titleBarComponent.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".chart-title {\n  width: 100%;\n  padding: 25px 20px;\n  font-family: \"Playfair Display\", serif;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center; }\n  .chart-title .divider {\n    flex: auto;\n    height: 3px;\n    background: #c1c2c2;\n    opacity: .6; }\n  .chart-title .content {\n    flex: auto;\n    max-width: 400px;\n    text-align: center; }\n    .chart-title .content div {\n      font-size: 20px;\n      text-transform: uppercase;\n      color: #c1c2c2;\n      font-family: \"Lato\", sans-serif; }\n    .chart-title .content h2.with-super {\n      margin-top: 0; }\n", ""]);

// exports


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(297);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./results.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./results.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".ballot__wrapper {\n  height: 100%;\n  display: flex;\n  flex-flow: column nowrap; }\n\n.ballot__results--barchart {\n  margin-top: 30px;\n  padding: 25px 80px; }\n", ""]);

// exports


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactCookies = __webpack_require__(19);

var _reactCookies2 = _interopRequireDefault(_reactCookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var set = function set(name, data, props) {
  if (name && data) {
    props = props && (typeof props === 'undefined' ? 'undefined' : _typeof(props)) === 'object' ? props : null;
    _reactCookies2.default.save(name, data, props);
  }
};

var get = function get(name) {
  if (name) {
    _reactCookies2.default.load(name);
  }
};

var remove = function remove(name) {
  if (name) {
    _reactCookies2.default.remove(name);
  }
};

var setUserFlow = function setUserFlow(userFlow, bool) {
  bool = typeof bool === 'boolean' ? bool : true;
  _reactCookies2.default.remove(userFlow);
  _reactCookies2.default.save(userFlow, bool, {
    path: '/',
    maxAge: 1000
  });
  return bool;
};

var getUserFlow = function getUserFlow(userFlow) {
  var cookieResult = _reactCookies2.default.load(userFlow) == 'true' ? true : false;
  return cookieResult;
};

exports.default = {
  set: set,
  get: get,
  remove: remove,
  setUserFlow: setUserFlow,
  getUserFlow: getUserFlow
};

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(300);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(41)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./ballot.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./ballot.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".ballot__wrapper {\n  height: 100%;\n  display: flex;\n  flex-flow: column nowrap; }\n  .ballot__wrapper.widget-view {\n    max-width: 768px;\n    width: 768px;\n    max-height: 768px;\n    height: 768px;\n    overflow: hidden;\n    overflow-y: scroll; }\n", ""]);

// exports


/***/ })
]);;