'use strict';

const withInstall = (comp) => {
  comp.install = (app) => {
    const compName = comp.name;
    if (!compName) return;
    app.component(compName, comp);
  };
  return comp;
};

exports.withInstall = withInstall;
