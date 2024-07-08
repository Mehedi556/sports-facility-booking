import express, { Application, Request, Response } from 'express'
import router from './app/routes';
import cors from 'cors'
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors())

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Sports Facility Booking app is running..')
})

app.use(globalErrorHandler);

app.use(notFound);

export default app;