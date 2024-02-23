const express = require("express");
const app = express();
const { users } = require("./dummy.json");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const fs = require("fs");
const cors = require("cors");
app.use(cors());

app.post("/add-user", (req, res) => {
  const newUser = req.body;
  console.log("newuser", newUser);
  fs.readFile("dummy.json", (error, data) => {
    if (error) {
      console.log("Error in reading file");
    } else {
      try {
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
      } catch (error) {
        console.log("in Catch:", error);
        res.status(400);
        res.send(`error happened ${error.message}`);
      }
    }
  });
});

app.post("/delete-user", (req, res) => {
  const idtoDelete = req.body.id;
  const newUsers = users.filter((e) => e.id != idtoDelete);
  fs.writeFile("dummy.json", JSON.stringify({ users: newUsers }), (err) => {
    if (err) {
      console.log(err);
      res.send("error happened");
    } else {
      console.log("success");
      res.send(JSON.stringify(newUsers));
    }
  });
  console.log("id", idtoDelete);
});
app.post("/uptade-user", (req, res) => {
  const { id, uptadeData } = req.body;
});

app.get("/users", (req, res) => {
  res.type = "application/json";
  res.send({ users: users });
});

// const user = {
//   name: "Dorjoo",
//   age: 19,
//   gmail: "blah.gmail.com",
// };
// const uptadeUser = {
//   name: "huslen",
//   age: 18,
//   gmail: "hvslenhvslen566@gmail.com",
// };
// const uptadedUSer = {
//   ...user,
//   ...uptadeUser,
// };

app.listen(3001, () => {
  console.log("Server is listening at port 3001");
});
