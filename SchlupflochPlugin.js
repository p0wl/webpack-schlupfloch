const srequire = require('./plugin/srequire');
const fs = require('fs');

const setWithConflictWarning = (map, moduleName, moduleId) => {
  if (moduleName in map && map[moduleName] !== moduleId) {
    console.warn('Conflicting module definitions: ' + moduleName + ' exists multiple times, but with different module ids');
    return;
  }

  map[moduleName] = moduleId;
}

const exposeAllRelevantModuleNames = (map, module) => {
  setWithConflictWarning(map, module.name, module.id);
  module.reasons.forEach(reason => {
    setWithConflictWarning(map, reason.userRequest, module.id);
  });

  return map;
}

function SchlupflochPlugin(options) {}

SchlupflochPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    const modules = compilation.getStats().toJson().modules;

    const modulesMap = modules.reduce((map, module) => exposeAllRelevantModuleNames(map, module), {});

    const schlupfloch = `
const modules = ${JSON.stringify(modulesMap)};
module.exports = ${srequire.toString()};
`;

    // Insert modules list into webpack build as new asset / Check if needed with NamedModulesPlugin
    compilation.assets['schlupfloch.js'] = {
      source: function() {
        return schlupfloch;
      },
      size: function() {
        return schlupfloch.length;
      }
    };

    callback();
  });
};

module.exports = SchlupflochPlugin;