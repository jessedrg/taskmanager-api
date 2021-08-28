const express = require('express')
const Router = new express.Router();
const User = require('../models/user')
const auth = require('../middleware/auth');
const sharp = require('sharp');
const multer = require('multer');

Router.post('/users/me',async(req,res)=>{
    const user = new User(req.body);
    /*user.save().then(()=>{
        res.status(201).send(user)

    }).catch((err)=>{
        console.log(err);
        res.status(400).send('Not allowed user')

    })*/
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch(e) {
        res.status(404).send('internal server error')
        console.log(e)
    }


})
Router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user:user,token})

    } catch (e){
        res.status(400).send()

    }

})
Router.post('/users/logout',auth,async(req,res,next)=>{
    try{
        req.user.tokens = req.user.tokens.filter(()=>{
            return token.token !== req.token
        })
        await user.save()

    } catch (e) {

    }
})
Router.post('/users/logoutAll',auth,async (req,res,next)=>{
    try {
        req.user.tokens = []

    }catch (e) {
        res.status(500).send()

    }
    req.user.save()
    res.send()
})
Router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)
     

})
Router.patch('/users/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const alloweUpdates = ['name','email','password','age']
    const isValidOperations = updates.every((single)=>{
        return alloweUpdates.includes(single)
    })
    if(!isValidOperations){
        return res.status(400).send('error: Unable to update!')
    }
    try{
        const user = req.user

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (e){
        res.status(404).send('unable to update user')

    }
})
Router.delete('/users/me',auth,async (req,res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.user._id)
        res.send(req.user)
    } catch (e) {
        req.status(400).send();
    }
})
const upload = multer({

    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload a image'))
        }
        cb(undefined,true)
    }
})
Router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const imageBuffer = await sharp(req.file.buffer).resize({height:250,width:250}).png().toBuffer()
    req.user.avatar = imageBuffer
    await req.user.save()
    res.send()
},(err,req,res,next)=>{
    res.status(400).send({error:err.message})
})
Router.delete('/users/me/avatar',auth,async(req,res)=>{
    res.user.avatar = undefined;
    await req.user.save();
    res.send('avatar deleted')
})
Router.get('/users/:id/avatar',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return new Error('User not found')
        }
        res.set('Conteny-type','image/png').send(user.avatar)

    } catch (e) {
        res.status(404).send()

    }
})


module.exports = Router