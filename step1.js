// write a function, cat
// accepts one argument, path
// reads the file with that path and prints the contents of that file
// write code that calls that function, allowing you to specify the path argument
// via the command line

const process = require('node:process')
const fs = require('fs')

const argv = process.argv;

function cat(path) {
    // const argv = process.argv;

    // for (let i = 0; i < argv.length; i++) {
    //     console.log(i, argv[i]);
    // }

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading path ${path}: ${err}`);
            process.exit(1);
        }
        console.log(`File contents: ${data}`);
    })
}

cat(argv[2])