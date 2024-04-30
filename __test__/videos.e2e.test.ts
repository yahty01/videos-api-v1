import request from 'supertest';
import {app} from '../src/settings'
import {Resolutions, Video, videos} from "../src/db/db";


describe('Videos', () => {
    let videoOne: any = null;
    let videoTwo: any = null

    beforeEach(async () => {
        await request(app).delete('/testing/all-data').expect(204)
    })
    it('GET products = []', async () => {
        await request(app).get('/videos').expect([])
    })

    it('- POST does not create the video with incorrect data (no title, no author)', async function () {
        await request(app)
            .post('/videos')
            .send({title: '', author: ''})
            .expect(400, {
                errorsMessages: [
                    { message: 'title is required', field: 'title' },
                    { message: 'author is required', field: 'author' },
                ],
            })
        const res = await request(app).get('/videos/')
        expect(res.body).toEqual([])
    })

    it ('should return 404 for not existing object', async() => {
        await request(app).get('/videos/' + -1).expect(404)
    })

    it ('- POST create the video with correct data', async function () {
        const createResponse = await request(app)
            .post('/videos')
            .send({title: 'it-video', author: 'egor'})
            .expect(201)
        videoOne = createResponse.body

    // Проверка, что videoOne соответствует ожидаемым требованиям
        expect(videoOne.id).toEqual(expect.any(Number));
        expect(videoOne.title).toEqual(expect.any(String));
        expect(videoOne.author).toEqual(expect.any(String));
        expect(videoOne.canBeDownloaded).toEqual(expect.any(Boolean));
        expect(videoOne.createdAt).toEqual(expect.any(String));
        expect(videoOne.publicationDate).toEqual(expect.any(String));
    // Дополнительно проверяем, что minAgeRestriction либо число, либо null
        expect([null, expect.any(Number)]).toContain(videoOne.minAgeRestriction);
        expect([null, expect.any(String)]).toContain(videoOne.availableResolutions);

        const fetchVideo = await request(app)
            .get('/videos/' + videoOne.id)
            .expect(200);
        expect(fetchVideo.body).toMatchObject(videoOne);
    })

    it ('- POST create one more video with correct data', async function () {
        const createResponse = await request(app)
            .post('/videos')
            .send({title: 'it-video2', author: 'egor2'})
            .expect(201)
        videoTwo = createResponse.body

        // Проверка, что videoOne соответствует ожидаемым требованиям
        expect(videoTwo.id).toEqual(expect.any(Number));
        expect(videoTwo.title).toEqual(expect.any(String));
        expect(videoTwo.author).toEqual(expect.any(String));
        expect(videoTwo.canBeDownloaded).toEqual(expect.any(Boolean));
        expect(videoTwo.createdAt).toEqual(expect.any(String));
        expect(videoTwo.publicationDate).toEqual(expect.any(String));
        // Дополнительно проверяем, что minAgeRestriction либо число, либо null
        expect([null, expect.any(Number)]).toContain(videoTwo.minAgeRestriction);
        expect([null, expect.any(String)]).toContain(videoTwo.availableResolutions);

        const fetchVideo = await request(app)
            .get('/videos/' +videoTwo.id)
            .expect(200);
        expect(fetchVideo.body).toMatchObject(videoTwo);
    })
})
