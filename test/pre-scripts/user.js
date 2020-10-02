import user from '../../src/api/resources/user/model/user.model';

export default () => {

    const data = [
        {
            name : "Mateus 2",
            email : "teste2@teste.com",
            password : "$2a$10$yRvU2ZXnLXy24HJE7ay9GOxSzFs.Qq/ctluUF8AstxNrLxw.4oUJW",
            cpf : "12345678911",
            born : new Date()
        }
    ];

    return user.insertMany(data);
};