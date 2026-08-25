import Joi from "joi";

export const listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: {
        filename: Joi.string().allow(""),
        url: Joi.string().allow("", null)
    },
    price: Joi.number().required(),
    location: Joi.string().required(),
    country: Joi.string().required()
}).required();

