import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavBarAndFooter/Navbar';
import { ExploreTopBooks } from './layouts/HomePage/ExploreTopBooks';
import { Carousel } from './layouts/HomePage/Carousel';
import { Heroes } from './layouts/HomePage/Heroes';
import { LibraryServices } from './layouts/HomePage/LibraryServices';
import { Footer } from './layouts/NavBarAndFooter/Footer';

function App() {
  return (
    <div>
      <Navbar/> 
      <ExploreTopBooks/>
      <Carousel/> 
      <Heroes/>
      <LibraryServices/> 
      <Footer/> 
    </div>
  );
}

export default App;
