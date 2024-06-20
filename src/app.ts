import express, { Application } from 'express'
import router from './app/routes';
import cors from 'cors';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors())

app.use('/api', router);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!!')
// })

app.use(globalErrorHandler);

app.use(notFound);

export default app;