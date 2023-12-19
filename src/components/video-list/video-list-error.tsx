import { useRouteError } from "react-router-dom";
import { useEffect } from "react";

export default function VideoListError() {
  const error = useRouteError();

  useEffect(() => {
    console.log(error.cause);
  }, []);

  return (
    <div className="error-container">
      <h2>There was an unexpected error.</h2>
      <p>Please try again or contact us at: fakeemail@gmail.com</p>
      <p>{error.cause.toString()}</p>
    </div>
  );
}
