const task = {
    type: "object",
    properties: {
        title: {
            type: "string",
        },
        description: {
            type: "string",
        },
        status: {
            enum: ["todo", "in-progress", "done"],
        }
    },
    required: ["title", "description", "status"],
    additionalProperties: false,
};

module.exports = task;
