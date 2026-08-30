const fs = require("node:fs/promises");
const path = require("node:path");
const express = require("express");
const app = express();
const port = 3000;
const userFilePath = path.resolve("./users.JSON");
// console.log(userFilePath);
app.use(express.json());

async function readFile() {
  try {
    const data = await fs.readFile(userFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log("Error reading or parsing file:", err.message);
    return []; // إرجاع مصفوفة فارغة جاهزة في حال حدوث خطأ
  }
}
async function writeFile(content) {
  try {
    await fs.writeFile(userFilePath, JSON.stringify(content, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.log("Error writing to file:", err.message);
    return false;
  }
}

//get all users
app.get("/users", async (req, res) => {
  const users = await readFile();
  res.status(200).json(users);
});

//add user
app.post("/user", async (req, res) => {
  const body = req.body;
  const users = await readFile();

  const isExist = users.some((user) => user.email === body.email);
  if (isExist) {
    return res.status(400).json({ message: "this user already exists" });
  }

  const maxId =
    users.length > 0 ? Math.max(...users.map((u) => Number(u.id) || 0)) : 0;
  const newId = maxId + 1;

  const newUser = {
    id: newId,
    ...body,
  };

  users.push(newUser);

  // التأكد من نجاح عملية الكتابة قبل إرسال الـ Response
  const isWritten = await writeFile(users);

  if (!isWritten) {
    return res.status(500).json({ message: "Failed to write data to file" });
  }

  res.status(201).json({ message: "User added successfully", user: newUser });
});

//edit user
app.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  const users = await readFile();
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (name !== undefined) user.name = name;
  if (age !== undefined) user.age = age;
  if (email !== undefined) user.email = email;
  await writeFile(users);
  res.status(200).json({ message: "User updated successfully", user });
});

//delete user
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const users = await readFile();
  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedUsers = users.filter((u) => u.id !== Number(id));
  await writeFile(updatedUsers);
  res.status(200).json({ message: "User delete successfully" });
});

//get user by name
app.get("/user/getByName", async (req, res) => {
  const { name } = req.query;
  const users = await readFile();
  const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase());
  if (!name) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

//get user by min age
app.get("/user/filter",async(req,res)=>{
 const {minAge}=req.query
 const users= await readFile()
 const filteredUsers = users.filter((u) => u.age >= Number(minAge));
 if (filteredUsers.length === 0) {
    return res.status(404).json({ message: "no user found" });
  }
 res.status(200).json(filteredUsers)
})

//get user by id
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const users = await readFile();
  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

app.all("/*domy", (req, res) => {
  res.status(404).json({ message: "not foud" });
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
