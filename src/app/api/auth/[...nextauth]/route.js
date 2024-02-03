import mongoose from "mongoose";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

// clientPromise
//// adapter:MongoDBAdapter(clientPromise),
const handler=NextAuth({
  secret:process.env.SECRET,
  
    providers:[
      GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
      }),
        CredentialsProvider({
            name: "Credentials",
            id:"credentials",
            credentials: {
              username: { label: "Email", type: "email", placeholder: "ayman@gmail.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const{email,password}=credentials;

              mongoose.connect(process.env.MONGO_URL);
              const user=await User.findOne({email});

             // console.log(user);
              let correct= user? await user.correctPassword(password,user.password) : false;

             // console.log(correct);

              if(user && correct){
                return user;
              }
              // console.log(credentials);
              return null;
              // // Add logic here to look up the user from the credentials supplied
              // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        
              // if (user) {
              //   // Any object returned will be saved in `user` property of the JWT
              //   return user
              // } else {
              //   // If you return null then an error will be displayed advising the user to check their details.
              //   return null
        
              //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              // }
            }
          })
    ]
});

export {handler as GET , handler as POST}