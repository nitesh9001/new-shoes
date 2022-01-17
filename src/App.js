import React from "react";
import Header from "./component/Header";
import './App.css';
import SnackBar from "./component/snackBar";

const  App = (props) => {
    return (
      <div className="app">
        <div className="overlays">
          <div>
           <Header />
          </div>
          <div>
            {props.children}
          </div>
          </div>
        <SnackBar />
      </div>
    );
  }

export default App;