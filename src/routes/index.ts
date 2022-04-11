import express from "express";
const router = express.Router();
import Admin from "../controllers/Admin";
import verifyToken from "../middlewares/auth";
import data from "../config/db/seeds/data"

// Some dummy data
router.get("/users", (req, res) => {
    res.status(201).send(data)
})

// Admin routes
router.get("/admin", verifyToken, Admin.show);
router.get("/admin/:email", Admin.getByEmail)
router.post("/admin/register", Admin.create);
router.post("/admin/login", Admin.login)

export default router;
