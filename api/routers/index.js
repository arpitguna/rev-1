const express = require('express')

const routes = express.Router()

const { check } = require('express-validator');

const mainCtrl = require('../controlers')

routes.get('/',mainCtrl.ViewTask)
routes.post('/addtaskdata',[
    check('taskname').notEmpty().withMessage('task is empty').isLength({min:3}).withMessage('task is minimum 3 charcter'),
    check('username').notEmpty().withMessage('task is empty')
],mainCtrl.AddTaskData)
routes.delete('/delete',mainCtrl.Delete)
routes.get('/status',mainCtrl.Status)



module.exports = routes