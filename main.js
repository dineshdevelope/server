import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movies.route.js";
import connectDB from "./lib/db.js";
const app = express();
const PORT = 5555;

//Data Understand MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect DB
connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Hello EveryOne",
  });
});

//CRUD functionality of movies
app.use("/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`server is Runing at http://127.0.0.1:${PORT}`);
});
