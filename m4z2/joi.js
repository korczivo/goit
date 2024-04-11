const Joi = require('joi');

// Define your schema
const schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(25).required(),
    year: Joi.number().integer().min(1970).max(2030).required(),
});


// Middleware function for validation
const validateSchema = (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({ message: result.error.message });
    } else {
        next(); // Proceed to the next middleware or route handler
    }
};

// Use the middleware in your route
app.post('/login', validateSchema, (req, res) => {
    res.json(req.body); // This line will execute only if validation passes
});