import cluster from 'cluster';
import * as os from 'os';
import { User } from './util';
import { db } from "./model/model";
import { server } from '.';
import * as http from 'http';

let data: User[] = db;
const PORT = 4000;
let numCPUs = os.cpus().length;


  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
  
    let i = 0;
  
    // Incoming requests are distributed to the workers in a round-robin fashion
    http.createServer((req, res) => {
      i = i % numCPUs;
      const options = {
        hostname: 'localhost',
        port: PORT + i + 1,
        path: req.url,
        method: req.method,
        headers: req.headers
      };
  
      const proxy = http.request(options, (targetRes) => {
        res.writeHead(targetRes.statusCode, targetRes.headers);
        targetRes.pipe(res, { end: true });
      });
  
      req.pipe(proxy, { end: true });
      i++;
    }).listen(PORT);
  
    // Fork workers
    for (let i = 0; i < numCPUs - 1; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case, it is an HTTP server
    server.listen(PORT + cluster.worker.id);
    if (cluster.isWorker) {
      process.on('message', (workerData: User[]) => {
        data = workerData;
      });
    }
    console.log(`Worker ${process.pid} started`);
  }