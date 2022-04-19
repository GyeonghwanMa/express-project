import User from "../model/userSchema";
import { isValidObjectId } from "mongoose";
import nodemailer from "nodemailer";
const { MAILHOST, EMAIL, PASSWORD } = process.env;

export const userResolvers = {
    Query: {
        async getUser(_, {email, password}) {
            console.log("getUser 실행!");
            let result;
            try {
                result = await User.findOne({email: email, password: password});
            } catch (error) {
                console.log(`getUser Error = ${error}`);
            }
            return result;
        },
        async getUsersInit() {
            console.log("getUsersInit 실행!")
            let result;
            try {
                result = await User.find().sort({_id: -1}).limit(20);
            } catch (error) {
                console.log(`getUsersInit Error = ${error}`);
            }
            return result;
        },
        async getUsers(_, {lastId}) {
            console.log("getUsers 실행!")
            let result;
            try {
                if (lastId && !isValidObjectId(lastId)) throw new Error("invalid lastid");
                result = await User.find({_id: { $lt: lastId } }).sort({_id: -1}).limit(20);
            } catch (error) {
                console.log(`getUsers Error = ${error}`);
            }
            return result;
        },
        async getUserByEmail(_, {email}) {
            let result;
            try {
                result = await User.findOne({email: email});
            } catch (error) {
                console.log(`getUser Error = ${error}`);
            }
            return result;
        },
        async sendEmail() {
            console.log("sendEmail 실행!")
            let transporter = nodemailer.createTransport({
                // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
                service: 'gmail',
                // host를 gmail로 설정
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                  // Gmail 주소 입력, 'testmail@gmail.com'
                  user: EMAIL,
                  // Gmail 패스워드 입력
                  pass: PASSWORD,
                },
            });
            let info = await transporter.sendMail({
                // 보내는 곳의 이름과, 메일 주소를 입력
                from: `"hi" <${EMAIL}>`,
                // 받는 곳의 메일 주소를 입력
                to: 'ghma1213@gmail.com',
                // 보내는 메일의 제목을 입력
                subject: 'hi',
                // 보내는 메일의 내용을 입력
                // text: 일반 text로 작성된 내용
                // html: html로 작성된 내용
                text: "hi",
                html: `<b>hi</b>`,
            });
            if (info.messageId) {
                return true;
            } else {
                return false;
            }
        }
    },
    Mutation: {
        async postUser(_, {email, password, name}) {
            console.log("postUser 실행!");
            const newUser = new User({
                email,
                password,
                name,
            });
            let result;
            try {
                result = await newUser.save();
            } catch (error) {
                console.log(`postUser Error = ${error}`);
            }
            return result;
        },
        async patchUser(_, {email, password, name}) {
            console.log("patchUser 실행!");
            let result;
            try {
                result = await User.findOneAndUpdate(
                    {email: email},
                    {$set: {password: password, name: name}}    
                );
            } catch (error) {
                console.log(`patchUser Error = ${error}`);
            }
            return result;
        },
        async deleteUser(_, {email, password}) {
            console.log("deleteUser 실행!");
            let result;
            try {
                result = await User.findOneAndDelete({email: email, password: password});
                console.log(result);
            } catch (error) {
                console.log(`deleteUser Error = ${error}`);
            }
            return result;
        }
    },
}
