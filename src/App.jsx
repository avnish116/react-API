import React from "react";
import ApiFetcher from "./components/FetchApi"; 
import Header from "./components/Header";

function App() {

  const apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json';

  return (
    <div>
      <Header />
      <ApiFetcher apiUrl={apiUrl}/>
    </div>
  );
}

export default App;
