import React from "react";
import { Resource } from "../../models/resource";
import {initializeIcons} from "office-ui-fabric-react/lib/Icons";
import {SelectionZone} from "office-ui-fabric-react/lib/Selection"
import {IColumn, DetailsRow, Selection, SelectionMode} from "office-ui-fabric-react/lib/DetailsList";
import { GroupedList, IGroup } from "office-ui-fabric-react/lib/GroupedList";
import "./resource-list.css";

initializeIcons();

const ResourceListColumns: IColumn[] = [
    {key: "1", fieldName: "Name", minWidth: 50, name:"name"}
]

const ResourceListGroups: IGroup[] = [
    {key: "1", startIndex: 0, count: 2, name: "group1"},
    {key: "2", startIndex: 2, count: 5, name: "group2"}
]

interface IResourceListProps {
    resources: Resource[],
    onResourceSelectionChange: (resource: Resource[]) => void;
}

export class ResourceList extends React.Component<IResourceListProps, any> {


    private _selection: Selection;
    constructor(props: IResourceListProps){
        super(props);
        this._selection = new Selection(
            {
            canSelectItem: (item: Resource) => {return item.Available},
            onSelectionChanged: () => {
                console.log(this._selection.getSelection());
                
                //this.props.onResourceSelectionChange(this._selection.getSelection() as Resource[]);
            }
            });
        
        this._selection.setItems(this.props.resources);
        
    }
    
    private _onRenderCell(nestingDepth?: number, item?: Resource, index?: number): JSX.Element{
        return (
            <DetailsRow
            groupNestingDepth={nestingDepth}
            item={item}
            itemIndex={index!}
            columns={ResourceListColumns}
            selectionMode={SelectionMode.multiple}
            selection={this._selection}
            className={!item?.Available? "not-available" : undefined}
          />
        );
    }
    render(){
        return (
            <div className="resource-list">
                <SelectionZone
                selection={this._selection}>
                    <GroupedList
                        items={this.props.resources}
                        
                        onRenderCell={this._onRenderCell.bind(this)}
                        selection={this._selection}
                        selectionMode={SelectionMode.multiple}
                        groups={ResourceListGroups}
                    />
                </SelectionZone>
            </div>
        );
    }
    
}