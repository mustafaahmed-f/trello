import { useRouteError } from "react-router-dom";
import ErrorUI from "./ErrorUI";

interface ErrorElementProps {}

function ErrorElement({}: ErrorElementProps) {
  let error: any = useRouteError();
  //   console.log(error.message);
  return (
    <div className="relative grid h-screen grid-rows-[auto_1fr_auto]">
      <ErrorUI errMsg={error.message} />
    </div>
  );
}

export default ErrorElement;
