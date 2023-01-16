import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';
import TaskIcon from '@mui/icons-material/Task';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupsIcon from '@mui/icons-material/Groups';
import BedIcon from '@mui/icons-material/Bed';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import InboxIcon from '@mui/icons-material/Inbox';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <TaskIcon/>,
        to: '/',
        section: ''
    },
    {
        display: 'Rooms',
        icon: <BedIcon/>,
        to: '/rooms',
        section: 'rooms'
    },
    {
        display: 'Guests',
        icon: <LocalHotelIcon/>,
        to: '/reservations',
        section: 'reservations'
    },
    {
        display: 'Menu',
        icon: <RestaurantMenuIcon/>,
        to: '/menus',
        section: 'menus'
    },
    {
        display: 'Orders',
        icon: <InboxIcon/>,
        to: '/orders',
        section: 'orders'
    }
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
       HotelMan
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;