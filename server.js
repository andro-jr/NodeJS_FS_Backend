const http = require("http");

require("dotenv").config();

http.createServer().listen(process.env.PORT, () => {
  console.log(`Server is running on port:${process.env.PORT}`);
});
