function verifyToken(req, res, next) {
  const bearerHeader = req.header("authorization");
  console.log("Headers:", req.headers);

  if (typeof bearerHeader !== "undefined") {
    console.log(bearerHeader);
    const bearer = bearerHeader.split(" ");
    const Token = bearer[1];
    console.log(Token);

    req.token = Token;
    next();
    console.log("Headers:", req.headers);
    console.log("Bearer Header:", bearerHeader);
  } else {
    console.log("Token empty");
    res.status(401).send("Unauthorized: Token missing");
  }
}

module.exports = { verifyToken };
