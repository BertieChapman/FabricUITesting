// Models
import { Resource } from "../models/resource";
import { Category } from "../models/category";


import {test_resources, test_categories} from "../test-data/resources";


export default class ResourceService {

    public getResources(): Promise<Resource[]>{
        return Promise.resolve(test_resources);
    }

    public async getResourcesAvailable(dateFrom: Date, dateTo: Date): Promise<Resource[]> {
        return await fetch("http://172.30.53.192:8642/mm/resources?dateFrom=" + new Date(dateFrom).toISOString() +"&dateTo=" + new Date(dateTo).toISOString()).then(
            (response) =>{
                return response.json();
            }).then((json: []) => {
                let resources: Resource[] = [];
                for(let i = 0; i < json.length; i++ ){
                    let resource: Resource = new Resource(json[i]["Id"], json[i]["Title"]);
                    resource.Available = json[i]["Available"];
                    //resource.Category = json[i]["Category"];
                    resources.push(
                        resource
                    )
                }
                console.log(resources);
                return resources;
            }
        );
    }

    public getCategories(): Promise<Category[]> {
        return Promise.resolve(test_categories);
    }
}
