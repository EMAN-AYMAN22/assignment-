const users = [
  { name: "user1", id: 1 },
  { name: "user2", id: 2 },
  { name: "user3", id: 3 },
  { name: "user4", id: 4 },
  { name: "user5", id: 5 },
  { name: "user6", id: 6 },
  { name: "user7", id: 7 },
  { name: "user8", id: 8 },
  { name: "user9", id: 9 },
  { name: "user10", id: 10 },
];

const http = require("node:http");
const { URL } = require("node:url");
const port = 3001;

function sendRes(res, status, data) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`
  );

  // 1. GET /users 
  if (pathname === "/users" && req.method === "GET") {
    const limit = Number(searchParams.get("limit")) || users.length;
    return sendRes(res, 200, users.slice(0, limit));
  } 
  
  // 2. GET /users/:id (
  else if (pathname.startsWith("/users/") && req.method === "GET") {
    const id = Number(pathname.split("/")[2]);
    const user = users.find((u) => u.id === id);

    return user
      ? sendRes(res, 200, user)
      : sendRes(res, 404, { message: "User not found" });
  } 
  
  else {
    return sendRes(res, 404, { message: "Route not found" });
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});