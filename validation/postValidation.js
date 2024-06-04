import Joi from 'joi';

export const postValidator = Joi.object({
  title: Joi.string().required().min(3).max(20),
  description: Joi.string().required(),
  location: Joi.array().empty(),
  image: Joi.string(),
  // This validation was for before handling uploading images

  // .custom((value, helper) => {
  //   const type = value.split('.')[1];
  //   switch (type) {
  //     case 'png':
  //     case 'avif':
  //     case 'webp':
  //     case 'jpg':
  //     case 'jpeg':
  //       return true;

  //     default:
  //       return helper.message(
  //         `Image type shoud be one of this types: png, avif, webp, jpg, jpeg`,
  //       );
  //   }
  // }),
  user: Joi.string().required(),
});
