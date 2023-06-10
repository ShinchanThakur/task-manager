const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const fileExtension = file.originalname.split('.').pop();
//         cb(null, 'avatar-' + uniqueSuffix + '.' + fileExtension); // Generate a unique filename for the uploaded image
//     }
// });

const limits = {
    fileSize: 1000000
    //~1 mb limit
};

const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
};

const upload = multer({ fileFilter, limits });

module.exports = upload;