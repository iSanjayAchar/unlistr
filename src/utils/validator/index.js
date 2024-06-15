const Ajv = require("ajv");
const validator = new Ajv({allErrors: true});
const schema = require("./schema");

module.exports = {
    validator, schema,
};
