import bcrypt from 'bcrypt';
const { Schema, models, model } = require("mongoose");


const UserSchema=new Schema({
    email:{
        type:String,
        required:[true,'email is required and must be unique'],
        unique:true
    },
    name:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:'baby.png'
    },
    password:{
        type:String,
        required:true,
        validate:pass=>{
            if(!pass.length || pass.length<5){
                new Error('pass must be at least 5 characters');
                return false;
            }
        }
    },
    phone:{type:String},
    streetAddress:{type:String},
    postalCode:{type:String},
    city:{type:String},
    country:{type:String},
    admin:{type:Boolean,default:false}
},{
    timestamps:true
});

UserSchema.pre('save',async function(next){
    console.log('xxxxxxxxxxxxxxxxx');
    this.password=await bcrypt.hash(this.password,12);
    next();
});

UserSchema.methods.correctPassword=async function(candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword);
}

export const User=models?.User || model('User',UserSchema);

//export const User;