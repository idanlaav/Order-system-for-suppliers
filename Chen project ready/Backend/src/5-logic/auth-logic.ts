import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import Role from "../4-models/role-model";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../4-models/errors-model";


async function register(user: UserModel): Promise<string> {
    const errors = user.validateRegister();
    if (errors) {
        throw new ValidationError(errors);
    }
    user.email = user.email.toLowerCase();
    if(await isEmailExist(user.email)) {
        throw new ValidationError(`This email: "${user.email}" already exists.`);
    }    
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, DEFAULT)`;
    user.password = cyber.hash(user.password)
    const values = [user.firstName, user.lastName, user.email, user.password];
    const result: OkPacket = await dal.execute(sql, values);
    user.userId = result.insertId;
    user.role = Role.User;
    const token = cyber.getNewToken(user);
    delete user.password;
    return token;
}

async function login(credential: CredentialsModel): Promise<string> {
    const errors = credential.logInValidation();
    if (errors) {
        throw new ValidationError(errors);
    }
    credential.email = credential.email.toLowerCase();    
    credential.password = cyber.hash(credential.password)
    const sql = `SELECT * FROM users 
                 WHERE email LIKE ?
                 AND password LIKE ?;`;
    const values = [credential.email, credential.password];
    const result = await dal.execute(sql,values);
    if(result[0] === undefined) {
        throw new UnauthorizedError("Incorrect email or password");
    }
    const token = cyber.getNewToken(result);
    delete credential.password
    return token;
}

async function isEmailExist(email: string): Promise<boolean> {
    const sql = `SELECT COUNT(email) as count 
                 FROM users 
                 WHERE email = ?`;
    const values = [email];
    const result = await dal.execute(sql, values);
    const count = result[0].count;
    return count > 0
}


export default {
    register,
    login
}