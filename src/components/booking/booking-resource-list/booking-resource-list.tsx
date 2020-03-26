
import React from 'react';
import {Resource} from '../../../models/resource';

interface IBookingResourceListProps {
    selectedResources: Resource[]
}

function BookingResourceList(props: IBookingResourceListProps): JSX.Element{
    return (
        <div>
            {props.selectedResources.map((r:Resource) => <div>{r.Name}</div>)}
        </div>
    );
}

export { BookingResourceList };