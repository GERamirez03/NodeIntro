const process = require('node:process');
const fs = require('fs');
const axios = require('axios');
const { writeFile } = require('node:fs');

function write(text, out) {
    if (out) {
        fs.writeFile(`./${out}`, text, "utf8", function(err) {
            if (err) {
                console.error(`Error writing to file ${out}: ${err}`);
                process.exit(1);
            }
            console.log(`Successfully wrote to file ${out}`);
        });
        console.log(`Attempting to write to file ${out} ...`);
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading path ${path}: ${err}`);
            process.exit(1);
        }
        write(data, out);
    });
}

async function webCat(url, out) {
    try {
        const resp = await axios.get(url);
        write(resp.data, out);
    } catch (err) {
        console.error(`Error fetching URL of ${url}\nError: ${err}`);
        process.exit(1);
    }
}

function callCat(path, out) {
    if (path.slice(0, 4) === 'http') {
        webCat(path, out);
    } else {
        cat(path, out);
    }
}

function processInputs(argv) {
    if (argv[2] === '--out') {
        const readPath = argv[4];
        const writePath = argv[3];
        callCat(readPath, writePath);
    } else {
        const readPath = argv[2]
        callCat(readPath)
    }
}

processInputs(process.argv)
