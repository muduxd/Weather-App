const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

//! MIDDLEWARE

app.set("view engine", "hbs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

//! ROUTES

app.get("/", (request, response) => response.render("main"));

app.get("/weather", async (request, response) => {
  if (!request.query.address) return response.send({ error: "Please provide an address!" });

  try {
    const { latitude, longitude, location } = await geocode(request.query.address);
    const weather = await forecast({ latitude, longitude });

    return response.send({ weather, location });
  } catch (error) {
    return response.send({ error: "Unable to find location" });
  }
});

app.get("*", (request, response) => response.render("404"));

//! LISTENING

app.listen(PORT);
