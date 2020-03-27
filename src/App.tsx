// React
import React from 'react';
// Fabric UI
import { Stack, StackItem } from 'office-ui-fabric-react/lib/Stack';
import {initializeIcons} from "office-ui-fabric-react/lib/Icons";
// CSS
import './App.css';
// Components 
import {BookingComponent} from './components/booking/booking-component';
import { ResourceList } from './components/resource-list/resource-list';
// Models
// eslint-disable-next-line no-unused-vars
import { Resource } from './models/resource';
// Services
import ResourceService from './services/resource-service';

initializeIcons();

interface IAppState {
  resources: Resource[],
  selectedResources: Resource[]
}

interface IAppProps {
  redirects: {
    onCancel: string,
    onSave: string
  }
}

class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    console.log(this.props);
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
          <StackItem>
            <ResourceList
              resources={this.state.resources}
              onResourceSelectionChange={(resources => this.onSelectedResourcesChange(resources))}
            />
          </StackItem>
          <StackItem grow={1}>
            <BookingComponent 
              selectedResources={this.state.selectedResources}
                onSave={this.onSaveBooking.bind(this)}
                onCancel={this.onCancelBooking.bind(this)}
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

  onSaveBooking(){
    console.log('Saving booking');
    window.location.replace(this.props.redirects.onSave);
  }

  onCancelBooking(){
    console.log('Cancelling booking');
    window.location.replace(this.props.redirects.onCancel);
  }
}

export default App;
