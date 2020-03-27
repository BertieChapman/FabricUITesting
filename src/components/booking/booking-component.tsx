import React from 'react';
import {groupBy} from 'lodash';

// Models 
import { Resource } from '../../models/resource';

// Fabric UI
import {PrimaryButton, DefaultButton} from 'office-ui-fabric-react/lib/Button';
import {Stack, StackItem} from 'office-ui-fabric-react/lib/Stack';
import {DatePicker} from 'office-ui-fabric-react/lib/DatePicker';
import {Label} from 'office-ui-fabric-react/lib/Label';

// Components 
import {GroupAggregateList, Group} from '../aggregate-group-list/aggregate-group-list';

// CSS
import './booking-component.css'

interface IBookingState {
    valid: boolean
}

interface IBookingProps {
    selectedResources: Resource[],
    onSave: () => void,
    onCancel: () => void
}

export class BookingComponent extends React.Component<IBookingProps, IBookingState> {

    state = {
        valid: false
    }

    // Lifecycle methods /////////////////////////////////////////////////
    componentDidMount(){
        this.validate();
    }

    componentDidUpdate(prevProps: IBookingProps){
        if(prevProps.selectedResources.length !== this.props.selectedResources.length){
            this.validate();
        }
    }

    shouldComponentUpdate(nextProps: IBookingProps, nextState: IBookingState) {
        return nextProps.selectedResources.length !== this.props.selectedResources.length || nextState.valid !== this.state.valid
    } 

    // Render methods ////////////////////////////////////////////////////
    private onBookingRowRender(group: Group<Resource>, value: number) {
        return (
            <div>{group.groupName}  x{value}</div>
        );
    }

    render() {
        return (
            <Stack className="booking-component-stack" verticalAlign={"center"}>
                <StackItem>
                    <div className="booking-component-header">
                        <h1>New Booking</h1>
                    </div>
                </StackItem>
                <StackItem align="start">
                    <Stack horizontal={true}>
                        <StackItem>
                            <Label>Date/Time From:</Label>
                        </StackItem>
                        <StackItem>
                            <DatePicker/>
                        </StackItem>
                        <StackItem>
                            <Label>Date/Time To:</Label>
                        </StackItem>
                        <StackItem>
                            <DatePicker
                            />
                        </StackItem>
                    </Stack>
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
                        <DefaultButton onClick={this.props.onCancel}>Cancel</DefaultButton>
                        <PrimaryButton onClick={this.props.onSave} disabled={!this.state.valid}>Submit</PrimaryButton>
                    </div>
                </StackItem>
            </Stack>
        );
    }

    ///////////////////////////////////////////////////////////////////////
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

    private validate(){
        let valid = true;

        if(this.props.selectedResources.length === 0)
            valid = false;

        this.setState({
            valid: valid
        });
    }

    
}