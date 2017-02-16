const webpackInstance = arguments[2];
window.schlupfloch = function schlupfloch(moduleName, stubs, options = {}) {

  const modules = webpackInstance.m;
  if (!(moduleName in modules)) {
    throw 'Could not find ' + moduleName + ' in ' + JSON.stringify(modules);
  }

  if (!stubs) {
    return webpackInstance(moduleName);
  }

  const shimmedModule = {
    i: moduleName,
    l: false,
    exports: {}
  };

  function proxiedRequire(moduleName) {
    if (!(moduleName in modules)) {
      throw 'Could not stub ' + moduleName;
    }

    if (moduleName in stubs) {
      return stubs[moduleName];
    }

    if (options.deep) {
      const shimmedModule = { exports: {} };
      webpackInstance.m[moduleName].call(shimmedModule.exports, shimmedModule, shimmedModule.exports, proxiedRequire);
      return shimmedModule.exports;
    }

    return webpackInstance(moduleName);
  }

  webpackInstance.m[moduleName].call(shimmedModule.exports, shimmedModule, shimmedModule.exports, proxiedRequire);
  return shimmedModule.exports;
}