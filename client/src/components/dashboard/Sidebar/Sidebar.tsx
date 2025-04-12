'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  List,
  ShoppingBag,
  Menu,
  ChevronLeft,
  Home,
  Settings,
  Users,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    {
      icon: <PlusCircle size={20} />,
      label: 'Add Menu',
      path: '/dashboard/add-menu',
    },
    {
      icon: <List size={20} />,
      label: 'Menu Items',
      path: 'dashboard/menu-items',
    },
    { icon: <ShoppingBag size={20} />, label: 'Orders', path: '/admin/orders' },
    { icon: <Users size={20} />, label: 'Customers', path: '/admin/customers' },
    {
      icon: <BarChart3 size={20} />,
      label: 'Analytics',
      path: '/admin/analytics',
    },
    {
      icon: <Settings size={20} />,
      label: 'Settings',
      path: '/admin/settings',
    },
  ];

  return (
    <div className='flex h-screen bg-background'>
      {/* Sidebar */}
      <div
        className={cn(
          'h-screen bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col',
          isExpanded ? 'w-[180px]' : 'w-[70px]'
        )}
      >
        {/* Logo area */}
        <div className='p-4 border-b border-border flex items-center justify-between'>
          {isExpanded && (
            <div className='font-bold text-lg text-primary'>FoodAdmin</div>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={toggleSidebar}
                  aria-label={
                    isExpanded ? 'Collapse sidebar' : 'Expand sidebar'
                  }
                  className={cn(!isExpanded && 'mx-auto')}
                >
                  {isExpanded ? <ChevronLeft size={18} /> : <Menu size={18} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right'>
                {isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Navigation */}
        <div className='flex flex-col gap-1 px-2 mt-4 flex-1'>
          {menuItems.map((item, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.path} className='no-underline'>
                    <Button
                      variant='ghost'
                      className={cn(
                        'w-full justify-start text-muted-foreground hover:text-foreground',
                        !isExpanded && 'justify-center'
                      )}
                    >
                      <span className={cn('mr-2', !isExpanded && 'mr-0')}>
                        {item.icon}
                      </span>
                      {isExpanded && <span>{item.label}</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side='right'>{item.label}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* User profile section */}
        <div className='mt-auto p-4 border-t border-border'>
          {isExpanded ? (
            <div className='flex items-center gap-3'>
              <Avatar>
                <AvatarImage src='/avatar.png' alt='User' />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <p className='text-sm font-medium'>Admin User</p>
                <p className='text-xs text-muted-foreground'>
                  admin@foodapp.com
                </p>
              </div>
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className='mx-auto cursor-pointer'>
                    <AvatarImage src='/avatar.png' alt='User' />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side='right'>Admin User</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Top navigation */}

        {/* Page content */}
      </div>
    </div>
  );
};

export default Dashboard;
