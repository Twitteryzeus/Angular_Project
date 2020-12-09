export class Member {

    _id : String;
    name : String;
    phone : String;
    email : String;
    password : String;
    accountID : String;
    role : any;

    isSelected? : boolean = false;

    constructor(init : Member){
        Object.assign(this,init);
    }

    toggleSelect(){
        this.isSelected = !this.isSelected
    }

}
