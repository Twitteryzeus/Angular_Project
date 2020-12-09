import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  validateForm(data:any,NewArray:Array<any>){

    //Array Declaration
    var requiredArray : Array<any> = NewArray;
    var gotFieldKeys : Array<any> = Object.keys(data);
    var gotFieldValues : Array<any> = Object.values(data);

    //Variable declaration
    var indexinkeys : any;
    var errorObject : any = {
      empty : [],
    };

    requiredArray.forEach((element : any) => {
      indexinkeys = gotFieldKeys.indexOf(element);
      
      if(!gotFieldValues[indexinkeys])
      {
        errorObject.empty.push(gotFieldKeys[indexinkeys]);
      }
    });

    if(errorObject.empty.length != 0)
    {
      throw new Error(errorObject.empty+ ' required!');
    }

    return true


    // ADVANCE

    

  }
}