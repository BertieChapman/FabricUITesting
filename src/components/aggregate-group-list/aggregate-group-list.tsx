import React, { ReactNode } from 'react';

// Fabric UI
import {List} from 'office-ui-fabric-react/lib/List';

export type Group<T> = {
    groupName: string,
    items : T[]
}
type GroupFunction<T> = (items: T[]) => 
    {
        groupName: string,
        items: T[] 
    } []

type AggregateFunction<T> = (items: T[]) => number 

type Aggregate<T> = {
    aggregateFunction: AggregateFunction<T>,
    aggregateName: string
}

type onRowRender<T> = (group: Group<T>, aggregateValue: number) => JSX.Element;

interface IAggregateGroupListProps<T>{
    items: T[],
    aggregate: Aggregate<T>,
    groupFunction: GroupFunction<T>,
    onRowRender: onRowRender<T>
}

const GroupAggregateList = <T extends object>(props:IAggregateGroupListProps<T> & {children?: ReactNode}): JSX.Element => {

    let _groups = props.groupFunction(props.items);

    React.useEffect(() => {
        _groups = props.groupFunction(props.items);
    }, [props.items])

    const _onRenderCell = (group : {groupName: string, items: T[] } | undefined) => {
        return (
            <div>{ group && props.onRowRender(group, props.aggregate.aggregateFunction(group?.items)) }</div>
        );
    }

    return(
        <List
            items={_groups}
            onRenderCell={_onRenderCell}
        >
        </List>
    )
}

export {
    GroupAggregateList
}