const jwt = require("jsonwebtoken");
const Secret_Key = "Secret_Key";

const auth = (token) => {
  try {
    console.log("h");

    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, Secret_Key);
      return user.id;
    } else {
      return;
    }
  } catch (ex) {
    return;
  }
};

module.exports = auth;
