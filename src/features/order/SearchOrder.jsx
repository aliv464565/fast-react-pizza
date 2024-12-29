import { useState } from "react";
import { useNavigate } from "react-router";

function SearchOrder() {
  const [query, setQyery] = useState("");
  const navigate = useNavigate();
  function handlersendSearch(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQyery("");
  }
  return (
    <form onSubmit={handlersendSearch} className="text-center">
      <input
        className="rounded-full py-2 bg-stone-100 text-sm w-28 px-4 placeholder:text-stone-400 transition-all duration-300 sm:w-64 sm:focus:w-72 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-op focus:ring-offset-2 "
        type="text"
        value={query}
        onChange={(e) => setQyery(e.target.value)}
        placeholder="Search Order cod"
      />
    </form>
  );
}

export default SearchOrder;
