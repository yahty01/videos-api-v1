import express, {Request, Response} from 'express'
import {videos} from "./db/db";
import {videosRouter} from "./routes/videosRouter";
export const app = express()
app.use(express.json()); // Middleware для разбора JSON

const CodeResponsesEnum = {
    Ok_200: 200,
    Created_201: 201,
    Accepted_202: 202,
    NonAuthoritativeInformation_203: 203,
    NoContent_204: 204,
    ResetContent_205: 205,
    PartialContent_206: 206
};

app.use('/videos', videosRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello back-end !!!')
})
app.delete('/testing/all-data',(req: Request, res: Response) => {
    videos.length = 0
    res.sendStatus(CodeResponsesEnum.NoContent_204)
})
