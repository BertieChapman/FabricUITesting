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
import {ProgressOverlayComponent} from './components/propress-overlay/progress-overlay-component'
// Models
// eslint-disable-next-line no-unused-vars
import { Resource } from './models/resource';
// Services
import ResourceService from './services/resource-service';

initializeIcons();

interface IAppState {
  resources: Resource[],
  selectedResources: Resource[],
  loading: boolean,
  loadingText: string
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

    this.state = {
      resources: [],
      selectedResources: [],
      loading: true,
      loadingText: "Loading..."
    }  
  }

  // Lifecycle methods ///////////////////////////////////////////////////////

  componentDidMount(){
    ResourceService.getResources().then(r => {
      this.setState(
        { 
          resources: r,
          loading: false,
          loadingText: ""
        });
    });
  }

  // Render methods //////////////////////////////////////////////////////////

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
        <ProgressOverlayComponent visible={this.state.loading} text={this.state.loadingText}/>
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
    this.setState({
      loading: true,
      loadingText: "Saving"
    })
    // demo saving function
    setTimeout(() => {
      window.location.replace(this.props.redirects.onSave);
    }, 2500)
  }

  onCancelBooking(){
    console.log('Cancelling booking');
    window.location.replace(this.props.redirects.onCancel);
  }
}

export default App;
