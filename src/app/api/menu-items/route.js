const { default: mongoose } = require("mongoose");
const { MenuItem } = require("../../../models/MenuItem");
mongoose.connect(process.env.MONGO_URL);

export async function GET(req){
    const menuItems=await MenuItem.find();

    return Response.json(menuItems);
}

//export async function

export async function POST(req) {
    const data=await req.json();
    const newMenuItem=await MenuItem.create(data);

    return Response.json(newMenuItem);
}

export async function PUT(req){
    const {_id,...data}=await req.json();
    let updatedMenu=await MenuItem.findByIdAndUpdate(
        _id,
        data,
        {new:true}
    );

    return Response.json(updatedMenu);
}