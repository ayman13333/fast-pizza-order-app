import User from "@/models/User";

const { default: mongoose } = require("mongoose");
const { getServerSession } = require("next-auth");
const { authOptions } = require("../auth/[...nextauth]/route");

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data=await req.json();
    const session=await getServerSession(authOptions);
    const email=session.user.email;

    //const user=await User.findOne({email});

    

    // if('name' in data){
    //     //update user name
    //     // user.name=data.name;
    //     // await user.save();
    //   await  User.findOneAndUpdate({email},{
    //         name:data.name
    //     },{runValidators:false},{new:true});

    //     //session.user.name = data.name;
    //     // Save the session changes (assuming it's required in your setup)
    //    // await session.save();
    // }

    await User.updateOne({email},data);

    console.log(session);

    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    const session=await getServerSession(authOptions);
    const email=session.user.email;
    if(!email) return Response.json({});
    return Response.json(
        await User.findOne({email})
    );
}