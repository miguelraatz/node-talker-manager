const validateEmail = (req, res, next) => {
  const regex = /^\w+@\w+\.\w+$/;
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
};

module.exports = validateEmail;
