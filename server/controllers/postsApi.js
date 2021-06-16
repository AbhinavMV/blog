exports.getPosts = (req, res, next) => {
  return res.status(200).json({ data: "This is private data" });
};
