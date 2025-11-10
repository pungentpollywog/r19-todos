import { Schema, model } from "mongoose";

import { TaskSchema } from "./Task.js";

const listSchema = new Schema({
    name: String,
    tasks: [TaskSchema]
});

export default model('List', listSchema);