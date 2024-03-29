import { User } from "@/models/User";

const { default: mongoose } = require("mongoose");
const { getServerSession } = require("next-auth");
const { authOptions } = require("../auth/[...nextauth]/route");

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  let filter = {};
  if (data._id) {

    filter.email = data.email;
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter.email = email;
  }

  await User.updateOne(filter, data);
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const email = session.user.email;

  console.log("email");
  console.log(email);

  if (!email) return Response.json({});
  return Response.json(await User.findOne({ email }));
}
