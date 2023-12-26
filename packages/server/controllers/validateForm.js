const { formSchema } = require("@star-messenger/common");

const validateForm = (req, res, next) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        // res.status(200).send();
        console.log("form is good");
        next();
      } else {
        res.status(422).send();
      }
    });
};

module.exports = validateForm;
