import DashboardContainer from "@/components/DashboardContainer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />

      <DashboardContainer>{children}</DashboardContainer>
    </>
  );
}
