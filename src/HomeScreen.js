import React from "react";
import Banner from "./Banner";
import Nav from "./Nav";
import requests from "./Requests";
import Row from "./Row";
function HomeScreen() {
  return (
    <div className="HomeScreen">
      {/* Nav */}
      <Nav />
      <Banner />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Films" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentiaries} />
      {/* Row */}
      {/* Row */}
      {/* Row */}
    </div>
  );
}

export default HomeScreen;
