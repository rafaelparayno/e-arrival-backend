const Useraccounts = require("../models/Useraccount");

module.exports = async (username) => {
  try {
    const user = await Useraccounts.findOne({
      where: {
        username: username,
      },
    });

    return user.role_id;
  } catch (err) {
    console.log(err.message);
  }
};
