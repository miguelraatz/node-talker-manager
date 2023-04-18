const validateSearch = (req, res, next) => {
  const { q } = req.query;
  if (q === undefined) {
    console.log('Aqui');
    return res.status(200).json([]);
  }
  return next();
};

module.exports = validateSearch;
