const authPlateRecognizer = (req, res, next) => {
  const { role } = req.body;
 
  if (role === "manager") {
    next();
  } else {
    res.json("Unauthorised");
  }
};

module.exports = {
  authPlateRecognizer,
};
