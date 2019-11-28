module.exports = function(app){
    [
        "images",
    ].forEach(route => {
        app.use(`/${route}`, require(`./routes/${route}`)(app));
    });

    return app;
}

