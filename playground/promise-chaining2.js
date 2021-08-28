const mongoose = require('../src/db/mongoose')
const Task = require('../src/models/task')

/*Task.findByIdAndDelete('611dda72a1460bb72af24cb4').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed:false})
}).then((count)=>{
    console.log(count)

}).catch((e)=>{
    console.log(e)

})*/

const deletetask = async(id)=>{

    const deletedTask = await Task.findByIdAndDelete(id);
    const countDocuments = await Task.countDocuments({completed:false})

}

deletetask('611ddd4d451a92b7dcb50019').then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})

