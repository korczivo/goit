// const fs = require('fs').promises;

// fs.readFile('readme.txt')
//     .then(data => {
//         console.log(data.toString());
//     })
//     .catch(err => console.log(err.message));

// fs.appendFile('readme.txt', '\nNew line of text.')
//     .then(() => console.log('Text appended successfully!'))
//     .catch(err => console.log(err.message));

// fs.rename('readme.txt', 'new_readme.txt')
//     .then(() => console.log('File renamed successfully!'))
//     .catch(err => console.log(err.message));

// fs.unlink('new_readme.txt')
//     .then(() => console.log('File deleted successfully!'))
//     .catch(err => console.log(err.message));

// async function saveValuesToFile() {
//     let values = '';
//     for (let i = 1; i <= 10; i++) {
//         values += `${i}\n`;
//     }
//
//
//     try {
//         await fs.writeFile('values.txt', values, { encoding: 'utf8' });
//         console.log('Values saved to file successfully!');
//     } catch (err) {
//         console.log(err.message);
//     }
// }

// saveValuesToFile();


// fs.writeFile('example.txt', 'Hello World!')
//     .then(() => console.log('File written successfully!'))
//     .catch(err => console.log(err.message));

// fs.readdir(__dirname)
//     .then(files => {
//         return Promise.all(
//             files.map(async filename => {
//                 const stats = await fs.stat(filename);
//                 return {
//                     name: filename,
//                     size: stats.size,
//                     data: stats.mtime,
//                 }
//             })
//         )
//     }).then(results => {
//         console.table(results)
// })