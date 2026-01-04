import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Donor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  blood_type: string;
  date_of_birth: string;
  gender: string;
  location: string;
  last_donation_date: string | null;
  is_available: boolean;
  created_at: string;
};

export type BloodRequest = {
  id: string;
  patient_name: string;
  blood_type: string;
  units_needed: number;
  urgency: 'critical' | 'urgent' | 'normal';
  hospital_name: string;
  hospital_location: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  details: string | null;
  status: 'open' | 'fulfilled' | 'cancelled';
  created_at: string;
  fulfilled_at: string | null;
};

export type Donation = {
  id: string;
  donor_id: string;
  request_id: string | null;
  donation_date: string;
  units_donated: number;
  location: string;
  notes: string | null;
  created_at: string;
};

export type Appointment = {
  id: string;
  donor_id: string;
  appointment_date: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
};
