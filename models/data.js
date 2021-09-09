import mongoose from "mongoose";

const userData = mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    hobbies: { type: String, required: true },

})

const FormData = mongoose.model('FormData', userData);
export default FormData