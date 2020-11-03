import chai from 'chai';
import http from 'chai-http';
import subSet from 'chai-subset';

import app from '../../src/app';

chai.use(http);
chai.use(subSet);

let userInput = {};

describe('User controller', () => {
    beforeEach(() => {
        userInput = {
            name: "Mateus",
            email: "teste@teste.com",
            password: "123456",
            repassword: "123456",
            cpf: "12345678910",
            born: "2020-10-30"
        }
    });

    it('should user signup', async () => {
        await chai.request(app)
            .post('/api/users/signup')
            .send(userInput)
            .then((res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.success).eq(true);
                chai.expect(res.body.token).not.eq(null);
            });
    });

    it('should invalid email', async () => {
        userInput.email = 'testee';
        await chai.request(app)
            .post('/api/users/signup')
            .send(userInput)
            .then((res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res.body.fields[0].message).to.eq('Email inválido');
            });
    });

    it('should have a user with same email', async () => {
        userInput.email = 'teste@teste.com';
        await chai.request(app)
            .post('/api/users/signup')
            .send(userInput)
            .then((res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res.body.message).to.eq('Já existe um usuário com este email.');
            });
    });

    it('should have a user with same cpf', async () => {
        userInput.email = 'some123@some.com';
        userInput.cpf = '12345678910';
        await chai.request(app)
            .post('/api/users/signup')
            .send(userInput)
            .then((res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res.body.message).to.eq('Já existe um usuário com este Cpf.');
            });
    });

    it('should not login with invalid email', async () => {
        await chai.request(app)
            .post('/api/users/login')
            .send({ email: 'teste@', password: '123456' })
            .then((res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res.body.fields[0].message).to.eq('Email inválido');
            });
    });

    it('should not login with invalid password', async () => {
        await chai.request(app)
            .post('/api/users/login')
            .send({ email: 'teste@teste.com', password: '1234' })
            .then((res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res.body.fields[0].message).to.eq('Senha inválida');
            });
    });

    it('should not login with nonexistent email', async () => {
        await chai.request(app)
            .post('/api/users/login')
            .send({ email: 'teste@haha.com', password: '123412414' })
            .then((res) => {
                chai.expect(res).to.have.status(401);
                chai.expect(res.body.message).to.eq('Email ou senha inválidos.');
            });
    });

    it('should not login with existent email and incorrect password', async () => {
        await chai.request(app)
            .post('/api/users/login')
            .send({ email: 'teste@haha.com', password: '123412414' })
            .then((res) => {
                chai.expect(res).to.have.status(401);
                chai.expect(res.body.message).to.eq('Email ou senha inválidos.');
            });
    });

    it('should not login with incorrect credentials', async () => {
        await chai.request(app)
            .post('/api/users/login')
            .send({ email: 'teste@teste.com', password: '123412414' })
            .then((res) => {
                chai.expect(res).to.have.status(401);
                chai.expect(res.body.message).to.eq('Email ou senha inválidos.');
            });
    });

    it('should login', async () => {
        await chai.request(app)
            .post('/api/users/login')
            .send({ email: 'teste@teste.com', password: '123456' })
            .then((res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.token).to.not.eq(null);
            });
    });
});
