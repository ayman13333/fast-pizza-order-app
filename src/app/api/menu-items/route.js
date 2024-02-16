const { default: mongoose } = require("mongoose");
const { MenuItem } = require("../../../models/MenuItem");
mongoose.connect(process.env.MONGO_URL);

export async function GET(req){
    // console.log(req.url.includes('id'));
    // console.log(req.url.split('='))

     if(req.url.includes('id')){
        //req.url.split('=') 
        const menu=await MenuItem.findById(req.url.split('=')[1]);
        //console.log(menu);
        return Response.json(menu);
     } 
     else{
        const menuItems=await MenuItem.find();

        return Response.json(menuItems);
     }
   
}

export async function GETONEHandler(id){
    // const { id } = req.query;
    const menu=await MenuItem.findById(id);
    console.log(menu);
    return Response.json(menu);
    
}

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