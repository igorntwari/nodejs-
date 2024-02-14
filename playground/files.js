const fs = require("fs");

// fs.readFile('./docs/blog1.txt',(error,data)=> {
//  if(error) {
//     console.log(error)
//  }
//  console.log(data.toString())
// })
// console.log('last line')

// fs.writeFile('./docs/blog13.txt',"well no more igor",()=> {
//     console.log('file was written')
// })
// fs.writeFile('./docs/blog2.txt',"this file will be written newly",()=> {
//     console.log('file was written')
// })
console.log('hgoq')
if (!fs.existsSync("./messages")) {
    fs.mkdir("./messages", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("directory was created");
  });
} else {
  fs.rmdir("./messages", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("directory was created");
  });
}
// if(fs.existsSync("./docs/delete.txt")){
//     fs.unlink('./docs/delete.txt',(err)=> {
//  if(err) {
//     console.log(err)
//  }
//  console.log("file deleted")
//     })
// }
console.log("ehtioe3a")