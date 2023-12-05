import { Outlet } from "react-router-dom";

import "./video-page-layout.scss";

export default function VideoPageLayout() {
  return (
    <div className="video-page-container">
      <Outlet />
    </div>
  );
}
