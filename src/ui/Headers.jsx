import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "../features/user/user";

function Header() {
  return (
    <header className=" uppercase flex bg-amber-400 justify-between p-4 sm:px-6 items-center border-b border-amber-800">
      <Link to="/" className="font-medium   sm:text-lg font-mono sm:tracking-widest text-sm ">Fast React Pizza Co.</Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
