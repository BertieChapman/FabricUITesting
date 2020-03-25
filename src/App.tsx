import React from 'react';
import './App.css';
import {Stack, StackItem} from 'office-ui-fabric-react/lib/Stack';
import { ResourceList } from './components/resource-list/resource-list';
import ResourceService from './services/resource-service';
import { Resource } from './models/resource';
import BookingResourceList from './components/booking/booking-resource-list/booking-resource-list';

interface IAppState {
  resources: Resource[],
  selectedResources: Resource[]
}

class App extends React.Component<void, IAppState> {

  constructor(props: void){
    super(props);
    this.state = {
      resources: [],
      selectedResources: []     
    }
    ResourceService.getResources().then(r => {
      this.setState({resources: r});
    });
  }

  render(){
    return (
      <div className="App">
        <Stack horizontal={true}>
          <StackItem grow={1}>
            <ResourceList
              resources = {this.state.resources}
              onResourceSelectionChange = {(resources => this.onSelectedResourcesChange(resources))}
            />
          </StackItem>
          <StackItem grow={1}>
            <BookingResourceList 
              selectedResources={this.state.selectedResources}
            />
          </StackItem>
        </Stack>
      </div>
    );
  }

  onSelectedResourcesChange(resources: Resource[]){
    this.setState({
        selectedResources: resources,
    })
  }
}

export default App;
