const { Command } = require('commander');
const express = require('express');
const fs = require('fs');
const path = require('path');

const program = new Command();
program
    .requiredOption('-h, --host <host>', 'Server host address')
    .requiredOption('-p, --port <port>', 'Server port')
    .requiredOption('-c, --cache <cacheDir>', 'Directory for cached notes')
    .parse(process.argv);

const options = program.opts();
const app = express();
app.use(express.json());

if (!fs.existsSync(options.cache)) {
    fs.mkdirSync(options.cache, { recursive: true });
}
app.listen(options.port, options.host, () => {
    console.log(`Server is running at http://${options.host}:${options.port}`);
});
