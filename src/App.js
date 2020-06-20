import React from 'react';
import './App.css';
import PVP from './pvpMode'
import SelectionScreen from './SelectionScreen'
import 'tachyons'
import PVE from './PVE'

const initialState = {
  gameMode:'nothing'
}




class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    
  }
  onRouteChange = (route) => {

  
    if (route === 'PVP'){
      this.setState({gameMode:'PVP'})
    } else if (route === 'PVE'){
      this.setState({gameMode:'PVE'})
    }else if (route === 'nothing'){
      this.setState({gameMode:'nothing'})
    }
      
    }


  render(){
    
      if(this.state.gameMode === 'nothing'){
        return(
            <SelectionScreen onRouteChange={this.onRouteChange} />
         );
      }
      if(this.state.gameMode === 'PVP'){
        return(
          <div className='all'>
            <div className='headerPVP'>
            <input className="b buttonsBack ph4 pv2 input-reset ba b--black  grow pointer f2 dib" type="submit" value="Go Back" onClick={() => this.onRouteChange('nothing')} />
              <div className='justtext1'>
              PVP
              </div>
            </div>
          <PVP onRouteChange={this.onRouteChange} />
          <div className='leftover'>

          </div>
        </div>
        );
      }
      if(this.state.gameMode === 'PVE'){
        return(
          <div className='all'>
            <div className='headerPVP'>
            <input className="b buttonsBack ph4 pv2 input-reset ba b--black  grow pointer f2 dib" type="submit" value="Go Back" onClick={() => this.onRouteChange('nothing')} />
              <div className='justtext2'>
              FACING AI
              </div>
            </div>
          <PVE onRouteChange={this.onRouteChange}  />
          <div className='leftover'>

          </div>
        </div>
        );
      }

   
  }
}

export default App;
