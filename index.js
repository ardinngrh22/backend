import express from "express";
const app = express();
const port = 5000;
import User from "./user.model.js";
import "dotenv/config";
import sequelizeConfig from "./config.js";
import bodyParser from "body-parser";

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

sequelizeConfig
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

app.get("/users", async (req, res) => {
  const data = await User.findAll();
  console.log(data);
  res.status(200).json({
    message: "Success get data users",
    data:data
  });
});

app.post("/users", async (req, res) => {
  const { email, nama, password } = req.body;
  if(!email && !nama && !password){
    return res.status(400).json({
      message: "Email, Nama, dan Password harus diisi"
    })
  }else if(!email){
    return res.status(400).json({
      message: "Email harus diisi"
    })
  }else if(!nama){
    return res.status(400).json({
      message: "Nama harus diisi"
    })
  }else if(!password){
    return res.status(400).json({
      message: "Password harus diisi"
    })
  }

  const data = await User.create({
    email,
    nama,
    password,
})
  res.status(200).json({
    message: "Success create user",
    data:data
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
