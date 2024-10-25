import React from "react";
import Header from "./Header/Header";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

interface AppLayoutProps {}

function AppLayout({}: AppLayoutProps) {
  const navigation = useNavigation();
  return (
    <div className="grid grid-rows-[auto_1fr] w-full">
      <Header />
      <main className="w-full overflow-x-hidden">
        {navigation.state === "loading" ? <Loader /> : <Outlet />}
      </main>
    </div>
  );
}

export default AppLayout;
