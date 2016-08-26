(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.autoprefixer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var Autoprefixer, Browsers, Prefixes, autoprefixer, browserslist, infoCache, isPlainObject, postcss,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  browserslist = require('browserslist');

  postcss = require('postcss');

  Browsers = require('./browsers');

  Prefixes = require('./prefixes');

  infoCache = null;

  isPlainObject = function(obj) {
    return Object.prototype.toString.apply(obj) === '[object Object]';
  };

  autoprefixer = function() {
    var options, reqs;
    reqs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (reqs.length === 1 && isPlainObject(reqs[0])) {
      options = reqs[0];
      reqs = void 0;
    } else if (reqs.length === 0 || (reqs.length === 1 && (reqs[0] == null))) {
      reqs = void 0;
    } else if (reqs.length <= 2 && (reqs[0] instanceof Array || (reqs[0] == null))) {
      options = reqs[1];
      reqs = reqs[0];
    } else if (typeof reqs[reqs.length - 1] === 'object') {
      options = reqs.pop();
    }
    if ((options != null ? options.browsers : void 0) != null) {
      reqs = options.browsers;
    }
    return new Autoprefixer(autoprefixer.data, reqs, options);
  };

  autoprefixer.data = {
    browsers: require('caniuse-db/data').agents,
    prefixes: require('../data/prefixes')
  };

  Autoprefixer = (function() {
    function Autoprefixer(data, reqs1, options1) {
      this.data = data;
      this.reqs = reqs1;
      this.options = options1 != null ? options1 : {};
      this.postcss = bind(this.postcss, this);
    }

    Autoprefixer.prototype.process = function(str, options) {
      if (options == null) {
        options = {};
      }
      return postcss(this.postcss).process(str, options);
    };

    Autoprefixer.prototype.postcss = function(css) {
      var prefixes;
      prefixes = this.prefixes({
        from: css.source.input.file
      });
      if (this.options.remove !== false) {
        prefixes.processor.remove(css);
      }
      return prefixes.processor.add(css);
    };

    Autoprefixer.prototype.prefixes = function(opts) {
      var browsers;
      browsers = new Browsers(autoprefixer.data.browsers, this.reqs, opts);
      return new Prefixes(autoprefixer.data.prefixes, browsers, this.options);
    };

    Autoprefixer.prototype.info = function(opts) {
      infoCache || (infoCache = require('./info'));
      return infoCache(this.prefixes(opts));
    };

    return Autoprefixer;

  })();

  autoprefixer.defaults = browserslist.defaults;

  autoprefixer.loadDefault = function() {
    return this.defaultCache || (this.defaultCache = autoprefixer());
  };

  autoprefixer.process = function(str, options) {
    if (options == null) {
      options = {};
    }
    return this.loadDefault().process(str, options);
  };

  autoprefixer.postcss = function(css) {
    return autoprefixer.loadDefault().postcss(css);
  };

  autoprefixer.info = function() {
    return this.loadDefault().info();
  };

  module.exports = autoprefixer;

}).call(this);

},{"../data/prefixes":2,"./browsers":4,"./info":37,"./prefixes":41,"browserslist":55,"caniuse-db/data":56,"postcss":107}],2:[function(require,module,exports){
(function() {
  var add, crispedges, feature, flexbox, gradients, logicalProps, prefix, resolution, result, sort, textDecoration,
    slice = [].slice;

  sort = function(array) {
    return array.sort(function(a, b) {
      var d;
      a = a.split(' ');
      b = b.split(' ');
      if (a[0] > b[0]) {
        return 1;
      } else if (a[0] < b[0]) {
        return -1;
      } else {
        d = parseFloat(a[1]) - parseFloat(b[1]);
        if (d > 0) {
          return 1;
        } else if (d < 0) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  };

  feature = function(data, opts, callback) {
    var browser, match, need, ref, ref1, support, version, versions;
    if (!callback) {
      ref = [opts, {}], callback = ref[0], opts = ref[1];
    }
    match = opts.match || /\sx($|\s)/;
    need = [];
    ref1 = data.stats;
    for (browser in ref1) {
      versions = ref1[browser];
      for (version in versions) {
        support = versions[version];
        if (support.match(match)) {
          need.push(browser + ' ' + version);
        }
      }
    }
    return callback(sort(need));
  };

  result = {};

  prefix = function() {
    var data, i, j, k, len, name, names, results;
    names = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), data = arguments[j++];
    results = [];
    for (k = 0, len = names.length; k < len; k++) {
      name = names[k];
      result[name] = {};
      results.push((function() {
        var results1;
        results1 = [];
        for (i in data) {
          results1.push(result[name][i] = data[i]);
        }
        return results1;
      })());
    }
    return results;
  };

  add = function() {
    var data, j, k, len, name, names, results;
    names = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), data = arguments[j++];
    results = [];
    for (k = 0, len = names.length; k < len; k++) {
      name = names[k];
      results.push(result[name].browsers = sort(result[name].browsers.concat(data.browsers)));
    }
    return results;
  };

  module.exports = result;

  feature(require('caniuse-db/features-json/border-radius'), function(browsers) {
    return prefix('border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius', {
      mistakes: ['-ms-', '-o-'],
      transition: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-boxshadow'), function(browsers) {
    return prefix('box-shadow', {
      transition: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-animation'), function(browsers) {
    return prefix('animation', 'animation-name', 'animation-duration', 'animation-delay', 'animation-direction', 'animation-fill-mode', 'animation-iteration-count', 'animation-play-state', 'animation-timing-function', '@keyframes', {
      mistakes: ['-ms-'],
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-transitions'), function(browsers) {
    return prefix('transition', 'transition-property', 'transition-duration', 'transition-delay', 'transition-timing-function', {
      mistakes: ['-ms-'],
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/transforms2d'), function(browsers) {
    return prefix('transform', 'transform-origin', {
      transition: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/transforms3d'), function(browsers) {
    prefix('perspective', 'perspective-origin', {
      transition: true,
      browsers: browsers
    });
    return prefix('transform-style', 'backface-visibility', {
      browsers: browsers
    });
  });

  gradients = require('caniuse-db/features-json/css-gradients');

  feature(gradients, {
    match: /y\sx/
  }, function(browsers) {
    return prefix('linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient', {
      props: ['background', 'background-image', 'border-image', 'list-style', 'list-style-image', 'content', 'mask-image', 'mask'],
      mistakes: ['-ms-'],
      browsers: browsers
    });
  });

  feature(gradients, {
    match: /a\sx/
  }, function(browsers) {
    browsers = browsers.map(function(i) {
      if (/op/.test(i)) {
        return i;
      } else {
        return i + " old";
      }
    });
    return add('linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css3-boxsizing'), function(browsers) {
    return prefix('box-sizing', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-filters'), function(browsers) {
    return prefix('filter', {
      transition: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/multicolumn'), function(browsers) {
    prefix('columns', 'column-width', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-width', {
      transition: true,
      browsers: browsers
    });
    return prefix('column-count', 'column-rule-style', 'column-span', 'column-fill', 'break-before', 'break-after', 'break-inside', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/user-select-none'), function(browsers) {
    return prefix('user-select', {
      browsers: browsers
    });
  });

  flexbox = require('caniuse-db/features-json/flexbox');

  feature(flexbox, {
    match: /a\sx/
  }, function(browsers) {
    browsers = browsers.map(function(i) {
      if (/ie|firefox/.test(i)) {
        return i;
      } else {
        return i + " 2009";
      }
    });
    prefix('display-flex', 'inline-flex', {
      props: ['display'],
      browsers: browsers
    });
    prefix('flex', 'flex-grow', 'flex-shrink', 'flex-basis', {
      transition: true,
      browsers: browsers
    });
    return prefix('flex-direction', 'flex-wrap', 'flex-flow', 'justify-content', 'order', 'align-items', 'align-self', 'align-content', {
      browsers: browsers
    });
  });

  feature(flexbox, {
    match: /y\sx/
  }, function(browsers) {
    add('display-flex', 'inline-flex', {
      browsers: browsers
    });
    add('flex', 'flex-grow', 'flex-shrink', 'flex-basis', {
      browsers: browsers
    });
    return add('flex-direction', 'flex-wrap', 'flex-flow', 'justify-content', 'order', 'align-items', 'align-self', 'align-content', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/calc'), function(browsers) {
    return prefix('calc', {
      props: ['*'],
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/background-img-opts'), function(browsers) {
    return prefix('background-clip', 'background-origin', 'background-size', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/font-feature'), function(browsers) {
    return prefix('font-feature-settings', 'font-variant-ligatures', 'font-language-override', 'font-kerning', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/border-image'), function(browsers) {
    return prefix('border-image', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-selection'), function(browsers) {
    return prefix('::selection', {
      selector: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-placeholder'), function(browsers) {
    browsers = browsers.map(function(i) {
      var name, ref, version;
      ref = i.split(' '), name = ref[0], version = ref[1];
      if (name === 'firefox' && parseFloat(version) <= 18) {
        return i + ' old';
      } else {
        return i;
      }
    });
    return prefix(':placeholder-shown', '::placeholder', {
      selector: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-hyphens'), function(browsers) {
    return prefix('hyphens', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/fullscreen'), function(browsers) {
    return prefix(':fullscreen', {
      selector: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css3-tabsize'), function(browsers) {
    return prefix('tab-size', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/intrinsic-width'), function(browsers) {
    return prefix('max-content', 'min-content', 'fit-content', 'fill-available', {
      props: ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'],
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css3-cursors-newer'), function(browsers) {
    prefix('zoom-in', 'zoom-out', {
      props: ['cursor'],
      browsers: browsers.concat(['chrome 3'])
    });
    return prefix('grab', 'grabbing', {
      props: ['cursor'],
      browsers: browsers.concat(['firefox 24', 'firefox 25', 'firefox 26'])
    });
  });

  feature(require('caniuse-db/features-json/css-sticky'), function(browsers) {
    return prefix('sticky', {
      props: ['position'],
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/pointer'), function(browsers) {
    return prefix('touch-action', {
      browsers: browsers
    });
  });

  textDecoration = require('caniuse-db/features-json/text-decoration');

  feature(textDecoration, function(browsers) {
    return prefix('text-decoration-style', {
      browsers: browsers
    });
  });

  feature(textDecoration, {
    match: /y\sx($|\s)/
  }, function(browsers) {
    return prefix('text-decoration-line', 'text-decoration-color', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/text-size-adjust'), function(browsers) {
    return prefix('text-size-adjust', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-masks'), function(browsers) {
    prefix('mask-clip', 'mask-composite', 'mask-image', 'mask-origin', 'mask-repeat', {
      browsers: browsers
    });
    return prefix('clip-path', 'mask', 'mask-position', 'mask-size', {
      transition: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-boxdecorationbreak'), function(brwsrs) {
    return prefix('box-decoration-break', {
      browsers: brwsrs
    });
  });

  feature(require('caniuse-db/features-json/object-fit'), function(browsers) {
    return prefix('object-fit', 'object-position', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-shapes'), function(browsers) {
    return prefix('shape-margin', 'shape-outside', 'shape-image-threshold', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/text-overflow'), function(browsers) {
    return prefix('text-overflow', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/text-emphasis'), function(browsers) {
    return prefix('text-emphasis', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-deviceadaptation'), function(browsers) {
    return prefix('@viewport', {
      browsers: browsers
    });
  });

  resolution = require('caniuse-db/features-json/css-media-resolution');

  feature(resolution, {
    match: /( x($| )|a #3)/
  }, function(browsers) {
    return prefix('@resolution', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-text-align-last'), function(browsers) {
    return prefix('text-align-last', {
      browsers: browsers
    });
  });

  crispedges = require('caniuse-db/features-json/css-crisp-edges');

  feature(crispedges, {
    match: /y x/
  }, function(browsers) {
    return prefix('crisp-edges', {
      props: ['image-rendering'],
      browsers: browsers
    });
  });

  feature(crispedges, {
    match: /a x #2/
  }, function(browsers) {
    return prefix('image-rendering', {
      browsers: browsers
    });
  });

  logicalProps = require('caniuse-db/features-json/css-logical-props');

  feature(logicalProps, function(browsers) {
    return prefix('border-inline-start', 'border-inline-end', 'margin-inline-start', 'margin-inline-end', 'padding-inline-start', 'padding-inline-end', {
      transition: true,
      browsers: browsers
    });
  });

  feature(logicalProps, {
    match: /x\s#2/
  }, function(browsers) {
    return prefix('border-block-start', 'border-block-end', 'margin-block-start', 'margin-block-end', 'padding-block-start', 'padding-block-end', {
      transition: true,
      browsers: browsers
    });
  });

}).call(this);

},{"caniuse-db/features-json/background-img-opts":57,"caniuse-db/features-json/border-image":58,"caniuse-db/features-json/border-radius":59,"caniuse-db/features-json/calc":60,"caniuse-db/features-json/css-animation":61,"caniuse-db/features-json/css-boxdecorationbreak":62,"caniuse-db/features-json/css-boxshadow":63,"caniuse-db/features-json/css-crisp-edges":64,"caniuse-db/features-json/css-deviceadaptation":65,"caniuse-db/features-json/css-filters":66,"caniuse-db/features-json/css-gradients":67,"caniuse-db/features-json/css-hyphens":68,"caniuse-db/features-json/css-logical-props":69,"caniuse-db/features-json/css-masks":70,"caniuse-db/features-json/css-media-resolution":71,"caniuse-db/features-json/css-placeholder":72,"caniuse-db/features-json/css-selection":73,"caniuse-db/features-json/css-shapes":74,"caniuse-db/features-json/css-sticky":75,"caniuse-db/features-json/css-text-align-last":76,"caniuse-db/features-json/css-transitions":77,"caniuse-db/features-json/css3-boxsizing":78,"caniuse-db/features-json/css3-cursors-newer":79,"caniuse-db/features-json/css3-tabsize":80,"caniuse-db/features-json/flexbox":81,"caniuse-db/features-json/font-feature":82,"caniuse-db/features-json/fullscreen":83,"caniuse-db/features-json/intrinsic-width":84,"caniuse-db/features-json/multicolumn":85,"caniuse-db/features-json/object-fit":86,"caniuse-db/features-json/pointer":87,"caniuse-db/features-json/text-decoration":88,"caniuse-db/features-json/text-emphasis":89,"caniuse-db/features-json/text-overflow":90,"caniuse-db/features-json/text-size-adjust":91,"caniuse-db/features-json/transforms2d":92,"caniuse-db/features-json/transforms3d":93,"caniuse-db/features-json/user-select-none":94}],3:[function(require,module,exports){
(function() {
  var AtRule, Prefixer,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Prefixer = require('./prefixer');

  AtRule = (function(superClass) {
    extend(AtRule, superClass);

    function AtRule() {
      return AtRule.__super__.constructor.apply(this, arguments);
    }

    AtRule.prototype.add = function(rule, prefix) {
      var already, cloned, prefixed;
      prefixed = prefix + rule.name;
      already = rule.parent.some(function(i) {
        return i.name === prefixed && i.params === rule.params;
      });
      if (already) {
        return;
      }
      cloned = this.clone(rule, {
        name: prefixed
      });
      return rule.parent.insertBefore(rule, cloned);
    };

    AtRule.prototype.process = function(node) {
      var j, len, parent, prefix, ref, results;
      parent = this.parentPrefix(node);
      ref = this.prefixes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        prefix = ref[j];
        if (parent && parent !== prefix) {
          continue;
        }
        results.push(this.add(node, prefix));
      }
      return results;
    };

    return AtRule;

  })(Prefixer);

  module.exports = AtRule;

}).call(this);

},{"./prefixer":40}],4:[function(require,module,exports){
(function() {
  var Browsers, browserslist, utils;

  browserslist = require('browserslist');

  utils = require('./utils');

  Browsers = (function() {
    Browsers.prefixes = function() {
      var data, i, name;
      if (this.prefixesCache) {
        return this.prefixesCache;
      }
      data = require('caniuse-db/data').agents;
      return this.prefixesCache = utils.uniq((function() {
        var results;
        results = [];
        for (name in data) {
          i = data[name];
          results.push("-" + i.prefix + "-");
        }
        return results;
      })()).sort(function(a, b) {
        return b.length - a.length;
      });
    };

    Browsers.withPrefix = function(value) {
      if (!this.prefixesRegexp) {
        this.prefixesRegexp = RegExp("" + (this.prefixes().join('|')));
      }
      return this.prefixesRegexp.test(value);
    };

    function Browsers(data1, requirements, options) {
      this.data = data1;
      this.options = options;
      this.selected = this.parse(requirements);
    }

    Browsers.prototype.parse = function(requirements) {
      var ref;
      return browserslist(requirements, {
        path: (ref = this.options) != null ? ref.from : void 0
      });
    };

    Browsers.prototype.browsers = function(criteria) {
      var browser, data, ref, selected, versions;
      selected = [];
      ref = this.data;
      for (browser in ref) {
        data = ref[browser];
        versions = criteria(data).map(function(version) {
          return browser + " " + version;
        });
        selected = selected.concat(versions);
      }
      return selected;
    };

    Browsers.prototype.prefix = function(browser) {
      var data, name, prefix, ref, version;
      ref = browser.split(' '), name = ref[0], version = ref[1];
      data = this.data[name];
      if (data.prefix_exceptions) {
        prefix = data.prefix_exceptions[version];
      }
      prefix || (prefix = data.prefix);
      return '-' + prefix + '-';
    };

    Browsers.prototype.isSelected = function(browser) {
      return this.selected.indexOf(browser) !== -1;
    };

    return Browsers;

  })();

  module.exports = Browsers;

}).call(this);

},{"./utils":46,"browserslist":55,"caniuse-db/data":56}],5:[function(require,module,exports){
(function() {
  var Browsers, Declaration, Prefixer, utils, vendor,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Prefixer = require('./prefixer');

  Browsers = require('./browsers');

  vendor = require('postcss/lib/vendor');

  utils = require('./utils');

  Declaration = (function(superClass) {
    extend(Declaration, superClass);

    function Declaration() {
      return Declaration.__super__.constructor.apply(this, arguments);
    }

    Declaration.prototype.check = function(decl) {
      return true;
    };

    Declaration.prototype.prefixed = function(prop, prefix) {
      return prefix + prop;
    };

    Declaration.prototype.normalize = function(prop) {
      return prop;
    };

    Declaration.prototype.otherPrefixes = function(value, prefix) {
      var j, len, other, ref;
      ref = Browsers.prefixes();
      for (j = 0, len = ref.length; j < len; j++) {
        other = ref[j];
        if (other === prefix) {
          continue;
        }
        if (value.indexOf(other) !== -1) {
          return true;
        }
      }
      return false;
    };

    Declaration.prototype.set = function(decl, prefix) {
      decl.prop = this.prefixed(decl.prop, prefix);
      return decl;
    };

    Declaration.prototype.needCascade = function(decl) {
      return decl._autoprefixerCascade || (decl._autoprefixerCascade = this.all.options.cascade !== false && decl.style('before').indexOf('\n') !== -1);
    };

    Declaration.prototype.maxPrefixed = function(prefixes, decl) {
      var j, len, max, prefix;
      if (decl._autoprefixerMax) {
        return decl._autoprefixerMax;
      }
      max = 0;
      for (j = 0, len = prefixes.length; j < len; j++) {
        prefix = prefixes[j];
        prefix = utils.removeNote(prefix);
        if (prefix.length > max) {
          max = prefix.length;
        }
      }
      return decl._autoprefixerMax = max;
    };

    Declaration.prototype.calcBefore = function(prefixes, decl, prefix) {
      var before, diff, i, j, max, ref;
      if (prefix == null) {
        prefix = '';
      }
      before = decl.style('before');
      max = this.maxPrefixed(prefixes, decl);
      diff = max - utils.removeNote(prefix).length;
      for (i = j = 0, ref = diff; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        before += ' ';
      }
      return before;
    };

    Declaration.prototype.restoreBefore = function(decl) {
      var lines, min;
      lines = decl.style('before').split("\n");
      min = lines[lines.length - 1];
      this.all.group(decl).up(function(prefixed) {
        var array, last;
        array = prefixed.style('before').split("\n");
        last = array[array.length - 1];
        if (last.length < min.length) {
          return min = last;
        }
      });
      lines[lines.length - 1] = min;
      return decl.before = lines.join("\n");
    };

    Declaration.prototype.insert = function(decl, prefix, prefixes) {
      var cloned;
      cloned = this.set(this.clone(decl), prefix);
      if (!cloned) {
        return;
      }
      if (this.needCascade(decl)) {
        cloned.before = this.calcBefore(prefixes, decl, prefix);
      }
      return decl.parent.insertBefore(decl, cloned);
    };

    Declaration.prototype.add = function(decl, prefix, prefixes) {
      var already, prefixed;
      prefixed = this.prefixed(decl.prop, prefix);
      already = this.all.group(decl).up(function(i) {
        return i.prop === prefixed;
      });
      already || (already = this.all.group(decl).down(function(i) {
        return i.prop === prefixed;
      }));
      if (already || this.otherPrefixes(decl.value, prefix)) {
        return;
      }
      return this.insert(decl, prefix, prefixes);
    };

    Declaration.prototype.process = function(decl) {
      var prefixes;
      if (this.needCascade(decl)) {
        prefixes = Declaration.__super__.process.apply(this, arguments);
        if (prefixes != null ? prefixes.length : void 0) {
          this.restoreBefore(decl);
          return decl.before = this.calcBefore(prefixes, decl);
        }
      } else {
        return Declaration.__super__.process.apply(this, arguments);
      }
    };

    Declaration.prototype.old = function(prop, prefix) {
      return [this.prefixed(prop, prefix)];
    };

    return Declaration;

  })(Prefixer);

  module.exports = Declaration;

}).call(this);

},{"./browsers":4,"./prefixer":40,"./utils":46,"postcss/lib/vendor":113}],6:[function(require,module,exports){
(function() {
  var AlignContent, Declaration, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  AlignContent = (function(superClass) {
    extend(AlignContent, superClass);

    function AlignContent() {
      return AlignContent.__super__.constructor.apply(this, arguments);
    }

    AlignContent.names = ['align-content', 'flex-line-pack'];

    AlignContent.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start',
      'space-between': 'justify',
      'space-around': 'distribute'
    };

    AlignContent.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012) {
        return prefix + 'flex-line-pack';
      } else {
        return AlignContent.__super__.prefixed.apply(this, arguments);
      }
    };

    AlignContent.prototype.normalize = function(prop) {
      return 'align-content';
    };

    AlignContent.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2012) {
        decl.value = AlignContent.oldValues[decl.value] || decl.value;
        return AlignContent.__super__.set.call(this, decl, prefix);
      } else if (spec === 'final') {
        return AlignContent.__super__.set.apply(this, arguments);
      }
    };

    return AlignContent;

  })(Declaration);

  module.exports = AlignContent;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],7:[function(require,module,exports){
(function() {
  var AlignItems, Declaration, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  AlignItems = (function(superClass) {
    extend(AlignItems, superClass);

    function AlignItems() {
      return AlignItems.__super__.constructor.apply(this, arguments);
    }

    AlignItems.names = ['align-items', 'flex-align', 'box-align'];

    AlignItems.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start'
    };

    AlignItems.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return prefix + 'box-align';
      } else if (spec === 2012) {
        return prefix + 'flex-align';
      } else {
        return AlignItems.__super__.prefixed.apply(this, arguments);
      }
    };

    AlignItems.prototype.normalize = function(prop) {
      return 'align-items';
    };

    AlignItems.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2009 || spec === 2012) {
        decl.value = AlignItems.oldValues[decl.value] || decl.value;
        return AlignItems.__super__.set.call(this, decl, prefix);
      } else {
        return AlignItems.__super__.set.apply(this, arguments);
      }
    };

    return AlignItems;

  })(Declaration);

  module.exports = AlignItems;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],8:[function(require,module,exports){
(function() {
  var AlignSelf, Declaration, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  AlignSelf = (function(superClass) {
    extend(AlignSelf, superClass);

    function AlignSelf() {
      return AlignSelf.__super__.constructor.apply(this, arguments);
    }

    AlignSelf.names = ['align-self', 'flex-item-align'];

    AlignSelf.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start'
    };

    AlignSelf.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012) {
        return prefix + 'flex-item-align';
      } else {
        return AlignSelf.__super__.prefixed.apply(this, arguments);
      }
    };

    AlignSelf.prototype.normalize = function(prop) {
      return 'align-self';
    };

    AlignSelf.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2012) {
        decl.value = AlignSelf.oldValues[decl.value] || decl.value;
        return AlignSelf.__super__.set.call(this, decl, prefix);
      } else if (spec === 'final') {
        return AlignSelf.__super__.set.apply(this, arguments);
      }
    };

    return AlignSelf;

  })(Declaration);

  module.exports = AlignSelf;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],9:[function(require,module,exports){
(function() {
  var BackgroundSize, Declaration,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  BackgroundSize = (function(superClass) {
    extend(BackgroundSize, superClass);

    function BackgroundSize() {
      return BackgroundSize.__super__.constructor.apply(this, arguments);
    }

    BackgroundSize.names = ['background-size'];

    BackgroundSize.prototype.set = function(decl, prefix) {
      var value;
      value = decl.value.toLowerCase();
      if (prefix === '-webkit-' && value.indexOf(' ') === -1 && value !== 'contain' && value !== 'cover') {
        decl.value = decl.value + ' ' + decl.value;
      }
      return BackgroundSize.__super__.set.call(this, decl, prefix);
    };

    return BackgroundSize;

  })(Declaration);

  module.exports = BackgroundSize;

}).call(this);

},{"../declaration":5}],10:[function(require,module,exports){
(function() {
  var BlockLogical, Declaration,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  BlockLogical = (function(superClass) {
    extend(BlockLogical, superClass);

    function BlockLogical() {
      return BlockLogical.__super__.constructor.apply(this, arguments);
    }

    BlockLogical.names = ['border-block-start', 'border-block-end', 'margin-block-start', 'margin-block-end', 'padding-block-start', 'padding-block-end', 'border-before', 'border-after', 'margin-before', 'margin-after', 'padding-before', 'padding-after'];

    BlockLogical.prototype.prefixed = function(prop, prefix) {
      return prefix + (prop.indexOf('-start') !== -1 ? prop.replace('-block-start', '-before') : prop.replace('-block-end', '-after'));
    };

    BlockLogical.prototype.normalize = function(prop) {
      if (prop.indexOf('-before') !== -1) {
        return prop.replace('-before', '-block-start');
      } else {
        return prop.replace('-after', '-block-end');
      }
    };

    return BlockLogical;

  })(Declaration);

  module.exports = BlockLogical;

}).call(this);

},{"../declaration":5}],11:[function(require,module,exports){
(function() {
  var BorderImage, Declaration,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  BorderImage = (function(superClass) {
    extend(BorderImage, superClass);

    function BorderImage() {
      return BorderImage.__super__.constructor.apply(this, arguments);
    }

    BorderImage.names = ['border-image'];

    BorderImage.prototype.set = function(decl, prefix) {
      decl.value = decl.value.replace(/\s+fill(\s)/, '$1');
      return BorderImage.__super__.set.call(this, decl, prefix);
    };

    return BorderImage;

  })(Declaration);

  module.exports = BorderImage;

}).call(this);

},{"../declaration":5}],12:[function(require,module,exports){
(function() {
  var BorderRadius, Declaration,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  BorderRadius = (function(superClass) {
    var hor, i, j, len, len1, mozilla, normal, ref, ref1, ver;

    extend(BorderRadius, superClass);

    function BorderRadius() {
      return BorderRadius.__super__.constructor.apply(this, arguments);
    }

    BorderRadius.names = ['border-radius'];

    BorderRadius.toMozilla = {};

    BorderRadius.toNormal = {};

    ref = ['top', 'bottom'];
    for (i = 0, len = ref.length; i < len; i++) {
      ver = ref[i];
      ref1 = ['left', 'right'];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        hor = ref1[j];
        normal = "border-" + ver + "-" + hor + "-radius";
        mozilla = "border-radius-" + ver + hor;
        BorderRadius.names.push(normal);
        BorderRadius.names.push(mozilla);
        BorderRadius.toMozilla[normal] = mozilla;
        BorderRadius.toNormal[mozilla] = normal;
      }
    }

    BorderRadius.prototype.prefixed = function(prop, prefix) {
      if (prefix === '-moz-') {
        return prefix + (BorderRadius.toMozilla[prop] || prop);
      } else {
        return BorderRadius.__super__.prefixed.apply(this, arguments);
      }
    };

    BorderRadius.prototype.normalize = function(prop) {
      return BorderRadius.toNormal[prop] || prop;
    };

    return BorderRadius;

  })(Declaration);

  module.exports = BorderRadius;

}).call(this);

},{"../declaration":5}],13:[function(require,module,exports){
(function() {
  var BreakInside, Declaration,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  BreakInside = (function(superClass) {
    extend(BreakInside, superClass);

    function BreakInside() {
      return BreakInside.__super__.constructor.apply(this, arguments);
    }

    BreakInside.names = ['break-inside', 'page-break-inside', 'column-break-inside'];

    BreakInside.prototype.prefixed = function(prop, prefix) {
      if (prefix === '-webkit-') {
        return prefix + 'column-break-inside';
      } else if (prefix === '-moz-') {
        return 'page-break-inside';
      } else {
        return BreakInside.__super__.prefixed.apply(this, arguments);
      }
    };

    BreakInside.prototype.normalize = function() {
      return 'break-inside';
    };

    BreakInside.prototype.set = function(decl, prefix) {
      if (decl.value === 'avoid-column' || decl.value === 'avoid-page') {
        decl.value = 'avoid';
      }
      return BreakInside.__super__.set.apply(this, arguments);
    };

    BreakInside.prototype.insert = function(decl, prefix, prefixes) {
      if (decl.value === 'avoid-region') {

      } else if (decl.value === 'avoid-page' && prefix === '-webkit-') {

      } else {
        return BreakInside.__super__.insert.apply(this, arguments);
      }
    };

    return BreakInside;

  })(Declaration);

  module.exports = BreakInside;

}).call(this);

},{"../declaration":5}],14:[function(require,module,exports){
(function() {
  var CrispEdges, Value,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Value = require('../value');

  CrispEdges = (function(superClass) {
    extend(CrispEdges, superClass);

    function CrispEdges() {
      return CrispEdges.__super__.constructor.apply(this, arguments);
    }

    CrispEdges.names = ['crisp-edges'];

    CrispEdges.prototype.replace = function(string, prefix) {
      if (prefix === '-webkit-') {
        return string.replace(this.regexp(), '$1-webkit-optimize-contrast');
      } else {
        return CrispEdges.__super__.replace.apply(this, arguments);
      }
    };

    return CrispEdges;

  })(Value);

  module.exports = CrispEdges;

}).call(this);

},{"../value":47}],15:[function(require,module,exports){
(function() {
  var DisplayFlex, OldDisplayFlex, OldValue, Value, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  OldValue = require('../old-value');

  Value = require('../value');

  OldDisplayFlex = (function(superClass) {
    extend(OldDisplayFlex, superClass);

    function OldDisplayFlex(unprefixed, prefixed1) {
      this.unprefixed = unprefixed;
      this.prefixed = prefixed1;
    }

    OldDisplayFlex.prototype.check = function(value) {
      return value === this.name;
    };

    return OldDisplayFlex;

  })(OldValue);

  DisplayFlex = (function(superClass) {
    extend(DisplayFlex, superClass);

    DisplayFlex.names = ['display-flex', 'inline-flex'];

    function DisplayFlex(name, prefixes) {
      DisplayFlex.__super__.constructor.apply(this, arguments);
      if (name === 'display-flex') {
        this.name = 'flex';
      }
    }

    DisplayFlex.prototype.check = function(decl) {
      return decl.value === this.name;
    };

    DisplayFlex.prototype.prefixed = function(prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      return prefix + (spec === 2009 ? this.name === 'flex' ? 'box' : 'inline-box' : spec === 2012 ? this.name === 'flex' ? 'flexbox' : 'inline-flexbox' : spec === 'final' ? this.name : void 0);
    };

    DisplayFlex.prototype.replace = function(string, prefix) {
      return this.prefixed(prefix);
    };

    DisplayFlex.prototype.old = function(prefix) {
      var prefixed;
      prefixed = this.prefixed(prefix);
      if (prefixed) {
        return new OldValue(this.name, prefixed);
      }
    };

    return DisplayFlex;

  })(Value);

  module.exports = DisplayFlex;

}).call(this);

},{"../old-value":39,"../value":47,"./flex-spec":24}],16:[function(require,module,exports){
(function() {
  var FillAvailable, OldValue, Value,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldValue = require('../old-value');

  Value = require('../value');

  FillAvailable = (function(superClass) {
    extend(FillAvailable, superClass);

    function FillAvailable() {
      return FillAvailable.__super__.constructor.apply(this, arguments);
    }

    FillAvailable.names = ['fill-available'];

    FillAvailable.prototype.replace = function(string, prefix) {
      if (prefix === '-moz-') {
        return string.replace(this.regexp(), '$1-moz-available$3');
      } else {
        return FillAvailable.__super__.replace.apply(this, arguments);
      }
    };

    FillAvailable.prototype.old = function(prefix) {
      if (prefix === '-moz-') {
        return new OldValue(this.name, '-moz-available');
      } else {
        return FillAvailable.__super__.old.apply(this, arguments);
      }
    };

    return FillAvailable;

  })(Value);

  module.exports = FillAvailable;

}).call(this);

},{"../old-value":39,"../value":47}],17:[function(require,module,exports){
(function() {
  var FilterValue, OldFilterValue, OldValue, Value, utils,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldValue = require('../old-value');

  Value = require('../value');

  utils = require('../utils');

  OldFilterValue = (function(superClass) {
    extend(OldFilterValue, superClass);

    function OldFilterValue() {
      return OldFilterValue.__super__.constructor.apply(this, arguments);
    }

    OldFilterValue.prototype.clean = function(decl) {
      return decl.value = utils.editList(decl.value, (function(_this) {
        return function(props) {
          if (props.every(function(i) {
            return i.indexOf(_this.unprefixed) !== 0;
          })) {
            return props;
          }
          return props.filter(function(i) {
            return i.indexOf(_this.prefixed) === -1;
          });
        };
      })(this));
    };

    return OldFilterValue;

  })(OldValue);

  FilterValue = (function(superClass) {
    extend(FilterValue, superClass);

    function FilterValue() {
      return FilterValue.__super__.constructor.apply(this, arguments);
    }

    FilterValue.names = ['filter'];

    FilterValue.prototype.replace = function(value, prefix) {
      if (prefix === '-webkit-') {
        if (value.indexOf('-webkit-filter') === -1) {
          return FilterValue.__super__.replace.apply(this, arguments) + ', ' + value;
        } else {
          return value;
        }
      } else {
        return FilterValue.__super__.replace.apply(this, arguments);
      }
    };

    FilterValue.prototype.old = function(prefix) {
      return new OldFilterValue(this.name, prefix + this.name);
    };

    return FilterValue;

  })(Value);

  module.exports = FilterValue;

}).call(this);

},{"../old-value":39,"../utils":46,"../value":47}],18:[function(require,module,exports){
(function() {
  var Declaration, Filter,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  Filter = (function(superClass) {
    extend(Filter, superClass);

    function Filter() {
      return Filter.__super__.constructor.apply(this, arguments);
    }

    Filter.names = ['filter'];

    Filter.prototype.check = function(decl) {
      var v;
      v = decl.value;
      return v.toLowerCase().indexOf('alpha(') === -1 && v.indexOf('DXImageTransform.Microsoft') === -1 && v.indexOf('data:image/svg+xml') === -1;
    };

    return Filter;

  })(Declaration);

  module.exports = Filter;

}).call(this);

},{"../declaration":5}],19:[function(require,module,exports){
(function() {
  var Declaration, FlexBasis, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexBasis = (function(superClass) {
    extend(FlexBasis, superClass);

    function FlexBasis() {
      return FlexBasis.__super__.constructor.apply(this, arguments);
    }

    FlexBasis.names = ['flex-basis', 'flex-preferred-size'];

    FlexBasis.prototype.normalize = function() {
      return 'flex-basis';
    };

    FlexBasis.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012) {
        return prefix + 'flex-preferred-size';
      } else {
        return FlexBasis.__super__.prefixed.apply(this, arguments);
      }
    };

    FlexBasis.prototype.set = function(decl, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012 || spec === 'final') {
        return FlexBasis.__super__.set.apply(this, arguments);
      }
    };

    return FlexBasis;

  })(Declaration);

  module.exports = FlexBasis;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],20:[function(require,module,exports){
(function() {
  var Declaration, FlexDirection, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexDirection = (function(superClass) {
    extend(FlexDirection, superClass);

    function FlexDirection() {
      return FlexDirection.__super__.constructor.apply(this, arguments);
    }

    FlexDirection.names = ['flex-direction', 'box-direction', 'box-orient'];

    FlexDirection.prototype.normalize = function(prop) {
      return 'flex-direction';
    };

    FlexDirection.prototype.insert = function(decl, prefix, prefixes) {
      var already, cloned, dir, orient, ref, spec, value;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        already = decl.parent.some(function(i) {
          return i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction';
        });
        if (already) {
          return;
        }
        value = decl.value;
        orient = value.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
        dir = value.indexOf('reverse') !== -1 ? 'reverse' : 'normal';
        cloned = this.clone(decl);
        cloned.prop = prefix + 'box-orient';
        cloned.value = orient;
        if (this.needCascade(decl)) {
          cloned.before = this.calcBefore(prefixes, decl, prefix);
        }
        decl.parent.insertBefore(decl, cloned);
        cloned = this.clone(decl);
        cloned.prop = prefix + 'box-direction';
        cloned.value = dir;
        if (this.needCascade(decl)) {
          cloned.before = this.calcBefore(prefixes, decl, prefix);
        }
        return decl.parent.insertBefore(decl, cloned);
      } else {
        return FlexDirection.__super__.insert.apply(this, arguments);
      }
    };

    FlexDirection.prototype.old = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return [prefix + 'box-orient', prefix + 'box-direction'];
      } else {
        return FlexDirection.__super__.old.apply(this, arguments);
      }
    };

    return FlexDirection;

  })(Declaration);

  module.exports = FlexDirection;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],21:[function(require,module,exports){
(function() {
  var Declaration, FlexFlow, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexFlow = (function(superClass) {
    extend(FlexFlow, superClass);

    function FlexFlow() {
      return FlexFlow.__super__.constructor.apply(this, arguments);
    }

    FlexFlow.names = ['flex-flow'];

    FlexFlow.prototype.set = function(decl, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012) {
        return FlexFlow.__super__.set.apply(this, arguments);
      } else if (spec === 'final') {
        return FlexFlow.__super__.set.apply(this, arguments);
      }
    };

    return FlexFlow;

  })(Declaration);

  module.exports = FlexFlow;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],22:[function(require,module,exports){
(function() {
  var Declaration, Flex, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  Flex = (function(superClass) {
    extend(Flex, superClass);

    function Flex() {
      return Flex.__super__.constructor.apply(this, arguments);
    }

    Flex.names = ['flex-grow', 'flex-positive'];

    Flex.prototype.normalize = function() {
      return 'flex';
    };

    Flex.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return prefix + 'box-flex';
      } else if (spec === 2012) {
        return prefix + 'flex-positive';
      } else {
        return Flex.__super__.prefixed.apply(this, arguments);
      }
    };

    return Flex;

  })(Declaration);

  module.exports = Flex;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],23:[function(require,module,exports){
(function() {
  var Declaration, FlexShrink, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexShrink = (function(superClass) {
    extend(FlexShrink, superClass);

    function FlexShrink() {
      return FlexShrink.__super__.constructor.apply(this, arguments);
    }

    FlexShrink.names = ['flex-shrink', 'flex-negative'];

    FlexShrink.prototype.normalize = function() {
      return 'flex-shrink';
    };

    FlexShrink.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012) {
        return prefix + 'flex-negative';
      } else {
        return FlexShrink.__super__.prefixed.apply(this, arguments);
      }
    };

    FlexShrink.prototype.set = function(decl, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012 || spec === 'final') {
        return FlexShrink.__super__.set.apply(this, arguments);
      }
    };

    return FlexShrink;

  })(Declaration);

  module.exports = FlexShrink;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],24:[function(require,module,exports){
(function() {
  module.exports = function(prefix) {
    var spec;
    spec = prefix === '-webkit- 2009' || prefix === '-moz-' ? 2009 : prefix === '-ms-' ? 2012 : prefix === '-webkit-' ? 'final' : void 0;
    if (prefix === '-webkit- 2009') {
      prefix = '-webkit-';
    }
    return [spec, prefix];
  };

}).call(this);

},{}],25:[function(require,module,exports){
(function() {
  var FlexValues, OldValue, Value,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldValue = require('../old-value');

  Value = require('../value');

  FlexValues = (function(superClass) {
    extend(FlexValues, superClass);

    function FlexValues() {
      return FlexValues.__super__.constructor.apply(this, arguments);
    }

    FlexValues.names = ['flex', 'flex-grow', 'flex-shrink', 'flex-basis'];

    FlexValues.prototype.prefixed = function(prefix) {
      return this.all.prefixed(this.name, prefix);
    };

    FlexValues.prototype.replace = function(string, prefix) {
      return string.replace(this.regexp(), '$1' + this.prefixed(prefix) + '$3');
    };

    FlexValues.prototype.old = function(prefix) {
      return new OldValue(this.name, this.prefixed(prefix));
    };

    return FlexValues;

  })(Value);

  module.exports = FlexValues;

}).call(this);

},{"../old-value":39,"../value":47}],26:[function(require,module,exports){
(function() {
  var Declaration, FlexWrap, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexWrap = (function(superClass) {
    extend(FlexWrap, superClass);

    function FlexWrap() {
      return FlexWrap.__super__.constructor.apply(this, arguments);
    }

    FlexWrap.names = ['flex-wrap'];

    FlexWrap.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec !== 2009) {
        return FlexWrap.__super__.set.apply(this, arguments);
      }
    };

    return FlexWrap;

  })(Declaration);

  module.exports = FlexWrap;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],27:[function(require,module,exports){
(function() {
  var Declaration, Flex, flexSpec, list,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  list = require('postcss/lib/list');

  Flex = (function(superClass) {
    extend(Flex, superClass);

    function Flex() {
      return Flex.__super__.constructor.apply(this, arguments);
    }

    Flex.names = ['flex', 'box-flex'];

    Flex.oldValues = {
      'auto': '1',
      'none': '0'
    };

    Flex.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return prefix + 'box-flex';
      } else {
        return Flex.__super__.prefixed.apply(this, arguments);
      }
    };

    Flex.prototype.normalize = function() {
      return 'flex';
    };

    Flex.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2009) {
        decl.value = list.space(decl.value)[0];
        decl.value = Flex.oldValues[decl.value] || decl.value;
        return Flex.__super__.set.call(this, decl, prefix);
      } else {
        return Flex.__super__.set.apply(this, arguments);
      }
    };

    return Flex;

  })(Declaration);

  module.exports = Flex;

}).call(this);

},{"../declaration":5,"./flex-spec":24,"postcss/lib/list":102}],28:[function(require,module,exports){
(function() {
  var Fullscreen, Selector,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Selector = require('../selector');

  Fullscreen = (function(superClass) {
    extend(Fullscreen, superClass);

    function Fullscreen() {
      return Fullscreen.__super__.constructor.apply(this, arguments);
    }

    Fullscreen.names = [':fullscreen'];

    Fullscreen.prototype.prefixed = function(prefix) {
      if ('-webkit-' === prefix) {
        return ':-webkit-full-screen';
      } else if ('-moz-' === prefix) {
        return ':-moz-full-screen';
      } else {
        return ":" + prefix + "fullscreen";
      }
    };

    return Fullscreen;

  })(Selector);

  module.exports = Fullscreen;

}).call(this);

},{"../selector":44}],29:[function(require,module,exports){
(function() {
  var Gradient, OldValue, Value, isDirection, list, utils,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldValue = require('../old-value');

  Value = require('../value');

  utils = require('../utils');

  list = require('postcss/lib/list');

  isDirection = /top|left|right|bottom/gi;

  Gradient = (function(superClass) {
    extend(Gradient, superClass);

    function Gradient() {
      return Gradient.__super__.constructor.apply(this, arguments);
    }

    Gradient.names = ['linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient'];

    Gradient.prototype.replace = function(string, prefix) {
      return list.space(string).map((function(_this) {
        return function(value) {
          var after, args, close, params;
          if (value.slice(0, +_this.name.length + 1 || 9e9) !== _this.name + '(') {
            return value;
          }
          close = value.lastIndexOf(')');
          after = value.slice(close + 1);
          args = value.slice(_this.name.length + 1, +(close - 1) + 1 || 9e9);
          params = list.comma(args);
          params = _this.newDirection(params);
          if (prefix === '-webkit- old') {
            return _this.oldWebkit(value, args, params, after);
          } else {
            _this.convertDirection(params);
            return prefix + _this.name + '(' + params.join(', ') + ')' + after;
          }
        };
      })(this)).join(' ');
    };

    Gradient.prototype.directions = {
      top: 'bottom',
      left: 'right',
      bottom: 'top',
      right: 'left'
    };

    Gradient.prototype.oldDirections = {
      'top': 'left bottom, left top',
      'left': 'right top, left top',
      'bottom': 'left top, left bottom',
      'right': 'left top, right top',
      'top right': 'left bottom, right top',
      'top left': 'right bottom, left top',
      'right top': 'left bottom, right top',
      'right bottom': 'left top, right bottom',
      'bottom right': 'left top, right bottom',
      'bottom left': 'right top, left bottom',
      'left top': 'right bottom, left top',
      'left bottom': 'right top, left bottom'
    };

    Gradient.prototype.newDirection = function(params) {
      var first, value;
      first = params[0];
      if (first.indexOf('to ') === -1 && isDirection.test(first)) {
        first = first.split(' ');
        first = (function() {
          var j, len, results;
          results = [];
          for (j = 0, len = first.length; j < len; j++) {
            value = first[j];
            results.push(this.directions[value.toLowerCase()] || value);
          }
          return results;
        }).call(this);
        params[0] = 'to ' + first.join(' ');
      }
      return params;
    };

    Gradient.prototype.oldWebkit = function(value, args, params, after) {
      if (args.indexOf('px') !== -1) {
        return value;
      }
      if (this.name !== 'linear-gradient') {
        return value;
      }
      if (params[0] && params[0].indexOf('deg') !== -1) {
        return value;
      }
      if (args.indexOf('-corner') !== -1) {
        return value;
      }
      if (args.indexOf('-side') !== -1) {
        return value;
      }
      params = this.oldDirection(params);
      params = this.colorStops(params);
      return '-webkit-gradient(linear, ' + params.join(', ') + ')' + after;
    };

    Gradient.prototype.convertDirection = function(params) {
      if (params.length > 0) {
        if (params[0].slice(0, 3) === 'to ') {
          return params[0] = this.fixDirection(params[0]);
        } else if (params[0].indexOf('deg') !== -1) {
          return params[0] = this.fixAngle(params[0]);
        } else if (params[0].indexOf(' at ') !== -1) {
          return this.fixRadial(params);
        }
      }
    };

    Gradient.prototype.fixDirection = function(param) {
      var value;
      param = param.split(' ');
      param.splice(0, 1);
      param = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = param.length; j < len; j++) {
          value = param[j];
          results.push(this.directions[value.toLowerCase()] || value);
        }
        return results;
      }).call(this);
      return param.join(' ');
    };

    Gradient.prototype.roundFloat = function(float, digits) {
      return parseFloat(float.toFixed(digits));
    };

    Gradient.prototype.fixAngle = function(param) {
      param = parseFloat(param);
      param = Math.abs(450 - param) % 360;
      param = this.roundFloat(param, 3);
      return param + "deg";
    };

    Gradient.prototype.oldDirection = function(params) {
      var direction;
      if (params.length === 0) {
        params;
      }
      if (params[0].indexOf('to ') !== -1) {
        direction = params[0].replace(/^to\s+/, '');
        direction = this.oldDirections[direction];
        params[0] = direction;
        return params;
      } else {
        direction = this.oldDirections.bottom;
        return [direction].concat(params);
      }
    };

    Gradient.prototype.colorStops = function(params) {
      return params.map(function(param, i) {
        var color, match, position, ref;
        if (i === 0) {
          return param;
        }
        ref = list.space(param), color = ref[0], position = ref[1];
        if (position == null) {
          match = param.match(/^(.*\))(\d.*)$/);
          if (match) {
            color = match[1];
            position = match[2];
          }
        }
        if (position && position.indexOf(')') !== -1) {
          color += ' ' + position;
          position = void 0;
        }
        if (i === 1 && (position === void 0 || position === '0%')) {
          return "from(" + color + ")";
        } else if (i === params.length - 1 && (position === void 0 || position === '100%')) {
          return "to(" + color + ")";
        } else if (position) {
          return "color-stop(" + position + ", " + color + ")";
        } else {
          return "color-stop(" + color + ")";
        }
      });
    };

    Gradient.prototype.fixRadial = function(params) {
      var first;
      first = params[0].split(/\s+at\s+/);
      return params.splice(0, 1, first[1], first[0]);
    };

    Gradient.prototype.old = function(prefix) {
      var regexp, string, type;
      if (prefix === '-webkit-') {
        type = this.name === 'linear-gradient' ? 'linear' : 'radial';
        string = '-gradient';
        regexp = utils.regexp("-webkit-(" + type + "-gradient|gradient\\(\\s*" + type + ")", false);
        return new OldValue(this.name, prefix + this.name, string, regexp);
      } else {
        return Gradient.__super__.old.apply(this, arguments);
      }
    };

    Gradient.prototype.add = function(decl, prefix) {
      var p;
      p = decl.prop;
      if (p.indexOf('mask') !== -1) {
        if (prefix === '-webkit-' || prefix === '-webkit- old') {
          return Gradient.__super__.add.apply(this, arguments);
        }
      } else if (p === 'list-style' || p === 'list-style-image' || p === 'content') {
        if (prefix === '-webkit-' || prefix === '-webkit- old') {
          return Gradient.__super__.add.apply(this, arguments);
        }
      } else {
        return Gradient.__super__.add.apply(this, arguments);
      }
    };

    return Gradient;

  })(Value);

  module.exports = Gradient;

}).call(this);

},{"../old-value":39,"../utils":46,"../value":47,"postcss/lib/list":102}],30:[function(require,module,exports){
(function() {
  var Declaration, ImageRendering,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  ImageRendering = (function(superClass) {
    extend(ImageRendering, superClass);

    function ImageRendering() {
      return ImageRendering.__super__.constructor.apply(this, arguments);
    }

    ImageRendering.names = ['image-rendering', 'interpolation-mode'];

    ImageRendering.prototype.check = function(decl) {
      return decl.value === 'crisp-edges';
    };

    ImageRendering.prototype.prefixed = function(prop, prefix) {
      if (prefix === '-ms-') {
        return '-ms-interpolation-mode';
      } else {
        return ImageRendering.__super__.prefixed.apply(this, arguments);
      }
    };

    ImageRendering.prototype.set = function(decl, prefix) {
      if (prefix === '-ms-') {
        decl.prop = '-ms-interpolation-mode';
        decl.value = 'nearest-neighbor';
        return decl;
      } else {
        return ImageRendering.__super__.set.apply(this, arguments);
      }
    };

    ImageRendering.prototype.normalize = function(prop) {
      return 'image-rendering';
    };

    return ImageRendering;

  })(Declaration);

  module.exports = ImageRendering;

}).call(this);

},{"../declaration":5}],31:[function(require,module,exports){
(function() {
  var Declaration, InlineLogical,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  InlineLogical = (function(superClass) {
    extend(InlineLogical, superClass);

    function InlineLogical() {
      return InlineLogical.__super__.constructor.apply(this, arguments);
    }

    InlineLogical.names = ['border-inline-start', 'border-inline-end', 'margin-inline-start', 'margin-inline-end', 'padding-inline-start', 'padding-inline-end', 'border-start', 'border-end', 'margin-start', 'margin-end', 'padding-start', 'padding-end'];

    InlineLogical.prototype.prefixed = function(prop, prefix) {
      return prefix + prop.replace('-inline', '');
    };

    InlineLogical.prototype.normalize = function(prop) {
      return prop.replace(/(margin|padding|border)-(start|end)/, '$1-inline-$2');
    };

    return InlineLogical;

  })(Declaration);

  module.exports = InlineLogical;

}).call(this);

},{"../declaration":5}],32:[function(require,module,exports){
(function() {
  var Declaration, JustifyContent, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  JustifyContent = (function(superClass) {
    extend(JustifyContent, superClass);

    function JustifyContent() {
      return JustifyContent.__super__.constructor.apply(this, arguments);
    }

    JustifyContent.names = ['justify-content', 'flex-pack', 'box-pack'];

    JustifyContent.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start',
      'space-between': 'justify',
      'space-around': 'distribute'
    };

    JustifyContent.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return prefix + 'box-pack';
      } else if (spec === 2012) {
        return prefix + 'flex-pack';
      } else {
        return JustifyContent.__super__.prefixed.apply(this, arguments);
      }
    };

    JustifyContent.prototype.normalize = function(prop) {
      return 'justify-content';
    };

    JustifyContent.prototype.set = function(decl, prefix) {
      var spec, value;
      spec = flexSpec(prefix)[0];
      if (spec === 2009 || spec === 2012) {
        value = JustifyContent.oldValues[decl.value] || decl.value;
        decl.value = value;
        if (spec !== 2009 || value !== 'distribute') {
          return JustifyContent.__super__.set.call(this, decl, prefix);
        }
      } else if (spec === 'final') {
        return JustifyContent.__super__.set.apply(this, arguments);
      }
    };

    return JustifyContent;

  })(Declaration);

  module.exports = JustifyContent;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],33:[function(require,module,exports){
(function() {
  var Declaration, Order, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  Order = (function(superClass) {
    extend(Order, superClass);

    function Order() {
      return Order.__super__.constructor.apply(this, arguments);
    }

    Order.names = ['order', 'flex-order', 'box-ordinal-group'];

    Order.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return prefix + 'box-ordinal-group';
      } else if (spec === 2012) {
        return prefix + 'flex-order';
      } else {
        return Order.__super__.prefixed.apply(this, arguments);
      }
    };

    Order.prototype.normalize = function(prop) {
      return 'order';
    };

    Order.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2009) {
        decl.value = (parseInt(decl.value) + 1).toString();
        return Order.__super__.set.call(this, decl, prefix);
      } else {
        return Order.__super__.set.apply(this, arguments);
      }
    };

    return Order;

  })(Declaration);

  module.exports = Order;

}).call(this);

},{"../declaration":5,"./flex-spec":24}],34:[function(require,module,exports){
(function() {
  var Placeholder, Selector,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Selector = require('../selector');

  Placeholder = (function(superClass) {
    extend(Placeholder, superClass);

    function Placeholder() {
      return Placeholder.__super__.constructor.apply(this, arguments);
    }

    Placeholder.names = [':placeholder-shown', '::placeholder'];

    Placeholder.prototype.possible = function() {
      return Placeholder.__super__.possible.apply(this, arguments).concat('-moz- old');
    };

    Placeholder.prototype.prefixed = function(prefix) {
      if ('-webkit-' === prefix) {
        return '::-webkit-input-placeholder';
      } else if ('-ms-' === prefix) {
        return ':-ms-input-placeholder';
      } else if ('-moz- old' === prefix) {
        return ':-moz-placeholder';
      } else {
        return "::" + prefix + "placeholder";
      }
    };

    return Placeholder;

  })(Selector);

  module.exports = Placeholder;

}).call(this);

},{"../selector":44}],35:[function(require,module,exports){
(function() {
  var Declaration, TransformDecl,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  TransformDecl = (function(superClass) {
    extend(TransformDecl, superClass);

    function TransformDecl() {
      return TransformDecl.__super__.constructor.apply(this, arguments);
    }

    TransformDecl.names = ['transform', 'transform-origin'];

    TransformDecl.functions3d = ['matrix3d', 'translate3d', 'translateZ', 'scale3d', 'scaleZ', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'perspective'];

    TransformDecl.prototype.keykrameParents = function(decl) {
      var parent;
      parent = decl.parent;
      while (parent) {
        if (parent.type === 'atrule' && parent.name === 'keyframes') {
          return true;
        }
        parent = parent.parent;
      }
      return false;
    };

    TransformDecl.prototype.contain3d = function(decl) {
      var func, i, len, ref;
      if (decl.prop === 'transform-origin') {
        return false;
      }
      ref = TransformDecl.functions3d;
      for (i = 0, len = ref.length; i < len; i++) {
        func = ref[i];
        if (decl.value.indexOf(func + "(") !== -1) {
          return true;
        }
      }
      return false;
    };

    TransformDecl.prototype.insert = function(decl, prefix, prefixes) {
      if (prefix === '-ms-') {
        if (!this.contain3d(decl) && !this.keykrameParents(decl)) {
          return TransformDecl.__super__.insert.apply(this, arguments);
        }
      } else if (prefix === '-o-') {
        if (!this.contain3d(decl)) {
          return TransformDecl.__super__.insert.apply(this, arguments);
        }
      } else {
        return TransformDecl.__super__.insert.apply(this, arguments);
      }
    };

    return TransformDecl;

  })(Declaration);

  module.exports = TransformDecl;

}).call(this);

},{"../declaration":5}],36:[function(require,module,exports){
(function() {
  var TransformValue, Value,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Value = require('../value');

  TransformValue = (function(superClass) {
    extend(TransformValue, superClass);

    function TransformValue() {
      return TransformValue.__super__.constructor.apply(this, arguments);
    }

    TransformValue.names = ['transform'];

    TransformValue.prototype.replace = function(value, prefix) {
      if (prefix === '-ms-') {
        return value;
      } else {
        return TransformValue.__super__.replace.apply(this, arguments);
      }
    };

    return TransformValue;

  })(Value);

  module.exports = TransformValue;

}).call(this);

},{"../value":47}],37:[function(require,module,exports){
(function() {
  var capitalize, names, prefix;

  capitalize = function(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };

  names = {
    ie: 'IE',
    ie_mob: 'IE Mobile',
    ios_saf: 'iOS',
    op_mini: 'Opera Mini',
    op_mob: 'Opera Mobile',
    and_chr: 'Chrome for Android',
    and_ff: 'Firefox for Android',
    and_uc: 'UC for Android'
  };

  prefix = function(name, transition, prefixes) {
    var out;
    out = '  ' + name + (transition ? '*' : '') + ': ';
    out += prefixes.map(function(i) {
      return i.replace(/^-(.*)-$/g, '$1');
    }).join(', ');
    out += "\n";
    return out;
  };

  module.exports = function(prefixes) {
    var atrules, browser, data, j, k, l, len, len1, len2, list, name, needTransition, out, props, ref, ref1, ref2, ref3, ref4, ref5, ref6, selector, selectors, string, transitionProp, useTransition, value, values, version, versions;
    if (prefixes.browsers.selected.length === 0) {
      return "No browsers selected";
    }
    versions = [];
    ref = prefixes.browsers.selected;
    for (j = 0, len = ref.length; j < len; j++) {
      browser = ref[j];
      ref1 = browser.split(' '), name = ref1[0], version = ref1[1];
      name = names[name] || capitalize(name);
      if (versions[name]) {
        versions[name].push(version);
      } else {
        versions[name] = [version];
      }
    }
    out = "Browsers:\n";
    for (browser in versions) {
      list = versions[browser];
      list = list.sort(function(a, b) {
        return parseFloat(b) - parseFloat(a);
      });
      out += '  ' + browser + ': ' + list.join(', ') + "\n";
    }
    atrules = '';
    ref2 = prefixes.add;
    for (name in ref2) {
      data = ref2[name];
      if (name[0] === '@' && data.prefixes) {
        atrules += prefix(name, false, data.prefixes);
      }
    }
    if (atrules !== '') {
      out += "\nAt-Rules:\n" + atrules;
    }
    selectors = '';
    ref3 = prefixes.add.selectors;
    for (k = 0, len1 = ref3.length; k < len1; k++) {
      selector = ref3[k];
      if (selector.prefixes) {
        selectors += prefix(selector.name, false, selector.prefixes);
      }
    }
    if (selectors !== '') {
      out += "\nSelectors:\n" + selectors;
    }
    values = '';
    props = '';
    useTransition = false;
    needTransition = (ref4 = prefixes.add.transition) != null ? ref4.prefixes : void 0;
    ref5 = prefixes.add;
    for (name in ref5) {
      data = ref5[name];
      if (name[0] !== '@' && data.prefixes) {
        transitionProp = needTransition && prefixes.data[name].transition;
        if (transitionProp) {
          useTransition = true;
        }
        props += prefix(name, transitionProp, data.prefixes);
      }
      if (!data.values) {
        continue;
      }
      if (prefixes.transitionProps.some(function(i) {
        return i === name;
      })) {
        continue;
      }
      ref6 = data.values;
      for (l = 0, len2 = ref6.length; l < len2; l++) {
        value = ref6[l];
        string = prefix(value.name, false, value.prefixes);
        if (values.indexOf(string) === -1) {
          values += string;
        }
      }
    }
    if (useTransition) {
      props += "  * - can be used in transition\n";
    }
    if (props !== '') {
      out += "\nProperties:\n" + props;
    }
    if (values !== '') {
      out += "\nValues:\n" + values;
    }
    if (atrules === '' && selectors === '' && props === '' && values === '') {
      out += '\nAwesome! Your browsers don\'t require any vendor prefixes.' + '\nNow you can remove Autoprefixer from build steps.';
    }
    return out;
  };

}).call(this);

},{}],38:[function(require,module,exports){
(function() {
  var OldSelector;

  OldSelector = (function() {
    function OldSelector(selector, prefix1) {
      var i, len, prefix, ref;
      this.prefix = prefix1;
      this.prefixed = selector.prefixed(this.prefix);
      this.regexp = selector.regexp(this.prefix);
      this.prefixeds = [];
      ref = selector.possible();
      for (i = 0, len = ref.length; i < len; i++) {
        prefix = ref[i];
        this.prefixeds.push([selector.prefixed(prefix), selector.regexp(prefix)]);
      }
      this.unprefixed = selector.name;
      this.nameRegexp = selector.regexp();
    }

    OldSelector.prototype.isHack = function(rule) {
      var before, i, index, len, ref, ref1, regexp, rules, some, string;
      index = rule.parent.index(rule) + 1;
      rules = rule.parent.nodes;
      while (index < rules.length) {
        before = rules[index].selector;
        if (!before) {
          return true;
        }
        if (before.indexOf(this.unprefixed) !== -1 && before.match(this.nameRegexp)) {
          return false;
        }
        some = false;
        ref = this.prefixeds;
        for (i = 0, len = ref.length; i < len; i++) {
          ref1 = ref[i], string = ref1[0], regexp = ref1[1];
          if (before.indexOf(string) !== -1 && before.match(regexp)) {
            some = true;
            break;
          }
        }
        if (!some) {
          return true;
        }
        index += 1;
      }
      return true;
    };

    OldSelector.prototype.check = function(rule) {
      if (rule.selector.indexOf(this.prefixed) === -1) {
        return false;
      }
      if (!rule.selector.match(this.regexp)) {
        return false;
      }
      if (this.isHack(rule)) {
        return false;
      }
      return true;
    };

    return OldSelector;

  })();

  module.exports = OldSelector;

}).call(this);

},{}],39:[function(require,module,exports){
(function() {
  var OldValue, utils;

  utils = require('./utils');

  OldValue = (function() {
    function OldValue(unprefixed, prefixed, string, regexp) {
      this.unprefixed = unprefixed;
      this.prefixed = prefixed;
      this.string = string;
      this.regexp = regexp;
      this.regexp || (this.regexp = utils.regexp(this.prefixed));
      this.string || (this.string = this.prefixed);
    }

    OldValue.prototype.check = function(value) {
      if (value.indexOf(this.string) !== -1) {
        return !!value.match(this.regexp);
      } else {
        return false;
      }
    };

    return OldValue;

  })();

  module.exports = OldValue;

}).call(this);

},{"./utils":46}],40:[function(require,module,exports){
(function() {
  var Browsers, Prefixer, clone, utils, vendor,
    hasProp = {}.hasOwnProperty;

  Browsers = require('./browsers');

  utils = require('./utils');

  vendor = require('postcss/lib/vendor');

  clone = function(obj, parent) {
    var cloned, i, value;
    if (typeof obj !== 'object') {
      return obj;
    }
    cloned = new obj.constructor();
    for (i in obj) {
      if (!hasProp.call(obj, i)) continue;
      value = obj[i];
      if (i === 'parent' && typeof value === 'object') {
        if (parent) {
          cloned[i] = parent;
        }
      } else if (i === 'source') {
        cloned[i] = value;
      } else if (value instanceof Array) {
        cloned[i] = value.map(function(i) {
          return clone(i, cloned);
        });
      } else if (i !== '_autoprefixerPrefix' && i !== '_autoprefixerValues') {
        cloned[i] = clone(value, cloned);
      }
    }
    return cloned;
  };

  Prefixer = (function() {
    Prefixer.hack = function(klass) {
      var j, len, name, ref, results;
      this.hacks || (this.hacks = {});
      ref = klass.names;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        name = ref[j];
        results.push(this.hacks[name] = klass);
      }
      return results;
    };

    Prefixer.load = function(name, prefixes, all) {
      var klass, ref;
      klass = (ref = this.hacks) != null ? ref[name] : void 0;
      if (klass) {
        return new klass(name, prefixes, all);
      } else {
        return new this(name, prefixes, all);
      }
    };

    Prefixer.clone = function(node, overrides) {
      var cloned, name;
      cloned = clone(node);
      for (name in overrides) {
        cloned[name] = overrides[name];
      }
      return cloned;
    };

    function Prefixer(name1, prefixes1, all1) {
      this.name = name1;
      this.prefixes = prefixes1;
      this.all = all1;
    }

    Prefixer.prototype.parentPrefix = function(node) {
      var prefix;
      prefix = node._autoprefixerPrefix != null ? node._autoprefixerPrefix : node.type === 'decl' && node.prop[0] === '-' ? vendor.prefix(node.prop) : node.type === 'root' ? false : node.type === 'rule' && node.selector.indexOf(':-') !== -1 ? node.selector.match(/:(-\w+-)/)[1] : node.type === 'atrule' && node.name[0] === '-' ? vendor.prefix(node.name) : this.parentPrefix(node.parent);
      if (Browsers.prefixes().indexOf(prefix) === -1) {
        prefix = false;
      }
      return node._autoprefixerPrefix = prefix;
    };

    Prefixer.prototype.process = function(node) {
      var added, j, k, len, len1, parent, prefix, prefixes, ref;
      if (!this.check(node)) {
        return;
      }
      parent = this.parentPrefix(node);
      prefixes = [];
      ref = this.prefixes;
      for (j = 0, len = ref.length; j < len; j++) {
        prefix = ref[j];
        if (parent && parent !== utils.removeNote(prefix)) {
          continue;
        }
        prefixes.push(prefix);
      }
      added = [];
      for (k = 0, len1 = prefixes.length; k < len1; k++) {
        prefix = prefixes[k];
        if (this.add(node, prefix, added.concat([prefix]))) {
          added.push(prefix);
        }
      }
      return added;
    };

    Prefixer.prototype.clone = function(node, overrides) {
      return Prefixer.clone(node, overrides);
    };

    return Prefixer;

  })();

  module.exports = Prefixer;

}).call(this);

},{"./browsers":4,"./utils":46,"postcss/lib/vendor":113}],41:[function(require,module,exports){
(function() {
  var AtRule, Browsers, Declaration, Prefixes, Processor, Resolution, Selector, Supports, Value, declsCache, utils, vendor;

  Declaration = require('./declaration');

  Resolution = require('./resolution');

  Processor = require('./processor');

  Supports = require('./supports');

  Browsers = require('./browsers');

  Selector = require('./selector');

  AtRule = require('./at-rule');

  Value = require('./value');

  utils = require('./utils');

  vendor = require('postcss/lib/vendor');

  Selector.hack(require('./hacks/fullscreen'));

  Selector.hack(require('./hacks/placeholder'));

  Declaration.hack(require('./hacks/flex'));

  Declaration.hack(require('./hacks/order'));

  Declaration.hack(require('./hacks/filter'));

  Declaration.hack(require('./hacks/flex-flow'));

  Declaration.hack(require('./hacks/flex-grow'));

  Declaration.hack(require('./hacks/flex-wrap'));

  Declaration.hack(require('./hacks/align-self'));

  Declaration.hack(require('./hacks/flex-basis'));

  Declaration.hack(require('./hacks/align-items'));

  Declaration.hack(require('./hacks/flex-shrink'));

  Declaration.hack(require('./hacks/break-inside'));

  Declaration.hack(require('./hacks/border-image'));

  Declaration.hack(require('./hacks/align-content'));

  Declaration.hack(require('./hacks/border-radius'));

  Declaration.hack(require('./hacks/block-logical'));

  Declaration.hack(require('./hacks/inline-logical'));

  Declaration.hack(require('./hacks/transform-decl'));

  Declaration.hack(require('./hacks/flex-direction'));

  Declaration.hack(require('./hacks/image-rendering'));

  Declaration.hack(require('./hacks/justify-content'));

  Declaration.hack(require('./hacks/background-size'));

  Value.hack(require('./hacks/gradient'));

  Value.hack(require('./hacks/crisp-edges'));

  Value.hack(require('./hacks/flex-values'));

  Value.hack(require('./hacks/display-flex'));

  Value.hack(require('./hacks/filter-value'));

  Value.hack(require('./hacks/fill-available'));

  Value.hack(require('./hacks/transform-value'));

  declsCache = {};

  Prefixes = (function() {
    function Prefixes(data1, browsers, options) {
      var ref;
      this.data = data1;
      this.browsers = browsers;
      this.options = options != null ? options : {};
      ref = this.preprocess(this.select(this.data)), this.add = ref[0], this.remove = ref[1];
      this.processor = new Processor(this);
    }

    Prefixes.prototype.transitionProps = ['transition', 'transition-property'];

    Prefixes.prototype.cleaner = function() {
      var empty;
      if (!this.cleanerCache) {
        if (this.browsers.selected.length) {
          empty = new Browsers(this.browsers.data, []);
          this.cleanerCache = new Prefixes(this.data, empty, this.options);
        } else {
          return this;
        }
      }
      return this.cleanerCache;
    };

    Prefixes.prototype.select = function(list) {
      var add, all, data, name, notes, selected;
      selected = {
        add: {},
        remove: {}
      };
      for (name in list) {
        data = list[name];
        add = data.browsers.map(function(i) {
          var params;
          params = i.split(' ');
          return {
            browser: params[0] + ' ' + params[1],
            note: params[2]
          };
        });
        notes = add.filter(function(i) {
          return i.note;
        }).map((function(_this) {
          return function(i) {
            return _this.browsers.prefix(i.browser) + ' ' + i.note;
          };
        })(this));
        notes = utils.uniq(notes);
        add = add.filter((function(_this) {
          return function(i) {
            return _this.browsers.isSelected(i.browser);
          };
        })(this)).map((function(_this) {
          return function(i) {
            var prefix;
            prefix = _this.browsers.prefix(i.browser);
            if (i.note) {
              return prefix + ' ' + i.note;
            } else {
              return prefix;
            }
          };
        })(this));
        add = this.sort(utils.uniq(add));
        all = data.browsers.map((function(_this) {
          return function(i) {
            return _this.browsers.prefix(i);
          };
        })(this));
        if (data.mistakes) {
          all = all.concat(data.mistakes);
        }
        all = all.concat(notes);
        all = utils.uniq(all);
        if (add.length) {
          selected.add[name] = add;
          if (add.length < all.length) {
            selected.remove[name] = all.filter(function(i) {
              return add.indexOf(i) === -1;
            });
          }
        } else {
          selected.remove[name] = all;
        }
      }
      return selected;
    };

    Prefixes.prototype.sort = function(prefixes) {
      return prefixes.sort(function(a, b) {
        var aLength, bLength;
        aLength = utils.removeNote(a).length;
        bLength = utils.removeNote(b).length;
        if (aLength === bLength) {
          return b.length - a.length;
        } else {
          return bLength - aLength;
        }
      });
    };

    Prefixes.prototype.preprocess = function(selected) {
      var add, j, k, l, len, len1, len2, len3, len4, len5, len6, m, n, name, o, old, olds, p, prefix, prefixed, prefixes, prop, props, ref, ref1, ref2, remove, selector, value, values;
      add = {
        selectors: [],
        '@supports': new Supports(this)
      };
      ref = selected.add;
      for (name in ref) {
        prefixes = ref[name];
        if (name === '@keyframes' || name === '@viewport') {
          add[name] = new AtRule(name, prefixes, this);
        } else if (name === '@resolution') {
          add[name] = new Resolution(name, prefixes, this);
        } else if (this.data[name].selector) {
          add.selectors.push(Selector.load(name, prefixes, this));
        } else {
          props = this.data[name].transition ? this.transitionProps : this.data[name].props;
          if (props) {
            value = Value.load(name, prefixes, this);
            for (j = 0, len = props.length; j < len; j++) {
              prop = props[j];
              if (!add[prop]) {
                add[prop] = {
                  values: []
                };
              }
              add[prop].values.push(value);
            }
          }
          if (!this.data[name].props) {
            values = ((ref1 = add[name]) != null ? ref1.values : void 0) || [];
            add[name] = Declaration.load(name, prefixes, this);
            add[name].values = values;
          }
        }
      }
      remove = {
        selectors: []
      };
      ref2 = selected.remove;
      for (name in ref2) {
        prefixes = ref2[name];
        if (this.data[name].selector) {
          selector = Selector.load(name, prefixes);
          for (k = 0, len1 = prefixes.length; k < len1; k++) {
            prefix = prefixes[k];
            remove.selectors.push(selector.old(prefix));
          }
        } else if (name === '@keyframes' || name === '@viewport') {
          for (l = 0, len2 = prefixes.length; l < len2; l++) {
            prefix = prefixes[l];
            prefixed = '@' + prefix + name.slice(1);
            remove[prefixed] = {
              remove: true
            };
          }
        } else if (name === '@resolution') {
          remove[name] = new Resolution(name, prefixes, this);
        } else {
          props = this.data[name].transition ? this.transitionProps : this.data[name].props;
          if (props) {
            value = Value.load(name, [], this);
            for (m = 0, len3 = prefixes.length; m < len3; m++) {
              prefix = prefixes[m];
              old = value.old(prefix);
              if (old) {
                for (n = 0, len4 = props.length; n < len4; n++) {
                  prop = props[n];
                  if (!remove[prop]) {
                    remove[prop] = {};
                  }
                  if (!remove[prop].values) {
                    remove[prop].values = [];
                  }
                  remove[prop].values.push(old);
                }
              }
            }
          }
          if (!this.data[name].props) {
            for (o = 0, len5 = prefixes.length; o < len5; o++) {
              prefix = prefixes[o];
              prop = vendor.unprefixed(name);
              olds = this.decl(name).old(name, prefix);
              for (p = 0, len6 = olds.length; p < len6; p++) {
                prefixed = olds[p];
                if (!remove[prefixed]) {
                  remove[prefixed] = {};
                }
                remove[prefixed].remove = true;
              }
            }
          }
        }
      }
      return [add, remove];
    };

    Prefixes.prototype.decl = function(prop) {
      var decl;
      decl = declsCache[prop];
      if (decl) {
        return decl;
      } else {
        return declsCache[prop] = Declaration.load(prop);
      }
    };

    Prefixes.prototype.unprefixed = function(prop) {
      prop = vendor.unprefixed(prop);
      return this.decl(prop).normalize(prop);
    };

    Prefixes.prototype.prefixed = function(prop, prefix) {
      prop = vendor.unprefixed(prop);
      return this.decl(prop).prefixed(prop, prefix);
    };

    Prefixes.prototype.values = function(type, prop) {
      var data, global, ref, ref1, values;
      data = this[type];
      global = (ref = data['*']) != null ? ref.values : void 0;
      values = (ref1 = data[prop]) != null ? ref1.values : void 0;
      if (global && values) {
        return utils.uniq(global.concat(values));
      } else {
        return global || values || [];
      }
    };

    Prefixes.prototype.group = function(decl) {
      var checker, index, length, rule, unprefixed;
      rule = decl.parent;
      index = rule.index(decl);
      length = rule.nodes.length;
      unprefixed = this.unprefixed(decl.prop);
      checker = (function(_this) {
        return function(step, callback) {
          var other;
          index += step;
          while (index >= 0 && index < length) {
            other = rule.nodes[index];
            if (other.type === 'decl') {
              if (step === -1 && other.prop === unprefixed) {
                if (!Browsers.withPrefix(other.value)) {
                  break;
                }
              }
              if (_this.unprefixed(other.prop) !== unprefixed) {
                break;
              } else if (callback(other) === true) {
                return true;
              }
              if (step === +1 && other.prop === unprefixed) {
                if (!Browsers.withPrefix(other.value)) {
                  break;
                }
              }
            }
            index += step;
          }
          return false;
        };
      })(this);
      return {
        up: function(callback) {
          return checker(-1, callback);
        },
        down: function(callback) {
          return checker(+1, callback);
        }
      };
    };

    return Prefixes;

  })();

  module.exports = Prefixes;

}).call(this);

},{"./at-rule":3,"./browsers":4,"./declaration":5,"./hacks/align-content":6,"./hacks/align-items":7,"./hacks/align-self":8,"./hacks/background-size":9,"./hacks/block-logical":10,"./hacks/border-image":11,"./hacks/border-radius":12,"./hacks/break-inside":13,"./hacks/crisp-edges":14,"./hacks/display-flex":15,"./hacks/fill-available":16,"./hacks/filter":18,"./hacks/filter-value":17,"./hacks/flex":27,"./hacks/flex-basis":19,"./hacks/flex-direction":20,"./hacks/flex-flow":21,"./hacks/flex-grow":22,"./hacks/flex-shrink":23,"./hacks/flex-values":25,"./hacks/flex-wrap":26,"./hacks/fullscreen":28,"./hacks/gradient":29,"./hacks/image-rendering":30,"./hacks/inline-logical":31,"./hacks/justify-content":32,"./hacks/order":33,"./hacks/placeholder":34,"./hacks/transform-decl":35,"./hacks/transform-value":36,"./processor":42,"./resolution":43,"./selector":44,"./supports":45,"./utils":46,"./value":47,"postcss/lib/vendor":113}],42:[function(require,module,exports){
(function() {
  var Processor, Value, utils, vendor;

  vendor = require('postcss/lib/vendor');

  Value = require('./value');

  utils = require('./utils');

  Processor = (function() {
    function Processor(prefixes) {
      this.prefixes = prefixes;
    }

    Processor.prototype.add = function(css) {
      var keyframes, resolution, supports, viewport;
      resolution = this.prefixes.add['@resolution'];
      keyframes = this.prefixes.add['@keyframes'];
      viewport = this.prefixes.add['@viewport'];
      supports = this.prefixes.add['@supports'];
      css.eachAtRule((function(_this) {
        return function(rule) {
          if (rule.name === 'keyframes') {
            if (!_this.disabled(rule)) {
              return keyframes != null ? keyframes.process(rule) : void 0;
            }
          } else if (rule.name === 'viewport') {
            if (!_this.disabled(rule)) {
              return viewport != null ? viewport.process(rule) : void 0;
            }
          } else if (rule.name === 'supports') {
            if (!_this.disabled(rule)) {
              return supports.process(rule);
            }
          } else if (rule.name === 'media' && rule.params.indexOf('-resolution') !== -1) {
            if (!_this.disabled(rule)) {
              return resolution != null ? resolution.process(rule) : void 0;
            }
          }
        };
      })(this));
      css.eachRule((function(_this) {
        return function(rule) {
          var j, len, ref, results, selector;
          if (_this.disabled(rule)) {
            return;
          }
          ref = _this.prefixes.add.selectors;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            selector = ref[j];
            results.push(selector.process(rule));
          }
          return results;
        };
      })(this));
      css.eachDecl((function(_this) {
        return function(decl) {
          var prefix;
          prefix = _this.prefixes.add[decl.prop];
          if (prefix && prefix.prefixes) {
            if (!_this.disabled(decl)) {
              return prefix.process(decl);
            }
          }
        };
      })(this));
      return css.eachDecl((function(_this) {
        return function(decl) {
          var j, len, ref, unprefixed, value;
          if (_this.disabled(decl)) {
            return;
          }
          unprefixed = _this.prefixes.unprefixed(decl.prop);
          ref = _this.prefixes.values('add', unprefixed);
          for (j = 0, len = ref.length; j < len; j++) {
            value = ref[j];
            value.process(decl);
          }
          return Value.save(_this.prefixes, decl);
        };
      })(this));
    };

    Processor.prototype.remove = function(css) {
      var checker, j, len, ref, resolution;
      resolution = this.prefixes.remove['@resolution'];
      css.eachAtRule((function(_this) {
        return function(rule, i) {
          if (_this.prefixes.remove['@' + rule.name]) {
            if (!_this.disabled(rule)) {
              return rule.parent.remove(i);
            }
          } else if (rule.name === 'media' && rule.params.indexOf('-resolution') !== -1) {
            return resolution != null ? resolution.clean(rule) : void 0;
          }
        };
      })(this));
      ref = this.prefixes.remove.selectors;
      for (j = 0, len = ref.length; j < len; j++) {
        checker = ref[j];
        css.eachRule((function(_this) {
          return function(rule, i) {
            if (checker.check(rule)) {
              if (!_this.disabled(rule)) {
                return rule.parent.remove(i);
              }
            }
          };
        })(this));
      }
      return css.eachDecl((function(_this) {
        return function(decl, i) {
          var k, len1, notHack, ref1, ref2, rule, unprefixed;
          if (_this.disabled(decl)) {
            return;
          }
          rule = decl.parent;
          unprefixed = _this.prefixes.unprefixed(decl.prop);
          if ((ref1 = _this.prefixes.remove[decl.prop]) != null ? ref1.remove : void 0) {
            notHack = _this.prefixes.group(decl).down(function(other) {
              return other.prop === unprefixed;
            });
            if (notHack && !_this.withHackValue(decl)) {
              if (decl.style('before').indexOf("\n") > -1) {
                _this.reduceSpaces(decl);
              }
              rule.remove(i);
              return;
            }
          }
          ref2 = _this.prefixes.values('remove', unprefixed);
          for (k = 0, len1 = ref2.length; k < len1; k++) {
            checker = ref2[k];
            if (checker.check(decl.value)) {
              unprefixed = checker.unprefixed;
              notHack = _this.prefixes.group(decl).down(function(other) {
                return other.value.indexOf(unprefixed) !== -1;
              });
              if (notHack) {
                rule.remove(i);
                return;
              } else if (checker.clean) {
                checker.clean(decl);
                return;
              }
            }
          }
        };
      })(this));
    };

    Processor.prototype.withHackValue = function(decl) {
      return decl.prop === '-webkit-background-clip' && decl.value === 'text';
    };

    Processor.prototype.disabled = function(node) {
      var status;
      if (node._autoprefixerDisabled != null) {
        return node._autoprefixerDisabled;
      } else if (node.nodes) {
        status = void 0;
        node.each(function(i) {
          if (i.type !== 'comment') {
            return;
          }
          if (i.text === 'autoprefixer: off') {
            status = false;
            return false;
          } else if (i.text === 'autoprefixer: on') {
            status = true;
            return false;
          }
        });
        return node._autoprefixerDisabled = status != null ? !status : node.parent ? this.disabled(node.parent) : false;
      } else {
        return node._autoprefixerDisabled = this.disabled(node.parent);
      }
    };

    Processor.prototype.reduceSpaces = function(decl) {
      var diff, parts, prevMin, stop;
      stop = false;
      this.prefixes.group(decl).up(function(other) {
        return stop = true;
      });
      if (stop) {
        return;
      }
      parts = decl.style('before').split("\n");
      prevMin = parts[parts.length - 1].length;
      diff = false;
      return this.prefixes.group(decl).down(function(other) {
        var last;
        parts = other.style('before').split("\n");
        last = parts.length - 1;
        if (parts[last].length > prevMin) {
          if (diff === false) {
            diff = parts[last].length - prevMin;
          }
          parts[last] = parts[last].slice(0, -diff);
          return other.before = parts.join("\n");
        }
      });
    };

    return Processor;

  })();

  module.exports = Processor;

}).call(this);

},{"./utils":46,"./value":47,"postcss/lib/vendor":113}],43:[function(require,module,exports){
(function() {
  var Prefixer, Resolution, n2f, regexp, split, utils,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Prefixer = require('./prefixer');

  utils = require('./utils');

  n2f = require('num2fraction');

  regexp = /(min|max)-resolution\s*:\s*\d*\.?\d+(dppx|dpi)/gi;

  split = /(min|max)-resolution(\s*:\s*)(\d*\.?\d+)(dppx|dpi)/i;

  Resolution = (function(superClass) {
    extend(Resolution, superClass);

    function Resolution() {
      return Resolution.__super__.constructor.apply(this, arguments);
    }

    Resolution.prototype.prefixName = function(prefix, name) {
      return name = prefix === '-moz-' ? name + '--moz-device-pixel-ratio' : prefix + name + '-device-pixel-ratio';
    };

    Resolution.prototype.prefixQuery = function(prefix, name, colon, value, units) {
      if (units === 'dpi') {
        value = Number(value / 96);
      }
      if (prefix === '-o-') {
        value = n2f(value);
      }
      return this.prefixName(prefix, name) + colon + value;
    };

    Resolution.prototype.clean = function(rule) {
      var j, len, prefix, ref;
      if (!this.bad) {
        this.bad = [];
        ref = this.prefixes;
        for (j = 0, len = ref.length; j < len; j++) {
          prefix = ref[j];
          this.bad.push(this.prefixName(prefix, 'min'));
          this.bad.push(this.prefixName(prefix, 'max'));
        }
      }
      return rule.params = utils.editList(rule.params, (function(_this) {
        return function(queries) {
          return queries.filter(function(query) {
            return _this.bad.every(function(i) {
              return query.indexOf(i) === -1;
            });
          });
        };
      })(this));
    };

    Resolution.prototype.process = function(rule) {
      var parent, prefixes;
      parent = this.parentPrefix(rule);
      prefixes = parent ? [parent] : this.prefixes;
      return rule.params = utils.editList(rule.params, (function(_this) {
        return function(origin, prefixed) {
          var j, k, len, len1, prefix, processed, query;
          for (j = 0, len = origin.length; j < len; j++) {
            query = origin[j];
            if (query.indexOf('min-resolution') === -1 && query.indexOf('max-resolution') === -1) {
              prefixed.push(query);
              continue;
            }
            for (k = 0, len1 = prefixes.length; k < len1; k++) {
              prefix = prefixes[k];
              if (prefix === '-moz-' && rule.params.indexOf('dpi') !== -1) {
                continue;
              } else {
                processed = query.replace(regexp, function(str) {
                  var parts;
                  parts = str.match(split);
                  return _this.prefixQuery(prefix, parts[1], parts[2], parts[3], parts[4]);
                });
                prefixed.push(processed);
              }
            }
            prefixed.push(query);
          }
          return utils.uniq(prefixed);
        };
      })(this));
    };

    return Resolution;

  })(Prefixer);

  module.exports = Resolution;

}).call(this);

},{"./prefixer":40,"./utils":46,"num2fraction":95}],44:[function(require,module,exports){
(function() {
  var Browsers, OldSelector, Prefixer, Selector, utils,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldSelector = require('./old-selector');

  Prefixer = require('./prefixer');

  Browsers = require('./browsers');

  utils = require('./utils');

  Selector = (function(superClass) {
    extend(Selector, superClass);

    function Selector(name1, prefixes, all) {
      this.name = name1;
      this.prefixes = prefixes;
      this.all = all;
      this.regexpCache = {};
    }

    Selector.prototype.check = function(rule) {
      if (rule.selector.indexOf(this.name) !== -1) {
        return !!rule.selector.match(this.regexp());
      } else {
        return false;
      }
    };

    Selector.prototype.prefixed = function(prefix) {
      return this.name.replace(/^([^\w]*)/, '$1' + prefix);
    };

    Selector.prototype.regexp = function(prefix) {
      var name;
      if (this.regexpCache[prefix]) {
        return this.regexpCache[prefix];
      }
      name = prefix ? this.prefixed(prefix) : this.name;
      return this.regexpCache[prefix] = RegExp("(^|[^:\"'=])" + (utils.escapeRegexp(name)), "gi");
    };

    Selector.prototype.possible = function() {
      return Browsers.prefixes();
    };

    Selector.prototype.prefixeds = function(rule) {
      var i, len, prefix, prefixeds, ref;
      if (rule._autoprefixerPrefixeds) {
        return rule._autoprefixerPrefixeds;
      }
      prefixeds = {};
      ref = this.possible();
      for (i = 0, len = ref.length; i < len; i++) {
        prefix = ref[i];
        prefixeds[prefix] = this.replace(rule.selector, prefix);
      }
      return rule._autoprefixerPrefixeds = prefixeds;
    };

    Selector.prototype.already = function(rule, prefixeds, prefix) {
      var before, index, key, prefixed, some;
      index = rule.parent.index(rule) - 1;
      while (index >= 0) {
        before = rule.parent.nodes[index];
        if (before.type !== 'rule') {
          return false;
        }
        some = false;
        for (key in prefixeds) {
          prefixed = prefixeds[key];
          if (before.selector === prefixed) {
            if (prefix === key) {
              return true;
            } else {
              some = true;
              break;
            }
          }
        }
        if (!some) {
          return false;
        }
        index -= 1;
      }
      return false;
    };

    Selector.prototype.replace = function(selector, prefix) {
      return selector.replace(this.regexp(), '$1' + this.prefixed(prefix));
    };

    Selector.prototype.add = function(rule, prefix) {
      var cloned, prefixeds;
      prefixeds = this.prefixeds(rule);
      if (this.already(rule, prefixeds, prefix)) {
        return;
      }
      cloned = this.clone(rule, {
        selector: prefixeds[prefix]
      });
      return rule.parent.insertBefore(rule, cloned);
    };

    Selector.prototype.old = function(prefix) {
      return new OldSelector(this, prefix);
    };

    return Selector;

  })(Prefixer);

  module.exports = Selector;

}).call(this);

},{"./browsers":4,"./old-selector":38,"./prefixer":40,"./utils":46}],45:[function(require,module,exports){
(function() {
  var Prefixes, Supports, Value, findCondition, findDecl, list, postcss, split, utils;

  Prefixes = require('./prefixes');

  Value = require('./value');

  utils = require('./utils');

  postcss = require('postcss');

  list = require('postcss/lib/list');

  split = /\(\s*([^\(\):]+)\s*:([^\)]+)/;

  findDecl = /\(\s*([^\(\):]+)\s*:\s*(.+)\s*\)/g;

  findCondition = /(not\s*)?\(\s*([^\(\):]+)\s*:\s*(.+?(?!\s*or\s*).+?)\s*\)*\s*\)\s*or\s*/gi;

  Supports = (function() {
    function Supports(all1) {
      this.all = all1;
    }

    Supports.prototype.virtual = function(prop, value) {
      var rule;
      rule = postcss.parse('a{}').first;
      rule.append({
        prop: prop,
        value: value,
        before: ''
      });
      return rule;
    };

    Supports.prototype.prefixed = function(prop, value) {
      var decl, j, k, len, len1, prefixer, ref, ref1, rule;
      rule = this.virtual(prop, value);
      prefixer = this.all.add[prop];
      if (prefixer != null) {
        if (typeof prefixer.process === "function") {
          prefixer.process(rule.first);
        }
      }
      ref = rule.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        decl = ref[j];
        ref1 = this.all.values('add', prop);
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          value = ref1[k];
          value.process(decl);
        }
        Value.save(this.all, decl);
      }
      return rule.nodes;
    };

    Supports.prototype.clean = function(params) {
      return params.replace(findCondition, (function(_this) {
        return function(all) {
          var _, check, checker, j, len, prop, ref, ref1, ref2, unprefixed, value;
          if (all.slice(0, 3).toLowerCase() === 'not') {
            return all;
          }
          ref = all.match(split), _ = ref[0], prop = ref[1], value = ref[2];
          unprefixed = _this.all.unprefixed(prop);
          if ((ref1 = _this.all.cleaner().remove[prop]) != null ? ref1.remove : void 0) {
            check = new RegExp('(\\(|\\s)' + utils.escapeRegexp(unprefixed) + ':');
            if (check.test(params)) {
              return '';
            }
          }
          ref2 = _this.all.cleaner().values('remove', unprefixed);
          for (j = 0, len = ref2.length; j < len; j++) {
            checker = ref2[j];
            if (checker.check(value)) {
              return '';
            }
          }
          return all;
        };
      })(this)).replace(/\(\s*\((.*)\)\s*\)/g, '($1)');
    };

    Supports.prototype.process = function(rule) {
      rule.params = this.clean(rule.params);
      return rule.params = rule.params.replace(findDecl, (function(_this) {
        return function(all, prop, value) {
          var i, stringed;
          stringed = (function() {
            var j, len, ref, results;
            ref = this.prefixed(prop, value);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              i = ref[j];
              results.push("(" + i.prop + ": " + i.value + ")");
            }
            return results;
          }).call(_this);
          if (stringed.length === 1) {
            return stringed[0];
          } else {
            return '(' + stringed.join(' or ') + ')';
          }
        };
      })(this));
    };

    return Supports;

  })();

  module.exports = Supports;

}).call(this);

},{"./prefixes":41,"./utils":46,"./value":47,"postcss":107,"postcss/lib/list":102}],46:[function(require,module,exports){
(function() {
  var list;

  list = require('postcss/lib/list');

  module.exports = {
    error: function(text) {
      var err;
      err = new Error(text);
      err.autoprefixer = true;
      throw err;
    },
    uniq: function(array) {
      var filtered, i, j, len;
      filtered = [];
      for (j = 0, len = array.length; j < len; j++) {
        i = array[j];
        if (filtered.indexOf(i) === -1) {
          filtered.push(i);
        }
      }
      return filtered;
    },
    removeNote: function(string) {
      if (string.indexOf(' ') === -1) {
        return string;
      } else {
        return string.split(' ')[0];
      }
    },
    escapeRegexp: function(string) {
      return string.replace(/[.?*+\^\$\[\]\\(){}|\-]/g, '\\$&');
    },
    regexp: function(word, escape) {
      if (escape == null) {
        escape = true;
      }
      if (escape) {
        word = this.escapeRegexp(word);
      }
      return RegExp("(^|[\\s,(])(" + word + "($|[\\s(,]))", "gi");
    },
    editList: function(value, callback) {
      var changed, join, origin;
      origin = list.comma(value);
      changed = callback(origin, []);
      if (origin === changed) {
        return value;
      } else {
        join = value.match(/,\s*/);
        join = join ? join[0] : ', ';
        return changed.join(join);
      }
    }
  };

}).call(this);

},{"postcss/lib/list":102}],47:[function(require,module,exports){
(function() {
  var OldValue, Prefixer, Value, utils, vendor,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Prefixer = require('./prefixer');

  OldValue = require('./old-value');

  utils = require('./utils');

  vendor = require('postcss/lib/vendor');

  Value = (function(superClass) {
    extend(Value, superClass);

    function Value() {
      return Value.__super__.constructor.apply(this, arguments);
    }

    Value.save = function(prefixes, decl) {
      var already, cloned, prefix, prefixed, propPrefix, ref, results, rule, trimmed, value;
      ref = decl._autoprefixerValues;
      results = [];
      for (prefix in ref) {
        value = ref[prefix];
        if (value === decl.value) {
          continue;
        }
        propPrefix = vendor.prefix(decl.prop);
        if (propPrefix === prefix) {
          results.push(decl.value = value);
        } else if (propPrefix === '-pie-') {
          continue;
        } else {
          prefixed = prefixes.prefixed(decl.prop, prefix);
          rule = decl.parent;
          if (rule.every(function(i) {
            return i.prop !== prefixed;
          })) {
            trimmed = value.replace(/\s+/, ' ');
            already = rule.some(function(i) {
              return i.prop === decl.prop && i.value.replace(/\s+/, ' ') === trimmed;
            });
            if (!already) {
              if (value.indexOf('-webkit-filter') !== -1 && (decl.prop === 'transition' || decl.prop === 'trasition-property')) {
                results.push(decl.value = value);
              } else {
                cloned = this.clone(decl, {
                  value: value
                });
                results.push(decl.parent.insertBefore(decl, cloned));
              }
            } else {
              results.push(void 0);
            }
          } else {
            results.push(void 0);
          }
        }
      }
      return results;
    };

    Value.prototype.check = function(decl) {
      var value;
      value = decl.value;
      if (value.indexOf(this.name) !== -1) {
        return !!value.match(this.regexp());
      } else {
        return false;
      }
    };

    Value.prototype.regexp = function() {
      return this.regexpCache || (this.regexpCache = utils.regexp(this.name));
    };

    Value.prototype.replace = function(string, prefix) {
      return string.replace(this.regexp(), '$1' + prefix + '$2');
    };

    Value.prototype.add = function(decl, prefix) {
      var ref, value;
      decl._autoprefixerValues || (decl._autoprefixerValues = {});
      value = decl._autoprefixerValues[prefix] || ((ref = decl._value) != null ? ref.raw : void 0) || decl.value;
      value = this.replace(value, prefix);
      if (value) {
        return decl._autoprefixerValues[prefix] = value;
      }
    };

    Value.prototype.old = function(prefix) {
      return new OldValue(this.name, prefix + this.name);
    };

    return Value;

  })(Prefixer);

  module.exports = Value;

}).call(this);

},{"./old-value":39,"./prefixer":40,"./utils":46,"postcss/lib/vendor":113}],48:[function(require,module,exports){

},{}],49:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff
var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding) {
  var self = this
  if (!(self instanceof Buffer)) return new Buffer(subject, encoding)

  var type = typeof subject
  var length

  if (type === 'number') {
    length = +subject
  } else if (type === 'string') {
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) {
    // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data)) subject = subject.data
    length = +subject.length
  } else {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (length > kMaxLength) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' +
      kMaxLength.toString(16) + ' bytes')
  }

  if (length < 0) length = 0
  else length >>>= 0 // coerce to uint32

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    self = Buffer._augment(new Uint8Array(length)) // eslint-disable-line consistent-this
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    self.length = length
    self._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    self._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++) {
        self[i] = subject.readUInt8(i)
      }
    } else {
      for (i = 0; i < length; i++) {
        self[i] = ((subject[i] % 256) + 256) % 256
      }
    }
  } else if (type === 'string') {
    self.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT) {
    for (i = 0; i < length; i++) {
      self[i] = 0
    }
  }

  if (length > 0 && length <= Buffer.poolSize) self.parent = rootParent

  return self
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, totalLength) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function byteLength (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function toString (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0

  if (length < 0 || offset < 0 || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) >>> 0 & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) >>> 0 & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkInt(
      this, value, offset, byteLength,
      Math.pow(2, 8 * byteLength - 1) - 1,
      -Math.pow(2, 8 * byteLength - 1)
    )
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkInt(
      this, value, offset, byteLength,
      Math.pow(2, 8 * byteLength - 1) - 1,
      -Math.pow(2, 8 * byteLength - 1)
    )
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, target_start, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (target_start >= target.length) target_start = target.length
  if (!target_start) target_start = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (target_start < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - target_start < end - start) {
    end = target.length - target_start + start
  }

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []
  var i = 0

  for (; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (leadSurrogate) {
        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          leadSurrogate = codePoint
          continue
        } else {
          // valid surrogate pair
          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
          leadSurrogate = null
        }
      } else {
        // no lead yet

        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else {
          // valid lead
          leadSurrogate = codePoint
          continue
        }
      }
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
      leadSurrogate = null
    }

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x200000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":50,"ieee754":51,"is-array":52}],50:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],51:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],52:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],53:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":54}],54:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],55:[function(require,module,exports){
var caniuse = require('caniuse-db/data').agents;
var path    = require('path');
var fs      = require('fs');

var uniq = function (array) {
    var filtered = [];
    for ( var i = 0; i < array.length; i++ ) {
        if ( filtered.indexOf(array[i]) == -1 ) filtered.push(array[i]);
    }
    return filtered;
};

normalizeVersion = function (data, version) {
    if ( data.versions.indexOf(version) != -1 ) {
        return version;
    } else {
        var alias = browserslist.versionAliases[data.name][version];
        if ( alias ) return alias;
    }
};

// Return array of browsers by selection queries:
//
//   browserslist('IE >= 10, IE 8') //=> ['ie 11', 'ie 10', 'ie 8']
var browserslist = function (selections, opts) {
    if ( typeof(opts) == 'undefined' ) opts = { };

    if ( typeof(selections) == 'undefined' || selections === null ) {
        var config = browserslist.readConfig(opts.path);
        if ( config === false ) {
            selections = browserslist.defaults;
        } else {
            selections = config;
        }
    }

    if ( typeof(selections) == 'string' ) {
        selections = selections.split(/,\s*/);
    }

    var result = [];

    var query, match, array, used;
    selections.forEach(function (selection) {
        if ( selection.trim() === '' ) return;
        used = false;

        for ( var i in browserslist.queries ) {
            query = browserslist.queries[i];
            match = selection.match(query.regexp);
            if ( match ) {
                array  = query.select.apply(browserslist, match.slice(1));
                result = result.concat(array);
                used   = true;
                break;
            }
        }

        if ( !used ) {
            throw 'Unknown browser query `' + selection + '`';
        }
    });

    return uniq(result).sort(function (name1, name2) {
        name1 = name1.split(' ');
        name2 = name2.split(' ');
        if ( name1[0] == name2[0] ) {
            return parseFloat(name2[1]) - parseFloat(name1[1]);
        } else {
           return!name1[�.localeComxarm(namerS0]);
        m
(   t):
};

+/ Will ba fidlef by C�n I Use d!ta belgu
bsowserslist.dat`! } { }+
browserslistusage 9 ;
  0 gmob�l: { }
};

/-(Default br/wsers query
browse2{|i�t.defaults = Y
   '> 1'',
    'last 2`vevsions',
    'FirefOx ESR',
0   'Op%ra 12.1'
];
*/- What browsers si�l be used"i� `last n versikn` query
brwserslisv.major = ['safari', 'opera', ghos_caf', 'ie_mo`', 'ie',
    `   �        `   'firefox',!'chrome'];

/+ Fvowser names aliasts
brow2erslist.cliases = {�    fx:!         �  'n�Rtfjx',
    ff:    �     $ �'fire�ox', " (ios:  a     !   &io�_saf�,
 ! �e|pMorev:     � 'ie7,
 !  blac�berry:    `'bb',
    explm�urmobile: 'Ie_-ob',
  ! oper�min�:     �'op_mi.i',
   0operamobhle: ! ('kp_mob',
    chromean�roid:  'cnd_chr',
    virefox!ndroiD: 'Ynd_f&'
};

// Aliases nt0work witl joined �ersions like `ios_saf 7.0-3.1`brwsers,ist>versinAlkases(= {�};

// Fe5 b2owser data by0alias or case in�efsiti~% nqme
browserslisV.byNaMe = functhon (naoe1 {
  " nime!= nAme.toLowerCaae();
    name�= brow�ersli�t.aliaseS[name] ||"neme;

   0var daTa = b�owrerslkst,data[nam�];
    if (�!dita ) �hrow 'Un+nown brow3er '�;"na-e
    ruturn data;
};

// Find config,`r�qd file and parse it
browsersdist.REadConfig = function ,from) {
    if ( �rom === falsm )  `ruturn"false;
    af ( abs.readF)leSync ) return false;
    if ( ty0eov(fro�) == &undefined' ) from = '.';

    �ab dirs = padj.2�solve(grom!.split(path.sep);
�   vab condig, st!t;
    whhle ( tirs.length )`{
        bonfig = dkrw>cncat(['"rOwwer3l�st'�).join(paTh.sep);

        if ( &q.exispsSync(c�nfig) && fs.l{tatSyfc8connic).isFile() )`{
`       `   reTurn browqersli3t.parseConfiG( fs&readFile�ync(config) );
        m

        diss.pop();
(�  }
�   rattrn false;
}3�
// ReTupn irray of q}uries from confIg coNtent
brmwser�list.x�rs%Co~fmg = fwnction *string) [
!   return stR�ng.toString()
 $          0   .replace(/�Y^\n}*/g"'')
                 .cplit(/\n/(
     �    $     ".eap(function +i) {
                   0return i*trmm();
   " �  0   � $  })
 0     � `   0  `.filter(function (i	 {
 $                  re|trn i )== '';
              !  }!;}9

browsersNist.yumbies 7 {

    lastVerqions: {
  (     regexp: /^last (\d+) versions?$?),
        sehm�t: bUnction"(vershons)�y
        ( ( var sElected = [];
    (       bro7sezslisu.maJ/r.&orEach(&encti/n�,name) {
          `     var da|a  = browsersdist/byName(�ame);
    0           var array }$Data.releAsEd.slice(-va�smons);* "$             array = array.maP fuoc�ion )v) {
             " 0   rep�rn data.name + '` + v)
$     �         |);
             0  seleBted = selected.cgjcat(azray�;
   (        });
0           rgturn selecde`;
        }
    =,*
    lestByBrowser:"{
      � regexx: /last \d+) \w#) fersig�s?$-i,
   `    select8 fu�ction  wersions. nqme) {J            var!eata = browseRslkst�byName(name);
            return data.rgleAsed.slicE(-versaons).iap(function (t) {
       0     "  rettrn lapanname + ' '$) v{
�`     (    }�;
    !  $}
    |,

    gl/BalSp�ti{tycs: {
    (   rewexp: /^> (\d+\.?\d*)'$-l
 "      select: functi�n (popuLari�y) {    0   � !porelaRiTy = parqeFlOat(popul%rity);        ($  var result = K_;

        "   for ( vap version hl browserslist.5sage.global ) {
  !             if (2brovsevslist.usag�.global[vezshon > popularity ) 
   0`         `�   (rewult�pusj(ve�sion);
      "$h       }
            }

(  �        return r�selu;
        }J    ,
    c�unt2yst`tist�cs: {
       reg�xp2 /^> (\d+],?Td")%in h\w\w9 /,     $ !select: funation �popUlarity, boun4ry) {
            pmpu�arivy = paRseFd}at(popqlasipy);
            country    = countpy.tUpperCawe();
         �  �ar result!= [];

            v`r 5sage = br/wserslm{t.us�ge[coentry];�      �   0 i� ( !Usege )`{
 �      ( 0     usage � { �;
             (  va2`$ata =`req5iRe('caniure-`*/region-usage-json/% )(coultry	;
          `     for * v`R"i in ��ta.�ata0) {
                0   fallUsa�e(gsage, a, data.tata[i]9;
                ]
  (            "browserslist.}saGeYcountry] = esage;
  "  !  (   }
�   (     0  for h$v!r verwiOl in us!g�() {
"    !`  �   "  in ( }sage[v�rciol] > popula�ity ) {
(`     $(           rmsult.p�sh*7erwh'n);
      $         }
  "        `]

         �  return res}dt;
     8  }
  ! },

 �  versions: {
  b     regexp8 /^(\w+) (>=|<==)\s*([^`X.Y#)/,
  ! `   qelect: func|ion$(na}e, sign, version�2{
            var dqta = �rowrersliwt.byName(name);
  0  �     $versi�n  = rqrseFloat(re3�kon)
*    $       var"nMlper?
 �          ig h sigf == '>' ) {     (     !    filTer = funation (v) {
                    r�tuvn pazseFloat(v) � ve2sion;J   "       !   0};
       "    } eLSe if ((cign == '>=7 ) y
 �     "        filtgr = vujction (n) {`                   returJ p`RsaFmoat)6)(?= versioN+
                m;
            } elsE if ( sign ==`'<' i {
       �   0    giltez = function (v) {
!    "         $   return parseFl�at(v	 < ver3kon;
   ! $       0  };
            } elre if (�sion <= '<=' ) {
                fihter =0vunction (6)({*         0   ! $    return parqeVloat,t) <= versyon;
`       "      "m;
 �          }
  "         rddurn data.reLeased.filtdr(filtev).map(funcvion (6) { �   �         !return`dcTa.name + ' ' + v;
0         ( u);
   !   "}
    },

    esr: {
        regexp: /^(firefox|ff|fx9 esr$/i,
        celecx: fungt)on2(versions) �        !   return ['firefox 1'];
        =
    },
    arect: {
 "    ( rmgdxp: /�(\w+- ([Td\.]+)$/,
(       select: fujction0(ne�e, versio~� {
       (    var`dqta �= browsersnist.byName(name);
 `   �     0var alia3 ? normalIzeVebs)on(data, vesioj);
  0  `  `  !if ( alyas )"{
                vepsiof = �liis;
0 `    `0  !} dlse {
             !  if ( version.iNdexOf('&) =� -1") {
 "         p     " !alia� = �ursIon + '.0';
      �0        } else"if 8(/\.0$!.tesP(vEssion) ) �
 ` $   $     `      aliasa= versiOn.replace(/\.0$-, '');
  !             }
                alias = no�minizeVUrsion(data,(alia�);
        `       if ( alies�) {
  (    $`     !     vers)on = alias;
           ( $ !} e|se {         !        � thVow 'UnkooWn vmrsiol '0+ ver�ion + ' of!' +�name;
      �         }
       0    }
"(        $ return`[�a�a.nama ) ' ' + versinn];        � `  m

};

// �e� and c�nvert Can(Y Use dataJ
var �nrmalize = function  versio�s) {
    return versions.filtur(fu�ction (vers(on) {
 0  0   retern typaof(vercion	 == 'string';
"   ]);
};

var fillusAom = functmon re{5lt, n`me, da4a) {
  $ for (!var � in da4a!) {
    $   result[namg + ' ' + i] = data[i];
    �
};

bor ( var nqMe in cqniuse ) {
    cro�wershist.data[name] = {
 !(!    n�me:   � name�
 $`     vercion3: normalize(canis;e[ncMe].varskons),
        released: normali{e(caniuse[nAmd].varsions.slice(0, -s))
 "  };!   fillUsafe(jrowserslist�us�g�.gLkbAl, name, caniuse[nameM.usafe_globAl):

  � b�owrerslist.vebsionALiases[name] < {$};
    for ( vAr"i = �; i <0caNiuse[nameU.versions�lenguh; i++0) {
       `yf (cafitse[name].vmrsimnw[i]") contifue;
!       vaz full = caNiuse�nameY.verwions[i]{ !  `   if�( fu�,.ind%xNf('-') !=�)1 ) {
     �  `   var interval = fuml.split('-');
 !     (    fo2 ( var j = 0;$z < mnterval.length; nk+ ! {         `      brovsersmist.versionAlyases[namm][ interval[j� ] = n�ll;*            }
        }
 !` |*umduld.exporxs = browser�list;

},{"c!NiurE-db/d!ta":6("fs";4<,"path":53}],�>:[funauIon(require,MoDule,eyportsi{
module.uYports=y"eras":{"e=17":&370verrionr bicc"<&e-36":"36 versigns beck","e-35�:"35 fdpsions beck","e-34":#3 versions bqck,"%-33":"33 versions jack"-"e-s2":"3 versions"back","e-31#: �1 versions back","e-30":"30!vezshons back","e%29":j29 6ersions baso ,"e-28 :228 v%rsio~s rack"�"a-27":"27`version3"bagk"-"e-26">�6!wer3ions back",#e-25">"25 vers)ogs$b!ck",#e-24"�"24 vdrsions back","e/232:"2 ver�ions `ick","e-22":"22 versyons bcck","e-212:"�1 versIons baskb$"e%20":�20 tEjsions BaCkb<"e-19":"19 versions back","e-18">"38 versions bqck","e-1?":"16 v%2qions �aco2("m-!6">"16 varsion{ back","e-35": 15 vm�sions `ack","e-1�":"54 vdrS)ons bacj","e-13":13 veRsiols back"."e-12":"12 versaonr back","e-12:"11 versions bac*","e-10":"100�er3ions back"$"e%9":"9 versaons bacj",e-8":"0!verskons back",e-6"2"w veRsiols back", e�6":"6 veVsiofs back"$be-5"8"5 vepsions0bcck","e-4:"4 versiofs back","e-3":"3 versions �ack",e-""2 vers�ons back","e-1":"Psavious versiof&,"e0":"�urve.t","e1":"Near�f5tuse","e2":"Fazther feture","e3":#3 vmrsionS a�ead"},"agents":{#ye":y"browcez":"ME","abbr":"	E","prefkx":"ms","type":"desctop&"usage_glob!l":{"4.5":0.009298,"6"0.0:94521,"7*:0.0894521,"8":2.33264,"":�.�3766,"10":0.2)362,"11":7>98188,"TP":0},versiolw":[null,�ull,nuDl,null,numl,null,null,null,.ull,null,�ull<Null(nt,l,null,~ull,null,n}ll,nu�l,null,null,>ull,nulm,.ull$null,null,nu|l<null,null,null,n�ll,null,�5."$"6',"7",#8",29"$"12*,"11","�P",nuhl,null[},"firefox"2��browsg�":bVirefo8",&�bb2":�VF","prefix""moz","type":"desktop","�sag�_glgBal":{"2":0.019968,�3b:0.839936,"3.5":0&013312,"3.6"0.079853,"�":. 19968,"5":0.093312,"6b:0.019y8,"7"80.06656,#8":0.03328,�9":0. q339,"10":0.026624,"11":0.022224l"12":0*042592,"13":0.019968,"14":0019968,*1�":0(03328,&16":0.046%92,"17":0.4�328,"18":0.13328,"1� >0.01320<"20":0.03328,"2!": .07�87�,"22":.136624,"23"�0.04659r,"2<":8.059904�"2"0.0=9904, 26"*0.046593,"27":0139776,"28"*0.039936,b29"�0.06652$"30";0.086428,"1";0&69888,"2":0.�25984,"33":0.139776,"34"0.207336,"35b:�.53288,"36:7.700;9,"#7":�.2695%2,"30b:0.013#12,"9":0.006656,"40":0},"Versikns:["2",";"l"1.5",*3.6","4",b%",#6","7","8","9"� �0","11","q2""13"<"14","53,*16","17",�18","19","2 ","21","22","23","2t","25","26","2?","28"�"29"."30",b31","32","33#,"34b,"35","3�"$ 37",238&("39#("40"]}$"chromeb:{"browcer":"Chrome ( hbbr":"Chr.","prefiX":"webkiT","txpe":"desktkp","Usage_glocql":{4":0.013312,"4":0013312, 6":0013312,27":0.06656,"8":0.006�=3"9":0.006656,"10":0.0266"<,"11#:0,07216,#1r":0&026624,*1;":0.01=968,"14":0/013#2,"15":0.01960,"16":0.013;32,"16":0.013312,"1(":0.027624,#19">0019968,"20"20.0�331r,"21":0.073216,"22":p�07902,"3":0&022634,"24:p.p72316,�25&z0.024624,"26"*0.046592,"37":2.059902,"28":0.15324<$"29"90.06650,"30&:0.19808,"33"20.772096,12":0.06656,"33":1&19968,"74":0.21299r,"35":0.43264,"36":&851968("37":1.�316�,"38":0.5c9136,"39";1.21(05,"40":10.4:32,"�1":17.304>l"42":0.14632,"4":0/!:646t,"44"20},"versmons":[ 4",b5","62,"'",b8","9","10",b#1�,�52",#13","14","15",�16","17","182,"19","20","21","32*,"23",""4"-"25",b26""27","28"�"29","30"�"31","32"$"33","34","35*, 36","7",�3<","3)","40","41","42 ,"43&,"44"]},"safari":{"crowser�: Sada2i","abbr":"Ref.","prefix":"webkit","type"
#dEsktkr","usage_globamB:{"1.1":p,"3.2":0.4086�2,"4":0.043248m"5#:0.119808,"7/1":0.339456,"6":��06656,"v.1":0.3;9$2,"7":0�67225�,"5.1":0.7i872"8":1.45101},"versions":[null,ntll,null,NqlL,null,null,nuld,&ull,null$null,nul,(null,jull,Null,j�ll,nu}l,nudd,null,null,null,null,nuhl,�ull,null,nul,,nudl,null,null,b�.1","3.2","4","5",5.1"."","6.q"&"7","7.1"�"8",nuln,null,null]},"oper!":�bbrowse2":"Opera"("abb2":"Op.#,"�refix":"webkit","tyte";"desKtop","uwQ'g_global":{"9#:0.08r,"9.5-96"80.006<5,"10.0-10.1":0.019968,"14.5":0.0 8392<"10.6":0.p07296,"132:0.014996,"10.1":0.0066�6,"11.5": .0!=868,"11.6":0.013312$b12":0099968,"12.�":0212;92,"14":0.00685,�r6":0.0068�."!7":0.0069,"18b:0.006654,�q8"�0.006517,"20":0.013312,""1:0.006597,"22":0.00457,"23":0.013434,"24":0.006702,""u":013312,"26:0.019968,"27":0.252372,"28":0.672576,"29":0}."ve�sions":[null(null,null,nu|n,nuhl,.ull,null�j}lh,null,null,null,n5ll,null.nuhl,"9",�9.5-9�6b,"10,1-50.Q","10.5","50.>","!","19.1","31.5",b11.6","02*<"12.1","�","16","17"$"18"$"19","20",*21","23","21","24","25","26","27","28","29",nullY,"prefix_uxceptions":{"9":"o","9.5-9.6":"o","14.0-10.1":"o","10.5":"n"l"10.6":"o",f11":"g","11.1";"o","11.5": o","11.6":"o","12":�o","12.1":"o"}},"ios_saf":{"browser":"iOS �afary","abbv"�"i_S*,"xrefix":"webkit","type":"mobile"<"usage_glocal"8{"3.3�:0,*4.1%$.1": ,#4.-4.3":0,"5.0-5.1":0.0312766,"6.0-<.1":0.078902,"7.0-7.1":1.24751,�8":0.250217$"8.1-8.3":5&46132},"����imns":[jell$nUll,nulm,null,null,nuhl,null.nu|l,null,null,null,null.null,nell,null,.ull,nq,d,nulhlnull,nul|-null,null,full,nunl,null,nuLl,lull,�uld.nwhllnulh,"3.22,"4.0-4.1", 4,3-$�3",".0-5�1&,"4.0-7�1"�"7.8-7.","8","1.1-)�3,nufl,Null,null]},"op_}ini":{�browser:"Op%ra Mhni","ab�r":#M.Min)","prmfhx":"o","tyxe"8"mobile","usage_global"2{".0-8.1":2.79�14},"vebsign7":[null,nudl,nudl,.ull,nulh,null,n5,l<n�ll,.ull,null-jull,null,null(.ull,full,null,null,null,nulL,null,nuhl,null.null,null,nullneh|,lull,null,nu�l,fqll,n�ll,nqll,nulh,null,nell,null,lull,"50-8.0",ntl�,�ull,null]},"android"{"`rowser":"And�oid Browsev"-a�b2":"And.","pref�x#8"webkit"."typu":*mobine","usage_glkbal":{"2.1":0<"�.2":0,"2.3":0�106746,"3":8,"4":0.21�609,"4.1":0.817)33,"4.2-4.3"z1.41w61,"4.4":2�46932,"4.4.3-4.0.5":1.17149,"00":0},"versin3":Znu�lnull,.uLl,null,ntll,null,null,nudl,nudL,nUll,null,nulh,nuln,null,nun|,null,nulL,nu|l,nul�,nulh,null,n}ll,null,null�null,.5lm,null,null,"2.1"l"2��"l"2.3","3","4","4.1","42-4.32,"4.4","4.4.3-4.4.4",&�4",null,.qll,nul*]},"kp_mob":{"rrowser2:"OpeRa Mobile","abbr:"O.Mob"("xreni|":"o"$"tqp%":"Mobile,"us`ge_global":�"10"*8( 11":0,&11.1":0,"11.5":0,"12":.000&11976,"12.1":0.00284;,"25":0.8177994},"~essiol3":[null,null,nul,�null,null,.ull,null(null,null,null,null�null,nulL,.uln,null-null,nul|,null,nu,l,ntll,nuhl,null,�ull,null,null�Nu,l,nuln,nullln�ml,nulh,null,"10","11","11.0","11.5","12","92.1"-"2<",null,nqll,nqll],"prefi�_exce�timns":{"24":"werkit"�},"bb2:{"brosser":"Bl(ckberry 
rows%r"abbr":"BB","pref�x":"webkit -"ty`e":"mkbile","us�ge_glob`l":;"6"; .080774,"10":0=,"versions":Knull,n}ll,n�.l<full,nul},null,null,null,n5ll,null,nUll,/ull,null,null<nuhd,null,nunl,null,null,null,n�ll,nuLl,n5ll,null,null,null,null�null,null�null.null,nuLl.null,null�null,null-*7b,"10",Null,null,null]},"and_gHr":{"�rowsgr":"Chrome fop Andrgid","abb0":"CIr/And.","p2efix&8bwerkit","type":"mobile","usage_global z{"41":10.9596},"versio~s":[full,ntll,NUll,null,null,.ull,null,nul,,null,nwll$n5ll,null,null,ntll,null,oudl(nuLl,nudh,null,n5ll,n}ll,nWll,.uld,nUll,null,null,null,null,null,null,null,fUll,null,null,.ulllnull,null,"41",nwll,lulh,nqll�},"anDfgb:{"bpowser":"FireFoy for AndrOIdb,#abbr":"FF+nd."."prefix":"mO:","type":*morile","uscwe_glObal":{"36"80.1#376},"versions":[jull,null,nulo,n}ll,ou�l,nwll,null,null(null,nu�l,jull,null,jull-nulm(null,null,ntll,nuln,null,null,nu,|,oull,nul|,null,null,null,null,nu�l,null,numl,null,null,null,nell,null,null,null,#36",null,nuLl(null]},"iemob":{"brnwseR":"IE Mobkle2<"abbr":"IE.Mob","prefix":"ms","tyre":"mobila","usage_global":{"10":0.20262l"11!: .50947},"vej3ions">[nuel,null,null,.uml,nu�l,null,n5ll,nuldnulL,null,null,nul,,null,null,null,nqln<null,null,null,nu|l,nulm,null,null,lull,null,nuln,null,null,nu|l,Null,null,null(null,ful|,null,nu|l,"10","11",null,nulllnunl]},"and�uc";{"browqer&:"UC Browser fkr ANdvid"�"abbr":"UC","prefix"8"wejkit","type":"mobihe","usAge_globa<":{"=.9":4.25�22},"versioes"z[null,nul(�nulll~ull$o}l-null,.ull,null,Nudl,nu|l,null,nvll,nulllnulL,null,null,null�nwll,n�ll,nuhl,null,numl(null,nulm,nwll,nu<l,null,null$null,nuhh,nudl.nul|,nqll,n5ll,nunl,null,null,"9.9*,n�ll,nqll,null],"prefiy_exceptiOns":;"9.9":"w%bkit"}},"s�atuses":{2rec >"W2K Recommdndition","pr":"W3� Proqnsad Recom-endation","gr":"R�C Candidate Rec/mme�dation","wd":2W3C Wo3kifg"er`ft","l�">"W�QTWG Living [tEn�ard","�ther":"OthEr","unnf&":"UnoffhcaaL / Nota"},"catw";{"CRS":["CSS","CSS3","CSS3"],"HTM�5":["Calvas","HtMH5"],"JS API":[bJS API"],"Nther":["PNG",�Other&-"EOM"],"�VG"z["sVG"]}2updated":1429298471,"data�:{"png-alpha#{"title":PNG a�pha transp`rdncy"��de�csiption":"Seli-transparent areas0in TNG gi,es","spec":http:-/www.w3org.TR.PNW�","status":"rEk","lin+s":[{"u2l";"Http:o/en.wi+Ipedia.org�wiki/Portable_Fetwork_Wraphics","�itle":"Wikipedia"}.{"ur|":"�ttp:�/dihderlesign.com/experimuNU/DD_"elaue�QGo*,"Titlg":bWorkaround for IE6*}M,"#ategorims":["�NG"],"sT`ts":{"ie":{"5.5":"n","&&"p","7":"y","8":"y",b9":"y <"102:"y","1":"y","tP":"y"}�"firefnx"�{"2":"y","3" y","3.5#:"y","3.6":"y&, 4":"y","-":�y""6">"y","7":"y","8":"y#,"9":"y","10":"y"$"!1":"{","12":"y""13#:"y",21$":"Y","15:"Y","16":2y","17":*q",b18":"y","19":"y',"22":"y","21":"y&, 2�b"y","23"�"{","04";"q","25":�x". 26&2"y","27&:"y","2<":"y",229":"y","30""y","3�":"y","32";"y","33":"9","s4":&q","35:8"y""36"z"y","s7*:"y",38":y","9":"y","40":"y"},&cHr�me":{*4":"9",5&:"y","4 �"y","7"*"y&,"8":"y"l"9":"y","10":"y"l"11":"y�,"13":"y",b13":"y","14 :2y","15";"y"("16">"y",2�7":�y","18":"y","19":"y�,"20":"y",#21#:"y&,"22"*"x2�"23"#9","24":*y","25":"y"."36":"y",b25":"y","28":"y",229":�y","70":"y","31":"y","32":"y"�"33":"{"�"34":"y ,"35":"y","36":"y2,"37":"y#,"38""y*,"39&:"y"-"40":"y","41":"y"h"42":"y"d"t3":"y","44":"y"=,"safa�i"z{�3.1":"y"-"3.2":"y","4":"y","5*:"y","5.1":"y","6":"x","6.12�"y","7":"y"*7.1":2y","8":"y*},"opoba"z{"9";"y","9.5�9.":"Y","10. -10.1":"y","11.5";"y�,"106":by","11":by"$"11.1":"y","11.5":"y","11.6"2"y","12":"y","12.1#:"y","15":"x#,"1�":"y","1?":"y","1":"x"�"!9:"y","20":"y"$#21":*y","22�:"y","23�:"y",#24":"y"-"25"2*y","24":"x","27":"y,"28":"Y","29":"y"},"ios_sa&":{"3.2":"y","6.0-4.1":"y","4&2-4.3#:"y",5.0%5>�":"yb, 6.0-6,1":"Yb,"7.0%7*!":*y,"8":"y"l&8.1-8.3":"y m,"op_midi":;"5.0-8.0 :"xb},"aNdroid":{"2.1":"y2$�2.2";"y","2.:"yb,"3":"}","4":"y","4n1">"y","4�2m4.3":*["-"4.4";"}"("4.4.3-4/4.�":"y"l"40":"y"},"bb":{"7":"y","10":"x"}-"op_mob":{"1":"y#,"11"*"y","11.9":"y"l"11.52"y","12":"y","12.1":y","242:"q"},"and^ch�"8{"41":"y*},"and_f�":{";6":"Y"},"ye_mob":{"10":"x","15":"y*}, and_�c":{"9.9�:2y"}},"�otmw": IE6(does support fu$l trensparency in 8-bit PNGs, 7hich can`smetimes be af al4ernativ% to 24-bit PNGs.#("notesby_ful":{},"usage_perc_y":97.16,"usage]peRc_a"80,"Uc`refix:falsD�"paseNT":"�,"keywosds""","ie_id":"","chrome_id":""=,"apng"*{"t)tle":"Animated`PJG0(APNG),"dessraption":L)km animated GIFs. but allowing 2<-bit colorw(and chpha transpapencx","s0ec":"https://wikk.mozilla.Orc+APNG_Spegificapion",suatus""unoff"-"linis":[{&u�l":"htvp://en.w)kiredha.erg/wiki/APNG","title:"Wik)pedia"},�"u�l":"htt�s:/+github.cm-davidmz/aqfg-c`nvas","titl%":"Polyfhll u�ing canvas"}�{"url":"http�//chsomE.google.co�web3tore/detayl/eikepjiconegkhpodgoaeamnpckdBblp","title":"Chr�me extension prov�din� support"}],"catefo�ies :["PNG"],"stat�":{"ie":{"5.5":"n#,"&":"n","w":"n","8"�"n","9":�n2,"10":"n","11 :"n","TP":"n"},"firefo8":{"2""n","3":"y"."#.%":"y","S>6":"y","4":"y","5&z"y","6":"y","7":"y""8":"y","9": y","10":"y , 11*:"y","1228"y","13":"�","04��"y",*15":"yb,"16":"y","37":"y","18":"y","1)":"y","20�:"x",*21":by&,"22"�"y","23"*"i"("24"3"y#,"25":"Y","26":"y","27":"y","28":6y","29 :"y",b30":"y","3)":"y","32:"y",$33":"�","3422"y","35"2"}","16":"y","37":"y",#38": y","39":"y","40":*y"}, chromef:s"4":"n","5"*"n"�"6">"n","7";"n","8":"n:,"9*�n","11":"j#,b19�:"n ,"!2"2"n"�"13"8"n","54":"n","15"*�n0,"17":"n","17":2n"."18"*"n","19":"n","20"�"n","29":"n","22":"n",b23":"n","2d"+"n""2�":"n","27":"n",b7":"n","28&:"�","29":"F""30":"n", 31";"j","32":bn","33":&n","34":"n","35":&nb,"36":"n","37":"j","38":"n2,"39":"N",#40":"n","45":"n","4:":".","43":"f","44":"n"},"safari";{3.1": n","3.2":"n","4":"n","5":"f","5.1":*f ."6":2o#,6�1"�"n",7":"n","7.1"Z"n","8":"y"},2M�era":K"�*:"n","y.5-9.6�:"y",�10,0-Q0.1":"y","10.5":#y","10.62:"y",11":"Y","11.�2:"q,"91%"2"q ,"116 :"y","12":"9","12n1":"q",b15":"n"�"16":*n","17":"n",�18":"�&�"9":"o,"20*2"n","21*:bn"�""2":2n",#23�:"n"l"04":".","25":"n","26";bn","27">"n",#28":"o",":9":"f"u,"i�s_sAb"*{"7.2"2"n"("4.0-4.1":"n","4.2-4.;*;"n",�7.0-5.1":"n*,"6.0-7.5":"n","7.0-7.1":"n",28 :"y",28/1-8.3":"y"},"op^min)";{7.0-8.1":"n"|,"!ldroid":{"2.1":"n�,"�.2":"n""2.3":"n","3":"n"("4":"n&,"�.1":"n&,"4.2-4.3":"n"."4.4":�o","4.4,3-4.4.4":"n","00":"n"},�bb":{"7":�n","14":"n"},"o0[mob":;"10":"y","11":y","111":�y","11.5":"y","12":"y","12.1"8�y","2$
:�n"},"and_chr":{"43":"n"},"and_vdb*{"36"2"y"}"iE_mob :{"10�:"n,"11":"n"},#and^uc":�"9.9": n"}},"�otes":"Where support vOR APNG is mhss�ng, only�the firsp frame ir dispda�ed",notes_by_Nqm":{},"usage_perc_y":39.88,"usAge_`erc_a":0."ucpsefmx"false,"parent":b","keyw/rds"""l"ie_id":""-"ch2ome_id":"B},bvileo":{"title":"Vieeo elemenu"."desc2iption":"Method*f playing videos on 7ebpages (7ithout reauiring a p�ug-in).*,"SPec":"dttp�://h�mt.speC�sxatwc.nrf/�u,tapage/eibdddef-sontand/html+thE-vid�o-eLEeent�,status":"ls","linksb:[{"usl":"ht|ps;//dev.opera.aom/arTicles/vImw/everythinc-you-nudd-to/know-qbo�t-html5-vhdeo-and
y","42":y","43":"i","44":"y},"sAfari":{"3.�":"p","3.2 :"p",&4":&p ,"5":"y"."5.1b:"y","6"�"y","6>1$:"y","7 :"y","7/1"2"y","8":y"},"/pera":{"9":"�",29.5-9.6"2"pb,"32�0-10.3":"�",#10.5"*"p"<"0.6:"y","11"*"y",11.1":"y","�1.5":"y","11.6":"y","12":"y",�12.1":"y","15":"y","16"2"y","17":"y","18":"y", 19":"9","20":"y","21 :"y&,"22"2"y","23":"y","24":"y","25b8"y",b26":"y","27":y",28":"y","29":"y"},"ios_saf":{"3.2":$n","4.0-.1":2y","4.2m4.3":"y","5.0-5.1":"y&,"6.0-6&1":"y",7.0-�.1":"y","8":"y2,"8.1-8.":&y"},"op_mini2:{"5*0-8N0":"n"},"cnlpoid:{"2.1":"N","2.2":"y","".3":"y","3":"y","4"�"1","4.1":2y","4.2-.3":"y","t.4":"y","4.4.3-4.4.4";y","40":"y"},"bb":{"7":�y","q0":"y2},"kp_lob":{�01":"p","11":"y","1!1":"y","01.5":"y","12":"y","02.1":"y","24";"y"},"and_shs":"41":"y"},"anf_ff";z"36":"y"},"ie_mob#:{"10":"y*,"11":"}"},"an�_uc":{"9.9":"y"}},"notes":"","notes_by�num#:{},"�{ace_�erk_y�:94.0=,"esaoe_perc_a":0,"ucpr�fix";f�Lse,"parent":""$"ieywords":"ofhash�hanga,HasJChan'eEvent","ie_id":"#,"chroee_id":""},"ass-sel2":{"titl�":"CSS�2.1 se|ectors*,"desc2iption":"Basic CSS selectors ingluding:p�*` (unkversal seleCtor), `>` (c�ild selector), b:fi2st-ch)ld`� `:link`, `:vishtmd`, @:active`, `:hoveR`� `:focus`, `:lang()`, `+`!(adhacent sibling selector), d[attr]`, `[attr=\"val\"]`, `[aptr=\"val\"]`, ([autr|=\"bar\"]`, `.foo` (cnass sele#tor),�`#�oo` (id selector)","wpec":"http://www.7*org/TR/ASS21.selecto�.(tol&,"status":"pec,"linkc":[{"url":"htTp:?/www.quirksmode/o�g/csS/contents.html ,"tit,e":"Deteiled suppORt infovmation },{"ur|":"http://www.yourhtmlsour�e.com/styleqhdets/adta~ceesglec|orS.jtml","title":"Mxamples of advanced semectors�},{"url":"http://salectivizr,cnm","tidlm":"Selectivizr: Polyfill�for IE-8"},z"ur|"z"itdp://docc.webplatfgbm.org/wiki/css/sehgctors","title":"We�Platform Docs"}],"categories":["CSS2"],"staps":{"ie":{"5.5":"n*,"6"8"0*,"7":"y","8":"y","8"�"�","10":"y"( 11":"y"�"TPb"y },"fisefox":{"2":"y","3":�9&,"3.5":"q"$"2.6""y","=":"q","5":by","6":"y","7":"y","8":"y","9":"y","12*:"y","11":"y","1r":"y","13":"q*,14":"y","15":"y"("16":"{","17":"y","18":"y",";";"y,#28":"y&,21":"}","22":&y","�3":�y"-"24">"y","25"*"y","26":"y,&27":"y",*28":"y",&29":"y","30":"q","31":"y""32"2#y","33":"yb,"34":"y","35":2y&,"36 :"y"�"36"2"yb,"38":"x",&39":*y",40":"y"},"�hrome":{"4":"y","5":"y","6"8"y ,"7":"q","8":"y","9":"q","10&:"y","11":"y","12":"y","13":"}","14":"y","1%":"y","16":"y","97�:"y","08":"y",2!9":"y","20":"y*,�21""y"""2":"9""23":"y*,"24":"y","25":"y�,*67":"y""27"��{","28":"y""29b2"{","30":"y","30": y"<#32":�y","33":*}","34":"9","35":"y","36"z"y","37":"y","3�":"y",�39":"y","40":"y","41":y""42""y","43":"y","44"�2y"],"safari":;"2.1":"y","3.2":"y","�b:"y","5":"y"("=.1""Y,"6&:"y","6.1":"y",b7":"y","7.1":"y"-"8:"�"}�"Opera"�{"9":"y","9.�/9.6":"y","10.0-10.1":"y","10.5*:"y",b10&6":&y","11":"y*,"11.1"Zy","11.5": y","11.6""y,"12":"y","12.1";"y"
24":"y","25":"y","26":"y","27":"y","28":"y","29":"y2,"30":"y","11"*"y","32":"y","23":"y","34":"y#,"34*:"y",#36":"9""37":"y"<"3:">"y","79":"y","4�":"y"("49":"y","42":"y","43":"i","44":"}"},"sadari":{"3.1":"a","3.2:"a&,"4":"y,1b:by","5.1":"y","6":"y""6&1":"y","7"8by","7.1":"y","8":"y"},"ope�`":{"9":"n","9.5-9.6":"y","10.8-10.1"z"y","12�5":"y","10.4":"y","11":"y",b11.1"8(y","11.5":"y","11.6":"x","2":"y","12.�#�"y*,"1�":"y","1&":"y","17":"q""18":"y","1;&z"y","0":"i","21""y","22"2`y","23":"q2,#4":"y",�25":"y",b"6":6y",":7":"y","0:#:"q","29":"x"}."ins_sef":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"a"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"a","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y #1","11":"y #1"},"and_uc":{"9.9":"y"}},"notes":"Opera Mini ignores the blur-radius set, so no blur effect is visible. Text-shadow behavior can be somewhat emulated in older IE versions using the non-standard \"dropshadow\" or \"glow\" filters. \r\n\r\nPartial support in Safari 3.* refers to not supporting multiple shadows.","notes_by_num":{"1":"IE 10+ supports a fourth length value for the shadow's \"spread\". This is not (yet) part of the specification. "},"usage_perc_y":90.15,"usage_perc_a":2.88,"ucprefix":false,"parent":"","keywords":"text shadow","ie_id":"","chrome_id":""},"css-boxshadow":{"title":"CSS3 Box-shadow","description":"Method of displaying an inner or outer shadow effect to elements","spec":"http://www.w3.org/TR/css3-background/#box-shadow","status":"cr","links":[{"url":"https://developer.mozilla.org/En/CSS/-moz-box-shadow","title":"MDN article"},{"url":"http://westciv.com/tools/boxshadows/index.html","title":"Live editor"},{"url":"http://tests.themasta.com/blogstuff/boxshadowdemo.html","title":"Demo of various effects"},{"url":"http://www.css3files.com/shadow/","title":"Information page"},{"url":"http://docs.webplatform.org/wiki/css/properties/box-shadow","title":"WebPlatform Docs"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"y","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"y x","3.6":"y x","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y x","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"a x","3.2":"a x","4":"a x","5":"y x","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"a x","4.0-4.1":"y x","4.2-4.3":"y x","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"a x","2.2":"a x","2.3":"a x","3":"a x","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y x","10":"y"},"op_mob":{"10":"n","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y"}},"notes":"Can be partially emulated in older IE versions using the non-standard \"shadow\" filter. Partial support in Safari, iOS Safari and Android Browser refers to missing \"inset\", blur radius value, and multiple shadow support.","notes_by_num":{},"usage_perc_y":91.68,"usage_perc_a":0.17,"ucprefix":false,"parent":"","keywords":"box-shadows,boxshadows,box shadow,shaow","ie_id":"","chrome_id":""},"css3-colors":{"title":"CSS3 Colors","description":"Method of describing colors using Hue, Saturation and Lightness (hsl()) rather than just RGB, as well as allowing alpha-transparency with rgba() and hsla().","spec":"http://www.w3.org/TR/css3-color/","status":"rec","links":[{"url":"https://dev.opera.com/articles/view/color-in-opera-10-hsl-rgb-and-alpha-transparency/","title":"Dev.Opera article"},{"url":"http://www.css3files.com/color/","title":"Information page"},{"url":"http://docs.webplatform.org/wiki/css/color#RGBA_Notation","title":"WebPlatform Docs"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"y","10":"y","11":"y","TP":"y"},"firefox":{"2":"a","3":"y","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"y","3.2":"y","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"a","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y"}},"notes":"","notes_by_num":{},"usage_perc_y":94.7,"usage_perc_a":0.03,"ucprefix":false,"parent":"","keywords":"rgb,hsl,rgba,hsla","ie_id":"","chrome_id":""},"css3-boxsizing":{"title":"CSS3 Box-sizing","description":"Method of specifying whether or not an element's borders and padding should be included in size units","spec":"http://www.w3.org/TR/css3-ui/#box-sizing","status":"wd","links":[{"url":"https://developer.mozilla.org/En/CSS/Box-sizing","title":"MDN article"},{"url":"http://www.456bereastreet.com/archive/201104/controlling_width_with_css3_box-sizing/","title":"Blog post"},{"url":"https://github.com/Schepp/box-sizing-polyfill","title":"Polyfill for IE"},{"url":"http://css-tricks.com/box-sizing/","title":"CSS Tricks"},{"url":"http://docs.webplatform.org/wiki/css/properties/box-sizing","title":"WebPlatform Docs"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"p","6":"p","7":"p","8":"a","9":"a","10":"a","11":"a","TP":"a"},"firefox":{"2":"y x","3":"y x","3.5":"y x","3.6":"y x","4":"y x","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"a x","5":"a x","6":"a x","7":"a x","8":"a x","9":"a x","10":"a","11":"a","12":"a","13":"a","14":"a","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"a","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a","30":"a","31":"a","32":"a","33":"a","34":"a","35":"a","36":"a","37":"a","38":"a","39":"a","40":"a","41":"a","42":"a","43":"a","44":"a"},"safari":{"3.1":"a x","3.2":"a x","4":"a x","5":"a x","5.1":"a","6":"a","6.1":"a","7":"a","7.1":"a","8":"a"},"opera":{"9":"n","9.5-9.6":"a","10.0-10.1":"a","10.5":"a","10.6":"a","11":"a","11.1":"a","11.5":"a","11.6":"a","12":"a","12.1":"a","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"a","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a"},"ios_saf":{"3.2":"a x","4.0-4.1":"a x","4.2-4.3":"a x","5.0-5.1":"a","6.0-6.1":"a","7.0-7.1":"a","8":"a","8.1-8.3":"a"},"op_mini":{"5.0-8.0":"a"},"android":{"2.1":"a x","2.2":"a x","2.3":"a x","3":"a x","4":"a","4.1":"a","4.2-4.3":"a","4.4":"a","4.4.3-4.4.4":"a","40":"a"},"bb":{"7":"a x","10":"a"},"op_mob":{"10":"a","11":"a","11.1":"a","11.5":"a","12":"a","12.1":"a","24":"a"},"and_chr":{"41":"a"},"and_ff":{"36":"y"},"ie_mob":{"10":"a","11":"a"},"and_uc":{"9.9":"a"}},"notes":"Partial support refers to supporting only the `content-box` and `border-box` values, not `padding-box` (which was added to the spec later).","notes_by_num":{},"usage_perc_y":12.4,"usage_perc_a":84.66,"ucprefix":false,"parent":"","keywords":"border-box,content-box,padding-box","ie_id":"","chrome_id":""},"css-mediaqueries":{"title":"CSS3 Media Queries","description":"Method of applying styles based on media information. Includes things like page and device dimensions","spec":"http://www.w3.org/TR/css3-mediaqueries/","status":"rec","links":[{"url":"http://ie.microsoft.com/testdrive/HTML5/85CSS3_MediaQueries/","title":"IE demo page with information"},{"url":"http://webdesignerwall.com/tutorials/responsive-design-with-css3-media-queries","title":"Media Queries tutorial"},{"url":"https://github.com/scottjehl/Respond","title":"Polyfill for IE"},{"url":"http://docs.webplatform.org/wiki/css/atrules/@media","title":"WebPlatform Docs"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"p","6":"p","7":"p","8":"p","9":"y","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"a","3.2":"a","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"y","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y"}},"notes":"Incomplete support by older webkit browsers refers to only acknowledging different media rules on page reload","notes_by_num":{},"usage_perc_y":94.66,"usage_perc_a":0.01,"ucprefix":false,"parent":"","keywords":"@media","ie_id":"","chrome_id":""},"multicolumn":{"title":"CSS3 Multiple column layout","description":"Method of flowing information in multiple columns","spec":"http://www.w3.org/TR/css3-multicol/","status":"cr","links":[{"url":"https://dev.opera.com/articles/view/css3-multi-column-layout/","title":"Dev.Opera article"},{"url":"http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/an-introduction-to-the-css3-multiple-column-layout-module/","title":"Introduction page"},{"url":"http://docs.webplatform.org/wiki/css/properties/column-width","title":"WebPlatform Docs"},{"url":"https://github.com/BetleyWhitehorne/CSS3MultiColumn","title":"Polyfill"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"a x","3":"a x","3.5":"a x","3.6":"a x","4":"a x","5":"a x","6":"a x","7":"a x","8":"a x","9":"a x","10":"a x","11":"a x","12":"a x","13":"a x","14":"a x","15":"a x","16":"a x","17":"a x","18":"a x","19":"a x","20":"a x","21":"a x","22":"a x","23":"a x","24":"a x","25":"a x","26":"a x","27":"a x","28":"a x","29":"a x","30":"a x","31":"a x","32":"a x","33":"a x","34":"a x","35":"a x","36":"a x","37":"a x","38":"a x","39":"a x","40":"a x"},"chrome":{"4":"a x","5":"a x","6":"a x","7":"a x","8":"a x","9":"a x","10":"a x","11":"a x","12":"a x","13":"a x","14":"a x","15":"a x","16":"a x","17":"a x","18":"a x","19":"a x","20":"a x","21":"a x","22":"a x","23":"a x","24":"a x","25":"a x","26":"a x","27":"a x","28":"a x","29":"a x","30":"a x","31":"a x","32":"a x","33":"a x","34":"a x","35":"a x","36":"a x","37":"a x","38":"a x","39":"a x","40":"a x","41":"a x","42":"a x","43":"a x","44":"a x"},"safari":{"3.1":"a x","3.2":"a x","4":"a x","5":"a x","5.1":"a x","6":"a x","6.1":"a x","7":"a x","7.1":"a x","8":"a x"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"a x","16":"a x","17":"a x","18":"a x","19":"a x","20":"a x","21":"a x","22":"a x","23":"a x","24":"a x","25":"a x","26":"a x","27":"a x","28":"a x","29":"a x"},"ios_saf":{"3.2":"a x","4.0-4.1":"a x","4.2-4.3":"a x","5.0-5.1":"a x","6.0-6.1":"a x","7.0-7.1":"a x","8":"a x","8.1-8.3":"a x"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"a x","2.2":"a x","2.3":"a x","3":"a x","4":"a x","4.1":"a x","4.2-4.3":"a x","4.4":"a x","4.4.3-4.4.4":"a x","40":"a x"},"bb":{"7":"a x","10":"a x"},"op_mob":{"10":"n","11":"n","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"a x"},"and_chr":{"41":"a x"},"and_ff":{"36":"a x"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"a x"}},"notes":"Partial support refers to not supporting the `break-before`, `break-after`, `break-inside` properties. Webkit browsers do have equivalent support for the non-standard `-webkit-column-break-*` properties while Firefox supports `page-break-*` to accomplish the same result (but only the `auto` and `always' values).","notes_by_num":{},"usage_perc_y":13.06,"usage_perc_a":79.98,"ucprefix":false,"parent":"","keywords":"column-count","ie_id":"multicolumnfullsupport","chrome_id":"6526151266664448"},"border-radius":{"title":"CSS3 Border-radius (rounded corners)","description":"Method of making the border corners round","spec":"http://www.w3.org/TR/css3-background/#the-border-radius","status":"cr","links":[{"url":"http://border-radius.com","title":"Border-radius CSS Generator"},{"url":"http://muddledramblings.com/table-of-css3-border-radius-compliance","title":"Detailed compliance table"},{"url":"http://www.css3files.com/border/#borderradius","title":"Information page"},{"url":"http://css3pie.com/","title":"Polyfill which includes border-radius"},{"url":"http://docs.webplatform.org/wiki/css/properties/border-radius","title":"WebPlatform Docs"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"y","10":"y","11":"y","TP":"y"},"firefox":{"2":"a x","3":"y x","3.5":"y x","3.6":"y x","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y x","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"y x","3.2":"y x","4":"y x","5":"y","5.1":"y #1","6":"y #1","6.1":"y #1","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","2"2"x","2!*:"y","�6":"y","25":"y","28":"y""2=":"y"},"ios_saf"8{23.2":"y x"�(4.0-4.1":"y","5.2-4/3"z"{","5.�-5.1#:"y","6.0�6.1":"y,"7.0/6.5":"y"$"8":"y","8.1-8.3b:"i"},"op�mini":{"5.0-8.0":"n"},"aldroid":{ 2.1":"y x","2.2":"y","2.3":"y","3�:"y",#<":"y","4.1": y","4.2=.3":"y","4.4":"}","4.4.2-4.4.4":"y*, 40":"y"},"bb":{27":"y","10":"y"},"p_mob":{"10":"n","11"8"y","11.1":"y�,"11n5":"y"l"13":"y","12.1""y","24":"y"},"and_chr":{241":"y"$"ald_ff"�{"36":2y"},"ie_�ob":{"00":"}",11":"y"],"and_uc"8y"9.9":"y"}},"notus":"","notes_by_num":{"1":"Safari 6.1 and eAr|ier did not appli `border-radiuw` correctly to imcge bordgrs:!http:/+st!ckoferflou.com/q/1722128"},"uwage_perc^y"z91.89,"usage_perc_a":0.02,"ucprefix":falsm,"parent":"","keywmrdsb:�roundmd�o�Ners, border radiuw,--oz-border-ra�ius","iead*z�","chrgmeWit">""},�tra.sforms2d"*{"title":"CSS3�TransfovM3", description":"Method of transfori�ng an mlement incmuding rotating, scal)ng, etc.","spec":"hptp�/Www.w3.ore/TR/css3-2d-transforms/","status":"vd","links":[{#url":"http://wuw.westciv*c�m/�ools/tranqfOrms/","tit,e"8"Live edi�or"},�"urm":&https:-/haveloper.mobil|a.org/en/CSS/-moj)trancform","title":"MDN article"},{"urd":jttp://www.webrusourcesddpot.com/grosa-browser
has.js tect"},{"url":"Http://docsNwebtlat&orm.oR#/wiji/css/traNwforms/�rajsform",#uitle":"VebPlatform DoKs"�]("catugorIes":["C[S3"],"qtatw":{"iu":s"5.5"z"n ,"6": p","5":"p","8"z"p","9":"y x","10":"y","11":"y",&TP":"Y"},"fipefox":{"2":"n$,"3":2n","3.1";"y x","3.6":"y x ("4":"y x�,"5":"y x","6":"y x","7":"y z","8":"y x","":"y x","�0*:"y x�"11":by x","12&:"y x","1#":"y x","16":"y x","15":*y x","16":"q","1":"y","18":"x","19":"x","20":"y&,"21":"y�,"22&:"y","23":"y","24":"y","25": 9#,"2":"y","27":"y","28":#y","29 "y","20"z"y","31":"y2,"32":"{"-"33�:"y","34":"y","35":2y",#36":&q","37":"y","30":"y","3b:"{","40":"y"},"chrome":k"4":"90p","5":"y x","6":"y y","7"*"y`x","8":"y"x","9":"y(x","10":"y x","11":"y x�,"12":"y x"$"3"8"y x","14":"y(x","15":"y x","16"2"y x","17.:"y x","18""y x#,"19":2y x", 00+:"y x","21":"y p","22":"� x","23"""y x",224"8"y x","25":"y x","26#:b{!x","27":"} x","28":"y x","29":"y x","3p":"y x","31":"y0x","32":"9 x",b33":"y x","34":"y z","35""y x"-"36"
y","33":"y","38";"q","39":"y",b40":"y","41":"y","42":"y"�"4s":"y","44"2"y"},"safari":{"3>1":"y x","3.2":"y x","0":"� h"."5":"q x","5>1""y x","6":"y x","4.1":2y x","7":"y x","7.1":"y x","8":"y h","opepa":{"9":"n*, 9.5-9.6":"n"l"10.0-90.1":"n"."10.=":"y x"l"10.6":"y x",21!"*"y x","11.1":"y x","11.5":"� x"$"11/6"2"y y","12":"y z",�12.1":"y"<"15":"y x","16":"y�x","17&:"y(x","18":"9 x","19":"y x","20":"y x","2�":"y x�,"22":"y x","23":"y","24":"y","65":#y","26":"y",27":"y","28":�y","29":"y"}l"ios_saf":{"3.2":"y x","4.0-4.1":"y xb,"4.2-4.3":"y x","1.0-5.1:&y X","6/0-6.1b:"y�x&,"s.0-7.1":"y x#,"8":"y x(,"8.1-x32:"y x"},"op_mi.i":{"5.2-0.4":"n"},"andr/idb:{"2.1":"y x","6.2"r�y x","3.3":"y x","3":"y �","t":"y x","4.3"2"y x""4.2-4.3":"y x","4.4":"y(x","4.4.3m4.4/0":&y �","40":.y"},""bc:{"7":"y x ,"10":2y x"},"op_mob":s"10":"n","11":"�","11.1":"y",�11.5":"y","12"8"y",�12.1": y","24":"y"},"and_chrb:{"4q":"y"},"and_ff":{*36":"y"},"ie_mkb"{"40":"{",11":"y"},"and_Ug""9�9":"y x"}},"notes":"The scale transborm can "m`emelited in Ie <"9 �sing Microsoft's L"zoom]" extension, otHers are (not easily) pOswible usino the M� Matrix filter","fotes_by_ntm":s},"uscgE_perc_y"�91.85,"usage[perc_a":0,"uc0refix2:f�ls�,"0arejt":&","oeywords":"trAnsdormapion,translatE,rotation,rmvete,sc!le,css-transborms","ie_id":"traNsforms&,"chrome_id"�&643'640500628480"},"use-strict":["title":"ECM�Script 1�Strict Mode","duscrmp|ion""Method of placing cofe in A \"strict\" Operatang`ccntext*",s`ec&:"`ttp:/.eama-inTernatioNal.org/ecma-662/5.1/#sec-14.1&,#status":"the2","link�":[{"�zlr:"hdtp://ajoh..opg/Blow.�cmascript-4-cT�ict-mnde�bson-cnd-more/","title":"Informatio� page"}{"usl":"hdtp://javascrI0tweclog&word`rdss.cmm/6051/05/01/javascript-sTriCt-mode/","title":�rticle wiph test suite"}],"categorier":["Other"\,stats":{"ie":�"5.5":"n","2":"n","7":"n","8":"o"l"9#:"n","10":"y","11"8"x","T�":"y"],"firefox&:{2";"n2,"3":"f","3.5:"n","3.6":"n","4":"y","5":"y","6":*y","7":"q","8">"y","9"*"y","10""y","11":"y","12"6"y","13":"y","16":*y","15":"y","16":"y",217":"y","18":"y","192:"yb,"2 ":"}",&21":by""22":"9",*23":"y","64":"y","25":"Y","26":&y","27"8"yb,228":"y","29":"y","38":"y","33":"y�,"32":"y","�3":"y","34"8"y","35":"y","36":"y",";72:"y#,"38":"y","39&:by","40":"}},�chrkme":{"4"
"n","5"z"n","6":"n"l"7":"n","8":"n"$"9":"n","10": n", 11"�"n","12":"n","13">"y",*14":"y","15":"y","17":"y"�"17"�by","18":"y"("19":"y","20":"y"-21":"y","22""y","23&:"}","24":"y","27":"y","26":"y","27":"y","28":"y","29":"y","#0":"y",�31":"y","32":"y","3":"�*,*34":"Y","35":#Y"$"36":"y"l"37":"y","38":�y","39":"y",�40">"yb,"61�:"y","4r":"y",�43":"y","44":"�"},"safari":{"3,1":"n","3.2":"n"$"42:"n", 5":#a","5.0":"c","6""y","6/1":"y","7":"y"$"6.1*�y",�8":"i"},*opera"�y"9":"n", 9.5-9.6"z"~","10.0-10.1":"n","10.5":"n","1 .6":"n","11"."n","10.1":"�","11.�"8"n","11.6":"y","12":"y","12.1":"y","15r:"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22";"y","23":"9","24":"y",#25"�by","2622"y","27":"y","28":by","9":"y"},"ios_saf":{23&2":"n","4.0-4nq"z"N","4.2-4.3"*"n",�5.0-5.1"z"y2,"6.0-6.1":"y","7.0-71":"}"�"8":"y","8.1-8.3":"y"}<"op�mini":{"5.0-860":"N"},"androif#:{"2*1":"n","2.2":"n*,"2.3":"N","3*:"y",24":"y",".1":"y""4.2-4.3":"y"$"4.4":"y","4.<.3)4.4.4":y","40":"Y&},"`b":{"7":"y#,"10":"y"},"op_Mob"{"10">"n","11":"n , 11.1":"n","11.5":"y ,"12":"y","3.3":"y","24":"y"},"and_chr":{"41":#q"},"and_ff":{"36":"y"},"ie_mob":y"10":"y","!1":"y!},"ald�uc":{"9.9":"y"}},"notes":"Partial support in0old�r Safary refers to strict"mode sdill qccapting"a lov �f JS(that should be consiDeret invalid.","noues_r�_num":{},"usag%_perc_y":89.25,"usage_peRc_`":0.4,"ucprefix":false,"parent":"","keywozds":"","iaid2:"","chrome_Id":""},"tr�nsforms9d*:{"tmtLe":"CS3 1D Transforos","desbriptiol":"Methnd of transfosmi�g an elemenp in t`e third dimgnrion usmng the `t2ansfkrm` prpestY. Includes {uPport!for the `perspuctmve` property to set |he Perspective in�z
y x"�"33&:"y x","34":"y x"�"35":"y x","36":"y x","3*:"x x","38">"y x","39"z"y z","40:"y x"},"chrome2:z"4":bn","5"z"n","6":"�","7":"n","8";"n","9":".","18":"n","11":"n",j12":"n""13":"n"lb14":"n","15":n&,"16 :"n","17"*"n","18":"n","19":"n"�"20":"n","21":"n","22":#n"�"23":"n","24":"n","25";"n",#2>":"n""27";"n2,"28":"l"l"29":"n","30":"n",*31":"n","32":"n","33":"n","34":"n","35":"n","36":"~",*37":"n","38":"n","39":"n","40":"n","41":"n","42":"n","43":"n","44":bn"}- saFari"2{"3.1#:"n",2;.r":"n","<":"n","5":"n�"5.1":"y x","6":"y x","6,1":"y x",:7": y x","7.1":*y x","8":y y"},"Opara":{9":"n","9.5-9.r":"o",q0.0-10.1":"n","00n5":"n","!0.6":bn","11":"n","19.12:"n", 11.5":n","11*6":"N"."10":"n","52.1":"~","15"*"n","16":"n","1?":"n","18":"n","59":"n","20"z"n","21":"n","26":"n","23":�n",&24":"n","25":"n"."2&":2n","27":"n","28":"n","29":"n"},"ios_qaf":{"3.2":"n","4.0-4.1b: n","4.2-4n�":"y x","1.1-�.":"} p","6.0-6�1":"[ x","70-7.1":"y x&,"<":"y x","8.1=8.3#z"y x"},"op_mi~i":{"5.2-8.0":"n"},"ajlroid":{"2.1":"n",*2.6":�n"�"2.3":"n"l"7">"n","4":"n","4.1"2"n","4.2-$.3b:".","4.4":"n","4.4.3-4.4�4":"n","40":"n"},"b`�:{"'":"n","10":&n"}$"op_mob":{"10":"n","11":"n","11.1b"l&,"13.5":"F","12":"n","12*1":"n3"24 :"n"}"and_chr":{"41&>"n"},"ane_ff":{"36":"q 8"},"ie_mob":z"10":#n","11":"n"},"and_uc":{"9.9":"a x*}m,"no4es*:"Chrome 69- ant An�roid�4>0 Brkwser ruppo2t \"-webkit-hyphens: none\", b}t not the \"auto\� proper4y. Chrome 30+ doesn't �up`ort it eiTher, It$is [advisabde to s!t the @lang attribu4e](http:'/blog.adrmanbNselli.com/2015/01/on-use-of-lanc-attrhbute.ltml) on t(e HTM\ el%ment to enafle hyphen�tign suppnrt `nd im`rov% caceysibility.","nnt%s_b}[num":{],"usage_perc_y"z32.b3,"usage_pdrcWa":4.25,"ucprefix":fa�se,"parend":"","keywords":"hyrhen,shy","ie_iD":2",chr�me_id":"2},&css-transitionS":{"tiple":"GSS3 Transitimns","$e3crip|ion"8"Simple(method of!animating cerpahn pboperties of an eleeent.","spec":"jttx://gww.w3.org/�R/c3s3-transitions'"<"s|atus":&w`","links"*[{"url":"itup://wWw.wajdesignerdEpo�.cOm/2050/01/�s{�transiTa�ns%101/"�"title":"Asticde on!usage"}.{*}rl"2"http://vww.css3fi,�s.boo/transition/","title":"I.formation`page"}<{"url":bhttp://w7w.the-art-ofmweb.com/gss/ti-ing-vunction/","t�tle":"Uxamples!oo �iming functions"},{"url"*"http:�/www.opera.som-docs/sp%�s/presto2.10/css/transitions/",�tiTle":"Ani�Ation of property ty0es suppovu0in Opera"},{"�rn
:"(ttp://docs.webplatfOrm.org/wikh�cs3/pzotertids-tranrition","title*:"WebPlatform Docs"}]-"categorias":["CSS3"],"stats":{"ie"8{"5.5":".",">":"n","7":"n"(28":"f","9":"n","10":"y"<"11":"y","TP":"y"},"firefox":{62":"n","3":"n","3.5":"n","3.6":"n","�":"y x","5":"y x","6":by p"$"7":"y x","8 :"y x","9":"y x","10"�"y$8","11":"y |","�2":"y x2,"13":"y x","14":!y x","15":"y x"�216":"y",�17":"y","1<":"y#( 19":"y","20";"y"<"21":"y","22":"y","23":"i","26":"y","2":"y",�26":"y","27":"y", 28":"y2,"2y":"x","30":"y""1":"x","32":"y","33":"u"<"34":2y","35":"y",*36":"y","'":"y","38":"y","39"*"y","40":"y"},"cxrome":{"4":"y x","5">"y x","6":"y x","7":"y X"<"8":"y h","9":"y$x","10":"y x","11":"y x","1�":"y x",13"*"y x","s4":"Y x2,"15":"� x","16": y x","17"z�y x","18">"{ x","19": 9 x","20":"y x","21":"y x","2�":"} x","03":"y x2,"24�:"y x","25":"y x","26":"y","27&:"y","28":"y","29":"q","s02:"y"�"31":"�","32":"y#,"3#":"Y","74":"y*,"35":"y","36":"y","37":"y","38":"y"$"39":"y","40";"y","41":"y","42":"q","43":"y","44":"Y"},&safari":{"3.1":"9 X",�3.2":"y x", 4&:"y x","5"2"y x","5n1":"y x","4"z"y x�,"2.1":"y","7":"y","7n1":"y"("8":"i"},"o0era":{"=b:"n","9.5-9.6:"n2,"10.0-10.1":"n","10.5":"y x","10.6":"y x","11":"y x","11.1":"y x","11.5":"y x","11.6":"y x","12":"y x","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y x","4.0-4.1":"y x","4.2-4.3":"y x","5.0-5.1":"y x","6.0-6.1":"y x","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"y x","2.2":"y x","2.3":"y x","3":"y x","4":"y x","4.1":"y x","4.2-4.3":"y x","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y x","10":"y"},"op_mob":{"10":"y x","11":"y x","11.1":"y x","11.5":"y x","12":"y x","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y x"}},"notes":"Support listed is for `transition` properties as well as the `transitionend` event. The prefixed name in WebKit browsers is `webkitTransitionEnd`","notes_by_num":{},"usage_perc_y":90.12,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"css transition,transitionend","ie_id":"","chrome_id":""},"font-feature":{"title":"Font feature settings","description":"Method of applying advanced typographic and language-specific font features to supported OpenType fonts.","spec":"http://w3.org/TR/css3-fonts/#font-rend-props","status":"wd","links":[{"url":"http://ie.microsoft.com/testdrive/Graphics/opentype/","title":"Demo pages (IE/Firefox only)"},{"url":"http://hacks.mozilla.org/2010/11/firefox-4-font-feature-support/","title":"Mozilla hacks article"},{"url":"http://html5accessibility.com/","title":"Detailed tables on accessability support"},{"url":"http://docs.webplatform.org/wiki/css/properties/font-feature-settings","title":"WebPlatform Docs"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"a x","5":"a x","6":"a x","7":"a x","8":"a x","9":"a x","10":"a x","11":"a x","12":"a x","13":"a x","14":"a x","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x","30":"y x","31":"y x","32":"y x","33":"y x","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"a x","17":"a x","18":"a x","19":"a x","20":"a x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x","30":"y x","31":"y x","32":"y x","33":"y x","34":"y x","35":"y x","36":"y x","37":"y x","38":"y x","39":"y x","40":"y x","41":"y x","42":"y x","43":"y x","44":"y x"},"safari":{"3.1":"n","3.2":"n","4":"a","5":"a","5.1":"a","6":"a","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x"},"ios_saf":{"3.2":"a","4.0-4.1":"a","4.2-4.3":"a","5.0-5.1":"a","6.0-6.1":"a","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y x","4.4.3-4.4.4":"y x","40":"y x"},"bb":{"7":"n","10":"y x"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y x"},"and_chr":{"41":"y x"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"y x"}},"notes":"Partial support in older Firefox versions refers to using an older syntax. Partial support in older Chrome versions refers to lacking support in Mac OS X. ","notes_by_num":{},"usage_perc_y":74.95,"usage_perc_a":1.02,"ucprefix":false,"parent":"","keywords":"font-feature,font-feature-settings,kern,kerning,font-variant-alternates,ligatures,font-variant-ligatures","ie_id":"","chrome_id":""},"css-animation":{"title":"CSS3 Animation","description":"Complex method of animating certain properties of an element","spec":"http://www.w3.org/TR/css3-animations/","status":"wd","links":[{"url":"http://robertnyman.com/2010/05/06/css3-animations/","title":"Blog post on usage"},{"url":"http://www.css3files.com/animation/","title":"Information page"},{"url":"http://docs.webplatform.org/wiki/css/properties/animations","title":"WebPlatform Docs"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y x","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x","30":"y x","31":"y x","32":"y x","33":"y x","34":"y x","35":"y x","36":"y x","37":"y x","38":"y x","39":"y x","40":"y x","41":"y x","42":"y x","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"y x","5":"y x","5.1":"y x","6":"y x","6.1":"y x","7":"y x","7.1":"y x","8":"y x"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"y x","12.1":"y","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x"},"ios_saf":{"3.2":"y x","4.0-4.1":"y x","4.2-4.3":"y x","5.0-5.1":"y x","6.0-6.1":"y x","7.0-7.1":"y x","8":"y x","8.1-8.3":"y x"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"a x","2.2":"a x","2.3":"a x","3":"a x","4":"y x","4.1":"y x","4.2-4.3":"y x","4.4":"y x","4.4.3-4.4.4":"y x","40":"y x"},"bb":{"7":"y x","10":"y x"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"y","24":"y x"},"and_chr":{"41":"y x"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y x"}},"notes":"Partial support in Android browser refers to buggy behavior in different scenarios.","notes_by_num":{},"usage_perc_y":89.92,"usage_perc_a":0.11,"ucprefix":false,"parent":"","keywords":"animations,css-animations,keyframe,keyframes","ie_id":"","chrome_id":""},"css-gradients":{"title":"CSS Gradients","description":"Method of defining a linear or radial color gradient as a CSS image.","spec":"http://www.w3.org/TR/css3-images/","status":"cr","links":[{"url":"http://www.colorzilla.com/gradient-editor/","title":"Cross-browser editor"},{"url":"http://www.css3files.com/gradient/","title":"Information page"},{"url":"http://css3pie.com/","title":"Tool to emulate support in IE"},{"url":"http://docs.webplatform.org/wiki/css/functions/linear-gradient","title":"WebPlatform Docs"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"y x","4":"y x","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"a x","5":"a x","6":"a x","7":"a x","8":"a x","9":"a x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"a x","5":"a x","5.1":"y x","6":"y x","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"a x","11.5":"a x","11.6":"y x","12":"y x","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"a x","4.0-4.1":"a x","4.2-4.3":"a x","5.0-5.1":"y x","6.0-6.1":"y x","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"a x","2.2":"a x","2.3":"a x","3":"a x","4":"y x","4.1":"y x","4.2-4.3":"y x","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"a x","10":"y"},"op_mob":{"10":"n","11":"n","11.1":"a x","11.5":"a x","12":"y x","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y x"}},"notes":"Syntax used by browsers with prefixed support may be incompatible with that for proper support. \r\n\r\nPartial support in Opera 11.10 and 11.50 also refers to only having support for linear gradients.\r\n\r\nSupport can be somewhat emulated in older IE versions using the non-standard \"gradient\" filter. \r\n\r\nFirefox 10+, Opera 11.6+, Chrome 26+ and IE10+ also support the new \"to (side)\" syntax.","notes_by_num":{},"usage_perc_y":89.71,"usage_perc_a":0.45,"ucprefix":false,"parent":"","keywords":"linear,linear-gradient,gradiant","ie_id":"gradients","chrome_id":"5785905063264256"},"css-canvas":{"title":"CSS Canvas Drawings","description":"Method of using HTML5 Canvas as a background image. Not currently part of any specification.","spec":"http://webkit.org/blog/176/css-canvas-drawing/","status":"unoff","links":[{"url":"http://webkit.org/blog/176/css-canvas-drawing/","title":"Webkit blog post"}],"categories":["CSS"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"u","39":"u","40":"u"},"chrome":{"4":"y x","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x","30":"y x","31":"y x","32":"y x","33":"y x","34":"y x","35":"y x","36":"y x","37":"y x","38":"y x","39":"y x","40":"y x","41":"y x","42":"y x","43":"y x","44":"y x"},"safari":{"3.1":"n","3.2":"n","4":"y x","5":"y x","5.1":"y x","6":"y x","6.1":"y x","7":"y x","7.1":"y x","8":"y x"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x"},"ios_saf":{"3.2":"y x","4.0-4.1":"y x","4.2-4.3":"y x","5.0-5.1":"y x","6.0-6.1":"y x","7.0-7.1":"y x","8":"y x","8.1-8.3":"y x"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"y x","2.2":"y x","2.3":"y x","3":"y x","4":"y x","4.1":"y x","4.2-4.3":"y x","4.4":"y x","4.4.3-4.4.4":"y x","40":"y x"},"bb":{"7":"y x","10":"y x"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y x"},"and_chr":{"41":"y x"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"y x"}},"notes":"A similar effect can be achieved in Firefox 4+ using the -moz-element() background property","notes_by_num":{},"usage_perc_y":67.57,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":""},"css-reflections":{"title":"CSS Reflections","description":"Method of displaying a reflection of an element","spec":"http://webkit.org/blog/182/css-reflections/","status":"unoff","links":[{"url":"http://webkit.org/blog/182/css-reflections/","title":"Webkit blog post"}],"categories":["CSS"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"n","39":"n","40":"n"},"chrome":{"4":"y x","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x","30":"y x","31":"y x","32":"y x","33":"y x","34":"y x","35":"y x","36":"y x","37":"y x","38":"y x","39":"y x","40":"y x","41":"y x","42":"y x","43":"y x","44":"y x"},"safari":{"3.1":"n","3.2":"n","4":"y x","5":"y x","5.1":"y x","6":"y x","6.1":"y x","7":"y x","7.1":"y x","8":"y x"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x"},"ios_saf":{"3.2":"y x","4.0-4.1":"y x","4.2-4.3":"y x","5.0-5.1":"y x","6.0-6.1":"y x","7.0-7.1":"y x","8":"y x","8.1-8.3":"y x"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"y x","2.2":"y x","2.3":"y x","3":"y x","4":"y x","4.1":"y x","4.2-4.3":"y x","4.4":"y x","4.4.3-4.4.4":"y x","40":"y x"},"bb":{"7":"y x","10":"y x"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y x"},"and_chr":{"41":"y x"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"Similar effect can be achieved in Firefox 4+ using the -moz-element() background property","notes_by_num":{},"usage_perc_y":63.32,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"box-reflect","ie_id":"","chrome_id":"5627300510957568"},"css-masks":{"title":"CSS Masks","description":"Method of displaying part of an element, using a selected image as a mask","spec":"http://www.w3.org/TR/css-masking/","status":"cr","links":[{"url":"http://docs.webplatform.org/wiki/css/properties/mask","title":"WebPlatform Docs"},{"url":"http://www.html5rocks.com/en/tutorials/masking/adobe/","title":"HTML5 Rocks article"},{"url":"http://thenittygritty.co/css-masking","title":"Detailed blog post"}],"categories":["CSS"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"a","3.6":"a","4":"a","5":"a","6":"a","7":"a","8":"a","9":"a","10":"a","11":"a","12":"a","13":"a","14":"a","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"a","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a","30":"a","31":"a","32":"a","33":"a","34":"a","35":"a","36":"a","37":"a","38":"a","39":"a","40":"a"},"chrome":{"4":"a x","5":"a x","6":"a x","7":"a x","8":"a x","9":"a x","10":"a x","11":"a x","12":"a x","13":"a x","14":"a x","15":"a x","16":"a x","17":"a x","18":"a x","19":"a x","20":"a x","21":"a x","22":"a x","23":"a x","24":"a x","25":"a x","26":"a x","27":"a x","28":"a x","29":"a x","30":"a x","31":"a x","32":"a x","33":"a x","34":"a x","35":"a x","36":"a x","37":"a x","38":"a x","39":"a x","40":"a x","41":"a x","42":"a x","43":"a x","44":"a x"},"safari":{"3.1":"n","3.2":"n","4":"a x","5":"a x","5.1":"a x","6":"a x","6.1":"a x","7":"a x","7.1":"a x","8":"a x"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"a x","16":"a x","17":"a x","18":"a x","19":"a x","20":"a x","21":"a x","22":"a x","23":"a x","24":"a x","25":"a x","26":"a x","27":"a x","28":"a x","29":"a x"},"ios_saf":{"3.2":"a x","4.0-4.1":"a x","4.2-4.3":"a x","5.0-5.1":"a x","6.0-6.1":"a x","7.0-7.1":"a x","8":"a x","8.1-8.3":"a x"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"a x","2.2":"a x","2.3":"a x","3":"a x","4":"a x","4.1":"a x","4.2-4.3":"a x","4.4":"a x","4.4.3-4.4.4":"a x","40":"a x"},"bb":{"7":"a x","10":"a x"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"a x"},"and_chr":{"41":"a x"},"and_ff":{"36":"a"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"a x"}},"notes":"Partial support in WebKit/Blink browsers refers to supporting the mask-image and mask-box-image properties, but lacks support for other parts of the spec. Partial support in Firefox refers to only support for inline SVG mask elements i.e. mask: url(#foo).","notes_by_num":{},"usage_perc_y":0,"usage_perc_a":79.91,"ucprefix":false,"parent":"","keywords":"","ie_id":"masks","chrome_id":"5381559662149632"},"svg":{"title":"SVG (basic support)","description":"Method of displaying basic Vector Graphics features using the embed or object elements. Refers to the SVG 1.1 spec.","spec":"http://www.w3.org/TR/SVG/","status":"rec","links":[{"url":"http://en.wikipedia.org/wiki/Scalable_Vector_Graphics","title":"Wikipedia"},{"url":"http://www.alistapart.com/articles/using-svg-for-flexible-scalable-and-fun-backgrounds-part-i","title":"A List Apart article"},{"url":"http://svg-wow.org/","title":"SVG showcase site"},{"url":"http://code.google.com/p/svgweb/","title":"SVG Web: Flash-based polyfill"},{"url":"http://svg-edit.googlecode.com","title":"Web-based SVG editor"},{"url":"https://raw.github.com/phiggins42/has.js/master/detect/graphics.js#svg","title":"has.js test"}],"categories":["SVG"],"stats":{"ie":{"5.5":"n","6":"p","7":"p","8":"p","9":"y #2","10":"y #2","11":"y #2","TP":"y #2"},"firefox":{"2":"a","3":"y","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"a","3.2":"y","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"y","9.5-9.6":"y","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"a #1","4":"a #1","4.1":"a #1","4.2-4.3":"a #1","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y #2","11":"y #2"},"and_uc":{"9.9":"y"}},"notes":"","notes_by_num":{"1":"Partial support in Android 3 & 4 refers to not supporting masking.","2":"IE9-11 desktop & mobile don't properly scale SVG files.  [Adding height, width, viewBox, and CSS rules](http://codepen.io/tomByrer/pen/qEBbzw?editors=110) seem to be the best workaround."},"usage_perc_y":92.14,"usage_perc_a":2.49,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":""},"svg-css":{"title":"SVG in CSS backgrounds","description":"Method of using SVG images as CSS backgrounds","spec":"http://www.w3.org/TR/css3-background/#background-image","status":"cr","links":[{"url":"http://www.sitepoint.com/a-farewell-to-css3-gradients/","title":"Tutorial for advanced effects"}],"categories":["CSS3","SVG"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"y","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"a","5":"a","6":"a","7":"a","8":"a","9":"a","10":"a","11":"a","12":"a","13":"a","14":"a","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"a","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"a","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"a","4":"a","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"y","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"a","4.0-4.1":"a","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"a"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"a","11":"a","11.1":"a","11.5":"a","12":"a","12.1":"a","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y"}},"notes":"Partial support in older Firefox and Opera Mini/Mobile refers to SVG images being blurry when scaled. Partial support in iOS Safari and older Safari versions refers to failing to support tiling or the background-position property.","notes_by_num":{},"usage_perc_y":90.99,"usage_perc_a":3.48,"ucprefix":false,"parent":"","keywords":"svg-in-css,svgincss,css-svg","ie_id":"","chrome_id":""},"svg-smil":{"title":"SVG SMIL animation","description":"Method of using animation elements to animate SVG images","spec":"http://www.w3.org/TR/SVG/animate.html","status":"rec","links":[{"url":"http://svg-wow.org/blog/category/animation/","title":"Examples on SVG WOW"},{"url":"https://developer.mozilla.org/en/SVG/SVG_animation_with_SMIL","title":"MDN article"},{"url":"http://leunen.me/fakesmile/","title":"JS library to support SMIL in SVG"},{"url":"https://raw.github.com/phiggins42/has.js/master/detect/graphics.js#svg-smil","title":"has.js test"},{"url":"https://github.com/madsgraphics/SVGEventListener","title":"Polyfill for SMIL animate events on SVG"}],"categories":["SVG"],"stats":{"ie":{"5.5":"n","6":"p","7":"p","8":"p","9":"p","10":"p","11":"p","TP":"p"},"firefox":{"2":"p","3":"p","3.5":"p","3.6":"p","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"a","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"p","3.2":"p","4":"a","5":"a","5.1":"a","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"y","9.5-9.6":"y","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"a","4.0-4.1":"a","4.2-4.3":"a","5.0-5.1":"a","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"p","11":"p"},"and_uc":{"9.9":"y"}},"notes":"Partial support in older Safari versions refers to not working in HTML files or CSS background images.","notes_by_num":{},"usage_perc_y":79.5,"usage_perc_a":0.56,"ucprefix":false,"parent":"","keywords":"","ie_id":"svgsmilanimation","chrome_id":""},"svg-fonts":{"title":"SVG fonts","description":"Method of using fonts defined as SVG shapes. Considered among a number of browser vendors as a deprecated feature with support being removed.","spec":"http://www.w3.org/TR/SVG/fonts.html","status":"rec","links":[{"url":"http://jeremie.patonnier.net/post/2011/02/07/Why-are-SVG-Fonts-so-different","title":"Blog post"},{"url":"http://opentype.info/blog/2010/04/13/the-ipad-and-svg-fonts-in-mobile-safari/","title":"Blog post on usage for iPad"}],"categories":["SVG"],"stats":{"ie":{"5.5":"n","6":"p","7":"p","8":"p","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"n","39":"n","40":"n"},"chrome":{"4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"n #1","39":"n #1","40":"n #1","41":"n #1","42":"n #1","43":"n #1","44":"n #1"},"safari":{"3.1":"n","3.2":"y","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"y","9.5-9.6":"y","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"n #1","26":"n #1","27":"n #1","28":"n #1","29":"n #1"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n #2"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"n"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"n #1"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"y"}},"notes":"","notes_by_num":{"1":"Chrome 38 and newer support SVG fonts only on Windows Vista and XP.","2":"Supported in Opera Mini in SVG images only, not in HTML."},"usage_perc_y":26.28,"usage_perc_a":0,"ucprefix":false,"parent":"fontface","keywords":"","ie_id":"","chrome_id":"5930075908210688"},"svg-filters":{"title":"SVG filters","description":"Method of using photoshop-like effects on SVG objects including blurring and color manipulation.","spec":"http://www.w3.org/TR/SVG/filters.html","status":"rec","links":[{"url":"http://electricbeach.org/?p=950","title":"Experiments with filter effects"},{"url":"http://svg-wow.org/blog/category/filters/","title":"SVG filter demos"},{"url":"http://docs.webplatform.org/wiki/svg/elements/filter","title":"WebPlatform Docs"}],"categories":["SVG"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"y","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"a","6":"a","7":"a","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"y","9.5-9.6":"y","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"n","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y"}},"notes":"","notes_by_num":{},"usage_perc_y":89.82,"usage_perc_a":0.03,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":""},"svg-html":{"title":"SVG effects for HTML","description":"Method of using SVG transforms, filters, etc on HTML elements using either CSS or the foreignObject element","spec":"http://www.w3.org/TR/SVG11/extend.html#ForeignObjectElement","status":"wd","links":[{"url":"https://developer.mozilla.org/en/SVG/Tutorial/Other_content_in_SVG","title":"MDN Tutorial"},{"url":"https://developer.mozilla.org/En/Applying_SVG_effects_to_HTML_content","title":"MDN Reference page"},{"url":"http://www.w3.org/TR/filter-effects/","title":"Filter Effects draft"}],"categories":["SVG"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"a","10":"a","11":"a","TP":"y"},"firefox":{"2":"n","3":"a","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"a","5":"a","6":"a","7":"a","8":"a","9":"a","10":"a","11":"a","12":"a","13":"a","14":"a","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"a","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a","30":"a","31":"a","32":"a","33":"a","34":"a","35":"a","36":"a","37":"a","38":"a","39":"a","40":"a","41":"a","42":"a","43":"a","44":"a"},"safari":{"3.1":"n","3.2":"n","4":"a","5":"a","5.1":"a","6":"a","6.1":"a","7":"a","7.1":"a","8":"a"},"opera":{"9":"a","9.5-9.6":"a","10.0-10.1":"a","10.5":"a","10.6":"a","11":"a","11.1":"a","11.5":"a","11.6":"a","12":"a","12.1":"a","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"a","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a"},"ios_saf":{"3.2":"a","4.0-4.1":"a","4.2-4.3":"a","5.0-5.1":"a","6.0-6.1":"a","7.0-7.1":"a","8":"a","8.1-8.3":"a"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"a","4.4.3-4.4.4":"a","40":"a"},"bb":{"7":"n","10":"y"},"op_mob":{"10":"a","11":"a","11.1":"a","11.5":"a","12":"a","12.1":"a","24":"a"},"and_chr":{"41":"a"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"Partial support refers to lack of filter support or buggy result from effects. A [CSS Filter Effects](http://www.w3.org/TR/filter-effects/) specification is in the works that would replace this method.","notes_by_num":{},"usage_perc_y":12.34,"usage_perc_a":71.95,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":""},"svg-html5":{"title":"Inline SVG in HTML5","description":"Method of using SVG tags directly in HTML documents. Requires HTML5 parser.","spec":"https://html.spec.whatwg.org/multipage/embedded-content.html#svg-0","status":"ls","links":[{"url":"http://hacks.mozilla.org/2010/05/firefox-4-the-html5-parser-inline-svg-speed-and-more/","title":"Mozilla Hacks blog post"},{"url":"http://samples.msdn.microsoft.com/ietestcenter/html5/svghtml_harness.htm?url=SVG_HTML_Elements_001","title":"Test suite"}],"categories":["HTML5","SVG"],"stats":{"ie":{"5.5":"n","6":"p","7":"p","8":"p","9":"y","10":"y","11":"y","TP": y"},"firefox":{":":"p","32:"p","3.5":"p","3.6":"p"("4"22y"<"5":"y","6":"y","7":"y","8":"y","9">"y"("10":"y*,"11":#y","12":"yb,"13";"y#,"!4":"i","15":"9"l"16":"y","17*:"y","18b:"y","19&:"y"("20":"y","21":"y","2�"8"y","23":"y","242:"y",#25":"y"."26":"y","27":"{","28#:"y","29":"y,"30&:"y","31":"y",b3:";"y","33":"y ,"34";by",35":#y","34":"}","37":2y","38":"y*,"#8:"y","40":"yb},"chrome":�"4":"p","5":"p","6":"p","7":"y","8b:*y*,"9":"y","10""y","15&:"y",*12":"y",&13":"y2,"14":*y","15":"y","1�":"y",#57":#y","1x":"y","19"�"y�,"202;"y"-"21":"i","02":"y","23�>"9�,"24":"y","25":"y",""v":"{","27":"y",22x*"Y","29":"y"L*30":'y",";1";"u*,"32":"y","33":"y","342: y","35":"x","36":"y","3?":"y","38":"y","3;":"{","40"8"y","41": y","42*:"y","$ :*y"("44":"y"},�safari":{"3.9":"p#,"7*2":"p","4":"p","5";"p","5.1":"y","7":"y","6.1":"y","7"�"y","7.s2:"�*,"8":"y"=,"kpera":;"9":"p","9.5�9&6":"p","14.0-10.1":"p","10.5&:"p2"10>62:"n ,"11":.","11.1":�l",.11.5":"N","11.6":"y","12&:"y","12/1":"y","15":"y","16":"x","17":*y","18":"y","192:"y","20":"y","2":"y","22":"y","27":"yb,"64":"]","25":"y","26#:*y","27":"�","28":2y","29">"y"\,*ios^saf":{"3.22: p","4.0-4.1":"p","4.2-4.#":"�","5.�-5.1"z"y","6.0->.1""y",�7.0-7.5":"y","8":"}","8.-8.3*z"y"},"op_mini"�"5.2-8.0":"y"},#!ndroid�:z"2.1":"n","2.2":"n","2.3":"n","3"9"y","4":"y&,b4.1�:"y#,"4.2-4.S":"i","4.4";"y","4.4.3-4*4.4":"y", t":"y"},"bb":{"7":"y","10":"y"y,*p_mob":;#1p :"p","1�":"�","11,##:"p","11.1":"p","122:"{""12.1"2"y","2<":"}"},"and_chr"+{"41":"Y"}<"ijd_ff":{"36":"y"},"ie_moB�:{"10":"y","11":"y"},"and_uc":{�9.9&:"y}},"jotes"z#","notes_bY_�um":�},"uscge_pdrcOq":;4.1&lusage_parc_a":0,"ucpzefIx":false,"parent":"","keywopds":"","ie_id"*""<"chrome_ie":""},"canves":{"titneb:"Canvas hb�sic support)","dmsKripvaon":"Me�hod of 'ener�tifg fasd, dy.cmmc grarhiCs usang JavaScrixt/","sp�c":"httpS://`tml.spec.whCtwg.org/multiPaga/sc2iptiog.html#uhe-canvas-element",�s4atus""ls","linksb:[{e�l":"https:'/develkpeR.moziLla.org/en/C�nvasOtu|or��l""title">"T5torial by Mo{i|la",y"url":"htTp://wwv.canv�sdemos.gm/","title":"Sho�c!se site"],{"ur�":"http:/.wlimr.rucyforge.org/ccke.canras.html2,&title":&Anhmation kit "},{"url":"http:/.d)veintohtml5.infm/�anves.html","tit|e":"another <utorial"},{"url":"http:?/expln2urcanvas>g�oglecode.com/","title"� Impde-entatmgn for Mnternet�Exphorer"}${"url":�https:/.r`w.ghth5b.co�/phiggins42-has.js/master/dateat/grAphics.js#canvas","title":"has.js(tes4"}],"categories":["Fanvas","JTML5#M,"stats":{"i�":{"5.5:"n","6":"p","7":"p",&8";"p","9"*"y",#10":"y","11":"y","T@":"y"}<"bivefox":{"2":�y","3";"y& 35":"y(,"3.6":"y"$"4":"q","5":"y","6":&�*,"7":"y","8b:"Y","9":"y","10":"y","1!"�"q",#12":"y"("53":"y","342:"y"-"15":"y","16"8"y","17":"y","18":y","19":"y","28":"y","21">"y","22":&y"$"23":"{","24":"y",225":"y","26":"y",""7 :"y","28":"y","29">"y","30":"y",�31":"y","32":2y","33":"y2,"94":"y","35":"y*,*36":"y�,"37":"y","38":"y","39 :y","40":"y��)"chrome2:{"4":"y ,"5":"q","62:"y","?":"y","8":"y""9":"y","1�":"y","10":"y",�12":�9","13":"y"."14":"y","15:"y","1v"*"y�,"17":"y"l*18":"y�$"19b:"y","20":"y"l#21:"y","22":"y","23 :"y","24b:"yb,"2=#:"y","26":"y", 6'"z"y","29":"y ,"2=�:"y",&10":�y"�"31":"y","32":"y","33":"y","34*:"y","3�":cy",b36":"y","37"0"y",b3;":"i",b39":by","40":"y","41":"y","42">"y"�243 :"y","44":y"},"saf�rm":;"3.1":"y","3.2":"y","4":"y","5":"y","5.1 :"y","6""y","6.1�>"y","7":"y","7/1":"y","8":"y"|( opera":{"1&:"y","9.5-9.6":"y","1.0-10.1":y", 0.5":"y","10.6":"y""11":"y",b11&3":"y"-"11.1":"{","11.":�y",212":"y","12.1":by","15";"y","1vb:"y","57":"y","18"z&y","19":"y","20"�"y",�212:"y",":2":"y","2#":"y","24":"y�,"25"2"y","26":"y","2w":"y"d"28":"y",c29":"y"},ioS_waf":{"0.3":"y"�"4.4-t.1":"y","4.2-4.3*:"Q","5.0-5.1":"}","6.0-�.1":"y",&7.0-761":"y","8":"y","8.1-:.3":"y"},"op_mini".{"5.0-8.0":"a#},android"�{"2.1":"a","2.2&:"a","".3":"cb,"3&:"y","4"z"y","4.1":"i","4.2-4.3b:"y","4.4"2"i","4.4.3-4.4.4":"y",040":*y"},"bb"�{"7":"y","10":"y"},"op_mob":{"10":"y&-"11":"y","11.1 :"y#."11.5":"y&("1r":"y","12.7":"yb,"24":"y},"and_chr"�{�41b:"y"},"and_ff":{"36":"y*�,"ie_mob#:["30*�by2-"15":y"|,*!.f_U�":{".12:y"}�8"noTec2�"Op�ra �ini {upports�th- sa�das dlE�ent, but ys$u�able tm(p,iy qnimAtions or run other }g~e c/mplex appli�Ations. Android 2.x0sup�orts$canvas %zcept the toDataUL(	 functjon. See jttp://code.google.�om/p/android/issues/dftail?yd=7901 Some (slov) workaBou.dc !re0describef he2e: http://stackoverflOw,cmm/q/1 48X033/,41x30"l"notes^b{_nuM+:{}$�usageOper�_y":1.84,"us�ce_perc_a":2.9,"uctrebix":falpd,"rapent":*",keywords"�"","ieid">"canvas","ch2ome_id":"5100084v8=438976&,"canva3-text"z{"pitle":"Text API for Canvas","descziptIon":"Muthod!of displaying tAxp on Cantas$elementS","spea":"�ttps://html.Spec.whatwg.opg/oult�pagE/qcripting.html'Drawing-text�tg-the%�itmap","status":"ls"-"l)nks":[{"url":"https;//davelope�.mozidlaorg/en'Drawing_text_using_a_canvaq#Ad`i�ional_examp�es","�iTle":"Examples fy Mozilla&},{"url2:"h�tp://code.google.boo/p/cqnV��-text/","ti�le":"S}pport |ibrary"u-{"trl":"ht|ps://Raw.github.com/�higgmnC42/has.j�omaster/detect/gr`phics.js#canvaw-text""tit�e":"has.js test2,{"uzl":"http://docs.vebplatforl.org/w)kI/�pisocanvas/C!nvasRendEringContext2D/fkllText"�"title":"WebplctbR- Docs"}],"categories".["CinvAs","HPML5"],2st�ts"{"ie":{".":"o","6*"�,"7":"p","8":"p","9":"y","10":"{","11":"y",�TP":"y*},"firefox":{"2":"p","7":"p","3.5":"{"."3.6":"y",&4*:2y","5":"y","6":"y","7""y","8":&y"$"9":"y","10":"y",�11&:"y","12":"y","13":"y","14":"y","15":"y","16":"y","07":"y�l"18":"y", 1";"y","�0":"y","21":y","22";"y","23":"y","24":"y",25":"i","26":�y"�#27":"y",�28":"y""29":"y",#30&:"9","31":"y"h"32":"y",�13 :y"$"#4"�"}","35":"y",b36":"y","37":"y","38::"Y","39":"y","t0":"y"},�chrome":k"4":"y"-"5�:"y","6":"y","7":"y(,"8":"y"$"":"y�,"10":"y","11":"y",#12":"y","13 ("y","1":2y","15">"y","14":"y","97":y","18":"Y","19":"{","20":y",*21":"y"l"22":"y#,"23":"y","24":*q","25":"y","26":"y","27"*"y","8":"y",""9":"y",*30":"y","31":"y","#2&:by","33":"y","30":"y","37"8"y","1�":"y","37":"y"<"38":"y"<"39":"y",b02"y"<"41":"q","42":"y",#43":"y","44B:"y"},"safaRi":{"3.1":"x"l"3.2:"p"$"4"{*y","5":"y","5.1":"y","6":"y"<"6.":"y","72:"y*,�7.1":q#,"x":"y"},"opera :{"9&:"a","9.5-9*6":*p",�0,0=10.1":"p",#10.5"*"y","10.62:"y",�11&:*y","11.3"�"y",b11.5";"y","11.6*:"y","12:"Y","12.1"z"y","15":"y�-"06"2"y",17""y","18":"y","19&:"y",":0":"y","61"""y","2�":"y",""3":"y","24":"y","�":"y","2"*"y","27":"y","28":"{","29":"y"},ygs_saf":"3.2":"y"$"4.�-4.3#:by","4.2-4.s":2y",*4. -5.0":"y"-"6.0-2.1":"y"("�.-7.1":"y","9":"y","8.1-8.3":"y6},"op_mini":{"7.0-.2"*"n"}"andr/id":{"2.1":"y","2.2">"y","2.3":"x�,"3"z"y",&4":"y","t.1":*y","$>2/4.3":"y","4.4"*"y","8.43-4.4.5":"y","�0":"y"},"bb":{"7":"y"L"10":"y"],"op_mob":{"10":"p","!1":"Y*�9�.1":"y","11.5":"Y","12":by","12�1":"x","�4":"y�},"and_khr:{"01"�"y"},"and_ff":{"36": y
},"ie_mo"":{"10 :"y","1q"2"y"<"ald_ua":{"9.9":"y"|},"notms":"","nntes_by_lum":[},"usaguOpepc_y":91.0<,"usagE_peRc_a":0,"ucpreFix"8false,"parent"*"canves","keywords`:""<"Ie_id":"","#hromm_id":""},"namevalwe-storage#:{"titde":"Web Stor!ge - na�g/7anue Pairs","description":"Methnd of st/ring dat` lgcally!like �ookies, but for lerfer amounts of da|a (sessIonStorage and loga|Storagm, useD to fall under HTML5).","spgc":"httx:/.www.w3.or�'TS/w�bstorage/#stkrage","status":"rec","links":[{"url":"https://developer&Mozi|,a.orc/en-US/dgcs/Veb/AP	/Ueb_Stobeee_CPi","title"8"MdN artialm"},k"uzl":*kttp://code.woogle.com/P/sessionstorag�+","vitle*"Suppost library"},{"url":"http://html5damos.cOm/storaEe","tItle":"Sim|ld demo�},z"5rl":2https://raw.g)thub.com/p8igghns4/has.xS-okster/detect/features.jr#native%losalstoraoe;native-sessionsto�age","title"z"has.js test"},;upl":"http://docs.webplatfozm.org+wi+i/apis/wer-storagd/Storagg/localStorcge","ditde":"WecPhatf�r� Docs"}],"cateworIew#:["JS API"],"sta�s":{"iE":{"5.5":"n","6":&p"l"7":"p"l"8":"y","9":"y","10":"y",�11":"y","TP":"y&},"&irefOx"8{"2 :"a","3":"a","3.u":"y"-3.6":2x","4":"y"."5":"�",2&":"y","7":"y","8":"y","9":y","102:"y",b1q*:*q ,"02":"y&,"132:"y&,"14b:2y ,"15":b�","16":"i","17":"y""18":"y"$�9":"y",#20":"y#,"21":"y#,"22":"y","23":"y","24":"y","25":"y ,"�6":"y","27":"y","28":by#,"�9":"y","30"�"y&,"39":"y","22":"y","33":"y","3�":"y",35";"y*,"36":"y"$"37":"y","38":"y","39�:"y,"40":&y"}("ch�ome"2{"42:"y","5":"y","6":"y","7":"y","8":"y&-"9":"9","10#:"y","11":"y","!2":2y","1"":"y","14":"y"."15":"y"."16":"y"-�172:"y","18":"y","19":"y","20":"y","21b:�y","r2":"y","23":"{","24�:"y","25":"y","26":y","27":"y","28":"{","2"z"y","30*:"q","31":"y","33":"y",&73":"yb,"34":y","37":"y#,b36&:"i","37"z"y","38":"y","39":"y"�"40":"{",�41":by2"42":"y","43"z"y","44":�y"},"safari":{"3.1": n","3.2":"n","4";"y","5":"y","4.0":"y","6":"y", 6.1":"y","7":"y","7.1":"y","8";"y"},"opera�:{")":"j","9,5�9.6":"n",b10.0-90.1""n","10*5":"y","10.6":"y","13":2y","11.1":"y,"11/5"z*y","11.6":"y","12":"y","12.1":"y","15""y","16":"y",57":"y","18":"y","19":"y-"20":y","21":"y,"26":"y","23":"y","24":"y","25":"�","26":"y","27":�y","2(2z"y."29":"y"}-"ios_saf&:{"3.2":"y","4.0-5.1":"} ,"4.2-4.3":"y","5.�-5.1":"y","6.0�71":�y"$"7.4-7.1":"y"�*8b:"y""8.1-8.3":"y#},"op_mioi":{"5n0-8>0":"n"},"#ndroid":;"2.""x","2.2":"y","2.3">"y","3":"y","":"i","4.�":"y","4.2-<.3":�y*,"4.4":"y","4.4.3-4.4.t:"y#,"$0 :�q"=,"bb":{"7#:"y"("50":"y"|,op_mob:{�10":"n�,"11"**y#,"1.1">"y","1q.5":"y",b!2":2y","12.�":"y","24": y"},"and_c(r"z{"41":"y},"and_ff":{"36":"y","im_mmb":{"10":"y&$"11"z�y"},"`nd^uc":{"�.1#:"y"}},".oTe�":"","notEs_bY_num":{},"u{`gm_pebc_y"*94.18,"ucage_pmbc_a":0.06,"ucxreviX"false,"parent":"",bk%ywords:8"ef�dorage,locql stozqwe","ie_id":"�eBstorage#,"chrome_Id�:"53&582534246912"},"sql-sToraoe":["tItlm":"Web(SQL Databise" descrirtkon":bMe4hod of storing data cdienT-side( ahmows Sqlite la�ibasa Queries(for asCess and!manipu,ation","spec:"httxz//www.w#/org/TZ/wefdatabas�/","status":"unofb,"links":[{"urm":"ht|p://htm,5doctor.coe/intvodUcing-weB-sql-databasas/","title":bHtML5 Doctor artikle"},{"url":"httqs://raw.witjub.com/pzkggins4/has.js/Maqter/detect/fea�ures.js#natire-�sl-db","title&:"has.js dest"}],"categories":["JS A�I"]-"stcts":{"id":{5.5":"n"<"6�>"n","7":"o","8"2"n","92:Bn","10":".",#11":�.","TP":"n"}�&firefox":{2":"l"l"3�:"~�,"3/5":2n"l"3.7":#j","4":"n ,"5">"n","6":"n","7":"�",28":"n","9":"N","10">"n","11":"f","12":"N","13"�"n","14":"n","15"*"n","16":"n*,"17":"n","58";"n","19b:"n","20":"n#,"21"2"n"$�22":"n"("23":"o","24":"n","25">2n","2&":�n"("25":"n",":8":"n","29":"n","30":"n0,"30"8"n","32#:"n",#33":"n",�34":bn","35b: n#,"76":"n,"37":"n","38#;"N","39"Z"n*,"40":"n"},�cjromg*:{"4":"y","5":&y","6":"y""7#:"x",B8":yB, 9 :"y ,"10":"y","11":"y ,"12*:"y","13":*y,214":"y","15"�"y","96":"y","17":"y",*0�":�y","19":"y�,"20":"y","2�":"y",""2">"y ,"23":"y","24":"y","25":2y","26":"y",#27 :"y","28":"y","29":"y","30":"y","31 ;"y ,"�22:"y","33":"y","34#:"y","35":"y","3v"8"y2, 37":2Y","38":"y","39":"y"�"4 ":"y",*41""y","42"*"y","43":"y","04":*y"},"safari":{ 3/1":"y,"3.2 :*y","4":"y","5":"y","5.1":"y","6":"y","6.1&;"y","7 :"y","7.1"8y","0":"y"}."opera#:?"":"n","9.5-9.6":#n","10�0-10.1":"n","10.5":"y","1 *6":"[2,"11":"i","11.1":"yb,"11.5";"q"$"11.6">"x","52":"y2,"12.1":"y","q5":"{","16":"y","17:"y", 18":"y","19":"Y","20":"y", �1":"y","62":"y","2;2:"y�,"24":2y","25":&y*�"26#:"y",""�:"y"�"28":"y"("29":"yb},"ios_saf":{"1.r:"y","4.0-4.3":"y","4.2-4.3":"y"-"5.0-5.1":"y","6/0-6�1":"y"<"7>0-7.1":"y"h"8":"y","�.1-.3":"y"},"op_mini":{"%n2-8. :(n"},"anDroid":{"2.1":"y2"2n6":"y","2.s:"y,"3":*y","4""y","4.12:"y","4.2-4.7b"y&,"4.4":"y","4.4.3-4.4.4":"y&."40"*"y"},"bb":{"5":"y","1 ":"y"},"op]moj2:{"10&:"n*,"1�"z"q","11.�":"y","�1.5*:"y"�"12":"y","12.1":"y","24":"y"},"enD_chr�2k"41":"y"]."and_ff":{"16""n"},"me_mob#�{"�0b:"n""11":"n"},"ind_wc2:{";.)":"y"}},"Nopes": The Web sQL Database spdcmdicAtion ks no longer Beijg maintaknmd�and support may be droppdd in futurE reRsions.","note{_jy_.um":{}<"usage_pevcWy":67,89,"usaGeO�erC_a";0<"ucpsefmx"*falsa,"parent":","keyword3":"db-storAge,websql","ie_id":"wefwqldetabase","chrome_ad":"6130987527#4208"�,"inde�efdb":{"title":"IndexeeB","descriptko�":Method of storhng fata client-side, aLlows`ind�xeD database"1u�ries.","spec":"http:/wwV.w3.or�/R/Ynd�*edDB�"l"state3":"��l2Lincs:[�url":2http�/%�ackq.�nzillq/or�'0050m�7/c�mPArk~g-indexeddb-`nd-sebeatajase/","title":"Mozilda0Hacks azticle"},{"url":"https://githu`.com/a�emclioN/IndexedDBSh)m","tidle":"Polyfill for �rowser� surpopting WebSQD"},k"uzl":"https:/rav.git�ub.com/phiggins0�/has.js/master/eetect?fuaTuresjs!native-indexeddb,"t�tle :"hashs tmst�},{"]rl":2htt�://dOcs.�ebpmatfoRm.or&/wiki/e`i�/indexedDB"< tit|%":#WebPdatform Docs"}],"categopies":["JS$API"],"stats":{"im"*{"5.5":"n","6":"n","7"z.N","8":+n","9 :"j","30":"� #3".$11":"a #1","TP":"a #!"},"firdfox">{"2":"~"."3":"nb,"3.5":"n,".6":"n"("4":C"x","5":"a x","6":2a x","5"8"a y*,"8":"a x","1":ba x","10":"y |"$"11":"y x""1":"y p","13":"9 x","14":"} x"("35":"y x�,"3#:2y","07":"y","18":"y"�"19":"y ,"20":.y�,#21":&y""22":"y","23*2"y","24":"y",""5":"Y",2262:*y","27"2"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":2y",&36"�"y","37":"y"*�38":"i"-�39":"y","40":"�"}, Chrome":{"4&:"p","5":"p","6":"p","7":"p","8":*p","9"*"p","1 ":"n","11":"a h","12b:"a h"<"13";"a x"-"14":"! x","15":"e x',"16"*"a |"("97"z#a x","18b:"a x","19":"a x","20*:"a x","21":"a x","22":"a x&,"23":"y x","r4":"y","25&;"y","26":"y","27":"y"-"28":"y","29":"9 <"30":*y"l"31": y","32":�y"-"33":"y#,"34":"y","35":"y","3&*: �","37"*"y"�b3":"y","39""y",*40":"y","412:"q","42":"y","4#":"y","$4":"yb},"sifari":{"3.1":"p""3.2":"p"("4":"p","1":"p","5.3*:"p",#6":"p",�6.1*:2t","7":"p"-"7.1":"a #2"�"8"x"a #2"},opesa"*{"9"�"n"("9.5-9.'":"n","10.0-10.1":".","10>�":"p","10.6":"0"4"31c:"p","11.1":*P","!q.7":"p","11.6":#Q","52&:"p","1r.1":"p",�15""y",#14":"y","1?2:"y","08":"y"<"!�":"y","22":"y","21"2"y","23"�"y"("23":"y",*20":"y��"25":"y","2�"8�y","27":"9","28:"y","29":"�"},"iow_saf":s";.2":"p"l"4.0-4.1":"0","4.2-4.3":p","5.0-4.1":2p","6.0-6.1":"p","7.-7.1#:"p","8":"� #2","8.1-8.3":"a #2"},"op_min)*:{"5.0-8.0b:"k"-,"andr�id"8{&2.1":"p", 2.6":�p",�2.3":"p",#3�:"r","u":"p""4.3":"p","4.2-4.3":"p","4.4":"y","4.4.3-4.4.4": y","40":"y"},#bb":{"7":"p","90":"y2},"op_mob":{210�:"n#,"11":#p","11.1":bp","11.5":"p","12":"p""1.1":"p"$"24":"y"],"and_chr":{"�1";"x"},"afd_ff":{"96":"y"},"ie_}.c":{"1�":"a #1","11":"a #"}("and_}c":s"9.9*:"p"}},"notes":""("notes_by_num":{"1":"Qar|ial support in IE !0 & 11 refer{ to a duobe2 of subfe)tures0[not being sqppkrted](http://c/depen.iooaeoerhck/pen/Ktymi).","2":*Partial support in iO[ 8 referc tg [seriously�buggy behaviOr\(ht�p://gww.raymondcamd%n.com/200/9/25/IndexedDB-on-iOS,8--Broken-Bad)."},"us!ge_perc_y":&1.41,"usage_�erc_a"<18.44,"ucprefi|"�faLse,"parent":"","keywords":"inte|db"$"ie_if�:"indexeddb", bhrome_id":#6u07451168992256 },"online-sta|wS":{"tithe">"Online/offline states","deScriptig.":Uvents to indicate when the use�'s connected (bonhinE` and `/ffliNe` even4s) and the `naVigator�online@ pRopezuq 4o see cuzrent ctatus.","sr�c":"https:/.htll.spec.w`atwg.oro/multipqge/browsers.htmh#browwer-qtate,*states":"ls",*links":[{"url#:"jttps//developer.mozilna.grg/en-US/`ocs/Web/ApI/OavigatozOnL}ne.onLine#Speci�icatio~","ti�ne�:"MDN article"}],"cctugories":["ZS API"_,"stats"2{"ie":{"5.5"2"n","6":"n","7�:n ,"8":"a #2",";":"y","10":*y","11:"y","TP":"y"},"f�refox":{2":"n","3":"n""3.5":"{","3..":"y","4":"a�"3","1":"a #3"("6 :"c!#","72:"a #3","8":"a ##b,"9":"a #3","10!:"a #3*-"11"*"a #3","22:"a +3","12":"a"#3","14"�a 33","15":"a #3","12":"a #3","17":"a #3",�18":"a #32,"19":"a !3","20":"a #3","21":"a #3"."22":"a #3","23&:"a #3",*24":"a ##","�5":"a #32,""6":"a #3","27":"a #3","�8":"a #3"l"2;b:"c #3*l"30":"e #3","31":"a0#3","30 :"a #3"("3":e #3","3$2:"a #3","75":"a 33","36":"a #3",";7":"` �3"$"28""a"#3""39":�m #3","40":*a$#3"},"chrome :{"4":"n","5"*"n","6":"n","7":"n",*8">"n"<"9b:"n ,"10"z"n*,"15":"n","12b*"n","13":#n","14";"y"("1=">"y"("16":"y",2q7":"y","18:"yb,"19":"�","2p":"y"l"21":"y","22"zy�,"23":"y"(204":*y",":5":"y","26":"y","27: y","28":"y","29":"y","#0":"y3,"3!2:"y","32#:#y", 33":"y&,"34":"y","#5":"y","6":"y","37":"y","39"*"y","39":"y&,"60":"y","41 :&y#,"42":"y","41":"Y#,"44":"y"},"saf%ri":["3.1":"nb,"3.2":"n","0":"n","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"a","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"u","4.0-4.1":"u","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"u","2.2":"u","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"a #1","10":"y"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"a #1"}},"notes":"\"online\" does not always mean connection to the internet, it can also just mean connection to some network.\r\n\r\nEarly versions of Chrome and Safari always reported \"true\" for `navigator.onLine`","notes_by_num":{"0":"Safari 7.0 supports only the event listener on `window`, and not on `document.body`","1":"Seems to support `navigator.onLine` but not `online`/`offline` events.","2":"IE8 only supports the `online`/`offline` events on `document.body`, rather than `window`.","3":"Desktop Firefox responds to the status of its \"Work Offline\" mode. If not in that mode, `navigator.onLine` is always `true`, regardless of the actual network connectivity status. [See bug](https://bugzilla.mozilla.org/show_bug.cgi?id=654579) for details."},"usage_perc_y":74.83,"usage_perc_a":18.99,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":""},"eventsource":{"title":"Server-sent events","description":"Method of continuously sending data from a server to the browser, rather than repeatedly requesting it (EventSource interface, used to fall under HTML5)","spec":"http://www.w3.org/TR/eventsource/","status":"pr","links":[{"url":"http://www.html5rocks.com/tutorials/eventsource/basics/","title":"HTML5 Rocks tutorial"},{"url":"http://samshull.blogspot.com/2010/10/ajax-push-in-ios-safari-and-chrome-with.html","title":"Blog post with demo"},{"url":"https://raw.github.com/phiggins42/has.js/master/detect/features.js#native-eventsource","title":"has.js test"},{"url":"https://github.com/Yaffle/EventSource","title":"Polyfill"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"a","9.5-9.6":"a","10.0-10.1":"a","10.5":"a","10.6":"a","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"a","11":"a","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"y"}},"notes":"","notes_by_num":{},"usage_perc_y":77.42,"usage_perc_a":0.05,"ucprefix":false,"parent":"","keywords":"serversent,s-sent-events","ie_id":"serversenteventseventsource","chrome_id":"5311740673785856"},"x-doc-messaging":{"title":"Cross-document messaging","description":"Method of sending information from a page on one domain to a page on a different one (using postMessage)","spec":"https://html.spec.whatwg.org/multipage/comms.html#crossDocumentMessages","status":"ls","links":[{"url":"https://developer.mozilla.org/en/DOM/window.postMessage","title":"MDN article"},{"url":"http://html5demos.com/postmessage2","title":"Simple demo"},{"url":"https://raw.github.com/phiggins42/has.js/master/detect/features.js#native-crosswindowmessaging","title":"has.js test"},{"url":"http://docs.webplatform.org/wiki/apis/web-messaging/MessagePort/postMessage","title":"WebPlatform Docs"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"a","9":"a","10":"a","11":"a","TP":"y"},"firefox":{"2":"n","3":"y","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"y","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"a","11":"a"},"and_uc":{"9.9":"y"}},"notes":"Partial support in IE8-9 refers to only working in frames/iframes (not other tabs/windows). Also in IE 9 and below an object cannot be sent using postMessage. Partial support in IE10-11 refers to [limitations in certain conditions](http://stackoverflow.com/questions/16226924/is-cross-origin-postmessage-broken-in-ie10)","notes_by_num":{},"usage_perc_y":83.08,"usage_perc_a":13.96,"ucprefix":false,"parent":"","keywords":"","ie_id":"postmessage","chrome_id":"4786174115708928"},"datauri":{"title":"Data URIs","description":"Method of embedding images and other files in webpages as a string of text","spec":"http://www.ietf.org/rfc/rfc2397.txt","status":"other","links":[{"url":"http://css-tricks.com/data-uris/","title":"Information page"},{"url":"http://en.wikipedia.org/wiki/data_URI_scheme","title":"Wikipedia"},{"url":"http://www.websiteoptimization.com/speed/tweak/inline-images/","title":"Data URL converter"},{"url":"http://klevjers.com/papers/phishing.pdf","title":"Information on security issues"}],"categories":["Other"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"a","9":"a","10":"a","11":"a","TP":"a"},"firefox":{"2":"y","3":"y","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"y","3.2":"y","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"y","9.5-9.6":"y","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"a","11":"a"},"and_uc":{"9.9":"y"}},"notes":"Support in Internet Explorer 8 is limited to images and linked resources like CSS files, not HTML files. Max URI length in IE8 is 32KB. In IE9+ JavaScript files are supported too and the maximum size limit set to 4GB.","notes_by_num":{},"usage_perc_y":83.11,"usage_perc_a":13.96,"ucprefix":false,"parent":"","keywords":"data url,datauris,data uri,dataurl,dataurls,base64","ie_id":"","chrome_id":""},"mathml":{"title":"MathML","description":"Special tags that allow mathematical formulas and notations to be written on web pages.","spec":"http://www.w3.org/TR/MathML/","status":"rec","links":[{"url":"http://en.wikipedia.org/wiki/MathML","title":"Wikipedia"},{"url":"http://www.mozilla.org/projects/mathml/demo/","title":"MathML demos"},{"url":"http://www.mathjax.org","title":"Cross-browser support script"},{"url":"https://developer.mozilla.org/en/MathML/Element","title":"MDN element reference"}],"categories":["Other"],"stats":{"ie":{"5.5":"n","6":"p","7":"p","8":"p","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"y","3":"y","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"p","5":"p","6":"p","7":"p","8":"p","9":"p","10":"p","11":"p","12":"p","13":"p","14":"p","15":"p","16":"p","17":"p","18":"p","19":"p","20":"p","21":"p","22":"p","23":"p","24":"y","25":"p","26":"p","27":"p","28":"p","29":"p","30":"p","31":"p","32":"p","33":"p","34":"p","35":"p","36":"p","37":"p","38":"p","39":"p","40":"p","41":"p","42":"p","43":"p","44":"p"},"safari":{"3.1":"p","3.2":"p","4":"p","5":"p","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"a","10.0-10.1":"a","10.5":"a","10.6":"a","11":"a","11.1":"a","11.5":"a","11.6":"a","12":"a","12.1":"a","15":"p","16":"p","17":"p","18":"p","19":"p","20":"p","21":"p","22":"p","23":"p","24":"p","25":"p","26":"p","27":"p","28":"p","29":"p"},"ios_saf":{"3.2":"p","4.0-4.1":"p","4.2-4.3":"p","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"p"},"android":{"2.1":"p","2.2":"p","2.3":"p","3":"p","4":"p","4.1":"p","4.2-4.3":"p","4.4":"p","4.4.3-4.4.4":"p","40":"p"},"bb":{"7":"p","10":"y"},"op_mob":{"10":"p","11":"p","11.1":"p","11.5":"p","12":"p","12.1":"p","24":"p"},"and_chr":{"41":"p"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"a"}},"notes":"Opera's support is limited to a CSS profile of MathML. Support was added in Chrome 24, but removed afterwards due to instability.","notes_by_num":{},"usage_perc_y":23.21,"usage_perc_a":4.58,"ucprefix":false,"parent":"","keywords":"","ie_id":"mathml","chrome_id":"5240822173794304"},"css-featurequeries":{"title":"CSS Feature Queries","description":"CSS Feature Queries allow authors to condition rules based on whether particular property declarations are supported in CSS using the @supports at rule.","spec":"http://www.w3.org/TR/css3-conditional/#at-supports","status":"cr","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/CSS/@supports","title":"MDN Article"},{"url":"http://mcc.id.au/blog/2012/08/supports","title":"@supports in Firefox"},{"url":"http://dabblet.com/gist/3895764","title":"Test case"},{"url":"http://docs.webplatform.org/wiki/css/atrules/@supports","title":"WebPlatform Docs"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"See also the [CSS.supports() DOM API](#feat=css-supports-api)","notes_by_num":{},"usage_perc_y":60.96,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"supports,conditional","ie_id":"conditionalrules","chrome_id":"4993981813358592"},"xhtml":{"title":"XHTML served as application/xhtml+xml","description":"A strict form of HTML, and allows embedding of other XML languages","spec":"http://www.w3.org/TR/xhtml1/","status":"rec","links":[{"url":"http://en.wikipedia.org/wiki/XHTML","title":"Wikipedia"},{"url":"http://www.xmlplease.com/xhtml/xhtml5polyglot/","title":"Information on XHTML5"},{"url":"http://docs.webplatform.org/wiki/concepts/internet_and_web/the_web_standards_model#What_is_XHTML.3F","title":"WebPlatform Docs"}],"categories":["Other"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"y","10":"y","11":"y","TP":"y"},"firefox":{"2":"y","3":"y","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"y","3.2":"y","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"y","9.5-9.6":"y","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y"}},"notes":"The XHTML syntax is very close to HTML, and thus is almost always ([incorrectly](https://developer.mozilla.org/en-US/docs/XHTML#MIME_type_versus_DOCTYPE)) served as text/html on the web.","notes_by_num":{},"usage_perc_y":94.74,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"xhtml+xml","ie_id":"","chrome_id":""},"xhtmlsmil":{"title":"XHTML+SMIL animation","description":"Method of using SMIL animation in web pages","spec":"http://www.w3.org/TR/XHTMLplusSMIL/","status":"unoff","links":[{"url":"http://en.wikipedia.org/wiki/XHTML%2BSMIL","title":"Wikipedia"},{"url":"http://leunen.me/fakesmile/","title":"JS library to support XHTML+SMIL"}],"categories":["Other"],"stats":{"ie":{"5.5":"n","6":"a","7":"a","8":"a","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"p","3":"p","3.5":"p","3.6":"p","4":"p","5":"p","6":"p","7":"p","8":"p","9":"p","10":"p","11":"p","12":"p","13":"p","14":"p","15":"p","16":"p","17":"p","18":"p","19":"p","20":"p","21":"p","22":"p","23":"p","24":"p","25":"p","26":"p","27":"p","28":"p","29":"p","30":"p","31":"p","32":"p","33":"p","34":"p","35":"p","36":"p","37":"p","38":"p","39":"p","40":"p"},"chrome":{"4":"p","5":"p","6":"p","7":"p","8":"p","9":"p","10":"p","11":"p","12":"p","13":"p","14":"p","15":"p","16":"p","17":"p","18":"p","19":"p","20":"p","21":"p","22":"p","23":"p","24":"p","25":"p","26":"p","27":"p","28":"p","29":"p","30":"p","31":"p","32":"p","33":"p","34":"p","35":"p","36":"p","37":"p","38":"p","39":"p","40":"p","41":"p","42":"p","43":"p","44":"p"},"safari":{"3.1":"p","3.2":"p","4":"p","5":"p","5.1":"p","6":"p","6.1":"p","7":"p","7.1":"p","8":"p"},"opera":{"9":"p","9.5-9.6":"p","10.0-10.1":"p","10.5":"p","10.6":"p","11":"p","11.1":"p","11.5":"p","11.6":"p","12":"p","12.1":"p","15":"p","16":"p","17":"p","18":"p","19":"p","20":"p","21":"p","22":"p","23":"p","24":"p","25":"p","26":"p","27":"p","28":"p","29":"p"},"ios_saf":{"3.2":"p","4.0-4.1":"p","4.2-4.3":"p","5.0-5.1":"p","6.0-6.1":"p","7.0-7.1":"p","8":"p","8.1-8.3":"p"},"op_mini":{"5.0-8.0":"p"},"android":{"2.1":"p","2.2":"p","2.3":"p","3":"p","4":"p","4.1":"p","4.2-4.3":"p","4.4":"p","4.4.3-4.4.4":"p","40":"p"},"bb":{"7":"p","10":"p"},"op_mob":{"10":"p","11":"p","11.1":"p","11.5":"p","12":"p","12.1":"p","24":"p"},"and_chr":{"41":"p"},"and_ff":{"36":"p"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"p"}},"notes":"Internet Explorer supports the W3C proposal HTML+TIME, which is largely the same as XHTML+SMIL","notes_by_num":{},"usage_perc_y":0,"usage_perc_a":2.51,"ucprefix":false,"parent":"xhtml","keywords":"","ie_id":"","chrome_id":""},"wai-aria":{"title":"WAI-ARIA Accessibility features","description":"Method of providing ways for people with disabilities to use dynamic web content and web applications.","spec":"http://www.w3.org/TR/wai-aria/","status":"rec","links":[{"url":"http://www.w3.org/WAI/intro/aria","title":"Information page"},{"url":"http://www.paciellogroup.com/blog/2011/10/browser-assistive-technology-tests-redux/","title":"Links to various test results"},{"url":"http://en.wikipedia.org/wiki/WAI-ARIA","title":"Wikipedia"},{"url":"http://www.alistapart.com/articles/the-accessibility-of-wai-aria/","title":"ALA Article"},{"url":"http://zufelt.ca/blog/are-you-confused-html5-and-wai-aria-yet","title":"HTML5/WAI-ARIA information"}],"categories":["Other"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"a","9":"a","10":"a","11":"a","TP":"a"},"firefox":{"2":"a","3":"a","3.5":"a","3.6":"a","4":"a","5":"a","6":"a","7":"a","8":"a","9":"a","10":"a","11":"a","12":"a","13":"a","14":"a","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"a","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a","30":"a","31":"a","32":"a","33":"a","34":"a","35":"a","36":"a","37":"a","38":"a","39":"a","40":"a"},"chrome":{"4":"a","5":"a","6":"a","7":"a","8":"a","9":"a","10":"a","11":"a","12":"a","13":"a","14":"a","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"a","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a","30":"a","31":"a","32":"a","33":"a","34":"a","35":"a","36":"a","37":"a","38":"a","39":"a","40":"a","41":"a","42":"a","43":"a","44":"a"},"safari":{"3.1":"n","3.2":"n","4":"a","5":"a","5.1":"a","6":"a","6.1":"a","7":"a","7.1":"a","8":"a"},"opera":{"9":"n","9.5-9.6":"a","10.0-10.1":"a","10.5":"a","10.6":"a","11":"a","11.1":"a","11.5":"a","11.6":"a","12":"a","12.1":"a","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"a","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a"},"ios_saf":{"3.2":"a","4.0-4.1":"a","4.2-4.3":"a","5.0-5.1":"a","6.0-6.1":"a","7.0-7.1":"a","8":"a","8.1-8.3":"a"},"op_mini":{"5.0-8.0":"a"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"a","4.4.3-4.4.4":"a","40":"a"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"a","11":"a","11.1":"a","11.5":"a","12":"a","12.1":"a","24":"a"},"and_chr":{"41":"a"},"and_ff":{"36":"a"},"ie_mob":{"10":"a","11":"a"},"and_uc":{"9.9":"n"}},"notes":"Support for ARIA is rather complex and currently is not fully supported in any browser. For detailed information on partial support see the [ARIA 1.0 Implementation Report](http://www.w3.org/WAI/ARIA/1.0/CR/implementation-report)\r\n","notes_by_num":{},"usage_perc_y":0,"usage_perc_a":90.14,"ucprefix":false,"parent":"","keywords":"wai,aria","ie_id":"","chrome_id":""},"geolocation":{"title":"Geolocation","description":"Method of informing a website of the user's geographical location","spec":"http://www.w3.org/TR/geolocation-API/","status":"cr","links":[{"url":"http://html5demos.com/geo","title":"Simple demo"},{"url":"https://raw.github.com/phiggins42/has.js/master/detect/features.js#native-geolocation","title":"has.js test"},{"url":"http://docs.webplatform.org/wiki/apis/geolocation","title":"WebPlatform Docs"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"p","7":"p","8":"p","9":"y","10":"y","11":"y","TP":"y"},"firefox":{"2":"p","3":"p","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"a","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"p","3.2":"p","4":"p","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"p","10.5":"p","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"n","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"p","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y"}},"notes":"","notes_by_num":{},"usage_perc_y":91.76,"usage_perc_a":0.01,"ucprefix":false,"parent":"","keywords":"","ie_id":"geolocation","chrome_id":"6348855016685568"},"flexbox":{"title":"Flexible Box Layout Module","description":"Method of positioning elements in horizontal or vertical stacks. Support includes the support for the all properties prefixed with `flex` as well as `align-content`, `align-items`, `align-self`, and `justify-content`.","spec":"http://www.w3.org/TR/css3-flexbox/","status":"wd","links":[{"url":"http://bennettfeely.com/flexplorer/","title":"Flexbox CSS generator"},{"url":"http://www.adobe.com/devnet/html5/articles/working-with-flexbox-the-new-spec.html","title":"Article on using the latest spec"},{"url":"https://dev.opera.com/articles/view/advanced-cross-browser-flexbox/","title":"Tutorial on cross-browser support"},{"url":"http://philipwalton.github.io/solved-by-flexbox/","title":"Examples on how to solve common layout problems with flexbox"},{"url":"http://css-tricks.com/snippets/css/a-guide-to-flexbox/","title":"A Complete Guide to Flexbox"},{"url":"http://the-echoplex.net/flexyboxes/","title":"Flexbox playground and code generator"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"a x #2","11":"y","TP":"y"},"firefox":{"2":"a x #1","3":"a x #1","3.5":"a x #1","3.6":"a x #1","4":"a x #1","5":"a x #1","6":"a x #1","7":"a x #1","8":"a x #1","9":"a x #1","10":"a x #1","11":"a x #1","12":"a x #1","13":"a x #1","14":"a x #1","15":"a x #1","16":"a x #1","17":"a x #1","18":"a x #1","19":"a x #1","20":"a x #1","21":"a x #1","22":"a #3","23":"a #3","24":"a #3","25":"a #3","26":"a #3","27":"a #3","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"a x #1","5":"a x #1","6":"a x #1","7":"a x #1","8":"a x #1","9":"a x #1","10":"a x #1","11":"a x #1","12":"a x #1","13":"a x #1","14":"a x #1","15":"a x #1","16":"a x #1","17":"a x #1","18":"a x #1","19":"a x #1","20":"a x #1","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"a x #1","3.2":"a x #1","4":"a x #1","5":"a x #1","5.1":"a x #1","6":"a x #1","6.1":"y x","7":"y x","7.1":"y x","8":"y x"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"y","15":"y x","16":"y x","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"a x #1","4.0-4.1":"a x #1","4.2-4.3":"a x #1","5.0-5.1":"a x #1","6.0-6.1":"a x #1","7.0-7.1":"y x","8":"y x","8.1-8.3":"y x"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"a x #1","2.2":"a x #1","2.3":"a x #1","3":"a x #1","4":"a x #1","4.1":"a x #1","4.2-4.3":"a x #1","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"a x #1","10":"y"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"a x #2","11":"y"},"and_uc":{"9.9":"a x #1"}},"notes":"Most partial support refers to supporting an [older version](http://www.w3.org/TR/2009/WD-css3-flexbox-20090723/) of the specification or an [older syntax](http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/).","notes_by_num":{"1":"Only supports the [old flexbox](http://www.w3.org/TR/2009/WD-css3-flexbox-20090723) specification and does not support wrapping.","2":"Only supports the [2012 syntax](http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/)","3":"Does not support flex-wrap or flex-flow properties"},"usage_perc_y":82.47,"usage_perc_a":10.5,"ucprefix":false,"parent":"","keywords":"flex-box,flex-direction,flex-wrap,flex-flow,flex-grow,flex-basis","ie_id":"flexbox","chrome_id":"4837301406400512"},"webgl":{"title":"WebGL - 3D Canvas graphics","description":"Method of generating dynamic 3D graphics using JavaScript, accelerated through hardware","spec":"https://www.khronos.org/registry/webgl/specs/1.0/","status":"other","links":[{"url":"http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation","title":"Instructions on enabling WebGL"},{"url":"http://www.khronos.org/webgl/wiki/Tutorial","title":"Tutorial"},{"url":"http://hacks.mozilla.org/2009/12/webgl-draft-released-today/","title":"Firefox blog post"},{"url":"http://webkit.org/blog/603/webgl-now-available-in-webkit-nightlies/","title":"Webkit blog post"},{"url":"https://github.com/iewebgl/iewebgl","title":"Polyfill for IE"}],"categories":["Canvas"],"stats":{"ie":{"5.5":"n","6":"p","7":"p","8":"p","9":"p","10":"p","11":"y #1","TP":"y #1"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"a #1","5":"a #1","6":"a #1","7":"a #1","8":"a #1","9":"a #1","10":"a #1","11":"a #1","12":"a #1","13":"a #1","14":"a #1","15":"a #1","16":"a #1","17":"a #1","18":"a #1","19":"a #1","20":"a #1","21":"a #1","22":"a #1","23":"a #1","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a","30":"a","31":"a","32":"a","33":"a","34":"a","35":"a","36":"a","37":"a","38":"a","39":"a","40":"a"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"a #1","9":"a #1","10":"a #1","11":"a #1","12":"a #1","13":"a #1","14":"a #1","15":"a #1","16":"a #1","17":"a #1","18":"y #1","19":"y #1","20":"y #1","21":"y #1","22":"y #1","23":"y #1","24":"y #1","25":"y #1","26":"y #1","27":"y #1","28":"y #1","29":"y #1","30":"y #1","31":"y #1","32":"y #1","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"a #1","6":"a #1","6.1":"a #1","7":"a #1","7.1":"a #1","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"a #1","12.1":"a #1","15":"a #1","16":"a #1","17":"a #1","18":"a #1","19":"a","20":"a","21":"a","22":"a","23":"a","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"a"},"bb":{"7":"n","10":"y"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"a","12.1":"a","24":"y"},"and_chr":{"41":"a"},"and_ff":{"36":"a"},"ie_mob":{"10":"p","11":"y #1"},"and_uc":{"9.9":"y #1"}},"notes":"Support listed as \"partial\" refers to the fact that not all users with these browsers have WebGL access. This is due to the additional requirement for users to have [up to date video drivers](http://www.khronos.org/webgl/wiki/BlacklistsAndWhitelists). This problem was [solved in Chrome on Windows](http://blog.chromium.org/2012/02/gpu-accelerating-2d-canvas-and-enabling.html) as of version 18.\r\n\r\nNote that WebGL is part of the [Khronos Group](http://www.khronos.org/webgl/), not the W3C.","notes_by_num":{"1":"WebGL context is accessed from \"experimental-webgl\" rather than \"webgl\""},"usage_perc_y":53.99,"usage_perc_a":26.71,"ucprefix":false,"parent":"canvas","keywords":"web gl","ie_id":"webglcanvas3d,webglinstancingextension","chrome_id":"6049512976023552"},"fileapi":{"title":"File API","description":"Method of manipulating file objects in web applications client-side, as well as programmatically selecting them and accessing their data.","spec":"http://www.w3.org/TR/FileAPI/","status":"wd","links":[{"url":"https://developer.mozilla.org/en/Using_files_from_web_applications","title":"MDN article"},{"url":"http://docs.webplatform.org/wiki/apis/file","title":"WebPlatform Docs"},{"url":"https://github.com/moxiecode/moxie","title":"Polyfill"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"a","7":"a","8":"a","9":"a","10":"a","11":"a","12":"a","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20#:"y","21*2"y","22": y",223":"y","24"2"y","25":"y",""6":`y","27":"y","28":"y","29":"y,"30":"y","31":"y","3�":"�","33#:"y",";<":"y","32:"y"(&36":"y",&3":"y","38":"y ,"39":"x","60":"y ,"41":"y","42"�"y","43":"}","44":"y"},"safAri":k"s.1":"n","3.2"�n",4":"n","5":"n","5.1":"ab,"6":"y",">.1":"y","7:"Y","7.1":"y","8:"y"},"opera":{"9";"n"#9.5-)>6":"n","10.0-10.1:"n"("10.1 :"n","10.6":"n","11:"n","11.1":"y",�11.5":"y","11.6":"y","12b:"y","12.1 :*y","1%":"y","06":"i","17"�"y#<"8":"yb,219":"q","20":"y","21":"y","22":"y","23":y","24":"y","25":2y,"26#8"y",&27":"y#,"28":"y","2=":*y"|,"yos_saf�:{"3.2":"n","4.0-4.1":"n"$"4.2-0.3"3&n","5.0-5.1":"n","6.:-6.1":"y","4.0-3.1""�","8":"y","8.1-8.3":"y"|,"op_minh":{"5.0-8.0":"n"}("a.droid {"2.�":"n","2.2":n"�"2.s":"f","3":"a","�b:"a","4.1�:"a","4.2-4.3":"`*,"4.4":"y","$.4.3-4.4.4b:"y","40"z"y"u,"bb":{"7":"!","10":"y"},"op_mo�":{"10":#n","�q":"n","11.1":"y", 11.5":"y",*12":"y","q".1":"y","24":y"=a~d_#hr":{"41"8"y"},"and_ff":{"36":"y#},"ie_mob :{B1":"N","11":"y"�,&and_uc"zs"9.9":by�}},"notec":"Rartial 1qppOrt in older Safari an$ othez webKit brosmrs rufers to lacking FineReader suppo�t. ","lotes_b}_n1m">z},"usage_perc_y":06.57,"qsageKpe�c_a&:3.05,"ucrrenix"2fa|se,"p`rdnt":" ,"keyworls":"FimeReader", ie_id�:"","chrome_id":""m,"shadowdom":{"title":"WLadoe DOM","descsiption"8"Ie4hod of estabmi3hing and maintaioing functional bo�ndarier betwaen DOM trees and hOw these trees interacd skth0mach other"wiphin a docume�t, thus Enabling bettdr functyon�l encepsulatinn within the DOM.","spec": hptp://www.w3.org/TR/�hadOw-dom/","status":&wt","lynks"z[{"url":"htTq8//htll5-d�mos&appspou.com/static/3hAdosdom-visualizer/index.html","tithe":"Shadow DOM FisualizeR"}{"url":"h4tp://wvw>htmh5rocks.com/vutorials/webcomxonents/shadowdom/*,"title":"HTML5�ocks0- Sh�dow DOM 10 artiale"}],"ca�egorhe�":["DOM"],"sTats":{"ie":{"5.5":"~","6":"n""7":#n","8":"n","9":n","10":"n",211 "n"�"TP""n"},"fibefox":{"2":&n","3":"n","3.5":"l","3.6"."n"<"4#:"n"("5":"�","6":"n","?":"n"$"8":"n", 9":"n","10":"n","11":"n","12":"n",*3":"n",#14":"n"�"15":"n","16":"n ,"17":"n","18":"n","18""n","20":bf","29":"�","22:"n","23":"n",&24": n",*25":"N#,"26":"j,"2�":"o",""8"z"n","29":"j d #1","30":bn d #1", 39":"n d #5","32">"n d #1","33 :"n d #9","34":"n d #3","35":#n d #1","36":"n d #1","37":"n d #1","38":"n`d #12,"39":"n d #1","40":"n d #1"},"chrome":{"4":"n""5"8"n","&":"n","7":"�" 8�2n","9b:"�,"10":"n"$�11":"n"lb12""n&,"1":"n","04":"�", 4":"n","16"*"n",#17":"n","19":"n","19":"n ,#20*:"n","21 :"�2,"22":"n*,"23":"n",":4":"n","25":"y x","26"*"y x",b27":"y x","28":"y�x"$"29":"y x","30":"y p"�";1":"9 x",632":"q x �"31":"y x",&34":"y x2,"35":"y","36""y",#37":"y","3(":"y","39":"y"$"$0#:"y","41": y",+42":"y","43":"y","44":"y"},"safcri"["3.1""n","3.3";"n","4";"n",*5":"n#,"5.1b: n","6":"n�"6.1":"f","7":"n"-"7.1":"n","8*:"n"},"ope�a":{"9":2n","9.5-9.6":"n","!0.0-10.1":"n"."0n5":"n","10.6�:"n","!1:"n","11.9"8"n",11.5":"n","116":"j","12:"n","1.1":b.","55:"y x","16":"� x",*172:"y x","18":"y x ,"1�:"y x","20":"y x","�1":by x"("22�;"y","23":"9","24"2"y",�2=":"y&,"26"2"i2,"27":"Y","28":"y�,"29":"y"},")os_3af":{b7.2"z"n","4.0-4.1:"n","4.2-4&3":"n","5.0-5.1":"&"(6,0-6.1":"n","7.0-7&1":"n","8":"n","8.1-8.":"n"},"np_mini":{#0&1-8.0�*"."}"anDroid":{"2.1"8"n",32.2":"n"�"2.3 :"n","3"
"n","4":"n","4.1":"n"l"4.2-4.3":"n","4,4":"y x","4.4.3-4.4.4":"x$x","40":"y"},"fb"2{"7":"j","10":"n"},"op_mob":{"10":"n&,"11"2"l","11.1*:"n","11.5""n", 12":"n2,"12.1":"n","24":"y"},"and_chr":{"01"8"y"},"and_fg":{"36":"n"},"ie_mob":z"10�:".","1! :"n"}$*and_us":{29.92:"n"}}-"notes":"","notesOfy_num":{"q":"Supported in Fi2efox beh�nd�phe `dom.webcompgnents.enabled` flag"},"usage_perc�x"*49.17,usafe�pe�s_a":�,"ucprefix":false,"paRent":"","keywords":"geb c/mponents2,"ieOid2:"shadovdomunpr%fixed","bhrgm�O)d":"450324028072960"},"websoc{ets":{"~iTde">"Web Sockets","duScriptign":"Bidirectionel"commufication vekhnology!for web apps","s0ec":"http://www.w3.org+TR/websockets/&,2rtetus":"cr�l"�inks":[{"url,:"http://vebsocket.org/abOutwebsocket.html","tytle":"VarSoc+e|� )nforea�ion"},y"uRl":"jt4p2/.uxda��s.html5z�ckc.com'2011.08/S`qt-s%�iffuren�-in-the-nEw-WebWoccet-protocol",#title":"Dutayls on newer prodocol"},{"u2l2:"http://en.wikipedia.org/whki/WebSocket","tithe":"Wioipedia"},{"u2l":"ht<�s://r�w.githaB.com-pH�ggins42/has.�s/master/dete�t/geatures*js#native-websockgts","title"�"has.hs tes|"},{"url":"http://docs.webplatfozm.oro/wika/apIs/websocket","titne":"WebPlatform Do#s"}[l"catEgories":["JC APM"],"suats":{�ie":k"5.5":�f","6":#j","7�2"n","8 :"n","=">"n�l"10";�y","11"2"�","TP":"y"},"fhr%fox":{"2":"n","3":2n","3.5":l",3.6":"n","4":"a #1""5":"a #1","6":2a x #2"$"7":"a � #2*,"8$�"a$x #2","9#:"a X!#2","�0":ba(x 32","11"z"y"$"12":"y"-"13�:"y",&14*2"x","15":"y","06":"y�,"17"�"y",�1:":"y�,"19":"y","2":"y","21":"y","22":*9", 23":"y","24":"y", 25":"yb,"2v":"y","27";"y*,"28":"y ,*29":"y","30&:"y","31":"Y","32":"y",�3":"q","34":"y","35":"y","36":*y"("37":"y",38"2"Y","39":"y,"40":"y"},"chrome"8{"4":"a #9","5":#a #1 �""*"a #1","7":"a #1","8�:"a #1","9":"a #1",*10":a #1",11":"a�#1","12":"a8#1","13":"e #1","14":"a #1", 1�:"a +2�,"q6":"y",17":"y","18":"y","11":2y","r0":"y","r1":"y","22":"y"("23":"y","2<":"y","21":"y","26":"y","27":"y", 28"�"y","2=":"y","30"z"y,"31":"y ,"32":"y","33":"y","34":"y","35#:"y","36":"y","37":"9","38":"y","39":"y","40":"y",b41":"y#,"42":"y","43":2y","44":"y"m,"s!fapi":z"3.1":&n","3.2":"n","$":"n","5":"a #1","5.1":"a #1","6":"a #2*,"6.1":"a #6","7":"9",#7n1":"y","8":"y"},"opera":["9":"n","9.5-.6":"n","�0�0-10.1":"n","10.%":".","10.6":"n","11":"a #1","11.1":�a #1","11.5":*a #1", 11.6":"a #1"<"!*":"a �1","1r.1":"y",25":By",*16":"y","17":"y",b18*:"y","1;"�"yb,20":"y","21":"y","22":"y","23":"y","24":"y ,"25":"y","26":"y","27":"y","28":"y","29#8"y"},"ios_saf":{"5.2""n","4.0-4.1":"n","<.2-4.1":"a #1&,"�.0-5.!":"a #q","6.0-6>1":"y2,"7.
"y","44":"y"},"safari":{"3.1":"n",23.2b:"n", 4&:"n","5";�n","5.�":"n","6":"n"�"?.1":"n","7 :"n","7*1":"a #1","8":"a #1"m,"opera":{"9":"N","9.5-9.6":"n","10.0-10.1":"n","10.5":"n"."1,�": y x&,"11":"y(x#,"11.1"�"i x","11.5":"y x","�1.6:"y x ,"12*:"y x","".!":"y�x"-"15":"n","16":"n,17":"n�,b18":"n","19":&y","20":"y","21":"y�,"22":by","23":"y","24":"y","252:"y","26":"y","2?":"{b,"2":"y","29":"y"},"ios_sa�":{"3.2":"n","4.0-4.1":"n",#4.2-5.3":"n*,"5.0-5.1":"n","v.0-6.1":"~","7.0-�.3": n","8":"a #1","8.1-8.3":"a #1"},"�p_mini":{"5.0-9.0":"y�x"},"android":{"2&1":"n","2.3":"l","2.3"*"n"�"3"z"o","4": ~",:4.!#2"n,"4.2-4.3":"n","4.4":"o"$"4.4,3-4.4.4":"y","40":"y"},"bb":{"7"�l","1 ":"n"}, np_mob":{"10":"n","11":"y x#,�11.!":"y x","11.5":2y x"."12":"y x","12.1"8"9 x","24&:"y","anf_chr":{"41":"y*},"and_Ff":{"36":"y"},"ie_�ob&:{"q0":"n","51":n}."and_uc":k"9.9":"n"=}."notes":"","notes_`y_nem"2{"1":"Partiah supporT in Safa2i refers to support for `object-fiv` b�t not `object-positmon`."},"usagd_perc_y":77.52,"wsage_perc_a�:7.;,bucprefix":false,"parent":"","keywordS":"obkectfit(objectqos�tin","ie_id":"objectgipandobjectpo�itionb4"chrome_id":&53126697028567042},"xhr2"8{"title":"ZELHttpRequesT 2�$"deccR)ptign":"Adds oor functIoNalitY to AJAX requests like file �ploads, er!nsfer progrgsS knFormat)on and$the ability to send for� data.2,"spe#""https://xhrspgc.whauwg.org/","spatus":"lsb�"link3#:{{"url":"https://Developer.mmzilla.org/en/XMLHttpZEquest/�oriData","thtle+:"MDN`qrti�le on FobmDati"},{"urL":"https://�ithub/com/#�r1cjUri.js","tmtle":"Polyfanl for"FormData object#},{"url":"ht�p://doc{.wgbplatform.orgwiki/apis/xhr/XMDHttpReauest","title":*WebPletnore Docs"}],"cateforie{":["@O
;"y","5"8"y","&":*y","7�:"y"-"9"*"y","9":2y","10":"y",&19":"y","12":"y","13": y","14&:"y",2�5":"y","16�:"y","12:"y""18":"y","18":"y","20":"y","21":"y&,"22":"Y&,"2":"y*,"�":"y",":5":#y2,":6"*#y","27":"y",�28":"y","29":"y","302:"y&, 31":"y","32":"y","33""y","30"*"�","75":"q","36":"y","37":"y","38b:"y","39"y","40":"�"},*chroie":{"4b:"y","5":"y","v":"9","7":"y", 8":"y#,"9":"y"�"10":"y","11":"y","12":&y","13":"y","14":"y","1�":3y","16":"y","17 :"y","18":"y"("59":"y","2�":"y","21":"y",&22":"y",&2#":"y","36":"y","25":"y","26":"y","27#:"y","28":"y"�"29":*y", ;8":"y","31":"y","32":�9","33":"y","34":"Y","3%":"9",*36":"y","37":"y","38":"y","�y2:#y","40":2y","41":*y","42":"y&,"43":"y","44":"y"m,"sqfari":;"�1":"n3,"3.3":"a","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y"("�.1":ry3,"":by"},"opera":{"9":"y","9.5-9.6":�y","10,0-10.1":#y�"1 .5";"y","10.6":"y","10":"y","11.1";"y","11.5":"y","11.6":"y�,"12�:"y","12*1":"y","15":"y"."16":&y�-"17":�y","18":"y","19":"i","20*:"�","21":�y","2:":"y",223":"9","04":"y","25:"y" "�6":y�,"2":"y","28":"y","29":#y"},"ioc_sa&":{"3.2":"a",�40-4.q":"x","4.2-4.":"y","/0-5>1 z"Y","6.-6�1""y","7.0-7.1":"y","8":"y",8.1-8.3":"�"},"op_ei�h":{"5.0-8/0"z"y"},"android":{"2.1":".","6.:":"n","2.3":"n","3":"y","4":"y"<"4.1":"y","42m4�3":"y#,"4.4":"y","4.4.3-44.4":"y","40&:"y"},"bb"2k"7":"y","10":*y },"op_moc":{"10":"y ,"11":"y",*11.1":"y","12."?"y"<"12: y"-"16.1&:"y","24"zy"],&and_chr":{"<1":"y"},"and_ff":{"36":"y"},bIe_mob":{"1 ""y"("11":"y"},"and_uc":z"9.9&:"y"}},"noteqb:"","notgs_by_jum":{},"}sqgE_perc_y":94.4�,"uSage_pgrs_a":8.1,"ucprefix":false,"parent":","k�yworls":"svg-as-h}g,sVg=al-img"-"ie_i`":"","chrmme�id":""},"DaTalist":{"title":DAtalist element",2description:"Method of setting a libp of opt)ons for a user0tn smlect"in � text fiel`, while dmaving th- aj�lktx to ent�r a cestom falue.2,"speb":"https://htm|spec.7hatwg.orggultipage/�orms.ht}l#the-datalist-e,emeot","status":"ls","lknks"[{"url":"ht|p://hacks.mozille./rg/2010/10/firefox-0-htoN5-forms'","title":"Mozilla H!cks article"},{"ub,":�http:/'afarkas.github.com/webshim-dmmns/","title":"HtML5 Labrary Incnudiog da|alist sup0ort"},{"url":"httpr:o/devaloper.mozi-ha.org/�n/IDML/Alement/D`tqdmsv ,"title":"MN refere.ce"},{"uzl":2http://docc.webplatfmr}.org/wiki/html/mlement3/data,ist","title":bWebR,atforo L/cs"}�{"url�:"http://de}O.igekpmr.com/detalist/""titlez"Eijy Kitamura'S options demos &!tests"},{"url":"hTtp://githUb.com/tjgre!si/dct`lis|-polyfill","title":"Minilal Datalist polyfinl w�tqtorial"}],"bctegories":["HTMD5"],"spats"8{*iE":{"5.5":"n","6":"p(,"7":"t",28":"0","9":"p","10":"a","!1":"a","TP":"a�},�girefox":{"2":"p",�3"*"p","3.5":"p","3.6":"p","4":"y","5""y",#6";y","7":"y"$*9":2y"-29":"y","10":"y"l"11":"y","12":"y*,*13":"y","14":"y��"15":"y","16&:"}","17 :"y�,"38�;"y","19":"y2,"20":"�","2!":"y,"22;"y",&23":"i","�4";"y","25"2"y","26":"y","27":"y","28"6"y","29": y","30":"y","31":"y","32":"yb,"#3":"y","4":"y*,"35":"�",36":"y","37*>2y�,*38":"y","39":&y,"40":"y#u,"clrome"*{"4":"p","5":"p","6":"p�,"7":"p",*8":"p","9"�"p""10":"p","11":"p","12":"p","17":"p","14":"r","11":"p","06":"p"�217": p","18"+"p"l"18"2"n","�":"y","21":"y",*22":"y","23�:6y",*24":2y"$"25 :"{","26�"y",""7":"y"l"28 :"y","29"8"y","30":"y","31":"y",";2":"y","33":"y�,"4"*"y","35"�y","36":"y",";7":"y","38#z�y","39":"y","40":"y","41":"y","02":"x","43":"y","44":"y"},"safari":{"3.1":"P","3.2"*"p","4":"p*, 5":"p","u.3":"p","7":"n","6.1":"n","7":#~","�1":"n"."8":"n"},"ope2a":{"9"z"x","9.5�9.6":"y","10.0-10&1":"y*,"10.5":"q","10.6":"Y","11&:"y","111":"Y","11.5":"yb$"11.6":"y",")2":"y&,"q2.1 "y","15":"i","16":"y"("17":"y","18":"�"<"19"�"y".b20":"y","21":"y","22"8by","23&:"�","24":"y"�"25": y","26":"y&l"27":"y","68b:"y","9":"yb},"iosOq�d":{"3.2":"p","4.0-4.1":"p","��2-4.3":"p","5.-5.1":"p","6/8-6.1 :"x""7.0-7.1":"p","8":"p""(.1-8.3":"p"},"ox_oini":{"5.0-8.0"*"n"}."`ndroyd":{"2.1":"p",".2":"p","2.s"#p","3�:"p","4"*bP","4.1":p","6.2-t.3":�q","4.4":#p","5.4.�-4.4.4":"y#,"40":y },"b`":{"7":#p","10":"y"},"op^mkb :{"10";"y","11":"y"%"11.1": q",11.5":"y","12"8*y","32.1";"y","24":"p"},"and_chr":{"41":"y"},"and_ff":{"36*:"�"},"he_mob2:{"10":"p","11":"p"y,"anm_uc":{"1.9":"9"}�,"notes":bParuIal support in IE10 refers |o [significantly buggY behavior](http://playgrounnnonereasoN.eu'2017/�4/ie10s-lousy-suppmrt-dgr-data|isdq/). Fir%fox doesn't support [datalist associapion with inp�ts of tYpe `numbdra](htt`;�+codepen.io/grasTepen/�Nm^[�)."<"not%s_�y_num":{},"u�cge_perc_y":63.83,"usage_percMa":)28,"ucpre�ix":false,"parelt";"forms","oexwords":"list attr)cute",ie_id":"�atali{telemelt","chrome_id :"6090950�20495368"},"data�gt":{"title":"d!taset & datam* atlributeq�, description":"M�uh�d of applying end accessing cu3toi data to elements.","spec":"htdps://html.s`ec.whatwg.nrg/multitage/dom.html#embedding-custom-nn)visibleda4A-with-the-data-*-attribttEs","statts":"ls"("links:[{"url":"http>//html5doctor.com/xtml5-custom-t`ta-cttributeq/","title":"HTML5 Doctnr ar�icle"}{"ur,":"it|p8//html5demo�.com/dataset","uitld":"Demo 5sing dataset"}�{"url":"https:�orag.github.co}/phiggins62/has.js/masve�'ddtect�dmm.jw#Dom-dataqet","title":has.js tesd'},{"url":"h4tp://dmcs.webplat&or}.org/wiki/ht�l/attricutes?lata-*", title":"WebPlatform Docs"},{"u2l&:"https://`evEloper,Mopilla.org/en-S�docs/Ueb/�I/UMLEle�ent.data3et","Titl�":"MDN ReFerence - dqtase4b},{"erl":"htt`S://developer.mo~Illa.org/�n=US/docs/Seb/Fuide/@DML/Usin�^data_atTributes","title":bMDJ Cuide - Using data-* attributec"}]("categories";[�HTML5"],"stats":{ie":{"5.5":&a"�"6""a"-"7�:"a","8":"a","9 :"a"-"50":"a","11":"y","T$:"y"},*firefox":s"2�z"a","":"a"�3.5&:"a"�"3.6#;"a","4":"a","5""a","�#:&y"<"7":"y","x":"y","9"*"y#l"10�:"y","1";"y",*2":"y","13*:"9"."14�:"y","15":y","16"�"y"-"17":"y"�"18":"y","19":�y"."30":"y","21":"y*,"22":"y","23*:"Y","24":"y","25":"y",&26":"y","2":"y",*28#:"q","29":"y","30":"y",";1":"y","32":by","332:"y","34":"y","31":"y","36"*"y","37":"y","38":"y","79*:"y","40":"y"],"chroma":{"4":"a*<"5":"a","6":#a","7&:"y"�"8":"y","9#:2y",210":"i","11"���","12":"9","13":"y","14""y","15":"y",�4":"y","17";"y#,"18":q","19":"y","20":"�"("21b:"y"$"22":by2,"23":"i","24":�y","2�":"9","26"�"y","27�8"y","28": y","p9":&y","30":b{","3!":"y"-"2b:"y","33":"y",b34":By"�"37":2y"-"36":"y","37#:"y","38":"q","19":(yb,�40":"{","41�:�y",242":"y","43":"y","64":"y"},"safAri"�{"3.1":�a","#.2":a","4"+"a"$5"�"a","5.1":"y","6":"y","6.1":"y"�"7":y","7.1":"y","8":"y"},"otera*:{"9":"a","9�%%9.6":"a",#18.0m10.1":"e","10N5":"a","10.�":"a",B11":"a"<"11�1":"y"$"11n5b:"y",*11.6b:"Y"l"12":"y","12.1�:"y","05":"y","16�z"yb,"17":"{b &18":"y",�19":"y","20":"y",231":�x","22":"y","23":"y","6�#:"X","25":"y","2"":byb,"27":&y","28":"y",�"9":"y"},"ios_�af":{"3.2":"a","4.0-4.1":"a","4.2-4.3"3"A","5.0-51"8"y","6.0
gidiub/com/jQuEry-cmntextMenu/",titde":"jQuerx polyfill"},{"urm":"https://2awngitiubcom/phiggIns42/has.j�+mastmr/�gtec|/events.j{#evGnt%conteztmenu"l"title":"has.Js!te{t"},{"url":2htpts://bqgzilla.mozilla*org/show_bug.cgi?yd=746 8�,"titlE":"Bqg on Fhrefox supp/rt"}],"c�tegkries�:["HTML5"],"ste�s":{"ie":{"5.�":"l","6":"n","7":"~","8":"n,�9":"n"�"10"z"n","q1":"N","T�&:"�"},"birefox":["2";"n",�3"8"n","3�5":"�",#3.6":"n",�4":"n","5":"n",22 :"n"."7":"n","8":"a",#9b:#a","10":"a�,"1�":"a","12":"a"$"13";2!","14":"a"."15":"a ,"1&":"a","17":"a","18":"a","19":"c","20":"a","21":"a","22":"a","23":"a","25":"a", 25"8"a","26":"a""27 :"a","2":"a","29":"a","30":"a","31":"a","32":"a","33":"�","3$":"a","35":"a","36":"a",�37":"a","38":"a","39:"a",bd0b:"a"},"chrome":{"4"2#n","%":"n"(b6":"n","7":"n","8"bn","9":"n","30":".",*11""&n","12":"j","13":"."<"14"*"�"l"!5":"n"$"16":"n",#17"*"n","1�":"n","19:"n","20�:"N",221b:"n"."22":"n","23":"n"("24":"n","2u":"n",�r6":"n","27 :n","r8":"l2,"2":"n","3":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"n","39":"n","40":"n","41":"n","42":"n","43":"n","44":"n"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"n"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"n"},"and_chr":{"41":"n"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"Partial support in Firefox refers to being limited to context menus, not toolbar menus.","notes_by_num":{},"usage_perc_y":0,"usage_perc_a":12.05,"ucprefix":false,"parent":"","keywords":"contextmenu,menuitem,command","ie_id":"","chrome_id":""},"rem":{"title":"rem (root em) units","description":"Type of unit similar to `em`, but relative only to the root element, not any parent element. Thus compounding does not occur as it does with `em` units.","spec":"http://www.w3.org/TR/css3-values/#font-relative-lengths","status":"cr","links":[{"url":"http://snook.ca/archives/html_and_css/font-size-with-rem","title":"Article on usage"},{"url":"https://github.com/chuckcarpenter/REM-unit-polyfill","title":"REM Polyfill"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"a #1","10":"a #1","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"u","5":"u","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y"}},"notes":"","notes_by_num":{"1":"IE 9 & IE 10 do not support `rem` units when used in the `font` shorthand property (the entire declaration is ignored) or when used on pseudo elements."},"usage_perc_y":91.55,"usage_perc_a":2.93,"ucprefix":false,"parent":"","keywords":"rems","ie_id":"","chrome_id":""},"ttf":{"title":"TTF/OTF - TrueType and OpenType font support","description":"Support for the TrueType (.ttf)and OpenType (.otf) outline font formats in @font-face. ","spec":"http://developer.apple.com/fonts/TTRefMan/index.html","status":"other","links":[{"url":"http://stackoverflow.com/questions/17694143/what-is-the-status-of-ttf-support-in-internet-explorer","title":"What is the status of TTF support in Internet Explorer?"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"a","10":"a","11":"a","TP":"a"},"firefox":{"2":"n","3":"n","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"y","3.2":"y","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"y","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"u","11":"u"},"and_uc":{"9.9":"y"}},"notes":"Partial support in IE9 refers to the fonts only working [when set to be \"installable\"](http://blogs.msdn.com/b/ie/archive/2010/07/15/the-css-corner-better-web-typography-for-better-design.aspx).","notes_by_num":{},"usage_perc_y":80.25,"usage_perc_a":10.91,"ucprefix":false,"parent":"fontface","keywords":"","ie_id":"","chrome_id":""},"touch":{"title":"Touch events","description":"Method of registering when, where and how the interface is touched, for devices with a touch screen. These DOM events are similar to mousedown, mousemove, etc.","spec":"http://www.w3.org/TR/touch-events/","status":"rec","links":[{"url":"http://www.quirksmode.org/mobile/tableTouch.html","title":"Detailed support tables"},{"url":"http://www.quirksmode.org/m/tests/drag2.html","title":"Multi-touch demo"},{"url":"http://schepers.cc/getintouch","title":"Information on the spec development"},{"url":"http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx","title":"Internet Explorer's gesture and touch implementation."},{"url":"http://github.com/CamHenlin/TouchPolyfill","title":"Touch polyfill for supporting touch events on Internet Explorer"}],"categories":["DOM","JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"p","11":"p","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"a","5":"a","6":"a","7":"a","8":"a","9":"a","10":"a","11":"a","12":"a","13":"a","14":"a","15":"a","16":"a","17":"a","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"n d #1","26":"n d #1","27":"n d #1","28":"n d #1","29":"n d #1","30":"n d #1","31":"n d #1","32":"n d #1","33":"n d #1","34":"n d #1","35":"n d #1","36":"n d #1","37":"n d #1","38":"n d #1","39":"n d #1","40":"n d #1"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"n","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"p","11":"a #2"},"and_uc":{"9.9":"y"}},"notes":"Internet Explorer implements Pointer Events specification which supports more input devices than Touch Events one.\r\n\r\nThere is a library on GitHub that is working toward bringing W3C touch events to IE 10 and 11: https://github.com/CamHenlin/TouchPolyfill \r\n\r\nRemoved support in Firefox refers to desktop Firefox only.","notes_by_num":{"1":"Can be enabled in Firefox using the dom.w3c_touch_events.enabled flag (disabled by default for site compatibility reasons)","2":"Supported on IE11 Mobile for phones with \"[Windows Phone 8.1 Update](http://blogs.msdn.com/b/ie/archive/2014/07/31/the-mobile-web-should-just-work-for-everyone.aspx)\""},"usage_perc_y":63.78,"usage_perc_a":0.87,"ucprefix":false,"parent":"","keywords":"touchstart,touchend,touchmove,touchenter,touchleave,touchcancel","ie_id":"touchevents","chrome_id":"6156165603917824"},"matchesselector":{"title":"matches() DOM method","description":"Method of testing whether or not a DOM element matches a given selector. Formerly known (and largely supported with prefix) as matchesSelector.","spec":"https://dom.spec.whatwg.org/#dom-element-matches","status":"ls","links":[{"url":"https://developer.mozilla.org/en/DOM/Element.mozMatchesSelector","title":"MDN article"},{"url":"http://docs.webplatform.org/wiki/dom/HTMLElement/matchesSelector","title":"WebPlatform Docs"}],"categories":["DOM","JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"a x","10":"a x","11":"a x","TP":"a x"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"a x","4":"a x","5":"a x","6":"a x","7":"a x","8":"a x","9":"a x","10":"a x","11":"a x","12":"a x","13":"a x","14":"a x","15":"a x","16":"a x","17":"a x","18":"a x","19":"a x","20":"a x","21":"a x","22":"a x","23":"a x","24":"a x","25":"a x","26":"a x","27":"a x","28":"a x","29":"a x","30":"a x","31":"a x","32":"a x","33":"a x","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"a x","5":"a x","6":"a x","7":"a x","8":"a x","9":"a x","10":"a x","11":"a x","12":"a x","13":"a x","14":"a x","15":"a x","16":"a x","17":"a x","18":"a x","19":"a x","20":"a x","21":"a x","22":"a x","23":"a x","24":"a x","25":"a x","26":"a x","27":"a x","28":"a x","29":"a x","30":"a x","31":"a x","32":"a x","33":"a x","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"a x","5.1":"a x","6":"a x","6.1":"a x","7":"a x","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"a x","11.6":"a x","12":"a x","12.1":"a x","15":"a x","16":"a x","17":"a x","18":"a x","19":"a x","20":"a x","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"a x","4.2-4.3":"a x","5.0-5.1":"a x","6.0-6.1":"a x","7.0-7.1":"a x","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"a x","2.3":"a x","3":"a x","4":"a x","4.1":"a x","4.2-4.3":"a x","4.4":"a x","4.4.3-4.4.4":"a x","40":"y"},"bb":{"7":"a x","10":"a x"},"op_mob":{"10":"n","11":"n","11.1":"a x","11.5":"a x","12":"a x","12.1":"a x","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"a x","11":"a x"},"and_uc":{"9.9":"a x"}},"notes":"Partial support refers to supporting the older specification's \"matchesSelector\" name rather than just \"matches\".","notes_by_num":{},"usage_perc_y":61.94,"usage_perc_a":29.8,"ucprefix":false,"parent":"","keywords":" matchesSelector","ie_id":"","chrome_id":""},"pointer-events":{"title":"CSS pointer-events (for HTML)","description":"This CSS property, when set to \"none\" allows elements to not receive hover/click events, instead the event will occur on anything behind it. ","spec":"http://wiki.csswg.org/spec/css4-ui#pointer-events","status":"unoff","links":[{"url":"http://robertnyman.com/2010/03/22/css-pointer-events-to-allow-clicks-on-underlying-elements/","title":"Article & tutorial"},{"url":"https://raw.github.com/phiggins42/has.js/master/detect/css.js#css-pointerevents","title":"has.js test"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"y"},"and_uc":{"9.9":"y"}},"notes":"Already part of the SVG specification, and all SVG-supporting browsers appear to support the property on SVG elements.","notes_by_num":{},"usage_perc_y":88.39,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"pointerevents","ie_id":"csspointerevents","chrome_id":""},"blobbuilder":{"title":"Blob constructing","description":"Construct Blobs (binary large objects) either using the BlobBuilder API (deprecated) or the Blob constructor.","spec":"http://www.w3.org/TR/file-writer-api/#the-blobbuilder-interface","status":"wd","links":[{"url":"https://developer.mozilla.org/en/DOM/BlobBuilder","title":"MDN article on BlobBuilder"},{"url":"https://developer.mozilla.org/en-US/docs/DOM/Blob","title":"MDN article on Blobs"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"a x","7":"a x","8":"a x","9":"a x","10":"a x","11":"a x","12":"a x","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"a x","9":"a x","10":"a x","11":"a x","12":"a x","13":"a x","14":"a x","15":"a x","16":"a x","17":"a x","18":"a x","19":"a x","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":�y","27":"y","2:""y", 29":"y"},"IosOs`f":{"3.3":".","4.0-4&1":�n","4.2-5.3":"n*,"5&0-5.1:"n","6.0-6.1":"y","7.-7.1":"y"$"8":"y","8.1%8.32:"y"},"op_mini#:{"5.0-8.0":"o&},"an�:oid":["2.1":"n"$"2n2":"l","23"2"n","3":"a z","4":"� x","4.1":"a x"$".2-4.3�:"a 8","4.4":"a �,"4.4.!-4.6.6":"a x",&40":2y"},"bb":{"?":"n",#11":"y"=,"o0_�ob":{"10":"n","11":"n",b91.1": o",�11.5":"n","q>":"n","12.1":"y","2":"y"},"and_c(r":{"41":"y"},"anl�f&":{"36":"y"},"i�[m�b"�{"10":"y","11":"y"],2and�uc":{&9.9">"a x"]�,"noues"8"Pavtial suppovt refebs!to"only suppOrting the low `epr�caued Blo"Buildgv to create blobs.","notes_fy_num":{},"usaga_pers_y":78.45,"usage_xerc_c":1!.6,"ucp�efiX"2tbue,"parejt2:&fileapi","ceywg�ds":2","�e_id":"f|ob,#chrome_it":"5328783104016384"},"filereader*:{"titld""ileRe)der API�,"descriptimn":"Method og raadyng thE c�ntents oF a File or Bloj`objgkt into memory","spec":"hwtp://wsw.W3.�rgTR/FjleApIo#df.-f)lereadep","statqs":"wd","links":[{"usd":"https:/-dtvelo0er.mozilla.org/en/DOM/FileRuaDer*,"title":"FileR�ader"API"},{"urL":"htt`:/doc�.webplatfo�m.org/giki.apis/file/�ileReader"<title":"WebPlatfo0m Docs"}],"categ�ries":["JS API"]"stats":{"ie"6{"5.5":�n","6":*n","7":"N","8":"n","9b:"n#,210":"a #1","11":"� #1","TP":"q"}."firefx":{"2":"n","3"z"n2,"3.5":"n","3*6":"y"-"4": y","5":&y","6":"y","7":"y","8":"y","9":"y","�0":"y","11":"y","12b:"9","3":"y","14"z�y"L 15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","29">�y","22":"y","2s":"y""24":"y","25":"y <"26"z y,"27";"y","28":*y","29":"y,"30":.y","31":"y",32":"y&,"�3":"y"l"34":�b,"35":y")"36":"y","�7":�y ,238":"y�,"39�:"y","48":by"},"cxrome":&4":"n"l"5":n","6":"y","7:by","8:"9",9":"y","10":"{","11": y","12":"y","1s":"y","94":"y".'15":"y","06":"y","17":"y&,"18"2"y",&19":"y","2 ":"y","21b:"y","22":&q�,"23 :"y","24":"y","5":"y",26":"y$,"37":"y","28"�"y "29":"y","30":"y",31":"Y",";0""y",2332"y","34":"y","37�:"y&,"36":"y2,"77":"y","382:"y"$"39":�{"-"%02:"Y",�41�:"y"<"46":"y",�43":"y","44";"i"}l"sAfaPi";{"3.1&:"n","s.2":"n&,"4":"n",#5*:"n",".1"2"n","6":"y",*6.0#:"�",27":"y,"7.1":"a","8":"y"},"otera"8{"9":n","9n5%9.6**"nb,10�0-10.1":"n","10.5":#n","!0.6":�n","5"*".","11.1":"y ,21.5:"y",290.6":"Y ,"13":�y","12.1":*x","15":"y"-"16b:by","03":9�,"18":"ybl"18":*y","21"8"y","21":"y","22":"q"�"23":"�","24":"y","25":"y",*26">by&,"27">"}","28#:"y","29":"y"},"ios_saf":{"7.2":"�"."<.0=4.1":n","4.2-$.3";*n ,"5.0-u.1b:"n"�"6.0-6.3":"y ,"7.0-7.1":"y","":"y","01)(.3":"y"},"o`miny&:{".0-8,0":�n"},androidb:{"0.!":"n","2.2":"n","2.3":n","3":"y","5":"y","4.1": y","4*2m4.""y","4/$":"y","4.4n3-4.�.4&:"y","40":"y"},"bb"{"7":"n","1�":"y"}, op_mor":{"10":"n","11":"n","11.1":"y","11.5#:"y","12#�"y","u2.1":"Y","34b:"y"],"and_chr":;"41":"y"},"ant_ff":{"36":y"},"ie_mobb:{*1":"y""11:"y"},"`nd_uc":{"1.8":"y"}},"noTer":"","notes]by_num":{�1":"Does nkt su�rorT0`bmadAsBmnarYStrinG`"},"usaGe_perc_y":82.1;,"u�ige_pepca9.2, u�prefix":false,"parent*:"fileapi","keyword{":" ,"ia_id""filereAder","chro}e_id":"11710031�5430128"},"filesYstem(:{"title":"Filewystem  FileWriter @RI",*descrap4ion":"Eethod of reading and writy.g files to a s�.dboxed File sysvem.",*spec"�"ht|p://www.w3.orf?TR/file-s}sdem-api/","status":"unoff",&links":[{"uzl":"htTp://gww.`t}l=rock�.com/mn/tutorials/fme/id%system/","tivle":"HTML5 Rocks tut�riAl"},{"urL";"htvp://docs.webplatform.orw/whkk/apis/filesySteM","titlm":"WebPlAtfobm Docs"}],"categories":["JC A@I],bstats�:z"ie":{*5.5:"v",">#:2n","7":n","8":"n","9":"n","30"z"n","11":"n","TP"*"n"},"firefox:z"2":"n","3":"n&,"3.5"8"n","3.7":"n","<""n","5":"n"."�":"n","'"z"f","8":�n","9":"n","10":"n","11":"n","12"8"n","13":"n"$"1<2:"n","1=":"~","56":2n&,"17":"�",#18":"n","19"2"n","20":"n","21":"lb,"22222n"l#23":"n", 24":"n"<"25":"n ,"26#:"n","27":"N.,"28":"n","29":"n","30"�.n","31":"n","32b:"n","33""n","34":"n&,"35":"n","��":"n"("37"2"b","38":"n",b39":bj","t0*:"n"},"c�rome"*{4":"n","5":"n","6":"�", 7&:"n", 8">2a x","9":"a 8",18f:"a xb,"11":"a"x",b12":"a x","13":"y x","14":"y x","15":"{px","16":"y xb,"16&:"q x",18":"x x","19*"y x","20b"i P","31&0"y x",&62&>"y x","23":"y x&("25#:by z",&25*�"� x&,"06:*X x�,"23":"y20","2":by`x","r9"�"y x,"30":"y x"-"11":"y x"l&32":"y x�,"33":"y x","34">"y x","35":"y!x","36":"q(x"<"7":"y x","38":"y �"$"79":"y x","40":"y(X","t1":"y x,"62*:"y x","43":"y"x",�40"8"x!x"},"safari�r{"3.1":"n","3.3":"n","4":"n"�"5":"n","5o1":"~","6":"f",�6.1":"nb,"'�:"n",b7.1":"n�,"8":"n"},"opErc":{"9";"n"�"9,5-9.�":*j","11.0-10.1"z"n",b105":"n�,b10.v""N","11":"n","!1.12:"n2,"11.5#:"n","11.6":"n","1""z"n","1:.1":"n","1u :"y x",&16":"� x","17":"y x","18":"y �","19":"y x","20":"y x","21":"y x","22:by"x2<"23":"y x","24":"y |",*25":"y x","26":"y x","27":"x x"l"2<":"y x"."29":�q x },"ymssag":{"3.2 :"n","4.0-<.1":"n","6.2-4.3"8"n",25.0-5.1":"n2,"6.0-6.1":"n","7.0-7.3�:"n",�8""n","8.q-8.":"n"},"op_mini":�"5.0-8.0"�"n"},$android"{"21":"n","2.2":"n�,"2.3"*"�","3":"~","4"z"n","4.1":"n","4.2-4.3";"n,"4.4":jn�,"4.4.3-4.4.4":"n","40&:"n"},"bb":�"7"8"nb,"10&:"{�x"},"op_mob"*s"30"z"n",&1";"n","0q.1":bn", 11*5":2o","12":cn","12.1*:"n","24":"y x"},"andc`r":y"41":"y x"],"and_ff":{"36":"l"},"mD_mob":{ 10":"N","11":"."},"and]uc":{"9.9"*"l"}},"notes"�"The Fkle API�Directories an$ S�stem specification is no lol'uj beiog"main4aAned c�d sup�ort mAy be drpped in%futupe versions.","nOtes_byOnum":{},"u3age_per#_y":4=.9�,"usageperc_a": .14,becprefix"*fal�e,"paZdft":"","keywrds":"filewriuer"("ie_id":"&ilewrIter","chrome_id":"545248162951�84"},"bloburlc":{2title#:"Blb URL{",descriPtion�:"Method`of cree|ing UZL handles to t�e spekified File or Blb objeat.","rpec":"ht|p://w�w.w3.krg?TR/FileAPIo#Ur,","rtadus":"wd",*lInks":[{2url":"https://developeR.iozilla.org/en/DOM/window.URL.createObjectURL#,title":�MDN article"}],"categories":["JS API"]("statq":{"ie28{"5.5":"n","6":"n"("7":&n","8":"n","9":"n,"1�":"y",�11":"y�,"�P":"y"},"f�refox":{""&:"n","3";"l"-"2.5":"n","3.6":"n",�4&:"y","5":"i","6":y","7":"y",":":"y", 9":"y",210":#y"."11":"y","12":"y","13":"y","1�*:"y","15":"y�,"16":"y","17":"y","18�: y","19":"y","20 :"y","21":y",*26":"Y","r2""y","24":"y"(b25":Y","�6":"y,"27": {","�8 :"y", 29":"y"$"30":"y"<"31*:"y","32"2"y","33":"y","34":"y",b35";y","36":"x",�37":"i","38":"}"-"39 :y","40":"y"],"�hrome":{b4":bn"�"5":"n&,b6":"n","7":"f""8b:"y x","�":"y x","10":"y x","11":"y x","12":"y x","13":#y x","14":"y x","15":"y x","16�:by x","17#:"y x2,"18":"y x",&1":"y x","20":"y x","21":"y x","22":"y x","23":"y","24":"Y*,"25":"y"$"26":"}","27&:by","28":"y","29":"y","30":"y","31#:"y","32":"y"-"33":"y","34":"y","35":"y","36*:"y"l"27":"y","18*:"y",239":"y","4p":"yb"41":"y","42":"Y","43":"y�"44":"y"},"safari":{"2&1":"n","3.2#;"."$"4":"n","5":2n"="5/1":"n","6":"y(x","6.1":"y"-"7""y","7.9":&y"("�":"q"}�"gtera":{"�":"n",b9.5-9.&":2j""10,0-80.1":"n","10.5":"n","10.2":&n2,"11�:"n"("11.�":"n"("11.5":".",&51.6":"n","12":"n","12*1":"n","35":"y","6"8"y�,297":"y","18":*q","19":")&,"r0":"y",�21�:"y","2":"y","23":"}",""4":"q","25":"y"�"26":"y","25":"y","28":"�*,"29":�y"},&a/s_saf":{"3.2":"n","4&0-4.1":"n","4.>-4,3" n","5.0-5.1"*"n","6.0-6.q":"y x","7.0-7.1":"Y"<"8":"y",20.1-8.s"*"y"},"op_mini"*{"5.0-8.0":*n"},"androi�":{"2.1":"n","0.2":#n","2�3":"n2,*3""n,"4":by x","45":"y x,"�.2-4.3"*"y �","4.4":"y"," .4.3-4.4.4":"y",b40&;"y"],"bb":{ 5&:"n","10":"y"},"op_mo"":"10 :�n","11":n",11.1 ;"n","11.�""f�,&10":"n"("12.3"z"n",b6":"y"},"and_chr":{"41*:"y"u,band_fn":{"36&:"y","im_mob":{"1�":"n","11"�"y�|,"a�d_uc":{"9.9":"y x"}},"not%s":","notes_byOnum":k},"usage_percy(:8<.82<"5sage_perc_a":0,"UcprEfix":false,"pare�t":"fileapi",&keywords"�"k�eateobjectur|","ie_id":""("chzome_id":""}�"rElliqt">{"title":"remList"(DOMTokenList)","description":"Metlod of easily manitulatiNg rel�adtrabute)vamuey`on elements, using`tje DOMTokenList objeCt$(similar to alassist)."<"{peg:"httpw>/.htm,.spdc.wladwg.orw/}udtiRage/semantics&(tm�#dom-a-rellist","st`tus":bLq","lknis":[{"url2:"https://tewelorer.�/zi|la.org/en-ES%docs/dOM/DOMTojenLiwt"-btmpla":"MD`- DOMT/kenList"}],"categories"z{"DOM","HTML5"],"stats":s"ie":{�5>5":"n","&":"n
,"7":"n�."8":"n"l 96: n",010":"n","13**"n"<"TP":".*},"fireF�pb:{"2":"n","3b:bn2,"3.5"*&n","3.6":"n","4":"*","5":"n","2":"n","7":"n","8":"n","9"".",10":bn","11"2"n","12":2n","13":"l","14":"n","15"8 n","16":"n","17":"n",�18":"n",18":"n","20""n","21":"n","2r";". ,"23":"","24":"n","25"8"j","2":"n","27":"n"-"28":"n", 28�:"n","30":"y","31":"y"�32":2y2,"s�":"y","22:"y","35":"y","36":"y","37":"y","3� :"y2,"39b:"q"< 40"z"y"},"chrole":{"4":"N",5""n","6":"n","7"�n","8*:"n","9":"l","10*:"n",�1":".",&12">"f","8;":"n,"14"2"n","15":"n","16&:"n�,"17":"n","18":"n","19"z"n0,"0"8"n","21":"n","23""n","23":"n","2":"n","25":n",�2&":"n"("27":"n","28":"n","29":2n","30"z"n""31":"n ,"32b:"n2,"33":"n","34b:"n","35";"n",";6":"n","#7":"n","38":"n"("39":"n&,"40":"n"(40":"n","42"*"n","43""�","44�:"n"},��afari":{"3.1"2"f",23.2":"n",#t :"n","5":"n"("5.1":"n","6":"n","v.1"z"n�,"7b:"n","5.0":#v","8":"n"},"opera":{"9":bn","9.5-9.6":"�"d"10.0-30.1":"n,"10�5":"n&,"10.6":#n ,"05":"nb,"11.1"8"n","11.7":�","11.6":"n","12":2n"�"12.1"8"n"."15":"n","16":"n","17"8"n","1x":"n","19b:"n",": ">"n""21":"n","2":"n"-"23":*nb,"24"� n", 35":"n","262:"n#,"27":"n","08 :"n","29":"n"},"ios_saf":{"3.22:bn","4.0-4.1":"n ,b4,2-4.3:"n"n"��0-5.q":"n","6.0-6.1 :"n","7&0-?.1":"n"<"8:"n","8.1-8.3":"n"},"op_minib:c".0-8.0":"nb},"anlroi�":{"2.1"*"n","2.2":"n","2.3":bn","3":"n","4":"n","u.1":"n","4.3-4.3"z"n","4.4":"n","4.4.3-4.t.4�:"n","<0":"n"}- bb*:{B'&:2.","10":"n"},"op_mob"8{"1 ":bn","11":"k","11.1":"n","13.5":#nb,"12b:"n","1r.1""n","24":"n"},"and_chr":{"41":"."},"and_ff":y"36":"y"},"ie_mob":{"10";"n","1";"n"},"andWuc":{"1.9":"n*u},"notds":""�#notes]fy_fum":{=,"ucageperc_y":11.2,"usage_perc_a"�0."ecprmfk�":false,"pabe.t":"","keyWords":2","ie_id":"","ch�ome_id":" "tiqedarrays":{"title":"Typed Arrays","�eScripdion":"Javacript |ypet arrays$0rovide a mechanksm for accessmng paw bi�ary dqti mugh morg efviciently.\r\n","spec":"http://www.khponos.orf/reoiStr1/t�pe�!rray/specs/latest/",&staTus":"other","links":[;"url"2"httxs:?/dafElopmr.mozilla.oro/en/javaScrip4_tyqed_arRays"-"title":"MDN artiale"}M,"cetEgn2ies":["JS API"],*stats":{"ie2:{"5.5�z"n","6":n","6":"n","8":"n","9":"n","10"*ba 31","11";"9","TPb:"y"},"firefox":{"2":"n","3":"n","3.5":"n#,23.6":"n*,"4":"y", 1":"y"-">":"y","7":"y","8":*Y",*:":y","10"2"y&,"11b:"y","122:"y"|"13":"y�,"14":"y","15":"y","16b:"y","17":�y"$"0�"�"y","192:2y,"20":"8","21":"y","22":"y","23":"y","24":"i","24":"y","26"0"y"l"27":"y","28":y","29":"i ,"30":"y","3022"y"$"32"8"q","33""y*("34": y","37":"y","36":y","37""y","38":"}","38":�y","40":"}"},`chrome":{"4":"n",*5":"n"$ 6":l","7":"y","8"*"y","9":�y","10�:"y�,05b:"y","12":"y*,"13":"q","4":"y","15&:"y",*16""y"<217":"y","18":"}"�"19":�y�,"20":"y","21":&q","2":"{","2�":"y","24":"y&,"2%:"y","66":"y",":?":"y","28 :"y","2�":"y","30 :"yc,"3�":"i","72":"y","33":"y,"34":"y","35":"y"("36*:"y"("37":"y","38":"y","3)":"y","40":"y","q":"y","42":"y","43 :"y","44":"y"},"sadari"::"3.1":"n","3.2":"n"("4"2"n","5":"n2,"��":"a 32","":"y ,"6.1":#y","72:�Y","7.1":"y",�8":"y"},"oPera":{"9":"n","9.1-9.6":*n","10.0-10.1":"f","10.5":"~","10.6"*"n2,"01":"n","�1.1":"n","11.":"n","s1/6":"y","12":"y","1:.0":"q","15":"y","1&":"y",�17":"x","18�"y">"19":"y", 20":"y","21":"y","22":"y,"23":"y","24":"y",&25": y""26":"y","27":"}", 2<":y"$"r9":{"},"ios_sab":{b;.2"2*n","4.0-4.1*:"n&$"4.2-4.3":"a #2"<"5.0-5.":"y","6*0�6.1":"y","7. m7.1":#y","8">"Y","8.1-8.":"y&}�#op_iini"2{"�.2-8.""n"=,"aNd2oid �["2.1":"n","2.2"&n","2.3""n","3":"n","4":"y�,"4�1":"y",$.:-4.3":"y","4.4":"y",&4&4.3-4.4.4";�y","40":"y"},"bb":{*'"�"n","10":"y },"op_lob":{"10":#n","�1":"n","11.1":"n","1.5":"n","12":"y"l"12.1":"y","24#:"y"},"and_chr":{"41":"y"},"and_fd":{"36":"y"},"ie_mob":{"10":"a #1","11":"a!#1"},"and_uc":{".9":"y"}},"notes":"","fotes_by_numb:s"1":"IE10 (and IM 10&11 igbil�) does nod suppkrt `UinD8ClampedArray`*|,"usage_perc_y"z8�.31,"usegm_xE�c_a":2.35,"ucprefix":famse,"paren":"","keyw�rds&:"fnnat64arrcy,datavIEw,uint8array",ie_id":"typedarrays","chrmme_id":"%335818813341696"}�"DevcqemrientaTio� :{"title":"Devi�eOrientation events",dascrip4inn":"API fR devectmn' orientcpKo. alt mmthOn$evafts froi$the dmvicd�`unninf!tle`bpowsev.",*spec":Xttp://www.w3.org/TR/orientatigfeevult'2,"sta4es":bwd","lmnks&:[{"url":"hutp;//www.html5roc�s.com/en/tu4oRials/de~ice/o�ientatign+","Title":"HTML5 rocks tutoriel"},x"urL":"httpw//raw.github.co}/ph�ggins40/jas.*s/mAster/detect/nea4ures.js#natifemorientation"hbtitle":�has.js test"u,�"url":"http://htmlulabs.intevoperabil�tybrilges.bom/proto4ypes/device-oRkentation-eventc/�evice-orie�tatiOn-events/info","�itle":"DeviceOriantavion implementation prototyp� fgRIE10"},�"u2l":"��tp://aur%,io.audero.iu/delo/$evice-orientaTion-api-demo.html","tiule"2"Demo"}]<"sategories":["Js API"],"rtae3":{"ie":{"5.7":"n","6":"n","7":"n","9"*"n","92:"n","10":"n","11":"a #1",�TP"3"y"}."firefox":z"�":"n",23":"n","3.5":"n*,#3.6":"p","4";"p"l"5":"p","6":"","7":"a","9":"a","9":"a"."12":"a",11":"a"-"12":"a#,"13":"a",&14":"a"l"91":"a"."16":"a","17":"a","18"8"a","19":"a"l"20:"a","21":"a","22";ba","23":"a","24">"!",225":"a","06":"a","27":"a","28":"a",b29":ba","30":"a","21":"i","32"x"a","33":"a ,"34":"a:,b31":"a",*36":"i","#7":"`"18":"a","39":"a","40":"a"},"cirome":{"4":"n","5*:#n","6":"n".&7":"a"l"8"0"a"$"9":"a","14":"a&,"118"a",#1r":"a","13:"a",*14":"a","15": c"<*16#:"a","16 �a","�8":"a","19":�a","20":"a",*31":"a","22":"m*,"23"8"a","24":"a",#25":"�","66"8"a","27":"`","28":"a","�9":#e","30":"%","31":"a"�"32":"a","332:"a",�3$":"a","35":"a","36":"a","37":"ab,"38":"�",b392:"a","40":"q","41":"a"l"t2#:"a",#43":"a","44":"!"}, sa'ari*:{*3.0":"n"-"3.2"2n","4":"n","5":"","5.1":"n"l"6":"n","6.1 :"n","7">�n","7.1�:"n", 8":"nb},"operc":{"9#:"n","9.5�9.6":2n"-�q4.p-10.1 :"n"("5�.5":"f","10&6":"n","11#*#.","1.1":�n"�"11.":"h","11.&":&n","!2"8".*,"12,9":"n","15":�a2,"16":"`", 37":"a","18:"ab,"18":"a,�2 ":"a","21":"a","22":"a"-"23":"a","24":"a","2u":"a","26":"a","2w":"a"$"28"*"a,"2;":"a"},"hoq_saf":{"#.2";2n","4.0-2>1":"n","4,2-4*3&za","5.0-5.1":"a","6.0-6.1�:"a",�W.0-�.12:"a","8":"a"<"8.1-8.3":"a"�,o0_mini":y"5.0-8.":"n"},"android":{"2.1":"n","2.2":*n"-22.1":"n"<"3":"a","$"8"a","4.1":"a, 4�2-4.3":"a","4.4":�`","4.4.3-4.4.4":"a,b40":"c�},"bb":z"7":"n","10&:"a },"op_m/b":{"10":"n"h"11":"n","11.1":"n","11.5":"n",12.;"y","12.Q":"y","24*:"a2}< and_chr"2{"41":"a"},"`nd_ff":{"36�;&a"},"ie_mob":{"10"8"n","11":"y"},"anf_uc#:y*99":"a"}}$"notes":"Par�ial0�uppobt refe�s to uhe lack �f com`ascneEdscalibration evejtn Prtiah support aesk refers to the lack of Devicemotion dvent qup�ort for Chrome �0- qnd Ope2a.�Opera Mofile 14 lost the oldevi#emotion event support/ FirefOx 3.6.�4 afd 5`support the nkj-standabdh[MozObientation](hTtps://deva,oper.mozylla.org/en/DO
avaScript file to ruN whmN$the DOM is loaded, witho5t ddlaying�Page load first.","spek"8htt`s://html.spec.whatwg.org.multipage/�cripting.html#attr-s#ripd-defer","cdatus""ls","linjs"z[z"url":"ht4ps:--derelopgr.mozil�a.Org/en/�DML?Elament/scvipt#Attributes*,"ti|le":"MDN article"},{"url"z"iptps://raw.github.Qo-/phiggmns�2/has.js/master/tetect/scpipt.jw#script%dEfer ,"titl%":>has.jq test"},{"url":"hdtp:/-dMcs.webPlatform.or'/wiki/l|ml/attpibutes/`efer","title":"WebP�auform Docs"}\,"ca4egories":["D�O" HTML%"],"stats":{�k�":{5.5":"a"."7":"a",*6":"a","8":"A","9"8"a","q1"2"y","�1":#y","TP":"y"|,�f)r�fox":{"2":"n","3b:"n*,#3.5":"y","#.6":"y","� :"y","=":"y","6":"i","7":"y","8":"y",9":"y ,"1 ":"y",&11#:"y","12":"y","13":"y","14"8"y",15":"y","16":"y2,17"
"y","18":"y","19":"y","r0":"y"."21":"y","22":"y","2#":"y","24":.y*,"25":"y","22":"y","27*: y","28"2"y","292:"y",";0":by","31":"y"<"32":�y","33":"y","34":"y",235":"y"$"s6":"y","7"2"y"."38":y#,"2�":"y",`40":#y"},"chrome":{"4":"l","5":"f",6":"n","7":"n","8 :"y","9":"i",&10":"{","11":"y","12":"y","�":"|","1�B:"y","15":"y","1�":"y","!7":"y,18":"y","19":"y","20 :"y"$"21"*"q"�"22"�"y ,"r3": y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y"8"31":"y","32":b{","33":&y","34":"y"� s5":"y","36":y",.37":"y","38":"y","39":"y","40":"y"("41"2"y","$2":"y","�3 :"y","44*:2y"},"safari":{"3.1":"n"$"3.2":"n"-"4":"n","5":"y","5*1:"q","6""y","6.�":"y","7*:"y","71":"y",#8":"9"},"gpera":{"9""n",")>7-9.62;"n","10.0-1�.1":"n",*10.5":"n"-"10.v"2"n","11";"n","11.1":"n","1.5":"n","11.6":&n","12":"n","12.1":"n&,5:"y","1&":"y","17"�"y"-�18";"y","19":"y","20":y","21*:"y"�#22":by","23 :"y","25":"y�,"25":&y","26":"y","27":"Y","28":"y","296:"y"},"ios_sif":{"7.2"8"n","4.0m4.1":"n","4.2-t.3":"n","5.0-5.1":*y"�"6.0-6.1":"Y","7.0
6":"n","7":"n","8":"n","9*:"y","10":"y",#11":"y","TP":"y"},"fibewox":{"2":"n","3":"n","3.5":"n*,"3.6"8"n�,24":"n","5":"n","6":"n","7":"y","8":"y","9":"z","1 #:2y","11"�"y","12""�","13":"y"�"14"�"�","15"��y","16 :"Y","17*:"y","18":"y',"9":"y","20":"y","21":"y","22":#y"":3":"y","24 :"y","25":"y","26":"y","27":"y","28":"y","29#:"y","30":"yb, 31":"y",*32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38#:"y","39":"y","4�":&y"},"chrome":y"4":"n","5":"n","6":"y x",�7":"y x","8":"|!h","9":"i x","!0":"y�x"<"11"8"y x","12":"y�x","13":"9","14":"y","15":"y#,"16":"y",�17":#y&,"18":"y","19":"y",#20":"y", 21":"y","22";"y","23":"y"<"2<":"y",225":"x"$"26":"q","27":"y",�28"z"y",":9":2y"l"30":"y,"31":"y","32":*y","33":"y",234":"y","35"z"y",";6":"y","37":"y","38"�"y","39":"y","50":"y","41":"y","43":"}",*43"*"y","44":"y"},"s�bari":{"3.1":"n","3.2":"f","4�:"n#,#5**"n","5.1":"n*,"":"n"l"6.1":"n","7":"n","7.1":n","8":"y"},"gqera"z{"9":"n","9.5-9.6":"n$,"10.0-10.!":"n","10.5"z"n","10.6":"n","01":"n","11.1":"n","01.5":"n","11.6": n","12":"n",12.1"8"n",#15"Z"q"("16":"9","17":"y".#18":"�","1":"y",*00">"y"<"21b:"y#."22":"y",":3":"y, 24":"y","25":"92,"26#:"y","27":"i",228b:"y","29":"yb},"ios_s`f":{"3.":"n","4&0-.5":"n","4.2-4.3":"n","7.0-5.12:"n","7.
"y","r9":"y","30":"�","31":"q","3":"y"l"33":"y","34":"y","35":"y","36":"y","37":"y","38":2y","39":"y ,"48":"Y"},2chreme":y"4":"y","5":"y"$"6b:"{","7":"y"<"8":"y",29":"y","1  :*y","11":"y","12":"y","13":yb,"14":"y", 15":"y","16":"y","17":"y","18":"y","18":"y","21&:"y#,"21 :"x","22":"y",&23"8"i"."24�:"y","25":"y","26":"q","27":"y",*28":*y","29*:"y","30":"y"("31":by",#3:">"y","33"�"y",&34":�y","35":"y","3&":"y"("17":"9","78":"y"("79":"y"-"40":"y","41""y","42":"y","43"z"y","44":"y"}("safari":{"3.1":"n",B3.2":"n","4":"n","5":"y","5.1":"y","6":2y","6.1*:"y","7":"y"�"7.1":"y"<"8":"y"},"operA*:{"9&:"n,"9.5-9.6":"nb,"10*0-10.1b:"n"-"10.5":"O","106":"�","11":"n","11.1":"n","19,5":"n","11.6":"N","1r":"n ,"121""n","1u":"y"�1v":"y","05":"y","18"*"y","19:"x","24""y#,"21":"y","22":"y�"23":"y","24":"q","�5":"y",#26":"y -""7":"y2,"�8":"y","29":"y"},"igs_saf":{*�&2":"n","$.0-4.1"z"n2"4.2-4.3":"y"("5.0-5.1":"y","6.0-6.1":"q"(#7>0-7.1*:"y","8:"y","9.1-8.3"*"y"},"op]mini":{"5.0-8.0":"n"},"andrOid ;{"2>1":"�","2.2":"y","2�3":"y","3":"y�"4":"y","4.1":"y","5.2-4.�":�}","4.4"z"y","4.4.3-4.4.4":"y", <0&*"y"],"bb":7":"y","10"z"y"},"op_mob"2{"10":"n","11":"n6,"�0.1":"."$ �1.5":"nb,"1:"�"n","92.q":"n","24":"q"},"!nd_chr":{"41":"y"},"ant_nf*:z"36":"y�|,"iE_mob":s"10 2"}&. �1":"y"},"cnd�c":z#9.?""y"}},"~o4es#:"","notes_by_num":{},"us`gererg_y":88.83,"us�ge_�erc_a":0.59,#ucprefax":fal3e,"parent":"","o%ywords":"","ie_id":"iframesandboxaptri`utg",b�hrome_id":"571553639902592"},"css-ccultmrs":{"title":"cWS Counte2sb�"desc2ipvion*:"Method od cOntrolling number4va,uer In generated coN4ent, using the`kOuftermreqet and countdr%increment prmpebties.","spec":"http://www.w3.o2'/TR/CSS20+genera4e.jtm|#counters","status""wd","links":[y"usl":"h|Tp://Onwebdevblogspmt.cgm/2012/02/csr-cOunterr-tutoriaL.html","title":"�utO2ial and i~&ormauion�}<{"U�l":"https:/-devglgter.mozilla.2g/en/CSS_Counters�,"title :"MDN aRuicle"},{"url&:"http:/'dncs.webxlatform.orw/wiki/ccs/prkpe2ties/ckuntmb-2eset","title":"WebPlatfgrM DoAs }],"catee+ries":["CRS2"]-"stats":{"ie">{"5*5":"o","6"8"n","7":"n�,"8":by","9":"y",#10":"y","11":"y","TP&:"y"},firafOx":{"2":"y","3":"y","3.5":"y","3�62"y","4":"y ,"%":"y","6":"y","7":"{","8":"}","9":"yb,"10":"y3,"1128"y",b12":"�"( 13":"y","14":"y","15":by","16":"y","1":"y�,"18":"y","19":"y2,"20":"y","21""y","2:":y"$"23"8"y,"24":"y","2":#q","26":"y","�7":"y","28":&y"("29":y","30":"y","31"z"y"�"32#*"y","33":#i","34":"y","35":"y","36":�y","37":"y","38":"y",&3�":"y&,"0";#y"},"chro}e"�{"4":"y","5":"y�,"6":"y","6":"y","8":"y","9�:"yb,"10":*yb,"01":"y","12":"y","13"z2y", 10":bY","15#:"y","16": y",�15#:"y","58":"9�(b19":"y","21": y","2�":"y","22":"y","23":"q"."2t":"y","2%":"y","26":"y","27":"y","28":"y","2=":"y",*30 :"�","31":"y","32":"y",*33":"y","34$8"y","35":�yb,"36":"y","37"�"y","38:#y"."39":"Y","40";"y"("43&:"y","41":"y","$3�:"y","44":"x"}l"sAfari"�{"3.1":"y","3.2":"y ,"t":"y","5":"y","5.1":"y","6":"u","�.1":"y�,"7":"y","7.1":"Y","8":"�"m,"opera":z"9":"y","9.5-9.6":"}","10. -10.1*:"y","10.5":"y","10.�:"y","11:"y"<"11.1":"y�,"11.�":&x","11.6:"{","92":"y ,"02.":"y", 15""y&,"16":"y"," 7":"i","18":"�",19":"y"<"20":"{","21":"y","22":"y",":3":"y","24":"y"b�":2y","26":"y","27":"y","28":"y","9":y"},"ioS_saf":{"3.2":"y","4.0-4�1":�y","4.�-4.3":"y","5.0-5.1":�y","6.0-6.1">"i*,"7.0-7.1":&y","8":"y","8.1-:n3":"y"u,"op_miji":{"5.0-8.0":"y"},"android"8{":.1":"y","2.2>"y","2/3":"y"l#2""y","4�:"y","4.1":"y","4.2
"y","37":#y","3(":"y","39":"y","40"8"y"<43":"y","42":"{","43"�"y", 44"8"y"},"safari"{"3�1":"n","3.2�"n","4 2"n"�5":"n","5.1""/","6">"n�<"6.1";&n",7":"n","?.1":"o","8";"y"},"operi":{"9":"n","9.5-9.6":"o","90*0-1 .1":"v",�10.5":"n","10.6":"n"<"11*:"n",11<3":*n","11.5":"n","11.6":"�","12":"n"."121":"y".15"�"y"�"16":"Y","07":"y","q8":"y","192:"y","20":"y","21":"y","22":"y,"�3:"y","24":"y,225":"y",226"2"y","272:"y","38":"y","29"z"�"}-"iOs_saf":"3.2":"N","4.0-<.1�:"n","$.2-.3":"l#,"5.0-5.1":�n","4.0)6�1":"l","7.0-7,1":"n","8":"y�,"8.1-8.3":"y"},2op_m-ni":{"1. -8.0":*n"},"andsoid":{"2.1":"."�"2.2":"n","2.3":"o",23":"x"-"4":"yb,"4.1""y","4.2-4.3":"y","4.4":"}","4.4.3-4.4.4":2x",40">"y"},"b""2r"7"2"n*�21 ":�n"}("ox_mob":"5�":"n,"11";"n"(#�9.5":"n","11nuz"n"."12":"n","�2.1":"y","24":"y"},"and_chr":{"41 :"y"u$"and_ff":{"3�":"y"},"ie_mob";z"10":"n",*!1":"y"},"and_tc">{"9.9"2"u"}},"notes":"",�notes_b{_num":{},"usage_pesc_y":72.15,"usag�_pescaB*7.98,"ucpredix":falSe,"parent":"","ie�words""yttp2","ie_id":"http:"�&chrome_id":#515:5863656v5280"�,"css)repeati.g-gradient3":{"titLa":"CSS Repeatinc Gradients","desc�iption":"Method gf defioing i repeating linear or radiAl color grediend aS a CSS imAge.","ste#":"http:./�wg*w3.or�/TR�css7
{")":"n","9.5
"n&."1 :"n ,"4b:"n",6.1":"n","4.2-4�":"n*,"4.4"�"q',"4.4*3-4.4.4":y","40":"y"}"cb*:{"7�;"~,10":"y"},"op_mb":{*0":n*,"11":&n","11.1*:"n","91.5":".","12":"n","12*1":"n",2<":"y"},"a�d_chr":s*41":"y"},"AnD_ff":z"36":"y"|l"ie[mob":{"10":"a #1","11":"a #!"},"and_uc":{"9.9":"n"}},"n�tes&:"Partial sup0r� ij IE9 rmfers to supporting \"vm\" instead of \"vm�n\".\rn\r\narticl cup@ort"in iOS30is due to$`qee}$behatio2�of the \"vh\" un�t (see [workaround](hdtps://gi{t.Gmthub,bom/dburuchaell/e7p2f445ba9b3g7&f5879+.|�\n�r\n@Lm otjer p`rtial sup`ort rmferw to �ot suppopting the \"vmax\" unit. ","notds_by_num":{}("u3a�e_perc�y":6Y*97�"esageperg^a":13.31�"ucprefix":false"parent":"","Ke{wNrds#:"vm,v�ewport-percentage&,"ie_id";""."chrole_id&:""�>"contentsucuRitypolicy":{"title":"Conpenp [gcurity Policy 1*0�,"dus#ription2:"Miviga�e �ross-site Scriptin� attacks by wjitelisting allowed so5rc%s gf script, style, and oTher resources.","spec";"http:'/www�w3*obc/TB/CSPo","status2:"sr","lijks22[{"url":"http://html5rocks.com/en/tutor�als/securivy/cmntEn�-security-policy/",title2:"JT]L5Rocks artic|a"},{"5rl":#htt`://contdnt-security-policy.coM/","tiple":"�SP8E�amples & Quick Reference"�],"cadegories":Z"Other"],"ctatr":{"ie"8{"5.5�:"n","6":"n","7"*"n","8�:"n"."9":�n","10"*"a #1","11"*a #1","TP":"y"},"f�rmgox :{"2"�"n","3"*"n","3.5":"n","3.6":"n","4":"y #1","5":"{ #1","6"z"y #1","7*:&y 3�j,"(":"y '1","9":"Y 1","1�": x #1,"11:y #1","2:"y #1",*5":"i #1","14":6y #1#."15":#y #1","16":"y #1,"17":"y #1","18""y #1,"19":"y #1","2 ":"s #1","21":"y #1","22":"x #1",23":"y"."24�:"x","25":"y","2�":#y�,"27":"y",08":"y . 29"*"}","30":"y","31"�"i",�32":"y","33"z:y","34":�y","35":�y ,"36":y","37"*"y","2:":"y","39":"y","40`�"y2},"ch2�me"{"4":"n*,"=":"j,6�:"n","7"8"n","8">*n","9":"n",*10":"n","!1":".",#2"2"n","03" n","�4":"y #2","15":�y!#2",16 :"y #2""17&:"y #�*,"18":"y #2","19":y!#2","2�"�" #2"l"2&2"y #2","22":"q #2","23#:"y #2b,"24"�"� #0","25��"y","26":"}","27"2"y"-"8":"y","9"*"y","32":"y","31"8"y","32":"y""3;""i","34":"y"-"35":&y","36":"y","37":"y#�"#(":"y""s9":"�",#4p":"y","41":"q",242:"y,"43":"y","44":"�"m<"safari#:{�3.!":"n",23.2"+"n"("4":"n"<"5":f","5.1">"a !2",">":y #2","6.1 :"} *3", 52"y"&7�1":"y","8�:"q"}, opera"
{"9b:*n""9,-9.6#2"n","1 &0-10.1":"nr,"10.5#:"n","50.6":2n",b11":bn"."11.q":"n,11.m2:"n&,"11#:"n"."12":"n ,"12.1":"z","15":2y2-"16":"y","17":"y","18":"y","19":"y", 20":"y�<"21":"y","22":"y","23":"y","24":"y"(""5";"y"("r6":"y"("37": q",68">"y","29":"y"},"i�s_Saf":{"3.2"�n","4.2-41:"n","4.2-4,3"2"n","5.0-$.5":"a!#2","6*0-6>1""y #2","7.0/7.5":by","�":"y","8/1-8.3�:"y"},"op_mini":{"5.0-8.0":"n"},"andr�id":{"2.1":"nb,"r.3�z"n",&2.3#:"n&,";":"/2,"4":bn","4.�"**n","4.2-4.;#:"n ,"4.5"* y","4.4.3-4.4.4";"y","40":"y�},"bb":�"�":"n"(#1� : y #2"}�"op_mkf":{"1p"8"n","11":"n","11.1":"n","1.5":"n"212":"n",*12.1":"n","24":"y"},"and_chr"j{"41"z"�","an$_ff":{"36":"{"},"ie_�ob":{"10"*"a 3j"11 8"a0k0"q&2afd�Uc":�9":"y"x"�},BOnt`s":"TH� st�nda�l HTT@�waddr�is aCMntunt-Sacurity-Polacx` whicl iS urdd wnless(otherWisg noted,","n/tes_by_num":{"1">"Suqpor4e$ �jrough the `X-Condent-Sec�ritymPolicy` hea�er","2":"Support%d through"tHe `X-Weboit-CSPp`heafer*,"wsage_pmrc_y":76.41,"usagD_repc_a$:10.36,"u�qreGix">balse,"p!rent":�,"oeyworl{":"csp,se�urity,header","ie_ie":"contentse�u2itxpolicy"."ahrome_id":&520508(0458=a584"},*pagevaSibility":{"title:b�age%Vasirility",&descri4tion�:"J��aSc�iPt APK"gor det�rmining wlmther a focu�ent is visible gn the display","sdec":"htdp*//www.73.org/TR/page-visibilktyo","status":"2ec","linkq":[{"ur�":&http{2//de6eloper,mo{iLla.org/en
19":"c x !1"."20:"a � #9","21":"e x #1",*22":"a x��1","23":"a x "1","24":"a x #1","25":"a X #1","26":b� x #1","272:"a X$#1","28�:"a x #1",29":"a x #","30":"a x(31",231"2"a x !1","32":"a x1#1 ,"3":"a x #1"&"34":"a x #9","35";"a x #1",&76":"a } +1","752:"Q x #1","3x#:"a x #1","9">"a x #1"("40":"a � #1"}�"�irOme":{"4"6"f",�5":"n","6"2"n","7":"l"l"8":"n",9":bn2,"10":"n","51"�"n","12:"N","13">"n","14":"~","15":"l","1v":�n","17":"n"$"18":"n","19":"n,"20":"n","292:"a #1","22":"a #1",#23":"a"#1"#24":"a �1","25":"a #1","�6":"a #1","27":2a #1",f28":"i #0�,"29":"c #1",#4":"a 31","31"�"a #1"<"32"�"a0#1","3":"a #1",74":"q"#1","35f:"a #1"�236":"a #1","37":"a �1","38":"a #1",#39":"a #1","40":"a 1",b41":"a`#1",&42":"y","t3":"y","44":"y"},"caferi"2;"s.1":"n",#3.2�b.","$2�"~b,"52j�n",#51":"l*�>":"n","v�� :"a #1",c7 :*` c0"�"?.q":"a #1","8":"a #1"},"opesa":{"9"0"n","9.5-).6":"n",10.0-10.1&:"n","q05 :#n","!0.6":"A x #1","01&:"a x #1","11.1":"a {`#1".�11.5":"a x #�","11.6":"a x #1","12�:�a h #1#,"12.1":a x01","15":"a #1","16":#a #1","07":"a #1","1<":"a #1","19":"a #5"$"21":"a #1","21":"a #1b,"22":"a #9","23":"a #1","24"8a #1","252:"a #1","2v#:"a�#1","26":"� #1","2":"a #1"("29":"y"},��os_scf"*{"3.2":"n","4.0-4.1":"n","4.2-4.3": n","!.0%5.1":"n",26.0-6.1":".",".2-7.1�:"a #1","8�:"a #1","(.1-8.3":2a #1"},"op_mi/i'2{*7.0-8.0"*�a x #1"}("android":{";.1":"n","22":"n",b2.1":"n","3":"n"-"4":"n""4.1":"n",&4&2-4.3":"n","4.4":"` #1#,"..3-4.44":"a #1","40":"a #1"},"bb�:{"7 :"a c1","�0":2a 31#},"o�]mob":{"10"~"n","1!":"a x !5&$"11.1""a x #1","91.5":"! x #1","12":"a x #1","131:"a x #1","2�":"a c�"},"end_chR":{"41"0"e #"}, and_ff":{"36":"a x #1"},"ie_mo"":{"10":#n","11":#n"},"a~d_uc":{"9.9":"n"},"notes":"","notds_by^num":{"1"�"Part�al�refers to supporping$`<intdger>` bwt!nn| `<l%nfth>` values.&},"usaga]purc_y"0.27,"usaGe_perc]e":74�79,"ucprefix":false,"paseft":"","keywo2ds":"tab-sizeltab-wIdth","ie_id":"","c(r�me_id":""},"mutati�nobserwer":{*title"*"
n","22":"n","23":"nb-"2t":"n","25":&n","r6":"n","27 :"n","28":"n","29"*"n","�0": n","1":�n","33 :*n","33":bn-"34&:"n","35":"n","36":"n,"37":"n"<"18":"n","39*:"n*,40":"l�(41":"n","42":"n","43":"~&,"44":"n"},"3cfari":{"3.1":"N","3.22:n","4":�n:,"5":"n&,"5.1":"n�,
6":"n","6.1 : �","7">"n","7*q"�"n","8":"n"},"oper!":{"9":"n","1>5-9.6"2"n","10/0-14.1":"n","10*5"�"n","10.6":"n","1!":"n","11n1&:"n","11.5:"n"."91.6":"f","1"z"n&,"12.1":"n","15":"n","1&":"n",1�":"l#,18":bn","39"22n"-"22":"n","21":"n", 23":"n","23":"o","24""n","25":"n","24":"j","27":"n","28":"n("29":3n"}-"ios_saf"z{"3.2":"n","4.0,4.1":*nb,"4."�4.3#:"~"."1.0-5.1":"n"�"6.4-6.1">"n","7.0=7.1�8"n","8": n","8.1-8.3":"n"},"op_mini":y"5&0-8.02:"! x #2b},"andr�id":{"2.1":"n","2.2":"n",&2.3":"n",�3":"n","4":"n",".1""n",b4.2-4.3":"n","5.4": j"."4.0.3-4.4.4":"~#."40":"n"},"bb":{"�":"n","10":"n"}<"op_mob":{"10":"n","11":"a x`#22,b1.1":"a(x 2","1q.5":"e x #2","12":"i | #2"<"12.�":"a x "R","24"*"n","a.d]bhr":{"41"*"n"�,"aod_nfb:{3�":&n"},"iE_mob"8{"10"z"a x #��,"11":"a X 21"},"anduc":y"9.9":"n"}},"nOtes":""<2nodes_by_num":{"1":"IM only suppoRts the 'width' Qnt 'heigl4 properpims.","2b:"Opera MObi�e anf Opera Miji only stppopt the�'orientation' property."},"usafe_pgra[y":0,"}sage_purc_a"�16.78,"tcprefIx":false,"parentb:"","kexwords&: 6ieuport", ie_id":","c(romEOid"*""|,"tmzt-emphcsis":{"ti�le":"teht-am0(asis wtyling","descr)ption":"MetHod!on using smald symbols next to each glyph to emqhasize a"rul Og text, gomMonly used in East Csicn languagesn The `tept-empiaskq` qhorthand and its atext-Empjqsis-style` cnd `t�xt-emphasis%color` l�ng`ands, can be used(to apply ma2ks(po the!text."The$`text-dmphasis-positionh proPest}, which inhe`i5s!sep`rately,0allkws setting uhe emxhawis(mazks' position with �e�qect tg the textn""specb:"http://www.w3.org/TR/csS-texd-dmcor-7/#texd-%mphasis","stitus":"cr","links":[{"url":"https://github.com/zmmbreeze/jquery.emphasis/","title":"A javascript fallback for CSS3 emphasis mark."}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"n","39":"n","40":"n"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"a x #1","26":"a x #1","27":"a x #1","28":"a x #1","29":"a x #1","30":"a x #1","31":"a x #1","32":"a x #1","33":"a x #1","34":"a x #1","35":"a x #1","36":"a x #1","37":"a x #1","38":"a x #1","39":"a x #1","40":"a x #1","41":"a x #1","42":"a x #1","43":"a x #1","44":"a x #1"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"a x #1","7":"a x #1","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"a x #1","16":"a x #1","17":"a x #1","18":"a x #1","19":"a x #1","20":"a x #1","21":"a x #1","22":"a x #1","23":"a x #1","24":"a x #1","25":"a x #1","26":"a x #1","27":"a x #1","28":"a x #1","29":"a x #1"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"a x #1","4.4.3-4.4.4":"a x #1","40":"a x #1"},"bb":{"7":"n","10":"a x #1"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"a x #1"},"and_chr":{"41":"a x #1"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"a x #1"}},"notes":"Some old webkit browsers (like Chrome 24) support `-webkit-text-emphasis`, but does not support CJK languages and is therefore considered unsupported.","notes_by_num":{"1":"Partial support refers to incorrect support for `-webkit-text-emphasis-position`. These browsers support `over` and `under` as values, but not the added `left` and `right` values required by the spec."},"usage_perc_y":9.21,"usage_perc_a":54.43,"ucprefix":false,"parent":"","keywords":"text-emphasis,text-emphasis-position,text-emphasis-style,text-emphasis-color","ie_id":"","chrome_id":""},"midi":{"title":"Web MIDI API","description":"The Web MIDI API specification defines a means for web developers to enumerate, manipulate and access MIDI devices","spec":"http://webaudio.github.io/web-midi-api/","status":"wd","links":[{"url":"https://github.com/cwilso/WebMIDIAPIShim","title":"Polyfill"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"n","39":"n","40":"n"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"n","39":"n","40":"n","41":"n","42":"n","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"n"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"n"},"and_chr":{"41":"n"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{},"usage_perc_y":0.13,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"","ie_id":"webmidiapi","chrome_id":"4923613069180928"},"canvas-blending":{"title":"Canvas blend modes","description":"Method of defining the effect resulting from overlaying two layers on a Canvas element. ","spec":"http://www.w3.org/TR/compositing-1/#blending","status":"cr","links":[{"url":"http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/","title":"Blog post"}],"categories":["Canvas"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{},"usage_perc_y":70.95,"usage_perc_a":0,"ucprefix":false,"parent":"canvas","keywords":"","ie_id":"compositingandblendingincanvas2d","chrome_id":""},"clipboard":{"title":"Clipboard API","description":"API to provide copy, cut and paste events as well as provide access to the OS clipboard.","spec":"http://www.w3.org/TR/clipboard-apis/","status":"wd","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent","title":"MDN page on ClipboardEvent"},{"url":"https://www.lucidchart.com/techblog/2014/12/02/definitive-guide-copying-pasting-javascript/","title":"Guide on cross-platform clipboard access"}],"categories":["JS API"],"stats":{"ie":{"5.5":"a #1 #2","6":"a #1 #2","7":"a #1 #2","8":"a #1 #2","9":"a #1 #2","10":"a #1 #2","11":"a #1 #2","TP":"a #1 #2"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"a #2 #3","23":"a #2 #3","24":"a #2 #3","25":"a #2 #3","26":"a #2 #3","27":"a #2 #3","28":"a #2 #3","29":"a #2 #3","30":"a #2 #3","31":"a #2 #3","32":"a #2 #3","33":"a #2 #3","34":"a #2 #3","35":"a #2 #3","36":"a #2 #3","37":"a #2 #3","38":"a #2 #3","39":"a #2 #3","40":"a #2 #3"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"a #3","14":"a #3","15":"a #3","16":"a #3","17":"a #3","18":"a #3","19":"a #3","20":"a #3","21":"a #3","22":"a #3","23":"a #3","24":"a #3","25":"a #3","26":"a #3","27":"a #3","28":"a #3","29":"a #3","30":"a #3","31":"a #3","32":"a #3","33":"a #3","34":"a #3","35":"a #3","36":"a #3","37":"a #3","38":"a #3","39":"a #3","40":"a #3","41":"a #3","42":"a #3","43":"y","44":"y"},"safari":{"3.1":"u","3.2":"u","4":"a #2 #3","5":"a #2 #3","5.1":"a #2 #3","6":"a #2 #3","6.1":"a #2 #3","7":"a #2 #3","7.1":"a #2 #3","8":"a #2 #3"},"opera":{"9":"u","9.5-9.6":"u","10.0-10.1":"u","10.5":"u","10.6":"u","11":"u","11.1":"u","11.5":"u","11.6":"u","12":"u","12.1":"u","15":"a #3","16":"a #3","17":"a #3","18":"a #3","19":"a #3","20":"a #3","21":"a #3","22":"a #3","23":"a #3","24":"a #3","25":"a #3","26":"a #3","27":"a #3","28":"a #3","29":"a #3"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"u","6.0-6.1":"u","7.0-7.1":"u","8":"u","8.1-8.3":"u"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"u","4.4.3-4.4.4":"u","40":"u"},"bb":{"7":"u","10":"u"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"u"},"and_chr":{"41":"u"},"and_ff":{"36":"u"},"ie_mob":{"10":"u","11":"u"},"and_uc":{"9.9":"u"}},"notes":"Internet Explorer will display a security prompt for access to the OS clipboard.\r\n\r\nChrome 42+ and Opera 29+ support clipboard reading/writing only when part of a user action (click, keydown, etc)\r\n\r\nFirefox users [can enable support](https://developer.mozilla.org/en-US/docs/Midas/Security_preferences) with a security preference setting.","notes_by_num":{"1":"Only supports `Text` and `URL` data types and uses [a non-standard method](http://msdn.microsoft.com/en-us/library/ie/ms535220%28v=vs.85%29.aspx) of interacting with the clipboard.","2":"Only fires `copy` event on a valid selection and only `cut` and `paste` in focused editable fields.","3":"Only supports OS clipboard reading/writing via shortcut keys, not through `document.execCommand()`."},"usage_perc_y":0.13,"usage_perc_a":63.71,"ucprefix":false,"parent":"","keywords":"cut,copy,paste,clipboarddata","ie_id":"clipboardapi","chrome_id":""},"rtcpeerconnection":{"title":"WebRTC Peer-to-peer connections","description":"Method of allowing two users to communicate directly, browser to browser using the RTCPeerConnection API.","spec":"http://www.w3.org/TR/webrtc/#peer-to-peer-connections","status":"wd","links":[{"url":"http://www.webrtc.org/","title":"WebRTC Project site"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x","30":"y x","31":"y x","32":"y x","33":"y x","34":"y x","35":"y x","36":"y x","37":"y x","38":"y x","39":"y x","40":"y x"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x","30":"y x","31":"y x","32":"y x","33":"y x","34":"y x","35":"y x","36":"y x","37":"y x","38":"y x","39":"y x","40":"y x","41":"y x","42":"y x","43":"y x","44":"y x"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"y x"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y x"},"and_chr":{"41":"y x"},"and_ff":{"36":"y x"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"BlackBerry 10 recognizes RTCPeerConnection but real support is unconfirmed.","notes_by_num":{},"usage_perc_y":57.36,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"","ie_id":"webrtcwebrtcv10api","chrome_id":"6612462929444864"},"css3-cursors":{"title":"CSS3 Cursors (original values)","description":"CSS3 cursor values added in the 2004 spec, including none, context-menu, cell, vertical-text, alias, copy, no-drop, not-allowed, nesw-resize, nwse-resize, col-resize, row-resize and all-scroll. ","spec":"http://www.w3.org/TR/css3-ui/#cursor","status":"wd","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor","title":"MDN Documentation"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"a","6":"a","7":"a","8":"a","9":"y","10":"y","11":"y","TP":"y"},"firefox":{"2":"a","3":"a","3.5":"a","3.6":"a","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"a","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"a","3.2":"a","4":"a","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"a","9.5-9.6":"a","10.0-10.1":"a","10.5":"a","10.6":"a","11":"a","11.1":"a","11.5":"a","11.6":"a","12":"a","12.1":"a","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"n"},"bb":{"7":"n","10":"u"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"n"},"and_chr":{"41":"n"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"Partial support in IE refers to no support for the alias, cell, copy, ew-resize, ns-resize, nesw-resize, nwse-resize or context-menu cursors. Opera 12.10- does not support 'none' or a URI.","notes_by_num":{},"usage_perc_y":61.97,"usage_perc_a":3.09,"ucprefix":false,"parent":"","keywords":"cursors, pointers","ie_id":"","chrome_id":""},"css3-cursors-newer":{"title":"CSS3 Cursors (new values)","description":"Support for `zoom-in` and `zoom-out` values for the CSS3 `cursor` property.","spec":"http://www.w3.org/TR/css3-ui/#cursor","status":"wd","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor","title":"MDN Documentation"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"y x","3":"y x","3.5":"y x","3.6":"y x","4":"y x","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y x","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x","30":"y x","31":"y x","32":"y x","33":"y x","34":"y x","35":"y x","36":"y x","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"y x","3.2":"y x","4":"y x","5":"y x","5.1":"y x","6":"y x","6.1":"y x","7":"y x","7.1":"y x","8":"y x"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"y","12":"y","12.1":"y","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"n"},"bb":{"7":"y x","10":"y x"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"n"},"and_chr":{"41":"n"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"Chrome, Safari and Firefox also support the unofficial `grab` and `grabbing` values (with prefix)","notes_by_num":{},"usage_perc_y":51.62,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"cursors, pointers","ie_id":"","chrome_id":""},"webvtt":{"title":"WebVTT - Web Video Text Tracks","description":"Format for marking up text captions for multimedia resources.","spec":"http://dev.w3.org/html5/webvtt/","status":"unoff","links":[{"url":"http://www.html5rocks.com/en/tutorials/track/basics/","title":"Getting Started With the Track Element"},{"url":"https://dev.opera.com/articles/view/an-introduction-to-webvtt-and-track/","title":"An Introduction to WebVTT and track"}],"categories":["Other"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n d","25":"n d","26":"n d","27":"n d","28":"n d","29":"n d","30":"n d","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"n","10":"y"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"y"},"and_uc":{"9.9":"n"}},"notes":"WebVTT must be used with the <track> element.\r\n\r\nFirefox currently lacks support for the ::cue pseudo-element.","notes_by_num":{},"usage_perc_y":80.69,"usage_perc_a":0,"ucprefix":false,"parent":"video","keywords":"captions,track","ie_id":"","chrome_id":"6719115557339136"},"promises":{"title":"Promises","description":"A promise represents the eventual result of an asynchronous operation.","spec":"https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects","status":"other","links":[{"url":"http://promises-aplus.github.io/promises-spec/","title":"Promises/A+ spec"},{"url":"http://www.chromestatus.com/features/5681726336532480","title":"Chromium dashboard - ES6 Promises"},{"url":"http://www.html5rocks.com/en/tutorials/es6/promises/","title":"JavaScript Promises: There and back again - HTML5 Rocks"},{"url":"https://github.com/jakearchibald/ES6-Promises","title":"A polyfill for ES6-style Promises"}],"categories":["JS API"],"stats":{"ie":{"5.5":"p","6":"p","7":"p","8":"p","9":"p","10":"p","11":"p","TP":"y"},"firefox":{"2":"p","3":"p","3.5":"p","3.6":"p","4":"p","5":"p","6":"p","7":"p","8":"p","9":"p","10":"p","11":"p","12":"p","13":"p","14":"p","15":"p","16":"p","17":"p","18":"p","19":"p","20":"p","21":"p","22":"p","23":"p","24":"p","25":"p","26":"p","27":"a","28":"a","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"p","5":"p","6":"p","7":"p","8":"p","9":"p","10":"p","11":"p","12":"p","13":"p","14":"p","15":"p","16":"p","17":"p","18":"p","19":"p","20":"p","21":"p","22":"p","23":"p","24":"p","25":"p","26":"p","27":"p","28":"p","29":"p","30":"p","31":"p","32":"a","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"p","3.2":"p","4":"p","5":"p","5.1":"p","6":"p","6.1":"p","7":"p","7.1":"y","8":"y"},"opera":{"9":"p","9.5-9.6":"p","10.0-10.1":"p","10.5":"p","10.6":"p","11":"p","11.1":"p","11.5":"p","11.6":"p","12":"p","12.1":"p","15":"p","16":"p","17":"p","18":"p","19":"a","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"p","4.0-4.1":"p","4.2-4.3":"p","5.0-5.1":"p","6.0-6.1":"p","7.0-7.1":"p","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"p"},"android":{"2.1":"p","2.2":"p","2.3":"p","3":"p","4":"p","4.1":"p","4.2-4.3":"p","4.4":"p","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"p","10":"p"},"op_mob":{"10":"p","11":"p","11.1":"p","11.5":"p","12":"p","12.1":"p","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"p","11":"p"},"and_uc":{"9.9":"p"}},"notes":"","notes_by_num":{},"usage_perc_y":64.75,"usage_perc_a":0.25,"ucprefix":false,"parent":"","keywords":"futures","ie_id":"","chrome_id":"5681726336532480"},"css-sticky":{"title":"CSS position:sticky","description":"Keeps elements positioned as \"fixed\" or \"relative\" depending on how it appears in the viewport. As a result the element is \"stuck\" when necessary while scrolling.","spec":"http://dev.w3.org/csswg/css-position/#sticky-positioning","status":"unoff","links":[{"url":"http://updates.html5rocks.com/2012/08/Stick-your-landings-position-sticky-lands-in-WebKit","title":"HTML5Rocks"},{"url":"https://developer.mozilla.org/en-US/docs/Web/CSS/position","title":"MDN article"},{"url":"http://docs.webplatform.org/wiki/css/properties/position","title":"WebPlatform Docs"},{"url":"https://github.com/filamentgroup/fixed-sticky","title":"Polyfill"},{"url":"https://github.com/wilddeer/stickyfill","title":"Another polyfill"}],"categories":["CSS"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n d #1","27":"n d #1","28":"n d #1","29":"n d #1","30":"n d #1","31":"n d #1","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n d #2","24":"n d #2","25":"n d #2","26":"n d #2","27":"n d #2","28":"n d #2","29":"n d #2","30":"n d #2","31":"n d #2","32":"n d #2","33":"n d #2","34":"n d #2","35":"n d #2","36":"n d #2","37":"n","38":"n","39":"n","40":"n","41":"n","42":"n","43":"n","44":"n"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"y x","7":"y x","7.1":"y x","8":"y x"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"y x","7.0-7.1":"y x","8":"y x","8.1-8.3":"y x"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"n"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"n"},"and_chr":{"41":"n"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Can be enabled in Firefox by setting the about:config preference layout.css.sticky.enabled to true","2":"Enabled in Chrome through the \"experimental Web Platform features\" flag in chrome://flags"},"usage_perc_y":20.74,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"","ie_id":"positionsticky","chrome_id":"6190250464378880"},"dialog":{"title":"Dialog element","description":"Method of easily creating custom dialog boxes to display to the user with modal or non-modal options. Also includes a `::backdrop` pseudo-element for behind the element.","spec":"https://html.spec.whatwg.org/multipage/forms.html#the-dialog-element","status":"ls","links":[{"url":"https://github.com/GoogleChrome/dialog-polyfill","title":"Polyfill"}],"categories":["DOM","HTML5"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"u","39":"u","40":"u"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n d #1","33":"n d #1","34":"n d #1","35":"n d #1","36":"n d #1","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n d #2","20":"n d #2","21":"n d #2","22":"n d #2","23":"n d #2","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"y"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Enabled through the \"Experimental Web Platform features\" flag in `chrome://flags`","2":"Enabled through the \"Experimental Web Platform features\" flag in `opera://flags`"},"usage_perc_y":42.59,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"HTMLDialogElement,showModal,backdrop","ie_id":"dialogelementformodals","chrome_id":"5770237022568448"},"css-variables":{"title":"CSS Variables","description":"Permits the declaration and usage of cascading variables in stylesheets.","spec":"http://www.w3.org/TR/css-variables/","status":"wd","links":[{"url":"https://hacks.mozilla.org/2013/12/css-variables-in-firefox-nightly/","title":"Mozilla hacks article (older syntax)"},{"url":"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables","title":"MDN article"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"n","39":"n","40":"n","41":"n","42":"u","43":"u","44":"u"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"u","29":"u"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"n"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"n"},"and_chr":{"41":"n"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{},"usage_perc_y":11.14,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"css variables","ie_id":"cssvariables","chrome_id":"6401356696911872"},"vibration":{"title":"Vibration API","description":"Method to access the vibration mechanism of the hosting device.","spec":"http://www.w3.org/TR/vibration/","status":"rec","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/Guide/API/Vibration","title":"MDN article"},{"url":"http://davidwalsh.name/vibration-api","title":"Vibration API sample code & demo"},{"url":"http://code.tutsplus.com/tutorials/html5-vibration-api--mobile-22585","title":"Tuts+ article"},{"url":"http://aurelio.audero.it/demo/vibration-api-demo.html","title":"Demo"},{"url":"http://www.illyism.com/journal/vibration-api","title":"Article and Usage Examples"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"n","10":"y"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"y"}},"notes":"","notes_by_num":{},"usage_perc_y":65.27,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"vibration,mobile,device","ie_id":"vibrationapi","chrome_id":"5698768766763008"},"sSs-racjgroUldblendmode""t)tle":"CSS backgroul`)blMnd,modeb,"dercription":"Allows jlending(Redweun CSS background im!ges, gradients� and"colors."�cpeC":"htv`://www.w3.orw/TR/composhting
5":"n""5.1�:"~","6":"o ,"6.1>&n*,"7":"n","7.1": a #1","8":"a �1&u�"opera":{"9":"n2,"9.5-9.6":"l*,"10.0-50,1":"n","10.5":"n","16":"n",�11 :"n","11.1#:"l","11.5":"n","11.6":"n"< 12":"n","121":"n ,"15":"n,"16":"n","17":"n"$"18";"n","19": n""20":"n","21":"n",�22":"y","23":"y","24"2"y","2=":"y","26":(�","27":"y�,"28":"y�,"29":"y"},"Ios_saf":{".2b:"n&,"4.0-4.1":"n","6.2-4.3":"n","5.8m5.1":"n","v.0-6.1":bn""7.0
:"y","24":"y","05":"y","26":"y"("67":"y",""8":"y","29":"y"},"i�s_saf:{"3.2":"y","4.0-4.1":"y"("4,2-4.3":"y","5.0,5.12:"y","6.0-6.1":"x","7.0-7.1":"y�,"8"2by#,"9.1-8.3:#y"},"op_mini":{"5n0-8.0":"{�},"androyd":{"2.1":"y","2.2:"y","2.s":"y","3"�"y","4":"y","t.1"z�y","4.2-4.3":"y","4.0":"y","4.4.3,0.4.4":"y","40":&y"],"bb":{"7":�x","10":"y"},"op_�ob":{10": y","31":"y","11.1b:2y","11.5":"y","12""y","12.1":y","24":"x"},"ant_chr":{"41":"y"]-"and_ff":{"36":"y"},ie_mob">{"!0":"y","�":"y"}�"and_uc :{"8.9":"y"}},"notes :"","nnues_by_num�:},busage_per#_q":84.74,"usage_perc_a":0,"ucprefix#:falsg,"parent":"","keyvords":"dom,domready,ofload,conteNtlocded,�ocumenp","ie_id":"","ghrome_id":""},"proxiMity":{"title":"Proyimity API","description":"Definec eveJts vhat"provid% information about the distance �etwEen a �evige cnd an o2ject, as measured by a proximitysenvor.","spec":"http:-/www.w1.or�/TR/proximity/","statuw":"cr","dinks":[{"url":"(ttp8//aurelio>auDero.i4/demo/proximityeapi-demo.dtml","title":"Demo"},s"url":"http>//uww.sita�oint.com/introducyjg-proximity-api/","title":"SitePoint arvicle"}],"categories":K"JS AP"],�s�qts"8z"ie"?{"5.5":"n"�6*: nl"7":"n","":"n",:9#:"n&<"10b:"n#,"�1":3n","VP":*n},`fibugoX":"2 :"f","3":"n","3.5":"n","3.6":"n", 4":"n","5":"n","6":"n"("7&*"n","0":"n","9":"n","10":"n","11">"n",12":"o","03 :"n","14":"n",*15":"y","1�":"y","17":"y","18":"y","19": y",""0":#y"$"21":"y","22:"y","23":"y","2�":"y",25":"y","26":2y","27":"y","28":"q","29":"i","30":"y","31":by","!2":"y","33":"y","34":"y","35":"y",236":"y","#7":"y"("38"8"y","39":"y","40":"y"}$"chrome":{"4":"n","5":"n","6">"n","7":"n","8":"n",b9":"n","10":"n"("11":"n","12":"."("13":"n","14":"N",*15":"n","16�:"n","172:"n","18":"n","19":"n"$"20":"n","21":"n","22":"�","23":"n","64":"n","25":"n","26":"n","27":"n","28":"~""29":"n",*30b:"n","31"z"n",(32":"n","33":"nb,"34":"n*,"35"�"n2,"26":"j","37":"n","38":"n#, 39":"n","40":"n","41":"n","62":"n","4�":"n2,#<4""f�y,"safari":{"3.1":"n",*3.2":"n("4":"n","5": n","%.1":"f","6":"n","7.1":"n","'":"o""7.1":"n"."8":"n"},"opera":y&1":"n","9.5-9.6":"N", 10.0-10.1":"n""10.5":"n"("10.6":"n","1�":"n","�1,0":"n","11.5#:"n","11.6":"n","12":"n""12.1 :"n*,"15":"n","16":"n",�17":"n","18":"n","1�":"n","20":"n","21"82n","22":"n","23":"n ,"24"*"�".�5:"n","26":"j","27""n","28:"n","29":"n"y,"ios]saf":�"3.2":"n2,"4.0-t.1":"n"�"$>2/u.3":"n","5.0-5.9";"�","6&1-v.1":"n","7.0-7.1b"n",#:":"n","8.1-8.3":"n"u,"op_mini":{"5.0-8.p":"n"},"andrg�d":{"2.1b:n�,�2.2":"n","3,3":"n","3":"n ,"4":"n ,"4.1":"n","4.2�4.3":"n","<.4*:"n","5.4.3-4n0.4":"n","40":"n"},"bb":{"5"2"n"�"10":"n"}<"op_mb"z{"10":"n","11":"l","11.1":"n","11.5":"n","1"":"n","12.1":"n","24"zbn"},"and_bhr&:{�41":"n"},"and_ff":{"36":"y"}="ie_mob :{"10:"n","11::"n"},"and_uc":;"9.9":"N"}},"nmtes":" -"~ot�s_bx_Num":{=,"usage_perc_y":12,"usaga_perb_a"80,"ecprefix":false,"parent "","keyworDsb:"","ie_id":"","chrome_ad":""},2ker~ing-pairs-ligatures":{"ta1le":"Amproved kerniNg pairs & ligatuz%s","descriptiMn :"Cur2%ntly non-standard mephkt of improvife kerning pairs & liwatures usino text-rendering: optiMizeLegirimity.","spec:*htt0://www,w3.-rg/TB/SVG11/painting.�tml#textREndezingProperty"�"status":"unoff","links":[{2url":"https:./deteloper.mozilla.orgen-US/docs/Web/cSS/text-renddbing","tidle":"MDN0articleb},{"5rl":"`ttp:+/css%tricks.com/a,manac/properties/t/text-rendering/","title"~"CSC Tbickw artmcle"}], categories":["CSS"],"ctavs":{"ie";{*5.5":"n","v":bn",�7":"n","8":"n*,"9":"n","10":"f"$"11":"n",2TP":"f"}$"f�refOx":{"2":"n","3":&y","3.5">"y","3.6":"y","4":"y","5":"y","6":"y","7":y","8":"y","9"8"y","10&:"y","11":*y", 12":"y","13":"y ,"14":"y","152:"y ,"16":"y","17b:"y","18":"y","19":"y","20":"y","21":"y",2":"y","23":"y","24""x","25":"y","26":"y","27":"y ,�68":�{","29"2"y","30":"y","3q":"q","32":"y","33":"y,"34":"y","35":"y ,"36":"y",&37":*y","38":"y","39""y"/"40":"y"}("chrome":{"4"2"}","5 :"y","6":"y","7":*y","8":"}","�":"y","10":"y ,"11":"y","12":"y"$"13#�"y",#14":"�",�15":"y","16":#y",b17"�"i","18":"y",b19":"y","20:by","31":"y�("22"2"y","23":"y","2""y*,"25:"x","36":"y","27":"y"l"28":"y","29":"y","202:"y","31":"y","32�:"y","33":"y","34":"y","35:"y"l�36";"y","37"8"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":y","44":"y"},�rafari":{"3.1":"n","3.2":"n","4"8"n","5":"y","5.1":cy","62:"y", 6.1";"yb,"7":"p",71":#y","8"�"y"m,"para":{"9":"n","9.5-;.6�:"n""10*0-0�1":"n*,"10.�":"n*,"10."0"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n"-"94":"y,"16":"y","1>":"y","18*:"y","19":"y","20":"y","20":"y"("22"�"y","23":"y","24":"y","25":"y","26":"y","27":"y","38":"y",229";"y"}, ios_saf":{"3.2":"u"$"4.0-4.1":"u",*4.2-$.3":"y""5.0-5.1:"y","6.0/6.1b:"y",*7.0-7.1":"y","8":"","8.1-:.3":"y"},"op_)ini":{"5.0-8.0":"n"},"android";{"21":"n","2.2*:"n","2.3&:"n","3":"y","4":"y",4.1"�"y","<.2-4.3":"y,"4.4":"y","4.4.7
cgi?id=631218", title "Bug!gn Firefnx$support"}],�catwgories":["HTML5"],"stats":{"ieb:{"5.5":&n","6""n","7":*L","8":"n","�#z"n","10":"n ,"11":"N","T":"n"},"fizefox#:{"2"8"n"$"3":"n","3.4":"j"$"3.6":"n","4":&n,"5":"n","6":"n�"7""n","8":"n","9#:&n","10":"n","11":"n",b1"":n","13":"n","14":"n","15":�n",�16b:"n","17":"n�,�18":"n","1;":"n","20":"n","21":"n","22*:"n","23""n",224":"n","25":"n",b26":&n","27":"n","28":"n","29":"n""30":"n","31":"n","32":"n","33":"n","34":"n2,"35":"o",*3�":"n","37":"n ,"38":"u","39":"u","4p":&u"},"chrome"*{"4"8"n","52:"n",6""nb,"7":"n","8":*n ,"9":"n","10":"n","11*:"n","12":"n","13":"n","14"*bn","15":"n","16";"�","17�:"n"�#18":"n",219":"n","20":"n d","21":�n d#,"2;2:"n d&,"23":"n d","24":"n d","25":"n d","26":"n d","27":"n","28":"n"$"39":"n","30":�n",#31"�"n","32b:"n","33":&n"."36":"n","35":"n","26:"n","37":"n", 38":"n",39 >"n", 40":"n","41":"n","42"�"U","43":"u","45":"u"},"safari":{"3.1 :"n",";.2">"n","4":"n","5":"n","5.1":"n","�":"n",�6.1":"n2,"7":"n","7.5"�n","8":"n"},"opera":{"9":"n","9.--9n6":�n",&10.0-14.1":�n"."50.5":"n","10.6b:"n","11":"n","11.1 : n"l 11.5":"n","11.6"z"n","10":"n","12>1":"j ,"1�":"n","16":"n","17#:"n"$"18":"n","19"�"n","20":"n"<"21":"n�,"22":"n", 23"""N&,"24";"nb,"25":"n","26":"n","27 :"n",*28":"u","�9":"u"�,"ioq_saf":{"7.2":"n","4*0-4.ab:"n","4.2-4.3":"n,"5.1-5.1":#n","6.0->.0":"n"$"7.0-7.1":bn",&8":"n","8.1-8.7"�"l"},*op_mini":{*5.0/8.�":"n"},aldrgid":{"2.1":"n",""*2":"n","2.3":"n","3":"n","4":"n",#4.1":"n","4.2-4.3":"n","4&4":"n","4.4.3-4.4.4">"n","40":#n"},"bb":{7":"n","10:"n"},"op_mob"2{"10":"n"$"11":"n","11.1": n","11.5":"n","12":"n","12.5":"n","24*:"n"},and_chr":{"41":"n"},"and_ff":{"362:"n"}$"ie_mob*:{"10"z"n ,"11":"n","a�d_uc:{"9.9":"y"}}�"notes":Chrome 20-26 had partma| support behind a fl�g,"thotgh 4his was Zlater removed](httP://crbug.com/229421). \b^nLr\nSafari 7 (& iOQ 7 Safari) hides the "order of seamless iframus and recogni~ec the 'seamles{' DOM property, But0does`n�t provide ac6eal suppoz4,"-"ndes_by_num":{}."usage_p%rc_y":4.25,"usage_perc_a":0,"ubprefix":false,*pazent2*"&,"ke�words":"","ie_id":"iframeseam�es�`ptribute","chrom%_id":"6630329993396224"},"css-image-orie�t`tion":{"titlE"z"CSS3 image-Krientation","duscriqtion":"SS property used generallx to fix the i?tended orientAtion of an image& This can be done using 90 degree"insrem%nts �r b�sed on thu im�oe's$EXIF dada }sing the ]"fr/emimage\" value.","speC":"�ttpz//www.w3.orgoTR/css3-images/#image/osientetion","status":�sr","links":[{"url":"htdps:/.developgr.mo{inla>ovg/en-US/docs/WgrBSS/�mage-orientation-"tmdle"�"MDN"artmcle"}l{"url":"http>//sethfovler.'rf/blog/2013/09/13/new-in
n&,"22""�",�23":"n�,"24 :"n"$"25":"n","26":�n","23":"n","28":"n","29":&n"},"ios_sa&":{"3.2":"a ,"4.0-4.1":"a"l"4.:-.3":"!","5.0-5.1":"a",&6.0-6.":"a""7.4-7.1":"a","8&:"a","8.1-8.1":"a"},"op_mini":{"5.0-8.0":"n"},"a�droid":{"2.1":"n","2.2":"n","2.3":"n",&3":"n","0":"n"("4.1":"n","4.2-4.3":#n","4.4":"n"$"44&3-4.4.4":"n",$40":"n"},"bb":{"�*:bn","!0":"�"},"op_mb":{"10�"j"-"11": n","11.1":n",11.5":"n$,"12":n","12.1":n","26":"n"},"andOcjr":{"41":"n#|,"and_ff":{ 36":"y"},&iemob"*{"10b:"o&,"11":"n"},#an`�5c":;"9.9":"n"}}("n/tes":"Partial support in iOS refers to tle browser usinf EXIF data by �efeult, thgugh it!does no4 actu�lly suprort the property& �pening"the imag% in a new tab in Chrome results in`the imaoe sxown in tle �rientation accordio' |m the EXIF datc.","notes_by_.um":{},"usage_perc_y":11.52,"usage_perc^q":7.8?,"ucprefix":false,"parent":","keyWords&:"image-nrientation,from-image,flkp","Ie_id":"","chrome_Id":""},�pictuve":{"title":"icture e�emenu","deqbription"z*A rgsponsive images mmth�d to control wiiah im�ge resource a user agent presentS to a use2, based nn resolttion,"m�dia quary and/g2 supposd for a partiaular image formau&,2sPec:"https://html.spec.whaTwg.org-multipage/embgdded-#ontent.html#the5pictura-elemeft","suatus:"ls","linis":[{"upl":"(tvp://respojsiveimages.org/demos/",btitle":"Ddio"},{"url"*"http://code.uutsrlus.cgm/tutorials/better-responsive-images-With-tha-pycTure-elament--neu-36583","title":"TUtorial"},{"url"2"`Ttp:/+uSecaqes.responqiveimagms.or'/","tktle""Rea$ abOut the use�cases"},{"url":"http:�/responsiveimages./rg/","tmtle"�"Ggneril infnrmatioj arout Rdsponsive ImAges#}({"url":"https://dev.operq.soo/articles/z�sp/nsive-imagas/","title":"Blog post on sage"},{"url":"http://www.html5rocks.cmm/tutorials/responsive.picdure-elemEnt/","titn�"2"HTML5 Rocks tuTorial"}{"url":"http�://github.sm}/3cottjehl/picturefill","title":"Picturefill - plyfill fnr 0ibtwre, srcset, s�zms, an� more"}],"categries":["DOM","HTML5"],"stats":{"ie":y"5.&:bn","6":"n","7"2".","8""n""9"�"n","10":#o","1":"n","TP#:#n"},"firefox":k"2":"n2,"3&:�n","3.":"n"<#3.6":"n",b4":"nb,"5": n",b6"8"n","7":"n","8":"n","8":"n","10":"f","11":*n","12":"n","!3":"j","14":"n"�"5":"n","17b:"n","17":bn",*18":"n","19":"n"<"0":"n","21":"n",""2":"n","23b:"~","24"::n*,"25":"n","26":"n","27":"n"("28":"n"-"29":"n","30":"n","31":"n","32":"n","33&�"l","34":"o d"+3","35&:"n d #3","36":"n d #3",*37";"n d0#3",�38":"y","39":"y""40":"y"},"chrome"z{"4�:"n","5":"n",*6":"n"<"7":"n","":"n",")":"nc("00":"N#,"11b:"~","12":"n","!3":"n","14":"n","15":"n","16":"n#"17":"n","18":"n","19":#n","20":"n","21":"n","222:"n","23":"n","24":"o","25":"n2,"262:"n","2'":"n","28":"n","29":"N""20";"n","33":"n","32":"n#,"33":"n","34":"n","34":"n","6":"n",##7":"o d #1#,"38**"y","3=":"y2,"40""9","41":"q","�2":�q","<3":"y","44":"y"]."s!fari"k".1"8"n","3.":"n","4":"n","u�:"f","5.1":"n","6":"n","6.1"z"N,"7":"n","7.1":�Nb,"9";"n"},"opera":{"9":"n#-"9.5-9.6":"n"�"10.0-00.1":"n"-#10.5":"n","10.6":"v",211":"N","11.5":"n","11.5":"n","11.6":"n $"12":"n�,"12. :"n","15"*"j","6":"n","17":"n","18 :"n",*19":"n","20":"n".213:"n"$"2":2n","23":"n","24":"n � #2","25�2"y","26 :"y","27":"y","28"�"y"."2":"y"},"ios_s�f":{"3.2": n","4.0-4.1":"n","$.2-4.3";"nb,"5.0-5.1"z*n","6.0�6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"f&},"ot_mini":{"5.0-8.0":"n"},"anlroif":{"2.1":"l","2.2":"~"l�2."":"n"l"3#:"n",#4":"j�,24.1":"n","4.2�4.3":"j","4.4":"n","4..3-4.6.4":"o","40":"y"},#bb":{�7":"n","10":"n"},"op_mkb":{"12":"n","19"2"n","11.1"*"n","11.5":"n"$"12":"n","12.1":"n#,"24":"N"}, and_chr"2{"41 :bi"},"and_ff":{"36"�"n"},"ie_mob":{ 10":"n","q1":"n"},"and_uc#:{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Enabled in Chrome through the \"experimental Web Platform features\" flag in chrome://flags","2":"Enabled in Opera through the \"experimental Web Platform features\" flag in opera://flags","3":"Enabled in Firefox by setting the about:config preference dom.image.picture.enable to true"},"usage_perc_y":41.55,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"<picture>","ie_id":"pictureelement","chrome_id":"5910974510923776"},"woff2":{"title":"WOFF 2.0 - Web Open Font Format","description":"TrueType/OpenType font that provides better compression than WOFF 1.0.","spec":"http://www.w3.org/TR/WOFF2/","status":"wd","links":[{"url":"https://gist.github.com/sergejmueller/cf6b4f2133bcb3e2f64a","title":"Basics about WOFF 2.0"},{"url":"http://everythingfonts.com/ttf-to-woff2","title":"WOFF 2.0 converter"}],"categories":["Other"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n d #1","36":"n d #1","37":"n d #1","38":"n d #1","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"y"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Default 'enabled' for Firefox Developer Edition and Nightly, but Beta and Release versions will need to set a flag to 'true' to [use WOFF2](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face#Browser_compatibility)."},"usage_perc_y":43.46,"usage_perc_a":0,"ucprefix":false,"parent":"fontface","keywords":"woff, fontface, webfonts","ie_id":"wofffileformat20","chrome_id":"6718644721549312"},"text-size-adjust":{"title":"CSS text-size-adjust","description":"On mobile devices, the text-size-adjust CSS property allows Web authors to control if and how the text-inflating algorithm is applied to the textual content of the element it is applied to.","spec":"http://dev.w3.org/csswg/css-size-adjust/","status":"wd","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust","title":"MDN Docs"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"n","39":"n","40":"n"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"n","39":"n","40":"n","41":"n","42":"n","43":"n","44":"n"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"y x","6.0-6.1":"y x","7.0-7.1":"y x","8":"y x","8.1-8.3":"y x"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"n"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"n"},"and_chr":{"41":"n"},"and_ff":{"36":"y x"},"ie_mob":{"10":"y x","11":"y x"},"and_uc":{"9.9":"y x"}},"notes":"","notes_by_num":{},"usage_perc_y":12.17,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":""},"web-animation":{"title":"Web Animations API","description":"Lets you create animations that are run in the browser and as well as inspect and manipulate animations created through declarative means like CSS.","spec":"http://w3c.github.io/web-animations/","status":"wd","links":[{"url":"http://updates.html5rocks.com/2014/05/Web-Animations---element-animate-is-now-in-Chrome-36","title":"HTML5 Rocks"},{"url":"http://updates.html5rocks.com/2013/12/New-Web-Animations-engine-in-Blink-drives-CSS-Animations-Transitions","title":"HTML5 Rocks"},{"url":"https://birtles.github.io/areweanimatedyet/","title":"Current Firefox status"}],"categories":["DOM","JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"a d #3","34":"a d #3","35":"a d #3","36":"a d #3","37":"a d #3","38":"a d #3","39":"a d #3","40":"a d #3"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"a #1","37":"a #1","38":"a #1","39":"a #2","40":"a #2","41":"a #2","42":"a #2","43":"a #2","44":"a #2"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"a #1","24":"a #1","25":"a #1","26":"a #2","27":"a #2","28":"a #2","29":"a #2"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"a #1"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"a #1"},"and_chr":{"41":"a #1"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Partial support refers to basic support of `element.animate()`","2":"Partial support refers to basic support of `element.animate()` and [playback control of AnimationPlayer](https://www.chromestatus.com/features/5633748733263872)","3":"Partial support in Firefox is detailed in [Are we animated yet?](https://birtles.github.io/areweanimatedyet/)"},"usage_perc_y":0,"usage_perc_a":53.33,"ucprefix":false,"parent":"","keywords":"animate,play,pause,reverse,finish,currentTime,startTime,playbackRate,playState","ie_id":"webanimationsjavascriptapi","chrome_id":"4854343836631040,5633748733263872"},"resource-timing":{"title":"Resource Timing","description":"Method to help web developers to collect complete timing information related to resources on a document.","spec":"http://www.w3.org/TR/resource-timing/","status":"cr","links":[{"url":"http://aurelio.audero.it/demo/resource-timing-api-demo.html","title":"Demo"},{"url":"http://googledevelopers.blogspot.com/2013/12/measuring-network-performance-with.html","title":"Blog post"},{"url":"http://www.sitepoint.com/introduction-resource-timing-api/","title":"SitePoint article"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n d #1","32":"n d #1","33":"n d #1","34":"n d #1","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"n"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Can be enabled in Firefox using the dom.enable_resource_timing flag"},"usage_perc_y":68.69,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"performance,testing,resource","ie_id":"resourcetimingapi","chrome_id":"5796350423728128"},"custom-elements":{"title":"Custom Elements","description":"Method of defining and using new types of DOM elements in a document.","spec":"http://www.w3.org/TR/custom-elements/","status":"wd","links":[{"url":"http://w3c.github.io/webcomponents/spec/custom/","title":"W3C Editor's Draft spec (closer to current implementations)"},{"url":"http://www.polymer-project.org/platform/custom-elements.html","title":"Polymer project (polyfill & web components framework)"},{"url":"http://www.html5rocks.com/tutorials/webcomponents/customelements/","title":"HTML5Rocks - Custom Elements: defining new elements in HTML"},{"url":"https://code.google.com/p/chromium/issues/detail?id=234509","title":"Chromium tracking bug: Implement Custom Elements"},{"url":"https://bugzilla.mozilla.org/show_bug.cgi?id=889230","title":"Firefox tracking bug: Implement Custom Elements (from Web Components)"},{"url":"http://status.modern.ie/customelements","title":"IE Web Platform Status and Roadmap: Custom Elements"}],"categories":["DOM","HTML5"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"p","11":"p","TP":"p"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n d #1","24":"n d #1","25":"n d #1","26":"n d #1","27":"n d #1","28":"n d #1","29":"n d #1","30":"p d #1","31":"p d #1","32":"p d #1","33":"p d #1","34":"p d #1","35":"p d #1","36":"p d #1","37":"p d #1","38":"p d #1","39":"p d #1","40":"p d #1"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n d","28":"n d","29":"n d","30":"n d","31":"n d","32":"n d","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"p","6.1":"p","7":"p","7.1":"p","8":"p"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n d","16":"n d","17":"n d","18":"n d","19":"n d","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"p","8":"p","8.1-8.3":"p"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"p d #1"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Enabled through the \"dom.webcomponents.enabled\" preference in about:config"},"usage_perc_y":45.5,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"web components","ie_id":"customelements","chrome_id":"4642138092470272"},"imports":{"title":"HTML Imports","description":"Method of including and reusing HTML documents in other HTML documents.","spec":"http://www.w3.org/TR/html-imports/","status":"wd","links":[{"url":"http://www.polymer-project.org/platform/html-imports.html","title":"Polymer project (polyfill & web components framework)"},{"url":"http://www.html5rocks.com/tutorials/webcomponents/imports/","title":"HTML5Rocks - HTML Imports: #include for the web"},{"url":"https://code.google.com/p/chromium/issues/detail?id=240592","title":"Chromium tracking bug: Implement HTML Imports"},{"url":"https://bugzilla.mozilla.org/show_bug.cgi?id=877072","title":"Firefox tracking bug: Implement HTML Imports"},{"url":"http://status.modern.ie/htmlimports","title":"IE Web Platform Status and Roadmap: HTML Imports"}],"categories":["DOM","HTML5"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"p","11":"p","TP":"p"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"p","31":"p","32":"p d #1","33":"p d #1","34":"p d #1","35":"p d #1","36":"p d #1","37":"p d #1","38":"p d #1","39":"p d #1","40":"p d #1"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n d #2","31":"n d #2","32":"n d #2","33":"n d #2","34":"n d #2","35":"p d #3","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"p","6.1":"p","7":"p","7.1":"p","8":"p"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n d #4","18":"n d #4","19":"n d #4","20":"n d #4","21":"n d #4","22":"p d #5","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"p","8":"p","8.1-8.3":"p"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"y"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"p"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Firefox [has no plans to support HTML imports](https://hacks.mozilla.org/2014/12/mozilla-and-web-components/) though for now it can be enabled through the \"dom.webcomponents.enabled\" preference in about:config","2":"Enabled through the \"Enable HTML Imports\" flag in chrome://flags","3":"Enabled through the \"Experimental Web Platform features\" flag in chrome://flags","4":"Enabled through the \"Enable HTML Imports\" flag in opera://flags","5":"Enabled through the \"Experimental Web Platform features\" flag in opera://flags"},"usage_perc_y":43.45,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"web components","ie_id":"htmlimports","chrome_id":"5144752345317376"},"input-file-multiple":{"title":"Multiple file selection","description":"Allows users to select multiple files in the file picker.","spec":"https://html.spec.whatwg.org/multipage/forms.html#attr-input-multiple","status":"ls","links":[{"url":"https://code.google.com/p/chromium/issues/detail?id=348912","title":"Chrome bug (for Android)"},{"url":"http://www.raymondcamden.com/2012/2/28/Working-with-HTML5s-multiple-file-upload-support","title":"Article"}],"categories":["HTML5"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n #1"},"android":{"2.1":"n #1","2.2":"n #1","2.3":"n #1","3":"n #1","4":"n #1","4.1":"n #1","4.2-4.3":"n #1","4.4":"n #1","4.4.3-4.4.4":"n #1","40":"n #1"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n #1","11":"n #1","11.1":"n #1","11.5":"n #1","12":"n #1","12.1":"n #1","24":"n #1"},"and_chr":{"41":"n #1"},"and_ff":{"36":"n #1"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n #1"}},"notes":"","notes_by_num":{"1":"Not supported when tested on Android, presumably an OS limitation. "},"usage_perc_y":67.8,"usage_perc_a":0,"ucprefix":false,"parent":"forms","keywords":"","ie_id":"","chrome_id":""},"atob-btoa":{"title":"Base64 encoding and decoding","description":"Utility functions for of encoding and decoding strings to and from base 64: window.atob() and window.btoa().","spec":"https://html.spec.whatwg.org/multipage/webappapis.html#atob","status":"ls","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa","title":"MDN article on btoa()"},{"url":"https://developer.mozilla.org/en-US/docs/Web/API/Window.atob","title":"MDN article on atob()"},{"url":"https://github.com/davidchambers/Base64.js","title":"Polyfill"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"y","3":"y","3.5":"y","3.6":"y","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"y","3.2":"y","4":"y","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"u","10.0-10.1":"u","10.5":"u","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"y","4.0-4.1":"y","4.2-4.3":"y","5.0-5.1":"y","6.0-6.1":"y","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"y","2.2":"y","2.3":"y","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"u","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"y"}},"notes":"","notes_by_num":{},"usage_perc_y":93.06,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"atob,btoa","ie_id":"","chrome_id":""},"css-appearance":{"title":"CSS Appearance","description":"The `appearance` property defines how elements (particularly form controls) appear by default. By setting the value to `none` the default appearance can be entirely redefined using other CSS properties.","spec":"http://wiki.csswg.org/spec/css4-ui#appearance","status":"unoff","links":[{"url":"http://css-tricks.com/almanac/properties/a/appearance/","title":"CSS Tricks article"}],"categories":["CSS"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"a #1"},"firefox":{"2":"y x","3":"y x","3.5":"y x","3.6":"y x","4":"y x","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x","30":"y x","31":"y x","32":"y x","33":"y x","34":"y x","35":"y x","36":"y x","37":"y x","38":"y x","39":"y x","40":"y x"},"chrome":{"4":"y x","5":"y x","6":"y x","7":"y x","8":"y x","9":"y x","10":"y x","11":"y x","12":"y x","13":"y x","14":"y x","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x","30":"y x","31":"y x","32":"y x","33":"y x","34":"y x","35":"y x","36":"y x","37":"y x","38":"y x","39":"y x","40":"y x","41":"y x","42":"y x","43":"y x","44":"y x"},"safari":{"3.1":"y x","3.2":"y x","4":"y x","5":"y x","5.1":"y x","6":"y x","6.1":"y x","7":"y x","7.1":"y x","8":"y x"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"y x","16":"y x","17":"y x","18":"y x","19":"y x","20":"y x","21":"y x","22":"y x","23":"y x","24":"y x","25":"y x","26":"y x","27":"y x","28":"y x","29":"y x"},"ios_saf":{"3.2":"y x","4.0-4.1":"y x","4.2-4.3":"y x","5.0-5.1":"y x","6.0-6.1":"y x","7.0-7.1":"y x","8":"y x","8.1-8.3":"y x"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"y x","2.2":"y x","2.3":"y x","3":"y x","4":"y x","4.1":"y x","4.2-4.3":"y x","4.4":"y x","4.4.3-4.4.4":"y x","40":"y x"},"bb":{"7":"y x","10":"y x"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y x"},"and_chr":{"41":"y x"},"and_ff":{"36":"y x"},"ie_mob":{"10":"n","11":"a #1"},"and_uc":{"9.9":"y x"}},"notes":"The `appearance` property currently does not appear in any CSS specification so there is no specifically correct usage.","notes_by_num":{"1":"`-webkit-appearance` with value `none` is supported on IE11 Mobile for phones with \"[Windows Phone 8.1 Update](http://blogs.msdn.com/b/ie/archive/2014/07/31/the-mobile-web-should-just-work-for-everyone.aspx)\", and in EdgeHTML.dll"},"usage_perc_y":79.98,"usage_perc_a":0.51,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":""},"css-background-offsets":{"title":"CSS background-position edge offsets","description":"Allows CSS background images to be positioned relative to the specified edge using the 3 to 4 value syntax. For example: `background-position: right 5px bottom 5px;` for positioning 5px from the bottom-right corner.","spec":"http://www.w3.org/TR/css3-background/#background-position","status":"wd","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/CSS/background-position","title":"MDN article on background-position"},{"url":"http://briantree.se/quick-tip-06-use-four-value-syntax-properly-position-background-images/","title":"Basic information"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"y","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"y"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"n","10":"y"},"op_mob":{"10":"n","11":"y","11.1":"y","11.5":"y","12":"y","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{},"usage_perc_y":85.82,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"4 value syntax","ie_id":"","chrome_id":""},"css-supports-api":{"title":"CSS.supports() API","description":"The CSS.supports() static methods returns a Boolean value indicating if the browser supports a given CSS feature, or not.","spec":"http://dev.w3.org/csswg/css-conditional/#the-css-interface","status":"cr","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/API/CSS.supports","title":"MDN Docs"},{"url":"http://jsbin.com/rimevilotari/1/edit","title":"Demo (Chinese)"},{"url":"https://dev.opera.com/articles/native-css-feature-detection/","title":"Native CSS Feature Detection via the @supports Rule"},{"url":"http://davidwalsh.name/css-supports","title":"CSS @supports"},{"url":"http://blog.csdn.net/hfahe/article/details/8619480","title":"Article (Chinese)"}],"categories":["DOM","JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n d","21":"n d","22":"n d","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"y #1","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"y","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"See also [@supports in CSS](#feat=css-featurequeries)\r\n\r\nSee the [WebKit Bug](http://trac.webkit.org/changeset/142739) for status in Safari","notes_by_num":{"1":"Opera 12 uses a different method name('window.supportsCSS')"},"usage_perc_y":60.93,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"conditional","ie_id":"conditionalrules","chrome_id":"4993981813358592"},"css-touch-action":{"title":"CSS touch-action property","description":"touch-action is a CSS property that controls filtering of gesture events, providing developers with a declarative mechanism to selectively disable touch scrolling (in one or both axes), pinch-zooming or double-tap-zooming.","spec":"http://www.w3.org/TR/pointerevents/#the-touch-action-css-property","status":"cr","links":[{"url":"http://docs.webplatform.org/wiki/css/properties/touch-action","title":"WebPlatform Docs"},{"url":"http://msdn.microsoft.com/en-us/library/windows/apps/hh767313.aspx","title":"MSDN Docs"},{"url":"http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away","title":"300ms tap delay, gone away"},{"url":"http://blogs.telerik.com/appbuilder/posts/13-11-21/what-exactly-is.....-the-300ms-click-delay","title":"What Exactly Is..... The 300ms Click Delay"},{"url":"http://thx.github.io/mobile/300ms-click-delay/","title":"What Exactly Is..... The 300ms Click Delay(Chinese)"}],"categories":["CSS"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y x #2","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n d #1","30":"n d #1","31":"n d #1","32":"n d #1","33":"n d #1","34":"n d #1","35":"n d #1","36":"n d #1","37":"n d #1","38":"n d #1","39":"n d #1","40":"n d #1"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"y"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"n"},"ie_mob":{"10":"y x #2","11":"y"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Supported in Firefox behind the `layout.css.touch_action.enabled` flag, Firefox for Windows 8 Touch ('Metro') enabled by default.","2":"IE10+ has already supported these property which are not in standard at present such as'pinch-zoom','double-tap-zoom','cross-slide-x','cross-slide-y'."},"usage_perc_y":53.44,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"touch action","ie_id":"csstouchaction","chrome_id":"5912074022551552"},"autofocus":{"title":"Autofocus attribute","description":"Allows a form field to be immediately focused on page load.","spec":"https://html.spec.whatwg.org/multipage/forms.html#autofocusing-a-form-control:-the-autofocus-attribute","status":"ls","links":[{"url":"http://davidwalsh.name/autofocus","title":"Article on autofocus"}],"categories":["HTML5"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"y","11":"y","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"y","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"y","6":"y","7":"y","8":"y","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"y","5.1":"y","6":"y","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"y","10.0-10.1":"y","10.5":"y","10.6":"y","11":"y","11.1":"y","11.5":"y","11.6":"y","12":"y","12.1":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"y","4":"y","4.1":"y","4.2-4.3":"y","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"y","10":"y"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"y","11":"y"},"and_uc":{"9.9":"n"}},"notes":"While not supported in iOS Safari, it does work in iOS WebViews.","notes_by_num":{},"usage_perc_y":78.64,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":""},"css-clip-path":{"title":"CSS clip-path property","description":"Method of defining the visible region of an element using SVG or a shape definition.","spec":"http://www.w3.org/TR/css-masking-1/#the-clip-path","status":"wd","links":[{"url":"http://css-tricks.com/almanac/properties/c/clip/","title":"CSS Tricks article"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"a #1","3.6":"a #1","4":"a #1","5":"a #1","6":"a #1","7":"a #1","8":"a #1","9":"a #1","10":"a #1","11":"a #1","12":"a #1","13":"a #1","14":"a #1","15":"a #1","16":"a #1","17":"a #1","18":"a #1","19":"a #1","20":"a #1","21":"a #1","22":"a #1","23":"a #1","24":"a #1","25":"a #1","26":"a #1","27":"a #1","28":"a #1","29":"a #1","30":"a #1","31":"a #1","32":"a #1","33":"a #1","34":"a #1","35":"a #1","36":"a #1","37":"a #1","38":"a #1","39":"a #1","40":"a #1"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"a x #2","25":"a x #2","26":"a x #2","27":"a x #2","28":"a x #2","29":"a x #2","30":"a x #2","31":"a x #2","32":"a x #2","33":"a x #2","34":"a x #2","35":"a x #2","36":"a x #2","37":"a x #2","38":"a x #2","39":"a x #2","40":"a x #2","41":"a x #2","42":"a x #2","43":"a x #2","44":"a x #2"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"a x #2","7.1":"a x #2","8":"a x #2"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"a x #2","16":"a x #2","17":"a x #2","18":"a x #2","19":"a x #2","20":"a x #2","21":"a x #2","22":"a x #2","23":"a x #2","24":"a x #2","25":"a x #2","26":"a x #2","27":"a x #2","28":"a x #2","29":"a x #2"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"a x #2","8":"a x #2","8.1-8.3":"a x #2"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"a x #2","4.4.3-4.4.4":"a x #2","40":"a x #2"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"a x #2"},"and_chr":{"41":"a x #2"},"and_ff":{"36":"a #1"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Partial support refers to only supporting the `url()` syntax.","2":"Partial support refers to supporting shapes and the `url(#foo)` syntax for inline SVG, but not shapes in external SVGs."},"usage_perc_y":0,"usage_perc_a":71.47,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":""},"getrandomvalues":{"title":"crypto.getRandomValues()","description":"Method of generating cryptographically random values.","spec":"http://www.w3.org/TR/WebCryptoAPI/#RandomSource-method-getRandomValues","status":"wd","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues","title":"MDN article"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"y x","TP":"y"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"y","12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"y","7":"y","7.1":"y","8":"y"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"y","8":"y","8.1-8.3":"y"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"y","4.4.3-4.4.4":"y","40":"y"},"bb":{"7":"n","10":"y"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"y"},"ie_mob":{"10":"n","11":"y x"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{},"usage_perc_y":80.16,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":""},"screen-orientation":{"title":"Screen Orientation","description":"Provides the ability to read the screen orientation state, to be informed when this state changes, and to be able to lock the screen orientation to a specific state.","spec":"http://www.w3.org/TR/screen-orientation/","status":"wd","links":[{"url":"http://aurelio.audero.it/demo/screen-orientation-api-demo.html","title":"Demo"},{"url":"https://developer.mozilla.org/en-US/docs/Web/API/Screen.orientation","title":"MDN article"},{"url":"http://www.sitepoint.com/introducing-screen-orientation-api/","title":"SitePoint article"}],"categories":["JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"a x","TP":"a x"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"a x","19":"a x","20":"a x","21":"a x","22":"a x","23":"a x","24":"a x","25":"a x","26":"a x","27":"a x","28":"a x","29":"a x","30":"a x","31":"a x","32":"a x","33":"a x","34":"a x","35":"a x","36":"a x","37":"a x","38":"a x","39":"a x","40":"a x"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n","37":"n","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"n"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"n"},"and_chr":{"41":"y"},"and_ff":{"36":"y x"},"ie_mob":{"10":"n","11":"a x"},"and_uc":{"9.9":"y"}},"notes":"Partial support refers to an older version of the draft specification, and the spec has undergone significant changes since.","notes_by_num":{},"usage_perc_y":45.91,"usage_perc_a":20.25,"ucprefix":false,"parent":"","keywords":"","ie_id":"screenorientationapi","chrome_id":"6191285283061760"},"font-loading":{"title":"CSS Font Loading","description":"This CSS module defines a scripting interface to font faces in CSS, allowing font faces to be easily created and loaded from script. It also provides methods to track the loading status of an individual font, or of all the fonts on an entire page.","spec":"http://dev.w3.org/csswg/css-font-loading/","status":"cr","links":[{"url":"https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/#font-load-events","title":"Optimizing with font load events"}],"categories":["CSS3","JS API"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","TP":"n"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n d #1","36":"n d #1","37":"n d #1","38":"n d #1","39":"n d #1","40":"n d #1"},"chrome":{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"n","3.2":"n","4":"n","5":"n","5.1":"n","6":"n","6.1":"n","7":"n","7.1":"n","8":"n"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8":"n","8.1-8.3":"n"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"n","2.2":"n","2.3":"n","3":"n","4":"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"n","40":"y"},"bb":{"7":"n","10":"n"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"y"},"and_chr":{"41":"y"},"and_ff":{"36":"n"},"ie_mob":{"10":"n","11":"n"},"and_uc":{"9.9":"n"}},"notes":"","notes_by_num":{"1":"Can be enabled in Firefox using the `layout.css.font-loading-api.enabled` flag. See [this bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1149381) for information on when it will be enabled by default."},"usage_perc_y":43.89,"usage_perc_a":0,"ucprefix":false,"parent":"","keywords":"","ie_id":"","chrome_id":"6244676289953792"},"font-unicode-range":{"title":"Font unicode-range subsetting","description":"This @font-face descriptor defines the set of Unicode codepoints that may be supported by the font face for which it is declared. The descriptor value is a comma-delimited list of Unicode range (<urange>) values. The union of these ranges defines the set of codepoints that serves as a hint for user agents when deciding whether or not to download a font resource for a given text run.","spec":"http://dev.w3.org/csswg/css-fonts/#descdef-unicode-range","status":"cr","links":[{"url":"https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-range","title":"MDN: unicode-range"},{"url":"https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html#//apple_ref/css/property/unicode-range","title":"Safari CSS Reference: unicode-range"},{"url":"http://docs.webplatform.org/wiki/css/properties/unicode-range","title":"Web Platform Docs: unicode-range"},{"url":"http://jsbin.com/jeqoguzeye/1/edit?html,output","title":"Demo"}],"categories":["CSS3"],"stats":{"ie":{"5.5":"n","6":"n","7":"n","8":"n","9":"a","10":"a","11":"a","TP":"a"},"firefox":{"2":"n","3":"n","3.5":"n","3.6":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"n","29":"n","30":"n","31":"n","32":"n","33":"n","34":"n","35":"n","36":"n d #1","37":"n d #1","38":"y","39":"y","40":"y"},"chrome":{"4":"a","5":"a","6":"a","7":"a","8":"a","9":"a","10":"a","11":"a","12":"a","13":"a","14":"a","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"a","24":"a","25":"a","26":"a","27":"a","28":"a","29":"a","30":"a","31":"a","32":"a","33":"a","34":"a","35":"a","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y"},"safari":{"3.1":"a","3.2":"a","4":"a","5":"a","5.1":"a","6":"a","6.1":"a","7":"a","7.1":"a","8":"a"},"opera":{"9":"n","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11":"n","11.1":"n","11.5":"n","11.6":"n","12":"n","12.1":"n","15":"a","16":"a","17":"a","18":"a","19":"a","20":"a","21":"a","22":"a","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y"},"ios_saf":{"3.2":"a","4.0-4.1":"a","4.2-4.3":"a","5.0-5.1":"a","6.0-6.1":"a","7.0-7.1":"a","8":"a","8.1-8.3":"a"},"op_mini":{"5.0-8.0":"n"},"android":{"2.1":"a","2.2":"a","2.3":"a","3":"a","4":"a","4.1":"a","4.2-4.3":"a","4.4":"a","4.4.3-4.4.4":"a","40":"y"},"bb":{"7":"u","10":"u"},"op_mob":{"10":"n","11":"n","11.1":"n","11.5":"n","12":"n","12.1":"n","24":"a"},"and_chr":{"41":"y"},"and_ff":{"36":"n d #1"},"ie_mob":{"10":"a","11":"a"},"and_uc":{"9.9":"a"}},"notes":"Partial support indicates that unnecessary code-ranges are downloaded by the browser - see [browser test matrix](https://docs.google.com/a/chromium.org/spreadsheets/d/18h-1gaosu4-KYxH8JUNL6ZDuOsOKmWfauoai3CS3hPY/edit?pli=1#gid=0).","notes_by_num":{"1":"Can be enabled in Firefox using the `layout.css.unicode-range.enabled` flag"},"usage_perc_y":43.45,"usage_perc_a":35.69,"ucprefix":false,"parent":"","keywords":"font face,unicode,unicode-range","ie_id":"","chrome_id":""},"gamepad":{"title":"Gamepad API","description":"API to support input from USB gamepad controllers though JavaScript.","spec":"http://www.w3.org/TR/gamepad/","status":"wd","links":[{"url":"http://luser.github.io/gamepadtest/","title":"Controller demo"},{"url":"https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API","title":"M@N article2},{"url":"�utr:?/www.htMl5rocks.com/ef/tutorials/dodles/wamepad/",*title";"HTML5Zockr a2vicle"},{"uvl":"htt0://gamedevelOpment�tuusplus.com/tutoria|r/using-the/html5)g!mep!d-api-to-a��-con4ro�ler-support,to-browsdc-games-%cms-21��5",#thtlu":"Eetiiled tu|oriil"}],"categories":["JS API"],stats�:{"�e":{"5.5":"n","6":".","7":"n,"82:"n","9":"n"���1":"n","11":"n","TP">"y"},2�irufkp":{"�28bj",#3":"n","3.5":"n","3.6":"n"<"4"2"n","!":"n","6":"n","7":"n","8":"n","9":"n","10":"n�,"11":"n", 12":"n"."13":"n","14"2*n","15":*n","16"*"n","17":"n,"18": n","19*:"n"- 2p":"n","21":"f","22":"n","03":"n","24":"n&,"24":"n""26":"~&,"27"x"n","2<":"n","29":"y","30"�"�"(#31":"y","32":"y","33":*y","34":"y�,235":"y","36""y"-"37":"y*,"3:"z"y","3;":"y","40":�Y"},"chr�me":{"4": n","5":n","2#8"n","3":"n2,"8"8bn","9":n","10#�:n ,"11":"n:,"12":"n","13":"n","u4":"n","15"*"n�,"1":"n"("17":"n","18":"n",#19":"n�("20":"N"- 21":"y x","22":"y x","23#j"y x","2�"2"y xbl"24"z y","26":#y","27":"y","28":"y","29":"9","r0":�y","31�:"yb,"32"*"9", 3#":"y"�"34":y","35";"y",b36":"y","#7":"y","38":"y","3y":"y","40"z"y","41":"y","42"z"y","4�":"y","44">"y"y,"safAri":{"3.1&:"n","3.2":"n","4">"n","5"8"n",".1 :"j",">":"n","v.1":"n","7":"n","7.1":"n",8":"n"}l"opesa":{"9":"n","9.5-).6":"n#,"10.0-10.1":"n","10.5":"n","q06"z".j,"11":"n","11.1":"n","11*5">"n",&11.�":"n ,"12":"n","12.1":bn","15":"n",16":"n","15":"n",b18":"j"h"19":"n"�"20";"n",f21":"n","22":"�"$"23":"n",#64":"y","25":"y","26":"y","27":2i","28:jy,":9":"y*},"ios_sAf"�{"3.2":"n"$"4.0-4.1":".#$"4.2-4.3":"o","5.0-5.!":"n","6.4-7.0":"n"$"7.0-7.1""o",&8":"n",".1-8.3"**n"},"op_mini":{"5.0,8.0":"n"},"a.droid*:{"21":"n&,"2.2":#�","2.#":"n","3":"n","6">"n","4.1":"n","4.2-4.3":"n","4.4":"n","4.4.3-4.4.4":"~","40":"n"},"bb">{"7""n"$"30":"n },"op_mob":k"90"2"n""11":"n","11.1":"n","11.5":"n","13">"~","12.0"z"n","24":"n"},"anl]chz"2{41":"n"},"qnd_ff":;"3>":"n"}-"ie_mob":{"10":"n","!3":�f"},`and_ec :{"9n9"z"n"=},"NodeS":"","notes_by_num":{},"usage_perc_y*:45.91,"uwage_perc_a":,"ucprefix":falsg,"parent":"","keywords":"","ie_id":"c`mePadapi"$ c�rome_id":"51877638#111168"|,bcss-font-stretch":{"title":"CSS �ont-str%tch","description":#If a Font has meltiple tyres of variations basel on the 7idth ov`ch`racters, th% `noNt-stre4ch` prop5rty allowsthe appropriate one tO be selected. The `�nde�tY il itself dods not cause the browser �o stretch4to a font.","sPec""`|tp://www.v3*org/TR/css-fonts-3/#font
},{}],5�:Yfunction(req�Ire,module,export�){
modume.exxor4s={
   tiule":"CS�3�Bqckeround-iMage options",
  "description":"New properties to affect background images, including background-clip, background-origin and background-size",
  "spec":"http://www.w3.org/TR/css3-background/#backgrounds",
  "status":"cr",
  "links":[
    {
      "url":"http://www.standardista.com/css3/css3-background-properties",
      "title":"Detailed compatibility tables and demos"
    },
    {
      "url":"http://www.css3files.com/background/",
      "title":"Information page"
    },
    {
      "url":"https://github.com/louisremi/background-size-polyfill",
      "title":"Polyfill for IE7-8"
    }
  ],
  "bugs":[
    {
      "description":"iOS Safari has buggy behavior with `background-size: cover;` on a page's body."
    },
    {
      "description":"iOS Safari has buggy behavior with `background-size: cover;` + `background-attachment: fixed;`"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"y",
      "10":"y",
      "11":"y",
      "TP":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"a x",
      "4":"y",
      "5":"y",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"a #3",
      "5":"a #3",
      "6":"a #3",
      "7":"a #3",
      "8":"a #3",
      "9":"a #3",
      "10":"a #3",
      "11":"a #3",
      "12":"a #3",
      "13":"a #3",
      "14":"a #3",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"a #2 #3",
      "3.2":"a #2 #3",
      "4":"a #2 #3",
      "5":"a #2 #3",
      "5.1":"a #2 #3",
      "6":"a #2 #3",
      "6.1":"a #2 #3",
      "7":"y",
      "7.1":"y",
      "8":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"a x",
      "10.5":"y",
      "10.6":"y",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y"
    },
    "ios_saf":{
      "3.2":"a",
      "4.0-4.1":"a",
      "4.2-4.3":"a",
      "5.0-5.1":"a #3",
      "6.0-6.1":"a",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"a #1"
    },
    "android":{
      "2.1":"a x",
      "2.2":"a x #3",
      "2.3":"a x #3",
      "3":"a #3",
      "4":"a #3",
      "4.1":"a #3",
      "4.2-4.3":"a #3",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "40":"y"
    },
    "bb":{
      "7":"y",
      "10":"y"
    },
    "op_mob":{
      "10":"y",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "12":"y",
      "12.1":"y",
      "24":"y"
    },
    "and_chr":{
      "41":"y"
    },
    "and_ff":{
      "36":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Partial support in Opera Mini refers to not supporting background sizing or background attachments. However Opera Mini 7.5 supports background sizing (including cover and contain values).",
    "2":"Partial support in Safari 6 refers to not supporting background sizing offset from edges syntax.",
    "3":"Does not support `background-size` values in the `background` shorthand"
  },
  "usage_perc_y":87.92,
  "usage_perc_a":6.73,
  "ucprefix":false,
  "parent":"",
  "keywords":"",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],58:[function(require,module,exports){
module.exports={
  "title":"CSS3 Border images",
  "description":"Method of using images for borders",
  "spec":"http://www.w3.org/TR/css3-background/#the-border-image",
  "status":"cr",
  "links":[
    {
      "url":"http://www.css3files.com/border/",
      "title":"Information page"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/border-image",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"y",
      "TP":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"a x",
      "3.6":"a x",
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"a x",
      "3.2":"a x",
      "4":"a x",
      "5":"a x",
      "5.1":"a x",
      "6":"y",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"a",
      "10.6":"a",
      "11":"a x",
      "11.1":"a x",
      "11.5":"a x",
      "11.6":"a x",
      "12":"a x",
      "12.1":"a x",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y"
    },
    "ios_saf":{
      "3.2":"a x",
      "4.0-4.1":"a x",
      "4.2-4.3":"a x",
      "5.0-5.1":"a x",
      "6.0-6.1":"y",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"a x"
    },
    "android":{
      "2.1":"a x",
      "2.2":"a x",
      "2.3":"a x",
      "3":"a x",
      "4":"a x",
      "4.1":"a x",
      "4.2-4.3":"a x",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "40":"y"
    },
    "bb":{
      "7":"a x",
      "10":"y"
    },
    "op_mob":{
      "10":"n",
      "11":"a x",
      "11.1":"a x",
      "11.5":"a x",
      "12":"a x",
      "12.1":"a x",
      "24":"y"
    },
    "and_chr":{
      "41":"y"
    },
    "and_ff":{
      "36":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y"
    }
  },
  "notes":"Note that both the `border-style` and `border-width` must be specified (not set to `none` or 0) for border-images to work according to spec, though older implementations may not have this requirement. Partial support refers to supporting the shorthand syntax, but not the individual properties (border-image-source, border-image-slice, etc). ",
  "notes_by_num":{
    
  },
  "usage_perc_y":84.64,
  "usage_perc_a":6.87,
  "ucprefix":false,
  "parent":"",
  "keywords":"",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],59:[function(require,module,exports){
module.exports={
  "title":"CSS3 Border-radius (rounded corners)",
  "description":"Method of making the border corners round",
  "spec":"http://www.w3.org/TR/css3-background/#the-border-radius",
  "status":"cr",
  "links":[
    {
      "url":"http://border-radius.com",
      "title":"Border-radius CSS Generator"
    },
    {
      "url":"http://muddledramblings.com/table-of-css3-border-radius-compliance",
      "title":"Detailed compliance table"
    },
    {
      "url":"http://www.css3files.com/border/#borderradius",
      "title":"Information page"
    },
    {
      "url":"http://css3pie.com/",
      "title":"Polyfill which includes border-radius"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/border-radius",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"Safari does not apply `border-radius` correctly to image borders: http://stackoverflow.com/q/17202128"
    },
    {
      "description":"Android Browser 2.3 does not support % value for `border-radius`."
    },
    {
      "description":"Border-radius does not work on fieldset elements in IE9."
    },
    {
      "description":"The stock browser on the Samsung Galaxy S4 with Android 4.2 does not support the `border-radius` shorthand property but does support the long-hand properties for each corner like `border-top-left-radius`."
    },
    {
      "description":"Older versions of Safari [had a bug](https://bugs.webkit.org/show_bug.cgi?id=50072) where background images would bleed out of the border-radius."
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"y",
      "10":"y",
      "11":"y",
      "TP":"y"
    },
    "firefox":{
      "2":"a x",
      "3":"y x",
      "3.5":"y x",
      "3.6":"y x",
      "4":"y",
      "5":"y",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"y x",
      "5":"y",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"y x",
      "3.2":"y x",
      "4":"y x",
      "5":"y",
      "5.1":"y #1",
      "6":"y #1",
      "6.1":"y #1",
      "7":"y",
      "7.1":"y",
      "8":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"y",
      "10.6":"y",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y"
    },
    "ios_saf":{
      "3.2":"y x",
      "4.0-4.1":"y",
      "4.2-4.3":"y",
      "5.0-5.1":"y",
      "6.0-6.1":"y",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"y x",
      "2.2":"y",
      "2.3":"y",
      "3":"y",
      "4":"y",
      "4.1":"y",
      "4.2-4.3":"y",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "40":"y"
    },
    "bb":{
      "7":"y",
      "10":"y"
    },
    "op_mob":{
      "10":"n",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "12":"y",
      "12.1":"y",
      "24":"y"
    },
    "and_chr":{
      "41":"y"
    },
    "and_ff":{
      "36":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Safari 6.1 and earlier did not apply `border-radius` correctly to image borders: http://stackoverflow.com/q/17202128"
  },
  "usage_perc_y":91.89,
  "usage_perc_a":0.02,
  "ucprefix":false,
  "parent":"",
  "keywords":"roundedcorners, border radius,-moz-border-radius",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],60:[function(require,module,exports){
module.exports={
  "title":"calc() as CSS unit value",
  "description":"Method of allowing calculated values for length units, i.e. `width: calc(100% - 3em)`",
  "spec":"http://www.w3.org/TR/css3-values/#calc",
  "status":"cr",
  "links":[
    {
      "url":"http://hacks.mozilla.org/2010/06/css3-calc/",
      "title":"Mozilla Hacks article"
    },
    {
      "url":"https://developer.mozilla.org/en/CSS/-moz-calc",
      "title":"MDN article"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/functions/calc",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"IE10 crashes when a div with a property using `calc()` has a child with [same property with inherit](http://stackoverflow.com/questions/19423384/css-less-calc-method-is-crashing-my-ie10)."
    },
    {
      "description":"IE 9 - 11 don't render `box-shadow` when `calc()` is used for any of the values"
    },
    {
      "description":"IE10 and IE11 don't support using `calc()` inside a `transform`. [Bug report](https://connect.microsoft.com/IE/feedback/details/814380/)"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"a",
      "10":"y",
      "11":"y",
      "TP":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"y x",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y"
    },
    "operc":{
      "9":"n",
       �.5-9.6":"n",
     ""10.�-10.1":"n",
"     "10.5":"n",
      "0.6":"n",
  $   "11":"nb,
      b11.1"8"N",
`     "!1.5":"n",
� 0  ("11.6":"�",
      "12":"n",
      "1.1":"n",
0     "15":"y",
  (   "16"�"y",
!     "17":"y",
 `    "8":"y",
!   ! "19":"y-
  (( "20":2y",
      "25":2y",
      "22&:"y",
      "2;":#y",
      "24":"y",
    � "25":"y",
      "26#:"y",
      "27":"Y"�!    ("28":&y",
  (   "21":"y"
 0  y,
   0"io�_saf":{
      "3.2":"n",J       4.0-�.1":"n",
      "4.2�4.;":"n(
      "5.0-5.1":"n",
      "&0-6.1*:"y z"-
   !   7.0-7.1":"y",
 �   "8"8"q",
  $   "8.1-8.3":"y&
    },
    "Op_mini":{
   0( "5.0-8�0"*"n"    }, 0  "andrgid":{
      ":.1":"n",
`     "2.6":"n",
   0  b2.3":"n",
      "3":"n"<
    0 "4":"n",
      #4.1":"n",
$  `` "4.2-4.# ;"n",
 #    "4.4":"a",
      "4.4.3-4�4.4":"a",
      "40">"y 0  =,
`   "bb"2{
    ( "7":"n",
 $   `"10":"y"
    },
    "op_mob":{
 " 0  "10":"j",
     ""q1":"n",
      "11/1":"n"<
      "11.5"*"n",(     �"12":"n",
      "12.1":"n&,
   $  "24&:"y"
    },
$   "an`_ghr":{� 0    "�1";"y"
$   },
    "end_ff":{
      "36": y"
    },
    "ie_mob":{
 !    #1�2:"y",
      "11:"y"
    },
    "and_uc":{
 !"   "9.9":"n#
`   }
  },
  "notws":"Support can b� �omewhat�emudated in nlder vErqions of IE usi.g dhe non-standavl `eppressLn()` syntax. �artial seppoz4 in YE9 befers 4o the browser crashing when used as a drackwround-positiol` vAlue. artial�suppnrt hn Andzoid Browwer 4.4 rEfers to"thU bbowser lacking the�ability to }ultiply and diride faluesn2,
  "notes_by_nUm":{
    
  },  "usagd_perc_x":78.46,
   usage_perc_a":5.24,
  "uc�refix":fals�,
  "parent":""l
  "kEywgrus":"",
  "ie_id":"csscqlg",
  "chrome_il":"576520143873228�",
  "shown*:trua
}
},{}],61:[function(require,modu,e,expkrts){
modelE.expmrts={
  "title":"CSS3`Ani}atiOn",
  "descriq|ion":"C}mplep method of enila�ing certain properties of an`element",
  "Spec":"htvp://vww.w3.nrg/T@/css3-afimations/",
  "status*"wd",
  ",ink3"�[
(   {
      "url":"http://robertnyman.com/2010/05/06/css3-animations/�(
0     "tatle":"Blog post on"usage"
    },
    {      "url":"hdtp*//www.css7fi|es*coM/animation/",
      #titleb:"infozmation page"
    }<
!   {
   $�!*�rd":"h|tp://dcs.webplatform�org/wiki/css/pzoper�ies/animqpions",
      "title":"WebPlatform Docs"
    }  ],
  "bugs":[
    {*      "descviption":"'animation-fill-mode' psoperty"ys not suppo�Ted in A~dboid0browser below 2.3."
    },
    {
   p  "description":"iOR 6.11and beloW(do not swpport animataon on pqetdo-elements."
    },
 0  {
   �  "Description":"@keyframes nOt supported in an in,ine or Scoped st9lesheet in Firefox (bqg 8300u6)"
 $ }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
   "#ie"2{
      "u.5"*�n",
$     "6":"n",
      "7":"n",
!$    "8":"f ,
      "8";"N�,
      "1":"y",
      13":"y",
      "TP":"y"�    },
    "firefox�:k
  �   "3":"n",
  $   "3":"n",
      "3.7";"nb,
  (  "3*6":"n",
`     4":"n",
      "4":by x",
      "6":"Y x",
      "7":*y x",J      "8":"y x",
      "9":"y x",
      "10":"y x",
 (    "11":"y x",
      "12":"y x",      "13"*"y x",
      "14":"y x",
      "15":"y x",
  `!� "16":"y"
   !  "1'":"y",
      "18"z"y",
    $$"19":"y",
      "20":"y",J"     "21":"y",
      #22":"y",     �"23":"y",
   �  "24":y",
"     "25":"{",
      ""6":"y",
      "27":"y",
    0 "28":"y",
�      29":"y",
      "30":"y",
      *31":"y",      "32":"y",
      "3":"y",     ("34�:"y",
   0" "35":"y",
      "36":"y",
      &37":"x",
      "38":"y",
      "39":�y",
0   " "40":"y*
   0},
`   "chrome":{
$ !   "4">"x x"(
`     "5":*y(x",
! !   "6*:"y x"
     !"7": y x",*      "8":"y x",
      "9"z"y x",
      "10":"y x"$
 ( ! ""11":"9 x,
      "12":#y X",
      "13":"y(x",
   "  "14":"y x",
      "15":"y z",
 "  ` "16":"y x"l
     $"17 :"y x"�
     ("18#:"y x",
      "19":"y X",
      "20":"y x,
      "21":"y x",
      "22":"y x",
`     "23":*} x ,
   (  "24":"y x",
      "25"8"y x",* b    "26"2"y x",
      "27":"y x",
  `   "28":"y x",
`     �2)":"y�x",
   �  "31":"y x",
 !    "31":"y x",
      "32":"y x*,* b  8 "33b:2y x",
  `,  "34":"� x",
0     ";1":y x",
0 �(  "1v:"y`8",
      "37":�y!x",
      "38":"q x",
     `"29":2y x",
      "40"8"y x",
  0   "41":"y x",
      "42":"y x",      243""y",
      "44":"y"
    },
    "safari":{
      #3.1": n"
      23�2":"n",
   $  "4":"y x",
      "�":"y x ,
      "5.1&:i x",      "6":"y x",
  $   "6.1":"y y",
      "7":#y x",
    $ "7.1":"y x",
 "    "8":&y x"
(   }<
    "mpera":{
     `"9"z"n",
      "9.5-9.6":"n",
      "90.0�10.1":"n"�
      "q0&5":"n",
  !   "10.6":"n".
   "  "11":"o",
      "11.1":&n",
      "11.52:"n",
      "11.6":"n",
      "12":"y x",
      "12.1":&y",
      "15":"y p",
0"  ! "16*:"Y x",
      "17":"y xb<
     �"1"*"y x ,
 "   `"19":"y x",*    p "20&:by x",
      "21:"y0x",
      "22b:2y x",
       23:"y x ,
      "24":"y x",
     ("25":"y z",
      "26":"y x",
      "23":"y!x"(
   $  "28"8"y x",
      "39"2"y x"
    },
   ""ios_saf":{
      "3.2":"y x(,
      "4.0-4.1":"y x",
      "4.2-4.3":"y �",
      "5.0-5.1":"y x",
      "�.0-6.1":"y x",
      "7, -7.12:by(x",
      "8":"y x",
      "8n1-8.�":"y x"
    },
    "op_mini&:{
   0` "5/0-8.0":"n"J`   },
    �android#:{
      "�.!":"a x",
      "2,2":"� x",
  $    2.3":"a x",
      "3":"a x�,
    ! "4":"y x",
   �  "4.1:�y x",
      "4.2-4.3"8"y0x",
      "4*4":"y x"�
      "4.4.;-4/4.4":"y x",
      "40":"y x"
    },
    "bbb2{
      "7"*"y x",
      "10":"y x"
   "=(
    "op_mob":{
      �10;"n",` �   "11""n",
     !"1!.1":"n",
      "11.5#:n",
      "12":"n",
"     "121":"y",  (   "24":"y$x"
    u,
    "and_chr":[
( !  �"<1":"y x"
$   ],
    "and_wf":{
   "  "36":"yb   �m,
    "ie_mob":{
      "10":"y",
      "11":"y"
   ��,
    "and_wc":{
      "9.9":"y � 
    }  },
" "nodes":"PcrtIal suprort if Andro9d browser be&mrs to buggy behavior in different scenarios.",
 !"notes_by_num":{�    
  },  "usage_pmrc_y":8).92,J  "usage_pers_a":0.11,
( "ecprefix":false,*  "parent":"",
  "k%ywords":"animations,css-anii`tion�,kayframe,keyframeq",
  "ie_id":"",
 ""chroM%_id#:"",
 ""shown":true
}
},}],72:[f}lctiof(require,module,extorts){
modula.exports={
  "title":"CSS b/x-decoration-break",
  "dercriptioz":"C�nvrols whether the box's oargins, bord�rs, paeding, and mthEb`ducorations wrap the0broken mdoes of the box fRagments (7hen thm cox is spliT by a break�(page/column/zdgion/line). ,
  "spec":"http://www.w3.org/TR/css3mbr%ao/#break-decoratio�",
  "status"2"�d",
  "lin�s":[
    {&  � ""trl""ht�ps:/+developes.mozilla.org/en-US/dbq/W�r/CSS/box-decoratioN-brmak",
      "titde"2"MDN article"
    }l
    k
      "url":"http://jsbin.com.xojmro/edit?css,gutput",
      "tytle":#Demo of effect on!bo� brder"
    }
  ]<
  "bugs":[
    
  ],
! "c!tegories":[
 $  "CSC3"
  ],
! "stats":{
    "ie":s
    $ *5�5":"n",
      "6";"n",
   $  "7":"n", $    "82:"n",
     ("9":"n",
      "10":"o",
   !  "11":"n",
      "TP":"n"   "},�  ` "firefox":{
( 0   "2":&n",
      "3":"n",
      "3.5�:"n".
    ( "3�6":"n",
 $    "4":"F",
      "5":"n",
$     "6":"n#,
      "7":"n�,
 0   "<":2n",
4     "9":"n",
      &10":"n",
      "11"8"o",
      "12":#n",
      "13":"N",
  $   "14":"�",
      "1<":"l",j     !"16":"n",
     `"Q7":"n ,
 `   �"18":"n"l�      "19":"n",
"     "22":"n",
    � "21":"n",
      "2R":"n",
$     "2s":"n",
  `   "24":"n"(
      "25":"n",
   (  "26":"n",
  "   "27":"n",
  "   "28#: n",J $    #29""n",
      �30":"n",
 �    "31":"n",
      "32":"9"
      "33":"y"$
 !    "34":"y"(
 `    "34":�y",
  !"  "36":"y",
  "   237":"y*,
�     "38"("y",
 0(  @#39":"x2,
      "40":by"
    },    "cxrome"8{
      "4":"n",:   "  "5":"n",
      "6":"n",
  `   "?":"n",
 (    (":"n",
   $  "9":"nr,
      "10:"n ,     ""1�":n�,
      "12":"n",
    $ "13":#n",
      "14":"n"(
    (""15":o",j      "16":"n",
      "17":"n",
      "8"n",*  $   "19":"n",
      "20":"n",
0     "01":"n",
"     "22":"y P",
      "23":"y x",
      "24":"y xb,
     `"65":"y x","     "26":"y x",
      "27b2"y x",   "  "28":"y x&,
    `("29"z"y p ,
      "#0#:"i x",
    ! "31":"y x",
      "32":"90x",
  0   "3;":"y x",
      "s4":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x�,
      "38"�"y x",
      39":"{ x�,
�     "402:"y x&,
      "1":"y x",
    0 "42":"y y",
      "43":"y x",
0 `   "$4":"y p"
    },
    "safari":k
      "3.1":"n",
      "3.2":"n",
  !   "4":"k",
  "   "5"*"n",
      "5. ":"n",
      "4"z"n",
      "6.1":"y x",
     "7":"y x",�      "7.1":"y x",
`     "8":"y x"
 0  },�    "opera":{
      "9":*u",
      "9.=-9.6":"�",
      "10.0m10.1":"52,
      &10.5":�u",
      "10n7":"u",
      "11":"y",
      "11.1":"y",
     $"115":2y",
      "11.6":"y",
($  " "12":"y",
      "12.0#"y",
 "    "15":&y x",
 `   0"16":"y x",
     "37":"y x",
    ` "18":"y x",
      "19*:"y x"�
      20":"y x"<J(    `"21":"y x".
      "22":"y x",
      "�3: y�x",
     `24":&y x",
      "24":"y x$
      "26#:"y x",
      "25":&y x",
      "28"*"y x",
  (   "29":"y X"
    },
    "ios_3�b":{
      "3.22:"n",
      "4.0-4.1":"l",
 (    "4.2-$.3":"n",
`     "5.0-5.1":"n",
      "6.0-6.1":"n",
     3.0-7.1"8"q x",
 $    "8":"y hb,
"     "8.1-8.3":"y x"
�   },
 �  "op_mink":{
      "5.0-8.0":"y"
$`$!},
    "andro)d":;
      "2.1":"N",
      "2.:":n",
      "�3":"n",
      "s":"n",
      "4":"n",
 0    "4.1":"n#,
      "4.2-4.3":"n",
 "    "4.">"y x",  (   "4*4.3-4.4*4":b9 x"-
      "40"2"y y"
 $  },
    "bb":{
  0   "7":"u",
 (    "10":"y x"
    },�    "op_mob":{
      "10":"u",
 (    "11":"y",
      "11.1":"y",
      "11.5":"�",
      "12":"y".
    $ "12.1":�y",
      "24"2"y x"
!   },
    "and_chr":{
     #41&:"y x"
    },
   ""and_ff":{
  `   "36":"y2J    },
    "ie?mob":{
 "    "10":"n*,*  0   "11":�n"
    },
    "and^uc":{
      ").9":"n"
 $  |
  },
  "notes":"",
  notes_by_num":{
!   
  },
  "usage�perc_qb:73>29,
  "usage_perc_a":0,
  "Ucprefix":falsa,
  "parenu":"",
  "keiwo2ds":"box-de#or`tion,jox decopatiml,break",
  "ie_id":"",
  "chro%e_id":"",
  "�hown":t�ue
}
},{],63:[function(requi2�,moDule,ex�orts){
moduhe<exports=s  "title"""CSS3 Box-shadnw",
  "descriptiOn":"MeTho` of displAying an inner or outer sha$ow �ffect to e�ement{",
  "spec":"http://www.s3.mrg-TR/css3-backgrOund/#box-s`adow",
 ""status":*cr",
  "links":[
    y
      "url"*"hvtps://develop�r.mozilla.org/En/CSS/-mwz-box-shadow*,
  $   "title":"MDN article"
    },
    {
�     "url":"jttp:/�westciv.cgm/$ool{boxshadow3?index.html"$J      "tivle":"Live editor"
   "},
"   {      "u2l":"(ttp://tests.themasta.com/bloGstuff/boxs`a$owdemo,html",
    � "tivle":"Demo of vqrits uffectc"*    },
    {
 0    "urh":"http://www.css�filer.com/shadow/",
    � "title":"Inforeation pag�"
    },
    {
   $  "}rL":"http://docs.webplatform.org/wiki/css/0Ropert)es/box-shadow"-
  `   "titnm":"W%bpd!tfnzm Docs
    }
  ],
  #bugs"*[
    {
$    ""descrip4ion":"Safar) 6, iOS�6 and Android 2.3 de&ault browser dont work with q 0px`value for X"blur-radius^".\r\na.g, `-webkit-boy-3hados: 5p�`1px 0px 1Px #f04e29;`\r\nfoesn't work, But\�\n`-webkit-box-shadosz 5px 1px 1px 1px #f04e29pLr^ndoes."
    }
  ],
 "*categories":[
    "CSS;"
  ],
� "st�ts":{
    �ie":s
 !    "5�5":"n",
      "6":"n",
 !    "7"{"n",
   �  "8":"n",
(" !  "9"z"y",
   0  "10":"y",
      "11"2"y",
   (  "TP":"y"
    u, "  "fireFox":{
      "2":"n",
"    `"3":"n",
     0"3.5":"y x",
      "3.>": y x",
! ( ( "4":*y",
 $    "5"z"Y"<
      "6":"y",
      "7":"y",
      "8":"y",
 `    "9": y",
      "!4":"y",
    ( "17":"y",
 0    "12":by",
 (    "13":"y",
      "14":"y",
      "15":"y",
  `   "1>":"y",
      "17":"y",
      �18":"{",
      "19":"y",*      "20":&y",
"     "21": y",
     (22":"y"-
      "23":"y#,
  $   "24:"y",
0     ":5":"y",
     ""26":"y",
 �  � "27":"y",
      "28":"y",
      "29":"y",J     ("30":"y",
  ""  "31":"y ,
 $    "32":"y",
      "33":"y",
` $   *34": y",
      "35":"y",
      "36""y",
      &37":"y",
      "38":"9",
!     "39":"y",
      "40":#y"
    },
!   "chrome":{
   "  "4":y x",
      "%":"y(x",
   $  "6":"y x",
      "7""y x,
      b8":"y x",
      "9":"y x�,
      "10":"y",
     �01":"y",
      "12":"y",
 !    "13":"y ,
     ("1�":"y",�      "15":"y",0 $   "16":"y#,
      "!7":"y",
      "38":"Y",J  �   "19":&i",
 #  4 ":�":"y2,
 $$  �"31&>*h",
` 0   "21�"y2<      "23":*}b,
      "24"*"y",
 $    "25":"y",
      "26":"y",
�     "27":"y"�
     0"28""y"*
   ! ""29":"y",
      "30":"x,
      "31":"y",
      "22":"y",
      "33 :by2,
  "  034":"y",
     0 35":"y",
  (   "37":"y",
   0 ""37":"y",
      "38#:"yb,
 (    "39":"y <
      �41":"i",
      "41":"y",�"     "42":"y",
      "43":"{",
      "44":"y"
    },
   $"�afiri":{
      "3/q":"a x",
  (`" "3.2">"a xb-
    0 "4">"a�X",J      "5":"y x",
 (    �5.1b;"y2,
  (   "6 :"y",�      ">n1":"y",
    ( "7":"y".
      "7.1":"y",  �   "8":"y"
    }(
    "opera":{
      "9":#n",
      "9.5-9.6":"n",
      "10.0-10.0":"n@,
  !`` "10.5"2"Y"," "   b10.6":y",
     ""11":"i",
      "11.1#:y#,
    " "11.5":"y",      "11.6":"y"$
      "12":"y",
 �`   "2.1":"y",
      "35":"y",
      "16":"y".
      "17":"y",
   "  "10":"y",
      "09":"y",
   0  "20&:"y",
      "21�:"y,
      "02":"y",
      "23":"x",J      "24":"y",
      "25":"y",
      "26":"yb,
      "2�":"y",
      "28":&y",
      �"9":"y"
`   =,
    "ioS_saf":{
      "3.2":"c x",
     $"4.0-4.1":by x",
     `"4>�-4.3":"y x",
      "5.0-5.1":"y",
 !    "4.�-6.1":"y",
    0 "7.0-7.1":"y",
      "8":"y"l
      "8.1-8.3&:"9"
0   },
    "op_mini�{
      "5.0-8.0*:"n"
    }, $$ "dndroid":{
$     "2.3�:"a x"<
      "2.2":a x",J      "2.3":"a x",
      "3":"a y",
 0    "4":"y",
      24.� �"y",
   "  "4.2-5.3":"y",
 �    "4.4":"m",
      "4/4.3-4.4.4":"y",
      "40":"y"
(   ],
    "bb":{K      "72:"y x",
  $   "10":2y"
    y,
(   "op_mo`":{
  0   "10"�"n",
"  "  "11":"y",
      "11.5":jy",
      "11.5":"y",
      "12:"y",*      "12/1":"y",J      "24":"y"
 0$ },
    "and_c�r :{
      "41":"y"
    },
�(  "and_ff":{
  0   "36*:"y"
    },
 `  "ie_mob*:{
   !  "10":"y",
      "11":"Y"
  " },�    "and_uc":{
    $ "9.9"8"y"
    }
  },
  "noteS":Ban be(partiq.ly emulated(in older IE0versaons u3�ng the non-standar`"T"shafow\" filter. Partial supporu )n$Sa��Ri< iOS Sabarh and Android BrOwser refers to missing \"iosuu\", blur redius value, and multkple shadow support.",  "notes_by_num":y
  $   },
  "us`'e_percy":91.68,
0 busage^perc_a80.17,
  "ucpr%fix":false,
  "papent":"",
  "keyword�":2box-shadows,bnxshadowc,box shadow,shaow",
  "ie_Id":"".
  "chrome_id�:"",
" "sh�wn":true
}
},s}],64:�fuNction(req}ire,modw|e,exports){
m�du|e.e|port�={
  "title":"Crisp edges/pixelated Imaoes",
  "descript)on":"Forces image3 to be"scaled with an ahgorithm |hqt preserves contrast and edoes in the image, without smoOvhing colors or intrduce blu~. This is$intended for(im!g%s �uch as pixel arT.`Official values that accomplirh tlis for the bimage-r%nddr�ng` `roqerty ere `crisp-edfesa`and `pixelatmd`.",
  stec": http://dev.W3*org/csswg/css-images-3/#valdef-image-rendering-crmsp-edces",
  "status":"unoff ,
  "li�k3":[
    {
      "url*:https:'/develo�gr.mozilla.org/en-�S/locs/Web/CSS/i-age-rendezing",      "4)tle":"MD� a�ticlm
    },
    {
  !   "url#: http2?'updates.ht�m5rocks.com?2015/01/phxelated",
      "tit�e":"iTML5Ro�ks article"
    }
  ],
  "bu's#:Z
    {
      "description":"`�mage-renlering:-webjid-oPtmmize-contraqt7` and `-ms-inte�pglation-mode:neasest-nEighbora do not affect CSs images"
    }
  ].
  "ca�agozieS":[
 ( �"CCS",
    "CSS2"
0 ],
" �statr":{
    "ie#:{
      "5.5":bn"$
      "6""n",
      "7":"ab8 #2,J      "8":"a x #2",
 � `  "?":"a x #2".
  �   "10":"a x #2",
      "11":"a x #2",
      "TP":*a x #2"
0   },
    "fIrefx":{
      "2b:#n",
  ""  "3:"~,
  0   "s5":*n",
  $   "3.6&:2y x #3",
      "4":"y p c3"l
      "5�:y y0#3",
      "6":"y � #3",
      "7":"y x #3",
    ! "8 :"y x #3",
!     "9":"{$x!#3",
   0  "10":"y x #3",
      "11"22y x #3",$ $   "1�""i x #3b,
      "13":"y x #3",
 0    "14":"y!x #3",
   �  "q5":"y x 33",
      "16":"y x #3",
      "!3":"y x!#3",
      "18":"y x #3"$      "19"z"y x #3",      "20":"y x #3",
      "21b:"y x #s",
      "22":"y x #3",
      "23":"y x #3",
      "24":"y y(#3",
      "25":"y x #�",
      "26":"y x "3",�  $0 $"25":} | #1&,
      "28":"q x #3",
      "29":"y x #3",
      "30":"y x #3",
      "31":"y x #3",
      "32":"y x #3",
      "33":"y x #3",
      "34":"y x #3",
      "35":"y x #3",
      "36":"y x #3",
      "37":"y x #3",
      "38":"y x #3",
      "39":"y x #3",
      "40":"y x #3"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"y #4",
      "42":"y #4",
      "43":"y #4",
      "44":"y #4"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"a x #1",
      "6.1":"y x #3",
      "7":"y x #3",
      "7.1":"y x #3",
      "8":"y x #3"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"y x #3",
      "12":"y x #3",
      "12.1":"y x #3",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"y #4",
      "29":"y #4"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"a x #1",
      "6.0-6.1":"a x #1",
      "7.0-7.1":"y x #3",
      "8":"y x #3",
      "8.1-8.3":"y x #3"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "40":"n"
    },
    "bb":{
      "7":"n",
      "10":"a x #1"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"y x #3",
      "12.1":"y x #3",
      "24":"n"
    },
    "and_chr":{
      "41":"y #4"
    },
    "and_ff":{
      "36":"y x #3"
    },
    "ie_mob":{
      "10":"a x #2",
      "11":"a x #2"
    },
    "and_uc":{
      "9.9":"a x #1"
    }
  },
  "notes":"Note that prefixes apply to the value (e.g. `-moz-crisp-edges`), not the `image-rendering` property.",
  "notes_by_num":{
    "1":"Supported using the non-standard value `-webkit-optimize-contrast`",
    "2":"Internet Explorer accomplishes support using the non-standard declaration `-ms-interpolation-mode: nearest-neighbor`",
    "3":"Supports the `crisp-edges` value, but not `pixelated`.",
    "4":"Supports the `pixelated` value, but not `crisp-edges`."
  },
  "usage_perc_y":51.81,
  "usage_perc_a":18.47,
  "ucprefix":false,
  "parent":"",
  "keywords":"image-rendering,crisp-edges",
  "ie_id":"",
  "chrome_id":"5118058116939776",
  "shown":true
}
},{}],65:[function(require,module,exports){
module.exports={
  "title":"CSS Device Adaptation",
  "description":"A standard way to override the size of viewport in web page, standardizing and replacing Apple's own popular <meta> viewport implementation.",
  "spec":"http://www.w3.org/TR/css-device-adapt/",
  "status":"wd",
  "links":[
    {
      "url":"https://dev.opera.com/articles/view/an-introduction-to-meta-viewport-and-viewport/",
      "title":"Introduction to meta viewport and @viewport in Opera Mobile"
    },
    {
      "url":"http://msdn.microsoft.com/en-us/library/ie/hh708740(v=vs.85).aspx",
      "title":"Device adaptation in Internet Explorer 10"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"a x #1",
      "11":"a x #1",
      "TP":"a x #1"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"n",
      "42":"n",
      "43":"n",
      "44":"n"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"n",
      "7":"n",
      "7.1":"n",
      "8":"n"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"n",
      "8.1-8.3":"n"
    },
    "op_mini":{
      "5.0-8.0":"a x #2"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "40":"n"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"a x #2",
      "11.1":"a x #2",
      "11.5":"a x #2",
      "12":"a x #2",
      "12.1":"a x #2",
      "24":"n"
    },
    "and_chr":{
      "41":"n"
    },
    "and_ff":{
      "36":"n"
    },
    "ie_mob":{
      "10":"a x #1",
      "11":"a x #1"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"IE only supports the 'width' and 'height' properties.",
    "2":"Opera Mobile and Opera Mini only support the 'orientation' property."
  },
  "usage_perc_y":0,
  "usage_perc_a":12.78,
  "ucprefix":false,
  "parent":"",
  "keywords":"viewport",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],66:[function(require,module,exports){
module.exports={
  "title":"CSS Filter Effects",
  "description":"Method of applying filter effects (like blur, grayscale, brightness, contrast and hue) to elements, previously only possible by using SVG.",
  "spec":"http://www.w3.org/TR/filter-effects/",
  "status":"wd",
  "links":[
    {
      "url":"http://html5-demos.appspot.com/static/css/filters/index.html",
      "title":"Demo file for WebKit browsers"
    },
    {
      "url":"http://www.html5rocks.com/en/tutorials/filters/understanding-css/",
      "title":"HTML5Rocks article"
    },
    {
      "url":"http://dl.dropbox.com/u/3260327/angular/CSS3ImageManipulation.html",
      "title":"Filter editor"
    },
    {
      "url":"http://bennettfeely.com/filters/",
      "title":"Filter Playground"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS",
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "TP":"n d #2"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"a",
      "4":"a",
      "5":"a",
      "6":"a",
      "7":"a",
      "8":"a",
      "9":"a",
      "10":"a",
      "11":"a",
      "12":"a",
      "13":"a",
      "14":"a",
      "15":"a",
      "16":"a",
      "17":"a",
      "18":"a",
      "19":"a",
      "20":"a",
      "21":"a",
      "22":"a",
      "23":"a",
      "24":"a",
      "25":"a",
      "26":"a",
      "27":"a",
      "28":"a",
      "29":"a",
      "30":"a",
      "31":"a",
      "32":"a",
      "33":"a",
      "34":"a d #1",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y x",
      "44":"y x"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"y x",
      "4.4.3-4.4.4":"y x",
      "40":"y x"
    },
    "bb":{
      "7":"n",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "24":"y x"
    },
    "and_chr":{
      "41":"y x"
    },
    "and_ff":{
      "36":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"Note that this property is significantly different from and incompatible with Microsoft's [older \"filter\" property](http://msdn.microsoft.com/en-us/library/ie/ms530752%28v=vs.85%29.aspx).\r\n\r\nPartial support in Firefox before version 34 [only implemented the url() function of the filter property](https://developer.mozilla.org/en-US/docs/Web/CSS/filter#Browser_compatibility)",
  "notes_by_num":{
    "1":"Supported in Firefox under the `layout.css.filters.enabled` flag.",
    "2":"Supported in Project Spartan under the \"Enable CSS filter property\" flag. Supports filter functions, but not the `url` function."
  },
  "usage_perc_y":73.76,
  "usage_perc_a":2.66,
  "ucprefix":false,
  "parent":"",
  "keywords":"sepia,hue-rotate,invert,saturate",
  "ie_id":"filters",
  "chrome_id":"5822463824887808",
  "shown":true
}
},{}],67:[function(require,module,exports){
module.exports={
  "title":"CSS Gradients",
  "description":"Method of defining a linear or radial color gradient as a CSS image.",
  "spec":"http://www.w3.org/TR/css3-images/",
  "status":"cr",
  "links":[
    {
      "url":"http://www.colorzilla.com/gradient-editor/",
      "title":"Cross-browser editor"
    },
    {
      "url":"http://www.css3files.com/gradient/",
      "title":"Information page"
    },
    {
      "url":"http://css3pie.com/",
      "title":"Tool to emulate support in IE"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/functions/linear-gradient",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y",
      "11":"y",
      "TP":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"y x",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"a x",
      "5":"a x",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"a x",
      "11.5":"a x",
      "11.6":"y x",
      "12":"y x",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y"
    },
    "ios_saf":{
      "3.2":"a x",
      "4.0-4.1":"a x",
      "4.2-4.3":"a x",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"a x",
      "2.2":"a x",
      "2.3":"a x",
      "3":"a x",
      "4":"y x",
      "4.1":"y x",
      "4.2-4.3":"y x",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "40":"y"
    },
    "bb":{
      "7":"a x",
      "10":"y"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"a x",
      "11.5":"a x",
      "12":"y x",
      "12.1":"y",
      "24":"y"
    },
    "and_chr":{
      "41":"y"
    },
    "and_ff":{
      "36":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"Syntax used by browsers with prefixed support may be incompatible with that for proper support. \r\n\r\nPartial support in Opera 11.10 and 11.50 also refers to only having support for linear gradients.\r\n\r\nSupport can be somewhat emulated in older IE versions using the non-standard \"gradient\" filter. \r\n\r\nFirefox 10+, Opera 11.6+, Chrome 26+ and IE10+ also support the new \"to (side)\" syntax.",
  "notes_by_num":{
    
  },
  "usage_perc_y":89.71,
  "usage_perc_a":0.45,
  "ucprefix":false,
  "parent":"",
  "keywords":"linear,linear-gradient,gradiant",
  "ie_id":"gradients",
  "chrome_id":"5785905063264256",
  "shown":true
}
},{}],68:[function(require,module,exports){
module.exports={
  "title":"CSS Hyphenation",
  "description":"Method of controlling when words at the end of lines should be hyphenated using the \"hyphens\" property.",
  "spec":"http://www.w3.org/TR/css3-text/#hyphenation",
  "status":"wd",
  "links":[
    {
      "url":"https://developer.mozilla.org/en/CSS/hyphens",
      "title":"MDN article"
    },
    {
      "url":"http://blog.fontdeck.com/post/9037028497/hyphens",
      "title":"Blog post"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/hyphens",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y x",
      "11":"y x",
      "TP":"y x"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"n",
      "42":"n",
      "43":"n",
      "44":"n"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"y x",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "40":"n"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "24":"n"
    },
    "and_chr":{
      "41":"n"
    },
    "and_ff":{
      "36":"y x"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"a x"
    }
  },
  "notes":"Chrome 29- and Android 4.0 Browser support \"-webkit-hyphens: none\", but not the \"auto\" property. Chrome 30+ doesn't support it either. It is [advisable to set the @lang attribute](http://blog.adrianroselli.com/2015/01/on-use-of-lang-attribute.html) on the HTML element to enable hyphenation support and improve accessibility.",
  "notes_by_num":{
    
  },
  "usage_perc_y":32.23,
  "usage_perc_a":4.25,
  "ucprefix":false,
  "parent":"",
  "keywords":"hyphen,shy",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],69:[function(require,module,exports){
module.exports={
  "title":"CSS Logical Properties",
  "description":"Use start/end properties that depend on LTR or RTL writing direction instead of left/right",
  "spec":"http://dev.w3.org/csswg/css-logical-props/",
  "status":"unoff",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-margin-start",
      "title":"MDN -moz-margin-start"
    },
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-padding-start",
      "title":"MDN -moz-padding-start"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS",
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "TP":"n"
    },
    "firefox":{
      "2":"n",
      "3":"a x #1",
      "3.5":"a x #1",
      "3.6":"a x #1",
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1",
      "40":"a x #1"
    },
    "chrome":{
      "4":"a x #2",
      "5":"a x #2",
      "6":"a x #2",
      "7":"a x #2",
      "8":"a x #2",
      "9":"a x #2",
      "10":"a x #2",
      "11":"a x #2",
      "12":"a x #2",
      "13":"a x #2",
      "14":"a x #2",
      "15":"a x #2",
      "16":"a x #2",
      "17":"a x #2",
      "18":"a x #2",
      "19":"a x #2",
      "20":"a x #2",
      "21":"a x #2",
      "22":"a x #2",
      "23":"a x #2",
      "24":"a x #2",
      "25":"a x #2",
      "26":"a x #2",
      "27":"a x #2",
      "28":"a x #2",
      "29":"a x #2",
      "30":"a x #2",
      "31":"a x #2",
      "32":"a x #2",
      "33":"a x #2",
      "34":"a x #2",
      "35":"a x #2",
      "36":"a x #2",
      "37":"a x #2",
      "38":"a x #2",
      "39":"a x #2",
      "40":"a x #2",
      "41":"a x #2",
      "42":"a x #2",
      "43":"a x #2",
      "44":"a x #2"
    },
    "safari":{
      "3.1":"a x #2",
      "3.2":"a x #2",
      "4":"a x #2",
      "5":"a x #2",
      "5.1":"a x #2",
      "6":"a x #2",
      "6.1":"a x #2",
      "7":"a x #2",
      "7.1":"a x #2",
      "8":"a x #2"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"a x #2",
      "16":"a x #2",
      "17":"a x #2",
      "18":"a x #2",
      "19":"a x #2",
      "20":"a x #2",
      "21":"a x #2",
      "22":"a x #2",
      "23":"a x #2",
      "24":"a x #2",
      "25":"a x #2",
      "26":"a x #2",
      "27":"a x #2",
      "28":"a x #2",
      "29":"a x #2"
    },
    "ios_saf":{
      "3.2":"a x #2",
      "4.0-4.1":"a x #2",
      "4.2-4.3":"a x #2",
      "5.0-5.1":"a x #2",
      "6.0-6.1":"a x #2",
      "7.0-7.1":"a x #2",
      "8":"a x #2",
      "8.1-8.3":"a x #2"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"a x #2",
      "2.2":"a x #2",
      "2.3":"a x #2",
      "3":"a x #2",
      "4":"a x #2",
      "4.1":"a x #2",
      "4.2-4.3":"a x #2",
      "4.4":"a x #2",
      "4.4.3-4.4.4":"a x #2",
      "40":"a x #2"
    },
    "bb":{
      "7":"a x #2",
      "10":"a x #2"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "24":"a x #2"
    },
    "and_chr":{
      "41":"a x #2"
    },
    "and_ff":{
      "36":"a x #1"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"a x #2"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Only supports the *-start, and *-end values for `margin`, `border` and `padding`, not the inline/block type values as defined in the spec.",
    "2":"Like #1 but also supports `*-before` and `*-end` for `*-block-start` and `*-block-end` properties as well as `start` and `end` values for `text-align`"
  },
  "usage_perc_y":0,
  "usage_perc_a":79.96,
  "ucprefix":false,
  "parent":"",
  "keywords":"margin-start,margin-end,padding-start,padding-end,border-start,border-end,inline-start,inline-end,block-start,block-end",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],70:[function(require,module,exports){
module.exports={
  "title":"CSS Masks",
  "description":"Method of displaying part of an element, using a selected image as a mask",
  "spec":"http://www.w3.org/TR/css-masking/",
  "status":"cr",
  "links":[
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/mask",
      "title":"WebPlatform Docs"
    },
    {
      "url":"http://www.html5rocks.com/en/tutorials/masking/adobe/",
      "title":"HTML5 Rocks article"
    },
    {
      "url":"http://thenittygritty.co/css-masking",
      "title":"Detailed blog post"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "TP":"n"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"a",
      "3.6":"a",
      "4":"a",
      "5":"a",
      "6":"a",
      "7":"a",
      "8":"a",
      "9":"a",
      "10":"a",
      "11":"a",
      "12":"a",
      "13":"a",
      "14":"a",
      "15":"a",
      "16":"a",
      "17":"a",
      "18":"a",
      "19":"a",
      "20":"a",
      "21":"a",
      "22":"a",
      "23":"a",
      "24":"a",
      "25":"a",
      "26":"a",
      "27":"a",
      "28":"a",
      "29":"a",
      "30":"a",
      "31":"a",
      "32":"a",
      "33":"a",
      "34":"a",
      "35":"a",
      "36":"a",
      "37":"a",
      "38":"a",
      "39":"a",
      "40":"a"
    },
    "chrome":{
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"a x",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"a x",
      "22":"a x",
      "23":"a x",
      "24":"a x",
      "25":"a x",
      "26":"a x",
      "27":"a x",
      "28":"a x",
      "29":"a x",
      "30":"a x",
      "31":"a x",
      "32":"a x",
      "33":"a x",
      "34":"a x",
      "35":"a x",
      "36":"a x",
      "37":"a x",
      "38":"a x",
      "39":"a x",
      "40":"a x",
      "41":"a x",
      "42":"a x",
      "43":"a x",
      "44":"a x"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"a x",
      "5":"a x",
      "5.1":"a x",
      "6":"a x",
      "6.1":"a x",
      "7":"a x",
      "7.1":"a x",
      "8":"a x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"a x",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"a x",
      "22":"a x",
      "23":"a x",
      "24":"a x",
      "25":"a x",
      "26":"a x",
      "27":"a x",
      "28":"a x",
      "29":"a x"
    },
    "ios_saf":{
      "3.2":"a x",
      "4.0-4.1":"a x",
      "4.2-4.3":"a x",
      "5.0-5.1":"a x",
      "6.0-6.1":"a x",
      "7.0-7.1":"a x",
      "8":"a x",
      "8.1-8.3":"a x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"a x",
      "2.2":"a x",
      "2.3":"a x",
      "3":"a x",
      "4":"a x",
      "4.1":"a x",
      "4.2-4.3":"a x",
      "4.4":"a x",
      "4.4.3-4.4.4":"a x",
      "40":"a x"
    },
    "bb":{
      "7":"a x",
      "10":"a x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "24":"a x"
    },
    "and_chr":{
      "41":"a x"
    },
    "and_ff":{
      "36":"a"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"a x"
    }
  },
  "notes":"Partial support in WebKit/Blink browsers refers to supporting the mask-image and mask-box-image properties, but lacks support for other parts of the spec. Partial support in Firefox refers to only support for inline SVG mask elements i.e. mask: url(#foo).",
  "notes_by_num":{
    
  },
  "usage_perc_y":0,
  "usage_perc_a":79.91,
  "ucprefix":false,
  "parent":"",
  "keywords":"",
  "ie_id":"masks",
  "chrome_id":"5381559662149632",
  "shown":true
}
},{}],71:[function(require,module,exports){
module.exports={
  "title":"Media Queries: resolution feature",
  "description":"Allows a media query to be set based on the device pixels used per CSS unit. While the standard uses `min`/`max-resolution` for this, some browsers support the older non-standard `device-pixel-ratio` media query.",
  "spec":"http://www.w3.org/TR/css3-mediaqueries/#resolution",
  "status":"rec",
  "links":[
    {
      "url":"http://www.w3.org/blog/CSS/2012/06/14/unprefix-webkit-device-pixel-ratio/",
      "title":"How to unprefix -webkit-device-pixel-ratio"
    }
  ],
  "bugs":[
    {
      "description":"Project Spartan technical preview has a bug where `min-resolution` less than `1dpcm` [is ignored](http://jsfiddle.net/behmjd5t/)."
    }
  ],
  "categories":[
    "CSS",
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"a #1",
      "10":"a #1",
      "11":"a #1",
      "TP":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"a #2",
      "3.6":"a #2",
      "4":"a #2",
      "5":"a #2",
      "6":"a #2",
      "7":"a #2",
      "8":"a #2",
      "9":"a #2",
      "10":"a #2",
      "11":"a #2",
      "12":"a #2",
      "13":"a #2",
      "14":"a #2",
      "15":"a #2",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"a x #3",
      "5":"a x #3",
      "6":"a x #3",
      "7":"a x #3",
      "8":"a x #3",
      "9":"a x #3",
      "10":"a x #3",
      "11":"a x #3",
      "12":"a x #3",
      "13":"a x #3",
      "14":"a x #3",
      "15":"a x #3",
      "16":"a x #3",
      "17":"a x #3",
      "18":"a x #3",
      "19":"a x #3",
      "20":"a x #3",
      "21":"a x #3",
      "22":"a x #3",
      "23":"a x #3",
      "24":"a x #3",
      "25":"a x #3",
      "26":"a x #3",
      "27":"a x #3",
      "28":"a x #3",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"a x #3",
      "5":"a x #3",
      "5.1":"a x #3",
      "6":"a x #3",
      "6.1":"a x #3",
      "7":"a x #3",
      "7.1":"a x #3",
      "8":"a x #3"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"a x #3",
      "10.0-10.1":"a x #3",
      "10.5":"a x #3",
      "10.6":"a x #3",
      "11":"a x #3",
      "11.1":"a x #3",
      "11.5":"a x #3",
      "11.6":"a x #3",
      "12":"a x #3",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",     ""28"z"y",
  "!  "29":2y"
    },
    "ios_sad":{
      "3*2":"} ,
   $$ "4.0-41":"a x #3",
    � "$.2-4.3":"a x #3",
    ! "5.2-5.1#: a X *s",
      "6.1-�.1":"a x!#3"-`     "7.0-7.1":"a x #3",
 h    28":"a x #7",
   (  "8.-8.3#:ba!x #3"
    },
    "op_mini":{
      "5.0-8/0":"a #!"
    },
    "endroi�":{
  $ � "2.1":"u",
      "2.2":"u",
      "2.3":"u",
      "3":"u",
`     "4":"a x #3".
  $    4.1&:"a z #3",
�     "4.2-4.3":"a X #3"(
   "  "4.4"*&y",
      "4.4.3-4.4n6":"y#,
      "40":"y"
    },
   ("bb":{ "    "7":"a x #7"�
   `  "30 :"a x #3*
   �},
    "op_mob":{
      "10";"u",
  (   "11":"u",
 �    "11.1":"5",
      "11.%":"u,
      "12":"U",
      "12.�":by2,
 �� `  24":"y"
    },
    "and_chw":{
      "41":"y"
    },
    "and_nf":{
      "36":"y"
0�  },
    "ie_mob":{
 !0   "10":"a #0 ,
      "11":"a #1"
    },
    "andOuc">{
      "9.9":2a x #3 
    }
  },
  2notes":"",  &notes_bY_num":{
    "1":*Supports$the `dpi`"unmt� bUd do�s nt suppkrt @dppx` n� `d`cm` units.",
    "2":"irefox "e�ore 16 supports ojly `dpi`$unit, but you can set `2dppx` per `mmn--mo~-deracepixel-zatio: 2`",*    "3":"Suppor| vhe non-s|andard `minp/`max-de~ice-pixel-ratio`",
    "42:"SUpport the ngn-standard `min /`max-D%vi�e-pixel-ratio`"
  },0 "u3a'e_perc_y"zw1.17,
 ("usage_perc_q"�3�n39,
` "u#prgfix":falce,  "pa2ent":"csk-mediaquer�es",  "keywOrds":2@ledia,eevice-0ixel-ratio,rd{olutaon",
0 "ieYid":&mediaqueriesresoLuvionfeature,ep�xunktf/rtheresodutionm%diaquery", "chrome]id":"5944� 961557�94t",�d "sjkwn":true
}
},{}_,72:[function�require,module,expo�ts){
mkdule.expovts={
` "title":":placeholder-w`own CSS pseuho-class",
  "descryption":"The :TLaceholder)shown psEudo-c,ass rEpresents a fgrm element with vi�i"le p,aceholder contents.",
  "spuc":"http2//www/w3.org/TR/selector�4/#placeholder",
  "stAtus":"wd",
  "liocs#:�
    {
      "}rl":"httpz//msdn.microsoft.com/en-us+libr!ry/ie/hx7727�5(v=vs.85).as`x",
     "�)tle":"MSDN art+cle"
 !  g,
   "{
   !  "url":"http://css-tricks&com/snippetw/css/stYlE-plabeholder-text/".
      "tmtle":"CSC-Tricks arpicle with all pvmfixes 
    },J`   {
      "usl":"htu0://wiki.csswG.org/ide!s/plagehlder-styling#,
      "dmtlw"�"CSSWG disc}swion"
    }
$ ],
  bUgs :[
   `
  ],
  "cateeorius":[
    "CSS2
 "],
  "#tats":{
  " "ie#:{
      "5>5":"n",
      26":&n"(
      "7":"n",
      "8":"n",
      "9":"n#$
   ! `"10&:"a x",
 `    "1�":"a x",
      "P":&a x"
    },    "firEfox"8{
      2":"n",
      "#":"n#,
    0 "3.5":"n",
      "3.6"�"n"-
  !  ("4":"a x*,
      "5""a x",
   �  "4": x"l�      "3*"q x",
� 0   "8"*"a x",
      b9b:"a x",
$     "10":"a x",
      "11�: a x*,
      "12":"a x",
      "13":"a x",
      "1<":"a x",
 �    "15":"a y",   !� "1>":"a x",
 (    "17":"a x"-
      "18
:"a x",
      "19":"a x"-
$!    20":"c p",     �"2":a x,
      "22">"a x"l
 0    "23.:2a h",
     ""24":"a x",
      "25":"a x",
      66"<"a X"�  0   "27":"a x",
      ""8":#a y"
!0    "29":"a x",
  `   "30"~"a x",
      "31":"a x ,
(  0  "32":"a x",
      "3":"a"x",
      "#4":"a x"�
   "0 "35":"a x"-
  !   "36":"a x",
      "37":"a x",
      "38":"a x",
      "3":"a x",
   �!(`40":ba |"J    },
   `"chsomej:{
 $    "4""a x",
  "   "5":"a x",
   "  "&":"a�x", �  ` 7":�a x",
      "8"�ba x"-
    "  9:"a x",
  00  "10":"a z",
      "31":"a x",
 $  � "12#:"a x#,
     ("13":"a x",
      "14":"a x",
   `  "15":"! x",
      "16":"! x",      "17":a x",
 (   $"!8":"a x"
      "19":"� x"(�      "00":"q 8",
$     21&8"a x",
      "22":"a x",*      "23""a x",!     "r4":"a x�,
     ("25":"a x",
       26":"a"x",J)!  " "27":"a x",
(     "29":"e x",
      "29b:"a y�,
   $  "70":"a x",
!    `"31";"a x",      "�2""a x",
      "33":"a x,
   (  "34":"a x",
      "35":�c x",0    0"3>":"a x",
   (  "37":*a x",
   0  "3(":"a x"�
      "39":"a x",
      b40":"i y",
(     b41b:"a x"&
      "4:":"a x",
      "43">"a x",
0`    "t4":"a x"
    },
  0 "safari":{
      "3.1":"n",
      #3.2#:"n",
  �   "4":"n",
  "   "5":"a x",
   !  "5.1 "a x",
   ! !"6"2"a x",
      "7>1"�"e |".
  0   "7":"a x",
  $"$ "7.1":"a�h"(  �   "8":"a0x"
 "� }, !" #gpera":s
   �  *":#f",
 (    "9.5-9.&":"n",
      "10- -1�>1":�n",
      "10.5":"n".
      "90.6"�n,
  $( !"11":"n",
      "11.q": n",
      "11.5":"~",
      51.6":&n",
     "�12":"n",
 �    "12.1":"n",
0     "97":"` 8"�      "1:"a%x",
      "17":"a x",
!     "18":"a x",
      "19"("` x",
 `    b22":"a x",
  !   "21":*a x",
      "22":"a x",
  $   "23f8*e X�,
      "24b:"a �",      &25":i0x",      "26":"a x",
 0    "27�:"� x&,
$     "28":"a x",
  `   "29":a x"
    },
    "ioq_saf":{
      "3.2"*"nb,
     $"4&0-4.1"2n",
      "6.2-4.3":"� x",
      "5.0-5.1":"a x�,
"    !"6.0-6.1":ba`x",
   (  "7.0-7.1": a x",
      "8"2"a x",
� $   "8.1-(.;":"a"y 
    },
    &oq_mini":{
      "5.0-�.0";"n"
    }
    "anDroid":{
   0 0"2.1"*"a x",
 ( 0  "0.2":&q x&,$     "2.3":"a x".
  !   "3"22s x�,
    ! "4":"a x"
      �4.1":"a x",
   "  "4.2=4.3�:"a x",
      "4.4":"a x",
  �   24.4.3-4.4.4": a x"<$     "40":"` x"
    },
    "bb":{*    ( *7"�"u", $    "10":*q"x"
    },
!   "op_m�b&z{
      "10":"n",
$     "11": n",
      "11.1":"."
 $    "10o5":"n",
      "12":"j",      "12,1":"n",
      "�4:"a x"
    },
(   "and_chr"{
      "41":"a x"
    },
    "and_b�":{
      "3>#:"a x"
  ! },
    "ie_mob":{
   �  "10":"a x",
      "11":"a x"
    },
!  ""and_ub":{
      "9.9":"a x"
    }
  },
  &notas"�"Partial sepport refdrs to$st`port for styling just �he xlacehlder�text, rather than The abtUal element itself2 `::-gebki�-inpu|-plac�hOlder` (ChrOmu/SafirinOrera),\r\j`::-moz-placeholdeb` (FirefOx) and \r\n`:
    
  },  "usage_perc_y"20,
  "usage_perc_a*:89.>7,
  "ucprefix":felse,
  "pareft":�",*  "kaywords":"::placeholder,placeholder",
  "ie_id":"#,
  "chrome_id":"",
  "slown":trwe
}
},�}],73:Zfunctionhrequi2e,modu,E,exports)s
mndwle.expgr4s={
  "title":"::�e�estion CSS pseudo-eme}ent#,
  "description":"The ::selection CSS pqeudo-element2applies rules to the portign of a doc�ment�thau has baen higilIghted (e.g., selected wmth the mouse oraanoThez pointmng device) `y the User.",  "spec":#http://www.w3.org/TR/�ss-pseudk-4/#selecTorde&-selecthon",
  "wtatus*:"u`",
  lknks":[J    s
     `"url":"httt:'/quirksm/$e.ore/css/se�aatorc/selection.itml",
     0"title": ::selecpaon te{t"    },
    {
      "url"."htTp>//`oc3.wEbplatfo2m.org/wikI/cqs/selectors/pseu�o-al�ments/z:�electmo.",
  "   "titde":"UebPlatform �ncs*
   �}
  ],
  "bugs"8[
    
  ],
 $"ca|eGories":[
` ! *CwS"
  ],
  "qtats�8{
  � "ie":{
      "5.5":"n",
�   ( "6":"n",
      "7":"n",
      "8":"o",
     !"9":"y",
      11":"y",
 �    "01":"q",
      bTP":"y"
    },
    "&ipefox":{
      "2":"y x",0$    "3�:"y x",
      "3.u2:"� x",
     !"3.&":"y x",
      "4""y x"-      "5#:"y x�,
$   # "6":"y�x",
$  0  "w":"y x",
      "8":2y�x",
      "9":"y z",
      "10""y0x",
      "11":"y x",
      #12"y x*-     `"13&:"y x",
      "34":q x",  0  p"15":"y x",
      "16"�"{ x",
      "17":"y x",
     `"18":"y x",
      #19":"y$x ,
     ("20":"y x",
     b"21":"q 8".
  !   "2"2"ycx",
!  ` ` 23":"y x",
      "24":*y x",
      "05:"y x",!     &26":"y x",
`0    "27*;"y x�-
  �   "28":"h`x",
  $   "29":"y x",J    � "30**"y x",
  (   "31":"y x`,
 `    "32�:"y x",
     $"33":"y x",
   `  "�4":"y x",
      "35":"i x",
    $ "3v":"y X",
      "37":"y0x",
      "8":"y x",*  ! 0 "39":"y!x2l
    ! "40":"y x"
    },    "chr-me":{
      "<2"y"(
�     "5":�y",
     `"6":"y",J      "7":"y",
      "8":"x",      "9":"y",
      "�0:"y"-
$`    2!1": y",
      &12"�"y2-
      "1s":"y,
 (  $ "14":"y",
   !  "35":"y�,
  $   "16":"y�,
    ` "17":"9",
      b18":"y�(
      "19"{"q"l
      "00":"y",
      "21""y",
  !   "22":"y",
 0   `"23":"y",
   !  "24":#Y"
      "25#:�y",
      &26":"y",
 $    ""7*:"y",
      "28":&y ,
   $0 "�9":"y",
      "30":"y"-
       3 2""y"-
      "32":"y",
   `  "33":"i".
      "34":"y2,
      "3u*>�q ,
 $�  0"36":"y",
 "    "37":"y",
      "38":"{",
      "39":"y",
     �"40":"y",
�    `"41":"y",
 `    "42�:"y",
"�    43":"y",
      "45:"y*
  $ },
   ("safari":{
      "3.1"8"y",
 !    "3.2":"y&,
 $    "4":"y"<+   0  #5":"y�,
     `"5.1&:"q",
   0  �6":"i",
   �  "6.0":"y",
      "7":"y",
      "w.1";"y",
   $  &8":"ybJ    |,
    "/pera":{
    $ "8":"n�,�     (").5-9.6":"q",�      "10.�-98.1":"9",      "10.5:"y",
      "a0.6":"y",
!     "11":2y",
 !    "11.1":"y",
�     "11.5":"y",
    0 "01.6">"yl
  "   "12";"y",
      "12.1":"y",
    " "15":0y",
0     "1�":"y", 0 &  *17":"92,�      "1�":�y",
      "09"2�y&,
`     "20":"y2,
      "61":"y"�
      &22":"y",
 `    "23":"y",
     ""24":"q",
$     "2=":"y",
   �  "�6":"y",
 � 0  "27":"y",
  (   "28":"y",
      "29&:"y"
    },
    "iosOsaf":{      �3.2":"n",
   0  "4.0-4.1":"n",
      "4.2-4.3":"n",
   2  "5.0-5,1":"n",
      "6.0-.3": n",      "'.0-7.q":"n+,
  �   "8":"n", !    "x.1-8.3":"n"
    },
   b"op_mini":{
      "5.0)8.0":"n"
    },
    "an�soydb:{
      "2.1"8"n2,
      "2.2b:"n",
      "2.3":"l",      "3":"n",
   &  "4":"n",    0 "4."3"n",
      "6.2-4.�#�"l",
      "44�8"y",
      "4.4.3-4.5.4"z"�",
  !   "40":"y"
    y,
    "br"{
     ("7&:"n",
      "10":#y
    u,
    "op_mob":{      "10*:"u2,
      "11":"u",   $  "01.1":"u",
       11.5":"y",
     `�12":"y",
  0   "52,1":"y",
 `  " ":4b:"y"
  $ },
    "cndchr":{
      "41":y"
 �  }(J  ( "and_ff&:y
  0   "3&":"} x"
    },
   0"ie_moB":{
    ( "10"8"y"<
      "10 �"y"
    ,
    &and_eC":{
      �9.9":"n"
    }
  },
! "notes":b",
  "�o�es_by_n}m":{
0   
  },  "usaGe^pepc_y":77.96,
  "usage_perc_a":0
  "ucprefi|":false,
  "perent":"",
 0"keywordsb:"::seLecviof,selection",
  #ie_id":"",
  "chrome_hd";"#,
  �whown:true
=},{}],70:[fwnctio(2equire,motule,exp�rus){
module�mhpnsts=
  "t)tle":"CSS Shapes$L�vel 1b,
  #descrip4i/n"8"Allows geomet�ic shapes tm be sed$in$CSS to defin� an avea for uext to flow"around.",
  "spec":�http://www.v3�orgTR/C3s-shapec/",
  "status":"crb( �"links":[
    {J      "url">"http://html�adobe.com/webplatform/lay�ut/shape{/,
   ` !"titla":"Adobe demos ind samplEs"
    },*    {
   "  "}rl"
"http:.html.adobe.como7ebplatforo/|aio5t.shapes/browsez-s�pport/",
      "title":"CSQ shapes w}pport0t%st jy Adobe"� � $,
  " {
  0   #upl":&http://`listapart.coe/article/css-shapes-10",
      "title":"A$List Apart ar|icle"
   !}
  �-
 ""bugs"*[
    
  },
  "gaTegorids":[    "CSS3"
  ],
  "statq":{
   �ie":{
    ( "5.4#:"n#, $    "6":"n",
      &7":"n",
   "  "8":"n",J    0 "9":"l2,      "10:"j#,   (  "11":"n",
      "TP":"n"
    },
    "firefox":{
" "   "2":"n",
  %   "3":"n�,
      "3.5":"n"-�      &s.6":"n",
    !!"4b:"n"      "5":"�,
    0 "6":"n"
     ""7"j"."�
     ("8":*n"(
      "9":"n"<
      "10":"n",
 (   �"1!":"n",
      "12#:"n",      "3":"n",
      "14":&n",
  "   "15":"n",
0     "16":"n".
      "17":"n",
     `"18":"n#,
      "19�:"n",
0     "20":"n2,
      "21�:"n",#     "22":n,      "23":"n",
    0 "24":"N",
 `    "25":"n&,
!     "66":"n",
   $  �2?":n",
      "8":"n"$
   ` ""29":"n"<
      "30":"n",
     (b31":"n",
      "32":"n".J      "332:bn",
      "s4"z"n",
     !"35�>"n",
p 0$  "36b:"n",
      "37":"l",
� �   "38":"�",
      "39"8"n"
      "40b:"n"
 `$ }$    "�hrOme":{
0      4":"f",
   "  "5":"f",
  $   #6b:bn".
     $"":"n�,
 �    "8"*"n",
 1(   "9":"n"l      "14"*"n",
      "1":"n",
      "12":"n"
  $$  "13":"n",
      "14":"n",
      "15#"n",
      "16":"n�,
      "17":"n"�
  �   "1:"�"n",
 (   $"19":"n",
      2":"n",
     !"21"8"n�,
      "22b:"n",
      "23":"f"
      "24":"n",      "25":"n",
      "26":"n",
      "27b:"n",
      "2<*:"n",
 "    "29":"n",
      "30":"n",
  0   "31":2nb,      "32": n",
      "33":"n",
` �(  "3":"n d #1",
(     "s5":"n(d #�",
      "36":"n d #1#,
      "37"* }",
   `  "38":"y"<
      "39":"y",
      "40":#y"l
      "41":"y",
      "42":"y",
  0   "43":"y",
 `    "44";"8"
    }l
    "savari":�
 !    &#.�":"n".
      "3.3":"l"l
      "4":"n",
      "5":2n"�
      "5,1*:"n",	     �&v":"n",    ( "6>1":"n",
      "7#:"n",
      "7.1""y x",
      "8":�y x#
    �,
    "oper�"8y      "9":"n",
      "9.5-9.&":"n",
   $  "18.0-11.1":#n",
      "10.1+*"n",
" �   "3�/":"n",   !0`"11:"n"
!     213.1�:"n",
      *11.5b:"n",
 � (  "11.6":"n",
    $�"12b:"n2,
      "12.1": n,
      "1�":n",
     �&16":"n",
$     217":"n",
      "18":"n"(
   $  "q9":"n",
      "20":"n",
0 �  ("21":"n",
      "22"2"n"(
      &63":"n",
      "24":"y",
  `   "25":"y",
 (    "26":"y",
      "27"2"y",*      "28":&y",   "  "29":"y"
 (  },
    "hos_smf":{
  "   "3.2":"n,
@     "4.0-4.":"n",
      "4.2-4.3":bn",
�0   $"5.0-5.3":"n*,
    � "6�0-6.1":"n",
      "w.0,7.3":"n",
      "8":"y x",
    "("8.1-8.3":"y x"    },
    "op_mini":{
      "5f0-2. ":"n"
  � },
    "aNdroid":{
!      2.1":"n",
   `  "r.2"*"n",�      "2.3">"n",
    ( 23":"N",
     �"4":"n:,
     0b4.1":"n",
     !"4.2-4.3":"n",
      "4.4":"j",
      #4.%.#-4.4&4":"n",
      "40":"y"
    }l
    "bb":{
      "7"2"n",
      "10":"n"
    },�    "op_mob":{
0   $`"10">"n",
 `    "11":"n",
      "11.1":"n",
      "1!/4":"n",
   $  "q2":"n",
 (    "12.1":"~!,
      "24":"y"*    },
  ! "and_chr":�
      "41":"9 
    $
    "anlWff";{      "32�z"n"
( ($m,
"   "ie^mob"{
     ("10":"n",
       9q":"n"    },
    "and_uc":{      "9.y":"n"
"(  }
  },
  "notes":"",
  "not�s^by_num":{
    "1":"Ejabled if Chrome thpo}wh the \"expe2imental Web Platf�pm feaTqres\" flag in"chro-e://fLegs"J  },
  "us`ge_perc_y":50.55,  "usage_percWa":0,J  "uc0refix":false,
 $"parent":"",
  "ke9words":"circle,ellipsE$pwlygnn,inset,chape-/utsyde,slape-insideb,
( "ie_id":"shapes ,J  "chrome_id":"516389p7!588352",  "whkwn":trUe
}
},{}],65:[functi/n(requirm,module,exports	{modune.exports={
  "titlg":"CSS posktkon:stick{",
  "descripvion":"Keep7 elemen|s qositioned as0\"fixud\" ob \"reL�tpwe\& dependi�e on how i| appears in tig viewport. AS ! result thg alemmnt is |"stuck\" w�en necessary w(ile scrolling.",
 !"spec":bht4p://&ev.73.org/csswg/css-position/#cticky-positionin'",
  "rtates":uloff"(
( "linkq":[
    {
      "url"�"httP://updatesnhtmd5rockw.Com/�012?08/Stic{-your-landings-position-{ticky-taNds=in-SebKit,
 `    "title":"HTML5Rocks"
    },
    {
      "qrl"
"https://developer.mozilla/org/en-UW/docs/Web/CSS/posithmn",
      "title"8"MDN artic|e"
    },
!   yJ  !   "url":"Http://Docs.we"�letform.obg/wiki/css/pbopmrties/posat)on",`     tItle":"WebPdatcorm Docr"
    },
    {
 $!   "wrl":bhtups:?/givhub.cOm/filament'pmut/gixed-sticky ,
      "tytle":"T�lyfill"
    },
    k
      "url":"(t4ps://gith}b.co}/wilddemr/stick9fil�",
      "vi|lg":"Cnother polyfkmd"
    }
  ],
  "bugs":[
 0  {
   $  dEscrixpion#;"Firefox and Safari do"ooT appear to �qppkrt [sticky tab,E headers](http://jsbiddle.net/Mf4[T/2.). (reu aLsm [Firefox bug](htpps�//begzilla.mozilla>Org/show_bu'.cgi;hd=965644)("   }
` M,
  "c!tegriEs":
    "CSS"
  ],
  "suats":{
    "ie"8
 (    "5.5";"n",
  !   "6":"n",
 `    "7":"n&,
     $"8":"l",
      "9":"n",
   4` "10":"nb�
    " "11":"n"-
 $    "TP&:"n"
    },
   !"firef/x"8�
  `  !"2":"n",
  $$  "3":"n",
      &&5":"n&,
      "#.6"8 n"�
   "  "4":"n",
      "5":"n",
 $    "6";"�",
    " "7":"n",
    "�"8":"n"�
`   ` "9":n",      "10":"n",
      *11":"n",*      "12*"nb,
   ", "13"*"n",
      "14":"n",
      "15":n",
      216":"n",*      "17"z"n"$
      "18":"n*,
      "q9":�n",
     "20":"n",      "21":"n�,
0     *22":"n"
  (   "23":&n",
      "24""n",
      "35":"o",
 0    "26":"n d #1",
      "27"8"n d #1",J     ""28":"n d #",
 %    "29":"n d #1",
( �   230":"n"d #1",
      "31":"~ d #1",
      "12":"x",
      "3�":"y",
      "34":"y",
      "35":"y",B      "362:"y",  $    1'"8"8�,
      "0":"y",$     "39":"y",
      "40#:"y"
    },
    #chr�me":{
 (   0"0b>"n",
      "5"z"n",
    $ *6";"n",
      "':"n2,
     "9":"n",
      ")":"n",
    ` "18":"n",
     !"11":"nb,
      "12":"n",
 "    *13":"n",     `"142:"n",
  �   "15":"n",
      "16":"n",*    * "13b8"n#,      "18":"n",      "19&:"n",
  "   "20":"n"$
  (   "21":"�,
    $0"22#:"n"$
      "23":". d "2",
      "24":"N d #2",
  `   "25*:"n d #2",
      "26":"n d"#2"(
  !   "2'":"n d #2",
     ""2":"n d #"",
      "29":"n"d 2",
     0":0�:fn,d #2",
      "31":"n d #2",
      "32*: . d #2",
`      33":&o d #2",
   �  ��4":"n d !2",
      35":"n e #�",
  `   "36":"n d #2",
 (    ";7":"n",
 �    "8":"n",
      "39":"n"$
   �  "40":"n",  `   "41":"n",
      "42":"n",
 (    "43":"n",      "44":"n"
 $  },
    "safari":{
0     "3,1":"nb,
      "2.2":"n",
      "4#:"n"�
     )"5":*n&,      �5.1":"n2,
  !   "v":"n",
   $  "6.1":�y x",
    ` "7":"y0x",
      "7.1#:"y x",      "8":"y x
  0 },
    "opera":{
  0   "9":"n",�      "9.5-9.6":"n",
    ( "10.0-18.1#:*n",*    $"10�5":"n","   " "10.6�:"n",
     $"11":#.",
      *11.1":"n",
      "1!.5":"n",
      "11.2":"n",
0 !   "12":"n",
  (   "12/1":"n"(
      "1=":"n"(  �  a16":"n",
    " "17":"n",
   !  "18":#n2,
  "   "!8":2n",
 0    ""0":"n&,
      "21"+"n",0    �22":"n",
      23":"n",
     !"04":"n",
 ` `  "r5":"n",
      "2":"n",
       27":"n",
      "28":"n",
  p`$ "29�:"n"
    �,    "ios_raf":{
      #3.2":"n",
0�"!  "4.0�4.1":"n",
    �("4.2-4.3">"n"
$  "  "5.0-�*1":"n", `  $ "6.8-61":"{ x",
 ((   "7*4-7.1�*"y x",
      "8"2y x",
! (   "8.1-8.3":"y x"
    u,
  " "Op_mhni"k(0  ( "5.0-8.0":"nb
    },
  � �android":{
   " !22.1";"n",
�   ` !".2":"n",
      "2.3";"n",
      "3""n".
      "4#:"n",
     ""�.1";#n",
   $  "4.2-4|3":"n*,
    ( ".4":"n",
      "4.4.3-4.4.4":n",
      "40";"n"
 (  },
 $  "bb :{
  (`  "7":"n ,
   �( "10":"N"
    =,
 � �op_m/c:{
   " !"10":"n",
 (   "*112:"f"<
      "11.5":"n",
      b1u.5":"n",
      "12":"n",J      12.1":"n",
   !  "2":"o"
`   },
  ``"and_cH�":{
  0   "41":"n"
  " },
    "and_&f":{
    " "36":"y"
    },
    "id_lob":{
   �  "10":"n",
  !   "11":"f"    },
0   "and_uc":{
 (    "9.9":"n"�  ! }
 (},
  "notes":"",
  "nn|e{^by[.um":�
$   "0":"Caf be enabled in Firefox by setting The arowt:c/nfig prefer�nce layout>css.stIcky.enabled to tru�",
  $ "2 3"Ena"led in C`rome throtgh u8e$\"exPerimenval Web Plapfo2i &eAtures�" fla� in chroma://flags"
  },
  "esage_perc_y":20.74,
  "u�age_perc_a�:0,
  "ucpbefix":falsel
  bparent":"",  "kEywords":""
  "ie_id":"p�sitionstibky",
$ "chrome_id"8"61902�046378880*,
  "sho7n#:trug
}
},{}],76:[funstio.(require,}odule,%xports){
module.exports=;
  "tit��":"CSS3 tex4-ahiGn-last#<
  �descrIption":"CSS p�oxerpy t/ describe how the last line of a block�or a line)2ight beford�a forceD line brea�when `\ext-align` is(`ju3tifi`.",
 ""Spec":"ht�p:/�www��3.org/TR/#ss3texd/'texP-aliwnlast-pRopervy",
  "stetuq":"Wd",
  "links":[
  0 {
      "ur�":"https:/-developep.mozilla.mrg/en-US/docs/�eb/CRS/text-al�gn-last"-
 0    "title":"MDN |axt-a|)gn-meqt"
    },
    {
      �ur(":"http:o/blogc.admbe.com/webplatform/2014/02/25/improv)n�-yo}r-sites-visual-d%ta�ls-css1mtext-align-,ast/",
 $ $  "dh�,e":"Adobe Web Rlatform Article
 0  }
  _,
  "bug{":[
$   
 `],
  "�`teg�riesb:Q    "CSS3"
  ],
 ""stats":{
    "ie":{
  �   "5.5":"a #12,
      "6":"a #!",
       7":"a #1",
      "9":"a #1",
   0  "9":"a0"1"<
      "10":�i%#1",
      "1!":"a #!",
      "T�":"a`1"
  ( }l
    "firefox"�{
   �   2":"o",
      "3*:"n",
      "3.5":"."-
 $  $ "3*6":"n"<
   0  "4">"n",
(     �5:"n",
      "6":"n"$
      "w":"n",
      �8*:"n",
      "9"* n",
 !  $ "10":2n",
    0 "01":"n",
      "12":#y x",
      "13":"Y x*,
  1   "14"�"y x",
      "15":#y x",
      "16":"y x"$
      �17":"q x",
   "  "1x":"y x",
      "19">"y ",
(�    20�: y x",
    ! �21":"9 x",
      "2"">"y x#,
 !   0"23":"y x",
      ":4":"y�x�,
      "2=":"y x&,
 ( $  "26":"y x",
      "27":"y x",
0  �  "28":"y x",
      "29 :"y�x",    "!"31":"y x",
      "�":"q x",
      "3"":"y x",
      "33":"y x",
      "74":"y x",
    ($"35":by!x",
      "36�:"y x",
0  0  "37":"y`x",
  !�  #38":"y#x",
 !    �39":"y x"�
   0  "40":"y x"
    ,
  � "shrome:
 !    "4":"n",
      "5#:"�",
(     "6":".",
$     "7":"n",
    �0"8"8#n",
!  "  "9":"n",      "102:"n*l
      "11": n",
     ("12":"n2,
 !  ` "13&:&n",*     ("14":"n",
  !"! 015":"n",
!� $  "16":"n",
    $ "17""�2,
    0""18"8"n",
 $    "19":*n�,
     a"20":bn�,
 �    "21"z"n",     �"�0#:"n",
      "23"2"n#,
     !"24#:"n",
      "25":"l",*     �"26b:"n",
    � "2w"8*j"
      "28�:"n', ` $" ":8 2n",
 *   "30":�N0,
"    0"13""~"(     "&�2":"n",
      "33":"n",
      "34":"�",
      "35*"n d c2",
   0  "3�":"n d #2",`     ";7":"n d #2",
      "38":"n d�#2",�      "39":"n d #2",
      "40b:"~ d0#2"<
      "41"�"n d #3"-
      "42":"l d #6 ,
      "43"j"f d +2",
      "44�*bn d #2"
0   },
    "safAri":{
(   4 *3.1":"l"�
      "2.2":"nb,
   `  "4":"n",
 #    *5*:"n",
      "5>1":"j",      6":"n",
     `"6.1":"l"
      "7":&n",
   �  "7.1"�#n",
    " "��:"n"
   0�,J    "opera":{      "9":2n",      "9/4-=.":"n",
"`  ! "10.0-10.1":"n",J      "10.":"� ,
  0  ""q0.6":"n",
      "31":"n",
    ! "1.1b:"n",
    0 "�1n5":�n",
    ! "11.6":"n",
     0"2":"n",
  (   "12.)":"n",
      "15": n",
      &16";"n*,
      "17":"n",*0      18:&n",
  0 `"19":"n",
 !    "20"8"n",
 $    "21""n"-
     (223"n | #�",
�     "23":"n d #3",
      "04":"� d #3",
   0 0"25":"f d !3",+    � "2>":"n d #3",
�     "27":& d"#3",*      "28"*"n d #3",
      "29":"n d #s"a   },
  $ "aos_saf":z
      "3.2":"n",
      "4.0-4.1 :"n",
      "5.2-4�3";"."$      "5&-5�1":"n",
      "6.0-6.0":"n",
   $  "7.0-7.1":"n*
      "8":"n",
      "8.1-8.3":"n"    },
    "op_minib:{
      "5.0-8.0":"n"�    |<
    "andrOid":{
   �  "2.1":"n",
      "2.2&:"n",
      "2.#":*n",
     $"3":"n",
(     *4":"n",
  $  !*4.1"�"n",
      "4&2-4.3":"n",      "4.4�:"�",  0f  "4.4.3-4.4.4":"n",    0 "40":"n"
  � },
!   "bb":{
  `   "7":*n",
       10":"n"
 `  },
    "o0_mob":{
      "1 ":"j ,
      b11":"n"<
    $$"�1.1":"nb,
      "11n5":"n",
      "12b:".",
      "92.1""n",
      "24&:"N"
    },
   ("cnd_bh�:�
 0    "41":"n"
    },
  !  and_f"">{
    � "36":"y`x"
    },
   !"ie_mob"2{
      "0":"a #1"-
      "11":"a #1"
    },
    "qnduc":{
      "9.9":"n"
    }
  }$
0 "notgs":*",
  "n/tes[by]num":{
    "1":"In HntErnet Explorer, thd stcrt and end0valuus ard$n�� supported,".
    �2":"Enablee throdgh dhE \Enaflg Experimental WeB$PlAtform FeAtures\" fmag in chrome://fn!gs",
    "3"2"Enab,ed$��rougi tHe \#Enable Exper�-enpal Web @lqtforo Fma4ures\" Flag in Oxere://fla#{"
  },
  "tsage_perc_y":12.19,
  &usage]perc_a":14.15,
  "ucprefix":dalq%,
  "pareot#:"",
  "+eywordc":"text align mast",�  "ie_yd": ",*  2shrome_id"8"",
" "show.":trua
}
},K}],7v:[Fdnktion,requive.module�exports){
}odu,e.exports={
  "title":"BSS3 Transiti~s#,
  "description":"Skmple methnd on animating"certain proper4ims of$an element>",J` "qpec":#h}tp://wsw.w3.org/TR'�ws3-transitions/",J" "status":"wd",
  "links":[    {
    ` "url":"xttp://wwwwebdesigneRd�pot.cjm/2010/0!/css-transitions-101/",
 "    "title":"Ar|icle$on usaGe"
    },
   "{  !   "url":�http://w�w.css3viles*com/transidion/",      "|itle":"Inwormation p!ge"
    ,
    ;
      "url":"http://www.the-arv-of-web,com/css/viming,function/,
      "title":"Exam0les on!tioing funct)ons"
    },
    {      "url":"http://Wsw.opera.com/docs/sqe�s/xrest�.12/crs/tpans)�ions/",
   0  "title"z"Animation mf propErty types suPpo�t i. Opera"
  � },
   "{
  "   "ur|*:"hTtp:/��oc3.webtlatform.org/wiki/csq/protebp	es/transition"(
   �  "title"z"We`Platform Docs"
    }
  ],
  "bugs":[
    {      "deScription":"^gu supx�rDed on a.y*pseudo�elements besides ::befo�e and ::aFter fz$Firefoxl Chro�e 26+, Opmrc`16+ and`IE10+."J    m,
    {
      "$escriptimn":"TransitIoNable properties �kth calc(	 dErived values are not`s�pported bmlow and(incnudyog KE1! (http://connect.Micr/soft.com/I�/feedbacK.detailso76219/cs33-calc-�ug-inside-transytion-or-�pansfore9�!$ "},
    {
      "descbip�ion"�"'bAckgr/und-rize' iw not stprortee below and in#ludijg �E10"
    }  ],
  "cat$gories":[�    "CSS3"
  ],
  "stats":
    "ke2:{
      "5.5":"n",
      ">":"n",�    !  7":"n&,
!     "8":"n",      9":"n"-
     $"10":"y�,
      "11"�"yb,
$  "  "TP":y*
    },
    "firefop":{
      "2":"n",
$     "3":"n",
 (  � "3.5":"n",*   (  "3.6":"n",
      "6&:"Y x ,    ( "5""y x",
      #6":"y x",
�    !"7f:"y xr,
      "8":&� x"�
 !    "9":"y x",J     (�10":"y x",
      "11":"y x*,*      "12"*"y x",�", 0` "132:"y�x",
      &4":"y h",
  �   "15":"y x",
 "    "16":"y"-
    " "17"�"y",
   0  "18":"9",
$     "19":"y",
      "z�":"yb,
 "    "21":"y",
(h    "22":"y"$
      "23�:"y",
  "   "24�:"y",
      "2%": y",
�     "26":"y&,
      "27":"y",
      "28 :"y",
      "29":"y",
      "30":"9",
    $ *31":"y",      "32"3"y",
      "33"�"y".
      "34":"x"- $    "34":"y",
   ! !"36":"q",
  !   "3w":"y",
      "38":�y",
      "39":"y",
      "4 ":"y"
  $ },
    2chrome":{
0     "4":"y x",
      "5":"y x ,"   (  6":"y x",
      "7":"y x",
      "8":"y x",
 0 �  "9":by x"-J      "14"*"y0y",J!     "11":&y(x",
      "12":#� x",
      "13":"y x",
      "94":"y x"$
   0  "15":"y x",
      "16":"y x",
 !    "17":"y x"l
  $   "18":"y x",
  (   "19":"y0x",      "20":"q x",
    0 ":1":"y x"
  � 0 "32":"y x",
    ! "r3":"y x",
      "24":"y!x",
      "5"z"y x",
 "    "26":"y",
      "27 :"y",
   (  b28":"yb,
      "21":"y",
 (    "30":"{",
      "31":"y",
    � "32":by",
    ``"33":"x",
      "34":"}",
      "35": y&l
      "36":�y",
      "37":"y",
      "38":*y",
 �  0 "39":"y",
      "40":"y",
  !   "41":"y",
      "42":"9",
    0 �43":"y $
  (   "44"**y*
    m,
    "safari":{
      "3.1 :"y x",
      "3.2":"y x",
  !   "0":"y p",
      "%&:"y x",
  `   "5�1"z"y x"(     �26"�"y x",
x     "6.1":"y,
 �  "0"7":"Y"$
      "7.1":"y",
      `8"8"y 
    },    "opera":{
$     "9":"n",
      "9.5-9."z"l",
      210.0-10.!":"n",
0 0   "10.5"z#y x",
      "10.6":"y x",
      "1�#2"y x",
   0 ("11.1":"} p",
      "11.5":"y x",
      "11.6":"y x",
 0    "1"�*"y x",
      "!2.1":"y",
 (   `*1=":&y",
     $"16":"y"�$    �"17"z"i",
  !"  "�8":"y#l
    $ "19":*y",
   "  "20":y",
      �21#:"y",
  "    22":"y",
      "�3":"y",
     0"2<":"y",
      "25":"y",
      "26":"y",
 0 �  "2?":"�",
      "28"*"y",
     ""2)""y"
    }l
    "ios_saf":{
    � "32":"y x",     ("t.0-4.1":"y x",
      "4.2-4.3":"y 8",
      "5&4-6.1":2y x",
    � "6.0-.1":"y x",
 $    "7.0-7.1":"y"-
      "x":"y"$    " "8.1-8.1":"y"
    },
    "op_mini":{
      "5*0-8.0":"n"
  � }
    "androae":{
 !  0 "21":"y x"$
(     "2.�":"x x",
      "2.3":"y |",
      "3":"y x2,
      "4:*y x",      "4.1":"y x", 0    "4.2
  0   "4.4":"y",      "4.4>3-0.4.4"�"y ,
      "40":"y"
1   }.
    "b�*{
 �    "3":"y x2(
    $ "10"2"y"
    =,
    "op_mob":{
      "10":") x",
      "11b:"Y 8",
( (  !"19.1":"y 8",
      "11.5":"y x&,
$0   ""12&:"y x",
      "12.1">"y",   0 $"24":"y2
    },
    "an$_c�r":{
     �"1":"y"
$   },
    "an$_ff":{
 $ �  "36":"y"
    ,
    "ie�mob":}
      "�0":"q",
      "11":"q2
    },
    "!nd_uc":{
      "9.9":"y x"
  0 }
 `},
  "not�sb:"Supqort l�st%d is for `|ransitinn` propezties As well as tig `tra�sitignend` mvend. The prefixed0name in WebKit browsers"is `webkitTra~sitmnnEnd`",
` "notes_by_fum":{
    
  },
  "usagd_perc_y":=0.12,
  "usafe_perc_a":0,
  "ucprefix"zfalse,
  "pArent":"�J  "keYwords":Css transition<transmtionend",
  "ie_id&:"",
� "chrome_)d":" ,
 �"shown":vruE
}
m,{}]$w8:[funsti/n(sequiru,module,exports){
mOdule.expor�q={
$!"title2:"CSS3 Box-sizing"(
$�"deqcription":"Methg� of {tecifying whetler$or not aN ele}ent's boreers and Padding should be"inclu`ed in size units�,
  "spea":"h4vp://www.w3.org/TRocss�-ui/#box-sizyng",  "�tatus"*"wd&,
  "links":[
!   {
      "url�:"https:./devglopeb/morilla.ozG/En/CSS/Box,siz�ng",
  $ 0 "4itLe":+MDN artikle"
    },
    {
"     #url":"http://wWw.456bereastreet.com/asciive?201106/cmnt�omling_width_with_ccs3_Box-sizing/",
   0  "t�tle�:"Blog0posd" ! �},
    {
    ! "url":"https://githeb.coe/Schepp/box-3izing-pOlyfMLl"l
      "title":"PolyfIll dor IE"
    �
   "�
  "   "wrL":"http://css-trick{.com/box-sizing/",J    � "tithe":"CSS TzicKs"
    },
 ! �k
      "url":"htup;./docS.webplatform.org/wika/cr3/propertiesbox%sizinf�,
 `   (*pitle":"WebPlatform Docs"*" ` }
  Y,
  "buFs":[
!  `{
      "$escription"z&IndRoid browserc `O nnt calcu�ate corre#tly"dhe dimensigns (wydth and �eight) of0the HTML select elemejd."
  ! �,
! ! y
�     "descript�oo"*"[afari 6.0.x does not use b�x-sizinc on elem�.ts }iph display: |able9"
    },
    {
$ !   0`e{�ription":"IE9(wi|l wubtr#t pje v�d|i ob The0�cro�l�i� to theawidth /f the eleeent!whan set to pocotion:(absolute,"ovezflow: audo / nverflow,y: scr�ll"
    },    {    ( "descriptinn":"IE x igNo2ep``Box-riZing border-box` if min/maX-idthoheiGht is$qse`.&
  ! },
    {      "doscripvimn":"Chrome has prkbLems selacting optiOns from tHe$`select` elem�nt when using �b�x-shxing: b?r$er-box` `nd brguser zom mevel is leSs than 100%.�    }
  ]�
  "categories":[
    �CSS3"
  ],
  "stats":{
    "ie":z
 !    #5.5�:"p",
      "6":"p"$
      "��"p",
      &8":"a",
      "9 >"a".
      "1p�2"a",
 $ 0  "11 :"a2<
      "TP":"a"
   `},
    "f�revox2:{
      "2":"y x�,
      "3">"y 8",   "  "3.5":"y x",
      ".6":"y x",      "4":"y x"
 0    #5":"y,x",
   �  "6"8#y x",      "5":"y x",
(     "8":"y x",J  "   "9":"y x",
%   ! "1�":"y xb,
    � "11":"y x",
      "12":"y x2-
      "13":"y!x",J      "14":"y x",
      14":"y!x",
      "16"�"y x",
      "17&:"y x&,
      "18":"y0x",
      "19":"y x",
     0"20":"y x",
      *20":"{ x",
     ""22":"y x ,
      "23":"y x",
      "24&:"y0x"<
      "25":"y x",
`     "6":"y z",
    ( "27":"y x",
  �   "28":"y x",
   2 �"292:"y",
 `  ( "30":"y",
      "21":"y"$
�     "32"2"y"$
    $ "33":"y2$
      "34&:"y"-      "35":"y",
!     "36":"y",
      "77":"y",
      "3<";"y",
 0(   "39":"y",
      "40":2y�
"   },
   �"chvoMeb:[�`     "4":#! x",
      *5":"� 8", (    *6":"a x",
      7"8"a x",
 $  �( 8":"a x",
      "9":"a x",
      "10":"a",
      "11":"a",
      "12":"a",
      "13":"`",
      "�4":"a",J     ""1%":"a�,
      "16�:"a",
   `  "15":"a",
      "18":�a",
     `"1)":"a"(
   !  "20"8"a",:      "21">"a*,
 (     2R#:"a",
    0 "23":"a",
      "24":"c",      "25":"A",
     $"26":"a",
     �"26":"a�,  0   "28#:"a",
      "29":"a",
      "30">"a",
     `"31":"�",
      "22":"a",
      "33":"a",
    ` "34":"�",
   !  "35*:"a",
!  (  "3":"a",
      "27":ba",      "38*:"a�,
      "39":"!",
   ( $"40":.a",
!     "41*:a",
   �  "$2":"a",
  "`  "43":"a&$
      "44"?"a 
    |,
    "safarh":{
      "31":"! x",
,     "7.2"*"a x"(   0  "4":"e�x"l
 0`  0"5":"a �",
      ".1":"a�,
!     "6�:"a",
      "6.5":"a",
      "7":"a",
  `   "7.1":"a",
    ` "8":�a";    }
    "operi":{
      "9":"n",
      "9.5-9.&":"a",
$� "( "10.0
  "( !"15.5":"a",
  �  ("10.7":"a",
  �  ("11":"a",
      "11.1":"i",
      "11.5":"ab(
      "13.6":2a",
    ` "12"2"a",J      "12.1":"A",
      "15*"a2,*    0 216";"i",
 0    *1w":"a",
      218"*"a",J      "19":"a",
 � (  "" :"a(,
�   0 21":"a ,
    (0"22&:"a",J    ! "23b:"a,
  $   "24":"a",
      "25":"a",
      "26":"a",
  !  0"27*:*a",
      &28":"a",
      "29":"a"
    },
    &io�_saf"8{
 $    "1.2":"a(x",
      "4&0-4.1":"a x",
      4.2-4.32:"a x&,
 0    "5.0-5.1":"i".      6.0-6.1":"a",
      b7.0-7.1":"a",
      #:":"!",
      "�&1-8.3":"a"
    },
    "op_eini":{
  $   "5.0-8.0"8"a"
    },
    bcndroid":{
      "2.!":a x",
      22.2":A x",
!`  0 "2.3":"� x2, 0    "3":"a x2,
      "4":"a",
      "4.1";"a�,
`     "4.2-4.3":"a",
      "<.4":"i",
      �4.�.3-4.4.t"8"a",
 ( 0  "40:"a"
    },
    "bb":{
    ! "7":"a`x ,
      "10":"a"
0 ( y,
    "op_mobb:{
      "10":"a"$
(     "11":"a",
   �  "11.1":"a",
  (   �11.5">"�",
      "12":"ab,
      "!2.1":"a,
" $   "24:"q"
    },
    "and_chr":{
"     "41b:*a"
    ],    "cnd_v�":z
 �    "36":"y"
   (},
  ( "ie_Mob":{
      210":"a",
   !  "11":"a"
$   },
    "and_ug":{    0 ";.8":"a�
    }
  },
  "notes":"Rartiil support refers to suppkrting$only the `contenu-roz`$and `border-bop` values, nou `padding/box` (which was aeded to the 3pec Letdr).",
  "notes_by_num >{
    
  },
  2usage_`erc_{":12.4,
  "u3awe_�erca":84.66,
 �"ucprefix":fals�,
  "parenT":"",
  "keywords":"border-box,conteot-bo9,paddinG�Box", $"ie_id�:�",
$ "�hrome_id":"",
  "shown":true}
},{]]<79:[functimnreyuir%,lmdule,export�){
module.dxports={
  "title":"CSS3 Cursors ��ew vimuu{)",  "descbiption"8"Support0for `zooi-in` and `zoom-out`(values &or the CSQ3 `cuRsor` prormrty."
" "s�ec":*http:/www.v;.org/TR/css3-ui/#cursor",
  "status":"wd",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor",
      "title":"MDN Documentation"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "TP":"n"
    },
    "firefox":{
      "2":"y x",
      "3":"y x",
      "3.5":"y x",
      "3.6":"y x",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"y x",
      "3.2":"y x",
      "4":"y x",
      "5":"y x",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"n",
      "8.1-8.3":"n"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "40":"n"
    },
    "bb":{
      "7":"y x",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "24":"n"
    },
    "and_chr":{
      "41":"n"
    },
    "and_ff":{
      "36":"n"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"Chrome, Safari and Firefox also support the unofficial `grab` and `grabbing` values (with prefix)",
  "notes_by_num":{
    
  },
  "usage_perc_y":51.62,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"cursors, pointers",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],80:[function(require,module,exports){
module.exports={
  "title":"CSS3 tab-size",
  "description":"Method of customizing the width of the tab character. Only effective using 'white-space: pre' or 'white-space: pre-wrap'.",
  "spec":"http://www.w3.org/TR/css3-text/#tab-size1",
  "status":"wd",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size",
      "title":"MDN article"
    }
  ],
  "bugs":[
    {
      "description":"Firefox [does not yet](https://bugzilla.mozilla.org/show_bug.cgi?id=943918) support `<length>` values"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "TP":"n"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1",
      "40":"a x #1"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"a #1",
      "22":"a #1",
      "23":"a #1",
      "24":"a #1",
      "25":"a #1",
      "26":"a #1",
      "27":"a #1",
      "28":"a #1",
      "29":"a #1",
      "30":"a #1",
      "31":"a #1",
      "32":"a #1",
      "33":"a #1",
      "34":"a #1",
      "35":"a #1",
      "36":"a #1",
      "37":"a #1",
      "38":"a #1",
      "39":"a #1",
      "40":"a #1",
      "41":"a #1",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"a #1",
      "7":"a #1",
      "7.1":"a #1",
      "8":"a #1"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"a x #1",
      "11":"a x #1",
      "11.1":"a x #1",
      "11.5":"a x #1",
      "11.6":"a x #1",
      "12":"a x #1",
      "12.1":"a x #1",
      "15":"a #1",
      "16":"a #1",
      "17":"a #1",
      "18":"a #1",
      "19":"a #1",
      "20":"a #1",
      "21":"a #1",
      "22":"a #1",
      "23":"a #1",
      "24":"a #1",
      "25":"a #1",
      "26":"a #1",
      "27":"a #1",
      "28":"a #1",
      "29":"y"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"a #1",
      "8":"a #1",
      "8.1-8.3":"a #1"
    },
    "op_mini":{
      "5.0-8.0":"a x #1"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"a #1",
      "4.4.3-4.4.4":"a #1",
      "40":"a #1"
    },
    "bb":{
      "7":"a #1",
      "10":"a #1"
    },
    "op_mob":{
      "10":"n",
      "11":"a x #1",
      "11.1":"a x #1",
      "11.5":"a x #1",
      "12":"a x #1",
      "12.1":"a x #1",
      "24":"a #1"
    },
    "and_chr":{
      "41":"a #1"
    },
    "and_ff":{
      "36":"a x #1"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Partial refers to supporting `<integer>` but not `<length>` values."
  },
  "usage_perc_y":0.27,
  "usage_perc_a":74.79,
  "ucprefix":false,
  "parent":"",
  "keywords":"tab-size,tab-width",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],81:[function(require,module,exports){
module.exports={
  "title":"Flexible Box Layout Module",
  "description":"Method of positioning elements in horizontal or vertical stacks. Support includes the support for the all properties prefixed with `flex` as well as `align-content`, `align-items`, `align-self`, and `justify-content`.",
  "spec":"http://www.w3.org/TR/css3-flexbox/",
  "status":"wd",
  "links":[
    {
      "url":"http://bennettfeely.com/flexplorer/",
      "title":"Flexbox CSS generator"
    },
    {
      "url":"http://www.adobe.com/devnet/html5/articles/working-with-flexbox-the-new-spec.html",
      "title":"Article on using the latest spec"
    },
    {
      "url":"https://dev.opera.com/articles/view/advanced-cross-browser-flexbox/",
      "title":"Tutorial on cross-browser support"
    },
    {
      "url":"http://philipwalton.github.io/solved-by-flexbox/",
      "title":"Examples on how to solve common layout problems with flexbox"
    },
    {
      "url":"http://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      "title":"A Complete Guide to Flexbox"
    },
    {
      "url":"http://the-echoplex.net/flexyboxes/",
      "title":"Flexbox playground and code generator"
    }
  ],
  "bugs":[
    {
      "description":"IE10 and IE11 default values for `flex` are `0 0 auto` rather than `0 1 auto`, as per the draft spec, as of September 2013."
    },
    {
      "description":"In IE10 and IE11, containers with `display: flex` and `flex-direction: column` will not properly calculate their flexed childrens' sizes if the container has `min-height` but no explicit `height` property. [See bug](https://connect.microsoft.com/IE/feedback/details/802625/min-height-and-flexbox-flex-direction-column-dont-work-together-in-ie-10-11-preview)."
    },
    {
      "description":"In Chrome and Safari, the height of (non flex) children are not recognized in percentages. However Firefox and IE recognize and scale the children based on percentage heights. [Chrome bug](http://crbug.com/341310)"
    },
    {
      "description":"Firefox does not support [Flexbox in button elements](https://bugzilla.mozilla.org/show_bug.cgi?id=984869#c2)"
    },
    {
      "description":"[Flexbugs](https://github.com/philipwalton/flexbugs): community-curated list of flexbox issues and cross-browser workarounds for them"
    },
    {
      "description":"IE11 does not [wrap long paragraphs of text](http://jsfiddle.net/y1do9cx8/1/)"
    },
    {
      "description":"IE11 will not apply flexbox on pseudo-elements. [See bug](https://connect.microsoft.com/IE/feedbackdetail/view/1058330/ie11-will-not-apply-flexbox-on-pseudo-elements)."
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"a x #2",
      "11":"y",
      "TP":"y"
    },
    "firefox":{
      "2":"a x #1",
      "3":"a x #1",
      "3.5":"a x #1",
      "3.6":"a x #1",
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a #3",
      "23":"a #3",
      "24":"a #3",
      "25":"a #3",
      "26":"a #3",
      "27":"a #3",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"a x #1",
      "3.2":"a x #1",
      "4":"a x #1",
      "5":"a x #1",
      "5.1":"a x #1",
      "6":"a x #1",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"y",
      "15":"y x",
      "16":"y x",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y"
    },
    "ios_saf":{
      "3.2":"a x #1",
      "4.0-4.1":"a x #1",
      "4.2-4.3":"a x #1",
      "5.0-5.1":"a x #1",
      "6.0-6.1":"a x #1",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"y"
    },
    "android":{
      "2.1":"a x #1",
      "2.2":"a x #1",
      "2.3":"a x #1",
      "3":"a x #1",
      "4":"a x #1",
      "4.1":"a x #1",
      "4.2-4.3":"a x #1",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "40":"y"
    },
    "bb":{
      "7":"a x #1",
      "10":"y"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"y",
      "24":"y"
    },
    "and_chr":{
      "41":"y"
    },
    "and_ff":{
      "36":"y"
    },
    "ie_mob":{
      "10":"a x #2",
      "11":"y"
    },
    "and_uc":{
      "9.9":"a x #1"
    }
  },
  "notes":"Most partial support refers to supporting an [older version](http://www.w3.org/TR/2009/WD-css3-flexbox-20090723/) of the specification or an [older syntax](http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/).",
  "notes_by_num":{
    "1":"Only supports the [old flexbox](http://www.w3.org/TR/2009/WD-css3-flexbox-20090723) specification and does not support wrapping.",
    "2":"Only supports the [2012 syntax](http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/)",
    "3":"Does not support flex-wrap or flex-flow properties"
  },
  "usage_perc_y":82.47,
  "usage_perc_a":10.5,
  "ucprefix":false,
  "parent":"",
  "keywords":"flex-box,flex-direction,flex-wrap,flex-flow,flex-grow,flex-basis",
  "ie_id":"flexbox",
  "chrome_id":"4837301406400512",
  "shown":true
}
},{}],82:[function(require,module,exports){
module.exports={
  "title":"Font feature settings",
  "description":"Method of applying advanced typographic and language-specific font features to supported OpenType fonts.",
  "spec":"http://w3.org/TR/css3-fonts/#font-rend-props",
  "status":"wd",
  "links":[
    {
      "url":"http://ie.microsoft.com/testdrive/Graphics/opentype/",
      "title":"Demo pages (IE/Firefox only)"
    },
    {
      "url":"http://hacks.mozilla.org/2010/11/firefox-4-font-feature-support/",
      "title":"Mozilla hacks article"
    },
    {
      "url":"http://html5accessibility.com/",
      "title":"Detailed tables on accessability support"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/font-feature-settings",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y",
      "11":"y",
      "TP":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y x",
      "44":"y x"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"a",
      "5":"a",
      "5.1":"a",
      "6":"a",
      "6.1":"n",
      "7":"n",
      "7.1":"n",
      "8":"n"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x"
    },
    "ios_saf":{
      "3.2":"a",
      "4.0-4.1":"a",
      "4.2-4.3":"a",
      "5.0-5.1":"a",
      "6.0-6.1":"a",
      "7.0-7.1":"n",
      "8":"n",
      "8.1-8.3":"n"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"y x",
      "4.4.3-4.4.4":"y x",
      "40":"y x"
    },
    "bb":{
      "7":"n",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "24":"y x"
    },
    "and_chr":{
      "41":"y x"
    },
    "and_ff":{
      "36":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"Partial support in older Firefox versions refers to using an older syntax. Partial support in older Chrome versions refers to lacking support in Mac OS X. ",
  "notes_by_num":{
    
  },
  "usage_perc_y":74.95,
  "usage_perc_a":1.02,
  "ucprefix":false,
  "parent":"",
  "keywords":"font-feature,font-feature-settings,kern,kerning,font-variant-alternates,ligatures,font-variant-ligatures",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],83:[function(require,module,exports){
module.exports={
  "title":"Full Screen API",
  "description":"API for allowing content (like a video or canvas element) to take up the entire screen.",
  "spec":"http://www.w3.org/TR/fullscreen/",
  "status":"wd",
  "links":[
    {
      "url":"https://developer.mozilla.org/en/DOM/Using_full-screen_mode",
      "title":"MDN article"
    },
    {
      "url":"http://jlongster.com/2011/11/21/canvas.html",
      "title":"Blog post"
    },
    {
      "url":"http://hacks.mozilla.org/2012/01/using-the-fullscreen-api-in-web-browsers/",
      "title":"Mozilla hacks article"
    },
    {
      "url":"http://docs.webplatform.org/wiki/dom/Element/requestFullscreen",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"IE 11 doesn't allow going to fullscreen mode when the event that triggers `msRequestFullscreen()` is a `keydown` or `pointerdown` event (`keypress` and `click` do work)"
    },
    {
      "description":"Safari blocks access to keyboard events in fullscreen mode (as a security measure)."
    },
    {
      "description":"IE 11 does not allow scrolling when document.documentElement is set to full screen."
    },
    {
      "description":"IE 11 does not properly support fullscreen when opening from an iframe."
    },
    {
      "description":"Opera 12.1 uses the older specificaton's `:fullscreen-ancestor` pseudo-class instead of the  the `::backdrop` pseudo-element."
    }
  ],
  "categories":[
    "JS API"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"y x",
      "TP":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1",
      "40":"a x #1"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #2",
      "21":"a x #2",
      "22":"a x #2",
      "23":"a x #2",
      "24":"a x #2",
      "25":"a x #2",
      "26":"a x #2",
      "27":"a x #2",
      "28":"a x #2",
      "29":"a x #2",
      "30":"a x #2",
      "31":"a x #2",
      "32":"a x #2",
      "33":"a x #2",
      "34":"a x #2",
      "35":"a x #2",
      "36":"a x #2",
      "37":"a x #2",
      "38":"a x #2",
      "39":"a x #2",
      "40":"a x #2",
      "41":"a x #2",
      "42":"a x #2",
      "43":"a x #2",
      "44":"a x #2"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"a x #1",
      "6":"a x #2",
      "6.1":"a x #2",
      "7":"a x #2",
      "7.1":"a x #2",
      "8":"a x #2"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"y",
      "15":"a x #2",
      "16":"a x #2",
      "17":"a x #2",
      "18":"a x #2",
      "19":"a x #2",
      "20":"a x #2",
      "21":"a x #2",
      "22":"a x #2",
      "23":"a x #2",
      "24":"a x #2",
      "25":"a x #2",
      "26":"a x #2",
      "27":"a x #2",
      "28":"a x #2",
      "29":"a x #2"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"n",
      "8.1-8.3":"n"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "40":"n"
    },
    "bb":{
      "7":"n",
      "10":"a x #2"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "24":"a x #2"
    },
    "and_chr":{
      "41":"a x #2"
    },
    "and_ff":{
      "36":"a x #1"
    },
    "ie_mob":{
      "10":"n",
      "11":"y x"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Partial support refers to supporting an earlier draft of the spec.",
    "2":"Partial support refers to not supporting `::backdrop`, and supporting the old `:full-screen` syntax rather than the standard `:fullscreen`."
  },
  "usage_perc_y":8.7,
  "usage_perc_a":61.74,
  "ucprefix":false,
  "parent":"",
  "keywords":"full-screen",
  "ie_id":"fullscreenapi",
  "chrome_id":"5259513871466496",
  "shown":true
}
},{}],84:[function(require,module,exports){
module.exports={
  "title":"Intrinsic & Extrinsic Sizing",
  "description":"Allows for the heights and widths to be specified in intrinsic values using the fill-available, max-content, min-content, and fit-content properties.",
  "spec":"http://www.w3.org/TR/css3-sizing/",
  "status":"wd",
  "links":[
    {
      "url":"http://demosthenes.info/blog/662/Design-From-the-Inside-Out-With-CSS-MinContent",
      "title":"Min-Content tutorial"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "TP":"n"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y x",
      "44":"y x"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"y x",
      "4.4.3-4.4.4":"y x",
      "40":"y x"
    },
    "bb":{
      "7":"n",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "24":"y x"
    },
    "and_chr":{
      "41":"y x"
    },
    "and_ff":{
      "36":"y x"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"Prefixes are on the values, not the property names (e.g. -webkit-min-content) Firefox currently supports the \"-moz-available\" property rather than \"-moz-fill-available\".",
  "notes_by_num":{
    
  },
  "usage_perc_y":71.82,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"fill-available,max-content,min-content,fit-content,contain-floats",
  "ie_id":"cssintrinsicsizing",
  "chrome_id":"5901353784180736",
  "shown":true
}
},{}],85:[function(require,module,exports){
module.exports={
  "title":"CSS3 Multiple column layout",
  "description":"Method of flowing information in multiple columns",
  "spec":"http://www.w3.org/TR/css3-multicol/",
  "status":"cr",
  "links":[
    {
      "url":"https://dev.opera.com/articles/view/css3-multi-column-layout/",
      "title":"Dev.Opera article"
    },
    {
      "url":"http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/an-introduction-to-the-css3-multiple-column-layout-module/",
      "title":"Introduction page"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/column-width",
      "title":"WebPlatform Docs"
    },
    {
      "url":"https://github.com/BetleyWhitehorne/CSS3MultiColumn",
      "title":"Polyfill"
    }
  ],
  "bugs":[
    {
      "description":"In Firefox, the property `column-span` (or `-moz-column-span`) does not yet work. See [the bug](https://bugzilla.mozilla.org/show_bug.cgi?id=616436)."
    },
    {
      "description":"In Chrome, the `-webkit-column-count` directive does not yet work with print stylesheets. See the [following bug in Chromium](https://code.google.com/p/chromium/issues/detail?id=99358)."
    },
    {
      "description":"Chrome is reported to incorrectly calculate the container height, and often breaks on margins, padding, and can display 1px of the next column at the bottom of the previous column."
    },
    {
      "description":"Browsers behave differently when flowing `ol` list numbers in columns: IE and Safari only show numbers for the first column. Chrome does not show any numbers. Only Firefox behaves as expected with numbers showing for all items."
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y",
      "11":"y",
      "TP":"y"
    },
    "firefox":{
      "2":"a x",
      "3":"a x",
      "3.5":"a x",
      "3.6":"a x",
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"a x",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"a x",
      "22":"a x",
      "23":"a x",
      "24":"a x",
      "25":"a x",
      "26":"a x",
      "27":"a x",
      "28":"a x",
      "29":"a x",
      "30":"a x",
      "31":"a x",
      "32":"a x",
      "33":"a x",
      "34":"a x",
      "35":"a x",
      "36":"a x",
      "37":"a x",
      "38":"a x",
      "39":"a x",
      "40":"a x"
    },
    "chrome":{
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"a x",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"a x",
      "22":"a x",
      "23":"a x",
      "24":"a x",
      "25":"a x",
      "26":"a x",
      "27":"a x",
      "28":"a x",
      "29":"a x",
      "30":"a x",
      "31":"a x",
      "32":"a x",
      "33":"a x",
      "34":"a x",
      "35":"a x",
      "36":"a x",
      "37":"a x",
      "38":"a x",
      "39":"a x",
      "40":"a x",
      "41":"a x",
      "42":"a x",
      "43":"a x",
      "44":"a x"
    },
    "safari":{
      "3.1":"a x",
      "3.2":"a x",
      "4":"a x",
      "5":"a x",
      "5.1":"a x",
      "6":"a x",
      "6.1":"a x",
      "7":"a x",
      "7.1":"a x",
      "8":"a x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"a x",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"a x",
      "22":"a x",
      "23":"a x",
      "24":"a x",
      "25":"a x",
      "26":"a x",
      "27":"a x",
      "28":"a x",
      "29":"a x"
    },
    "ios_saf":{
      "3.2":"a x",
      "4.0-4.1":"a x",
      "4.2-4.3":"a x",
      "5.0-5.1":"a x",
      "6.0-6.1":"a x",
      "7.0-7.1":"a x",
      "8":"a x",
      "8.1-8.3":"a x"
    },
    "op_mini":{
      "5.0-8.0":"y"
    },
    "android":{
      "2.1":"a x",
      "2.2":"a x",
      "2.3":"a x",
      "3":"a X",
      "4"�"a x",J  "   "4&1"�"q x",
0     "4�2-4,3":"a x",
      "4.4":"a x",
   `  "4.4.3=4.4/4":2a x",
      "40":"a"x"
    },
 �  #jj":;
      "7":"�(x",
  !   "10":"a t"
    },
    bop_moc":s
     ""10":"n",
 8    "11":2n*<
      "11.1":"y",
      "11.5":"x",
      "s2&:"y"$
      #92.1":"y",
    " �2�":"c x�
    },N    "and_chr�:{
    ` �41":"a x"
    },
    "anl_bf":{
      "36R:"a$x"
"   },J    "ie_mob":{
   (  "1p":#y",
 0    "11":#y"
    },
    "and_uc":{
 0    "9.9":"` x"
 `  }
  },  "notes":"Partial support refers to n.� supportilg the `breek-befre`, `break-after`, `bzeak-inside` properties. Web{ip browsers $o jave equivalent supxort for the �/n-standerd d-webkit-columj=brdak-*d propmruies while Firefox 3Uprorts0�page-break-*a t icCompLish the same r�sult (but only tle `auto  and�dadways' vclues),"
  "ootes_byONum":{
    
 �}$
0 "usage_peRc_y":13p&,
  "usawe_0erb_a&:79.98,
  "ucpvefi�":fclse.
  "xarent"6""
  "keyw-rds":"column�count",  "ig_id":"multibolumnf�llsepport",
  "chrome_id":"65�615126666648".
  "shown":true
��},{}],86:[&u.cpion(require(module,eXpozts){
module.exports={
  "title":"CSC1 object-fip/object-pmsitinn",  "Desc�ip�ion"�"Eethod of specifying how an o�hect (image or vId$o) shoult fit insife its box. objeat-nit ottion� includg \"contain\� (fit�cccording to a{pect ratio), \"fill\"$(stratahes object to�fi,l) avd(]"cover\" o�erflows box but lainteins ratio), whur� object-posithkn allows the object to be repo{itioned$hike bickground
  "spec":"xttp://www.ws.org/TR.#ss3-images/"l
" "status":#cr",
  "lanks":[
`  "{�   $  "qrl"*"https://dev.opera*com/articneq/view.cws3)object)fit-o`ject-positimn/",
     ""title"z"DdrOpera artis|e"
    },
    {
 `    "usl":"httpz//docs.webpladform./rg/wiki/css/ppopeRties/ob�ect-fit"-
�     "tidlE":*WebPl!tfrm Docs"
    },    {
   $ 25rl":"https8//github.com/ansUlml/object-�it#,
  $ ! "title"*object-fit J`vaWcript-PolyfiLl"�!   }
  ],
  "bugs":*      ],
  "catEggries":[
    "CSS3"
  ],*  "stats":{J!  `"ie":{
    ( "5.5":"n",
      "6":&n",
     !"7">"~",    � "8":"n",
      "9":"n"<
      "10":2f",
   !  "1!":"n",*`     "TP":"."
    },
    "firefox":{
      "2":"n",      "3#:"o",
$   0�"�.5"�"n",
     !"3.6":"n",
    � "4":".",
      "5":"n"$
      "6":"n",
      "7":"n",
    ! "8":"n"$
   $  �9":"n",
     $"10":2n",
      "11":�n",
    � "12":"n",
      "1;2:"~",
`0   $"14":"n",
      "15":"�",
      "16&:"n",
$     �17�*"n"� "    "18":"j",      "19":"n",�      "20":"l",
   !  "21":"n",
      22":"n",
      "33"2�n",
( $!  "04":n",
      "65":"n",
      b26":"n"$
      "27:"n",
      "2:2:"n",
      "29":"n",
      "30":"n",      "3!":"n",
      "32":"n",
       33":"n",J      "34":"n",
    �  {5":"n", `    "36b:"y",
      "37":"y",
      "39 :"y",
    0 "392:"y"
      &<2":"y"    },
`   "chrome":{
      �4":"n",
   !  "5"*"n",
      "6":"n",
     $"&":".",
 �    "8":"n",
      "9":"n",      "10":"n",
      �11":"j",
0     �12b:"n",
      "!3";"n",
      "14":"n",
$     "05":"n"-
     �"16":"�"-
 0  0  17":"n"(
      "18":"n",*      *19":"n",
      "20":rn",
     `"2!":"n",
   !  "22":"n",
   �  "33":"j",
      2�":"n",
`     "25":&n ,
      "r6":"n",
 "    "27":"n",
   "  "28":"n",
 !    "29":*n",
 �(   "30":"n",
      "31":"y",
  0   "�2":"�",
      "33"2"y&,  "  ("34*:2y",
 "    "35":"�",
     !"36":"y#,
    ` "37 :2y",
      "38":"y",
    " "39":"Y",
    0 "4 ":"y",
     b"41": y",
      "42""y",
  !�  "43":"y",$$ " ("64":"Y"
    },
  0 "safari":k
  "   "3.1":"n",
   !  ";.2":"n",
      "4":"n",
      "5":"n&-
  $   "5N1":".j,
    ` "6":"n",
      "6.1"8"n",
      "3":bn",
      "7�":"a #1",
      8">"a #1"
    },
    "opera":{
      "9":"n",�      "9.5-9.6""n,
      "10.0-50.1";"n"<
    $ "10.1":"n,
  !   "10.6":"y x",
      "10":"y(y"�
      &10.1":"y z",
      "11.5":"y x"�
      "11.6":"y x",
     ""1r":"y�z",
     $"12>1":"y x",
      "15": n"�
 "    "16":"n",
     "17":"n",
 (    "18":"n,
      "19 :"y",
      "20":"y",
      "2�":#y",J    ` "22":"y",
 ( $ $"232:y",
      "24"z"y"�
      "65:"y
" 0   �2�&:"y",
   "  '2s`:&y",$   ( �(�:"}",
   �% &29�:�y"    },$0  �+os_sef":{
      "3.2":"n",
 0    "4.0-4,1":"f",   $  "4n2-4.3"n"
 $    #5.0-.1&:"n",
    0 "6o1-6.1b:"n",
      "7.0-7.1":"n*,
 $""  "8�:"a #1",
     !b8.1-8>3":a #1"
    },
    "op_mini":{
     !"5*0-8.0":"{ x"
 ( 0},
    "antroid":�
( �  $"2,1":"n",
      "2.2":"n"
      �2.3"�"nb,0     &3":"n",
   �  "4":"N",
      "4.1":"n&�
  `   "�.2-4.3":"n&,
"    0"6,4:*n2,
     ""4.<.3-4.4.4":"} ,
! � ` "40":"y"
 "` },
    bb":{
      "7":"n",
  0 � "10":"n"
    }-
    "op_eob":{
  , d "10":"n",
  `   211":"y x",
    ) 011.1":"y x",
     !"11.5"�"y x2,J      b52":"y x",
      "12.1":"y X".
 !"   b24"z"i"J    }$
   b"and_chr":{
      "41:"y"
    }l
    #and_ff":{
      "36":"y"
    },
   !&ie_mob"jz
!     "10":"n",
      "11":"n"
    },
    "`nd_wc":{
      "9.�":"n"�    m
  },
  "notes":"",J $"nktes_by_num":{
 "$�"1":"Partiql(support in Sqgari refers to supp�vt For `object-fyu` but not `ob*ect-powi|ion`."
  �,
  "usagu_perc?y":�?.56,
  bwsaceOperk_a#:7.96d
  "ucprefix":fa�Se�
  "par%nt":""-
  "ke9words":"objg#Tbit,objectposition&,
  "ie_id"> objec�fitando�jabtposIdion",
! "chrn-e_id":"530266y70205661t",
 �"slown2:tsu%
}},{|],878[functIon(zequire,modulu,exportsi{
module.�xpOrts={  "title":�Po�ntep events"l
(  dd�aription":bThis specificqtion0intEgrates various inp}ts from mice, touchscreans, and pens, makinG separcte imrlementatimns no ,onger necessary and authoring fr!cross-tevice pointerS e`siEr. No� t/ be -istaken wit` the unrelated \"pointer%e�ents\" CSS properTy.",
  "spec":"http://w~w?w3.org/TR/pointer�vents/ ,
  "s4atus"8*rec",
 !"minos":[
    {
�     "url":"http://b|og2.mqdn.com/b/ie/archIve/"011/09/3 /touch-inpu�%f�r�ie10-ald-metro
 0  },
$   {
  !   "url":"http:/'blogs.-sdn.Com/b/etebnclcodinG/archi�e/2013/0�/16/hand-��-a-pmlyfill-for-supzortiNg-pointer-evenvs�on-every-browseb.aspx",
      "title":"Hand.js, T�e polyfill for bvows%rs only s�`portinf Touch Ewents"    },
    {
  !   "url":"h\4p://blogc.msdn.ckm/b�davrou3/srchife/2013/0"/20/handlhng-toucl-in-yoUr-Htmd5-qpps-thanks-to-the-pointes-evdnts-of-ie10-cnd-winlkws-8.aspx",
      "title":"�rticle & tutnbial"
    }
  ,
   bucs :[
    
  ],
� "catagories"<[
    "DOM",
(   "JS0API"
  ]-
  "statq":{
  ` "ie":�
�     "5.5":"n",
     %"6":#n ,
      "6":"n",
      "8""n",�      "9 :"n",
      "12":"a x"l
      "1":"y",
"     "TP":"y"
    },
    "f�refox&:{
     ""2"�"N*,
      "3"8"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5�:"n�,
  `  0"6": p�,
�     "7":"p",
    ` "8"2"p",*      "9"*"p",
      "1":"p"l
      b13";"p",
      "12"*"p",
      *13":"p",
      "14:"p",
(     "13":"p",
   !  "16�:"p",
      *17":"p",
  $ 0 "18":"p"(
�  0  "19":"p*,
   !  "20":"p",
      "61":"p",
   1  "22":"p",     $"23�:p",
  (   �24":"P",
      "25":*p",
  $�  "26":"q",
�     "27#�"p#,
    " "28#:"p",
      &2�":"x",
(   " "30":"`",
    `0"31""0",
      "32":"p"
 (    "33":"p",
!     "34":"p",
      "35&:"p",
!     "372>"t",
  0   "37">&p",
 !!    #: :"x",
!     "39":"p",
      "40":"p"
    },
    "chvom�":{
      "4":"n",
      "5":"n�,
      "6":"n",
      "7":"n",
      "8":"n",
      "9�:"n",J      "18":"n",
      "11":"n",
      "12">"n"l
 !    13":"n",
   " 2"14"2"n"
 �    b15":"n"�*      r16�:"~",
  `  0"17":"n#,
      �18":"n"h
    " "19":"~"�
"     "20":"�",
      "2�":"n",
  !   "20""p",
  ( 0 "23":"p ,
      "24":"p"<
      "25":"p!,
      "26": p"      "26""p",      "28&:"r",
  A ! "29&:&p",
     �"30": p",
$ $   "30": p ,
0!    "32":"p"<
      """p"�
      "34":"0",
   "  "35";"p"," � ( "36":"`"-
      "7":"p"-
      "38":"p",      #;9":"p",
  !   "40`:"p",
      "41":"p",
      "42":"t"<J$  (  "43":"p",
8 (   "44":"p"
    },J  � "sabari"*{
      "3.1#:"n",
      "3.2:"nb, 0    "4":"n",
      "5 :"~"-
    0`"1.1":"nb$
      "6";"n",
      "6.3#:"p",    ! "7":"p"(
� � �""7.1":"t",
     ("8":"p"
  ` },
    "opdra*:{
      #9":"n",
      1.5-9/6":"n",
      "10.0-10.1":"n2,
(   ` "10.5":&n",
 !    "11.6":"n",
 �    "11":"n",
      "11.1":"n",
      "1�.5"*"n",
(     "11.6":"n"<
      "12":"n",
      "12.1":"n",  !(  "1="�"x",
 �0   "1"":"p",
      "17": p",
      "18":"`"(
   "  "19":"p",
      "20"z"r",
    ( "21":"p"�
     ("27":2x",
  $   "232:"p#,
   $  "24":�pb,
      "25 :"p",�      "26":"p",
     `"27":"p ,
 ! (  "2("*"p",
  �   "09"z"p"
    },
   ""ios_saf":{
      "32"��p",
   (  "4.p-4.1*>"p",
  0   "5.2-4&3":"p",
      "5.0-5.1":"p",*   ,  "6.0-��1"�"p",
  "   "7.pm7.1":"p",
  ! ! "8":"p",*      "8&1-8.3":"p"
    },
    "op_mini"*{
      "5.0-8�0"8"n"�   },
 ! �"android2:{      "".5":"p"$
      "2.2":*p",
      23.3":"�",
      "3":"p",
 $  � "4�:"p",
      "4.1":*p",
      "4>2-4.2:"p"
( 0   4.4">"p",
     ""4.4.3-4.4.$":"p",
      "$0":"p"
  ��}.
$   "bb"?{
  �   "7":"P",
   !  "12"r"p"
 D  },
    "gp_mob":{
      "10";"n",
" 8   211":"0",
   $  "11.1*:"p",
    b "!&5":"p",
      "12":"p",
  0   "9".!":"p",      "24":"p"
    �,
    "and_chr":{      "$1":"p"
0   },
 �  "anf_ff":{
0   " "36":"p"
    }l
    "ieO-ob":{
   !� "10":"a y",
      "11":"y"
    },
"   "enf_uc":{
      "9,9":"p"
    }
  },
  "notes":bPcrtial wuppnrt in0IE10 rdgers ThE lack f x/interenter and poinperleave0event3. Firefox Nigxtly prnvides 'dom.w3c_Pointmr_events.mnabled' opvion to suppgrt thKs specif)getion st!rtilg �itm vercigj 28.",
  2nt�s_"ynum":s
`   
  },
  "usage_pebc�Y"z8.49,
  "usage_perc_a"81.5,
  "ugpr�&ix":falwe,
  "pepent*:"",
  "keywords":"xointerdown-pointebmkve,poinderup,pintercancel,phnterover,poi~ter/ut,pgifterenter,pginterleava",
  "i�_id":"poinper~ents",  "chsome_id�:"450469938998272",
  "siOwn":true}
},{m].8(:[f}nction(rewuize,mo`ule,expk2ts){
moeuLe.exqorts={
  "titlm":"text-desoratioj styhing/,
  "description":"Me4hod of defining thg type, style and color og lines i~ the text-decoration property. These`can be lefiNed as shortyand (e.G& `dext-decObatkon: line-throu'( dashed cl�e`) mr as �in�lg prOrerties �e*g. `text-dEcor`�ion-color: b|ue`)",
  "speb:"http://sww.w3.org/TR/css-t�xt-decm2-3/,Ine-decoraUion",
  "status"8"cr"&
  "links":[
  ` s
      "ubl":"https://developer.mo{illa.orgwn-USgdmcS/Wef/CSS/text-dacoration=style",
     �"title":"MDO�DocumentAvion for tdxtmdecoration-style"
    �,
    {
      "Url":"httqs*//developer.-o:inla.oR�/en-US/docs/Web/CSS/text-decoration-comor",
      &tiTle�:"MDn Emcumentat�on!for text-decoration-c/lor"
    }lJ    {� `  ! "url":"htt`s://devehopeb.mozilla.org/en-Us/docs/Web/CSS/text-decoration-line",
      "pytlE":"MDN Lo�umentation fgr text-decoration-line"
"   }
  ],
 `"bugs":[
(   
  ],
  "cateeories":K
   CSSs"
  ],
  "st!ts":{J� "  ie":{
      &5.5""n",
      "6":n",
      "7":"n",
$ �   "8">"n",
      "9":"�",
      *10":#o",
    $ "11"2"f",
      "TP":"n"J    },+   $"virefox":{
      "2":"n",
      "3&:"n"�*    0 "3.5":"�",
      "3.6":"n",
 (    "4":"n"J `    "5":�n",
    ""6":"y x#,
    ( "7r:"y x",
   $  "8":"y x".
  �`  "1":"9 x"(
  `   "10":�y x",
     ""15">"y x",
  $   "12�:"y x",
       13":"y x",
      "14":"y x,�      "15":"y x",
   "  "16":"y x"�
      �17":"y x",
     �"18":"y x",
      "19": y x",
   �  "0":"y x",
      :1b:"y x",
 !" ( "22":"y x",
      "23":"y x",
      "2<":"y x"�
 `    "25":"q`x",
      "26":"y`x",
(     "25*:"} x",
   �  "28""y x",
�     "29 :"y x",
      "30":"y x",
      "31":"y x",$    `"3�";y x�,
      "33"8"� x",
 (  0 "34":"y x",
      "35":2y x",
     `";6":"y",
 " "  "37":"y",
      "38"�"y",J      23�":"y",
      "40":"x"
    },
    "chrome:{
      "4 :"n",�      "5": n",
     0"6":"n",
     !"7:"n",
      "8":"n*,
      "9":"n",
      "10":"n",
0     #11":"n*,
$  `  "12":"n",
      "13�:"n",
$     !10"z"n",
      "15":"n",
 ! ,  "1":"N",
      "17":"N#,
      "1":"n",
    ( "19":"�",
      "20�:"n",
`     .21"�"n",
      "20": n",�    $"232:"n"
      #24":"n",
   �  "25�:"f",
 "    #26:"n x d #1",
  $   "2w":"n x�f #1"<
      "28":�n x d #1",
  0   �:9":*j x d #12,
    ! "30":"n x d #1",
      "s1":"n x d #1*,
   !  "32":"n x d #1",
      "33"z"n x d #�",
"$ ` "30"�"� x0d #"," t   "35":"N | d(#�,
  $`  &36":"n X d #1*$""   $"r�:"� x e #1",
      "38""n x d #1",
     ("3y":"n x d #1*,
     "4�"�"n x(d 31",
0     "41":"n x d #1",
(     "42":"n x d`#1",
      "43":"n X d #1",*      "54":"n x d #1"
    },
!   "sabari":{
      "3.1":"n",
   0$ "3.2":"n",
      "4";"n",+�" `  "5":"l"
      25.1:"f"<
`     "6":"n",�    0 "6.1":"n",
      "7": n",
    $ "71":"a x #2",
 !     8":"a$x #�"
�   },
  " "opera":{
      "9":"n�,
      b9.5-9.6":"n"
      "10*0-10.1":"�"-
      "10.5":"n",
      #12.6b:"n",
      "11*:"n",
      "11.1":#~",
     $"1.%B:"n",
      "11.6&:"n".
      "12":"n"l
   (` "12.1":"n"(K      "15"2"n",�     "16":"n*l
      "17":"n",
      "18":"n#(
      "39":�n",
    0 "22":"n",J      "21":"n",
   (  "22"."n*.
      "23":"n"$
      "24b:"l",
0   � "25":"n",
      "26":"n",
 #  0 "2#:"j",
      "28":"n",
 $    "29":"n"
    },
    �aor_saf":s
       2.2":"N",
      "4.0-4.1"*"n",
      "4.2-4/3":"nr,
       5.2
   � ("�.0-6.1":"n",
    ` "7.0-'.1":"n",
      "8">"a x #:",
!     "8.1-8.3":"A�x #2"$   },
    "op_mioi":{
      "5.0-8.0":"n"
!   },
    "qndroid":{
   (  "2.9": n",
      "2.2":"n&,
     ""�.3":"n",
      "3&:"~"-
     ("4 :"n",
   0h #4.1":"n",
  `   "4.2-4.3":"n"-
    $ "4.4"z".",
      "4.�.3-4.4.4"*"�",
   "0 "40":&j"
    },
 8  "b` {
  8   "7":"n",
     ""1 ":"n"
    },*    "op_mob":{
    ! "1�"z"n",
      "11":"n",
(     *11.1";"n",
      "11.5":bn",
    ` "12":"n"$
  0   "12.q"�"n",
   `  "4":"n"
    u,
   $"an`_chr":{
      "41":"n"
    m,    "and_ff":{
      "36":"y"    =,
    "ie_mob":{
      b10":"n",
      "11":"n"
"   },
    "and_uc":{*"   �("9.9":"n"
 0  }
  ],
  "nopes"z"All brow1ers suaporu thU CSS2�version of `4ex�-decoration`, Which oatcher only the `texv-decoration-lin�` v�nues (`underline�, etb.)",
  "nl0es_bh_num":{
  ( "12: EnEbled iN Chrome thrOugh the \"uxperimenta� �gb Platfkrm$fuatures\" dlag in cIromu://flags",
    "22:"Perti`l suppor| in�Safari refErS 4o not suppor4ing the text-decor�thon-style property."
� },
  "uSage_Perc�y"12.21,
  "usag�_p%rc_a":7.96,
  "ucprefi�":�an{e.
((&parant":"",
  "keywkrds":"text-decoraTk/n-line,text-decora4ion-style,4ezt-tdcor�tion-color",
  "ieid":"",
  "chrome_id":"",
  "shown";tRue
w},{}},09:[functyon(require,mklule,ex0�rps){module.ixport{={
( "4iTle": text-emphasys st�l�ng",
� 2emscription":"Method of using small symbols next to each gly�h tm emphasize0a run of(text, com-o~lx used In�EaS4 Asian languages" The a|ext-emphasis` shmrthajd, and its `text-%mpxasis�suyle` af4 dDext-e�phasis-color` l.fhands,�#qn ce used tn apply mazjs to0the te�t. The `text-empjasis-posmtio�` pvoperqy,!whoch inhevits separately, allows setting$the �mPHcsis marks% position with rucpecp tg t`e text.",
  "wpec":"jttp://www.w3.org/TR?cs3-Texd-decor-3/#peht-emphasis"$
� "�ta|us":"cx",
  "lInks"�[
    {
 $    *url":"https://fi�huj.wo}/zmmbreeze/jqueby.emphasis/,
"     "title":"A zarascriPt fall�aCj`fo� CSS3`emphaskw mArc."
 $ !}
  ],` "bugs":[
    {
      "`esgziption":"Chroie on Andrmid occasionall9 has issu�s reneering enphasis glyphs correcdly.&
 "  }
  ],
  "categmrimr":[
    "CSS3"
  ],
  "stadsz{
 "  "ie":{
      "5.5:"n�,
(   ( "6":"n",
     !"7":"n",
      "2":"n",   `  "9":"n",      "10":"n",      "11":"n",
      "TP&:"n"
    },
 0  "firefox":{
      "2":"n",
      "3":"n",
   �( "3.�":"n",
      "3.6":"n",
      "<*>"n",
      25&:"n ,
      "4":"n",
      "7 :"n",
      ""2"n",
       9":"n,
      "10":"l",
   �  "11":"n",
   "  #12":"n",
      "13":"N",
      "!4":2n",      "15":"n*,
  "   "16"�"n",
"   ! "1;":"n",
!     "18":"n", 0    "19":"n"&
      "r0":".",
      221":"n",
      "22":"n",
      "23":"n ,
      "24":"n",
      "25":"n",
      "3v"z"n",
      "27":"n*<
      "28""n",
 ((   "29":bn",
      "�0":"n",
  0   "31":"n",
  0   ";2b2"fb,
!     b33":"n",
 "    "34": n",
     !"3=":#n"$
      "36":"n",
     ""37":*n",
  !  $"38":"~",      "3�":"n",
d    $"40":"f"    },� !  "cHrome":z
    $ "t":"n".
      "5":"n"
      "6":n",
     $"w"2"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1",
      "40":"a x #1",
      "41":"a x #1",
      "42":"a x #1",
      "43":"a x #1",
      "44":"a x #1"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"a x #1",
      "7":"a x #1",
      "7.1":"y",
      "8":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"a x #1",
      "4.4.3-4.4.4":"a x #1",
      "40":"a x #1"
    },
    "bb":{
      "7":"n",
      "10":"a x #1"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "24":"a x #1"
    },
    "and_chr":{
      "41":"a x #1"
    },
    "and_ff":{
      "36":"n"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"a x #1"
    }
  },
  "notes":"Some old webkit browsers (like Chrome 24) support `-webkit-text-emphasis`, but does not support CJK languages and is therefore considered unsupported.",
  "notes_by_num":{
    "1":"Partial support refers to incorrect support for `-webkit-text-emphasis-position`. These browsers support `over` and `under` as values, but not the added `left` and `right` values required by the spec."
  },
  "usage_perc_y":9.21,
  "usage_perc_a":54.43,
  "ucprefix":false,
  "parent":"",
  "keywords":"text-emphasis,text-emphasis-position,text-emphasis-style,text-emphasis-color",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],90:[function(require,module,exports){
module.exports={
  "title":"CSS3 Text-overflow",
  "description":"Append ellipsis when text overflows its containing element",
  "spec":"http://www.w3.org/TR/css3-ui/#text-overflow0",
  "status":"wd",
  "links":[
    {
      "url":"https://github.com/rmorse/AutoEllipsis",
      "title":"jQuery polyfill for Firefox"
    },
    {
      "url":"https://developer.mozilla.org/En/CSS/Text-overflow",
      "title":"MDN article"
    },
    {
      "url":"http://www.css3files.com/text/",
      "title":"Information page"
    },
    {
      "url":"https://raw.github.com/phiggins42/has.js/master/detect/css.js#css-text-overflow",
      "title":"has.js test"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/text-overflow",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"Does not work on `select` elements work in Chrome and IE, only Firefox."
    },
    {
      "description":"Some Samsung-based browsers, have a bug with overflowing text when ellipsis is set and if `text-rendering` is not `auto`."
    },
    {
      "description":"Does not work in IE8 and IE9 on `<input type=\"text\">`"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "TP":"y"
    },
    "firefox":{
      "2":"p",
      "3":"p",
      "3.5":"p",
      "3.6":"p",
      "4":"p",
      "5":"p",
      "6":"p",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"y",
      "5":"y",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"y",
      "3.2":"y",
      "4":"y",
      "5":"y",
      "5.1":"y",
      "6":"y",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y"
    },
    "opera":{
      "9":"y x",
      "9.5-9.6":"y x",
      "10.0-10.1":"y x",
      "10.5":"y x",
      "10.6":"y x",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y"
    },
    "ios_saf":{
      "3.2":"y",
      "4.0-4.1":"y",
      "4.2-4.3":"y",
      "5.0-5.1":"y",
      "6.0-6.1":"y",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"y"
    },
    "android":{
      "2.1":"y",
      "2.2":"y",
      "2.3":"y",
      "3":"y",
      "4":"y",
      "4.1":"y",
      "4.2-4.3":"y",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "40":"y"
    },
    "bb":{
      "7":"y",
      "10":"y"
    },
    "op_mob":{
      "10":"y x",
      "11":"y x",
      "11.1":"y x",
      "11.5":"y x",
      "12":"y x",
      "12.1":"y",
      "24":"y"
    },
    "and_chr":{
      "41":"y"
    },
    "and_ff":{
      "36":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y"
    }
  },
  "notes":"",
  "notes_by_num":{
    
  },
  "usage_perc_y":97.04,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"textoverflow,ellipsis",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],91:[function(require,module,exports){
module.exports={
  "title":"CSS text-size-adjust",
  "description":"On mobile devices, the text-size-adjust CSS property allows Web authors to control if and how the text-inflating algorithm is applied to the textual content of the element it is applied to.",
  "spec":"http://dev.w3.org/csswg/css-size-adjust/",
  "status":"wd",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust",
      "title":"MDN Docs"
    }
  ],
  "bugs":[
    {
      "description":"There is a bug in Webkit-based desktop browsers. If -webkit-text-size-adjust is explicitely set to none, Webkit-based desktop browsers, like Chrome or Safari, instead of ignoring the property, will prevent the user to zoom in or out the Web page."
    },
    {
      "description":"If the viewport in IE Phone is set using <meta> element, the value of the CSS text-size-adjust property is ignored."
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "TP":"n"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"n",
      "42":"n",
      "43":"n",
      "44":"n"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"n",
      "7":"n",
      "7.1":"n",
      "8":"n"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "40":"n"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "24":"n"
    },
    "and_chr":{
      "41":"n"
    },
    "and_ff":{
      "36":"y x"
    },
    "ie_mob":{
      "10":"y x",
      "11":"y x"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"",
  "notes_by_num":{
    
  },
  "usage_perc_y":12.17,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"",
  "ie_id":"",
  "chrome_id":"",
  "shown":true
}
},{}],92:[function(require,module,exports){
module.exports={
  "title":"CSS3 Transforms",
  "description":"Method of transforming an element including rotating, scaling, etc.",
  "spec":"http://www.w3.org/TR/css3-2d-transforms/",
  "status":"wd",
  "links":[
    {
      "url":"http://www.westciv.com/tools/transforms/",
      "title":"Live editor"
    },
    {
      "url":"https://developer.mozilla.org/en/CSS/-moz-transform",
      "title":"MDN article"
    },
    {
      "url":"http://www.webresourcesdepot.com/cross-browser-css-transforms-csssandpaper/",
      "title":"Workaround script for IE"
    },
    {
      "url":"http://www.css3files.com/transform/",
      "title":"Information page"
    },
    {
      "url":"http://www.useragentman.com/IETransformsTranslator/",
      "title":"Converter for IE"
    },
    {
      "url":"https://raw.github.com/phiggins42/has.js/master/detect/css.js#css-transform",
      "title":"has.js test"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/transforms/transform",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"Scaling transforms in Android 2.3 fails to scale element background images."
    },
    {
      "description":"IE 10 and below does not support CSS transforms on SVG elements (though SVG transform attributes do work)."
    },
    {
      "description":"Transforms may break position:fixed styles of contained elements"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"p",
      "7":"p",
      "8":"p",
      "9":"y x",
      "10":"y",
      "11":"y",
      "TP":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"y x",
      "3.6":"y x",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y"
    },
    "chrome":{
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y"
    },
    "safari":{
      "3.1":"y x",
      "3.2":"y x",
      "4":"y x",
      "5":"y x",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"y x",
      "10.6":"y x",
      "11":"y x",
      "11.1":"y x",
      "11.5":"y x",
      "11.6":"y x",
      "12":"y x",
      "12.1":"y",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y"
    },
    "ios_saf":{
      "3.2":"y x",
      "4.0-4.1":"y x",
      "4.2-4.3":"y x",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"y x",
      "2.2":"y x",
      "2.3":"y x",
      "3":"y x",
      "4":"y x",
      "4.1":"y x",
      "4.2-4.3":"y x",
      "4.4":"y x",
      "4.4.3-4.4.4":"y x",
      "40":"y"
    },
    "bb":{
      "7":"y x",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "12":"y",
      "12.1":"y",
      "24":"y"
    },
    "and_chr":{
      "41":"y"
    },
    "and_ff":{
      "36":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"The scale transform can be emulated in IE < 9 using Microsoft's \"zoom\" extension, others are (not easily) possible using the MS Matrix filter",
  "notes_by_num":{
    
  },
  "usage_perc_y":91.85,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"transformation,translate,rotation,rotate,scale,css-transforms",
  "ie_id":"transforms",
  "chrome_id":"6437640580628480",
  "shown":true
}
},{}],93:[function(require,module,exports){
module.exports={
  "title":"CSS3 7D Transf/r-s",
  bdescryp|ion":"Met`od of0prqnsforming a.0element mo the uhird dmmension using the `4rqf3form` property.`Includms support for`the `perspective` propdrty to s%t the perspective in$r-spac� and!the(`cackface-visibility` property to toggle display of the reverse side of a 3D�transforMed element.",
  *spec":"httx://www.w;.org/TR/css3)3d-transforms/",
  "status":"wd",
  "links"[
    {
   !  "url":"http://css3.bbafshawenterpzises.c/m/flipo2,
    ` "piul�":"Muhui-bro7sdr"demo"    m,
    {
  $   "urd#:�http://hacks.mozilla.org/2011/10ocss-3d-transformatiojs-in-firedox-nyghtny/",
     ("ditlE":"MozIlla hacks article"
    },
    {
  (   "ur�":"h�tp:'/|hewebrock�.com+demos/3D-css-tester/",
     $"title":"3D cSS Tuster"    },
  ! {
  �   "urd""https://rew.git�ub.com/phiggiNs42/has.js/maspar/detect.css.js"css-transfovm",
 (    "vitle":"his.js test"
    },
    {
      "Url":"ldtp:/docs.webplatform.org/wiki/sss/transforms/trensfor-",
     �"4itle":"WebPlatform Lobs"
    },
    {
  "   "url":"hutp:/?desanlro.github.io/3dtransforms/",
      "4atle":"Intro!to CSS 3D trcnsforms"
   (}
 !],
  "fugs2:[
    {
a  `  "descraption":"Some configurations od Linux a~d older indows"mAchines (dhose gIthouv WebGL support) have"tRoublg with 3D transforms and0will traav them as if(`terspective` was set as `Nooe`."
    u(
    {
      "descrippion":"Firedox on!Windows incorrectly`renders pl5gmn contmnt within no-�p 3D transfgrms](https:/'bugzIlla.mozidla./rg/showObug/cgi�id=1048279)."J    },
    {      "deScriptio.";"Tje `pepspective` pRopert� doesn/t work on the"`body` element in Firefox�!it must je used on an innur element."
 (  }�  ],
  "categosies":[
    "CSS3"
  Y,  "stats":{
    "iE":{J      ".5":"n",
  0   "6":"n",      "7#:#n",
      "8":"n",      "9*:"l",
      "10":"a",  $ " "11":"a",
     ("TP":"y"
    },J   ("firefox":{
  (   "2":"n",�     "3""n",
      "3.5":"n",
    ! ��.6":"n",
      "4":"f",
      "5&:"n",
   $  "6":"n",
      "7":#n",
      "8":"n",J      "9":"n",
      "10":"y y",*      "11":"y`x",
      "12":"y x"(
(     �03":"y x",
      "14":"{!x",   "  "1e":"y x",     ""16":"y",
  0   "17 :"y#,
   !  "!8""y",
      "1�""X",
      "2p":#y",
      "21":"y",
 !  `":2":"y",
 !" `�"23":"y(
      "24":"y"-
      "25":"y*,
   (  "6":"y",
      "67":"y*,
      &28":"y",�0     &39":"x",     �"30":"y".
      "31":"y",
      "32":"y",
  $   "33";"y2,      "34":"y",
      "35":"{",
      "36":"y",
      237": y",
  0 ` "38":"y",
      "39":"y"� "     40"�#x"
    },
 ,  "ch2ome":{
      "4":n2,
      "5*:"n",
      "&":"n",
      "7"z"nb,
!   ( "8":"n",
   `  ";":"l",
      "10":"n",
      "13":"n",
     `"12":"y x,
  `    1s":"y x",
     4"14":"y p",�  ` `  15":"y x",J      16":"y x",
     (#17":"y x"�
      *18":&y x",
      "19":"y <",
      "20":"y x"�    � "21":"y x",
      b22":"y x",
    " "23":"y x",
      "24":"= x",
 (    &252:"y x",
 "    �26":"y x",
 �    "27"8"y x",
      "28":"q0x",      "29":"y y",     ("30":"y x",
     0"s3�:"y x",
      �2":"y x*,
      "33":"y x",
      "34":"� x",
    " 235":"y!x",
      "36":*y",
   �  "37":"y",
  "   "38":"y",
     2"39":"y",
 !  " "40":"y",
      "41":"y#,�     "40":2y",
   !  "43b:"�",      "�4":#y"*    },
    #S�fazi":k
�     "3.1":*n"(
0 `  ("3.2":"n",
      "4":"y x",
 (    "5":"y x",
      "4.1":"y x",
    ` "6":"y p�,
"     "6.2""y X ,
      "7":"y xb,
  !�` "7.1":"y x",
      "x"2"y x"
    },
%   "opera":{
 �   `"9":"n",
      *9.5-9.6":"n",
   8  "0.0-30.1":2n",    0 "105":"n",
      "10.6":"n",
      "11":"n",J      "1.1 :"n",�      "11.5":"n ,
       11.>b;"n",
    0 "12':"n",
      "12.1"6"n",
 " !  "15"8"y x",
      "16":"y x",
 !    "17":"y x",     "18"�"y x",
      "11":"i"x",*!     "20":"� x",
 8    "21":"y x",
     "22":"q x��� `    "23">"y",
  (  �"24b:#i",
      "25":"y",
      "26"2"y"(
      "27":"y",
      2(":"y",
     �"2y":"y"
  $ },
    "ios_safc:{
    $ "3.2":"y x",
      �4.0-4.1"2"y y",
    " "4.�-4.3":"y x",
      "5.0-5.1":"y x",     $*.0m6,1":"y x", (    "7.0-7.1":"y x",
     `"8" y 8",
  (!  "8.1-0n3":"y z2
 ! �},
 "  o�_MiNa":{  $ ` #�/0-8.0":�j& !0 ,
    "android":{
  0   "2.1":"n",
    ( "2>2":"n",   "  "2.3";"n",
   0! "3":"y xb,
      "4":"� y ,
      "0.">"y x",
      "4.2-4.3":"y x",
   1  b4.4":"y x",
      "4.4.3=4.4.4"�"y |",
      "00":"y"
    }, `  2bb":{
      "7":"y xb�
      "10":"y x"
    },
    "mp_mob":{
      "10":"n",
      "91":"n",
      "11.1":"n",
      "19.5":"n",
      "16":"n",
   0( "12.1":2n",
   (  "�42:"y"
    },
   $"and_chr":{
      41":"y2
    ,
 `  "andff":{
      "36*:"y"
  $ },
 0  2ie_mob":{
      "10"*"a",
      "11":"ab
$   },
`   #and_uc":;
  `   "9.9":"y x"
    }
  },
  "nntes":"Partial sutpowt in IE refers t� not$suppnrting [the transform-sty|e:0preserve-3d property](ht�p://ms`n.microsoft.com/en-us/lijrqvy/ie/Hx673569%28v?vs.:5%29.aspx#the_ms_dransfobm]st}l�_property). This pvevmnts nesting 3D t�a.sformed elEments.",
  "nopes_by]nu-"2{
 "  
  },
  #usagg_perc_y":59.5,
  "usage_perc_a":9.99,
  "ucprevix":false,
 0"pa�ent#:"",
  "ceqwords":"css 3d3dtrans�krms$tr!nslape3d,baCkface VisibIlity,rercpective"$
! "ie_Id&:#transfoRms,csstrans�ormspbe{esve3d",
� "chrmme_id">"60;7605(0628480",J  "shown*:true
}},{�],96:[fun3tion(require,moftle�exports){
module.ex`�rts={
  "title":"�SS user-select: .o~e"(
( "eescription":"MedhoD!o� prevmnti�g Text/element {e,ection0using CSS. ",*  "spec":"(ttps://developer.mo~illa.org/en-US/docs/CSS/usEr=select",
  "stapus":"unoff"
  "linkr":[
�   {
     02url":"https://$eveloper.mojihla.org/en-US/docs/SS/user-select ,
      "title":"MDN articne"
    }    {
      "url":"http:/�css-trickw.com/anmanac/properpies/u/user-salect/",J   #  "title!:"CSR(Tricks crticle"
    },
    {      "url":"htTp:/7mqdn.microsoft.com/en-us/li�rary/he/hh78!$92(v5vq.85).aspx",
      "titlebz"MSDN Docume.tataon"
 (  }�  ],
  "bugs";[
 "  
  ]-
 `"categories":[
    "CSS&
  ],
 0"stats":{
    "Ie":[
  $   ".5":"n"-
 !    "6":"n",
      "7":"n"<
      "8":"n,
      "9":"n",�      "10":"y x",
      "11":"y x",
      "TP":"y x2
    u.
    "firefox":{
     0*2":"y x",
      "3":"y x",
      "3.5":"y x",
(     "3.6":"y x,
      "4":#y y",
    " "5��"y x"(
    ( "6":"y x"n
      "?":"y x",
      "<":"y �b,
      "9":by x",
      "10":"y x",
  �   "11":"y x",
      "2":#y x",
      "1":"y$x",*      "14":"y!x",
"     "1%"*"y x",
      "16":"� x",
      "17":*y �",
      b18"2"y x"�
      "19":"y"x",
   0  "20":"y Y".
      "2�":"y x",
      "22":"y(x",
0`   (223":"y x",
      "24":"y x",�      "2u":"x x",
      "26":"y x",
   (  "27":"y x",   0  "28":"{ x",
      "29":"y x",
�     "30":"y y"-
  ``  "33":"y0x"l
     4"�2":*i x2,
 a    #33":"y x"(
      "34":*y z",      "35":"y x�,
      "36":"y x",
      "37":"y$x",
      "38":"y z",
    ! "39#:"y x#,
    0 "40&:"y x"
    },
0   "chrome":{
      "4":"u"$       "5"�"u",     �"�":"y x",
      "7":by x",
  (   "1b:"y zb,
      "9":"y x"�
      *10":"y z"$
      "11":"y x",
     0"12":"y x",
      "13"�"q x",
      "04�:"y x",
      "15":"y x",
     ("16":"q x",
      "17":"y zb,      "18":"y x",
    � "19":�y x",
  (   "20":y x",
      "21":�y |",
   !  "22":"y x",
     `"23":"y x",
   `  "24":"y z",
 `    "25":"y x",
      "26":"y x",
 !   `227":y x",
      #2:":2y"x",
      "29":"Y x",
     0�30":"y l",
    0 "31":"y X",
      "32":"y x",
      "33":"y x",
    " "34":"y x",
  "  "3�":"y p",
     �"36 :"y x",
      "37":"y x",
   `  "38"3"y x,
 0    s9""y x"-
 0    #40":"y(x",
      "41":"y x",
      �42":"y x",
   `  "43":"y x".
      "45":"y�x"J    }, !  "safari":{
      "3.1":"y y",
` "   "3.2":"y"x",
      "4">"q x",
      "5":"y x ,
  0   "5.1":"y X"�J      #6":"y x",
      "6.1":"y x",
      "3":"y x",
    0 "7�1":" x�
   �  "8";"y x"
    },
   "opera":{
 �    "9":2n",
      "9.5-9.6":"N",
      "10.0-18.1":"n",       10.5":"n",
      "10.6":"l",
      "11":"n",
  $   "11.1"::n",
( 0    11.�":"n",J    $""11.6":"n",
 0    "2":"n"(
( !   "12.1":"n",
     `"q5":"y x",
  �  `"16":2y(x"(
      "17":"y x",
(     "18":"y x�,
   !  "19"�"y x",
      "20":"y"x",
      "21":"y x",
      ""2":"y x",
     $""3":"y x", "    "24#:"y x",
"     "25":"{ x",
  $   "26":"i x",      "27":"y x*,
  `   b28":"y x",
      "29":"y p"
    u,
    "ios_saf":{
      "3.6":"y p",
      "4.0-4.1""y x",
$     "4.2-$.;":"y xb,
   �  "5.0-5.1":"y y",
      "6.0-2.1":"y |",
 (!   "7.0-7.1":"y x",
   0  "8":"i x",
      "8.1-�.3"�"y x"
`   },
   ("t_mioi":{
      "5.0-8.0":"n"�  " },
 (  "android":{
  00  "2.":"y x",
      "2.2":"i x"�
      "2.3": y h",
!     #3:"y x",
      *6":"y x",
      "4f1":"y x",
      "6.2-4.3":"y x",  "   "4.4":"q x",      "4.4.-4.4.4":"y x"
      "0":"y x"
    },
    "bc":s     !b7b:"y x",
      "10":"y 8"
(   },    "op_mob":{
      "10":"n",
0`    "11">"f",
 !   �"11.1":"n",
  "   "11.5&:"n",
�  (  "12":"n",
    $ "42.1#:"n",      "24":"y x"
    },B    2end_chr":{
      "$1":"y x�*$   y,
!   2andff":{
   00 "36":"} x"
    },
    "ie_moj";y
 �    "10"8#y x2,
      "11":"y x"
    },    #and_�c":{
   "  "9.=":"y x"
,   }J `},
  "notEs*:"Cuvrently thE uSer-select property dges not apqear in afy G3� 3pecifkcitIon. Support inforlatigf hEze is only for X"none\" value, not others&",
  &lotes_by_fum":{
`   
" },
$ "usage_perc_y":89.94,
 ""us!gupezc_a":0,
  "ucprefix":fadsa,
  *parent�:"",*  "keyworfs":"",
  "ae_id":"",
  "chrome_id":"",
  "show.":true
}
},{}],95:[functao�(repwire,oodulE,expozts!{
/????7 Greatest Common Diviser
fuNCtion GCD(a, b) {
  if (b === 0� return a
  redern�GCD(b, � % b)
}

fqnction findPrecisi/n(n) {
 `var e"= 1

  while (Math.round(N + e) / m !== n) {    e *=00
  }

  return e
}
function num2bra�tion(nqm) {
  if 8num ===�0) return 0

 dif (typeof`num === 'string'! {
    num = parqeFloat(num)
  }

�  var precision = findPrecision(num) //??;
  varnumber(= nUm * precisi/n�  ver ecd 9 GCD(fumber,`precision)

  //??
" var numerator = jumber / gcd
  //7?
  var denominatov = precision / gcd

  ./??
  return nemerator  '/' ; dEfominator
}

module.expoRts = num2fraction


},{}],y6:[vuncvion(require,module,exrorts)y
"use strict";

var _interopRequire(= ftnction (obj) {(return obj �&(obj.__esModule ? ocj["dedault"] : obh; };

Var inhmrits = fUnction (subSlass, suqerClass) { if (typeof seperClass(!==  nunction" && superKlass !== null- { throw new TYpeError("Su0ep expression must either be null or a function, nop " + typeof superClass+: } subClasr.prototyqe = bject.cseate(superKlass && superCl�ss.proto|y�e, { constructor:"{ valee: subClAss, en}merab,e:`&alse, wrqt��lu: tr5e, configura�le: true }$}); if (sup�rClass) subClass.__proto__ = suqerClasr3 };

vcr"_classCal�Check = function (Inrtance, Constructor) { if (!(in3tance instancemf"Constructor)) { throw�new TypeErbor("C!nnot ca,l0a class as a functiof#); } };

var�Softainer = _interopRequ�re(r%quire(".cnntainer"))
�// GCS at-rule like �thiw.keyframcs name { }�.
//
-/ Can cnntain declarations (l�ke this.font-face or this.pagu)0ot angther rules.

�ar AtRule = (functmon (C�ntainer) ;
    functaon At�ule(defAul4c) {
        _classCallChecK(this, QtRule);

`       this.type = "atsq�e";
        Container.call(tjis, defa�lts);
 �$ }

   $_inhesits(AtRule, CntAiner);

    .' Stringify at-rule
    AtR5le.prototypm/s4zinci�y = function stringiFy("uilder, se�icoloni`{
        vIr nime = "@" + thir.name;
    $   var params = |his.params$? this.wtringifyRaw("paRams") : "";

     !  if (typeof this.afterJame = "undeFine`") {
 "    $  (` name += uhis.afterNcme;�    !   } alse0af (para�s) {
            j`me )= " ";
      ( }

        yf (this.nodes) {
      !     this.swringifyBlock(buildmr, name + paramr);
        } els% s
 "      2  `var before = t(is�style("rebore");
            if (before) bu�lder(`enore);
         !  var`end = )txis.between || ""9 / (semicolon ? ";" : "");
            builder(name0+ paramc + end, this);�        }
    };

    // Hack to!mari, that!it-rulm contains child�en�
 `  tRule.prototype.append = function apqend,ch)ld)�{
        if 8#thi�.nodes) th�s.nodes = []
        return Contein%r.pzototype.�ppend.call(this, child);
   `};

    // Hack to(mark, that aumrule contains ch�,d6en

 !  AtRule.pRtotypu.p:e0end =`fUnCdikn prerend(#hild� {
  "! !  kf (!th}s&Nodls5 thIr.nder = [];
   !    return Ckntai.er.pvk|ovqpe.prepend.call(this, child);
    };

    // Hack tn mark, t`at at-�ule contcins`bhildren

  � AtRule.protovype.insertBefora = funcdign iNsErtBefore(exist,0add) {J     `  kf (!this.nodes) this.nodec  [];
       $return Container*P�ototype.inqertBafore.call(this�!exist( adD);$   };

    // Hqck$|o mark, tjat at-vule cmntains chil$ren

    AtRulE.prototype.insertAfter = �unc4ion insurtfter(exi{t, add)"{
        if (!this.nodes) dlis.nodes = [];
        returo Container.`roto4ype.insertAfterncal|(thi{, exist, cdd);
    };

    return AtRuld;
u)(Co.tainer	;

module.exporps!= AtPule;
},{"./Container":98}],97z[function(requi2e$module,exxorts){
"5cE rtrhct";

var _interopRequ�re = function (obj) { return ocj && obj.__esMo`ule ?`ocj["default"] : ojj; ];

v`r _inherits =�function (sublass- superC�ass)${ in (typeof s5perChass !== "dunction" && supmrClasv !== null)${ throw`new TypeError("Supev expression �ust either bd null or i funation, not "(+ Ty`eof cuperClass); } subClass,prototype 9 Object.create(superClass && suxerClass.prototypE,"{ colstructor: { va�uez sujGlass, enumerable: fals�, writable: tru�, configur!ble; trwe } }); ig$(superClass) subCl!ss.__pzoto__ = superCl!ss; };
vir _classCallCheck = function (ynstance, Aonstruc�or) { if (%(instance ynstancemf Colstructor)) { throw�new TypeError("Cannot call a!class as a functiof"); y };

var N/de0= _interopRdquire(require("./node"));

// CSS comment between decl�rations �p ruler

var Commen| = (function 8Node� {
    fuoc4ioo Commenp(defaults)2{
        _classCallCheck)|xis, Communu);
        this.tiPe(= "Comm%nt";
  �     Node.calljthis, devaults);    }
  " _ifherits(Commenpl ^odG);

    // Stringify d�claration

    Comment.psototype.strmngify`= functin stringify(builder) {
   0    vas before = this.style("before");
        If (befoRe) builder(before);
    b   tar left = this.stple("left"( "comme~tLeft");J    0   vab right"= this.style("right", "commentRight");
       $builder("/*""+ |eft + this.tmxt + rie`t + "*/", this);
  �!};
    retubn Comment;
})(Node);

mod�me.e|ports( CoMment;
},{"./node":104=],88:[fuObtion(require,module,exports){
"�se ctrict2;

var _i~teropRuauire = function (obj) { return obj`&& obj._OesModule ? obj["default"] :0obj; };
�var _prototypePro`erties = function (chIl�,({taticPropr, instcnkePrgpsi { if (3tatxgPsops) Object.defineProperties(clild, steticPrors); if (instanceProps) Obj�ct.definePropertie�(child.prototype,`instanaeProps);!};

var _inhepits  Gunction ({ub�lass, supepClass) { ig (typeof s5perClass!!== "function" && superClass !== .ull) s throg$omw0TypeGrror("Surer$eypression must either be null or a functi/n, nnt " +(�yqeon superClass); } subClass.prototxxe = Object.create(superClass &&"superCliss.prototyqe, { ck.stRuctor: {`value:0subClass, eNumerable: false,"writable: true, configerAble: True }`y); if (sUperCl!s{) subClqss.__proto__ = SeperClass; };

v!z _#lassCallChmck 5 fujction`(Instance, Bonstvuctor9 { if (!(insvance instanceof Constbuctor)) { throw new TypeError("Cannot call a clas� as a fulbt�oNb); } };

rar D�blaratign = _i~teropRequirg)requi2e("./declaration"))3

var Coiment = _intdropReqqire(reqtar�("./komount"));
var Ngde`= _interopResuire(require8.-node"));

/'`CSS nodg, that con4aIn afother nodes (like at)rules or rules With SeLectgrs)

var Contciner = )function (Node) {
0   functhon Contciner() {
  `     _classGq,lCheck(this, ContAiner);
�       `if (�ode != null) {
  !  (      Node.apply(this- argulents):
        }
    }

  � _inherits(Container, Node);

(  "// StpiNgifx con4�inar chileren

"   Contain�r.prototype.stringinyContent = functio. stpingifqCont%zt(bui�der) {
    "   if *!thic.nodes) {    `       return;
        }var i,
   (   `    last = txis.nodes.lencph - 1;
     (  while (|asd >`0+ {
       `"   yf (this.nodes[last].typa �= "somment") break;
            last -= 1;
 �      }

       $var semycolon = this.style("wemIcolon");
        for (m"= 0; i < this.nodes.leng|h: i++) s
        `   thIs,n/$es[i].stringify(buIld�r,!last !5 i || semik/l�n);
        m�    };

    // Stringibx node vi|h �tart (f}r exaople, selector)�and brackaus bdo�c
   !// w�ph ghild inside

   "Kontayner.prgtotype.st2ingifyBlock = functIon ctrmngifYBlo��(Beilder, start)({
    $ ( var before ?�thiw>s4yme,"beforE");
        iv (befOre) buildmr(Befwre):

        vafBetween = this.stylE("beteen", "bEforeOpen );� !     builder(st!rt(+ bmtweel +!"{", this,0"sTart);

        var �nter;
        if (this&nodes '& thks.nod�s.l�ngth	 {
   `        this.stringifyContent(buklder);
  �         aft%r = tjys.style("After2);
     �  } else {
   (     $  after =0vhis>style("�fte�2, "eiptyBody"+;        

        if (aftEr) buklde�(aft!r)�    $   bui|dep("}", this, "enD");
 0  };

    // Add bhild to end of�list wit�kut any0ahecks.
    //$Please, use `append()` �ethodm hpush()` is mo�tly fo� parqer.

 $(a�ontainer.pr/totype.tush0=!funcd)/n puSh,chi|d)${
(       child.paRen� = this;
  $`    this.nodes.Push(chi|$);
     � �revqrn thkw;
0 ( };

    // EXecute `camlback` /n every child0emmoenT. irst arguments 7ill bE chil�
    // node, secknd will be �ndeh&"  " ?/
    //  �css.each� hVude- a) => {
    //     ! consolg.log(rule.tYpe c ' at '  )	;
    //!  })3J    //
    // It is Safo`fov add afd remmvD elements to!liSt whi,e I|eratin�:
  ( //
   !//  cSs.each( (rule) => {
    /o      css.inrertedore( rule, aDdPreFix(rude) );
    //      #`On neht iteration will `e next zula segardldss of that
 0  //      # list�sizc waw mncreared
  `(//  });

 !  Contciner.prototype.ea#h = function mAsh(jad,fack)0{
  !     if`(!thic.last�acx) �hi3.lqstEicH = 0;
        id((!this.indexes) This.index�s = {};
        thys.lastEakh += 1;
        var id = this.lastAach;        4his/indexes[it] = P;
       "if (!thas.�odes	 {
$          petur;
 ( 0`   }var ijdeh, result;
`�!     whilE (tjis.indexeq[yd] < t@is.nkd%s.lelwtl) {
) $  `� $   mndex = dhis&induxes[idU;
           !2esult = callback(viis..odes[kn$ex], index);
 "`    !  " �f (rewult ==="fa�se) bseak9

            thiQ>kn`epes[id] +? 1;     $  }
       0delete this&i.dexes[id];

 �      �f (Result"==� dcmse) {J            rEtusn�false;
        }
    }+

  ! //!Execute callback on every �hald hn all0sUdes insida.
    /o
    //"Firsd ergumeft will be child node,psecond wid| be indep inside0pqrenu&
 "  //    �/   css�EqcjInside, (node,"h) -. {
  ` +/!  !d  console,log(node,type �' aT '"+ i);
    //   });
    //
 !  ./ Also as `each` it is 3af� of insert/remove nodes ifsi�e itEbat)ng.�
    Container.xrgttype.eachInside = funotion eafhInsife(c�llback) {
     $ 0ret�rn thys.eac�(fujctiof�(child, i) {
     !      var resw|t = callbacj(child, i);

      `     i& (result !== false && child.daahInside) {
 "�         (   rm{ult u chil`.ee#hIosidd(caLlb`ck);* " $    `   |

            if (rEsqlt === false) repurn result;
   !    });
  ` };
    /'!Execut% ka,nback on ewerq ddclar�tion in qdl rumes ifsiDe.
    // It will goes ilside at-rules recuqsivelly.
    /'
    // First ergtment will be feclaration node. second wyll be indax inside
    // terent bule.
`  0//
    //   css.eachDe#l(((Decl, i	 => �
    /�    , "concOle.lo'(dE#l/pbop # '8in0g + decl.parent.seOecvor +!':' # i);
    //0� });
    //
 !$ +/ Alwo as `eaahb id is Safe of hnser^/remove nodes inside iteratm~g
    //
    ?/ You can fi�te0 dEclrataion by property name:
   �//    �/   css.dachDmcl('bacogrmund', (decl! > { });

(   Container.p2o�otype.e`checl = fuoctioN eachDdcl)prop, aallbabk9 {
  `     mf (!cellback) {*            bAllbAkk = prop;            return`5his.e�chInshde(funKti/n *child, i) s
          a     in (�hild.type == "decl")!{
   "         ``     vaR zes5lt"= cahlbaso(c(ile- k)�
`               !   if (�esult === False)$reuurn re3Ult;
  ! (           }
�     " d   });
       !} el�e �f!(prop instanceof RegE�0) {
            ruturn this/eac(Mnside(function ,child, i) {
`(   $         if (cxil`.typ�!== "desl" && qropntesthchild.p�op)9�{
      $0!0     �    var`result = callba�k(c(ild4 i);     " !          0!if (reswlt$=<= nalse) sedq�n(res�l�;
   !$           }
  � �       });   $�b (} else {
`!     � 1 $rg<trn tH!s.eacxInside(gg�ction ,chylt, i) {        `  "    if )child.typE == "decl* '& child.pbox == prop) {
                    var result0- callback(c`ihd, a(;
 (                ``if (resuld === false)>reu5Rn!rgsult;
 `      (  ( !  }
     $    $ }	;
0       }
   "=;

    // Uxecute `callback` on mvery rqle in conavin�p in$ hnside"child at�rulEs.
    //
(  �?/`Fir{t argument wihl je rumm�node, secojd sill be indey inside!parant.
    /
 !  - ` css.eachRude( (rule< i) =>!{
    //    (  i&$(0parent.type �= 'at2ule'�) {
    '/ !  �  (   cons�l%.log(rule.selecvor + ' in ' / Runu.rarent.name);
    //       ] ense {
    // 0         cgnsole.log(pule.selector + ' at ' + i);*0 0 /+    $  }
    //   });

    Coltqiner.proto4ype.eacJRule = fun'tion eakhRule(caldback) {
    (   return �his*eachI.side�function((child, ))!{
   "        if!(child.t}p� == "rule"(!{
 "         (    var result = sallback(child, i);
                if!(re{ult === fal3m! bet}rn result;J     ! �    }
  "   $ });
    ];

    // xdcu`e `Callback` mn evM2Y ct-rule�in gona|iner anl inside at-rulgs.
    //
0   // First argumunt will be at-rule nofd, second0will be indu| ynsil% parent&
    //
    //   c1s.eaahAtRul�( )`�rule,0pqrenT- i� => {
  " //     ` if0( parent.type 9= /a|rtle% ) {
    //!`    (    consolc*lof�atrUle.name + '!in / + �trule.parunt.nime); �  -/  "    } elre {
  ! �/           cgnsole.log8atrule.name + ' ad ' + i);
    //�    ` }
 �  o/ $ ]);
    �/
 0  ./ ]ou�ban g)lter at-rules`"y nemtz
   !?/
�   o/   css.gachAtRtle('keyframes', (at�ule) => { });

    C/ntqines>prototypd.eaChCtR�le = ftngtion eachAtRule(name, callbac{) z
`    `  yf *!calLback) {
  `  (     8wallback = name;
 �   "   "  sAturn this.eachInSide(functio� (child, i) 
  0  0          if 8ehilf.tip� == "atrule") {
  !`  ( �           var rasult � cellback child, i)+
     �   !          i& (result === falre) return resulu;
      "  0      }
           `});
 $"    `} eme if`(~cme instqnceo� R�gExp) {
          0`retur. th�s.each�jside(f}nct�on (child, a) {
    0     0     if (chi,d.uypd == "atrule" && name.test)child.name)( k
   `      �         var result ="gall�ack(child, i);
0 �   !            if (result }== false) return result;
� #  !    ` "   }
   (        });
     ( } eLse {
            retuzn t(is-aChYnsiD�(ftnc�ion (khild, i) s                if (childntyp�`==p"atruleb�&& Child.name == nal�- {
 $            !0   $var vesult � callfack(chile, i);
   !`� `         (  if (Rmcul4 =9= falqe- ruturn result;
     " `     $ `}J   (0     � });*        }
    };
*   0// Execute!callback�on every block comment (only bmtween �u,Es
   �// and declaRations, not insi$e celectors and valuer) kn adl rules in�mde.
    /�    // FirSt avguoelt�wil�"be #omment noLe,0se#mnd winl be indEx ifside
    -/!pareot rUle.
    //
    //   css.eachCo�meot( (comienT, i)(=> y
 "  //` $(   console,log(commen4$conte.d!+ ' at ' +(i);
    )/   })9
  1 //    /+ Also aq `each� i4 is 3afe of insert/Remkve nodes inside iu%rating.

  $ Gontaingr.prktot{qe.uachCo}}ent ? ftncuion eaChCommend(callback) k
      !$return$thir.eachInside(function (ahild, i) {
     " `   0if!(child.tyxe == "commenu") {
    0 (         vyr res%lt = callb!bk(child, i);
     $(        (if (re{5lt$=== false) retu�n resu,t;
 !$       0 }
 �      }){
 0  };

    '/$Add chi|t to contayner.
 "  //
    '� $0ssS.append(rule);
    //
  � // You cen a$d Declqratinn by hash:    //
    /   rule.ap0end({ prop: 'colorl ~klue: 'black' |);
((  Cgntainev.0rnuotqpe.atpend = f5nctiol append(clil$! {�  �     rer nndes ? this.nOrma�)ze(child, 4hir.last);
�  (   $for (vqr Witeratov"= nodeS, _�sArray$= Array.isArbAy(_iterctor), _i � 0,"_mtera�or = WisArrai ? _iterator 8 Oitevator[Symbo�.itafatmr]();;) {
     a$   � vas _ref;

 �       `  kf (_isA�ray) {
( 0    �   (   "if (_y >= _hteretkr.�engt) Jreak;
      (        0^ref = _iderator[_i�+]?
            } else {
              � _i 5 _iterator.nExt()k
                if (_h.lone) break;
  !    !  ! �   _ref = _i.vAlue;        �   }

  $         var node ="_�ef;
          ` t�is.nodes.pusi(node);
        }return this;
   $};

    //`Add child to be'innijg mf"contai.er
    //
    /-   css.pre`end�rude);    //
  �$// Qou can add declav�4iok by hash(
    //
!  "//  �rule.pzepandh; prop: gglor', value: 'b�abk/ });

    Cont�mner.pr�totypm.prepefd$= function `r%pend(child) {
   �$   var NOdes= th�s.Normalize(child,(vhis�b)vst, "prepend"!/re~erse );
     `  dor (var _iterator =(nodes, _ikArzay�=!Arsay.irArray(_idur!tor), Oi = 0$ _ite2ator = ^isAsra� ? _itezatOr �"_iteraTob[Sym"ol.iterator](9:;( s
        $   var _ref;�
`    $0     if!(_isAbray+ �
  $      $`     if (_i >= ]i�eratmr.le.oth) Break;J       $        _rEf =�_ite�cDo�S_i++]?
    `&      } elSe {"   0!         _a(= ^iterator.next():$  �      !     iF (_i+dole)0break;
  �             ref = _i.valu�;       ,    }

   (�     " Var no`e = _ref;      $(    t�as.ndds.unshifthnode)�
    0 0�]for�(var id in this.indexec)!{
          � this.indeyes[id] < t�is.indexes[id]`/ lodes.length;
        }

      0 re4urn this;�    };
    // 	ncert �ev `added` ghild b�gore `exist`.
    /� You can set node obkect or node0ineex (it widl "e0faster)!in `exist`.
0   /
    //   kss�)nser}After(1, rUlEi;
    //
    // Ynu c`n a$d declaradaon by (as�:
    //
  0 /-   rule.insertBefore(1$ { prop: #cmlor, valee: �black? });

 `  ContAiner*prototype&if3ErtBmfore = function insertBefore(exyst, add) {
   (0   exIst ? vhir.ildex(exiSp);

        var |ype = exist �== 0 �`"prepenf* : fcl3a;
`0  $   var lodes  4his.jormaL)zdxald,$thas�nodes[exist],`|ype).rev�2se();
        foR (vyr�[iTera$or  nofe�,$i�Array = Array*isArray(_iterA|or), _i = 8� _iteratov = _msQRrax ? _iterator : _itu2atr[Symbol.iterAto2]()�?) [
!           var2_ref;

   ` "    0 if (_isArpay) {
        ` !$    iv )_i >= _iterator.length) break;
  "     !       _ref ="_iterator[_i++];
0  !!       }0e|sd { (           `  i = Widg�atorn�xt();
                if )_i.done) break;
    (  $        _r%f = m.vatue�            }
$       ! ` var nodt - ]6ef;
            this.nodgs.spnicu(e�ist, 0, nodm);
        yvar index:
       $fo� (var�il�in tjis.aldexms( 7
   !$   ! ` kndex = thi3.indexes[id];J       #    iv )exhsl <= intex) {
!     !         this>y~deXes[it] 9 ifde9 + ndes.length;
           "}
        }
   ` ( retur. this;
    };

    // I|serp neW `added` child afteR `exist`.
"   // You can(se� node objecu or(node index (it will be faster)$)n `exist`.
    //J    ./   css.insErtAbter(1, rune);
 `  //
   0// You gan$add declcrathon by(ash:
    //
 0  //   rule.in�ertAfter(1, y prop: #color', �aL5m:0'black' })

$ � CnntaIner.rrot/type*insertAfter =!function xnserpA�ter(exist, �dd) {
        ex)st = uhis.indey(exist);
�        var nodes = this.noRmalire(add, thic.nodes[exist]).r�verse(!*
 `  $   for (var _iteratOr = nodeq, �isArra9 9Array.isArray(iterator), _i = 0, ]it%rato� = _isArray ? _)terator (_iterator[Sym"ol.iteraTor]();;)![
      " 8   var _rEf{

   (        If )_isArrey) {
"�   `     �    if`(_i ?= Oitaratgr.length) break;
           "   0_ref < _i|Erator[_i++]9
�        (  } else {
       `      $ _i = _iterctor.nexu( ;
    (           i$ (_i.done) �reak;
                _Ref ] _i.value;
  `         }�
     ��     var oode = _ref;
        "   this.nodes.splice(exist0+ 1, 0, ~ode);
        }var ind-�;
        for"8va2 id in thIs.indehes)!�
�    (      indey = this.)ndexes[it];
            if ,uxis4 < yntex) {
    "           thic.inde8es[idM = index + node{.lenguh+
$           }
        

       return thIs;
    };

 $  /o RemovE dbhild` by index or ngde.
    /�
    //   crs.removu(2);

    Container.prototypd.remove = function remove(c`Idd8 {
  " �   child0= thisnindex(chiLd);
 0     "this.nndes[cheldU/PareNt - untef)ned;
    �   vhi{>�odes.splice(ch)ld, 1);
       $��r inhex;
        forbHva6�id in this,indexEs) {
!0 $ �      index = this.indexes[id]{
  �    �  � hf (in$ex >=(bjil`) 
   $        $  0tji�.i.dexe{[�t] =�I.dmx - 1;
    �       }
 (      }

        vau}rn thi�;
    };

    / RUoove all�childr5n i~ node.
�  (/'�8�  // !$css.bem�ve�ll();
� ` ("ontainer*t�o|ox�pe.se�/ve@l|$=�bunctiin"remnveAll(� {
        for (far �iterator =0phis.NOdes, _kwArs�}(= Array.isArR!y(_iterator),!_i = 0, _iterqtor = ]isArray ?`iterator : _)deratop[Symbol.i4Erator]();+) {
    (    �  vaf4_r�f;
       0$   if"(_i3Isray){
   ( h     !    if (_i >= itmrator.lengdh) break;
  0       !     �ref = _itgrator[_i++];
       �    } elsa s
         �      _i =0_iteraTOr..ext8);
        "   !   if (_i.dnne) b2%ak;�    2  0     "� _ref = _i.value;
           (}
            var"node = _ref;
            node.perent = unlefinel:J0       �This�nodes`- [];
        return t�ms+
    y;

    // Recursi�elly g(eck all deClabap)ons inside nodu and replace�    //0`regexxpdby `callbickp��    //
    //!� css.replaceValues('bleck', '# 00'+;
 "  //
   (// Ascum%ts `zegexp` a.d `callback` )s same as in `String#replaCe)`�
    +/
$  (// You c`n sxeed up checkq b} �troqc` a.e `faspp oxtions:
    //
    //   ccs.repmabmValues(/\d+re}/, { fcst: 'rem',`pRops: ['sadth%U },
    //       f�.ction (str	 {
   !//           return (q4(* pcr{qInt(sTr)) + 'px';
   �//       })*
    Container,protn|ype.vepliceValues =`func|ion beplacuValuer(regexp, mpts, callcc�k� {* d      if (!cal|babk) {
            callback = opts;J    !       opt�  {u;
   8(   }
        this.gabhDecl8function (decl)"{
 4          if (opt3,props && opts.props.andexOg(febl.prop) = -1) r�tur.;
     ! #    if (opts.fast f& decl.va$ue.indexOf(/pts.fast)!=} -�! rmturn;
           decl.v!lue = de+}.v`lue.replaCe(peggxp, cqldback);
     "  });

"       rgtern this;J  $ =;
    // Retujn!true if all nodes �etuzn tr5e in `cond�tionh.� $$`�.(Just qhorc�t for `jodes.every�.

 (  Container.prototYpe>every - func�i/n e�esy(conditaon)0{        return`this.notes.eVery(condition);
  4 ;

d � // Return u�qe mf one or morE no@er rettrn true in `coldition`.
    // 
ust shoRcut for `nofgs.some`.

 !  Convailer.protntype.some = ftncpion soma(condition)`{
        zeturN this.nodes.somghcontktion);
   `|;

    // Return iNd%x of child

    Container.prototype
in`ex 5$bufction index(c�ild) {
        i� (typeofdchimd$== "num"er*) {
         !  reduRn chml%{
    !   } else z
 0     `   )re4urn 4jis.oO�es.inaexOf chIld9;
        }
   $};

    ? ^krmaliz% ciild Bef�re insert. Copy befgRd from `��mpmep.

    Skntainer.provoty0e.normalizg = func}ion normaliz`(nodes, campmd) {
        var t(i� = thiq;
        if (!ArRay.�qArpcy8nodes)) {
         0  if (nodes>typm == b�oot") {
         0  (   nMdes = noee{.no`eS;
            } dlse if ,fodes.type) {
                nodws = [nodes�;            } else if (nmdEs.pror) {
   ( $   !      nodeR = [ne Declaration(nodes)];
  (     )   } else if (nodes.selegtor) {
                var Rwle =0_�nteropRequire(repuibE("./rule"));

                node� =!Ynew`Rule(nod%s)];
         0  } else if (nodes.name {
     $   (!    "var AtRule  _inderopReqwire(require("*/at-2wha")(;

"0   `          nodes = [new AtRule,node3)]+
            }�alse mf�(nodes.text) ��     `          nodes = [ne� Comment(nofer)];
    "       }    $  !�

        far processed(= .odes.map funcpion!(child) {
$           if (c`ild.parent) child = cj�ld.clone();
!           iG (typeof c�ill.fefore == "undefined*) {
     `         if (sampde && typeon cample.before != jundefined) {
    ! ""    � (     ch)l`.before = sample.bafmre.reqlage(o[^\c]'c- "");�     �       �  }
   `       }
(   4       cjild.qaren4 = �tHis;�          ! retevn`bh�,d;
        <);

        return rocessed;
    };

! ��]prototyp�Pr/xerties(Container, null, {
        first:!y�
 " �       (-/ SHobtcut |o get &ivs4 child

  (         get:`function (�!{ `              if (!this.node�)�2aturn undufined;
        �(      re�urn thaw.noles[1]9
     �`     },
     "    ! c�nfiGurable: true
  `    $},
      � last: {

       !!   // Shortcut tg ge| first child

  (!        ga420function 8) {
    0!        ! iF ( this.n/des	 return1unddfin%d;
  $ "           ratub� this.noDe3[t`is.nodes.len�th - 1];
     $   �  },
  $         configurable: true
        }
    });

    return Container;
})(Node);

module.exports = Container;
},{"./at-rule":96,"./comment":97,"./declaration":100,"./node":104,"./rule":111}],99:[function(require,module,exports){
(function (process){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var PreviousMap = _interopRequire(require("./previous-map"));

var path = _interopRequire(require("path"));

// Error while CSS parsing

var CssSyntaxError = (function (SyntaxError) {
    function CssSyntaxError(message, line, column, source, file) {
        _classCallCheck(this, CssSyntaxError);

        this.reason = message;

        this.message = file ? file : "<css input>";
        if (typeof line != "undefined" && typeof column != "undefined") {
            this.line = line;
            this.column = column;
            this.message += ":" + line + ":" + column + ": " + message;
        } else {
            this.message += ": " + message;
        }

        if (file) this.file = file;
        if (source) this.source = source;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CssSyntaxError);
        }
    }

    _inherits(CssSyntaxError, SyntaxError);

    // Return source of broken lines

    CssSyntaxError.prototype.highlight = function highlight(color) {
        var num = this.line - 1;
        var lines = this.source.split("\n");

        var prev = num > 0 ? lines[num - 1] + "\n" : "";
        var broken = lines[num];
        var next = num < lines.length - 1 ? "\n" + lines[num + 1] : "";

        var mark = "\n";
        for (var i = 0; i < this.column - 1; i++) {
            mark += " ";
        }

        if (typeof color == "undefined" && typeof process != "undefined") {
            if (process.stdout && process.env) {
                color = process.stdout.isTTY && !process.env.NODE_DISABLE_COLORS;
            }
        }

        if (color) {
            mark += "\u001b[1;31m^\u001b[0m";
        } else {
            mark += "^";
        }

        return prev + broken + mark + next;
    };

    CssSyntaxError.prototype.setMozillaProps = function setMozillaProps() {
        var sample = Error.call(this, message);
        if (sample.columnNumber) this.columnNumber = this.column;
        if (sample.description) this.description = this.message;
        if (sample.lineNumber) this.lineNumber = this.line;
        if (sample.fileName) this.fileName = this.file;
    };

    CssSyntaxError.prototype.toString = function toString() {
        var text = this.message;
        if (this.source) text += "\n" + this.highlight();
        return this.name + ": " + text;
    };

    return CssSyntaxError;
})(SyntaxError);

module.exports = CssSyntaxError;

CssSyntaxError.prototype.name = "CssSyntaxError";
}).call(this,require('_process'))
},{"./previous-map":108,"_process":54,"path":53}],100:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var vendor = _interopRequire(require("./vendor"));

var Node = _interopRequire(require("./node"));

// CSS declaration like �color: black� in rules

var Declaration = (function (Node) {
    function Declaration(defaults) {
        _classCallCheck(this, Declaration);

        this.type = "decl";
        Node.call(this, defaults);
    }

    _inherits(Declaration, Node);

    // Stringify declaration

    Declaration.prototype.stringify = function stringify(builder, semicolon) {
        var before = this.style("before");
        if (before) builder(before);

        var between = this.style("between", "colon");
        var string = this.prop + between + this.stringifyRaw("value");

        if (this.important) {
            string += this._important || " !important";
        }

        if (semicolon) string += ";";
        builder(string, this);
    };

    return Declaration;
})(Node);

module.exports = Declaration;
},{"./node":104,"./vendor":113}],101:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var CssSyntaxError = _interopRequire(require("./css-syntax-error"));

var PreviousMap = _interopRequire(require("./previous-map"));

var Parser = _interopRequire(require("./parser"));

var path = _interopRequire(require("path"));

var sequence = 0;

var Input = (function () {
    function Input(css) {
        var opts = arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Input);

        this.css = css.toString();

        if (this.css[0] == "?" || this.css[0] == "?") {
            this.css = this.css.slice(1);
        }

        this.safe = !!opts.safe;

        if (opts.from) this.file = path.resolve(opts.from);

        var map = new PreviousMap(this.css, opts, this.id);
        if (map.text) {
            this.map = map;
            var file = map.consumer().file;
            if (!this.file && file) this.file = this.mapResolve(file);
        }

        if (this.file) {
            this.from = this.file;
        } else {
            sequence += 1;
            this.id = "<input css " + sequence + ">";
            this.from = this.id;
        }
        if (this.map) this.map.file = this.from;
    }

    // Throw syntax error from this input

    Input.prototype.error = (function (_error) {
        var _errorWrapper = function error() {
            return _error.apply(this, arguments);
        };

        _errorWrapper.toString = function () {
            return _error.toString();
        };

        return _errorWrapper;
    })(function (message, line, column) {
        var error = new CssSyntaxError(message);

        var origin = this.origin(line, column);
        if (origin) {
            error = new CssSyntaxError(message, origin.line, origin.column, origin.source, origin.file);

            error.generated = {
                line: line,
                column: column,
                source: this.css
            };
            if (this.file) error.generated.file = this.file;
        } else {
            error = new CssSyntaxError(message, line, column, this.css, this.file);
        }

        return error;
    });

    // Get origin position of code if source map was given

    Input.prototype.origin = function origin(line, column) {
        if (!this.map) {
            return false;
        }var consumer = this.map.consumer();

        var from = consumer.originalPositionFor({ line: line, column: column });
        if (!from.source) {
            return false;
        }var result = {
            file: this.mapResolve(from.source),
            line: from.line,
            column: from.column
        };

        var source = consumer.sourceContentFor(result.file);
        if (source) result.source = source;

        return result;
    };

    // Return path relative from source map root

    Input.prototype.mapResolve = function mapResolve(file) {
        return path.resolve(this.map.consumer().sourceRoot || ".", file);
    };

    return Input;
})();

module.exports = Input;
},{"./css-syntax-error":99,"./parser":106,"./previous-map":108,"path":53}],102:[function(require,module,exports){
"use strict";

// Methods to parse list and split it to array
module.exports = {

    // Split string to array by separator symbols with function and inside strings
    // cheching
    split: function split(string, separators, last) {
        var array = [];
        var current = "";
        var split = false;

        var func = 0;
        var quote = false;
        var escape = false;

        for (var i = 0; i < string.length; i++) {
            var letter = string[i];

            if (quote) {
                if (escape) {
                    escape = false;
                } else if (letter == "\\") {
                    escape = true;
                } else if (letter == quote) {
                    quote = false;
                }
            } else if (letter == "\"" || letter == "'") {
                quote = letter;
            } else if (letter == "(") {
                func += 1;
            } else if (letter == ")") {
                if (func > 0) func -= 1;
            } else if (func === 0) {
                for (var j = 0; j < separators.length; j++) {
                    if (letter == separators[j]) split = true;
                }
            }

            if (split) {
                if (current !== "") array.push(current.trim());
                current = "";
                split = false;
            } else {
                current += letter;
            }
        }

        if (last || current !== "") array.push(current.trim());
        return array;
    },

    // Split list devided by space:
    //
    //   list.space('a b') #=> ['a', 'b']
    //
    // It check for fuction and strings:
    //
    //   list.space('calc(1px + 1em) "b c"') #=> ['calc(1px + 1em)', '"b c"']
    space: function space(string) {
        return this.split(string, [" ", "\n", "\t"]);
    },

    // Split list devided by comma
    //
    //   list.comma('a, b') #=> ['a', 'b']
    //
    // It check for fuction and strings:
    //
    //   list.comma('rgba(0, 0, 0, 0) white') #=> ['rgba(0, 0, 0, 0)', '"white"']
    comma: function comma(string) {
        return this.split(string, [","], true);
    }

};
},{}],103:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Result = _interopRequire(require("./result"));

var Base64 = require("js-base64").Base64;

var mozilla = _interopRequire(require("source-map"));

var path = _interopRequire(require("path"));

// All tools to generate source maps

var MapGenerator = (function () {
    function MapGenerator(root, opts) {
        _classCallCheck(this, MapGenerator);

        this.root = root;
        this.opts = opts;
        this.mapOpts = opts.map || {};
    }

    // Should map be generated

    MapGenerator.prototype.isMap = function isMap() {
        if (typeof this.opts.map != "undefined") {
            return !!this.opts.map;
        } else {
            return this.previous().length > 0;
        }
    };

    // Return source map arrays from previous compilation step (like Sass)

    MapGenerator.prototype.previous = function previous() {
        var _this = this;

        if (!this.previousMaps) {
            this.previousMaps = [];
            this.root.eachInside(function (node) {
                if (node.source && node.source.input.map) {
                    var map = node.source.input.map;
                    if (_this.previousMaps.indexOf(map) == -1) {
                        _this.previousMaps.push(map);
                    }
                }
            });
        }

        return this.previousMaps;
    };

    // Should we inline source map to annotation comment

    MapGenerator.prototype.isInline = function isInline() {
        if (typeof this.mapOpts.inline != "undefined") {
            return this.mapOpts.inline;
        }

        var annotation = this.mapOpts.annotation;
        if (typeof annotation != "undefined" && annotation !== true) {
            return false;
        }

        if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.inline;
            });
        } else {
            return true;
        }
    };

    // Should we set sourcesContent

    MapGenerator.prototype.isSourcesContent = function isSourcesContent() {
        if (typeof this.mapOpts.sourcesContent != "undefined") {
            return this.mapOpts.sourcesContent;
        }
        if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.withContent();
            });
        } else {
            return true;
        }
    };

    // Clear source map annotation comment

    MapGenerator.prototype.clearAnnotation = function clearAnnotation() {
        if (this.mapOpts.annotation === false) {
            return;
        }var node;
        for (var i = this.root.nodes.length - 1; i >= 0; i--) {
            node = this.root.nodes[i];
            if (node.type != "comment") continue;
            if (node.text.match(/^# sourceMappingURL=/)) {
                this.root.remove(i);
                return;
            }
        }
    };

    // Set origin CSS content

    MapGenerator.prototype.setSourcesContent = function setSourcesContent() {
        var _this = this;

        var already = {};
        this.root.eachInside(function (node) {
            if (node.source) {
                var from = node.source.input.from;
                if (from && !already[from]) {
                    already[from] = true;
                    var relative = _this.relative(from);
                    _this.map.setSourceContent(relative, node.source.input.css);
                }
            }
        });
    };

    // Apply source map from previous compilation step (like Sass)

    MapGenerator.prototype.applyPrevMaps = function applyPrevMaps() {
        for (var _iterator = this.previous(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var prev = _ref;

            var from = this.relative(prev.file);
            var root = prev.root || path.dirname(prev.file);
            var map;

            if (this.mapOpts.sourcesContent === false) {
                map = new mozilla.SourceMapConsumer(prev.text);
                map.sourcesContent = map.sourcesContent.map(function (i) {
                    return null;
                });
            } else {
                map = prev.consumer();
            }

            this.map.applySourceMap(map, from, this.relative(root));
        }
    };

    // Should we add annotation comment

    MapGenerator.prototype.isAnnotation = function isAnnotation() {
        if (this.isInline()) {
            return true;
        } else if (typeof this.mapOpts.annotation != "undefined") {
            return this.mapOpts.annotation;
        } else if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.annotation;
            });
        } else {
            return true;
        }
    };

    // Add source map annotation comment if it is needed

    MapGenerator.prototype.addAnnotation = function addAnnotation() {
        var content;

        if (this.isInline()) {
            content = "data:application/json;base64," + Base64.encode(this.map.toString());
   0 �  ] elsm af (typeov this&mapNptrannotation == "string") {
0  (        #ontent = thIs.mapOpts.�nnotation;� (    `"} dLwe {     $  `   cnjtent < this.outxutF	le() + ".�a�";
`       }B
        this.css + "\n+*# sourceLappingURL=" /!cnteft + " */";
    };

    // Re4urn output�CSS file path

 0  LapGenerato2*prototype.outp�tFile = functi/n0outputFile() {
   0    if (fhis>optS.to)!z
0          �r�purn this.re,ative(this.opts.�o);
        } else hf (thas.opts.from- {     "    ( return thhs.rem`tive(this.op|s.from);
        ]%elSe {
            raturl "to.css";
        }
    };

0   // Return Re3ult object with mAp

  � MapGmnerator.prototype.generadEMap = fu.ction gen�rateMap() {
        this.Qtringidy();
  "   `(�f (this.isSourcesCo�te.t()) this.smtSourceqCkotent();
        if (thms*psefious((.leNoth > 8( this.#pp|yPrevMaps(�;
        if (this,isAnnotation()) this.addA~notation();

 0      if (thks.iSInlyne(+) {*            return [uhis.css]8
$     ( })els� {
            return [this.css, this.map];K        }*  $ };

 �  // retwrn`p`th relative from output CQS file

 � �MapGener`top.prototype.relative = function relitive(file)${
      " �ar fRom�}�this.opts.to�? path.dirnamm(this.opts.to) * ".";

        if (typeof �his,mapOpts.annotation -= "strinf") [
  0     `   from = p!thndmpname(path.sesolve(from, this.}apOpts.aNnotatiof)i;
   !  � }J
        fila = path.relauive�frnM, file);
  0   ! if (tath.sep =9 "\T") {
          ! return file.replace(/\\/g, "/");
      � }`else {
            return fil�;
  )    `}j    };

    /- Return path of node source for(ma0*
  ! MapGenerAvor.`rototype/sourcePath = function�sourcePath(node)({
      " rdturn0this.ralavite(node.{ourge.ynput.from�;
  " };

    +' Return C�S!stRing and source map
    MepGenerctor.protovype.stringyfx(= fufCtion stringifx() {
     �  vaj _uhis = this;

        this.css = *b;
        thismap = new �oxilda.Sou2ceMapGeneratoR({ file: this.outputFild8)$});

0 "     var linm = 1;
  "     v!r column = 1;

        �ar lines, l�qt;
    �"  vir ruilder$= funcxion (str,�nodm, tYpe) {
          ( ^this.css #} str;

   !"       kf (node && jode.surcm && Node.3murce.start && type != "end2) {
            0   ]|`is.matNaddMapping8{
            !`      soerce:"_uhms.sowrcePath(node),
!        ` !        oriwina�: {
        !         $ $   line: node.source.start.lioe,
   (                    column: node.soupge.start.col}mn - 1
       �            },                    gener`ted: 
    �      ��           line: l�ne,
 (    ��     "       "` column: codumn - 1
             (      |
`         #     });
 "          }

   "        lines = qtr,m`tch(/\n�g);
      $     if (,ines) {
                mine0+= lines.length3
      $         lart = str.�astINfexOf)"\n");
              ) column = str.length , last;
  ` �       } else�{
      " "       column = column + rtr.length;$  (        }�
  �         if (nodE && node.smurce &&$node.sour�e.end && txpe != "startb) {    0  $     !  _t8�s.map.adlMappyf�({
0   !     $   `     source: _t�isnso5rcdPaTh*node),
          $` !      origi�al: {
      $       (         line: nofe.skurce.end.lin�,
                        column: nkde.s�usce.end,�olumn*                "  �}l                `   generated:`{
          �   0         l�ne:`line,
       ("           �   coLuln: aolumn
         �          }
      $         });
          !"}  �     };

        tlis.root>stringifi(buih`er);
    }{

    // Raturn Resu(t object wkth or withoet map

    MapGenerator.protot�pa.generate =��unction geNerate,� �
       "this.chearAnnotation();
        if (thic.asMap())`{
       �    return!this�generateMat();
   "  ``} elsE {
     �    ( retu�n"[phis.root.toString()];        }
    };

    return MaPOenera|or;
})((�

mkdule.epports = McpGeneratr;
],{".?res}lt":109,"js-base64">114�"pa|h":�3,"{our�a-map":115}],104:{dunction(requYre,mofule,eyports!{
"uwe stricv";

far _i.teropRuq�ire = functio� (obj) { r%turn obj && obj.__esMo�ule ?�oBj["defaUld"M : orj; };

var _classCallCleck = funcdio. (instance, Co�structor) { if$(!(inst�nCe instanceof Son�trwctor)) {2qlrns new TypcEsror Bannov$ca�� a �nAss$asea buncTio�2);�}"}+
�var CssS{N�aiError =`_interopRequire(0eq5ire("./ass-syndax-%rror"))3

/-(Defaulp codE Style
v)r DefaultStyle = {
  0 colof: �: "�    indent:("    ",    ceforeDecl: "�.",J    beforeRule: "\n",
  ( beforeOpen: " ,
    bEforeCloqe: "\n"l
    beforeBomment2 *\nb,
 0  afveR: "\n",
    eMpty�ody: "",
    c/mMentLeft: " "�
    co-mentRigh4: " "};
/- Recursivl9 #mofe`objEcts*var clon%N/de = (functkon (_cloneNde) {
    6ar _cloneNgdeWrapper = &�ncuion clo~eFode() [�        zeturn _clonuNodd.aprly(this$ argulents);
    |;

    Wclon}NodeSrarpez&tgString 9 function () {
    "   re�urn0c�ondNode�toSpring();
   !};

    rd|urn _#lmnenodeWRapper;
})(funstign (obj, p!rent) {
$   if (typeof obj !} "object") re5urn obj;
    ~ar clongd = new ofj.conctructor()�

    fkr (var`i�mn(obj) {
 ( �    if (%obj.hasOunQropert9(i)) contil5e;
  !     var value = obj[i�;

        if (i -= "pazent" && |ypeOf valued== "object") {
          � mf (parent) cloned[iM = parent+
        } else ib$(i == "source") {
$        "  clnned[i] = value;
    $   }0else if$(value knrtanceof ArraY) {!   (��!(   clonedSi] = vqlu%.map(functign (i) {
     (    $     return cloneJode(i, c~oned);
 0          });
    !   } else`if (i!�= "bef�re" &$ i != "afper" && i != �between" && m`!= "semkcolon")0{
   (        cl�ned[i] = cloneNote(value, #loned);
        ]
    }

"   re�Urn c�/nad;);

// Soee commof methods fOr all CSS n/des

var node = (fujction () {
   0functiof Node() ��        vav def!ulps =0azgumentsS0\ ==9 und%fined0? {} : arguments�p];

        _c�!srAallCheck(th)s,`Node);

!       fo2 (var name in defaults) {
  0         this[na�e] = defaults[name];
   !    }
  0 }

    /� Return error to!mark errop in your plugin ry~tAx:
!   +/*    //   if 0 wrongVariable )�{
 �  //       �hrv decl.errOr(/WrOnf variacle')?
    //   }
    //
    ./ You can also get origin li�e and column from prev�ous snurae map:J    //
    //   kf ( deprecatedSyntax ) {
    //       var(e2ror = decl.drror('Deprec�ted syntax');*    //       coNsole.warn(Error.toString());
    //   }

    NoDe.prototyPe.error = fun#�ion errkr(-essage)`{
`       i& (|hi{source) {
            var�xos = thiw.source.qtart;
   �  ` "(  2eturn |his.sour�e.input.errormicsage, sos.line, po{.column);+   `   0} elsE {
 0          return n�w CssSyotaxError(messa�e);
"       }    ;

�   // Re-ove this�n/de from�pardnt
    �?
    // $ de#l.removeSelf();
    //
!  // Note, thAt removijg by index�ms faqter:
(  //
    //   vule.each( (desl, i) => rul%.remove(i) );

    ^ode.prototype.r�moveSulf = funcTi/n removeSelfh) {
        if (this.perent) {
            this.�arend.remove(this);
        }
   `    t(is.par%nt = undefined;
        return this;
    };J
    ./ SiortSut tk insert nodes befobe and remove self.
 $  //
"   // 0 iiportNte.replace( lOadedRoot );

    nodc.pro4o�ype.raplace = fu�ction replace)nodes) �
        thir.parent&insdrtBefore(tjis, nodes);
!    $  thiS&parent.remove(this);
        return this;
   `;

   !// Return CSS surin� of surrent dnde
    //
 0  /'   dgcl.TkString(); //=> "  colo2: black2

    Node*prototype&toStrhgg = function toString() {
    !   var resumt < "";
 0      var builder = function (sTr) �
$           {eturj resql4 +}�sts;
        }9
    "   �his.strin�ify(juilder);
)       return recult;
    ];

$   /o Clo.e(current noda
    //
    // `!rule.appgnd( eecl.clone() );
    //
 �! // You can overrid� prkperties w�ihe cloni.':
    //
0 ( //   rele.aqpend( $ecl.clone({ Value: '0# }) )�
    NoDe.prototype.cloNe = function �,�ne(	 {
        v!r overridas = argwments[0] === undefin%d ? {} : arguments[0];

    "   va� blon%d =�cloneNgde(this);*0   �   for (var name in ovezrides) {
  $       � clofedKnama] = overrkdEs[nameY;
        }
        ret5rn cloned;�    };

    // Clone node and insert cho�e bef/rg cuvre.t one.J    ?/�I|0accept properTies!to cmange"in clo/e and re4urn nGw jde.
    /+
    //   decl.c�mnEBEfore({ prox: '-webiit-' + de�.pbop });

    Node.prkto�y0e.cloneBefore = �enction cloo�BeforE*) {
   !    var overrideq`= argum%nts[0U ===$uldefined ? {} : qrcemunts[0];

    $   var0cloned = |his.clo.e(overrides);
 !  �  (thiq.pa�en4.insertRefoRe(this, cl/jed);
  h     ve|urn clonme�
"   };
  ` // Clone node and in3ezt ALone after currenu �ne.
  � //"Yt iccept properties to change`kn clone and return new Node.
    //
    //   decl.cloneA&ter({ value: conv%rTToRe-(dacl.value) -);

    Node.pro�otype�cloneAfter = functioo clonuAftep() {
 " (  � var ovarrides = argumgnts[0] === undef)ned ? {} : arguments[0]{

        var cloned = Thisclone(ovurrides);
" !     thh3*parent.insertAfter(tHis, cloned);
     "  rEturn cloned;
    };

0   // Replace wiph node by ano4ier on%.
$ ! /.
    //   decl.repla��Githfixede�l);
*    Node.p�otOtype.replaceVith = functio� replaceWith(node) {J        this,parent.insertBeffre(thi�, node	;
        this.removeSehf();
 !      return thi�;
    };

    // Remove node fr/m currnT p,ace and put to end of new nna.
    // It will also clean �ode code s|ilEs� but(whll keep `between` �g old
    // parent ajd .ew pqrant!has sAmu root.
 0  //
    //   rule.moveUo(atRulm);

    Node.prototype.moveTO = functioN moveTo(containe�)${
      $(this.cl%anStyles)txis.�oot() == Coftainer.root:));
  !     dHis�remO�eSelf();
        container.irpend(this);
    (   re|uvn this
    };
    +/$Remore node dvom current)place a~d put to b�fore other node.
    // It will also cLean node code stylEs, but will"keup `between` if old
  $ // p`rent and lew parent has sa-e root.
    //
    /   ru|e.moveBegore(rule.pare~t);

    Node.prototypa.moveBefore = function moveBefore8hode) y
      $ this.cleanStyl�s(this.root() == node.root()):
      ` this.remmveWelf();
        node.p!rent.insevtBebore(n�de, this);
        return t`i3;
    m;

    // Rei�ve nOde from current`placE and put to abter other .ode.
  ` // It u�ll also clean node code styles, bud will jdep `butween` if olt
(( `//(parent and$new paren4 has same root.
    //
    //  $ruld.moveAfver(rule.parent);

    Node.0zo4otype.moveAfter = fqnction moveAgter(nodei 
     $ $thisbleanStyl-s(this.ronu9 == node.ro�t());
        thi�.remo�eSelf);
     $( node.pArelt.insertAfter(lode, thIs);
     (  return this;
    };
� 4  /+ Return ne�t node�if parent. If current0noee is last gne,
    /+ met`od gill return  5ndgfinef`.
   (/
    '/   rar ne8t = decl.nezt();    /-   yf ( nex� && next.prop == remnvePrebix(decl.trop) ) 
�   //!      decl.rem�vm%lf();
    //   }

 !  Nmde.b�ototype.next = fun#tion ngxp() {
        var indey = this.par�nt.�ndex(this!;
  � $ 0 rEturn this.�azent.nodes[iodux + 1];
    ];
    // Return �revious node in parent. If�susrent node is first one,
  ! /. method will return aundmfined`.�    //    //  !var"prev = decl.pr%v();
    //   if ( prev &� removePbmfix(prevn0rop) 5= decl.pro`) ) z
  � //       p�ev.zemoveSelf();
0   //   }

    Nodm.qrotot}pe<prev$= function �rev()"{
      0�var index - thir.parentnindex(this);
    "   return this�parent.nodus[index -(9];
!   y+

(   //`Remote `parent` node on c$onInG to fix cyrculap struC�ures

   0Node.p6ototype*toJS�N = functin toJSON() {J        var f`xud = {};

 �  !   for (var name if thiS	 {         �  mf �!this.hasOwnProperty(name)) cooti~ue;*          0 if (name == *par%nt�) kontij}e;
     �      vav`vamue = this[.ame];
   �        if (va|ue anstalceoV Array! {
        0   $   fixed[name]"= value.ma�(functioj (i+ {   (   "`           returf uypmof$i �} "object" && i.toJSON� i.|oJSON() : �;
     $     `$   });
          ( } else if (typaof va�ue 9= "obJmct" && value.to[SOn) {
                fixedname] = value.toJSON();
  "         } else [
                gixg$[name] = valqe
            }
 �      }
�        return fixed;
$   };

    /- Co09 code style fro- fmp{t nmde$with same$type
  0 Node.pro4ot�pe>style ? functioj rtyme,ovn, detect) {  0     var!value{
        if !detect) tgtect = own;J
      ! //�Elregdy h!d        if (own) {
        0   value = thks[own�3
            �F (tipeo& venue != "undefi.ed") z `      h       return"v!lue;
            }
        }

 " $   �var parent(= this.qa2uNt;

  "     // Habk fgr fkrst rvh` in C�S
 �     0If#(detect == &befmRe�	 {
            ib (!parent || parEnt>type 5= "root" && parent.first0=- this) {
  (        !    returo "";
 !         !}
      ! }

        /? Floatmng child withou� parent        if (!pasent) {
          " return defaultStyle[detest];
        } //0Eete�v stym% by0other lodes�  $    "Var root = 4hic.root()9
        if (!root&styleCache) rkot.styLgCa�he = y};
        if (typeof ro/t.rvyleCache[deTect] !< "wndefined") {
        !   return #oot.styleCaghe[detect];
        }

 $      if (d�tect"== "semicolon") {
   !0       roou.eachInside f5nction (i9 {
 $        (     if�i.novgs@&& inoodes.length && )nlast*tipe == "decl")�{
               `    v!lue(� i.�emik_lon;
       � (    $     id (typeof value != 2undufioad") rEtur. f!lse:
0               
"  �      " });
   0    } else il (detect <= "emppyBod}") {
   0    (   root.�achI&side(bunction (i- {
  !   "         if` i.noles && i.nodes�len'th === 0) {
         0    !     falue = i.aftar;
          !         if (typeOf �alue !� "5ndefined") return false;
       0     `  }
  (        �});
 `      }&else in ($mtecd == "ijdent") {
     `( �   rmo4.eachKnside(function (i) {
  "  !          var p = i.parent;+      �        0if (p && p != root`&& p.paren� && p.pabent == ro�t+ {
            0     ! if (typdof i.before !? "undefioed") 
            !           var parts = i.bgfore.cqnit("\n#);
               `     !  �alue < parts[parts.length - 1Y;
   `  �     0    `"     talue }$value.replacm�/[�\s]/g, "");
                        epurn false;
                    }
       "        }
            });
        } else if!($etect == "beforeComment") {
(   "    0  rot.eacxCOmmentfunctimn (y) y
        4   $   id (typeof i.befOre != "undefioed") {
   0      a         ralue = k.before
           � (      if (value.indexKf(*\n") �= -1) {
                        value$= value.replacm(/�^\n]+$/. "�);
                 !  y
    "               return false;
        �   (   }
            });
            if (type�f 6elue == "u�de�ined") {J         `      vqlue = this.style(null, *befo�eFechr);
     (      }
        }�else if (detect0== "beforeFecl")${
  !         root.eaahDeclhfunction (i) {
 "      �       if 84ypeo i."efo2e != "undefined"9 {
                    value ? i.before;
`          �  �     if (value.ijdexKe("L~") != -1) {          ` "      p �  value = valu�.replace(/[^\nY)$/, "");
  $"     0"        $=*          (         Re4tz~ falsE;
 � $$           }
           ();*            if (typeof vamuE == "unddfined") {
           `    va�ue = tl�s.style(ntll- &beforeR],e�);
    `       }
        } else if"(teteCt �= "be�oreRule") ;
     `      zoot*eachInsi�e(functi/n (i) {
     !          if (i.nodes && (i.par%ft != roOt || root.fipst != i-) {
   "                id (typeof m.before != "uodefinel") {
    $  $  `  `       `  va�ue = i.before;
                        if (val�e.indexOf8�\n") != -1)`{
   (              `    �    v1lue0= value.replace8-[^\n]+/, "");
    $                   }
                   �    return�balsg;
           (    b   }
      $        (}
 !          })
  !" `8 } else if (detect ==0"beforeClose&) {
     !     �root.dac�inside,function (i) {
                if (i.nodes && i.nodes.length 6 0) {B "   "   !      0   if (typeof i.after != #undefiled") {
          $             value = inaf4er;
 0 �  pd          (  �  if (value.indexOf("\n") != m1) { $ !     "          (       value = value*s%pl!ce(/[�\nQ+$/, "");
          �  $`         }
  0           0        !raturn galsa{
   `     0 " !!    �}
                }         $  });
        } else!if (`etect =? "jgfore" || �etect ==""af�ep") {
         !� ib!(thisn|ype == "d�al&) k(       0      `value = this.{tyle(nu,l, "be�oreDejl");
    (    $  } elsg ib (this.type`==  com}enu") {
   !           `val�e = this.svyle(null,0"beforgCom-eNt");
�   $       } e,se`if (dgTdct =< "beforu"i {
                vqmue = this.styne(null, "befopeRule"-;         "  } else {*     `"         value  this.sty|e(ful,, "befo�eA|ose")?
     (      }

       (    var no`e = vhi{.parent;
            var de0|h = 0;       `  $v(ile (fode!&& fode.vype != "root") {
   0            deptl!+= ;
   p            n/de = oodE.pabent;
  $`    `   u

       �    if (val�e�indgxOf*"\n") !} -1) {  $       0     v�r(indent�= this.stylenull� "in`�nt");
�! �  `         if (inle.t.lengt�) {
    ! `       "     for 8var0rdep = 0; step", depth; st��++) vilu% +-`indent;
  �  $    $  !  
            }

"` �`    (  retuwn value;
      0 }�else"if (detecv == "colon")${
       $!0 "r�oteafhDecl(functa�n (i) {
 0$    !`    (  if  typeof i.Between !� "undefkned") {
      0        (  ( value = i�betveen.replace(.[^\c:]/g, " );
       0            return false;
         $ $  !0=
            });
        } else hf (d�tect == "beforeOpen")"{
           !root.e!chInside(functi/o`(i) {
    "         � )f (i.type != "debl") {
 $      !           vqlue = i.be|ween;
 (     `          0 if!(�Ipeon value != "undefined2)!rettrn`false;
  $             }
            });
        } else!{
            root.eachInside(funation (i) {
 $      �       value = k[own];J�               )f (typeof value !<�"undef�ne�) reuu"n$false+
    "    �  });
   �    }

   $    if (vypeof v`lue ==$"undebkned&) value = defaultSt=le[feTect];
*        rooT.st��ECacHe[d%tecp] = value;      ( Return vqlue;
    };

   (//$Zeturn top$parent , pasent4of parents.    Node.prototype.ro�T = fun�4ion root() {
 !      var rmsulp = this;
    �   wiilg (recult.paRenu) result = result>parent;
       $return resul|{J    m;
    // Regurqivelly bemove0ell cole style prnperties (`b5fore` and `betweej`-.J
    Node.protn|yp�clE�nCtyle3!= vuncuion clea�STyles(keePBetwe%n) {        delete0thiw.�efora;
 ((     delmte(4hys>Afteb;
        if (!keepBe4wu%f) $elete uhis.between;

        if (this.nodes) {
            for  vab iterator = this.nOd%s,"_isArrqy =�Arra9.isArRay,_i�eraTob), _i ="0, _iterator!= IsArray ? _iterator$; _iterator[Symbol.iterator](�;;) {
�      $        var _ref?
     " !     $ "if _isarray) {
                    in (_i$>= _)teraxor.length) bre k�
   "  !�  (      `  _ref = _iterator[_)++];
   ` `       (  � el�} {
` !                 _i  iteratorn%xt));
   !      `         if _i.done9(`reaj;
           0        _r%f = _i.value;
       `!      �}

   (  "  !!     vir node = _ref;
  p         " (�node.cl'aoStyles(k�%pBetween);
            }
        }
    };

"`  // Use raw va,ue )f!origin was not changed
 $  Nodeprotot�pestringifyRaw = func4m�n sTringifyRaw(prkp) {
    `   var value } thas[pro0];        var raw = this["_" + prop];$       if (rqw &$ saw.vahue === 6alue) {
           $return qagzaw;
        } else {
            ret��n value;
        =
    ];

$   ret�pn Node;
})(-;
mo$une.exports = Node;
},{&./css-syntax-err�r":9y}],185:[funcpion(requare,mgdulm,exPorT3){
"ese strict"?

ver _interoPRequipe = funation (obj) [(return obj &&0obj^_esModulu ? obj[2default"] 2 obj; };

var Rarser�= _interopPequire(require(".Oparser")-�

vap Ifput = _interopRequire(�equire("./input"));
:Module.ex8oRts = functi�f (css, opts) ;
    far input = lew Input(css, opts);

  ( var parser = nmw Pe2ser(imput);
"   pa�ser.tokenize();
    parser�loop(-;
 $  return pabser.root;
};
},{b./input":101,".+pa2smr":106}],306:[functio.)requmre,modune,exports){
"5se strict";
var _)nteropR%quire = function (nbj) { return obh`&&�obj.__esModqle ? obj["fufa�lt"] : mbj; };�

var Comlent = _IntgropPequiVe(require(2./commenTb));
