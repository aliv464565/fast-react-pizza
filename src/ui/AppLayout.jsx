import Header from "./Headers";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router";
import LoadingApp from "./Loading-app";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-[100dvh] ">
      {isLoading && <LoadingApp />}
      <Header />
      <div className="overflow-scroll ">
        <main className="max-auto max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
