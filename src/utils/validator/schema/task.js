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
        },
        created_at: {
            type: "number"
        }
    },
    required: ["title", "status"],
    additionalProperties: false,
};

module.exports = task;
