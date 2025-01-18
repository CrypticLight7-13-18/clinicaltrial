import  { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, BarChart, XAxis, YAxis, Tooltip, Bar, Line, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, Activity, Calendar } from 'lucide-react';
import { generateDummyData } from '@/lib/utils';

interface Trial {
    id: number;
    title: string;
    description: string;
    start_date: string;
}

interface Participant {
    id: number;
    trial_id: number;
    full_name: string;
    gender: string;
    dob: string;
    email: string;
    phone_number: string;
}

interface Visit {
    id: number;
    participant_id: number;
    status: string;
}

interface HealthData {
    id: number;
    visit_id: number;
    heart_rate: number;
    blood_glucose_level: number;
    oxygen_saturation: number;
    weight: number;
}

const TrialDashboard = () => {
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [data, setData] = useState<{ trials: Trial[], participants: Participant[], visits: Visit[], healthData: HealthData[] }>({
    trials: [],
    participants: [],
    visits: [],
    healthData: []
  });

  useEffect(() => {
    const generatedData = generateDummyData(10, 50);
    setData(generatedData);
  }, []);

  if (!data) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  const TrialsList = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Clinical Trials Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.trials.map((trial:any) => (
          <Card 
            key={trial.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => setSelectedTrial(trial)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{trial.title}</CardTitle>
              <CardDescription>{trial.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Started: {new Date(trial.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>
                    {data.participants.filter(p => p.trial_id === trial.id).length} Participants
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const TrialDetails = ({ trial }) => {
    const trialParticipants = data.participants.filter(p => p.trial_id === trial.id);
    const trialVisits = data.visits.filter(v => 
      trialParticipants.some(p => p.id === v.participant_id)
    );
    const trialHealthData = data.healthData.filter(h => 
      trialVisits.some(v => v.id === h.visit_id)
    );

    const healthMetrics = trialHealthData.map(d => ({
      heartRate: d.heart_rate,
      bloodGlucose: d.blood_glucose_level,
      oxygenSaturation: d.oxygen_saturation,
      weight: d.weight
    }));

    const aggregatedData = {
      totalParticipants: trialParticipants.length,
      completedVisits: trialVisits.filter(v => v.status === 'Completed').length,
      scheduledVisits: trialVisits.filter(v => v.status === 'Scheduled').length,
      averageHeartRate: Math.round(
        healthMetrics.reduce((acc, curr) => acc + curr.heartRate, 0) / healthMetrics.length
      )
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{trial.title}</h1>
            <p className="text-gray-600">{trial.description}</p>
          </div>
          <button
            onClick={() => setSelectedTrial(null)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border rounded-md"
          >
            ← Back to Trials
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{aggregatedData.totalParticipants}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Visits</CardTitle>
              <UserCheck className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{aggregatedData.completedVisits}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Visits</CardTitle>
              <Calendar className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{aggregatedData.scheduledVisits}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Heart Rate</CardTitle>
              <Activity className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{aggregatedData.averageHeartRate}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="health-data">Health Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Participant Health Metrics</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={healthMetrics}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
                      <Line type="monotone" dataKey="bloodGlucose" stroke="#82ca9d" name="Blood Glucose" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visit Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Completed', value: aggregatedData.completedVisits },
                      { name: 'Scheduled', value: aggregatedData.scheduledVisits }
                    ]}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="participants">
            <Card>
              <CardHeader>
                <CardTitle>Participants List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {trialParticipants.map(participant => (
                    <div key={participant.id} className="py-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{participant.full_name}</h3>
                          <p className="text-sm text-gray-600">
                            {participant.gender} • {new Date(participant.dob).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{participant.email}</p>
                          <p className="text-sm text-gray-600">{participant.phone_number}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health-data">
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trialHealthData.map(data => (
                    <div key={data.id} className="p-4 border rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Heart Rate:</span>
                          <span className="font-medium">{data.heart_rate} bpm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Blood Pressure:</span>
                          <span className="font-medium">{data.blood_pressure}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Oxygen Saturation:</span>
                          <span className="font-medium">{Math.round(data.oxygen_saturation)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      {selectedTrial ? <TrialDetails trial={selectedTrial} /> : <TrialsList />}
    </div>
  );
};

export default TrialDashboard;