import { Dateclass } from './dateClass';
export class FilterReportModel {
    LearningSrats: Dateclass = null;
    LearningFinish: Dateclass = null;
    RegistrationDate: Dateclass = null;
    FullName: string = '';
    CollegeName: string = '';
    CertificationName: string = '';
    TuitionFees: string = '';
    FormStatus: string = '';
    Decision: string = '';
    DecisionDate:  Dateclass = null;

   
}

export class MainReportModel {
    list: FilterReportModel[];
}