import React from "react";
import { Resource } from "../../models/resource";
import {initializeIcons} from "office-ui-fabric-react/lib/Icons";
import {SelectionZone} from "office-ui-fabric-react/lib/Selection";
import {ScrollablePane} from "office-ui-fabric-react/lib/ScrollablePane";
import {IColumn, DetailsRow, Selection, SelectionMode} from "office-ui-fabric-react/lib/DetailsList";
import { GroupedList, IGroup } from "office-ui-fabric-react/lib/GroupedList";
import "./resource-list.css";

import {sortBy} from 'lodash';

initializeIcons();

const ResourceListColumns: IColumn[] = [
    {key: "1", fieldName: "Name", minWidth: 50, name:"name"}
]

type ItemCounts = {[item:string]: number};

interface IResourceListProps {
    resources: Resource[],
    onResourceSelectionChange: (resource: Resource[]) => void;
}

export class ResourceList extends React.Component<IResourceListProps, any> {

    private _items: Resource[] | undefined;
    private _groups: IGroup[] | undefined;
    private _columns: IColumn[] | undefined;

    private _selection: Selection;

    private _sortResources = (resources: Resource[]) => sortBy(resources, r => r.Name);

    constructor(props: IResourceListProps){
        super(props);

        // TODO: Move to lifecycle event
        this._selection = new Selection(
            {
            canSelectItem: (item: Resource) => {return item.Available},
            onSelectionChanged: () => {
                console.log(this._selection.getSelection());
                
                this.props.onResourceSelectionChange(this._selection.getSelection() as Resource[]);
            }
            });
        
        this._groupItems();
        
    }

    componentDidUpdate(prevProps: IResourceListProps){
        //if(!this._groups && this.props.resources && this.props.resources.length !== 0){

            this._groupItems();
        //}
    }

    private _getItemCounts = (resources: Resource[]) => {
        const itemCounts: ItemCounts = {};
        resources.reduce((counts, r:Resource) => {
            counts[r.Name] = (counts[r.Name] | 0) + 1;
            return counts;
        }, itemCounts);

        return itemCounts;
    }

    private _createGroupsFromCounts = (itemCounts: ItemCounts): IGroup[] =>{
        let count = 0;
        return Object.keys(itemCounts).map(key => {
            let group = {
                startIndex: count,
                count: itemCounts[key],
                name: key,
                minWidth: 50,
                key: key
            }
            count += itemCounts[key];
            return group;
        });
    }

    private _groupItems(){
        console.log("Grouping items");
        // sorted: Resource[]
        // -> {item: count}
        const sorted = this._sortResources(this.props.resources);
        this._items = sorted;
        if(!this._groups || this._groups.length === 0){
            console.log(sorted);
            const itemCounts = this._getItemCounts(sorted);
            console.log(itemCounts);
            const groups: IGroup[] = this._createGroupsFromCounts(itemCounts);
            console.log(groups)
            this._groups = groups; 
        }      
        this._selection.setItems(this._items, false);        
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
            // <div className="resource-list">
                <ScrollablePane>
                    <SelectionZone
                    selection={this._selection}>
                        <GroupedList
                            items={this._items as any[]}
                            
                            onRenderCell={this._onRenderCell.bind(this)}
                            selection={this._selection}
                            selectionMode={SelectionMode.multiple}
                            groups={this._groups}
                        />
                    </SelectionZone>
                </ScrollablePane>
            // </div>
        );
    }
    
}