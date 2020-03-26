import { Category } from "./category";

import { IObjectWithKey } from "office-ui-fabric-react/lib/DetailsList"


export class Resource implements IObjectWithKey {
    public readonly key: string | number;

    // Set keys as not enumerable
    private readonly _name: string;
    private readonly  _category: Category | undefined | null;
    private _available: boolean = true;
    private _alreadyInBooking = false;

    constructor(key: string | number, name: string, alreadyInBooking = false,  category?: Category){

        this.key = key;
        this._name = name;
        this._category = category;
        this._alreadyInBooking = alreadyInBooking;
    }

    public get Name(){
        return this._name;
    }

    public get Category(){
        return this._category;
    }

    public get Available(){
        return this._available;
    }

    public set Available(available: boolean){
        this._available = available;
    }

    public get AlreadyInBooking(){
        return this._alreadyInBooking;
    }
}

