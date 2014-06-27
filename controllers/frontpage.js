
exports.get = function *get (next) {
  yield this.render('index', {
    title: 'Hello, world'
  });
};

