const bcrypt = require('bcryptjs');
const HttpException = require('../utils/HttpException.utils')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const UserModel = require('../models/user.model');

dotenv.config();

class UserController {

    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.find();
        if (!userList.length) {
            throw new HttpException(404, 'Users not found')
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword
        })
        res.send(userList)
    };

    getUserById = async (req, res, next) => {
        const id = req.params.id;
        console.log('user id<<>>:', id);
        const user = await UserModel.findOne(id);
        if (!user) {
            throw new HttpException(404, 'User not found')
        }
        const { password, ...userWithoutPassword } = user;
        res.send(userWithoutPassword)
    };

    deleteUser = async (req, res, next) => {
        const id = req.params.id
        const result = await UserModel.delete(id)
        if (!result) {
            throw new HttpException(404, 'User doest exist')
        }
        res.send('User has being deleted')
    }

    createUser = async (req, res, next) => {
        this.checkValidation(req);
        // console.log('passsss',body);
        const hashedPassword = await this.hashPassword(req.body.password);
        const user = { ...req.body, password: hashedPassword};
        const result = await UserModel.create(user)
        if (!result) {
            throw new HttpException(500, 'Something went wrong')
        }

        res.status(201).send('user was created')
    }

    updateUser = async (req, res, next) => {
        const userId = req.params.id;
        const user = await UserModel.findOne(userId);
        const { id, ...userWithoutId } = user
        const updatebody = { ...userWithoutId, ...req.body }
        const result = await UserModel.update(userId, updatebody)
        console.log('updated user:', result)
        if (!result) {
            throw new HttpException(500, 'Could not update user')
        }
        res.status(204).send('User updated successfully')
    }

    userLogin = async (req, res, next) => {
        this.checkValidation(req);
        const { email, password: pass } = req.body;
        console.log('user info<<<<>>>>>>:', { email, pass });
        const user = await UserModel.findOneByEmail(email);
        console.log(user);
        if (!user) {
            throw new HttpException('Unable to login')
        }
        // const isMatch = await bcrypt.compare(pass, user.password)
        // console.log('match<<<<>>>>:', isMatch);

        // if (!isMatch) {
        //     throw new HttpException(401, 'Incorrect password')
        // }
        const sescretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, sescretKey, { expiresIn: '24h' });
        const { password, ...userWithoutPassword } = user;
        res.send({ ...userWithoutPassword, token })
    }


    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(404, 'Validation failed', errors)
        }
    }
    hashPassword = async (password) => {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        return hashedPassword
    }
}

module.exports = new UserController