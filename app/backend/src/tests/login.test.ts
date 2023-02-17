import * as chai from 'chai'
import * as sinon from 'sinon'
import User from '../database/models/Users';
// @ts-ignore
import chaiHttp = require('chai-http');
import {app} from '../app'
import { Response } from 'superagent'
const {expect} = chai

chai.use(chaiHttp)


describe('Testa endpoint /login ', () => {
    it('', async () => {
            const response: Response = await chai.request(app).post('/login').send();

            expect(response.status).to.be.equal(200);
    })
})