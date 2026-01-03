'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Users, AlertCircle, Droplet, Calendar, TrendingUp, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Stats = {
  totalDonors: number;
  availableDonors: number;
  activeRequests: number;
  totalDonations: number;
  donorsByBloodType: { blood_type: string; count: number }[];
  recentRequests: unknown[];
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalDonors: 0,
    availableDonors: 0,
    activeRequests: 0,
    totalDonations: 0,
    donorsByBloodType: [],
    recentRequests: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [donorsResult, availableResult, requestsResult, donationsResult, bloodTypeResult, recentRequestsResult] =
        await Promise.all([
          supabase.from('donors').select('id', { count: 'exact', head: true }),
          supabase.from('donors').select('id', { count: 'exact', head: true }).eq('is_available', true),
          supabase.from('blood_requests').select('id', { count: 'exact', head: true }).eq('status', 'open'),
          supabase.from('donations').select('id', { count: 'exact', head: true }),
          supabase.from('donors').select('blood_type'),
          supabase
            .from('blood_requests')
            .select('*')
            .eq('status', 'open')
            .order('created_at', { ascending: false })
            .limit(5),
        ]);

      const bloodTypeCounts: { [key: string]: number } = {};
      bloodTypeResult.data?.forEach((donor: { blood_type: string | number; }) => {
        bloodTypeCounts[donor.blood_type] = (bloodTypeCounts[donor.blood_type] || 0) + 1;
      });

      const donorsByBloodType = Object.entries(bloodTypeCounts)
        .map(([blood_type, count]) => ({ blood_type, count }))
        .sort((a, b) => b.count - a.count);

      setStats({
        totalDonors: donorsResult.count || 0,
        availableDonors: availableResult.count || 0,
        activeRequests: requestsResult.count || 0,
        totalDonations: donationsResult.count || 0,
        donorsByBloodType,
        recentRequests: recentRequestsResult.data || [],
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-xl text-gray-600">Overview of blood donation activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Donors</CardTitle>
              <Users className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">{stats.totalDonors}</div>
              <p className="text-xs text-gray-500 mt-1">Registered blood donors</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Available Donors</CardTitle>
              <Heart className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">{stats.availableDonors}</div>
              <p className="text-xs text-gray-500 mt-1">Ready to donate now</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Requests</CardTitle>
              <AlertCircle className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">{stats.activeRequests}</div>
              <p className="text-xs text-gray-500 mt-1">Need immediate help</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Donations</CardTitle>
              <Droplet className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">{stats.totalDonations}</div>
              <p className="text-xs text-gray-500 mt-1">Lives saved</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-xl text-red-700">Donors by Blood Type</CardTitle>
              <CardDescription>Distribution of registered donors</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.donorsByBloodType.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No donor data available</p>
              ) : (
                <div className="space-y-3">
                  {stats.donorsByBloodType.map((item) => (
                    <div key={item.blood_type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-700 font-bold">{item.blood_type}</span>
                        </div>
                        <span className="font-medium text-gray-700">Blood Type {item.blood_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-red-100 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-red-600 h-full"
                            style={{
                              width: `${(item.count / stats.totalDonors) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-gray-700 font-semibold w-8 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-xl text-red-700">Recent Blood Requests</CardTitle>
              <CardDescription>Latest requests for blood donations</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.recentRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent requests</p>
              ) : (
                <div className="space-y-4">
                  {stats.recentRequests.map((request) => (
                    <div key={request.id} className="flex items-start gap-3 pb-3 border-b border-red-100 last:border-0">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{request.blood_type}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{request.patient_name}</p>
                        <p className="text-sm text-gray-600 truncate">{request.hospital_name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              request.urgency === 'critical'
                                ? 'bg-red-100 text-red-700'
                                : request.urgency === 'urgent'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {request.urgency}
                          </span>
                          <span className="text-xs text-gray-500">{request.units_needed} units</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-rose-50">
          <CardHeader>
            <CardTitle className="text-xl text-red-700 flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Impact Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-700 mb-2">
                  {stats.totalDonations * 3}
                </div>
                <p className="text-gray-600">Potential Lives Saved</p>
                <p className="text-xs text-gray-500 mt-1">Each donation can save up to 3 lives</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-700 mb-2">
                  {((stats.availableDonors / stats.totalDonors) * 100 || 0).toFixed(0)}%
                </div>
                <p className="text-gray-600">Donor Availability Rate</p>
                <p className="text-xs text-gray-500 mt-1">Percentage of donors ready to donate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-700 mb-2">
                  {stats.activeRequests}
                </div>
                <p className="text-gray-600">People Waiting</p>
                <p className="text-xs text-gray-500 mt-1">Active requests needing fulfillment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
