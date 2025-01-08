const { writeFile, mkdir } = require('fs');
const http = require('http');
const os = require('os');
const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        this.emit('log', message);
    }
}

const logger = new Logger();

const hostname = '127.0.0.1';
const port = 3000;

logger.on('log', (message) => {
    console.log(message);
});

const information = {
    OSType: os.type(),
    Platform: os.platform(),
    RAM: os.totalmem(),
    USEDRAM: os.totalmem() - os.freemem(),
    CPU: os.cpus()
};

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(information, null, 2));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const dir = 'D:\\Homework';
mkdir(dir, { recursive: true }, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    writeFile(`${dir}\\homework.txt`, JSON.stringify(information, null, 2), (err) => {
        if (err) {
            console.log(err);
            return;
        }
        logger.log('Completed task!');
    });
});