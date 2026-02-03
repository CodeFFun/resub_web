import express, {Request, Response} from 'express';
import cors from 'cors';
import { PORT } from './config';
import bodyParser from 'body-parser';
import { connectDatabase } from './database/mongodb';
import authRoutes from './routes/auth.routes';
import shopRoutes from './routes/shop.routes';
import addressRoutes from './routes/address.routes';
import path from 'path';

const app = express();
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/shops', shopRoutes);
app.use('/addresses', addressRoutes);
app.get('/', (req:Request, res:Response) => {
  return res.status(200).json({ sucess: true, message: 'Welcome to the api' });
});

async function startServer() {
    await connectDatabase();

    app.listen(
        PORT,
        () => {
            console.log(`Server: http://localhost:${PORT}`);
        }
    );
}

startServer();