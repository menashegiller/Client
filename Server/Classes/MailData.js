"use strict";
var MailData = function () {//new Object();
    var MailDataObj = {};

    MailDataObj.Url = '';
    MailDataObj.From = '';
    MailDataObj.Subject = '';
    MailDataObj.Body = '';
    MailDataObj.IsBodyHtml = false;
    MailDataObj.To = new Array();
    MailDataObj.CC = new Array();
    MailDataObj.BCC = new Array();
   
    return MailDataObj;
}

module.exports = MailData;