import {Request, Response, Router} from "express";
import {videosLocalRepository} from "../db/db";

export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videosLocalRepository);
})