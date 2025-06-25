import { Link, useLocation } from 'react-router-dom';
import type { TNavItemProps } from '../types/componentTypes';

const navItems: TNavItemProps[] = [
  {
    route: '/home',
    label: '홈',
    icon: {
      default: '/assets/home.svg',
      clicked: '/assets/home_clicked.svg',
    },
  },
  // {
  //   route: '/chatbot',
  //   label: '챗봇',
  //   icon: {
  //     default: '/assets/chatbot.svg',
  //     clicked: '/assets/chatbot_clicked.svg',
  //   },
  // },
  {
    route: '/lecture',
    label: '강의',
    icon: {
      default: '/assets/recommend.svg',
      clicked: '/assets/recommend_clicked.svg',
    },
  },
  {
    route: '/mypage',
    label: '내정보',
    icon: {
      default: '/assets/mypage.svg',
      clicked: '/assets/mypage_clicked.svg',
    },
  },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="rounded-t-3 fixed bottom-0 left-0 right-0 z-50 flex h-[5.5rem] w-full items-center justify-between rounded-t-3xl bg-sejongred px-16 sm:px-12">
      {navItems.map(({ route, label, icon }) => {
        const isActive = location.pathname === route;

        return (
          <Link key={route} to={route} className="flex flex-col items-center">
            <img src={isActive ? icon.clicked : icon.default} alt={label} className="h-8 w-8" />

            <span className={`mt-1 text-xs font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
