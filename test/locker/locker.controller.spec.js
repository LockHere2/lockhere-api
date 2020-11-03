import chai from 'chai';
import http from 'chai-http';
import subSet from 'chai-subset';

import app from '../../src/app';

chai.use(http);
chai.use(subSet);

let headers = {};

describe('Locker controller', () => {

    before(async () => {
        await chai.request(app)
            .post('/api/users/login')
            .send({ email: 'teste2@teste.com', password: '123456' })
            .then((res) => {
                headers.authorization = 'Bearer ' + res.body.token;
            });
    });

    it('should get lockers nearby', async () => {
        const long = 'aa';
        const lat = 'bb';
        await chai.request(app)
            .get(`/api/locker/lockers/long/${long}/lat/${lat}`)
            .set('Authorization', headers.authorization)
            .then((res) => {
                const fields = res.body.fields;
                chai.expect(res).to.have.status(400);
                chai.expect(fields).to.have.length(2);
                chai.expect(fields[0].message).to.eq('Longitude inválida');
                chai.expect(fields[0].field).to.eq('long');
                chai.expect(fields[1].message).to.eq('Latitute inválida');
                chai.expect(fields[1].field).to.eq('lat');
            });
    });

    it('should get lockers nearby', async () => {
        const long = -47.427297;
        const lat = -22.602373;
        await chai.request(app)
            .get(`/api/locker/lockers/long/${long}/lat/${lat}`)
            .set('Authorization', headers.authorization)
            .then((res) => {
                const lockersGroups = res.body;
                chai.expect(res).to.have.status(200);
                chai.expect(lockersGroups).to.have.length(2);
                chai.expect(lockersGroups[0]._id).to.eq('5f6544c43fbc6c8153721de0');
                chai.expect(lockersGroups[1]._id).to.eq('5f63d03b3fbc6c8153720928');
            });
    });

    it('should not get lockers nearby', async () => {
        const long = -70.427297;
        const lat = -71.602373;
        await chai.request(app)
            .get(`/api/locker/lockers/long/${long}/lat/${lat}`)
            .set('Authorization', headers.authorization)
            .then((res) => {
                const lockersGroups = res.body;
                chai.expect(res).to.have.status(200);
                chai.expect(lockersGroups).to.have.length(0);
            });
    });

    it('should get lockers by group id', async () => {
        const id = '5f6544c43fbc6c8153721de0';
        await chai.request(app)
            .get(`/api/locker/lockers/locker-group/${id}`)
            .set('Authorization', headers.authorization)
            .then((res) => {
                const { lockers } = res.body;
                chai.expect(res).to.have.status(200);
                chai.expect(lockers).to.have.length(3);
            });
    });

    it('should not find group id', async () => {
        const id = '5f6544c43fbc6c8153721de1';
        await chai.request(app)
            .get(`/api/locker/lockers/locker-group/${id}`)
            .set('Authorization', headers.authorization)
            .then((res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res.body.message).to.eq('Locker group não encontrado.');
            });
    });

});
