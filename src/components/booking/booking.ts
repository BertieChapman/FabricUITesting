import {Resource} from '../../models/resource';

interface FormData {
    [fieldName: string]: any 
}

export interface Booking {
    title: string,
    dateTimeFrom: Date,
    dateTimeTo: Date,
    resources: Resource[],
    data?: FormData
} 
