//add type to package.json to make possible the use of "import" instead of "require".
import {PORT, mongoDBURL} from "./config.js";
import { PostIt } from "./models/postItModel.js";

import mongoose from "mongoose";
import express, { response } from "express";
const app = express();

app.use(express.json());



app.post("/post", async (req, res) => {
    try {
        if(!req.body.note) {
            return res.status(400).send({message: 'Está faltando a mensagem.'})
        }

        const newPostIt = {
            note: req.body.note,
            author: req.body.author
        };
        const post = await PostIt.create(newPostIt);
        return res.status(201).send(post);

    } catch (err) {
        res.status(500).send({message: err.message})
    }
})

app.get("/:postRendered", async(req, res) => {
    try {
        const limitReqPost = 30;
        const {postRendered} = req.params;
        const renderSkip = parseInt(postRendered);

        const posts = await PostIt.find({}).skip(20).limit(limitReqPost);

        let sum = renderSkip+limitReqPost;

        return res.status(200).json({
            skipValue: sum,
            data:posts,
        });
    } catch (err) {
        res.status(500).send({message: err.message});
    }
})

mongoose.connect(mongoDBURL)
    .then(() =>
        app.listen(PORT, () => {
            console.log("Server is on 🔥 - ")
        })
    ).catch((err)=> {
        console.log(err);
    });

app.get('/', (req, res) => {
    console.log(req);
    res.status(201).send('Hello brasil!🏳')
});