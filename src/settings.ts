import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {videosLocalRepository} from "./db/db";
import {videosRouter} from "./routes/videosRouter";
export const app = express()

app.use(bodyParser({}))

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
    videosLocalRepository.length = 0
    res.sendStatus(CodeResponsesEnum.NoContent_204)
})
