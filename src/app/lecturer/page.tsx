"use client";

import { useState } from "react";
// Removed Header/Sidebar related imports
import {
  Bell,
  Calendar,
  Check,
  ChevronDown,
  FileText,
  Home,
  MapPin,
  Menu,
  MoreHorizontal,
  QrCode,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
// Removed Select imports (now in layout)
// Removed Sheet imports (now in layout)
// Removed Sidebar imports (now in layout)
// Removed Tooltip imports (now in layout)
import { cn } from "@/lib/utils";

// Renamed component to reflect it being a page
export default function LecturerDashboardPage() {
  // Removed isMobileMenuOpen state (moved to layout)

  // Get current date in a readable format
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    // Removed SidebarProvider and outer div structure (now in layout)
    // Removed header element (now in layout)
    // Removed grid wrapper and Sidebar element (now in layout)
    // The main content starts directly here
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Good morning, Dr. Strange
        </h1>
        <div className="ml-auto text-sm text-muted-foreground">
          {currentDate}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-green-50 dark:bg-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Attendance Rate
            </CardTitle>
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-green-500 dark:bg-green-900">
              <ChevronDown className="h-3 w-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+2%</span> from previous
                  session
                </p>
              </div>
              <div className="relative h-14 w-14">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="stroke-muted stroke-[8] fill-none"
                    cx="50"
                    cy="50"
                    r="40"
                  />
                  <circle
                    className="stroke-green-500 stroke-[8] fill-none"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeDasharray="251.2"
                    strokeDashoffset="32.656"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sessions
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Ongoing sessions</p>
            <div className="mt-2">
              <div className="text-xs font-medium text-muted-foreground">
                Upcoming:
              </div>
              <div className="mt-1 text-xs">
                <div className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span className="ml-1">CSIT884 - 11:30 AM</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span className="ml-1">CSIT886 - 2:00 PM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 dark:bg-amber-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Students Below Threshold
            </CardTitle>
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-amber-500 dark:bg-amber-900">
              <X className="h-3 w-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Students at risk</p>
            <div className="mt-2 flex -space-x-2">
              <Avatar className="border-2 border-background h-6 w-6">
                <AvatarFallback>S1</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background h-6 w-6">
                <AvatarFallback>S2</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background h-6 w-6">
                <AvatarFallback>S3</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background h-6 w-6">
                <AvatarFallback>S4</AvatarFallback>
              </Avatar>
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                +8
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 dark:bg-red-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Notifications Pending
            </CardTitle>
            <Bell className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Unread notifications
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full text-xs"
            >
              Send All
            </Button>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Courses</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{course.name}</CardTitle>
                <CardDescription>{course.code}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Attendance Rate</span>
                  <span className="text-sm font-medium">
                    {course.attendanceRate}%
                  </span>
                </div>
                <Progress value={course.attendanceRate} className="h-2" />
                <div className="mt-3 text-sm text-muted-foreground">
                  Last session: {course.lastSession}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="flex-1">
                  <QrCode className="mr-1 h-3.5 w-3.5" />
                  <span>Generate QR</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="mr-1 h-3.5 w-3.5" />
                  <span>View</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Bell className="mr-1 h-3.5 w-3.5" />
                  <span>Notify</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={cn(
                        "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full",
                        activity.type === "qr" &&
                          "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
                        activity.type === "checkin" &&
                          "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
                        activity.type === "notification" &&
                          "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                      )}
                    >
                      {activity.type === "qr" && <QrCode className="h-4 w-4" />}
                      {activity.type === "checkin" && (
                        <Check className="h-4 w-4" />
                      )}
                      {activity.type === "notification" && (
                        <Bell className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.description}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{activity.course}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Attendance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{alert.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {alert.name}
                        </p>
                        <Badge
                          variant={
                            alert.attendance < 60 ? "destructive" : "outline"
                          }
                          className="ml-auto"
                        >
                          {alert.attendance}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {alert.course}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Add Note</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
    // Removed outer closing divs (now in layout)
  );
}

// Removed MobileSidebar function (moved to layout)

// Sample data remains here as it's specific to this page's content
const courses = [
  {
    name: "Introduction to Computer Science",
    code: "CSIT883",
    attendanceRate: 87,
    lastSession: "Today, 9:30 AM",
  },
  {
    name: "Data Structures",
    code: "CSIT884",
    attendanceRate: 92,
    lastSession: "Yesterday, 2:00 PM",
  },
  {
    name: "Algorithms",
    code: "CSIT885",
    attendanceRate: 78,
    lastSession: "May 2, 11:00 AM",
  },
  {
    name: "Database Systems",
    code: "CSIT886",
    attendanceRate: 85,
    lastSession: "May 3, 3:30 PM",
  },
  {
    name: "Software Engineering",
    code: "CSIT887",
    attendanceRate: 90,
    lastSession: "April 30, 10:00 AM",
  },
  {
    name: "Web Development",
    code: "CSIT888",
    attendanceRate: 82,
    lastSession: "May 1, 1:00 PM",
  },
];

const activities = [
  {
    type: "qr",
    description: "QR code generated for CSIT883 lecture",
    course: "CSIT883",
    time: "10 minutes ago",
  },
  {
    type: "checkin",
    description: "John Smith checked in to CSIT884",
    course: "CSIT884",
    time: "25 minutes ago",
  },
  {
    type: "notification",
    description: "Attendance reminder sent to CSIT885 students",
    course: "CSIT885",
    time: "1 hour ago",
  },
  {
    type: "qr",
    description: "QR code generated for CSIT886 lab session",
    course: "CSIT886",
    time: "2 hours ago",
  },
  {
    type: "checkin",
    description: "15 students checked in to CSIT887",
    course: "CSIT887",
    time: "3 hours ago",
  },
  {
    type: "notification",
    description: "Low attendance alert for CSIT888",
    course: "CSIT888",
    time: "5 hours ago",
  },
  {
    type: "qr",
    description: "QR code generated for CSIT888 tutorial",
    course: "CSIT888",
    time: "Yesterday",
  },
  {
    type: "checkin",
    description: "Sarah Johnson checked in to CSIT888",
    course: "CSIT888",
    time: "Yesterday",
  },
];

const alerts = [
  {
    name: "Alex Johnson",
    initials: "AJ",
    attendance: 55,
    course: "CSIT883 - Introduction to Computer Science",
  },
  {
    name: "Maria Garcia",
    initials: "MG",
    attendance: 62,
    course: "CSIT884 - Data Structures",
  },
  {
    name: "James Wilson",
    initials: "JW",
    attendance: 58,
    course: "CSIT885 - Algorithms",
  },
  {
    name: "Emma Brown",
    initials: "EB",
    attendance: 48,
    course: "CSIT886 - Database Systems",
  },
  {
    name: "Michael Lee",
    initials: "ML",
    attendance: 65,
    course: "CSIT887 - Software Engineering",
  },
  {
    name: "Sophia Chen",
    initials: "SC",
    attendance: 52,
    course: "CSIT888 - Web Development",
  },
];
