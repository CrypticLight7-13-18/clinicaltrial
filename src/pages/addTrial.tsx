import React, { useState } from 'react';
import { Calendar, Users, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'PI' | 'CRC';
};

type Trial = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  assignedUsers: string[];
};

const CreateTrialPage = () => {
  // State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trial, setTrial] = useState<Trial>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    assignedUsers: [],
  });

  // Dummy users data
  const [users] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'PI' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'CRC' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'PI' },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dummy API call
      // await fetch('/api/trials', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(trial),
      // });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setTrial({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        assignedUsers: [],
      });
    } catch (error) {
      console.error('Error creating trial:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Trial</h1>

        {success && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
            <AlertDescription>
              Trial created successfully!
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trial Details</CardTitle>
                <CardDescription>
                  Enter the basic information about the trial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Trial Title
                  </label>
                  <Input
                    required
                    value={trial.title}
                    onChange={(e) => setTrial({ ...trial, title: e.target.value })}
                    placeholder="Enter trial title"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea
                    required
                    value={trial.description}
                    onChange={(e) => setTrial({ ...trial, description: e.target.value })}
                    placeholder="Enter trial description"
                    className="w-full h-32"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        required
                        type="date"
                        value={trial.startDate}
                        onChange={(e) => setTrial({ ...trial, startDate: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        required
                        type="date"
                        value={trial.endDate}
                        onChange={(e) => setTrial({ ...trial, endDate: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assign Users</CardTitle>
                <CardDescription>
                  Select users to assign to this trial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Select
                      value={trial.assignedUsers.join(',')}
                      onValueChange={(value: string) => setTrial({ 
                        ...trial, 
                        assignedUsers: value.split(',').filter(Boolean)
                      })}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select users to assign" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name} ({user.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {trial.assignedUsers.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Selected Users:</h4>
                      <div className="space-y-2">
                        {trial.assignedUsers.map((userId) => {
                          const user = users.find(u => u.id === userId);
                          return (
                            <div key={userId} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <span>{user?.name}</span>
                              <span className="text-sm text-gray-500">{user?.role}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Creating Trial...' : 'Create Trial'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrialPage;