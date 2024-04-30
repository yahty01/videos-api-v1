import {Request, Response, Router} from "express";
import {videos, Video, Resolutions} from "../db/db";

export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos);
})

videosRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const video = videos.find(x => x.id === id);
    if (video) {
        res.send(video);
    } else {
        res.sendStatus(404);
    }
})

videosRouter.post('/', (req: Request, res: Response) => {
    const { title, author, canBeDownloaded = false, minAgeRestriction = null, availableResolutions = null } = req.body;
    const errorsMessages = [];
    // Проверка обязательных полей и добавление сообщений об ошибках в массив.
    if (!title) { errorsMessages.push({ message: "title is required", field: "title" });}
    if (!author) { errorsMessages.push({ message: "author is required", field: "author" });}
    // Если в массиве есть ошибки, отправить их и прервать выполнение функции.
    if (errorsMessages.length > 0) {
        res.status(400).json({ errorsMessages });
        return;
    }
    const newVideo: Video = {
        id: videos.length + 3 + new Date().getTime(),
        title,
        author,
        canBeDownloaded,
        minAgeRestriction,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: availableResolutions ? availableResolutions.filter((r: any) => Object.values(Resolutions).includes(r)) : null
    };
    videos.push(newVideo)
    res.status(201).json(newVideo)
})

videosRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const video = videos.find(x => x.id === id);

    if (!video) {
        res.sendStatus(404);
        return;
    }

    const { title: currentTitle, author: currentAuthor, canBeDownloaded: currentCanBeDownloaded,
        minAgeRestriction: currentMinAgeRestriction, availableResolutions: currentAvailableResolutions } = video;

    const { title = currentTitle, author = currentAuthor, canBeDownloaded = currentCanBeDownloaded,
        minAgeRestriction = currentMinAgeRestriction, availableResolutions = currentAvailableResolutions } = req.body;

    if (!title || typeof title !== "string" || !title.trim() || title.length > 40) {
        res.status(400).send({
            errorsMessage: [{
                message: "title is required",
                field: 'title',
            }]
        })
        return
    }

    if (!author || typeof author !== "string" || !author.trim() || author.length > 20) {
        res.status(400).send({
            errorsMessage: [{
                message: "author is required",
                field: 'author',
            }]
        })
        return;
    }

    video.title = title;
    video.author = author;
    video.canBeDownloaded = canBeDownloaded;
    video.minAgeRestriction = minAgeRestriction;
    video.availableResolutions = availableResolutions;

    res.status(204).json(video);

})

videosRouter.delete('/:id', (req: Request, res: Response) => {
    const iD = +req.params.id;
    const videoIndex = videos.findIndex(video => video.id === iD);
    if (videoIndex > -1) {
        videos.splice(videoIndex, 1);
        res.status(204)
    } else {res.status(404)}
    // for ( let i = 0; i < videos.length; i++ ) {
    //     if (videos[i].id === +req.params.id) {
    //         videos.splice(i, 1);
    //         res.status(204);
    //         return
    //     }
    // }
    // res.status(404)
})
