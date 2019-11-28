require("dotenv").load();

module.exports = [
    "./middleware",
    "./router",
    "./error-handling"
].reduce((app, component) => require(component)(app), require("express")());
