import { useContext } from "react";
import ErrorsContext from "./ErrorsContext.jsx";

const ErrorsDisplay = () =>
{
    const error = useContext(ErrorsContext);

    return <div className="text-red-500">{error}</div>
}

export default  ErrorsDisplay;