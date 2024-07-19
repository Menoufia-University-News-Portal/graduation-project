// App.js
import React from "react";
import Header from "./components/common/header/Header";
import "./App.css";
import Footer from "./components/common/footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";

import News from "./components/Pages/NEWS/News";
import Events from "./components/Pages/EVENTS/Events";
import OthersUni from "./components/Pages/OthersUni/OthersUni";

import EventDetails from "./components/home/mainContent/SecondSection/EventDetails";
import NewsDetails from "./components/home/mainContent/Ppost/NewsDetails";
import Vision from "./components/Pages/AboutUni/Vision";
import Goal2 from "./components/Pages/AboutUni/Goal2";
import Message from "./components/Pages/AboutUni/Message";
import Uni from "./components/Pages/AboutUni/Uni";
import SiteMap from "./components/Pages/siteMap/siteMap";
import Destination from "./components/Pages/siteMap/destination";
import LocationPage from "./components/Pages/siteMap/location";
import NewsArchive from "./components/NewsArchive/NewsArchive";
import HeadNews from "./components/Pages/HeadNews/HeadNews";
import Details from "./components/Pages/HeadNews/Details";
import Comers from "./components/Pages/Comers/Comers";
import ComersDetails from "./components/Pages/Comers/ComersDetails";

import Loader from "../src/Loader/Loader.jsx"; 
import ComersArchive from "./components/NewsArchive/ComersArchive.jsx";
import EventArchive from "./components/NewsArchive/EventsArchive.jsx";
import HeadArchive from "./components/NewsArchive/HeadArchive.jsx";
import Info from "./components/Pages/Info/Info.jsx";

const App = () => {
  return (
    <>
      <Loader>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/Info' element={<Info />} />
            <Route path='/news' element={<News />} />
            <Route path='/events' element={<Events />} />
            <Route path='/othersuni' element={<OthersUni />} />
            <Route path='/event/:id' element={<EventDetails />} />
            <Route path='/news/:id' element={<NewsDetails />} />
            <Route path='/vision' element={<Vision />} />
            <Route path='/goal' element={<Goal2 />} />
            <Route path='/message' element={<Message />} />
            <Route path='/uni' element={<Uni />} />
            <Route path='/archive' element={<NewsArchive />} />
            <Route path='/comersarchive' element={<ComersArchive />} />
            <Route path='/eventarchive' element={<EventArchive />} />
            <Route path='/headarchive' element={<HeadArchive />} />
            <Route path='/SiteMap' element={<SiteMap />} />
            <Route path='/siteMap/destination' element={<Destination />} />
            <Route path='/link:id' element={<LocationPage />} />
            <Route path='/sector-head-news' element={<HeadNews />} />
            <Route path='/sector-head-news/:id' element={<Details />} />
            <Route path='/Comers' element={<Comers />} />
            <Route path='/Comers/:id' element={<ComersDetails />} />
          </Routes>
          <Footer />
        </Router>
      </Loader>
    </>
  );
};

export default App;
