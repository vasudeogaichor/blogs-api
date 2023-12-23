import http from "http";
import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import routes from "./routes";
import db from "./database/connection";

const router: Express = express();

/** Logging */
router.use(morgan("dev"));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

//synchronizing the database and forcing it to false so we dont lose data
// force: true => drops all tables and recreates them,
// useful in development only, remove in production
db.sequelize.sync(/*{ force: true }*/).then(() => {
  console.log("db has been re sync");
});

/** Routes */
router.use("/", routes.blogsRouter);
router.use("/", routes.usersRouter)

/** Error handling */
// router.use((req, res, next) => {
//   const error = new Error("not found");
//   return res.status(404).json({
//     message: error.message,
//   });
// });

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const stackTrace = err.stack?.split("\n") || [];
  res.status(500).json({ Error: stackTrace });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
