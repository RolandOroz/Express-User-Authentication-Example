const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = usersDB.users.find((usr) => usr.username === user);
  if (!foundUser) return res.sendStatus(401); //unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // TODO __________________________________________________create JWT 
    res.json({ success: `User ${user} is logged in!` });
  } else {
    res.sendStatus(401); //unauthorized
  }
};

module.exports = { handleLogin };
