import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { searchUser } from "@/app/api/user";
import { debounce } from "lodash";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchModel, setSearchModel] = useState(false);

  useEffect(() => {
    const debounced = debounce(async () => {
      if (!query) {
        setResults([]);
        return;
      }
      const result = await searchUser(query);
      console.log("result", result.data);
      if (result.success) setResults(result.data);
    }, 500);
    debounced();

    return debounced.cancel;
  }, [query]);

  return (
    <div className="relative max-sm:hidden">
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setTimeout(() => setQuery(""), 500)}
          className={`bg-gray-100 dark:bg-gray-800 w-[100px] max-sm:focus:w-[80vw] h-10 px-3 py-2  text-white placeholder-white/50 outline-none
          
        transition-all duration-200 ease-in-out ${
          searchModel ? "w-[300px] border-primary-700 border-b" : "w-[0px]"
        } `}
        />
        {!searchModel ? (
          <SearchIcon
            className="cursor-pointer"
            onClick={() => setSearchModel(!searchModel)}
          />
        ) : (
          <CloseIcon
            className="cursor-pointer"
            onClick={() => setSearchModel(!searchModel)}
          />
        )}
      </div>
      {results.length > 0 && (
        <div className="absolute top-12 w-full bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-lg flex flex-col gap-2 z-50">
          {results.map((user: any) => (
            <Link href={`/profile/${user.id}`} key={user.id}>
              <div className="flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
                <p>{user.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
