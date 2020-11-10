import crypto from 'crypto';

export default () => {
    let code = "";

    do {
        code += crypto.randomBytes(3).readUIntBE(0, 3);
    } while (code.length < 6);

    return code.slice(0, 6);
}