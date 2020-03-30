import React from 'react';
import {DatePicker} from 'office-ui-fabric-react/lib/DatePicker';
import {Dropdown, IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown'
import {Label} from 'office-ui-fabric-react/lib/Label';
import {Stack, IStackTokens} from 'office-ui-fabric-react/lib/Stack';

interface IDateRangeProps{

    includeTimeFields: boolean
    dates: {dateFrom: Date, dateTo: Date},
    disabled?: boolean,
    dateChangeHandler: (dateFrom: Date, dateTo: Date, valid: boolean) => void
}

const minutes: IDropdownOption[] = [
    {key: 0, text: "00"},
    {key: 5, text: "5"}, 
    {key: 10, text: "10"},
    {key: 15, text: "15"},
    {key: 20, text: "20"},
    {key: 25, text: "25"},
    {key: 30, text: "30"},
    {key: 35, text: "35"},
    {key: 40, text: "40"},
    {key: 45, text: "45"},
    {key: 50, text: "50"},
    {key: 55, text: "55"}
]

const hours: IDropdownOption[] = [
    {key: 1, text: "1"},
    {key: 2, text: "2"},
    {key: 3, text: "3"},
    {key: 4, text: "4"},
    {key: 5, text: "5"},
    {key: 6, text: "6"},
    {key: 7, text: "7"},
    {key: 8, text: "8"},
    {key: 9, text: "9"},
    {key: 10, text: "10"},
    {key: 11, text: "11"},
    {key: 12, text: "12"},
    {key: 13, text: "13"},
    {key: 14, text: "14"},
    {key: 15, text: "15"},
    {key: 16, text: "16"},
    {key: 17, text: "17"},
    {key: 18, text: "18"},
    {key: 19, text: "19"},
    {key: 20, text: "20"},
    {key: 21, text: "21"},
    {key: 22, text: "22"},
    {key: 23, text: "23"},
    {key: 0, text: "00"}
]

const verticalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10
};

const DateRange = (props: IDateRangeProps) => {

    function nearestMinuteSelect(minute: number): number{
         return minute - minute % 5;
    }

    return(
        <div className="gdq-datetime-picker">
            <Stack horizontal>
                <Stack horizontal tokens={verticalGapStackTokens}>
                    <Label>{props.includeTimeFields? "Date/time from" : "Date from"}</Label>
                    <DatePicker disabled={props.disabled} onSelectDate={(date) => {
                        props.dateChangeHandler(date!, props.dates.dateTo, validRange(props.dates.dateFrom, props.dates.dateTo))}} 
                        value={props.dates.dateFrom!
                    }/>
                    {props.includeTimeFields?  
                        <React.Fragment>
                            <Dropdown 
                                options={hours} 
                                disabled={props.disabled} 
                                selectedKey={props.dates.dateFrom? props.dates.dateFrom.getHours()+1: null}
                                onChange={(event, option?: IDropdownOption, index?) => {
                                    props.dateChangeHandler(new Date(props.dates.dateFrom.setHours(Number.parseInt(option!.text))), props.dates.dateTo, validRange(props.dates.dateFrom, props.dates.dateTo))
                                }}
                            />
                            <Label>:</Label>
                            <Dropdown 
                                options={minutes} 
                                disabled={props.disabled} 
                                selectedKey={props.dates.dateFrom? nearestMinuteSelect(props.dates.dateFrom.getMinutes() + 1) : null}
                                onChange={(event, option?: IDropdownOption, index?) => {
                                    props.dateChangeHandler(new Date(props.dates.dateFrom.setMinutes(Number.parseInt(option!.text))), props.dates.dateTo, validRange(props.dates.dateFrom, props.dates.dateTo))
                                }}
                            />
                        </React.Fragment>
                        : null
                    }
                </Stack>
                <Stack horizontal tokens={verticalGapStackTokens}>
                    <Label>{props.includeTimeFields? "Date/time to" : "Date to"}</Label>
                    <DatePicker 
                        disabled={props.disabled} 
                        onSelectDate={(date) => {props.dateChangeHandler(props.dates.dateFrom, date!, validRange(props.dates.dateFrom, props.dates.dateTo))}} 
                        value={props.dates.dateTo!}/>
                    {props.includeTimeFields?  
                        <React.Fragment>
                            <Dropdown 
                                options={hours} 
                                disabled={props.disabled} 
                                selectedKey={props.dates.dateTo? props.dates.dateTo.getHours()+1 : null}
                                onChange={(event, option?: IDropdownOption, index?) => {
                                    props.dateChangeHandler(props.dates.dateFrom ,new Date(props.dates.dateTo.setHours(Number.parseInt(option!.text))), validRange(props.dates.dateFrom, props.dates.dateTo))
                                }}
                            />
                            <Label>:</Label>
                            <Dropdown 
                                options={minutes} 
                                disabled={props.disabled} 
                                selectedKey={props.dates.dateTo? nearestMinuteSelect(props.dates.dateTo.getMinutes() + 1) : null}
                                onChange={(event, option?, index?) => {
                                    props.dateChangeHandler(props.dates.dateFrom, new Date(props.dates.dateTo.setMinutes(Number.parseInt(option!.text))), validRange(props.dates.dateFrom, props.dates.dateTo))
                                }}
                            />
                        </React.Fragment>
                        : null
                    }
                </Stack>
            </Stack>
        </div>
    );
}

const validRange = (dateFrom: Date| null | undefined, dateTo: Date | null | undefined) => {
    console.log("[DateSelector] detrmining if range is valid.");

    let valid = false;

    if(dateFrom != null && dateTo != null){
        console.log("[DateSelector] dateFrom: " + dateFrom.getTime());
        console.log("[DateSelector] dateTo: " + dateFrom.getTime());
        valid = dateFrom.getTime() < dateTo.getTime();
    }

    return valid;
}

export default DateRange;
export {
    validRange
}