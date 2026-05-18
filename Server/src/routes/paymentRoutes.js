import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { supabaseAdmin } from "../services/supabaseAdmin.js";

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
    try {
        console.log("Create order body:", req.body);

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({
                message: "Razorpay keys are missing in Server/.env",
            });
        }

        const {
            userId,
            amount,
            purpose = "mentor_booking",
            mentorId,
            mentorName,
            planName,
        } = req.body || {};

        if (!userId || !amount || !mentorId || !mentorName || !planName) {
            return res.status(400).json({
                message: "Missing required payment details.",
                received: req.body,
            });
        }

        const amountInPaise = Number(amount) * 100;

        if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
            return res.status(400).json({
                message: "Invalid payment amount.",
                receivedAmount: amount,
            });
        }

        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: `synapse_${Date.now()}`,
            notes: {
                userId,
                purpose,
                mentorId,
                mentorName,
                planName,
            },
        });

        const { data: paymentRecord, error: paymentError } = await supabaseAdmin
            .from("payments")
            .insert({
                user_id: userId,
                razorpay_order_id: order.id,
                amount: amountInPaise,
                currency: "INR",
                purpose,
                status: "created",
                metadata: {
                    mentorId,
                    mentorName,
                    planName,
                },
            })
            .select("*")
            .single();

        if (paymentError) {
            console.error("Supabase payment insert error:", paymentError);

            return res.status(500).json({
                message: paymentError.message,
            });
        }

        return res.status(200).json({
            order,
            paymentRecord,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("Create order error:", error);

        return res.status(500).json({
            message: error.message || "Could not create payment order.",
        });
    }
});
router.post("/verify-payment", async (req, res) => {
    try {
        const {
            userId,
            mentorId,
            mentorName,
            planName,
            amount,
            paymentRecordId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        if (
            !userId ||
            !paymentRecordId ||
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                message: "Missing payment verification details.",
            });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        const isValid = generatedSignature === razorpay_signature;

        if (!isValid) {
            await supabaseAdmin
                .from("payments")
                .update({
                    status: "failed",
                    razorpay_payment_id,
                    razorpay_signature,
                })
                .eq("id", paymentRecordId);

            return res.status(400).json({
                success: false,
                message: "Payment signature verification failed.",
            });
        }

        const { data: updatedPayment, error: updateError } = await supabaseAdmin
            .from("payments")
            .update({
                status: "paid",
                razorpay_payment_id,
                razorpay_signature,
            })
            .eq("id", paymentRecordId)
            .select("*")
            .single();

        if (updateError) {
            return res.status(500).json({
                message: updateError.message,
            });
        }

        const { data: booking, error: bookingError } = await supabaseAdmin
            .from("mentor_bookings")
            .insert({
                user_id: userId,
                mentor_id: mentorId,
                mentor_name: mentorName,
                plan_name: planName,
                amount: Number(amount) * 100,
                payment_id: updatedPayment.id,
                status: "confirmed",
            })
            .select("*")
            .single();

        if (bookingError) {
            return res.status(500).json({
                message: bookingError.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully.",
            payment: updatedPayment,
            booking,
        });
    } catch (error) {
        console.error("Verify payment error:", error);

        return res.status(500).json({
            message: "Payment verification failed.",
        });
    }
});

export default router;