const mongose = require('mongoose')

const taskSchma = mongose.Schema({
    taskname:{
        type:String
    },
    username:{
        type:String
    },
    Date:{
        type:String
    },
    task_type:{
        type:String
    },
    status:{
        type:Boolean
    }
},{
    timestamps:true
})

const task = mongose.model('task',taskSchma)

module.exports = task