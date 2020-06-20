import React from 'react';
import './App.css';





const initialState = {

}




class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    
  }
  render(){
        return(
            <div>
                <div className='header'>
                    CONNECT 4
                </div>
                <div className='title'>
                    SELECT GAMEMODE!
                </div>
                <div className='MenuBody'>
                    <input className="b button ph3 pv2 input-reset ba b--black  grow pointer f3 dib" type="submit" value="Play VS AI" onClick={() => this.props.onRouteChange('PVE')} />
                    <input className="b button ph3 pv2 input-reset ba b--black  grow pointer f3 dib" type="submit" value="2 Player Mode" onClick={() => this.props.onRouteChange('PVP')} />
                </div>
                
            </div>
        );
   
  }
}

export default App;
