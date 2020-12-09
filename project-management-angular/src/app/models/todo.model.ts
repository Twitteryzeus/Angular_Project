export class Todo {
    _id: String;
    title: String;
    stage: String;
    priorities: String;
    assignedto: any;
    inproject: String;
    completedat: Date;
    status: any;

    constructor(init:Todo){
        Object.assign(this,init);
    }
}