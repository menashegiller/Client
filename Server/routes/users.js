var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var userController = new require('../controllers/userController')();
var docxConverter = require('docx-pdf');

var jwt = require('express-jwt');
var unless = require('express-unless');

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    delimiter = file.originalname.indexOf(".");
    type = file.originalname.slice(delimiter);
    name = file.originalname.slice( 0 , delimiter);
    cb(null, name + '-' + Date.now() + type);
  }
});

var upload = multer({ storage: storage,
                    limits: { fileSize: 2024000 }
                      });


// var jwtCheck = jwt({
//     secret: config.secret
// });
// jwtCheck.unless = unless;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// router.use(jwtCheck.unless({path: '/users/authenticate' }));
router.use(jwt({ secret: config.secret}).unless({
          path: [
                '/users/authenticate',
                '/users/loginWithSmsOrEmailCode',
                '/users/register',
                '/users/sendCodeServerSide'
                ]       
            }
));


// Add headers
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

// Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,Access-Control-Allow-Credentials,Access-Control-Allow-Methods,Access-Control-Allow-Headers, Authorization,Origin, X-Requested-With, Content-Type, token, phonenumber, ssoid, Accept');
    

    // Pass to next layer of middleware
    next();
});


/* GET users listing. */
router.get('/', userController.get);

router.post('/', userController.post);

router.post('/authenticate', userController.authenticate);

router.post('/sendCodeServerSide', userController.sendCode);

router.post('/postEmailtoEmployee', userController.postEmailtoEmployee);

router.post('/loginWithSmsOrEmailCode', userController.loginWithSmsOrEmailCode);

router.post('/register', userController.register);

router.post('/SaveNewPassword', userController.SaveNewPassword);

router.post('/GetUser', userController.GetUser);

router.post('/GetAllUsers', userController.GetAllUsers);

router.post('/saveForm', userController.InsertStudentForm);

router.post('/getColleges', userController.GetColleges);

router.post('/getEmployees', userController.GetEmployees);

router.post('/closeForChanges', userController.CloseForChanges);

router.post('/getCode', userController.getCode);

router.post('/upload', 
      upload.array("uploads", 12), function(req, res) {
       // docxConverter('./public/uploads/input.docx','./public/uploadsPDF/output.pdf',function(err,result){
        /*  if(err){
           console.log(err);
            return res.end("Error uploading file.");
          }*/
        res.send(req.files);
});


router.post('/saveEmployee', userController.SaveEmployee);

router.post('/getCertifications', userController.GetCertifications);

router.post('/getRoles', userController.GetRoles);

router.post('/sendDecision', userController.sendDecision);


// router.post('/upload', userController.Upload);

module.exports = router;
