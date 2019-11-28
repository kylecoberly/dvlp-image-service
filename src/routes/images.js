const express = require("express");
const router = express.Router();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
    apiVersion: "2006-03-01",
    region: process.env.S3_BUCKET_REGION,
    credentials: {
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        accessKeyId: process.env.S3_ACCESS_KEY_ID
    }
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (request, file, next) => {
            next(null, `${Date.now()}_${file.originalname}`);
        }
    })
});

module.exports = (app) => {
    router.post("/", upload.single("file"), (request, response, next) => {
        try {
            response.status(200).json({
                imageUrl: request.file.location
            });
        } catch(error){next(error);}
    });

    return router;
};

