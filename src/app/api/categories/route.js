import { Category } from "../../../models/Category";
const { default: mongoose } = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

export async function POST(req) {
   // console.log('xxxxxxxxxxxxxx');   
    const {name}=await req.json();
    const newCategory=await Category.create({name});

    return Response.json(newCategory);
}

export async function GET(){
    return Response.json(
        await Category.find()
    );
}

export async function PUT(req){
    const{_id,name}=await req.json();
    let category=await Category.findById(_id);
    category.name=name;
    category=await category.save();

    return Response.json(category);
}