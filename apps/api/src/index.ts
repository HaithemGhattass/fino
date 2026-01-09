import "dotenv/config";
import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projects";
import baseRoutes from "./routes/base";
import PageRoutes from "./routes/pages";
import annotationRoutes from "./routes/annotations";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/", baseRoutes);
app.use("/pages", PageRoutes);
app.use("/annotations", annotationRoutes);


app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});

