const exp = require("express");
const app = exp();
app.use(exp.json());
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = app;

const dbPath = path.join(__dirname, "twitterClone.db");

let db = null;

const initializeSetup = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (err) {
    console.log(`Error is '${err.message}'`);
    process.exit(1);
  }
};

initializeSetup();

app.post("/register/", async (request, response) => {
  const { username, password, name, gender } = request.body;
  const checkUser = await db.get(
    `SELECT * FROM user WHERE username = '${username}';`
  );
  console.log(checkUser);
  if (checkUser == undefined) {
    if (password.length >= 6) {
      const encryPwd = await bcrypt.hash(password, 10);
      const registerQuery = `
            INSERT
            INTO
            user(username, password, name, gender)
            VALUES(
                '${username}',
                '${encryPwd}',
                '${name}',
                '${gender}');`;

      await db.run(registerQuery);
      console.log("User created successfully");
      response.send("User created successfully");
    } else {
      console.log("Password is too short");
      response.status(400);
      response.send("Password is too short");
    }
  } else {
    console.log("User already exists");
    response.status(400);
    response.send("User already exists");
  }
});

app.post("/login/", async (request, response) => {
  const { username, password } = request.body;

  const checkUser = await db.get(
    `SELECT * FROM user WHERE username = '${username}';`
  );

  if (checkUser !== undefined) {
    const pwdCheck = await bcrypt.compare(password, checkUser.password);
    if (pwdCheck) {
      const payload = {
        username: username,
      };
      const getToken = jwt.sign(payload, "secrete");
      console.log({ getToken });
      response.send({ getToken });
    } else {
      response.status(400);
      console.log("Invalid password");
      response.send("Invalid password");
    }
  } else {
    response.status(400);
    console.log("Invalid user");
    response.send("Invalid user");
  }
});

const authUser = (request, response, next) => {
  let jwtToken = null;
  const authHead = request.headers["authorization"];
  if (authHead !== undefined) {
    jwtToken = authHead.split(" ")[1];
  }
  if (jwtToken === null) {
    response.status(401);
    console.log("Invalid JWT Token");
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "secrete", async (error, payload) => {
      if (error) {
        response.status(401);
        console.log("Invalid JWT Token");
        response.send("Invalid JWT Token");
      } else {
        request.username = payload.username;
        next();
      }
    });
  }
};

app.get("/user/tweets/feed/", authUser, async (request, response) => {
  let { username } = request;
  let getItemQuery = `SELECT * FROM user;`;

  const dbResponse = await db.all(getItemQuery);
  console.log(dbResponse);
  response.send(dbResponse);
});
