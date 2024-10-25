import React from "react";

interface LoaderProps {}

function Loader({}: LoaderProps) {
  return (
    <div className="flex h-full w-full justify-center align-middle">
      <span className="loader"></span>
    </div>
  );
}

export default Loader;
