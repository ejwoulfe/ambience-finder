import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="error-container">
      <div className="error-container__text">
        <h2>There was an unexpected error.</h2>
        <p>If the errors keep occurring please reach out and contact us at: fakeemail@gmail.com</p>
        <p>{error.cause.toString()}</p>
      </div>
    </div>
  );
}
