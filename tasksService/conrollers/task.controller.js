const TaskModel = require('../models/tasks.models');
const HttpException = require("../utils/HttpException.utils");

class TasksControllers {

    getAllTasks = async (req, res, next) => {
        let tasks = await TaskModel.find();

        if (!tasks.length) {
            throw new HttpException(404, 'Tasks not found')
        }

        res.send(tasks)
    }

    getTaskById = async (req, res, next) => {
        const task_id = req.params.id;
        console.log('task id<<<<<<>>>>>', task_id);

        const task = await TaskModel.findById(task_id);
        if (!task) {
            throw new HttpException(404, 'task does not exist')
        }

        res.send(task)
    }

    deleteTask = async (req, res, next) => {
        const task_id = req.params.id

        const result = await TaskModel.delete(task_id);
        // console.log('result<<<<>>>!', result);
        if (!result) {
            throw new HttpException(404, 'Task trying to delete is not found')
        }

        res.send('Task deleted successfully')
    }

    createTask = async (req, res, next) => {
        const task = req.body

        const result = await TaskModel.create(task);
        if (!result) {
            throw new HttpException(500, 'An error occured while creating a task')
        }

        res.status(201).send('Task was created successfully')
    }

    updateTask = async (req, res, next) => {
        const taskId = req.params.id;
        console.log('task id', taskId);
        const task = await TaskModel.findById(taskId);
        const { id, ...taskWithoutTaskId } = task;
        const updatebody = { ...taskWithoutTaskId, ...req.body };
        const result = await TaskModel.update(taskId, updatebody)
        console.log('updated results<<<<>>>>', result);
        if (!result) {
            throw new HttpException(404, 'Something went wrong try again later')
        }

        const { affectedrows, changedRows, info } = result;
        const message = affectedrows && changedRows ? "Project updated successfully" : "Update fail";
        res.send({ message, info })
    }
}

module.exports = new TasksControllers