// React
// Lodash
import { groupBy } from 'lodash';
// Fabric UI
import { Stack, StackItem } from 'office-ui-fabric-react/lib/Stack';
import React from 'react';
// CSS
import './App.css';
// Components 
import { Group, GroupAggregateList } from './components/aggregate-group-list/aggregate-group-list';
import { ResourceList } from './components/resource-list/resource-list';
// Models
import { Resource } from './models/resource';
// Services
import ResourceService from './services/resource-service';

interface IAppState {
  resources: Resource[],
  selectedResources: Resource[]
}

class App extends React.Component<void, IAppState> {

  constructor(props: void) {
    super(props);
    this.state = {
      resources: [],
      selectedResources: []
    }
    ResourceService.getResources().then(r => {
      this.setState({ resources: r });
    });
  }

  render() {
    return (
      <div className="App">
        <Stack horizontal={true}>
          <StackItem grow={1}>
            <ResourceList
              resources={this.state.resources}
              onResourceSelectionChange={(resources => this.onSelectedResourcesChange(resources))}
            />
          </StackItem>
          <StackItem grow={1}>
            <GroupAggregateList
              items={this.state.selectedResources}
              aggregate={{
                aggregateFunction: this.bookingRowAggregateFunction,
                aggregateName: "Count"
              }}
              groupFunction={this.bookingRowGroupFunction}
              onRowRender={this.onBookingRowRender}
            />
          </StackItem>
        </Stack>
      </div>
    );
  }

  onSelectedResourcesChange(resources: Resource[]) {
    this.setState({
      selectedResources: resources,
    })
  }

  private onBookingRowRender(group: Group<Resource>, value: number){
    return (
      <div>{group?.groupName}  x{value}</div>
    );
  }

  private bookingRowGroupFunction(items: Resource[]){
    let grouped = groupBy(items, (r: Resource) => r.Name)
    let groupArray: Group<Resource>[] = []
    Object.keys(grouped).forEach(key => {
      groupArray.push({ groupName: key, items: grouped[key] })
    })
    return groupArray;
  }

  private bookingRowAggregateFunction(items: Resource[]){
    return items.length;
  }
}

export default App;
