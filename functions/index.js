const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const express= require("express");
const cors=require("cors");
const data=require("./data.js")
const stripe= require("stripe")(data);

const app=express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (req, res)=>{
  res.status(200).send("Hello world");
});

app.post("/payments/create", async (req, res)=>{
  const total= req.query.total;
  console.log("Payment request"+ total);

  const paymentIntent= await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,

  });
});
exports.api= onRequest(app);
