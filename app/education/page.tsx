'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Droplet,
  Heart,
  AlertCircle,
  CheckCircle,
  Users,
  Clock,
  Beaker,
  BookOpen,
  TrendingUp,
  Shield,
} from 'lucide-react';

export default function EducationPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
            <BookOpen className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Blood Donation Education</h1>
          <p className="text-xl text-gray-600">Learn everything you need to know about blood donation</p>
        </div>

        <Tabs defaultValue="blood-types" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
            <TabsTrigger value="blood-types">Blood Types</TabsTrigger>
            <TabsTrigger value="donation-process">Donation Process</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="health-benefits">Health Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="blood-types" className="space-y-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-2xl text-red-700 flex items-center gap-2">
                  <Droplet className="h-6 w-6" />
                  Understanding Blood Types
                </CardTitle>
                <CardDescription>
                  Blood types are determined by the presence or absence of certain proteins on the surface of red blood cells.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-900 mb-3">ABO Blood Group System</h3>
                  <p className="text-gray-700 mb-4">
                    The ABO system is the most important blood group system. It determines compatibility for blood transfusions
                    based on antigens on red blood cells.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border border-red-100">
                      <h4 className="font-semibold text-red-700 mb-2">Type A Blood</h4>
                      <p className="text-sm text-gray-600">
                        Contains A antigens. Can donate to types A and AB. Can receive from types A and O.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-red-100">
                      <h4 className="font-semibold text-red-700 mb-2">Type B Blood</h4>
                      <p className="text-sm text-gray-600">
                        Contains B antigens. Can donate to types B and AB. Can receive from types B and O.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-red-100">
                      <h4 className="font-semibold text-red-700 mb-2">Type AB Blood</h4>
                      <p className="text-sm text-gray-600">
                        Contains both A and B antigens. Universal recipient. Only donate to AB.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-red-100">
                      <h4 className="font-semibold text-red-700 mb-2">Type O Blood</h4>
                      <p className="text-sm text-gray-600">
                        Universal donor. Can only receive type O.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-900 mb-3">Rh Factor</h3>
                  <p className="text-gray-700 mb-4">
                    The Rh factor is another important blood group antigen. Blood is either Rh positive (+) or Rh negative (-).
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border border-red-100">
                      <h4 className="font-semibold text-red-700 mb-2">Rh Positive (+)</h4>
                      <p className="text-sm text-gray-600">
                        85% of population. Can donate to Rh positive individuals.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-red-100">
                      <h4 className="font-semibold text-red-700 mb-2">Rh Negative (-)</h4>
                      <p className="text-sm text-gray-600">
                        15% of population. Universal donor for plasma. Rare and highly needed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-rose-100 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Blood Type Distribution
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700 mt-3">
                    <p>O+ (38%) - Most common, universal red cell donor</p>
                    <p>A+ (34%) - Second most common</p>
                    <p>B+ (9%)</p>
                    <p>AB+ (3%) - Universal plasma donor</p>
                    <p>O- (7%) - Universal red cell donor</p>
                    <p>A- (6%)</p>
                    <p>B- (2%)</p>
                    <p>AB- (1%) - Rarest blood type</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donation-process" className="space-y-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-2xl text-red-700 flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  Blood Donation Process
                </CardTitle>
                <CardDescription>
                  Here is what you can expect when donating blood, from start to finish.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { step: 1, title: 'Registration & Health Screening', time: '10-15 minutes' },
                  { step: 2, title: 'Confidential Interview', time: '5-10 minutes' },
                  { step: 3, title: 'Physical Examination', time: '5 minutes' },
                  { step: 4, title: 'Blood Donation', time: '8-10 minutes' },
                  { step: 5, title: 'Recovery & Snacks', time: '10-15 minutes' },
                  { step: 6, title: 'Post-Donation Instructions', time: '2-3 minutes' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 pb-4 border-b border-red-100 last:border-0">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-red-600 font-medium">Duration: {item.time}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Total Time Commitment
                  </h4>
                  <p className="text-sm text-blue-800">
                    Your entire blood donation visit typically takes 45-60 minutes from start to finish.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eligibility" className="space-y-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-2xl text-red-700 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Eligibility Requirements
                </CardTitle>
                <CardDescription>
                  General requirements to donate blood. Specific requirements may vary by region.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    You Can Donate If You Are:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>18 years of age or older</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>At least 110 pounds (50 kg) in weight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>In good health and feeling well</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Temporary Deferrals:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>If you have a cold, flu, or acute illness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Recent surgery (wait 2-4 weeks)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Recent vaccination (wait 2 weeks)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-900 mb-4">Donation Frequency</h3>
                  <div className="space-y-3 text-gray-700">
                    <p><span className="font-semibold text-red-700">Whole Blood:</span> Every 56 days, up to 6 times per year</p>
                    <p><span className="font-semibold text-red-700">Platelets:</span> Every 2 days, up to 24 times per year</p>
                    <p><span className="font-semibold text-red-700">Plasma:</span> Every 2 days, up to 104 times per year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health-benefits" className="space-y-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-2xl text-red-700 flex items-center gap-2">
                  <Heart className="h-6 w-6" />
                  Health Benefits
                </CardTitle>
                <CardDescription>
                  Discover the positive health impacts of becoming a blood donor.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-red-100">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-red-700">Cardiovascular Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">
                        Reduces blood viscosity and may lower risk of heart disease and stroke.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-100">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-red-700">Iron Regulation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">
                        Helps regulate iron levels and prevent organ damage from iron overload.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-100">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-red-700">Blood Cell Production</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">
                        Stimulates bone marrow to produce new blood cells, keeping systems active.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-100">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-red-700">Cancer Risk Reduction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">
                        Associated with reduced risk of certain cancers in some studies.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
