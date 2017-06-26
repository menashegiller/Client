"use strict";

var mailTexts = function () {

    var mailObject = {};

  //  mailObject.date='';
  var date 

    mailObject.mailDecision   = function (dbInfo){ 
       return  "<div  style='direction:rtl'>בעקבות בקשתך למלגת לימודים, שהוגשה לקרן בתאריך"+
        " " + dbInfo.RegistrationDate + ", אנו שמחים להודיעך" + "<span style='font-weight: BOLD;'>שבקשתך אושרה<span>"
             + "</div>";
    }

    return mailObject;
}

module.exports = mailTexts;
