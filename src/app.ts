import express from "express"
import "dotenv/config"
import { initSequelize } from "./config/database.ts"
import router from "./routes/main.routes.ts"


const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.get("/health", (req, res) => {
    res.send("All good!")
});

// Routes
app.use('/api', router);

// // Swagger
// setupSwagger(app);

(async () => {
    await initSequelize();

    app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`)
});
})();