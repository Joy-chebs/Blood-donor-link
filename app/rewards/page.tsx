'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { Award, Trophy, Gift, Star, Lock, Zap } from 'lucide-react';

type DonorWithStats = {
  id: string;
  name: string;
  blood_type: string;
  email: string;
  donation_count: number;
  is_eligible: boolean;
};

type Reward = {
  id: string;
  icon: string;
  name: string;
  description: string;
  requiredDonations: number;
  category: string;
  value: string;
  earned: boolean;
};

const AVAILABLE_REWARDS: Reward[] = [
  {
    id: '1',
    icon: '🎖️',
    name: 'Blood Donor Badge',
    description: 'Recognized as an official blood donor',
    requiredDonations: 1,
    category: 'Badge',
    value: 'Digital badge for your profile',
    earned: false,
  },
  {
    id: '2',
    icon: '⭐',
    name: 'First Time Hero',
    description: 'Completed your first blood donation',
    requiredDonations: 1,
    category: 'Certificate',
    value: 'Digital certificate',
    earned: false,
  },
  {
    id: '3',
    icon: '🏆',
    name: 'Double Donor',
    description: 'Donated blood twice - You have saved up to 6 lives',
    requiredDonations: 2,
    category: 'Achievement',
    value: '$10 Gift Card',
    earned: false,
  },
  {
    id: '4',
    icon: '💎',
    name: 'Triple Threat',
    description: 'Completed three donations in your lifetime',
    requiredDonations: 3,
    category: 'Achievement',
    value: '$25 Gift Card',
    earned: false,
  },
  {
    id: '5',
    icon: '👑',
    name: 'Platinum Donor',
    description: 'Reached 5 donations - Exceptional commitment',
    requiredDonations: 5,
    category: 'VIP Status',
    value: 'Premium membership benefits',
    earned: false,
  },
  {
    id: '6',
    icon: '🌟',
    name: 'Golden Heart',
    description: 'Reached 10 donations - You are a true hero',
    requiredDonations: 10,
    category: 'VIP Status',
    value: 'Exclusive merchandise + $100 Gift Card',
    earned: false,
  },
  {
    id: '7',
    icon: '❤️',
    name: 'Gallon Club',
    description: 'Donated 1 gallon of blood in your lifetime',
    requiredDonations: 8,
    category: 'Elite',
    value: 'Special recognition',
    earned: false,
  },
  {
    id: '8',
    icon: '✨',
    name: 'Lifesaver Legend',
    description: 'Reached 20 donations - You are a legend',
    requiredDonations: 20,
    category: 'Elite',
    value: 'Exclusive event invitation + $200 Gift Card',
    earned: false,
  },
];

