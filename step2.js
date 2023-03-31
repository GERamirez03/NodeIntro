const process = require('node:process');
const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading path ${path}: ${err}`);
            process.exit(1);
        }
        console.log(`File contents: ${data}`);
    });
}

async function webCat(url) {
    try {
        const resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.error(`Error fetching URL of ${url}\nError: ${err}`);
        process.exit(1);
    }
}

const argv = process.argv;
const path = argv[2]

if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}