import { useRouteError } from "react-router-dom";
import LinkBouten from "../features/user/LinkBouten";

function Error() {
  const Error = useRouteError();
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{Error.data || Error.message}</p>
      <LinkBouten to="-1">&larr; Go back</LinkBouten  >
    </div>
  );
}

export default Error;
