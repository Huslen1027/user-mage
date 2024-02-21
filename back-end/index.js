// const express = require("express");
// const { products, users } = require("./dummy.json");
// const app = express();
// const fs = require("fs");
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.get("/products", (request, response) => {
//   response.type = "application/json";
//   response.send({ products });
// });
// app.get("/users", (request, response) => {
//   response.type = "application/json";
//   response.send({ users });
// });
// app.get("/usernames", (req, res) => {
//   res.type = "application/json";
//   const username = [
//     ...products.map((e) => e.name),
//     ...users.map((e) => e.name),
//   ];
//   res.send({ username });
//   console.log(username);
// });
// app.post("/post", (req, res) => {
//   const newuser = req.body;
//   console.log(newuser);
//   fs.appendFile("dummyTest.json", JSON.stringify(newuser), function (err) {
//     if (err) throw err;
//     console.log("Saved!");
//   });
//   res.status(200);
//   res.send({ message: "user added succesfully" });
// });
// app.listen(3001, () => {
//   console.log("Server is listening ");
// });
const express = require("express");
const { products, users } = require("./dummy.json");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const fs = require("fs");
const cors = require("cors");
app.use(cors());

app.get("/products", (request, response) => {
  response.type = "application/json";
  response.status(200);
  response.send({ products });
});

app.get("/users", (request, response) => {
  response.type = "application/json";
  response.send({ abc: users });
});

app.post("/add-user", (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  fs.readFile("dummy.json", (error, data) => {
    if (error) {
      console.log("Error in reading file");
    } else {
      const jsonFile = JSON.parse(data.toString());
      jsonFile.users.push(newUser);
      fs.writeFile("dummy.json", JSON.stringify(jsonFile), (err) => {
        if (err) {
          console.log(err);
          res.send("error happened");
        } else {
          console.log("success");
          res.send(JSON.stringify(jsonFile));
        }
      });
    }
  });
  res.status(200);
  res.send("User added successfully");
});

app.listen(3001, () => {
  console.log("Server is listening at port 3001");
});
