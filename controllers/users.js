import { UserModel } from "../models/user.js";
import { loginUserValidator, registerUserValidator } from "../validators/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    // Validate user information
    const {} = registerUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Check if user does not exist already
    const user = await UserModel.findOne({
        $or: [
            {username: value.username},
            {email: value.email}
        ]
    });
    if (user) {
        return res.staus(409).json('User already exists');
    }
    // Hash palintext password
    const hashedPassword = bcrypt.hashSync(value.password, 10);

    // Create user record in database
    await UserModel.create({
        ...value,
        password: hashedPassword
    });
    // Send registration email to user
    // (optional) Generate access token for user)
    // Return Response
    res.status(201).json('User registered succesfully')

}

export const loginUser = async (req, res, next)=> {
    // Validate user information
    const {error, value} = loginUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Find matching user record in database
    const user = await UserModel.findOne({
        $or: [
            {username: value.username},
            {email: value.email}
        ]
    });
    if (user) {
        return res.staus(404).json('User does not exist!');
    }

    // compare incoming password with saved password
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
        return res.status(401).json('Invalid credentials!');
    }
    // Generate access token for user
    const accessToken =jwt.sign(
        {id: user.id },
        process.env.JWT_SECRET_KEY,
        {expiresIn: '24h'}
    )
    // Return Response
    res.status(200).josn({accessToken});
}