const fs = require("fs");

const readStream = fs.createReadStream("./docs/large.txt", {
  encoding: "utf-8",
});
const writeStream = fs.createWriteStream("./docs/written.txt");
// readStream.on("data", (chuck) => {
//   console.log(chuck);
//   console.log("---new chuck---");
//   writeStream.write("\n New chuck is being writen \n");
//   writeStream.write(chuck);
// });
// alterative you can use pipe to read stream and transform it into write stream 
readStream.pipe(writeStream)