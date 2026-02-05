import { Schema, model } from "mongoose";

import { TaskSchema } from "./Task.js";

const listSchema = new Schema({
    name: String,
    tasks: [TaskSchema],
    created: {type: Date, default: Date.now},
    owner: { type: Schema.Types.ObjectId, ref: "User" }
});

export default model('List', listSchema);