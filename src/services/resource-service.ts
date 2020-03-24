import { Resource } from "../models/resource";
import {test_resources, test_categories} from "../test-data/resources";
import { Category } from "../models/category";

export default class ResourceService {

    public static getResources(): Promise<Resource[]>{
        return Promise.resolve(test_resources);
    }

    public static getCategories(): Promise<Category[]> {
        return Promise.resolve(test_categories);
    }
}