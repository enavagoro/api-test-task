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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
class Database {
    constructor() {
        dotenv.config();
        const localUri = process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost:27017/task-api';
        this.URI = localUri;
    }
    startConnection() {
        this.connectWithRetry();
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                yield new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo
            }
            if (!this.connection) {
                throw new Error('The connection to the database could not be established.');
            }
            return this.connection;
        });
    }
    connectWithRetry(count = 0) {
        mongoose_1.default
            .connect(this.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
            this.connection = mongoose_1.default.connection;
        })
            .catch((err) => {
            console.log(`MongoDB connection unsuccessful, retry after 5 seconds. ${++count}`);
            setTimeout(() => this.connectWithRetry(count), 5000);
        });
    }
}
exports.default = Database;
