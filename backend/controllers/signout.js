export const ErrorMessage = (status,message)=>{
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
}

export const signout = (req, res, next) => {
    try {
      res.clearCookie("access_token");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      next(err);
      // console.log(err);
    }
  };