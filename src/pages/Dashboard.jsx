import React from "react";
import StudentsHome from "../components/StudentsHome";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import AdminHome from "../components/admin/AdminHome";

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return ApiQueries.userInfo();
    }

    // staleTime: 1000 * 60 * 60 * 24
  });

  console.log(data);
  switch (data?.userType) {
    case "admin":
      return <AdminHome />;
    case "student":
      return <StudentsHome />;
    default:
      return <AdminHome />;
  }
};

export default Dashboard;
