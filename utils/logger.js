exports.error = (err) => console.error(JSON.stringify({ severity: err.statusCode >= 500 ? 'error' : 'warning', ...err }));
exports.warn = (err) => console.warn(JSON.stringify({ severity: 'warning', ...err }));
exports.log = (err) => console.log(JSON.stringify({ severity: 'info', ...err }));
exports.debug = (err) => console.debug(JSON.stringify({ severity: 'debug', ...err }));
