"use client";

import { AlertStore, useAlertStore } from "@/stores/alert/alertStore";
import React from "react";
import AlertQueue from "../alert/AlertQueue";
import Header from "../layout/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const alerts = useAlertStore((state: AlertStore) => state.alertQueue);

  return (
    <>
      <Header />
      {children}
      {alerts.length > 0 && <AlertQueue alerts={alerts} />}
    </>
  );
};

export default Layout;
