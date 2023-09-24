const express=require('express');
const Route=express.Router();
const multer=require('multer');
const multiModel=require("../Model/multiModel");
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})
const multiImage=multer({storage:storage})
Route.get("/users",async(req,res)=>{
      try{
        const result=await multiModel.find();
        res.status(200).json({
            success:true,
            message:"data fetched successfully",
            data:result
        })
      }
      catch(error){
        res.status(400).json({
            success:false,
            message:"error"
        })
      }
})

Route.post("/create",multiImage.array("image"),async(req,res)=>{
    try{
        const imagePaths=[];
        const files=req.files;
        
        if(files){
            for(let elements of files){
                imagePaths.push(`http://${req.get('host')}/upload/${elements.filename}`);
            }
        }
        const result=new multiModel({
            image:imagePaths
        })
        const output=await result.save();
        res.status(200).json({
            success:true,
            message:"data created successfully!",
            data:output
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"error",
           
        })
    }
})

Route.put("/update/:id",multiImage.array("image"),async(req,res)=>{
    try{
        const imagePaths=[];
        const files=req.files;
        
        if(files){
            for(let elements of files){
                imagePaths.push(`http://${req.get('host')}/upload/${elements.filename}`);
            }
        }
        await multiModel.findById(req.params.id).then((result)=>{
              result.image=imagePaths;
              result.save();
            res.status(200).json({
            success:true,
            message:"data updated successfully!",
            data:result
        })
        })
        
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"error",
           
        })
    }
})


Route.delete("/delete/:id",async(req,res)=>{
    await multiModel.findByIdAndRemove(req.params.id)
    .then((result)=>{
        res.status(200).json({
            success:true,
            message:"deletion is successful!"
        })
    })
    .catch((error)=>{
        res.status(400).json({
            success:false,
            message:"error"
        })
    })
})


module.exports=Route;