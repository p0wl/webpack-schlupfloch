module.exports = function srequire(moduleName, stubs, options = {}) {
  const exposedRequire = window.schlupfloch;

  if (!(moduleName in modules)) {
    throw 'Could not find ' + moduleName + ' in ' + JSON.stringify(modules);
  }

  const moduleId = modules[moduleName];
  if (!stubs) {
    return exposedRequire(moduleId);
  }

  const module = exposedRequire.c[moduleId];
  const shimmedModule = { exports: {} };

  function proxiedRequire(moduleId) {
    const moduleName = Object.keys(modules).filter(key => modules[key] === moduleId)[0];
    if (!moduleName) {
      throw 'Could not stub ' + moduleId;
    }

    if (moduleName in stubs) {
      return stubs[moduleName];
    }

    if (options.deep) {
      const shimmedModule = { exports: {} };
      exposedRequire.m[moduleId].call(shimmedModule.exports, shimmedModule, shimmedModule.exports, proxiedRequire);
      return shimmedModule.exports;
    }

    return exposedRequire(moduleId);
  }

  exposedRequire.m[moduleId].call(shimmedModule.exports, shimmedModule, shimmedModule.exports, proxiedRequire);
  return shimmedModule.exports;
}