// Wrapper for async route handlers to avoid try-catch in every controller
// Note: We use express-async-handler package, but this is a lightweight alternative
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
