var Atomizer = require('atomizer');
var fs = require('fs');
var path = require('path');

var configObject = {
    configs: {
        breakPoints: {},
        "custom": {},
        "classNames": []
    }
};

var atomizer = new Atomizer({verbose: true});

module.exports = function (babel) {
    var t = babel.types;
    return {
        visitor: {
            JSXAttribute: function (path, state) {
                if (path.node.name.name !== 'className') {
                    return;
                }

                var opts = state.opts;
                var configPath = opts.configPath;
                configObject = configPath ? require(require.resolve(configPath)) : configObject;

                var cssDest = configObject.cssDest || './main.css';

                var foundClasses = atomizer.findClassNames(path.node.value.value);
                var finalConfig = atomizer.getConfig(foundClasses, configObject.configs || {});
                var css = atomizer.getCss(finalConfig, configObject.options || {});

                fs.writeFile(cssDest, css, function (err) {
                    if (err) throw err;
                });
            }
        }
    };
};
