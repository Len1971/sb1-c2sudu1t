import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, ClipboardList, Users, LogOut, Menu, Settings, CheckCircle, FileText, Archive } from 'lucide-react';
import { signOut } from '../lib/auth';
import Logo from './ui/Logo';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-ecovest-dark' : '';
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-ecovest-primary text-white"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <nav className={`
        bg-ecovest-primary text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 transition duration-200 ease-in-out z-10
      `}>
        <div className="flex justify-center px-4 mb-8">
          <div className="w-40 h-16">
            <Logo className="w-full h-full" borderColor="border-white" />
          </div>
        </div>
        
        <div className="space-y-3">
          <Link 
            to="/dashboard" 
            className={`flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 ${isActive('/dashboard')}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule</span>
          </Link>
          
          <Link 
            to="/completed" 
            className={`flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 ${isActive('/completed')}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Completed Jobs</span>
          </Link>
          
          <Link 
            to="/reports" 
            className={`flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 ${isActive('/reports')}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ClipboardList className="w-5 h-5" />
            <span>Reports</span>
          </Link>

          <Link 
            to="/jobcards" 
            className={`flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 ${isActive('/jobcards')}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FileText className="w-5 h-5" />
            <span>Job Cards</span>
          </Link>

          <Link 
            to="/archive" 
            className={`flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 ${isActive('/archive')}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Archive className="w-5 h-5" />
            <span>Archive</span>
          </Link>
          
          <Link 
            to="/customers" 
            className={`flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 ${isActive('/customers')}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Users className="w-5 h-5" />
            <span>Customers</span>
          </Link>

          <Link 
            to="/settings" 
            className={`flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 ${isActive('/settings')}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>

        <div className="absolute bottom-4 w-full px-2">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 hover:bg-ecovest-dark w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8 md:py-8 mt-16 md:mt-0">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}