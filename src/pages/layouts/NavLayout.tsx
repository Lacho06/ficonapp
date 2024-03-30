import NavBar from '../../components/NavBar';
import { Outlet } from 'react-router-dom';

const NavLayout = () => {
    return (
        <>
            <NavBar></NavBar>
            
            <Outlet />
        </>
    )
}

export default NavLayout