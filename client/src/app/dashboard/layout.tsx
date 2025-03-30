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
          <Navbar />
          <hr />
          <div className='flex'>
            <Sidebar />
            {/* Sidebar with navigation links    */}
            <div className='flex-1 flex flex-col'>
              <main className='p-6'>{children}</main> {/* Main content area */}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
