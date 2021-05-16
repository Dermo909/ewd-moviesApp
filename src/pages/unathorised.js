import React from "react";
const unathorised = () => {

    const renderPage = () => {
    return (
        <>
            <h1> Oops, something went wrong!</h1>
        </>
    );
    }
    return (
        <div>
          {renderPage()}
        </div>
      );
};

export default unathorised;