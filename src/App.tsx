import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ResourceList } from './components/resource-list/resource-list';
import ResourceService from './services/resource-service';
import { Resource } from './models/resource';
import BookingResourceList from './components/booking/booking-resource-list/booking-resource-list';
import SelectionTestComponent from './test-data/selection-testing';

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
    ResourceService.getResources().then(resources => {
      this.setState( {
        resources: resources,
      });
    });
  }

  render(){
    return (
      <div className="App">
        {/* <ResourceList
          resources = {this.state.resources}
          onResourceSelectionChange = {(resources => this.onSelectedResourcesChange(resources))}

        />
        <BookingResourceList
          selectedResources = {this.state.selectedResources }
        /> */}
        <SelectionTestComponent resources={this.state.resources}></SelectionTestComponent>
      </div>
    );
  }

  onSelectedResourcesChange(resources: Resource[]){
    console.log("Resources changed");
    console.log(resources);
    this.setState({
        selectedResources: resources
    })
  }
}

export default App;
