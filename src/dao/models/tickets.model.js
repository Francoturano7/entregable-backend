import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: {type: String, required: true},
    purchaseDateTime : Date,
    amount: {type: Number, required: true},
    purcharser: {type: String, required: true}
});

export const ticketsModel = mongoose.model(ticketsCollection, ticketSchema);