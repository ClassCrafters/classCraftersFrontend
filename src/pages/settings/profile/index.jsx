"use client";

import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove auth data
    localStorage.removeItem("token");
    // localStorage.removeItem("user");

    navigate("/login/auth");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* PROFILE HEADER */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/profile.png" alt="Profile" />
            <AvatarFallback>GS</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">Girija Sankar</h2>
            <p className="text-gray-500 text-sm">girija@example.com</p>

            <div className="mt-3 flex gap-3">
              <Badge variant="secondary">Software Engineer</Badge>
              <Badge variant="outline">Active</Badge>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <Button>Edit Profile</Button>

            {/* LOGOUT BUTTON */}
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Card>

      {/* OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold">Institution</h3>
            <p className="text-gray-600">NY Tech University</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold">Phase</h3>
            <p className="text-gray-600">Freshman</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold">Subgroup</h3>
            <p className="text-gray-600">Computer Science</p>
          </CardContent>
        </Card>
      </div>

      {/* ABOUT SECTION */}
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">About</h3>
        <Separator />

        <p className="text-gray-700 leading-relaxed">
          A passionate software engineer and student at NY Tech University. 
          Loves exploring modern web technologies, building UI components,
          and working on backend architecture.
        </p>
      </Card>

      {/* DETAILS SECTION */}
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">Profile Details</h3>
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-400">Full Name</p>
            <p className="font-medium">Girija Sankar</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-medium">girija@example.com</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Role</p>
            <p className="font-medium">Student</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Joined On</p>
            <p className="font-medium">September 2025</p>
          </div>
        </div>
      </Card>

    </div>
  );
}
