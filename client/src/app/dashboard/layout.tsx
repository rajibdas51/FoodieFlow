//import Sidebar from '@/components/dashboard/Sidebar';
//import Header from '@/components/dashboard/Header';
import '@/app/globals.css';

import Navbar from '@/components/dashboard/Navbar/Navbar';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className=' h-screen'>
          <hr />
          <div className='flex'>
            <Sidebar />
            {/* Sidebar with navigation links    */}
            <div className='flex-1 flex flex-col'>
              <Navbar />
              <main className='md:px-2 lg:px-4 py-6'>{children}</main>{' '}
              {/* Main content area */}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
