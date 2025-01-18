import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VisitData {
  participant_id: string;
  scheduled_date: string;
  status: 'ATTENDED' | 'ABSENT' | 'CANCELLED' | 'RESCHEDULED';
}

interface HealthData {
  heart_rate: number;
  blood_pressure: string;
  respiratory_rate: number;
  body_temperature: number;
  oxygen_saturation: number;
  weight: number;
  height: number;
  ecg: string;
  blood_glucose_level: number;
  urine_output: number;
}

interface ValidationErrors {
  [key: string]: string;
}

interface VisitHealthFormProps {
  participantId: string;
  scheduledDate: string;
  onSubmit: (visitData: VisitData, healthData?: HealthData) => void;
}

const VisitHealthForm: React.FC<VisitHealthFormProps> = ({
  participantId,
  scheduledDate,
  onSubmit
}) => {
  const [visitStatus, setVisitStatus] = useState<VisitData['status']>('ATTENDED');
  const [healthData, setHealthData] = useState<HealthData>({
    heart_rate: 0,
    blood_pressure: '',
    respiratory_rate: 0,
    body_temperature: 0,
    oxygen_saturation: 0,
    weight: 0,
    height: 0,
    ecg: '',
    blood_glucose_level: 0,
    urine_output: 0
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const validateVisitData = (): boolean => {
    const newErrors: ValidationErrors = {};
    if (!visitStatus) {
      newErrors.status = 'Visit status is required';
    }
    return Object.keys(newErrors).length === 0;
  };

  const validateHealthData = (): boolean => {
    if (visitStatus !== 'ATTENDED') return true;

    const newErrors: ValidationErrors = {};

    if (healthData.heart_rate < 40 || healthData.heart_rate > 200) {
      newErrors.heart_rate = 'Heart rate must be between 40 and 200 BPM';
    }

    const bpPattern = /^\d{2,3}\/\d{2,3}$/;
    if (!bpPattern.test(healthData.blood_pressure)) {
      newErrors.blood_pressure = 'Blood pressure must be in format XXX/XXX';
    }

    if (healthData.respiratory_rate < 8 || healthData.respiratory_rate > 40) {
      newErrors.respiratory_rate = 'Respiratory rate must be between 8 and 40';
    }

    if (healthData.body_temperature < 35 || healthData.body_temperature > 42) {
      newErrors.body_temperature = 'Body temperature must be between 35°C and 42°C';
    }

    if (healthData.oxygen_saturation < 80 || healthData.oxygen_saturation > 100) {
      newErrors.oxygen_saturation = 'Oxygen saturation must be between 80% and 100%';
    }

    if (healthData.weight <= 0 || healthData.weight > 500) {
      newErrors.weight = 'Weight must be between 0 and 500 kg';
    }

    if (healthData.height <= 0 || healthData.height > 300) {
      newErrors.height = 'Height must be between 0 and 300 cm';
    }

    if (healthData.blood_glucose_level < 0 || healthData.blood_glucose_level > 500) {
      newErrors.blood_glucose_level = 'Blood glucose must be between 0 and 500 mg/dL';
    }

    if (healthData.urine_output < 0 || healthData.urine_output > 5000) {
      newErrors.urine_output = 'Urine output must be between 0 and 5000 mL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateVisitData() && validateHealthData()) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirm = () => {
    const visitData: VisitData = {
      participant_id: participantId,
      scheduled_date: scheduledDate,
      status: visitStatus
    };

    onSubmit(visitData, visitStatus === 'ATTENDED' ? healthData : undefined);
    setShowConfirmDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHealthData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="w-full bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Visit Data Collection</CardTitle>
          <CardDescription>
            Record visit status and health metrics for participant ID: {participantId}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please correct the errors below before submitting.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Visit Status</Label>
              <Select
                value={visitStatus}
                onValueChange={(value: VisitData['status']) => setVisitStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visit status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATTENDED">Attended</SelectItem>
                  <SelectItem value="ABSENT">Absent</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="RESCHEDULED">Rescheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {visitStatus === 'ATTENDED' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="heart_rate">Heart Rate (BPM)</Label>
                  <Input
                    id="heart_rate"
                    name="heart_rate"
                    type="number"
                    value={healthData.heart_rate}
                    onChange={handleInputChange}
                    className={errors.heart_rate ? 'border-red-500' : ''}
                  />
                  {errors.heart_rate && (
                    <p className="text-red-500 text-sm">{errors.heart_rate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blood_pressure">Blood Pressure (mmHg)</Label>
                  <Input
                    id="blood_pressure"
                    name="blood_pressure"
                    placeholder="120/80"
                    value={healthData.blood_pressure}
                    onChange={handleInputChange}
                    className={errors.blood_pressure ? 'border-red-500' : ''}
                  />
                  {errors.blood_pressure && (
                    <p className="text-red-500 text-sm">{errors.blood_pressure}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="respiratory_rate">Respiratory Rate</Label>
                  <Input
                    id="respiratory_rate"
                    name="respiratory_rate"
                    type="number"
                    value={healthData.respiratory_rate}
                    onChange={handleInputChange}
                    className={errors.respiratory_rate ? 'border-red-500' : ''}
                  />
                  {errors.respiratory_rate && (
                    <p className="text-red-500 text-sm">{errors.respiratory_rate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body_temperature">Body Temperature (°C)</Label>
                  <Input
                    id="body_temperature"
                    name="body_temperature"
                    type="number"
                    step="0.1"
                    value={healthData.body_temperature}
                    onChange={handleInputChange}
                    className={errors.body_temperature ? 'border-red-500' : ''}
                  />
                  {errors.body_temperature && (
                    <p className="text-red-500 text-sm">{errors.body_temperature}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oxygen_saturation">Oxygen Saturation (%)</Label>
                  <Input
                    id="oxygen_saturation"
                    name="oxygen_saturation"
                    type="number"
                    step="0.1"
                    value={healthData.oxygen_saturation}
                    onChange={handleInputChange}
                    className={errors.oxygen_saturation ? 'border-red-500' : ''}
                  />
                  {errors.oxygen_saturation && (
                    <p className="text-red-500 text-sm">{errors.oxygen_saturation}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    value={healthData.weight}
                    onChange={handleInputChange}
                    className={errors.weight ? 'border-red-500' : ''}
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm">{errors.weight}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    step="0.1"
                    value={healthData.height}
                    onChange={handleInputChange}
                    className={errors.height ? 'border-red-500' : ''}
                  />
                  {errors.height && (
                    <p className="text-red-500 text-sm">{errors.height}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ecg">ECG Reading</Label>
                  <Input
                    id="ecg"
                    name="ecg"
                    value={healthData.ecg}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blood_glucose_level">Blood Glucose (mg/dL)</Label>
                  <Input
                    id="blood_glucose_level"
                    name="blood_glucose_level"
                    type="number"
                    step="0.1"
                    value={healthData.blood_glucose_level}
                    onChange={handleInputChange}
                    className={errors.blood_glucose_level ? 'border-red-500' : ''}
                  />
                  {errors.blood_glucose_level && (
                    <p className="text-red-500 text-sm">{errors.blood_glucose_level}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urine_output">Urine Output (mL)</Label>
                  <Input
                    id="urine_output"
                    name="urine_output"
                    type="number"
                    value={healthData.urine_output}
                    onChange={handleInputChange}
                    className={errors.urine_output ? 'border-red-500' : ''}
                  />
                  {errors.urine_output && (
                    <p className="text-red-500 text-sm">{errors.urine_output}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-black text-white hover:bg-gray-800"
          >
            Submit Visit Data
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              {visitStatus === 'ATTENDED' 
                ? 'Are you sure you want to submit this visit and health data? Please verify all information is correct.'
                : `Are you sure you want to mark this visit as ${visitStatus.toLowerCase()}? ${visitStatus === 'ABSENT' ? 'This will remove the participant from the trial.' : ''}`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-black text-white hover:bg-gray-800"
            >
              Confirm Submission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisitHealthForm;