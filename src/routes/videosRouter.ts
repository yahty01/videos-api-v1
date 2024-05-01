import {Request, Response, Router} from "express";
import {videos, Video, Resolutions} from "../db/db";

function isValidResolution(resolution: any): boolean {
    const resolutionValues = Object.values(Resolutions);
    // Если resolution является массивом, проверяем каждый элемент массива
    if (Array.isArray(resolution)) {
        return resolution.every(r => resolutionValues.includes(r));
    }
    // Иначе проверяем одиночное значение
    return resolutionValues.includes(resolution);
}


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
    if (availableResolutions && !isValidResolution(availableResolutions)) { errorsMessages.push({ message: "availableResolutions is required", field: "availableResolutions"})}
    // Проверка обязательных полей и добавление сообщений об ошибках в массив.
    if (!title || typeof title !== "string" || !title.trim() || title.length > 40) { errorsMessages.push({ message: "title is required", field: "title" });}
    if (!author || typeof author !== "string" || !author.trim() || author.length > 20) { errorsMessages.push({ message: "author is required", field: "author" });}
    // Если в массиве есть ошибки, отправить их и прервать выполнение функции.
    if (errorsMessages.length > 0) {
        res.status(400).send({ errorsMessages });
        return;
    }
    const createdAt = new Date();
    const publicationDate = new Date();
    publicationDate.setDate(createdAt.getDate() + 1);

    const newVideo: Video = {
        id: videos.length + 3 + new Date().getTime(),
        title,
        author,
        canBeDownloaded,
        minAgeRestriction,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: availableResolutions
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
    const {
        title: title = video.title,
        author: author = video.author,
        canBeDownloaded: canBeDownloaded = video.canBeDownloaded,
        minAgeRestriction: minAgeRestriction = video.minAgeRestriction,
        availableResolutions: availableResolutions = video.availableResolutions
    } = req.body;

    const errorsMessages = [];

    if (title === null || title === undefined || !title.trim() || title.length > 40) {
        errorsMessages.push({ message: "title is required or too long", field: "title" });
    }
    if (!author || !author.trim() || author.length > 20) {
        errorsMessages.push({ message: "author is required or too long", field: "author" });
    }
    if (typeof canBeDownloaded !== 'boolean') {
        errorsMessages.push({ message: "canBeDownloaded must be boolean", field: "canBeDownloaded" });
    }
    if (availableResolutions && !isValidResolution(availableResolutions)) { errorsMessages.push({ message: "availableResolutions is required", field: "availableResolutions"})}
    if (typeof minAgeRestriction !== 'number' && minAgeRestriction !== null) {
        errorsMessages.push({ message: "minAgeRestriction must be a number or null", field: "minAgeRestriction" });
    }
    if (errorsMessages.length > 0) {
        res.status(400).send({ errorsMessages });
        return;
    }



    video.title = title;
    video.author = author;
    video.canBeDownloaded = canBeDownloaded;
    video.minAgeRestriction = minAgeRestriction;
    video.availableResolutions = availableResolutions;
    video.publicationDate = new Date().toISOString();

    res.status(204).send(video);
});


videosRouter.delete('/:id', (req: Request, res: Response) => {
    const iD = +req.params.id;
    const videoIndex = videos.findIndex(video => video.id === iD);
    if (videoIndex > -1) {
        videos.splice(videoIndex, 1);
        res.sendStatus(204)
    } else {res.sendStatus(404)}
})
