import React from 'react';
import {groupBy} from 'lodash';

// Models 
import { Resource } from '../../models/resource';

// Fabric UI
import {PrimaryButton, DefaultButton} from 'office-ui-fabric-react/lib/Button';
import {Stack, StackItem} from 'office-ui-fabric-react/lib/Stack';

// Components 
import {GroupAggregateList, Group} from '../aggregate-group-list/aggregate-group-list';

// CSS
import './booking-component.css'

interface IBookingState {
    valid: boolean
}

interface IBookingProps {
    selectedResources: Resource[]
}

export class BookingComponent extends React.Component<IBookingProps, IBookingState> {

    state = {
        valid: false
    }

    private onBookingRowRender(group: Group<Resource>, value: number) {
        return (
            <div>{group?.groupName}  x{value}</div>
        );
    }

    private bookingRowGroupFunction(items: Resource[]) {
        let grouped = groupBy(items, (r: Resource) => r.Name)
        let groupArray: Group<Resource>[] = []
        Object.keys(grouped).forEach(key => {
            groupArray.push({ groupName: key, items: grouped[key] })
        })
        return groupArray;
    }

    private bookingRowAggregateFunction(items: Resource[]) {
        return items.length;
    }

    render() {
        return (
            <Stack className="booking-component-stack" verticalAlign={"center"}>
                <StackItem>
                    <div className="booking-component-header">
                        <h1>New Booking</h1>
                    </div>
                    </StackItem>
                <StackItem grow={1} className="resource-list">
                    <GroupAggregateList
                        items={this.props.selectedResources}
                        aggregate={{
                            aggregateFunction: this.bookingRowAggregateFunction,
                            aggregateName: "Count"
                        }}
                        groupFunction={this.bookingRowGroupFunction}
                        onRowRender={this.onBookingRowRender}
                        
                    />
                </StackItem>
                <StackItem align={"center"}>
                    <div className="booking-component-footer">
                        <DefaultButton>Cancel</DefaultButton>
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </StackItem>
            </Stack>
        );
    }
}