
import {ConnectedCounter} from './counter/counter'
import UserComponent from './user/user-component'

function Main() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
  
        <ConnectedCounter></ConnectedCounter>
        <UserComponent></UserComponent>
      </div>
    );
  }

  export default Main;