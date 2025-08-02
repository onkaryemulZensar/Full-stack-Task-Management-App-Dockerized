import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-purple-900 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>TaskMaster &copy; {new Date().getFullYear()} - Your Personal Task Management App</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;