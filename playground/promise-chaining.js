const mongoose = require('../src/db/mongoose')
const Users = require('../src/models/user')

// 611dda72a1460bb72af24cb4

/*Users.findByIdAndUpdate('611dda72a1460bb72af24cb4',{
    age:22

}).then((user)=>{
    console.log(user)
    return Users.countDocuments({})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})*/

const UpdateAge = async (id,age)=>{
    const age1 = await Users.findById(id,{
        age
    });
    const countDocuments = await Users.countDocuments({})
    return countDocuments

}

UpdateAge('611dda72a1460bb72af24cb4',4).then((count)=>{
    console.log(count)
}).catch((err)=>{
    console.log(err)
})