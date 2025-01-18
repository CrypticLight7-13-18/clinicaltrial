import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, MapPin, Building, Book } from 'lucide-react';
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from 'lucide-react';

// Types
type Trial = {
  id: string;
  title: string;
};

type CRC = {
  id: string;
  name: string;
  email: string;
};

type Participant = {
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  maritalStatus: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  employmentStatus: string;
  occupation: string;
  education: string;
  ethnicity: string;
  nationality: string;
  primaryLanguages: string;
  healthStatus: string;
  trialId: string;
  assignedCrc: string;
};

const AddParticipantPage = () => {
  // State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [participant, setParticipant] = useState<Participant>({
    fullName: '',
    dob: '',
    gender: 'Male',
    maritalStatus: '',
    address: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    employmentStatus: '',
    occupation: '',
    education: '',
    ethnicity: '',
    nationality: '',
    primaryLanguages: '',
    healthStatus: '',
    trialId: '',
    assignedCrc: ''
  });

  // Dummy data - replace with API calls
  const [trials] = useState<Trial[]>([
    { id: '1', title: 'Cancer Research Trial' },
    { id: '2', title: 'Diabetes Prevention Study' },
  ]);

  const [crcs] = useState<CRC[]>([
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com' },
    { id: '2', name: 'Mike Brown', email: 'mike@example.com' },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dummy API call
      // await fetch('/api/participants', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(participant),
      // });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      // Reset form
      setParticipant({
        fullName: '',
        dob: '',
        gender: 'Male',
        maritalStatus: '',
        address: '',
        postalCode: '',
        phoneNumber: '',
        email: '',
        employmentStatus: '',
        occupation: '',
        education: '',
        ethnicity: '',
        nationality: '',
        primaryLanguages: '',
        healthStatus: '',
        trialId: '',
        assignedCrc: ''
      });
    } catch (error) {
      console.error('Error adding participant:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Participant</h1>

        {success && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
            <AlertDescription>
              Participant added successfully!
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trial and CRC Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Trial and CRC Assignment</CardTitle>
              <CardDescription>
                Select the trial and assign a CRC
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Trial</label>
                <Select
                  value={participant.trialId}
                  onValueChange={(value) => setParticipant({ ...participant, trialId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trial" />
                  </SelectTrigger>
                  <SelectContent>
                    {trials.map((trial) => (
                      <SelectItem key={trial.id} value={trial.id}>
                        {trial.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Assigned CRC</label>
                <Select
                  value={participant.assignedCrc}
                  onValueChange={(value) => setParticipant({ ...participant, assignedCrc: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select CRC" />
                  </SelectTrigger>
                  <SelectContent>
                    {crcs.map((crc) => (
                      <SelectItem key={crc.id} value={crc.id}>
                        {crc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Enter the participant's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      required
                      value={participant.fullName}
                      onChange={(e) => setParticipant({ ...participant, fullName: e.target.value })}
                      className="pl-10"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      required
                      type="date"
                      value={participant.dob}
                      onChange={(e) => setParticipant({ ...participant, dob: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <Select
                    value={participant.gender}
                    onValueChange={(value: 'Male' | 'Female' | 'Other') => 
                      setParticipant({ ...participant, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Marital Status</label>
                  <Input
                    value={participant.maritalStatus}
                    onChange={(e) => setParticipant({ ...participant, maritalStatus: e.target.value })}
                    placeholder="Enter marital status"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={participant.address}
                    onChange={(e) => setParticipant({ ...participant, address: e.target.value })}
                    className="pl-10"
                    placeholder="Enter address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <Input
                    value={participant.postalCode}
                    onChange={(e) => setParticipant({ ...participant, postalCode: e.target.value })}
                    placeholder="Enter postal code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      value={participant.phoneNumber}
                      onChange={(e) => setParticipant({ ...participant, phoneNumber: e.target.value })}
                      className="pl-10"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    value={participant.email}
                    onChange={(e) => setParticipant({ ...participant, email: e.target.value })}
                    className="pl-10"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional & Education Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional & Education Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Employment Status</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      value={participant.employmentStatus}
                      onChange={(e) => setParticipant({ ...participant, employmentStatus: e.target.value })}
                      className="pl-10"
                      placeholder="Enter employment status"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Occupation</label>
                  <Input
                    value={participant.occupation}
                    onChange={(e) => setParticipant({ ...participant, occupation: e.target.value })}
                    placeholder="Enter occupation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Education</label>
                  <div className="relative">
                    <Book className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      value={participant.education}
                      onChange={(e) => setParticipant({ ...participant, education: e.target.value })}
                      className="pl-10"
                      placeholder="Enter education level"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Background Information */}
          <Card>
            <CardHeader>
              <CardTitle>Background Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ethnicity</label>
                  <Input
                    value={participant.ethnicity}
                    onChange={(e) => setParticipant({ ...participant, ethnicity: e.target.value })}
                    placeholder="Enter ethnicity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nationality</label>
                  <Input
                    value={participant.nationality}
                    onChange={(e) => setParticipant({ ...participant, nationality: e.target.value })}
                    placeholder="Enter nationality"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Primary Languages</label>
                  <Input
                    value={participant.primaryLanguages}
                    onChange={(e) => setParticipant({ ...participant, primaryLanguages: e.target.value })}
                    placeholder="Enter primary languages"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Health Status</label>
                  <Input
                    value={participant.healthStatus}
                    onChange={(e) => setParticipant({ ...participant, healthStatus: e.target.value })}
                    placeholder="Enter health status"
                  />
                </div>
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
              {loading ? 'Adding Participant...' : 'Add Participant'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddParticipantPage;