// dotenv
import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
const app = express();
import { supabaseAdmin } from './supabaseClient.js';
import { postPrompt } from './dalle.js';
const port = process.env.port;

app.use(bodyParser.json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.post('/dalle', async (req, res) => {
    // get json from request
    const json = req.body;
    const text = req.body.text;
    const headers = req.headers;

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`${ip} requested "${text}"`);

    if (!ip) {
        return res.status(401).send('No IP address');
    }

    let userId;

    if (headers && headers.authorization) {
        const getUser = await supabaseAdmin.auth.api.getUser(
            headers.authorization.replace("Bearer ", ""),
        );
        if (getUser.error || !getUser.data.id) {
            console.log('no user or user error');
        } else {
            userId = getUser.data.id;
        }
    }

    if (!userId) {
        return res.status(401).send('Please login!');
    }

    if (!text) {
        console.log('no text');
        return res.status(400).send('Missing parameters');
    }

    console.log('generating ' + text);

    const promptResult = await postPrompt(text, userId);

    if (!promptResult || promptResult.status >= 300) {
        return res.status(500).send('Error');
    }
    console.log('prompt result', promptResult)
    const urls = promptResult.data.map((d) => d.url);

    let ids = [];

    for (let i = 0; i < urls.length; i++) {
        const imageUrl = urls[i];

        // get the bytes from the image url
        const imageBytes = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
        });

        const img = Buffer.from(imageBytes.data, 'binary');

        const insert = await supabaseAdmin.from('image').insert({
            creator: userId,
            input: text,
            public: false
        });
        const id = insert.data[0].id;
        const imageUpload = await supabaseAdmin
            .storage
            .from('images')
            .upload(id, img, {
                cacheControl: '36000',
                contentType: 'image/png'
            });
        if (imageUpload.error || !id) {
            console.log('error uploading image');
            return res.status(500).send('Error');
        }
        ids.push(id);
    }
    console.log('success');
    return res.status(200).send({
        ids,
        text,
        creator: userId,
    });
}
);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
