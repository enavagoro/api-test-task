import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

class Database {
  private readonly URI: string;
  private connection: mongoose.Connection | undefined;

  constructor() {
    dotenv.config();
    const localUri = process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost:27017/task-api';
    this.URI = localUri;
  }

  public startConnection(){
    this.connectWithRetry();
  }

  public async getConnection(): Promise<mongoose.Connection> {
    if (!this.connection) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo
    }

    if (!this.connection) {
      throw new Error('The connection to the database could not be established.');
    }

    return this.connection;
  }

  private connectWithRetry(count = 0): void {
    mongoose
      .connect(this.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions)
      .then(() => {
        this.connection = mongoose.connection;
      })
      .catch((err) => {
        console.log(`MongoDB connection unsuccessful, retry after 5 seconds. ${++count}`);
        setTimeout(() => this.connectWithRetry(count), 5000);
      });
  }
}

export default Database;