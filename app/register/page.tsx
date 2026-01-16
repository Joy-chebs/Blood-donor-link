"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
import {toast} from "sonner"
import { supabase } from "@/lib/supabase";
import { Heart } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  // const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    blood_type: "",
    date_of_birth: "",
    gender: "",
    location: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ CLIENT-SIDE VALIDATION (IMPORTANT)
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        toast.error(`Please fill in ${key.replace("_", " ")}`);
        return;
      }
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("donors").insert([formData]);

      if (error) throw error;

      toast.success("Registration Successful 🎉", {
        description: "Redirecting to dashboard...",
      });

      // ✅ GUARANTEED NAVIGATION
      router.replace("/dashboard");
    } catch (error: any) {
      toast.error("Registration Failed", {
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
            <Heart className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Become a Donor</h1>
          <p className="text-gray-600">Join our community of life-savers</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Donor Registration</CardTitle>
            <CardDescription>All fields are required</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />

              <Input
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />

              <Select
                value={formData.blood_type}
                onValueChange={(v) => handleChange("blood_type", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Blood Type" />
                </SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>

              <Select
                value={formData.gender}
                onValueChange={(v) => handleChange("gender", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) =>
                  handleChange("date_of_birth", e.target.value)
                }
              />

              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white"
              >
                {loading ? "Registering..." : "Register & Go to Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
