import { Docsmodel } from './docsmodel';
import { Dateclass } from './dateClass';


export const enum ROLE{
    SUPER_USER=1,
    FUND_CHAIRMAN,
    FUND_PRINCIPAL,
    COLLEGE_PRINCIPAL,
    COLLEGE_DIRECTOR,
    CONSULTANT,
    FINANCE_DIRECTOR,
    STUDENT
}

export class User {
    Email: string= '';
    passWord: string= '';
    UserId: string= '';
    FullName: string= '';
   // Last_Name: string= '';
    Mobile: string= '';
    BirthDate: Date;
    FamalyStatus: string= '';
    BirthState: string= '';
    AliyaYear: string= '';
    Adress: string= '';
    Volunteer: string= '';
    token: string= '';
    College: number = 0;
    Bagrut_doc:   string= ''; //string= 'קובץ לא צורף';
    Toar_doc:     string= '';
    Shihrur_doc:    string= '';
    CV_doc:         string= '';
    TZ_doc:         string= '';
    IshurKabala_doc:string= '';
    Hamlaca_doc:    string= '';
    Bank_doc:       string= '';
    WhyScholarship:  string= ''; 
    WhyProfession:  string= '';
    SpecialSituations:  string= '';
    PersonalNumber:string= '';
    Fighter:number;
    TypeOfService: number = 0;
    HaveFlat: number = 0;
    HaveWork: number = 0;
    HaveCar: number = 0;
    LearningSrats: Date;
    LearningFinish: Date;
    ArmyDate: Date;
    SignatureDate: Date;
    ShihrurDate: Date;
    Work:number;
    Parents:number;
    Loan:number;
    SignatureName: string= '';
    SallaryAvg: string= '';
    SallaryAvg24: string= '';
    WorkPlace: string= '';
    WorkPlace24: string= '';
    Employee_Id: number;
    LoanAvg: string= '';
    LoanPlace: string= '';
    OtherText: string= '';
    Other: number;
    ReasonForExemption: string= '';
    ArmyDegree: string= '';
    ArmyRole: string= '';
    Certification_Id: number=0;
    TuitionFees: string = '';
    RegistrationDate: Date;
    CollegeName: string = '';
    CertificationName: string = '';
    FormStatus: string = '';
    DecisionAmount: string = null;
    DecisionDate: Date;
    NotServe: number;
    RegistrationDayString: string;
    LearningStartString: string;
    LearningFinishString: string;
    DecisionDateString: string;
    wasSaved: boolean = false;
    BirthDateClass: Dateclass = null; 
    LearningSratsClass: Dateclass = null; 
    LearningFinishClass: Dateclass = null; 
    ArmyDateClass: Dateclass = null; 
    SignatureDateClass: Dateclass = null; 
    ShihrurDateClass:  Dateclass = null; 
    constructor() {
       /* this.Email = e;
        this.passWord = p;
        this.UserId = U;
        this.First_Name = '';*/
     };
}
