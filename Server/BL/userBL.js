"use strict";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const https = require('https');
const http = require('http');
const qs = require('querystring');
const fs = require('fs');

var request = require('request');
var sql = require('mssql');
var config = require('../config');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var bodyParser = require('body-parser');
var superSecret = config.secret;
var parseString = require('xml2js').parseString;
var iconv = require('iconv-lite');

var MailData = new require('../Classes/MailData')();

var mailTexts = new require('../BL/mailTexts')();

var jwtDecode = require('jwt-decode');

var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$dfgert%$w0rD';
const someOtherPlaintextPassword = 'not_bsdfw4534n';

var userBL = function () {

    var userObject = {};

    userObject.GetData = function (req, callback) {

        var connection = new sql.Connection(DBConnectionString, function (err) {
            console.log(req.email);
            var request = new sql.Request(connection);
            request
                .input('Email', sql.NChar, req.email)
                // .input('Password', sql.NChar, req.pass)
                .execute('IfUser')
                .then(function (recordset) {
                    callback(recordset);
                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }

    userObject.sqlSaveCode = function (req, code, callback) {

        var connection = new sql.Connection(DBConnectionString, function (err) {

            var request = new sql.Request(connection);
            request
                .input('number', sql.NChar, req.contactInfo)
                .input('Code', sql.NChar, code)
                .input('SmsOrEmail', sql.NChar, req.EmailOrSms)
                .execute('SaveCodeForEmailOrSms')
                .then(
                function (recordset) {
                    callback(recordset);

                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }

    userObject.firstRegister = function (req, code, callback) {

        var connection = new sql.Connection(DBConnectionString, function (err) {

            var request = new sql.Request(connection);
            request
                .input('emailadress', sql.NChar, req.emailadress)
                .input('IdentityId', sql.NChar, req.IdentityId)
                .input('Role', sql.Int, 8)
                .input('Code', sql.NChar, code)
                .execute('FirstStudentRegister')
                .then(
                function (recordset) {
                    callback(recordset);


                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }



    userObject.forgotEmail = function (req, code, callback) {

        var connection = new sql.Connection(DBConnectionString, function (err) {

            var request = new sql.Request(connection);
            request
                .input('emailadress', sql.NChar, req.emailadress)
                .input('Code', sql.NChar, code)
                .execute('OneTimeCodeForEmail')
                .then(
                function (recordset) {
                    callback(recordset);


                }).catch(function (err) {
                    callback(false);
                });
        });
    }

    userObject.sqlloginWithSmsOrEmailCode = function (req, callback) {
        // var decoded = jwt.verify(req.token, superSecret);
        // console.log('decoded' + decoded);
        var connection = new sql.Connection(DBConnectionString, function (err) {
            //console.log(req.email);
            var request = new sql.Request(connection);
            request
                .input('Person_Id', sql.Int, req.pid)
                .input('code', sql.NChar, req.Code)
                .input('SmsOrEmail', sql.NChar, req.SmsOrEmail)
                .execute('loginWithEmailOrSms')
                .then(
                function (recordset) {
                    callback(recordset);
                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }

    userObject.sqlSaveNewPassword = function (req, callback) {
        //  var decoded = jwt.verify(req.token, superSecret);
        // bcrypt.genSalt(saltRounds, function (err, salt) {
        //     bcrypt.hash(req.passWord, salt, function (err, hash) {
            var salt = bcrypt.genSaltSync(saltRounds);
            var hash = bcrypt.hashSync(req.passWord, salt);
                var connection = new sql.Connection(DBConnectionString, function (err) {


                    var request = new sql.Request(connection);
                    request
                        .input('PID', sql.NChar, req.pid)
                        .input('NewPassword', sql.NChar, hash)
                        .execute('SaveNewPassword')
                        .then(
                        function (recordset) {
                            callback(recordset);
                        }).catch(function (err) {
                            callback(false); // "The username or password don't match");
                        });
                });
        //     });
        // });
    }

    userObject.CloseForChanges = function (req, callback) {

        var connection = new sql.Connection(DBConnectionString, function (err) {

            var request = new sql.Request(connection);
            request
                .input('pid', sql.NChar, req.pid)
                .execute('CloseForChanges')
                .then(
                function (recordset) {
                    callback(recordset);

                }).catch(function (err) {
                    callback(false);
                });
        });
    }

    userObject.sqlInsertStudentForm = function (req, callback) {

        // var obj = json.parse(req.obj)
        var connection = new sql.Connection(DBConnectionString, function (err) {
            //console.log(req.email);
            var request = new sql.Request(connection);
            request
                .input('pid', sql.NVarChar, req.pid)
                .input('FullName', sql.NVarChar, req.FullName)
                .input('College', sql.NVarChar, req.College)
                .input('Mobile', sql.NVarChar, req.Mobile)
                .input('BirthDate', sql.DateTime2, req.BirthDate)
                .input('FamalyStatus', sql.NVarChar, req.FamalyStatus)
                .input('BirthState', sql.NVarChar, req.BirthState)
                .input('AliyaYear', sql.Int, req.AliyaYear)
                .input('Adress', sql.NVarChar, req.Adress)
                .input('Volunteer', sql.NVarChar, req.Volunteer)
                .input('Bagrut_doc', sql.NVarChar, req.Bagrut_doc)
                .input('Toar_doc', sql.NVarChar, req.Toar_doc)
                .input('Shihrur_doc', sql.NVarChar, req.Shihrur_doc)
                .input('CV_doc', sql.NVarChar, req.CV_doc)
                .input('TZ_doc', sql.NVarChar, req.TZ_doc)
                .input('IshurKabala_doc', sql.NVarChar, req.IshurKabala_doc)
                .input('Hamlaca_doc', sql.NVarChar, req.Hamlaca_doc)
                .input('Bank_doc', sql.NVarChar, req.Bank_doc)
                .input('WhyScholarship', sql.NVarChar, req.WhyScholarship)
                .input('WhyProfession', sql.NVarChar, req.WhyProfession)
                .input('SpecialSituations', sql.NVarChar, req.SpecialSituations)
                .input('PersonalNumber', sql.NVarChar, req.PersonalNumber)
                .input('Fighter', sql.Int, req.Fighter)
                .input('TypeOfService', sql.Int, req.TypeOfService)
                .input('HaveFlat', sql.Int, req.HaveFlat)
                .input('HaveCar', sql.Int, req.HaveCar)
                .input('HaveWork', sql.Int, req.HaveWork)
                .input('LearningSrats', sql.DateTime2, req.LearningSrats)
                .input('LearningFinish', sql.DateTime2, req.LearningFinish)
                .input('ArmyDate', sql.DateTime2, req.ArmyDate)
                .input('SignatureDate', sql.DateTime2, req.SignatureDate)
                .input('ShihrurDate', sql.DateTime2, req.ShihrurDate)
                .input('Work', sql.Int, req.Work)
                .input('Parents', sql.Int, req.Parents)
                .input('Loan', sql.Int, req.Loan)
                .input('SignatureName', sql.NVarChar, req.SignatureName)
                .input('SallaryAvg', sql.NVarChar, req.SallaryAvg)
                .input('SallaryAvg24', sql.NVarChar, req.SallaryAvg24)
                .input('WorkPlace', sql.NVarChar, req.WorkPlace)
                .input('WorkPlace24', sql.NVarChar, req.WorkPlace24)
                .input('LoanPlace', sql.NVarChar, req.LoanPlace)
                .input('LoanAvg', sql.NVarChar, req.LoanAvg)
                .input('Employee_Id', sql.Int, req.Employee_Id)
                .input('OtherText', sql.NVarChar, req.OtherText)
                .input('Other', sql.Int, req.Other)
                .input('ArmyDegree', sql.NVarChar, req.ArmyDegree)
                .input('ArmyRole', sql.NVarChar, req.ArmyRole)
                .input('ReasonForExemption', sql.NVarChar, req.ReasonForExemption)
                .input('Certification_Id', sql.Int, req.Certification_Id)
                .input('TuitionFees', sql.NVarChar, req.TuitionFees)
                .input('NotServe', sql.Int, req.NotServe)
                .execute('InsertStudentForm')
                .then(
                function (recordset) {
                    callback(recordset);

                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }
    userObject.sqlGetColleges = function (req, callback) {
        //  var decoded = jwt.verify(req.token, superSecret);
        var connection = new sql.Connection(DBConnectionString, function (err) {
            //console.log(req.email);
            var request = new sql.Request(connection);
            request
                // .input('Pid', sql.NChar, decoded)
                .input('IsCollege', sql.Int, req.isCollege)
                .execute('GetColleges')
                .then(
                function (recordset) {
                    callback(recordset);
                    // console.log('length:'+ recordset.lenth);
                    //   console.log("recordset: "+recordset);

                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }


    userObject.sqlGetEmployees = function (req, callback) {
        // var decoded = jwt.verify(req.token, superSecret);
        var connection = new sql.Connection(DBConnectionString, function (err) {
            //console.log(req.email);
            var request = new sql.Request(connection);
            request
                .input('Role', sql.NChar, req.Role)
                .input('College', sql.NChar, req.College)
                .execute('GetEmployees')
                .then(
                function (recordset) {
                    callback(recordset);
                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }

    userObject.sqlSaveEmployee = function (req, callback) {
        // var decoded = jwt.verify(req.token, superSecret);
        var connection = new sql.Connection(DBConnectionString, function (err) {
            //console.log(req.email);
            var request = new sql.Request(connection);
            request
                .input('Person_id', sql.Int, req.Person_id)
                .input('FullName', sql.NChar, req.FullName)
                .input('Email', sql.NChar, req.Email)
                .input('Role', sql.Int, req.Role)
                .input('College', sql.Int, req.College)
                .input('Mobile', sql.NChar, req.Mobile)
                .input('Password', sql.NChar, req.Password)
                .execute('SaveEmployee')
                .then(
                function (recordset) {
                    callback(recordset);
                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }

    userObject.sqlGetRoles = function (req, callback) {
        // var decoded = jwt.verify(req.token, superSecret);
        var connection = new sql.Connection(DBConnectionString, function (err) {
            //console.log(req.email);
            var request = new sql.Request(connection);
            request
                /* .input('Role', sql.NChar, req.Role)
                 .input('College', sql.NChar, req.College)*/
                .execute('GetRoles')
                .then(
                function (recordset) {
                    callback(recordset);
                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }


    userObject.sqlGetCertifications = function (req, callback) {
        // var decoded = jwt.verify(req.token, superSecret);
        var connection = new sql.Connection(DBConnectionString, function (err) {
            //console.log(req.email);
            var request = new sql.Request(connection);
            request
                .input('College', sql.NChar, req.College)
                .execute('GetCertifications')
                .then(
                function (recordset) {
                    callback(recordset);
                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }

    userObject.sqlGetPerson = function (req, callback) {

        var connection = new sql.Connection(DBConnectionString, function (err) {
            //console.log(req.email);
            var request = new sql.Request(connection);
            request
                .input('Pid', sql.Int, req.pid)
                //   .input('IdentityId', sql.NChar, req.IdentityId)
                .execute('GetPersonbyId')
                .then(
                function (recordset) {
                    callback(recordset);
                    // console.log('length:'+ recordset.lenth);
                    //   console.log("recordset: "+recordset);

                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }
    userObject.sqlGetAllPersons = function (req, callback) {
        //   var decoded = jwt.verify(req.token, superSecret);
        var connection = new sql.Connection(DBConnectionString, function (err) {
            //console.log(req.email);
            var request = new sql.Request(connection);
            request
                .input('id', sql.Int, req.id)
                .input('page', sql.NChar, req.page)
                .execute('GetAllPersons')
                .then(
                function (recordset) {
                    callback(recordset);
                    // console.log('length:'+ recordset.lenth);
                    //   console.log("recordset: "+recordset);

                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }

    userObject.sendDecision = function (req, callback) {
        //   var decoded = jwt.verify(req.token, superSecret);
        var connection = new sql.Connection(DBConnectionString, function (err) {
            //console.log(req.email);
            var request = new sql.Request(connection);
            request
                .input('Person_id', sql.Int, req.Person_id)
                .input('FormStatus', sql.Int, req.FormStatus)
                .input('DecisionAmount', sql.NVarChar, req.DecisionAmount)
                .input('DecisionReasons', sql.NVarChar, req.DecisionReasons)
                .execute('sendDecision')
                .then(
                function (recordset) {
                    callback(recordset);
                    // console.log('length:'+ recordset.lenth);
                    //   console.log("recordset: "+recordset);

                }).catch(function (err) {
                    callback(false); // "The username or password don't match");
                });
        });
    }



    userObject.GetCode = function (number) {
        var input = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoupqrstuvwxyz0123456789";
        var StringBuilder = require("string-builder");
        var builder = new StringBuilder();
        var ch;
        for (var i = 0; i < number; i++) {
            ch = input[this.randomInt(0, input.length)];
            builder.append(ch);
        }
        return builder;
    }

    userObject.randomInt = function (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    userObject.sendSmsToUser = function (OneTimeCode, phone) {
        var pathString = 'https://api.b-sms.co.il/SendMessageXml.ashx?InforuXML=%3CInforu%3E%3CUser%3E%3CUsername%3Eavidruker%3C/Username%3E%3CPassword%3Ekarin617%3C/Password%3E%3C/User%3E%3CContent%20Type=%22sms%22%3E%3CMessage%3ECodeSms%3C/Message%3E%3C/Content%3E%3CRecipients%3E%3CPhoneNumber%3EUserNumber%3C/PhoneNumber%3E%3C/Recipients%3E%3CSettings%3E%3CSenderNumber%3E036176666%3C/SenderNumber%3E%3C/Settings%3E%3C/Inforu%3E';
        // OneTimeCode = iconv.decode(new Buffer("חלילחיל"), "utf8");
        pathString = pathString.replace('UserNumber', phone); // req.body.Mobile);
        pathString = pathString.replace('CodeSms', OneTimeCode);

        https.get(pathString, function (res) {
            console.log('dsfds');
            //res

        });
    }

    userObject.GetSynchronousJSONResponse = function (url, postData) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", url, false);
        xmlHttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xmlHttp.send(postData);
        var responseText = xmlHttp.responseText;

        return responseText;
    }

    userObject.JsonStringForArray = function (arr) {
        var obj = '[';

        for (var i = 0; i < arr.length; i++) {
            obj += '"' + arr[i] + '",';
        }
        if (obj == '[') {
            obj = null;
        }
        else {
            obj = obj.substr(0, obj.length - 1);
            obj += ']';
        }

        return obj;
    }

    userObject.SendMail = function (postData) {
        var host = "http://legacy17.sela.co.il";

        var to = this.JsonStringForArray(postData.To);
        var cc = this.JsonStringForArray(postData.CC);
        var bcc = this.JsonStringForArray(postData.BCC);

        var jsonPostData = '{mailData: { Url: "' + postData.Url +
            '", From: "' + postData.From +
            '", Subject: "' + postData.Subject +
            '", Body: "' + postData.Body +
            '", To: ' + to +
            ', CC: ' + cc +
            ', BCC: ' + bcc +
            ', IsBodyHtml: ' + postData.IsBodyHtml +
            '  }}';

        var result = eval('(' + jsonPostData + ')');

        return this.GetSynchronousJSONResponse(host + "/MailService/MailService.asmx/SendMail", jsonPostData);

    }

    userObject.Send = function (post, code) {
        var postData = MailData;
        // postData.From = email;
        postData.Body = '<div dir=rtl align=right>שלום, הסיסמה הזמנית שלך :' + code + '<div>';
        postData.IsBodyHtml = true;
        postData.To[0] = post.emailadress;
        postData.From = "sela@sela.co.il"


        this.SendMail(postData);
    }

     userObject.SendEmailToEmployee = function (post, code) {
        var postData = MailData;
        // postData.From = email;
        postData.Body = '<div dir=rtl align=right>שם המשתמש שלך: ' + post.emailadress + '<div>'+
        '<div dir=rtl align=right>שלום, הסיסמה הזמנית שלך :' + code + '<div>';
        postData.IsBodyHtml = true;
        postData.To[0] = post.emailadress;
        postData.From = "sela@sela.co.il"
        postData.Subject = "סיסמה חדשה";

        this.SendMail(postData);
    }

    userObject.SendMailDecision = function (dbInfo) {
        var postData = MailData;
        // postData.From = email;
        if (dbInfo[0][0].FormStatus == 3) {
            postData.Body = mailTexts.mailDecision(dbInfo);
        } else if (dbInfo[0][0].FormStatus == 4) {
            postData.Body = mailTexts.mailCancel(dbInfo);
        }

        postData.IsBodyHtml = true;
        postData.To[0] = dbInfo[0][0].StudentEmail;
        postData.CC[0] = dbInfo[0][0].ConsultantEmail;
        postData.BCC[0] = dbInfo[3][0].Email;

        postData.From = "sela@sela.co.il"


        this.SendMail(postData);
    }

    return userObject;
}

module.exports = userBL;