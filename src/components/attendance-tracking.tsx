"use client";

import { useState } from "react";
import {
  MapIcon,
  ListIcon,
  DownloadIcon,
  RefreshCwIcon as RefreshIcon,
  FilterIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AttendanceMap } from "@/components/attendance-map";
import { BarChart, LineChart } from "@/components/ui/chart";
import { Pagination } from "@/components/pagination";

export function AttendanceTrackingScreen() {
  const [view, setView] = useState<"list" | "map">("list");

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <main className="flex-1 p-4 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">
              Real-time Attendance Tracking
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshIcon className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                  <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                  <DropdownMenuItem>Print</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <SessionInfoCard />
          <div className="grid gap-4 md:grid-cols-3">
            <PresentStudentsCard />
            <AbsentStudentsCard />
            <CheckinTimelineCard />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search students..."
                className="h-9 w-[250px] md:w-[300px]"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Students</DropdownMenuItem>
                  <DropdownMenuItem>Present Only</DropdownMenuItem>
                  <DropdownMenuItem>Absent Only</DropdownMenuItem>
                  <DropdownMenuItem>Valid Location</DropdownMenuItem>
                  <DropdownMenuItem>Invalid Location</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              <Tabs defaultValue="list" className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list" onClick={() => setView("list")}>
                    <ListIcon className="mr-2 h-4 w-4" />
                    List
                  </TabsTrigger>
                  <TabsTrigger value="map" onClick={() => setView("map")}>
                    <MapIcon className="mr-2 h-4 w-4" />
                    Map
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          {view === "list" ? <AttendanceTable /> : <AttendanceMap />}
        </main>
      </div>
    </div>
  );
}

function SessionInfoCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Introduction to Computer Science - CSIT883</CardTitle>
        <CardDescription>Monday, April 24, 2025 - 10:00 AM</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Room Location:
            </span>
            <span className="font-medium">Engineering Building, Room 302</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              QR Code Status:
            </span>
            <div className="flex items-center">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              <span className="font-medium text-green-600">
                Active - Check-in QR
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Generate New QR</Button>
      </CardFooter>
    </Card>
  );
}

function PresentStudentsCard() {
  const data = [
    { name: "Week 1", value: 45 },
    { name: "Week 2", value: 50 },
    { name: "Week 3", value: 48 },
    { name: "Week 4", value: 53 },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Present Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">24/45 (53%)</div>
        <div className="mt-1 flex items-center text-sm text-green-600">
          <span className="font-medium">+5%</span>
          <span className="ml-1">compared to average</span>
        </div>
        <div className="mt-4 h-[60px]">
          <BarChart
            data={data}
            categories={["value"]}
            colors={["#0f172a"]}
            valueFormatter={(value) => `${value}%`}
            showXAxis={true}
            showYAxis={false}
            showLegend={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function AbsentStudentsCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Absent Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">21/45 (47%)</div>
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-medium">Frequently Absent:</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center justify-between">
              <span>John Smith</span>
              <span className="text-muted-foreground">4 sessions</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Emily Johnson</span>
              <span className="text-muted-foreground">3 sessions</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Michael Brown</span>
              <span className="text-muted-foreground">3 sessions</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function CheckinTimelineCard() {
  const data = [
    { time: "9:50", value: 2 },
    { time: "9:55", value: 8 },
    { time: "10:00", value: 12 },
    { time: "10:05", value: 5 },
    { time: "10:10", value: 3 },
    { time: "10:15", value: 1 },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Check-in Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[120px]">
          <LineChart
            data={data}
            categories={["value"]}
            index="time"
            colors={["#0f172a"]}
            valueFormatter={(value) => `${value} students`}
            showXAxis={true}
            showYAxis={true}
            showLegend={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function AttendanceTable() {
  const students = [
    {
      id: "S12345",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      checkInTime: "9:58 AM",
      checkInType: "QR Code",
      locationStatus: "Valid",
      distance: "5m",
    },
    {
      id: "S12346",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      checkInTime: "10:01 AM",
      checkInType: "QR Code",
      locationStatus: "Valid",
      distance: "8m",
    },
    {
      id: "S12347",
      name: "Jessica Williams",
      avatar: "/placeholder.svg?height=32&width=32",
      checkInTime: "10:03 AM",
      checkInType: "Manual",
      locationStatus: "Valid",
      distance: "12m",
    },
    {
      id: "S12348",
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      checkInTime: "10:05 AM",
      checkInType: "QR Code",
      locationStatus: "Invalid",
      distance: "1.2km",
    },
    {
      id: "S12349",
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=32&width=32",
      checkInTime: "10:07 AM",
      checkInType: "QR Code",
      locationStatus: "Valid",
      distance: "3m",
    },
    {
      id: "S12350",
      name: "James Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      checkInTime: "10:12 AM",
      checkInType: "QR Code",
      locationStatus: "Invalid",
      distance: "850m",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Check-in Time</TableHead>
            <TableHead className="hidden md:table-cell">
              Check-in Type
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Location Status
            </TableHead>
            <TableHead className="hidden lg:table-cell">Distance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              className={
                student.locationStatus === "Valid"
                  ? "bg-green-50 dark:bg-green-950/20"
                  : "bg-red-50 dark:bg-red-950/20"
              }
            >
              <TableCell className="font-medium">{student.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={student.avatar || "/placeholder.svg"}
                      alt={student.name}
                    />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{student.name}</span>
                </div>
              </TableCell>
              <TableCell>{student.checkInTime}</TableCell>
              <TableCell className="hidden md:table-cell">
                {student.checkInType}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  variant={
                    student.locationStatus === "Valid"
                      ? "outline"
                      : "destructive"
                  }
                  className={
                    student.locationStatus === "Valid"
                      ? "border-green-200 bg-green-100 text-green-800 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/30"
                      : ""
                  }
                >
                  {student.locationStatus}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {student.distance}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Present</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Absent</DropdownMenuItem>
                    <DropdownMenuItem>Contact Student</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t px-4 py-2">
        <div className="text-sm text-muted-foreground">
          Showing 6 of 24 students
        </div>
        <Pagination />
      </div>
    </div>
  );
}
