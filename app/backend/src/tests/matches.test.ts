import * as chai from 'chai'
import * as sinon from 'sinon'
import User from '../database/models/Users';
// @ts-ignore
import chaiHttp = require('chai-http');
import {app} from '../app'
import { Response } from 'superagent'
import Matches from '../database/models/Matches';
const {expect} = chai
import matchesMock from './mocks/mocks'
import IMatch from '../database/interfaces/IMatch';

chai.use(chaiHttp)


describe('Testa endpoint /matches ', () => {
    it('', async () => {
            sinon.stub(Matches,'findAll').resolves(matchesMock as unknown as Matches[]);
            const response: Response = await chai.request(app).get('/matches');

            expect(response.status).to.be.equal(200);
    })
})