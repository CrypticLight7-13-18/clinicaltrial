import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HomeIcon, 
  FlaskConical, 
  PlusCircle, 
  Users, 
  UserPlus,
  ClipboardCheck,
  LogOut 
} from 'lucide-react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/trials', label: 'Trials Dashboard', icon: FlaskConical },
    { path: '/add-trial', label: 'Create Trial', icon: PlusCircle },
    { path: '/participant-dashboard', label: 'Participants', icon: Users },
    { path: '/add-participant', label: 'Add Participant', icon: UserPlus },
    { path: '/visit-form', label: 'Health Records', icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FlaskConical className="h-8 w-8 text-black" />
              <span className="ml-2 text-xl font-semibold">Clinical Trials Portal</span>
            </div>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                className="flex items-center text-gray-600 hover:text-black"
                onClick={() => navigate('/')}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Side Navigation */}
          <div className="w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.path}
                        variant={location.pathname === item.path ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          location.pathname === item.path
                            ? "bg-black text-white hover:bg-gray-800"
                            : "text-gray-600 hover:text-black"
                        }`}
                        onClick={() => navigate(item.path)}
                      >
                        <Icon className="h-5 w-5 mr-2" />
                        {item.label}
                      </Button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <Card className="h-full">
              <CardContent className="p-6">
                {children || (
                  <div className="text-center py-12">
                    <FlaskConical className="h-16 w-16 mx-auto text-gray-400" />
                    <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                      Welcome to Clinical Trials Portal
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Select an option from the menu to get started
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;