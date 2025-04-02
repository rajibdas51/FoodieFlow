import React from 'react';
import { assets } from '@/assets/admin_assets/assets';
import Image from 'next/image';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Navbar = () => {
  return (
    <header className='sticky top-0 z-10 w-full bg-background border-b border-border shadow-sm'>
      <div className=' flex h-16 items-center justify-between px-4 md:px-6'>
        {/* Logo */}
        <div className='flex items-center'>
          <Image
            src={assets.logo}
            alt='Company Logo'
            width={100}
            height={100}
            quality={100}
            className='w-36'
            priority
          />
        </div>

        {/* Search (visible on medium screens and up) */}
        <div className='hidden md:flex w-full max-w-md mx-4'>
          <div className='relative w-full'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-full pl-8'
            />
          </div>
        </div>

        {/* User actions */}
        <div className='flex items-center gap-2'>
          {/* Notifications */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' className='relative'>
                  <Bell size={20} />
                  <Badge className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0'>
                    3
                  </Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 rounded-full p-0'>
                <Avatar>
                  <AvatarImage
                    src={assets.profile_image.src}
                    alt='User Profile'
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
