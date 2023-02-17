import * as chai from 'chai'
import * as sinon from 'sinon'
import User from '../database/models/Users';
// @ts-ignore
import chaiHttp = require('chai-http');
import {app} from '../app'
import { Response } from 'superagent'
const {expect} = chai

chai.use(chaiHttp)

describe('Testa basic route ', () => {
    it('', async () => {
            const response = await chai.request(app).get('/')
            

            expect(response.status).to.be.equal(200);
            expect(response.body).to.deep.equal({'ok': true})
    })
})