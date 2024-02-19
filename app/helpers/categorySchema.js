const title = {
  notEmpty: {
    errorMessage: "Title is required",
  },
  isLength: {
    options: { min: 3 },
    errorMessage: "The Title must be aleast 3 characters.",
  },
};

const url = {
  notEmpty: {
    errorMessage: "URL is required",
  },
};

const categoryValidation = {
  title: title,
  url: url,
};

module.exports = categoryValidation;
