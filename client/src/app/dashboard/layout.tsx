//import Sidebar from '@/components/dashboard/Sidebar';
//import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className='flex h-screen'>
          {/* Sidebar with navigation links  <Sidebar />  */}
          <div className='flex-1 flex flex-col'>
            {/* Header with user info, logout button, etc. <Header />  */}
            <main className='p-6'>{children}</main> {/* Main content area */}
          </div>
        </div>
      </body>
    </html>
  );
}
