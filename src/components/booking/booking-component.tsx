
import React from 'react';
import {groupBy} from 'lodash';

// Models 
import { Resource } from '../../models/resource';
import {Booking} from '../booking/booking';

// Fabric UI
import {PrimaryButton, DefaultButton} from 'office-ui-fabric-react/lib/Button';
import {Stack, StackItem} from 'office-ui-fabric-react/lib/Stack';

// Components 
import {GroupAggregateList, Group} from '../aggregate-group-list/aggregate-group-list';
import DatePicker, {validRange} from '../date-selector/date-selector';

// CSS
import './booking-component.css'

interface IBookingState {
    valid: boolean,
    dateFrom: Date,
    dateTo: Date,
}

interface IBookingProps {
    selectedResources: Resource[],
    onSave: (booking: Booking) => void,
    onCancel: () => void
}

export class BookingComponent extends React.Component<IBookingProps, IBookingState> {

    state = {
        valid: false,
        dateFrom: new Date(Date.now()),
        dateTo: new Date(Date.now())
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
        return (nextProps.selectedResources.length !== this.props.selectedResources.length 
            || nextState.valid !== this.state.valid
            || nextState.dateFrom !== this.state.dateFrom
            || nextState.dateTo !== this.state.dateTo)
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
                    <DatePicker
                        includeTimeFields={true}
                        dateChangeHandler={this.onDateChange.bind(this)}
                        dates={{
                            dateFrom: this.state.dateFrom,
                            dateTo: this.state.dateTo
                        }}
                    ></DatePicker>
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
                        <PrimaryButton onClick={this.onSave.bind(this)} disabled={!this.state.valid}>Submit</PrimaryButton>
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

        if(this.props.selectedResources.length === 0){
            valid = false;
        }

        // TODO: dont like that we already have whether its valid when the date changes
        if(!validRange(this.state.dateFrom, this.state.dateTo)){
            valid = false;
        }

        this.setState({
            valid: valid
        });
    }

    private onSave(){


        this.props.onSave(this.createBookingObject())
    }

    private onDateChange(dateFrom: Date, dateTo: Date, valid: boolean){
        console.log(valid)

        this.setState({
            dateFrom: dateFrom,
            dateTo: dateTo
        })

        this.validate();
    }

    private createBookingObject(): Booking{
        const booking: Booking = {
            title: "test",
            dateTimeFrom: new Date(Date.now()),
            dateTimeTo: new Date(Date.now()),
            resources: this.props.selectedResources
        }

        return booking;
    }
}