import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
    desc: String,
    editing: {type: Boolean, default: false},
    complete: {type: Boolean, default: false}
});

export {TaskSchema};