import { useState } from "react";
import "./App.css";
import Home from "./layouts/home/home-page";

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import VideoPageLayout from "./layouts/video-page/video-page-layout.tsx";
import { NotFound } from "./components/not-found/not-found.tsx";
import VideoPage from "./components/video-page/video-page.tsx";
import VideoListLayout from "./layouts/video-list/video-list-layout.tsx";
import VideoList from "./components/video-list/video-list.tsx";
import { videosLoader } from "./loader/videos-loader.ts";
import Layout from "./layouts/Layout/layout.tsx";
import VideoListError from "./components/video-list/video-list-error.tsx";

function App() {
  const [focusModeActive, setFocusModeActive] = useState<boolean>(false);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout focusModeActive={focusModeActive} />}>
        <Route index element={<Home />} />

        <Route path="list" element={<VideoListLayout />}>
          <Route path=":keyword" element={<VideoList />} loader={videosLoader} errorElement={<VideoListError />} />
        </Route>

        <Route path="video" element={<VideoPageLayout />}>
          <Route path=":id" element={<VideoPage focusModeData={{ focusModeActive, setFocusModeActive }} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
