import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import express from "express";

import { PORT } from "./config/app";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello!");
});

app.get("/users", async (req, res) => {
	const users = await prisma.user.findMany();
	res.json(users);
});

app.post(`/user`, async (req, res) => {
	const result = await prisma.user.create({
		data: { ...req.body },
	});
	res.json(result);
});

app.listen(PORT, () => console.log(`REST API server ready at: http://localhost:${PORT}`));
