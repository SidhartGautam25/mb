export default (errFun) => (req, res, next) => {
  Promise.resolve(errFun(req, res, next)).catch(next);
};
