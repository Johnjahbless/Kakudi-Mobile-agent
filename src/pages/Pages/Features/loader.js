import React from 'react';
import Loader from 'react-loader-spinner';



const Loading = (props) => (
    <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center" 
    }}
  >
    <Loader type="Circles" color="#6777EF" height="40" width="40" />
    <div className="text-center p-t-30">
            <p className="txt1">
              Please wait...
            </p>
          </div>
  </div>
  //
  )

  export default Loading