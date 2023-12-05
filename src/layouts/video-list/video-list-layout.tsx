import { useEffect } from "react";
import "./video-list-layout.scss";
import { Outlet } from "react-router-dom";
export default function VideoListLayout() {
  useEffect(() => {
    console.log("rendering");
  }, []);
  return (
    <div className="videos-list-container">
      <Outlet />
    </div>
  );
}
