/* Minimal wrapper around AWS SDK for JavaScript to interact with Cloudflare R2 storage. */

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET;
const R2_ENDPOINT = process.env.R2_ENDPOINT;

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

async function getR2Client() {
  return new S3Client({
    region: "auto",
    endpoint: R2_ENDPOINT,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

async function uploadFile(fileBuffer, fileName) {
  const s3Client = await getR2Client();
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: fileName,
    Body: fileBuffer,
  });
  return await s3Client.send(command);
}

async function getFile(fileName) {
  const s3Client = await getR2Client();
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET,
    Key: fileName,
  });
  return await s3Client.send(command);
}

async function deleteFile(fileName) {
  const s3Client = await getR2Client();
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET,
    Key: fileName,
  });
  return await s3Client.send(command);
}

module.exports = {
  getR2Client,
  uploadFile,
  getFile,
  deleteFile,
};
