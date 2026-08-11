//Create an API that adds a new user to your users stored in a JSON file

const { error } = require("node:console");
const fs = require("node:fs");
const http = require("node:http");
const port = 3000;

function sendRes(res, status, data) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const { pathname ,searchParams} = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === "/users" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      //احول الداتا اللي جايه
      try {
        const newUser = JSON.parse(body);
        // تواحول الداتا اللي هقراها من فايل الجسون
        let users = JSON.parse(fs.readFileSync("./users.json", "utf-8") || []);
        //ابدا اقارن
        const isExist = users.some((u) => u.email === newUser.email);
        if (isExist) {
          return sendRes(res, 400, { message: "this email is alredy exist" });
        }

        //اضيف اليوزر الجديد و اخليه ياخد اي دي
        newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
        users.push(newUser);

        //احفظ الملف بقي في الجسون
        fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
        return sendRes(res, 201, {
          message: "User added successfully",
          newUser,
        });
      } catch (error) {
        return sendRes(res, 400, { message: "Invalid JSON data" });
      }
    });
  }
  // 2. PATCH /user/:id (تحديث بيانات مستخدم محدد)
  else if (pathname.startsWith("/user/") && req.method === "PATCH") {
    const userId = Number(pathname.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const editData = JSON.parse(body);
        const users = JSON.parse(
          fs.readFileSync("./users.json", "utf-8") || [],
        );
        const userIndex = users.findIndex((u) => u.id === userId);
        if (userIndex === -1) {
          return sendRes(res, 404, { message: "not founded this  user" });
        } else {
          users[userIndex] = { ...users[userIndex], ...editData };
          fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
          return sendRes(res, 200, {
            message: "User updated successfully",
            user: users[userIndex],
          });
        }
      } catch (error) {
        return sendRes(res, 400, { message: "Invalid JSON data" });
      }
    });
  }

  //)3. Create an API that deletes a User by ID. The user id should be retrieved from the URL
  else if (pathname.startsWith("/user/") && req.method === "DELETE") {
   
    let userId = Number(pathname.split("/")[2]);
   
   
      try {
        const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
        const userIndex = users.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        return sendRes(res, 404, { message: "User not found" });
      }
      else {
     const  deleteUser=users.splice(userIndex,1)[0]
     fs.writeFileSync("./users.json",JSON.stringify(users,null,2))
     return sendRes(res,200,{
        message: "User deleted successfully"})
      }
      } catch (error) {return sendRes(res, 500, { message: "Internal server error" });}
   
  } 
  
// 4. Create an API that gets all users from the JSON file.
  else if (pathname === "/users" && req.method === "GET") {
    try {
      const users = JSON.parse(fs.readFileSync("./users.json", "utf-8") || "[]");
      return sendRes(res, 200, { users });
    } catch (error) {
      return sendRes(res, 500, { message: "Internal server error" });
    }
  }

  // 5. Create an API that gets User by ID.
  else if (pathname.startsWith("/user/") && req.method === "GET") {
    try {
      const id = Number(pathname.split("/")[2]);
      
      // قراءة الملف أولاً لحل مشكلة users is not defined
      const users = JSON.parse(fs.readFileSync("./users.json", "utf-8") || "[]");
      const user = users.find((u) => u.id === id);

      return user
        ? sendRes(res, 200, { user })
        : sendRes(res, 404, { message: "User not found" });
    } catch (error) {
      return sendRes(res, 500, { message: "Internal server error" });
    }
  }


  else {
    sendRes(res, 404, { message: "ERROR 404 NOT FOUD" });
  }
});

server.listen(port, () => {
  console.log("hello");
});
