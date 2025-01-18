import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// TypeScript interfaces
interface HealthData {
  id: string;
  visitId: string;
  heartRate: number;
  bloodPressure: string;
  respiratoryRate: number;
  bodyTemperature: number;
  oxygenSaturation: number;
  weight: number;
  height: number;
  ecg: string;
  bloodGlucoseLevel: number;
  urineOutput: number;
  createdAt: string;
}

interface Visit {
  id: string;
  scheduledDate: string;
  status: string;
  healthData: HealthData;
}

interface Participant {
  id: string;
  fullName: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
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
  visits: Visit[];
}

// Dummy data
const participantData: Participant = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  fullName: "Jane Smith",
  dob: "1985-06-15",
  gender: "Female",
  maritalStatus: "Married",
  address: "123 Main Street, Cityville",
  postalCode: "12345",
  phoneNumber: "(555) 123-4567",
  email: "jane.smith@email.com",
  employmentStatus: "Employed",
  occupation: "Software Engineer",
  education: "Bachelor's Degree",
  ethnicity: "Caucasian",
  nationality: "American",
  primaryLanguages: "English, Spanish",
  healthStatus: "Generally Healthy",
  visits: Array.from({ length: 6 }, (_, i) => ({
    id: `visit-${i}`,
    scheduledDate: new Date(2024, 0, i * 30).toISOString(),
    status: "Completed",
    healthData: {
      id: `health-${i}`,
      visitId: `visit-${i}`,
      heartRate: 70 + Math.floor(Math.random() * 10),
      bloodPressure: `${120 + Math.floor(Math.random() * 10)}/${
        80 + Math.floor(Math.random() * 5)
      }`,
      respiratoryRate: 16 + Math.floor(Math.random() * 4),
      bodyTemperature: 36.5 + Math.random(),
      oxygenSaturation: 97 + Math.random() * 2,
      weight: 65 + Math.random(),
      height: 165,
      ecg: "Normal sinus rhythm",
      bloodGlucoseLevel: 90 + Math.random() * 10,
      urineOutput: 1500 + Math.random() * 500,
      createdAt: new Date(2024, 0, i * 30).toISOString(),
    },
  })),
};

const ParticipantDashboard = () => {
  const healthDataForCharts = participantData.visits.map((visit) => ({
    date: new Date(visit.scheduledDate).toLocaleDateString(),
    ...visit.healthData,
  }));

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Participant Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Personal Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{participantData.fullName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Date of Birth</h3>
              <p>{new Date(participantData.dob).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Gender</h3>
              <p>{participantData.gender}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{participantData.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p>{participantData.phoneNumber}</p>
            </div>
            <div>
              <h3 className="font-semibold">Health Status</h3>
              <p>{participantData.healthStatus}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Data Tabs */}
      <Tabs defaultValue="vitals" className="w-full">
        <TabsList>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="visits">Visit History</TabsTrigger>
        </TabsList>

        <TabsContent value="vitals">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Heart Rate Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate History</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthDataForCharts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="heartRate"
                      stroke="#8884d8"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Blood Pressure Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Oxygen Saturation History</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthDataForCharts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="oxygenSaturation"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Respiratory Rate Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Respiratory Rate History</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthDataForCharts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="respiratoryRate"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="measurements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weight Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weight History</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthDataForCharts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Blood Glucose Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Blood Glucose History</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthDataForCharts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="bloodGlucoseLevel"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Urine Output Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Urine Output History</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthDataForCharts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="urineOutput"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Body Temperature Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Body Temperature History</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthDataForCharts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="bodyTemperature"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visits">
          <Card>
            <CardHeader>
              <CardTitle>Visit History</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <div className="space-y-4">
                  {participantData.visits.map((visit) => (
                    <Card key={visit.id}>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <h3 className="font-semibold">Date</h3>
                            <p>
                              {new Date(
                                visit.scheduledDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Status</h3>
                            <p>{visit.status}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Blood Pressure</h3>
                            <p>{visit.healthData.bloodPressure}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Heart Rate</h3>
                            <p>{visit.healthData.heartRate} bpm</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Respiratory Rate</h3>
                            <p>{visit.healthData.respiratoryRate} bpm</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Body Temperature</h3>
                            <p>{visit.healthData.bodyTemperature} °C</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Oxygen Saturation</h3>
                            <p>{visit.healthData.oxygenSaturation} %</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParticipantDashboard;
