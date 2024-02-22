const express = require("express");
const { users } = require("./dummy.json");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const cors = require("cors");
const { log } = require("console");
app.use(bodyParser.json());
app.use(cors());

app.get("/users", (request, response) => {
  response.type = "application/json";
  response.send({ abc: users });
});

app.post("/uptade-user", (request, response) => {
  response.type = "application/json";
  response.send({ bla: uptadedUSer });
});
const user = {
  name: "Dorjoo",
  age: 19,
  gmail: "blah.gmail.com",
};
const uptadeUser = {
  name: "huslen",
  age: 19,
  gmail: "hvslenhvslen566@gmail.com",
};
const uptadedUSer = {
  ...user,
  ...uptadeUser,
};
console.log(uptadedUSer);
app.delete("/delete-user", (req, res) => {
  const idtoDelete = req.body.id;
  console.log("id", idtoDelete);
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
