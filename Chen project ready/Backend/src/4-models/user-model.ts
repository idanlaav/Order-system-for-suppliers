import Joi from "joi";
import Role from "./role-model";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: Role;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    private static registerValidation = Joi.object ({
        userId: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(15),
        lastName: Joi.string().required().min(2).max(25),
        email: Joi.string().required().min(5).max(50),
        password: Joi.string().required().min(6).max(20),
        role: Joi.string().optional(),
    })

    public validateRegister(): string {
        const result = UserModel.registerValidation.validate(this, {abortEarly: false} );
        return result.error?.message;
    }
}

export default UserModel;