import NavBar from '../../components/NavBar';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';

const DashboardLayout = () => {
    return (
        <div className='min-h-screen'>
            <NavBar></NavBar>
            <div className='flex gap-4'>
                <SideBar></SideBar>
                <div className='p-4 w-full'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout