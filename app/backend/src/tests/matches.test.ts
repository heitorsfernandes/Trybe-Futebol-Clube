import * as chai from 'chai'
import * as sinon from 'sinon'
import User from '../database/models/Users';
// @ts-ignore
import chaiHttp = require('chai-http');
import {app} from '../app'
import { Response } from 'superagent'
import Matches from '../database/models/Matches';
const {expect} = chai
import {mockPostMatchResult, mockSendPostBody} from './mocks/mocks'
import IMatch from '../database/interfaces/IMatch';
import { response } from 'express';

chai.use(chaiHttp)


describe('Testa endpoint /matches ', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2NjM4NDc4LCJleHAiOjE2NzcyNDMyNzh9.-t3in_D2MGX6gWs_OXtVV4KSaojWMcB6APPt3YQ0Qss'
    it('', async () => {
            sinon.stub(Matches,'create').resolves(mockPostMatchResult as unknown as Matches);
            const response: Response = await chai.request(app).get('/matches');

            expect(response.status).to.be.equal(200);
    })
    it('testa post no endpoind /match', async () => {
        sinon
            .stub(Matches, 'create')
            .resolves(mockPostMatchResult as unknown as Matches);

             const response = await chai
            .request(app)
            .post('/matches')
            .set('authorization', token)
            .send(mockSendPostBody);

            expect(response).to.have.status(201);
            expect(response.body).to.deep.equal(mockPostMatchResult);

            (Matches.create as sinon.SinonStub).restore();
})
})