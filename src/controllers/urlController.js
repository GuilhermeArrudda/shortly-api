import { connection } from "../database.js";

export async function generateUrl(req, res) {

    const {url} = req.body;
    const shortUrl = (Math.round(Date.now() / 100)).toString(8)

    try {
        
        await connection.query(`
        INSERT INTO
        urls(url, "shortUrl")
        VALUES ($1, $2)
        `, [url, shortUrl])

        res.send(shortUrl).status(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

export async function getUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        
        const { rows: url } = await connection.query(`
        SELECT * FROM urls
        WHERE "shortUrl" = $1`, [shortUrl]
        );

        if(url.rowCount === 0) {
            return res.sendStatus(404);
        };
        res.send(url).status(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    };
};