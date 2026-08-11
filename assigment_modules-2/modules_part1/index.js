const path = require("node:path");
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const { log } = require("node:console");
const EventEmitter = require("node:events");
const emitter = new EventEmitter();
const os = require("node:os");
const zilb = require("node:zlib");

//1-Write a function that logs the current file path and directory.

// function currDirName(paths) {
//   const dir = path.dirname(paths);
//   const file = path.normalize(paths);
//   console.log("dirctory: ", dir);
//   console.log("current path: ", file);
// }
// currDirName("/Week 3 [Core Modules]/assigment/assignment/index.js");

//-----------------------------------------------------------

//2-Write a function that takes a file path and returns its file name.

// function fileName(filePaths) {
//   const file = path.basename(filePaths);
//   console.log("file path: ", file);
// }
// fileName("/Week 3 [Core Modules]/assigment/assignment/index.js");

//------------------------------------------------------------

//3-Write a function that builds a path from an object

// function buildPath (obj) {
//    const values= Object.values(obj)
//     const builPath=path.join(...values)
//     console.log("building pats:",builPath);
// }
// buildPath({name1:"./foo",name2:"bar/non",name3:"maz.js"})

//--------------------------------------------------------------

//4-Write a function that return sextension the file  from a given file path.

// function extensionPath(filePath) {
//     const exPath= path.extname(filePath,)
//     console.log('extension is :',exPath);
// }

// extensionPath("../../src/index.js")

//----------------------------------------------------------------

//5-Write a function that parses a given path and returns its name and ext

// function parses(filePath) {
//     const {name,ext}= path.parse(filePath)
//     console.log('extension is :',ext);
//     console.log('name is :',name);
// }
// parses("../../src/index.js")

//--------------------------------------------------------------

//6-Write a function that checks whether a given path is absolute
// function checkThePath(chPath) {
//     const checkedPath = path.isAbsolute(chPath)
//     console.log("given path is absolute:",checkedPath);
// }
// checkThePath("/src/index.js")

//---------------------------------------------------------------

//7-Write a function that joins multiple segments

// function joinSegments(seg) {
//     const segments=path.join(...seg)
//     console.log("path is:",segments);
// }
// joinSegments(["/foo","joo","main.js"])

//------------------------------------------------------------

//8-Write a function that resolves a relative path to an absolute one.

// function convertPat(rePath) {
//   const abPath= path.resolve(...rePath)
//   console.log("Absolute path:",abPath);
// }
// convertPat(['../',"src/index.js","../"])

//-----------------------------------------------------------

//9-Write a function that joins two paths

// function joinedPath(pat) {
//  const pathJo=path.join(...pat)
//  console.log("joined paths:",pathJo);
// }
// joinedPath(["/foldel1","folder2/file.txt "])

//-------------------------------------------------------------

//10-Write a function that deletes a file asynchronously

// function deleteFile(dPath) {
//   fs.rm(dPath, (err) => {
//     err && console.log(err);
//     console.log("Deleted successfully");
//   });
// }
// deleteFile("./ll.txt");

//-------------------------------------------------------------

//11-Write a function that creates a folder synchronously

// function createFolder(dirPath) {
//   fs.mkdir(dirPath, {recursive:true}, (err) => {
//     err && console.log(err);
//     console.log("success");
//   });
// }
// createFolder("./newfolder/f2")

//-------------------------------------------------------------

//12- Create an event emitter that listens for a "start" event and logs a welcome message.

// emitter.on("start",()=>{
// console.log("Welcome event triggered! ");
// })
// emitter.emit("start")

//---------------------------------------------------------------

//13- Emit a custom "login" event with a username parameter.

// emitter.on("login",(name)=>{
// console.log(`“User logged in ${name}`);
// })
// emitter.emit("login","Eman")

//---------------------------------------------------------------

//14-Read a file synchronously and log its contents

// try {
//    const data=fs.readFileSync("../assignment/text.txt","utf-8")
//    console.log(data);

// } catch (error) {
//    console.log(error);
// }

//--------------------------------------------------------------

//15- Write asynchronously to a file

// async function writeFile(pth, content) {
//   try {
//     const writeInFile = await fsPromises.writeFile(pth, content, "utf-8");
//     console.log("Write successfully");
//   } catch (error) {
//     console.log(error);
//   }
// }
// writeFile("../assignment/text.txt", "welcome to the backend hell");

//---------------------------------------------------------------

//16-Check if a directory exists

// const file = fs.existsSync("../assignment/text.txt")
// console.log(file);

//---------------------------------------------------------------

//17- Write a function that returns the OS platform and CPU architecture

// console.log(os.cpus());
// console.log(os.arch());
// console.log(os.platform());

//---------------------------------------------------------------

//18- Use a readable stream to read a file in chunks and log each chunk.
// const readStream=fs.createReadStream("text.txt")
// readStream.on("data",(chunk)=>{
//     console.log("chunks are:",chunk);

// })
// readStream.on("error",(err)=>{
//     console.log(err);

// })

//---------------------------------------------------------------

//19- Use readable and writable streams to copy content from one file to another

// const readStream = fs.createReadStream("text.txt");
// const writeStream = fs.createWriteStream("copy.txt");

// readStream.pipe(writeStream);

// writeStream.on("finish", () => {
//   console.log("File copied using streams ");
// });

//---------------------------------------------------------------

//20- Create a pipeline that reads a file, compresses it, and writes it to another file

// const readStream = fs.createReadStream("text.txt");
// const writeStream = fs.createWriteStream("copy.txt.gz");
// const gzip = zilb.Gzip();
// readStream.pipe(gzip).pipe(writeStream)
// writeStream.on("finish", () => {
//   console.log("File compressessuccess fully ");
// });

//------------------------------------------------------------------

