interface ButtonProps {
  children: React.ReactNode;
  disabledHandler?: boolean;
  onClickFN?: () => void;
}

function Button({ children, disabledHandler = false, onClickFN }: ButtonProps) {
  return (
    <button
      disabled={disabledHandler}
      onClick={onClickFN}
      className={`w-full rounded-full disabled:bg-slate-500 bg-slate-950 px-7 py-2  hover:bg-slate-700 disabled:cursor-not-allowed text-white `}
    >
      {children}
    </button>
  );
}

export default Button;
