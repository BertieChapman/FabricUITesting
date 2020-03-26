// React
import React from 'react';
// Lodash
import { groupBy } from 'lodash';
// Fabric UI
import { Stack, StackItem } from 'office-ui-fabric-react/lib/Stack';
import {initializeIcons} from "office-ui-fabric-react/lib/Icons";
// CSS
import './App.css';
// Components 
import {BookingComponent} from './components/booking/booking-component';
import { ResourceList } from './components/resource-list/resource-list';
// Models
import { Resource } from './models/resource';
// Services
import ResourceService from './services/resource-service';

initializeIcons();

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
        <Stack horizontal={true} className="main-stack">
          <StackItem grow={1}>
            <ResourceList
              resources={this.state.resources}
              onResourceSelectionChange={(resources => this.onSelectedResourcesChange(resources))}
            />
          </StackItem>
          <StackItem grow={1}>
            <BookingComponent selectedResources={this.state.selectedResources}/>
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
}

export default App;
