import mongoose from "mongoose";
// to use the env file in the code
import evn from "dotenv";

//to search env file in folder
evn.config();

 const Database = async () => {
  try {
    // to connect to DataBase.
    await mongoose.connect(process.env.key);
    console.log("DataBase connected Sucessfully ");
  } catch (error) {
    // to see the error
    console.error(error);
    process.exit(1)
  }
};

export default Database;