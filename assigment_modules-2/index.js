//Create an API that adds a new user to your users stored in a JSON file

const { error } = require("node:console");
const fn=require("node:fs")
const http = require("node:http");
const port = 3000;

  function sendRes(res, status, data) {
    res.writeHead(status, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
  }

const server = http.createServer((req, res) => {
const {pathname}= new URL(req.url, `http://${req.headers.host}`)

if (pathname==="/user" && req.method==="POST") {
let body=""
req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end",()=>{
        try {
    const user=JSON.parse(body)
    
    res.pipe("./users.json")
} catch (error) {
    {JSON.stringify("this email is alredy exist")}
}
    })

}
else{(error)
    JSON.stringify("error:404 not found")
}

}); 

server.listen(port, () => {
  console.log("hello");
});
