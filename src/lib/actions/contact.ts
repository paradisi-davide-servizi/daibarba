"use server"

import { action } from ".";
import nodemailer from "nodemailer";
import { notEmpty } from "../utils/typeUtils";
import { contactSchema } from "../db/schema/keyValue/contacts";

export const contactAction = action(contactSchema, async (input) => {
    var transporter = nodemailer.createTransport({
        service: "",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW,
        },
    });

    var mailOptions = {
        from: input.email,
        to: process.env.NODEMAILER_EMAIL,
        subject: notEmpty(input.name) ? `Messagio da ${input.name} (${input.email})` : `Messaggio da ${input.email}`,
        text: input.message,
    };

    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            throw error;
        } else {
            return true;
        }
    });
});