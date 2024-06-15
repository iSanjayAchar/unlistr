const router = require("express").Router();
const database = require("../utils/database");
const auth = require("../middleware/auth");
const { response, handleError } = require("../utils/response");
const { validator, schema } = require("../utils/validator");

router.get("/", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const result = await database.find({
            selector: {
                table: "tasks",
                document: {
                    uid: userId,
                }
            }
        });

        const tasks = result.map((task) => ({
            tid: task._id,
            title: task.document.title,
            description: task.document.description,
            status: task.document.status,
            created_at: Date.now(),
        }));

        return response(200, tasks, res);
    } catch (err) {
        return handleError(500, err, res);
    }
});

router.post("/", auth, async (req, res) => {
    const taskValidator = validator.compile(schema.task);

    try {
        const userId = req.user._id;
        const task = req.body;


        if (!taskValidator(task)) {
            return response(400, taskValidator.errors, res);
        }

        const taskId = await database.write("tasks", {
            uid: userId,
            ...task
        });

        return response(200, { taskId, task }, res);
    } catch (err) {
        return handleError(500, err, res);
    }
});

router.put("/:tid", auth, async (req, res) => {
    try {
        const { tid } = req.params;
        const userId = req.user._id;
        const task = await database.db.get(tid).catch(() => null);

        if (!task) {
            return response(404, "Task not found", res);
        }

        if (task.document.uid !== userId) {
            return response(404, "This task does not belong to you", res);
        }

        const taskValidator = validator.compile(schema.task);
        if (!taskValidator(req.body)) {
            return response(400, taskValidator.errors, res);
        }

        await database.update("tasks", {
            uid: userId,
            ...req.body,
        }, tid, task._rev);
        return response(200, "Success", res);
    } catch (err) {
        return handleError(500, err, res);
    }
});

router.delete("/:tid", auth, async (req, res) => {
    try {
        const { tid } = req.params;
        const userId = req.user._id;
        const task = await database.db.get(tid).catch(() => null);

        if (!task) {
            return response(404, "Task not found", res);
        }

        if (task.document.uid !== userId) {
            return response(404, "This task does not belong to you", res);
        }

        await database.db.remove(task);
        return response(200, "Success", res);
    } catch (err) {
        return handleError(500, err, res);
    }
})

module.exports = router;
