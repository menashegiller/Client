import { Dateclass } from './dateClass';

export class   WorkerReportModel {
    Person_id: number= 0;
    isWork: number = 1;
    reasonNotWork: number = 1;
    employerName:string = '';
    workName: string= '';
    isWorkOnProfession: number = 1;
    salaryAvg: number= null;
    workRole: string= '';
    projectName: string= '';
    technologics: string= '';
    lastChange: number= 0;
    DateObj: Date = null; 
}