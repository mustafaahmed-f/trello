import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef } from "react";
import { useSearchContext } from "../context/SearchProvider";
import AutoComplete from "./AutoComplete";
interface SearchDivProps {
  tasksArr: { taskName: string; taskId: number; created_by: string }[];
}

function SearchDiv({ tasksArr }: SearchDivProps) {
  const { showAutoComplete, setShowAutoComplete, searchVal, setSearchVal } =
    useSearchContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleCloseAutoComplete(e: any) {
      if (!e.target.closest(".taskSearchDiv")) {
        setShowAutoComplete(false);
      }
    }

    document.addEventListener("click", handleCloseAutoComplete);
  }, [setShowAutoComplete]);

  return (
    <div className="taskSearchDiv flex relative items-center gap-[2px] z-10 sm:gap-1 py-1 sm:text-base text-sm bg-white rounded-sm w-full sm:w-fit flex-nowrap ring-1 ring-neutral-400">
      <input
        value={searchVal}
        ref={inputRef}
        onChange={(e) => {
          setSearchVal(e.target.value);
          setShowAutoComplete(e.target.value ? true : false);
        }}
        onFocus={() => {
          setShowAutoComplete(true);
        }}
        placeholder="Search tasks"
        className="flex-grow px-2 py-1 sm:px-3 focus:outline-0"
      />
      {searchVal && showAutoComplete && <AutoComplete tasksArr={tasksArr} />}

      {searchVal && (
        <div className="flex h-full bg-white cursor-pointer whitespace-nowrap flex-nowrap">
          <div
            onClick={() => {
              setSearchVal("");
              setShowAutoComplete(false);
            }}
            className="flex items-center text-lg cursor-pointer hover:text-primary-500 pe-2"
          >
            <CloseIcon fontSize="small" />
          </div>
        </div>
      )}
      <div
        onClick={(e) => {
          if (!tasksArr.length) e.preventDefault();
        }}
        className="h-full px-1 bg-white cursor-pointer border-s-2"
      >
        <SearchIcon />
      </div>
    </div>
  );
}

export default SearchDiv;
