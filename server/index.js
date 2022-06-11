import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
const app = express();
import config from './config.json';
const port = config.port;

app.use(bodyParser.json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.post('/dalle', async (req, res) => {
    // get json from request
    const json = req.body;
    console.log(json);
    const text = req.body.text;
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
    ).then(response => {
        if (!response.data) {
            return res.status(500).send('Error');
        }
        if (response.data) {
            const img = Buffer.from(response.data[0], 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            return res.end(img);
        }
    }).catch(error => {
        console.log(error);
        return res.status(500).send('Error');
    });
}
);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});