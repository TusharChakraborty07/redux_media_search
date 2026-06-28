import React from "react";
import { fetchPhotos, fetchVideos } from "./api/mediaApi";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import ResultGrid from "./components/ResultGrid";

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Search */}
        <div>
          <SearchBar />
        </div>

        {/* Tabs */}
        <div>
          <Tabs />
        </div>

        {/* Result */}
        <div>
          <ResultGrid />
        </div>
      </div>
    </>
  );
};

export default App;
