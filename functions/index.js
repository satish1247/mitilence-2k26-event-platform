const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const cors = require("cors")({
    origin: [
        "https://mitilencera.online",
        "https://mtience-2k26.web.app"
    ]
});

exports.createRazorpayOrder = functions.region("asia-south1").https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            if (req.method !== "POST") {
                return res.status(405).send("Method Not Allowed");
            }

            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID || functions.config().razorpay?.key_id,
                key_secret: process.env.RAZORPAY_KEY_SECRET || functions.config().razorpay?.key_secret,
            });

            const { amount } = req.body;
            if (!amount || typeof amount !== "number") {
                return res.status(400).json({ error: "Invalid amount" });
            }

            const order = await razorpay.orders.create({
                amount: amount * 100,
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
            });

            res.status(200).json(order);
        } catch (error) {
            console.error("Order creation error:", error);
            res.status(500).json({ error: "Order creation failed", details: error.message });
        }
    });
});
