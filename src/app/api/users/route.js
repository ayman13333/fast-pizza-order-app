import { User } from "../../../models/User";

const { default: mongoose } = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

export async function GET(req){
    const users=await User.find();

   return Response.json(users);
}