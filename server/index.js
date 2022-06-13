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

    if (!headers || !headers.authorization) {
        return res.status(401).send('Unauthorized');
    }

    // lets lookup this user
    const getUser = await supabaseAdmin.auth.api.getUser(
        headers.authorization.replace("Bearer ", ""),
    );

    if (!getUser.data || getUser.error || !getUser.data.id) {
        return res.status(401).send('Unauthorized');
    }

    const num_images = req.body.num_images;
    if (!text || !num_images) {
        return res.status(400).send('Missing parameters');
    }

    axios.post(config.endpointURL,
        {
            text,
            num_images: 1,
            api_key: config.apikey
        }
    ).then(async (response) => {
        if (!response.data) {
            return res.status(500).send('Error');
        }
        if (response.data) {
            const img = Buffer.from(response.data[0], 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            const insert = await supabaseAdmin.from('image').insert({
                creator: getUser.data.id,
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
            return res.end(img);
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