export const privilege = (req, res) => {
  const user = req.user;
  res.send({error: false, message: null, data: user});
}