import { useState } from "react";
import "./App.css";
import Home from "./layouts/home/home-page";

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import VideoPageLayout from "./layouts/video-page/video-page-layout.tsx";
import { NotFound } from "./components/not-found/not-found.tsx";
import VideoPage from "./components/video-page/video-page.tsx";
import VideoListLayout from "./layouts/video-list/video-list-layout.tsx";
import VideoList from "./components/video-list/video-list.tsx";
import { videosListLoader } from "./loaders/list-loader.ts";
import Layout from "./layouts/Layout/layout.tsx";
import ErrorPage from "./components/errors/error-page.tsx";
import { videoLoader } from "./loaders/video-loader.ts";

function App() {
  const [focusModeActive, setFocusModeActive] = useState<boolean>(false);

  // useEffect(() => {
  //   const customError = {
  //     code: 400,
  //     status: "test",
  //     reason: "forbidden",
  //   };
  //   throw new Error(customError.code + ": " + customError.reason, { cause: customError });
  // }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout focusModeActive={focusModeActive} />}>
        <Route index element={<Home />} />

        <Route path="list" element={<VideoListLayout />}>
          <Route path=":keyword" element={<VideoList />} loader={videosListLoader} errorElement={<ErrorPage />} />
        </Route>

        <Route path="video" element={<VideoPageLayout />}>
          <Route
            path=":id"
            element={<VideoPage focusModeData={{ focusModeActive, setFocusModeActive }} />}
            errorElement={<ErrorPage />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
