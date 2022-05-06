import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutConfirmDialog from 'components/common/LogoutConfirmDialog';
import useAuth from 'hooks/useAuth';
import useMounted from 'hooks/useMounted';
import { ReactNode, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RoleList } from 'utils/constants';
import sleep from 'utils/sleep';
import SidebarItem from './SidebarItem';

interface SectionItem {
  title: string;
  children?: SectionItem[];
  info?: () => JSX.Element | null;
  icon?: ReactNode;
  path?: string;
  roles?: string[];
}

const rolesList = Object.values(RoleList).filter((item) => {
  return item;
});

const getSections = (): SectionItem[] => [
  {
    title: 'Hệ thống',
    path: '/system', //path need to be the same as route to be highlighted
    icon: <SettingsIcon />,
    // roles: rolesList, //role user and admin can see this menu
    roles: [RoleList.SA], //role user and admin can see this menu
    children: [
      {
        title: 'Thiết lập danh mục',
        path: '/system/menu-setting',
      },
      {
        title: 'Danh sách công ty',
        path: '/system/companies',
      },
      {
        title: 'Danh sách nhân viên thuộc công ty',
        path: '/system/employees',
      },
      {
        title: 'Danh sách nhà phân phối',
        path: '/system/distributors',
      },
      {
        title: 'Danh sách nhân viên thuộc nhà phân phối',
        path: '/system/employee-of-distributors',
      },
      {
        title: 'Phân quyền tài khoản',
        path: '/system/system-decentralization',
      },
    ],
  },
  {
    title: 'Dự án',
    path: '/project', //path need to be the same as route to be highlighted
    icon: <SettingsIcon />,
    roles: rolesList, //role user and admin can see this menu
    children: [
      {
        title: 'Tích hợp Danh mục Loại BĐS từ LandSoft',
        path: '/project/type-land-soft',
      },
    ],
  },
  {
    title: 'Tiện ích',
    path: '/utilities', //path need to be the same as route to be highlighted
    icon: <SettingsIcon />,
    roles: rolesList, //role user and admin can see this menu
    children: [
      {
        title: 'User profile',
        path: '/user/profile',
      },
    ],
  },
  {
    title: 'Kế toán',
    path: '/accounting', //path need to be the same as route to be highlighted
    icon: <SettingsIcon />,
    roles: rolesList, //role user and admin can see this menu
    children: [
      {
        title: 'User profile',
        path: '/user/profile',
      },
    ],
  },
  {
    title: 'Dịch vụ khách hàng',
    path: '/customer-service', //path need to be the same as route to be highlighted
    icon: <SettingsIcon />,
    roles: rolesList, //role user and admin can see this menu
    children: [
      {
        title: 'User profile',
        path: '/user/profile',
      },
    ],
  },
];

interface NavItemsProps {
  items: SectionItem[];
  pathname: string;
  depth?: number;
  role: string;
}

const renderNavSectionItems = (props: NavItemsProps): JSX.Element => {
  const { depth = 0, items, role, pathname } = props;

  const itemsFiltered =
    depth === 0
      ? items.filter((item) => item.roles && item.roles.includes(role))
      : items;

  return (
    <List disablePadding>
      {itemsFiltered.reduce((acc: JSX.Element[], item) => {
        const { children, icon, info, path, title } = item;
        const key = `${title}-${depth}`;
        const partialMatch = pathname.startsWith(String(path));
        // const exactMatch = pathname === item.path;
        if (children) {
          const items = children.filter((item) => {
            const { roles } = item;
            return !roles || (roles && roles.includes(role));
          });
          acc.push(
            <SidebarItem
              key={key}
              icon={icon}
              info={info}
              path={path}
              title={title}
              depth={depth}
              open={partialMatch}
              active={partialMatch}
            >
              {renderNavSectionItems({
                depth: depth + 1,
                items,
                pathname,
                role,
              })}
            </SidebarItem>
          );
        } else {
          acc.push(
            <SidebarItem
              key={key}
              icon={icon}
              info={info}
              path={path}
              title={title}
              depth={depth}
              active={partialMatch}
            />
          );
        }

        return acc;
      }, [])}
    </List>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);
  const mounted = useMounted();
  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    if (mounted.current) {
      setOpenLogoutDialog(false);
    }
  };

  const handleLogout = async () => {
    await sleep(350);
    logout();
  };

  const sections = useMemo(() => getSections(), []);

  const role: string = user ? 'SA' : 'BKT';

  return (
    <Box sx={{ flexGrow: 1 }}>
      {renderNavSectionItems({
        items: sections,
        pathname: location.pathname,
        role,
      })}
      <List disablePadding>
        <ListItem disableGutters disablePadding>
          <Button
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={handleOpenLogoutDialog}
            sx={{
              color: 'text.secondary',
              justifyContent: 'flex-start',
              p: 1.5,
              pl: 3,
              textAlign: 'left',
              width: '100%',
              fontWeight: 'medium',
            }}
          >
            Logout
          </Button>
        </ListItem>
      </List>
      <LogoutConfirmDialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        onSubmit={handleLogout}
        content={{
          label: 'Logout',
          description: 'Are you sure you want to logout now?',
          icon: LogoutIcon,
        }}
      />
    </Box>
  );
};

export default Sidebar;
