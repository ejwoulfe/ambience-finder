import "./video-list-layout.scss";
import { Outlet } from "react-router-dom";
export default function VideoListLayout() {
  return (
    <div className="videos-list-container">
      <Outlet />
    </div>
  );
}
