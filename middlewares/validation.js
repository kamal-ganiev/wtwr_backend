const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

function validateURL(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  } return helpers.error('string.uri');
}

const clothesValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length for "name" field is 2',
        'string.max': 'The miximum length for "name" field is 30',
        'string.empty': 'The field can not be empty',
      }),
    imageUrl: Joi.string().required().custom(validateURL)
      .messages({
        'string.empty': 'The field can not be empty',
        'string.uri':
        'The field must contain valid URL, example: "http://example.com/imageURL"',
      }),
  }),
});

const userSignUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length for "name" field is 2',
        'string.max': 'The miximum length for "name" field is 30',
        'string.empty': 'The field can not be empty',
      }),
    avatar: Joi.string().required().custom(validateURL)
      .messages({
        'string.empty': 'The field can not be empty',
        'string.uri':
        'The field must contain valid URL, example: "http://example.com/imageURL"',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'The field can not be empty',
        'string.email': 'The field must contain valid email address',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'The password is required',
      }),
  }),
});

const userLogInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'The field can not be empty',
        'string.email': 'The field must contain valid email address',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'The password is required',
      }),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24),
    userId: Joi.string().hex().length(24),
  }),
});

const userUpdateValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30)
        .messages({
          'string.min': 'The minimum length for "name" field is 2',
          'string.max': 'The miximum length for "name" field is 30',
          'string.empty': 'The field can not be empty',
        }),
    })
    .unknown(true),
});

module.exports = {
  clothesValidation,
  userSignUpValidation,
  userLogInValidation,
  idValidation,
  userUpdateValidation,
};
