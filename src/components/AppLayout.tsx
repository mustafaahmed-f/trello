import { Toaster } from "react-hot-toast";
import { Outlet, useNavigation } from "react-router-dom";
import { checkUserSession } from "../_lib/checkUserSession";
import SearchProvider from "../context/SearchProvider";
import Header from "./Header/Header";
import Loader from "./Loader";

interface AppLayoutProps {}

function AppLayout({}: AppLayoutProps) {
  const navigation = useNavigation();
  return (
    <div className="grid grid-rows-[auto_1fr] w-full min-h-screen">
      <SearchProvider>
        <Header />
      </SearchProvider>
      <div className="absolute z-10">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 2500,
          }}
        />
      </div>
      <div className="w-full min-h-full px-6 pb-12 sm:pb-16 sm:pt-12 sm:px-16 pt-9">
        <main className="w-full h-full overflow-x-hidden">
          {navigation.state === "loading" ? <Loader /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}

export async function loader() {
  await checkUserSession();
  return null;
}

export default AppLayout;
