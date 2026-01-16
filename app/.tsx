import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Calendar, Droplets, AlertCircle, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-r from-red-600 via-red-700 to-rose-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Every Drop Counts
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-50 max-w-3xl mx-auto">
              Join our community of life-savers. Donate blood, save lives, and make a difference in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 text-lg px-8 py-6">
                  <Heart className="mr-2 h-5 w-5" />
                  Become a Donor
                </Button>
              </Link>
              <Link href="/requests">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-6">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Request Blood
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Donate Blood?</h2>
            <p className="text-xl text-gray-600">One donation can save up to three lives</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-red-700">Help Your Community</CardTitle>
                <CardDescription>
                  Blood donation is needed every two seconds. Your donation helps patients in need right in your area.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-red-700">Save Lives</CardTitle>
                <CardDescription>
                  Every donation can save up to three lives. Be a hero to someone in need of emergency care or ongoing treatment.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-red-700">Health Benefits</CardTitle>
                <CardDescription>
                  Regular blood donation can help reduce iron levels, stimulate blood cell production, and provide free health screenings.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Blood Types Needed</h2>
            <p className="text-xl text-gray-600">All blood types are important and needed</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
              <Card key={type} className="text-center hover:shadow-lg transition-shadow border-red-200">
                <CardContent className="pt-6">
                  <Droplets className="h-12 w-12 text-red-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-red-700">{type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start saving lives</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Register</h3>
              <p className="text-gray-600">
                Fill out a simple form with your information and blood type. It takes less than 2 minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Get Matched</h3>
              <p className="text-gray-600">
                We'll connect you with people who need your blood type or you can schedule a donation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Donate & Save</h3>
              <p className="text-gray-600">
                Visit the blood bank or hospital to donate. The process takes about an hour.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-red-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-red-50">
            Join thousands of donors who are already saving lives in their communities
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 text-lg px-8 py-6">
              Register Now
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 BloodConnect. Saving lives, one donation at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
