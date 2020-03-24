import { Category } from "./category";

import { IObjectWithKey } from "office-ui-fabric-react/lib/DetailsList"

export class Resource implements IObjectWithKey {
    public readonly key: string | number;
    public name: string;
    private readonly  _category: Category | undefined | null;
    private _available: boolean = true;

    constructor(key: string | number, name: string,  category?: Category){
        this.key = key;
        this.name = name;
        this._category = category;
    }

    public get Name(){
        return this.name;
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
}

