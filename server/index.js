import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
const app = express();
import config from './config.js';
import { supabaseAdmin } from './supabaseClient.js';
const port = config.port;

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

    const num_images = req.body.num_images;
    if (!text || !num_images) {
        console.log('no text or num_images');
        return res.status(400).send('Missing parameters');
    }
    
    console.log('generating ' + text);
    axios.post(config.endpointURL,
        {
            text,
            num_images: 1,
            api_key: config.apikey
        }
    ).then(async (response) => {
        console.log('got response!');
        if (!response.data) {
            console.log('no data');
            return res.status(500).send('Error');
        }
        if (response.data) {
            const img = Buffer.from(response.data[0], 'base64');
            const insert = await supabaseAdmin.from('image').insert({
                creator: userId,
                input: text,
                public: false,
                ip,
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
            console.log('success');
            return res.status(200).send({
                id,
                text,
                creator: userId,
            });
        }
        return res.status(500).send('Error');
    }).catch(error => {
        console.log(error);
        return res.status(500).send('Error');
    });
}
);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});