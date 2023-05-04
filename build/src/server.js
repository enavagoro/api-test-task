"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const mongoose_service_1 = __importDefault(require("./shared/services/mongoose.service"));
// routes
const task_route_1 = __importDefault(require("./tasks/routes/task.route"));
// middlewares
class Server {
    constructor() {
        this.port = 5100;
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        dotenv.config();
        this.app.set('port', process.env.PORT || this.port);
        this.initCors();
        this.app.use(express_1.default.json());
        // Start Db
        const mongoDb = new mongoose_service_1.default();
        mongoDb.startConnection();
    }
    initCors() {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, taskId');
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            }
            else {
                return next();
            }
        });
    }
    routes() {
        express_1.default.Router();
        this.app.get('/', (req, res) => {
            res.send({ message: 'Hola' });
        });
        this.app.use('/task/', task_route_1.default);
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.server = this.app.listen(this.app.get('port'), () => {
                    console.log('server running on port : ', this.app.get('port'));
                });
            }
            catch (err) {
                console.log('Error on start server:', err);
                process.exit(1);
            }
        });
    }
    stopServer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.close(() => {
                console.log('server stopped');
            });
        });
    }
}
exports.Server = Server;
const server = new Server();
server.startServer();
