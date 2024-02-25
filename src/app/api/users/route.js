import { User } from "../../../models/User";

const { default: mongoose } = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  console.log("id");
  console.log(id);
  if (id) 
  {
    const user=await User.findById(id);
    return Response.json(user);
  } 
  else {
    const users = await User.find();

    return Response.json(users);
  }
}
