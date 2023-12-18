import { useRouteError } from "react-router-dom";
import { useEffect } from "react";

export default function VideoListError() {
  const error = useRouteError();

  useEffect(() => {
    console.log(error.cause);
  }, []);

  return (
    <div className="error-container">
      <p></p>
    </div>
  );
}
