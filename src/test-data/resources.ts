import { Resource } from "../models/resource";
import { Category } from "../models/category";

const test_categories: Category[] = [
    {id: "1", name: "Banner"},
    {id: "2", name: "Chairs"}
]

const test_resources: Resource[] = [
    new Resource("1", "puppy banner", false, test_categories[0]),
    new Resource("2", "puppy banner", false,test_categories[0]),
    new Resource("3", "puppy banner", false,test_categories[0]),
    new Resource("4", "dog banner", false,test_categories[0]),
    new Resource("5", "dog banner", true,test_categories[0]),
    new Resource("6", "desk chair",true, test_categories[1]),
    new Resource("7", "desk chair", false,test_categories[1]),
]

test_resources[0].Available = false;
test_resources[3].Available = false;

export {
    test_resources,
    test_categories
}
