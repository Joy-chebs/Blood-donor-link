'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase, type Donor } from '@/lib/supabase';
import { Search, Droplet, MapPin, Phone, Mail, User } from 'lucide-react';

export default function FindDonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('all');

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    filterDonors();
  }, [donors, searchQuery, bloodTypeFilter]);

  const fetchDonors = async () => {
    try {
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonors(data || []);
    } catch (error) {
      console.error('Error fetching donors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDonors = () => {
    let filtered = donors;

    if (bloodTypeFilter !== 'all') {
      filtered = filtered.filter((donor) => donor.blood_type === bloodTypeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (donor) =>
          donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          donor.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDonors(filtered);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Blood Donors</h1>
          <p className="text-xl text-gray-600">Search for available donors by blood type or location</p>
        </div>

        <Card className="mb-8 border-red-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search by Name or Location</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Enter name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blood_type">Filter by Blood Type</Label>
                <Select value={bloodTypeFilter} onValueChange={setBloodTypeFilter}>
                  <SelectTrigger id="blood_type">
                    <SelectValue placeholder="All blood types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blood Types</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading donors...</p>
          </div>
        ) : filteredDonors.length === 0 ? (
          <div className="text-center py-12">
            <Droplet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No donors found matching your criteria</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found <span className="font-semibold text-red-600">{filteredDonors.length}</span> available donor
              {filteredDonors.length !== 1 ? 's' : ''}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor) => (
                <Card key={donor.id} className="border-red-200 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-900">{donor.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-red-600 hover:bg-red-700 text-white text-lg px-3 py-1">
                            {donor.blood_type}
                          </Badge>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Available
                          </Badge>
                        </div>
                      </div>
                      <Droplet className="h-8 w-8 text-red-600 fill-red-600" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-red-600" />
                      <span className="text-sm">{donor.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-red-600" />
                      <span className="text-sm">{donor.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-red-600" />
                      <span className="text-sm truncate">{donor.email}</span>
                    </div>
                    {donor.last_donation_date && (
                      <div className="pt-2 border-t border-red-100">
                        <p className="text-xs text-gray-500">
                          Last donation: {new Date(donor.last_donation_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
