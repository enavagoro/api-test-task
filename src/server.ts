import express from 'express';
import * as dotenv from "dotenv";
import Database from './shared/services/mongoose.service';
// routes
import taskRoutes from './tasks/routes/task.route';
// middlewares

export class Server {
    public app: express.Application
    public port = 5100;
    public server: any;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        dotenv.config();
        this.app.set('port', process.env.PORT || this.port);
        this.initCors();
        this.app.use(express.json());
        // Start Db
        const mongoDb = new Database();
        mongoDb.startConnection();
    }

    private initCors() {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, taskId');
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            } else {
                return next();
            }
        });
    }

    public routes(): void {
        express.Router();
        this.app.get('/', (req, res)=>{
            res.send({message: 'Hola'});
        });
        this.app.use('/task/', taskRoutes);
    }

    async startServer() {
        try {
            this.server = this.app.listen(this.app.get('port'), () => {
                console.log('server running on port : ', this.app.get('port'));
            });
        } catch (err) {
            console.log('Error on start server:', err);
            process.exit(1)
        }
    }

    async stopServer() {
        this.server.close(() => {
            console.log('server stopped');
        });
    }
}

const server = new Server();
server.startServer();