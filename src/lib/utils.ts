import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const generateDummyData = (trialsCount: number, participantsCount: number) => {
  const users = Array.from({ length: 5 }).map((_, index) => ({
    id: uuidv4(),
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index === 0 ? 'PI' : 'CRC',
  }));

  const trials = Array.from({ length: trialsCount }).map(() => {
    const creator = users.find((user) => user.role === 'PI');
    return {
      id: uuidv4(),
      title: `Trial ${uuidv4()}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start_date: new Date(),
      end_date: new Date(),
      created_by: creator?.id || '',
    };
  });

  const participants = Array.from({ length: participantsCount }).map(() => {
    const trial = trials[Math.floor(Math.random() * trials.length)];
    const assignedCRC = users.find((user) => user.role === 'CRC');
    return {
      id: uuidv4(),
      full_name: `Participant ${uuidv4()}`,
      dob: new Date(),
      gender: 'Male',
      marital_status: 'Single',
      address: '123 Main St',
      postal_code: '12345',
      phone_number: '123-456-7890',
      email: 'participant@example.com',
      employment_status: 'Employed',
      occupation: 'Software Engineer',
      education: 'Bachelors',
      ethnicity: 'Caucasian',
      nationality: 'American',
      primary_languages: 'English',
      health_status: 'Good',
      trial_id: trial.id,
      assigned_crc: assignedCRC?.id || '',
    };
  });

  const visits = participants.map((participant) => {
    return Array.from({ length: 3 }).map(() => ({
      id: uuidv4(),
      participant_id: participant.id,
      scheduled_date: new Date(),
      status: 'Scheduled',
    }));
  }).flat();

  const healthData = visits.map((visit) => ({
    id: uuidv4(),
    visit_id: visit.id,
    heart_rate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
    blood_pressure: `${Math.floor(Math.random() * (130 - 110 + 1)) + 110}/${Math.floor(Math.random() * (90 - 70 + 1)) + 70}`,
    respiratory_rate: Math.floor(Math.random() * (20 - 12 + 1)) + 12,
    body_temperature: Math.random() * (38 - 36) + 36,
    oxygen_saturation: Math.random() * (100 - 95) + 95,
    weight: Math.random() * (100 - 50) + 50,
    height: Math.random() * (200 - 150) + 150,
    ecg: 'Normal',
    blood_glucose_level: Math.floor(Math.random() * (110 - 70 + 1)) + 70,
    urine_output: Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000,
  }));

  return { users, trials, participants, visits, healthData };
};


