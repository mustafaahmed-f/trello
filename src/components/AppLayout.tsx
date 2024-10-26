import React from "react";
import Header from "./Header/Header";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import SearchProvider from "../context/SearchProvider";

interface AppLayoutProps {}

function AppLayout({}: AppLayoutProps) {
  const navigation = useNavigation();
  return (
    <div className="grid grid-rows-[auto_1fr] w-full min-h-screen">
      <SearchProvider>
        <Header />
      </SearchProvider>
      <div className="w-full min-h-full px-6 pb-12 sm:pb-16 sm:pt-12 sm:px-16 pt-9">
        <main className="w-full h-full overflow-x-hidden">
          {navigation.state === "loading" ? <Loader /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
