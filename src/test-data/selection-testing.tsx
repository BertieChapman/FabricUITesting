import React from 'react';
import {DetailsRow, DetailsList, IDetailsRowProps, IColumn} from 'office-ui-fabric-react/lib/DetailsList'
import {Selection, SelectionMode, SelectionZone} from 'office-ui-fabric-react/lib/Selection';
import { Resource } from '../models/resource';
import {test_resources} from './resources';
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons'
import {GroupedList} from 'office-ui-fabric-react/lib/GroupedList';

initializeIcons();

interface ITestProps {
    resources: Resource[]
}

export default class SelectionTestComponent extends React.Component<ITestProps, any> {

    private _selection: Selection;
    private _columns: IColumn[] = [
        {
            key: "Name",
            minWidth: 200,
            name: "Name",
            fieldName: "name"
        }
    ]


    componentWillReceiveProps(props: ITestProps){
        this._selection.setItems(props.resources)
    }

    constructor(props: ITestProps){
        super(props);
        this._selection = new Selection({
            onSelectionChanged: ()=> {
                console.log(this._selection.getSelection())
            }
        });
        this._selection.setItems(this.props.resources);

    }

    private _onRenderCell = (nestingDepth?: number, item?: Resource, index?: number) =>{
        return (
            <DetailsRow
                groupNestingDepth={0}
                itemIndex={index!}
                item={this.props.resources[0]}
                columns={this._columns}
                selection={this._selection}
            />
        );
    }

    render(){
        return (
            <SelectionZone
                selection={this._selection}
            >
                <GroupedList
                    items={this.props.resources}
                    onRenderCell={this._onRenderCell}
                    selection={this._selection}
                >
                </GroupedList>
            </SelectionZone>
            // <SelectionZone
            //     selection={this._selection}
            // >
                    // <GroupedList
                    //     items={this.props.resources}
                    //     onRenderCell={this._onRenderCell}
                    //     selection={this._selection}

                    // />
            // </SelectionZone>
        );
    }
}