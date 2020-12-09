export class Project{
    _id: String;
    team: any;
    title: String;
    description: String;
    createdby: String;
    accountID: String;
    createdAt : String;

    constructor(init:Project){
        Object.assign(this,init)
    }
}