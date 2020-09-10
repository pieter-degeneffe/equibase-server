exports.cleanQuery = (req) => {
  let limit, page, sortBy, sortDesc;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
    delete req.query.limit;
  }
  if (req.query.page) {
    page = parseInt(req.query.page);
    delete req.query.page;
  }
  if (req.query.sortBy) {
    sortBy = req.query.sortBy[0];
    delete req.query.sortBy;
  }
  if (req.query.sortDesc) {
    sortDesc = req.query.sortDesc[0] === 'true' ? -1 : 1;
    delete req.query.sortDesc;
  }
  return { limit, page, sortBy, sortDesc, query: req.query };
};
