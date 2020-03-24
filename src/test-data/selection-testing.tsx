import React from 'react';
import {DetailsRow, DetailsList, IDetailsRowProps} from 'office-ui-fabric-react/lib/DetailsList'
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

    constructor(props: ITestProps){
        super(props);
        this._selection = new Selection({
            onSelectionChanged: ()=> {
                console.log(this._selection.getSelection())
            }
        });
        this._selection.setItems(this.props.resources);

    }

    private _onRenderRow(rowProps: IDetailsRowProps|undefined){
        
        return (
            <DetailsRow
                itemIndex={rowProps!.itemIndex}
                item={rowProps!.item}
                selection={this._selection}
            />
        );
    }

    private _onRenderCell(nestingDepth?: number, item?: any, index?: number){
        return (
            <DetailsRow
                groupNestingDepth={nestingDepth}
                itemIndex={index!}
                item={item}
                selection={this._selection}
                columns={[{
                    key:'name',
                    minWidth: 50,
                    fieldName: 'Name',
                    name:'name'
                }]}
            />
        );
    }

    render(){
        return (
            // <SelectionZone
            //     selection={this._selection}
            // >
            //     <DetailsList
            //         items={this.props.resources}
            //         onRenderRow={this._onRenderRow.bind(this)}
            //         selection={this._selection}
            //     >

            //     </DetailsList>
            // </SelectionZone>
            <SelectionZone
                selection={this._selection}
            >
                    <GroupedList
                        items={this.props.resources}
                        onRenderCell={this._onRenderCell.bind(this)}
                        selection={this._selection}
                        groups={[{
                            key:'group1',
                            startIndex: 0,
                            count: 5,
                            name: 'group1'
                        }]}
                    >
    
                </GroupedList>
            </SelectionZone>
        );
    }
}