export default function RewardsPage() {
  const [donors, setDonors] = useState<DonorWithStats[]>([]);
  const [rewards, setRewards] = useState<Reward[]>(AVAILABLE_REWARDS);
  const [loading, setLoading] = useState(true);
  const [selectedDonor, setSelectedDonor] = useState<DonorWithStats | null>(null);

  useEffect(() => {
    fetchDonorsAndStats();
  }, []);

  const fetchDonorsAndStats = async () => {
    try {
      const { data: donorsData } = await supabase.from('donors').select('*');
      const { data: donationsData } = await supabase.from('donations').select('donor_id');

      const donationCounts: { [key: string]: number } = {};
      donationsData?.forEach((donation) => {
        donationCounts[donation.donor_id] = (donationCounts[donation.donor_id] || 0) + 1;
      });

      const donorsWithStats = (donorsData || []).map((donor) => ({
        ...donor,
        donation_count: donationCounts[donor.id] || 0,
        is_eligible: (donationCounts[donor.id] || 0) >= 2,
      }));

      setDonors(donorsWithStats);

      if (donorsWithStats.length > 0) {
        setSelectedDonor(donorsWithStats[0]);
        updateRewardsForDonor(donorsWithStats[0]);
      }
    } catch (error) {
      console.error('Error fetching donors:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRewardsForDonor = (donor: DonorWithStats) => {
    const updatedRewards = AVAILABLE_REWARDS.map((reward) => ({
      ...reward,
      earned: donor.donation_count >= reward.requiredDonations,
    }));
    setRewards(updatedRewards);
  };

  const handleDonorSelect = (donor: DonorWithStats) => {
    setSelectedDonor(donor);
    updateRewardsForDonor(donor);
  };

  const earnedRewards = rewards.filter((r) => r.earned);
  const upcomingRewards = rewards.filter((r) => !r.earned);

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading rewards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
            <Trophy className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Rewards & Achievements</h1>
          <p className="text-xl text-gray-600">
            Earn exclusive rewards and recognition for your life-saving donations
          </p>
        </div>

        {donors.length === 0 ? (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No donors registered yet</p>
            <p className="text-gray-500 mt-2">Register as a donor to start earning rewards!</p>
          </div>
        ) : (
          <>
            <Card className="mb-8 border-red-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-red-700">Select a Donor Profile</CardTitle>
                <CardDescription>View rewards earned by donors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {donors.map((donor) => (
                    <button
                      key={donor.id}
                      onClick={() => handleDonorSelect(donor)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedDonor?.id === donor.id
                          ? 'border-red-600 bg-red-50'
                          : 'border-red-200 bg-white hover:border-red-400'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">{donor.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{donor.email}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-red-600 hover:bg-red-700 text-white">{donor.blood_type}</Badge>
                        <span className="text-sm font-bold text-red-700">{donor.donation_count} donations</span>
                      </div>
                      {donor.is_eligible && (
                        <p className="text-xs text-green-600 font-semibold mt-2">✓ Eligible for rewards</p>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedDonor && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-red-700">{selectedDonor.name}</CardTitle>
                          <CardDescription>Total Donations</CardDescription>
                        </div>
                        <Zap className="h-8 w-8 text-red-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-red-700 mb-2">{selectedDonor.donation_count}</div>
                      <p className="text-sm text-gray-600">
                        Lives saved: <span className="font-bold text-red-700">{selectedDonor.donation_count * 3}</span>
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-green-700">Rewards Earned</CardTitle>
                          <CardDescription>Achievements unlocked</CardDescription>
                        </div>
                        <Trophy className="h-8 w-8 text-green-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-green-700 mb-2">{earnedRewards.length}</div>
                      <p className="text-sm text-gray-600">
                        of {AVAILABLE_REWARDS.length} total rewards
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-blue-700">Next Reward</CardTitle>
                          <CardDescription>Donations needed</CardDescription>
                        </div>
                        <Gift className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {upcomingRewards.length > 0 ? (
                        <>
                          <div className="text-4xl font-bold text-blue-700 mb-2">
                            {upcomingRewards[0].requiredDonations - selectedDonor.donation_count}
                          </div>
                          <p className="text-sm text-gray-600">
                            to unlock {upcomingRewards[0].name}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-600 font-semibold">All rewards unlocked!</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {earnedRewards.length > 0 && (
                  <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center gap-2">
                        <Star className="h-6 w-6" />
                        Earned Rewards
                      </CardTitle>
                      <CardDescription>Congratulations on these achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {earnedRewards.map((reward) => (
                          <div
                            key={reward.id}
                            className="p-4 bg-white rounded-lg border-2 border-green-300 hover:shadow-lg transition-shadow"
                          >
                            <div className="text-4xl mb-3">{reward.icon}</div>
                            <h3 className="font-semibold text-gray-900 mb-1">{reward.name}</h3>
                            <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <Badge className="bg-green-600 hover:bg-green-700 text-white">
                                  {reward.category}
                                </Badge>
                                <span className="text-xs text-green-700 font-bold">✓ Earned</span>
                              </div>
                              <p className="text-sm font-semibold text-red-700">Reward: {reward.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {upcomingRewards.length > 0 && (
                  <Card className="border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-gray-700 flex items-center gap-2">
                        <Lock className="h-6 w-6" />
                        Upcoming Rewards
                      </CardTitle>
                      <CardDescription>Keep donating to unlock these rewards</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {upcomingRewards.map((reward) => {
                          const progress = (selectedDonor.donation_count / reward.requiredDonations) * 100;
                          const remainingDonations = Math.max(0, reward.requiredDonations - selectedDonor.donation_count);

                          return (
                            <div key={reward.id} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300 opacity-75">
                              <div className="text-4xl mb-3 opacity-50">{reward.icon}</div>
                              <h3 className="font-semibold text-gray-900 mb-1">{reward.name}</h3>
                              <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center mb-2">
                                  <Badge variant="outline">{reward.category}</Badge>
                                  <span className="text-xs text-gray-600 font-bold">{remainingDonations} more needed</span>
                                </div>
                                <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                                  <div
                                    className="bg-red-600 h-full transition-all"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                  />
                                </div>
                                <p className="text-xs text-gray-600">
                                  {selectedDonor.donation_count}/{reward.requiredDonations} donations
                                </p>
                                <p className="text-sm font-semibold text-red-700">Reward: {reward.value}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
