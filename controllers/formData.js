import FormData from '../models/data.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const createUser = async (req, res) => {
    // console.log(req.file)
    const { name, phoneNumber, email, hobbies } = req.body
    // console.log(name, phone, email, hobbies)

    try {
        // const existingUser = await UsersData.findOne({ movieName });

        // if (existingUser) return res.status(404).json({ message: "Movie Already Exists click on edit to edit it." })

        const newUser = new FormData({ name, phoneNumber, email, hobbies })
        await newUser.save()
        console.log(newUser)

        res.status(200).json({ newUser });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ', error });
    }

}

export const getUser = async (req, res) => {
    // const parentId = req.user._id

    try {
        const userData = await FormData.find();
        res.status(200).json({ userData });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ' });
    }

}

export const updateUser = async (req, res) => {
    // const parentId = req.user._id
    const { name, phoneNumber, email, hobbies, _id } = req.body
    var item = {
        name, phoneNumber, email, hobbies
    }

    try {
        const userData = await FormData.updateOne({ _id }, { $set: item });
        res.status(200).json({ userData });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ' });
    }

}

export const deleteData = async (req, res) => {
    const id = req.query.id

    try {
        await FormData.findByIdAndDelete(id);
        res.json({ message: " deleted successfully." });

    }
    catch {
        res.json({ message: "Something went wrong" });

    }
}


export const sendMail = async (req, res) => {
    // const id = req.query.id
    // console.log(id)
    // console.log("jfjdfjkd")
    // console.log(req.body)
    const data = req.body
    const form = []
    data.forEach(element => {
        const { name, phoneNumber, email, hobbies } = element
        form.push(name, phoneNumber, email, hobbies)

    });
    try {
        const { Email_ID } = process.env
        const { Password } = process.env

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: Email_ID,
                pass: Password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailDetails = {
            from: 'info@anupam.com',
            to: 'info@redpositive.in',
            subject: 'Anupams Assignment Data',
            text: `${form}`
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
            } else {
                console.log('Email sent successfully');
            }
        });


    }
    catch {
        res.json({ message: "Something went wrong" });

    }
}
