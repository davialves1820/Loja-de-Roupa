import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/sidebar';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Produtos',
    url: '/admin/products',
    icon: Package,
  },
  {
    title: 'Pedidos',
    url: '/admin/orders',
    icon: ShoppingCart,
  },
];

export const AdminSidebar = () => {
  const { open } = useSidebar();

  return (
    <Sidebar className={open ? 'w-64' : 'w-16'} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-6">
            <span className={`font-serif text-xl font-bold ${!open && 'sr-only'}`}>
              ATELIER Admin
            </span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/admin'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-md transition-smooth ${
                          isActive
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'hover:bg-muted'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/"
                    className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted transition-smooth text-destructive"
                  >
                    <LogOut className="h-5 w-5" />
                    {open && <span>Sair</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
