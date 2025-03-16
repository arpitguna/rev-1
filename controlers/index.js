const TaskModel = require('../models/TaskModel')

const { validationResult } = require('express-validator')

module.exports.ViewTask = async (req, res) => {
    try {
        let sort = 1
        if (req.query.sort) {
            sort = req.query.sort
        }

        let search = ''
        if (req.query.search) {
            search = req.query.search
        }

        let per_page = 3;
        let page = 0
        if (req.query.page) {
            page = req.query.page
        }

        let Task = await TaskModel.find({ taskname: { $regex: search } }).skip(page * per_page).limit(per_page).sort({ _id: parseInt(sort) })

        let totaltask = await TaskModel.find({ taskname: { $regex: search } }).countDocuments()
        let Total_Page = Math.ceil(totaltask / per_page)

        return res.render('ViewTask', { Task, search, sort, page, Total_Page })
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.AddTask = (req, res) => {
    try {
        return res.render('AddTask',{errorData:[],oldData:[]})
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.AddTaskData = async (req, res) => {
    try {

        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.render('AddTask', {
                errorData: error.mapped(),
                oldData: req.body
            })
        }
        else {
            let AddTask = await TaskModel.create(req.body)

            if (AddTask) {
                console.log('Task add TaskModel');
                return res.redirect('/')
            } else {
                console.log('something wrong!!');
                return res.redirect('back')
            }
        }



    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.Delete = async (req, res) => {
    try {
        let DeleteTask = await TaskModel.findByIdAndDelete(req.query.id)
        if (DeleteTask) {
            console.log('delete task');
            return res.redirect('back')
        } else {
            console.log('something wrong');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.Status = async (req, res) => {
    try {
        let ChangeStatus = await TaskModel.findByIdAndUpdate(req.query.id, { status: req.query.status })
        if (ChangeStatus) {
            console.log('status chang succesfully');
            return res.redirect('back')
        } else {
            console.log('somethinng wrong');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}