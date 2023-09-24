const mongoose=require('mongoose');

const schema=mongoose.Schema;

const multiSchema=new schema({
      image:[{type:String,required:true}]
},
{
    timestamps:true
})

const multiModel=mongoose.model('multis',multiSchema);
module.exports=multiModel;