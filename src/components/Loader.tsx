interface LoaderProps {}

function Loader({}: LoaderProps) {
  return (
    <div className="flex justify-center w-full h-full align-middle">
      <span className="loader"></span>
    </div>
  );
}

export default Loader;
