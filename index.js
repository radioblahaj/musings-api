const express = require("express");
const app = express();
const port = 1234;
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

app.use(express.json());
const crypto = require("crypto");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/*
Every user has an account. In their account, they can post short messages (limited to 100 chracters)
Messages can be public or private. They can be shared with friends, or everyone. Users can add other people
as friens. Notes can not be edited but they can be deleted. You can only post 5 notes a day. Each user has an RSS feed
and endpoint they can use to share their notes on their website
*/

app.post("/note/create", (req, res) => {
    const { content, date, share, apikey} = req.body;

    if (!content || !date || !share || !apikey) {
        return res.status(400).json({error: "Missing required fields"})
    }
    

app.post("/account", async (req, res) => {
    const {name, email} = req.body;


    const key = crypto.randomBytes(20).toString('hex');

    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                apiKey: key,
            }
        })
        console.log(`Account created for ${name} (${email}) with key ${key}`)
        console.log(`Prisma record created:`, user ? user : "No user created")
        // console.log(user)
        res.json({
            data: {
                key: key,
            }
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
        return
    }
})

app.listen(1234, () =>
  console.log(`You Feel We Feel running ${port}! http://localhost:${port}/`),
);
