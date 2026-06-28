import React, { useEffect } from "react";
import { fetchPhotos, fetchVideos } from "../api/mediaApi";
import {
  setActiveTabs,
  setQuery,
  setLoading,
  setError,
  setResults,
} from "../redux/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const ResultGrid = () => {
  const dispatch = useDispatch();

  const { query, activeTab, results, loding, error } = useSelector(
    (store) => store.search,
  );

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(setLoading());

        let data;

        if (activeTab === "photos") {
          const res = await fetchPhotos(query);
          data = res.photos;
          console.log(data);
        } else {
          const res = await fetchVideos(query);
          data = res.videos;
          console.log(data);
        }

        dispatch(setResults(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    if (query) {
      getData();
    }
  }, [query, activeTab]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-xl font-bold mb-4">Results</h1>

        {loding && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition"
            >
              {activeTab === "photos" ? (
                <img
                  src={item.src?.medium}
                  alt={item.photographer}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video
                  src={item.video_files?.[0]?.link}
                  className="w-full h-48 object-cover"
                  controls
                />
              )}

              <div className="p-3">
                <p className="text-sm font-semibold">
                  {activeTab === "photos" ? item.photographer : item.user?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResultGrid;
