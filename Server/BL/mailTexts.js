"use strict";

var mailTexts = function () {

  var mailObject = {};

  //  mailObject.date='';
  var date

  mailObject.mailDecision = function (dbInfo) {
    var details = dbInfo[0][0];
    var firstName = details.studentName.split(" ");

    var text = "<div>" + details.TodayDate + "</div>";
    text += "<div style='direction:rtl;'><div> לכבוד</div>";
    text += "<div>" + details.studentName + "</div>";
    text += "<div>העתק: " + details.consultantName + ", " + details.college + "</div>";
    text += "<br/>";
    text += "<div>" + firstName[0] + " שלום," + "</div>";
    text += "<br/>";
    text += "<div>הנדון: <span style='font-weight: BOLD;text-decoration: underline;'> בקשה למלגה מהקרן לעידוד תעסוקת ישראלים בתעשיות עתירות ידע<span></div>";
    text += "<br/>";
    text += "<div  style=' font-weight: NORMAL; text-decoration:none'>בעקבות בקשתך למלגת לימודים, שהוגשה לקרן בתאריך" +
      " " + details.RegistrationDate + ", אנו שמחים להודיעך" + "<span style='font-weight: BOLD;'> שבקשתך אושרה!</span>"
      + "</div>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>המלגה שהקרן מעניקה לך הינה בסך " + details.DecisionAmount + " ( " + dbInfo[1][0].LetterRes + " ) ₪ </div>";
    text += "<br/>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>מלגה זו מוענקת בכפוף לכלל התנאים המצטברים לקבלת המלגה ובכפוף לשימוש בה אך ורק בהתאם למוגדר בטופס הבקשה שהגשת לקרן.</div>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>אנו מאחלים לך בהצלחה בלימודים ומצפים לשמוע כי הצטרפת כעובד לתעשיות עתירות הידע בישראל.</div>";
    text += "<br/>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>להמשך טיפול ברישום ללימודים בבקשה פנה למכללה / מוסד הלימודים אליו נרשמת (המלגה מועברת ישירות למוסד הלימוד ובכפוף לסיכומים בין הקרן למוסד).  ניתן לנצל את המלגה בתוך 60 יום שאחריהם תוקפה פג.</div>";
    text += "<br/>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>בברכה,</div>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>" + dbInfo[2][0].FullName + "</div>";
    text += "<div style='font-weight: NORMAL; text-decoration:none'>יושב ראש הקרן לעידוד תעסוקת ישראלים בתעשיות עתירות ידע</div>";
    text += "<br/>";
    text += "<br/>";
    text += "<div style='font-weight: NORMAL; text-decoration:none'>סימוכין " + details.Simuchin + "</div></div>";
    return text;
  }

  mailObject.mailCancel = function (dbInfo) {
    var details = dbInfo[0][0];
    var firstName = details.studentName.split(" ");

    var text = "<div>" + details.TodayDate + "</div>";
    text += "<div style='direction:rtl;'><div> לכבוד</div>";
    text += "<div>" + details.studentName + "</div>";
    text += "<div>העתק: " + details.consultantName + ", " + details.college + "</div>";
    text += "<br/>";
    text += "<div>" + firstName[0] + " שלום," + "</div>";
    text += "<br/>";
    text += "<div>הנדון: <span style='font-weight: BOLD;text-decoration: underline;'> בקשה למלגה מהקרן לעידוד תעסוקת ישראלים בתעשיות עתירות ידע<span></div>";
    text += "<br/>";
    text += "<div  style=' font-weight: NORMAL; text-decoration:none'>בעקבות בקשתך למלגת לימודים, שהוגשה לקרן בתאריך" +
      " " + details.RegistrationDate + " , אנו מצטערים להודיעך " + "<span style='font-weight: BOLD;'> שבקשתך לא אושרה!</span> להלן עיקרי הדברים שהקרן מציינת לגבי דחיית בקשתך:"
      + "</div>";
    text += "<br/>"
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>" + details.DecisionReasons + "</div>";
    text += "<br/>";
    text += "<br/>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>להמשך טיפול ברישום ללימודים בבקשה פנה למכללה / מוסד הלימודים אליו נרשמת (הודעה נשלחה למוסד).  ניתן לערר על החלטה זו בתוך 15 יום דרך המכללה.</div>";
    text += "<br/>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>להמשך טיפול ברישום ללימודים בבקשה פנה למכללה / מוסד הלימודים אליו נרשמת (המלגה מועברת ישירות למוסד הלימוד ובכפוף לסיכומים בין הקרן למוסד).  ניתן לנצל את המלגה בתוך 60 יום שאחריהם תוקפה פג.</div>";
    text += "<br/>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>בברכה,</div>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>" + dbInfo[2][0].FullName + "</div>";
    text += "<div style='font-weight: NORMAL; text-decoration:none'>יושב ראש הקרן לעידוד תעסוקת ישראלים בתעשיות עתירות ידע</div>";
    text += "<br/>";
    text += "<br/>";
    text += "<div style='font-weight: NORMAL; text-decoration:none'>סימוכין " + details.Simuchin + "</div></div>";
    return text;
  }

  mailObject.missingDocuments = function (dbInfo) {
    var details = dbInfo[0][0];
    var firstName = details.studentName.split(" ");
    var DecisionReasons = details.DecisionReasons.replace(/\n/g, ' ');
    var text = "<div>" + details.TodayDate + "</div>";
    text += "<div style='direction:rtl;'>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>" + details.studentName + " שלום,</div>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>בעקבות פנייתך לקבלת מלגת לימודים ללימודים ב" + details.college + " בחנה הועדה להענקת מלגות את בקשתך.  </div>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>לצערנו מצאנו שלא כל המסמכים הנדרשים הוגשו (או הוגשו מסמכים לא מתאימים). נבקשך להשלים החסר ולהגיש מחדש את הבקשה Online. <div>";
    text += "<br/><br/>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>להלן הערות הועדה:</div>";
    text += "<div style=' font-weight: NORMAL; text-decoration:none'>"+ DecisionReasons +"</div>";
    text += "<br/><br/>";
    text += "<div style='font-weight: NORMAL; text-decoration:none'>יושב ראש הקרן לעידוד תעסוקת ישראלים בתעשיות עתירות ידע</div>";
    text += "<br/>";
    text += "<br/>";
    text += "<div style='font-weight: NORMAL; text-decoration:none'>סימוכין " + details.Simuchin + "</div></div>";
    return text;
  }


  //////////////להוסיף לינק להשלמת המסמכים
  return mailObject;
}

module.exports = mailTexts;
