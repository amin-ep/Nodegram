import express from 'express';
import morgan from 'morgan';
import postRouter from './routes/postRoutes.js';
import HTTPError from './utils/httpError.js';
import globalErrorHandler from './controllers/errorController.js';
import userRouter from './routes/userRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import likeRouter from './routes/likeRoutes.js';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocumentation } from './documentation/swagger.js';
import cors from 'cors';
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(
  '/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentation),
);
app.use('/static', express.static('public/images'));

// middlewares

const limiter = rateLimit({
  limit: 100,
  windowMs: 60 * 15 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
  statusCode: 429,
});

app.use('/api', limiter);
app.use(mongoSanitize());
app.use(helmet());
app.use(cors());
// app.use(hpp({ }))

// Routes

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/likes', likeRouter);

app.all('*', function (req, res, next) {
  return next(
    new HTTPError(`cannot find ${req.originalUrl} on the server`, 404),
  );
});
app.use(globalErrorHandler);

export default app;
