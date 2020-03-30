// React
import React from 'react';
// Fabric UI
import { Stack, StackItem } from 'office-ui-fabric-react/lib/Stack';
import {initializeIcons} from "office-ui-fabric-react/lib/Icons";
// CSS
import './App.css';
// Components 
import {BookingComponent, DateRange} from './components/booking/booking-component';
import { ResourceList } from './components/resource-list/resource-list';
import {ProgressOverlayComponent} from './components/propress-overlay/progress-overlay-component'
// Models
// eslint-disable-next-line no-unused-vars
import { Resource } from './models/resource';
// Services
import ResourceService from './services/resource-service';
import { Booking } from './components/booking/booking';

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

  private _resourceService: ResourceService;
  private _defaultDates = {dateFrom: new Date(), dateTo: new Date(new Date().setHours(new Date().getHours() === 23? 0 : new Date().getHours() + 1))}

  constructor(props: IAppProps) {
    super(props);
    this._resourceService = new ResourceService();

    this.state = {
      resources: [],
      selectedResources: [],
      loading: true,
      loadingText: "Loading..."
    }  
  }

  // Lifecycle methods ///////////////////////////////////////////////////////

  componentDidMount(){
    this._resourceService.getResourcesAvailable(this._defaultDates.dateFrom, this._defaultDates.dateTo).then(r => {
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
                defaultDates={this._defaultDates}
                onDateChange={this.onDateChange.bind(this)}
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

  async onDateChange(dates: DateRange, valid: boolean){

    let {dateFrom, dateTo} = dates;

    if(valid){
      let resources = await this._resourceService.getResourcesAvailable(dateFrom, dateTo);
      this.setState(
        {
          resources
        }
      )
    }
  }

  onSaveBooking(booking: Booking){
    console.log('Saving booking');
    console.log(booking);
    this.setState({
      loading: true,
      loadingText: "Saving"
    })
    // demo saving function
    setTimeout(() => {
      //window.location.replace(this.props.redirects.onSave);
      this.setState({
        loading: false,
        loadingText: ""
      })
    }, 2500)
  }

  onCancelBooking(){
    console.log('Cancelling booking');
    window.location.replace(this.props.redirects.onCancel);
  }
}

export default App;
