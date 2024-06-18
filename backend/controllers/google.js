import User from  "../models/user.js"

export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(200).json(user._doc);
      } else {
        const newUser = new User({
          ...req.body,
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser._doc);
      }
    } catch (err) {
      // console.log(err);
    }
  };