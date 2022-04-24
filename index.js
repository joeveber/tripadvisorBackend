require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

/* MAILGUN CONFIGURATION */
const api_key = process.env.MAILGUN_API_KEY; /* VOTRE CLÉ API */
const domain = process.env.MAILGUN_DOMAIN; /* VOTRE DOMAINE SANDBOX */
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const app = express();
app.use(cors());
app.use(formidable());

app.get("/", (req,res) => {
    res.send("Server is up!");
});

app.post("/", (req,res) => {
    const {firstname, lastname, email, message} = req.fields;
///
const data = {
    from: `${firstname} ${lastname} <${email}>`,
    to: "joe.veber@gmail.com",
    subject: "Formulaire JS",
    text: message,
  };
  console.log(data);

  //   Fonctions fournies par le package mailgun pour créer le mail et l'envoyer :
  mailgun.messages().send(data, (error, body) => {
    if (!error) {
      // s'il n'y a pas eu d'erreur lors de l'envoi du mail, on envoie la réponse suivante au frontend :
      res.json(body);
      console.log("paf");
    } else {
      // s'il y a eu une erreur lors de l'envoi du mail, on envoie la réponse suivante au frontend :

      res.json(error);
    }
  });
///
});

app.listen(process.env.PORT, () => {
    console.log("Server started");
});