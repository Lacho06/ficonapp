import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <NavBar></NavBar>
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="col-span-2">
          <SideBar></SideBar>
        </div>
        <div className="p-4 col-span-10">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
