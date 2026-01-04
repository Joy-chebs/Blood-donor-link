'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase, type BloodRequest } from '@/lib/supabase';
import { AlertCircle, Plus, Droplet, MapPin, Phone, Mail, Hospital } from 'lucide-react';

export default function RequestsPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    blood_type: '',
    units_needed: '',
    urgency: 'normal',
    hospital_name: '',
    hospital_location: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    details: '',
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('blood_requests')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('blood_requests')
        .insert([{ ...formData, units_needed: parseInt(formData.units_needed) }])
        .select();

      if (error) throw error;

      toast({
        title: 'Request Created!',
        description: 'Your blood request has been posted successfully.',
      });

      setDialogOpen(false);
      setFormData({
        patient_name: '',
        blood_type: '',
        units_needed: '',
        urgency: 'normal',
        hospital_name: '',
        hospital_location: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        details: '',
      });
      fetchRequests();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Request Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-600 hover:bg-red-700';
      case 'urgent':
        return 'bg-orange-600 hover:bg-orange-700';
      default:
        return 'bg-yellow-600 hover:bg-yellow-700';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Blood Requests</h1>
            <p className="text-xl text-gray-600">Help save lives by fulfilling blood requests</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Blood Request</DialogTitle>
                <DialogDescription>
                  Fill out the form below to create a blood request. Make sure all information is accurate.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient_name">Patient Name</Label>
                  <Input
                    id="patient_name"
                    value={formData.patient_name}
                    onChange={(e) => handleChange('patient_name', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="blood_type">Blood Type Needed</Label>
                    <Select
                      value={formData.blood_type}
                      onValueChange={(value) => handleChange('blood_type', value)}
                      required
                    >
                      <SelectTrigger id="blood_type">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
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

                  <div className="space-y-2">
                    <Label htmlFor="units_needed">Units Needed</Label>
                    <Input
                      id="units_needed"
                      type="number"
                      min="1"
                      value={formData.units_needed}
                      onChange={(e) => handleChange('units_needed', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => handleChange('urgency', value)}
                    required
                  >
                    <SelectTrigger id="urgency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hospital_name">Hospital Name</Label>
                  <Input
                    id="hospital_name"
                    value={formData.hospital_name}
                    onChange={(e) => handleChange('hospital_name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hospital_location">Hospital Location</Label>
                  <Input
                    id="hospital_location"
                    value={formData.hospital_location}
                    onChange={(e) => handleChange('hospital_location', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_name">Contact Person Name</Label>
                  <Input
                    id="contact_name"
                    value={formData.contact_name}
                    onChange={(e) => handleChange('contact_name', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Contact Phone</Label>
                    <Input
                      id="contact_phone"
                      type="tel"
                      value={formData.contact_phone}
                      onChange={(e) => handleChange('contact_phone', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => handleChange('contact_email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details (Optional)</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => handleChange('details', e.target.value)}
                    placeholder="Any additional information..."
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={submitting}>
                  {submitting ? 'Creating...' : 'Create Request'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No active blood requests at the moment</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              <span className="font-semibold text-red-600">{requests.length}</span> active request
              {requests.length !== 1 ? 's' : ''}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests.map((request) => (
                <Card key={request.id} className="border-red-200 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-900 mb-2">{request.patient_name}</CardTitle>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className="bg-red-600 hover:bg-red-700 text-white text-lg px-3 py-1">
                            {request.blood_type}
                          </Badge>
                          <Badge className={`${getUrgencyColor(request.urgency)} text-white`}>
                            {request.urgency.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            {request.units_needed} {request.units_needed === 1 ? 'unit' : 'units'}
                          </Badge>
                        </div>
                      </div>
                      <Droplet className="h-10 w-10 text-red-600" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Hospital className="h-4 w-4 mr-2 text-red-600 flex-shrink-0" />
                      <span className="text-sm">{request.hospital_name}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-red-600 flex-shrink-0" />
                      <span className="text-sm">{request.hospital_location}</span>
                    </div>
                    <div className="pt-3 border-t border-red-100">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Contact Information:</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-red-600 flex-shrink-0" />
                          <span className="text-sm">{request.contact_phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2 text-red-600 flex-shrink-0" />
                          <span className="text-sm truncate">{request.contact_email}</span>
                        </div>
                      </div>
                    </div>
                    {request.details && (
                      <div className="pt-3 border-t border-red-100">
                        <p className="text-sm text-gray-600">{request.details}</p>
                      </div>
                    )}
                    <div className="pt-2 text-xs text-gray-500">
                      Posted: {new Date(request.created_at).toLocaleString()}
                    </div>
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
