var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
require("dotenv").config();

//add here the routes
var indexRouter = require("./routes/index");
var destinationsRouter = require("./routes/destinations");
var reviewRouter = require("./routes/reviews");
var categoryRouter = require("./routes/category");
var searchRouter = require("./routes/search");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/destinations", destinationsRouter);
app.use("/reviews", reviewRouter);
app.use("/category", categoryRouter);
app.use("/search", searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(process.env.SERVER_PORT || 8000, () => {
  console.log('Server Started PORT ==> ', process.env.SERVER_PORT);

});
// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
