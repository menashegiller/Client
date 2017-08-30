"use strict";
const https = require('https');
const http = require('http');
const qs = require('querystring');
const fs = require('fs');
var express = require('express');
var request = require('request');
var sql = require('mssql');
var config = require('../config');

var cors = require('cors');
var bodyParser = require('body-parser');
var superSecret = config.secret;
var parseString = require('xml2js').parseString;

var multer = require("multer");
var bodyParser = require("body-parser");
var jwt = require('express-jwt');
var jsonwebtoken = require("jsonwebtoken");

var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$dfgert%$w0rD';
const someOtherPlaintextPassword = 'not_bsdfw4534n';

/*var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})*/

/*var upload = multer({ storage: storage })*/

var userBL = new require('../BL/userBL')();

var userController = function (user) {

    var userObj = {};

    userObj.get = function (req, res, next) {
        console.log("userObj res");
        res.send('respond with a resource');
    }

    userObj.post = function (req, res, next) {
        console.log("userObj res");
        res.send('respond with a resource');
    }

    userObj.register = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            console.log("register");
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var Code = userBL.GetCode(6);

            userBL.firstRegister(post, Code, function (recordset) {
                if (recordset[0][0].ID > 0) {
                    var resSending = userBL.SendEmailToStudent(post, Code, 1);
                    res.json({
                        success: true,
                        pid: recordset[0][0].ID
                    });
                }
                else {
                    //res.send(false);
                    res.json({
                        success: false
                    });
                }
            })


            //    res.send("hello");
        });
    }

    userObj.CloseForChanges = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            console.log("CloseForChanges");
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);


            userBL.CloseForChanges(post, function (recordset) {
                if (recordset[0][0]) {

                    userBL.SendMailAfterCloseForChanges(post)

                    res.json({
                        
                        success: true
                    });
                }
                else {
                    //res.send(false);
                    res.status(500).send('User not fount');
                }
            })


            //    res.send("hello");
        });
    }


    userObj.postEmailtoEmployee = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // console.log("emailSending");
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            //    var code = userBL.GetCode(6);
            var post = qs.parse(body);
            //  var Code = userBL.GetCode(6);

            var res1 = userBL.SendEmailToEmployee(post);
            if (res1) {
                res.send(true);
            }

            //    res.send("hello");
        });
    }




    userObj.sendCode = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            console.log("sendCode");
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var Code = userBL.GetCode(6);

            userBL.sqlSaveCode(post, Code, function (recordset) {
                var pid = recordset[0][0].Pid;
                if (pid > 0) {
                    if (post.EmailOrSms == 'Mobile') {
                        userBL.sendSmsToUser(Code, post.contactInfo);
                    } else {
                        post.emailadress = post.contactInfo;
                        userBL.SendEmailToStudent(post, Code, 0);
                    }


                    // var token = jwt.sign(pid, superSecret );//, { expiresIn : 60*60*24});
                    //        var decoded = jwtDecode(req.token);
                    // var token = jwt.sign(pid, superSecret);
                    /*, {
                        expiresIn: 1440 // expires in 24 hours
                    });*/


                    res.json({
                        success: true,
                        Person_id: pid

                    });
                } else {
                    //res.send(false);
                    res.json({
                        success: false
                    });
                }
            })
        });
    }

    userObj.getCode = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var Code = userBL.GetCode(6);
            res.json({

                Code: Code

            });
        });
    }



    userObj.GetColleges = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sqlGetColleges(post, function (recordset) {
                // if (recordset[0][0].Email != '') {

                //  var token = jwt.sign(post.phoneNumber, superSecret);//, { expiresIn : 60*60*24});
                res.json({
                    success: true,
                    //  email: recordset[0][0].Email,
                    Colleges: recordset[0]
                });
                /*     }
                     else {
                         //res.send(false);
                         res.json({
                             success: false
                         });
                     }*/
            })
        });
    }

    userObj.GetRoles = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sqlGetRoles(post, function (recordset) {
                // if (recordset[0][0].Email != '') {

                //  var token = jwt.sign(post.phoneNumber, superSecret);//, { expiresIn : 60*60*24});
                res.json({
                    success: true,
                    //  email: recordset[0][0].Email,
                    Roles: recordset[0]
                });
            })
        });
    }

    userObj.SaveEmployee = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sqlSaveEmployee(post, function (recordset) {
                // if (recordset[0][0].Email != '') {


                res.json({
                    success: true,
                    emp: recordset[0][0]

                });
            })
        });
    }

    userObj.saveAndSendEmailtoNewEmployee = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sqlSaveEmployee(post, function (recordset) {
                // if (recordset[0][0].Email != '') {

                var res1 = userBL.SendEmailToNewEmployee(post);
                    
                    if(res1){
                        res.json({
                            success: true
                        });
                      
                    }
               
            })

        });
    }

    userObj.GetEmployees = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sqlGetEmployees(post, function (recordset) {

                res.json({
                    success: true,
                    Employees: recordset[0]
                });

            })
        });
    }
    userObj.GetCertifications = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sqlGetCertifications(post, function (recordset) {

                res.json({
                    success: true,
                    Certifications: recordset[0]
                });

            })
        });
    }

    userObj.loginWithSmsOrEmailCode = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sqlloginWithSmsOrEmailCode(post, function (recordset) {
                if (!recordset[0][0].isError) {
                    var token = jsonwebtoken.sign({ email: recordset[0][0].Email, pid: recordset[0][0].Person_id }, superSecret);
                    //         var token = jwt.sign(post.phoneNumber, superSecret);//, { expiresIn : 60*60*24});
                    res.json({
                        success: true,
                        obj: recordset[0][0],
                        token: token
                    });
                }
                else {
                    //res.send(false);
                    res.status(500).send('User not fount');
                }
            })
        });
    }

    userObj.authenticate = function (request, res1, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            console.log("authenticate");
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);


            userBL.GetData(post, function (recordset) {

                if (!recordset[0][0].isError) {
                    var hash = recordset[0][0].Password;
                    //bcrypt.compare(post.pass, hash).then( function ( res) {

                    if (bcrypt.compareSync(post.pass, hash)) {

                        var token = jsonwebtoken.sign({ email: recordset[0][0].Email, pid: recordset[0][0].Person_id }, superSecret);

                        res1.json({
                            success: true,
                            obj: recordset[0][0],
                            token: token
                        });
                    }
                    else {
                        res1.status(500).send('User not fount');
                    }
                }
                else {
                    res1.status(500).send('User not fount');
                }
            })
        });
    }

    userObj.SaveNewPassword = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sqlSaveNewPassword(post, function (recordset) {
                if (recordset[0][0].Email != '') {

                    //  var token = jwt.sign(post.phoneNumber, superSecret);//, { expiresIn : 60*60*24});
                    res.json({
                        success: true,
                        email: recordset[0][0]
                        //  token: token
                    });
                }
                else {
                    //res.send(false);
                    res.json({
                        success: false
                    });
                }
            })
        });
    }


    userObj.InsertStudentForm = function (request, res, next) {
        var body = '';
        var imagedata = '';

        request.on('data', function (data) {
            body += data;
            // imagedata += data.CV;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);


            userBL.sqlInsertStudentForm(post, function (recordset) {
                // if (recordset[0][0] != '') {

                //  var token = jwt.sign(post.phoneNumber, superSecret);//, { expiresIn : 60*60*24});
                res.json({
                    success: true,
                    // email: recordset[0][0].Email,

                });
                // }
                // else {
                //     //res.send(false);
                //     res.json({
                //         success: false
                //     });
                // }
            })
        });
    }
    userObj.GetUser = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sqlGetPerson(post, function (recordset) {
                if (recordset[0][0] != '') {

                    //  var token = jwt.sign(post.phoneNumber, superSecret);//, { expiresIn : 60*60*24});
                    res.json({
                        success: true,
                        user: recordset[0][0]
                    });
                }
                else {
                    //res.send(false);
                    res.json({
                        success: false
                    });
                }
            })
        });
    }

    userObj.GetAllUsers = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sqlGetAllPersons(post, function (recordset) {
                if (!recordset[0].isError) {//recordset[0][0].length > 0) {
                    if (recordset[0]) {
                        //  var token = jwt.sign(post.phoneNumber, superSecret);//, { expiresIn : 60*60*24});
                        res.json({
                            success: true,
                            users: recordset[0]
                        });
                    }
                    else
                        res.json({
                            success: true,
                            users: 0
                        })
                }
                else {
                    //res.send(false);
                    res.status(500).send('User not fount');
                }
            })
        });
    }

    userObj.sendDecision = function (request, res, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);

            userBL.sendDecision(post, function (recordset) {
                if (recordset) {//recordset[0][0].length > 0) {
                    userBL.SendMailDecision(recordset);
                    //  var token = jwt.sign(post.phoneNumber, superSecret);//, { expiresIn : 60*60*24});
                    res.json({
                        success: true,

                    });
                }
                else {
                    //res.send(false);
                    res.status(500).send('User not fount');
                }
            })
        });
    }

    return userObj;
}




module.exports = userController;

