const withInstall = (comp) => {
  comp.install = (app) => {
    const compName = comp.name;
    if (!compName) return;
    app.component(compName, comp);
  };
  return comp;
};

export { withInstall };
