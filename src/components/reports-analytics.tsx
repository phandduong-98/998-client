"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Calendar,
  Check,
  Download,
  FileText,
  Filter,
  Home,
  Info,
  Mail,
  MapPin,
  Menu,
  MoreHorizontal,
  Printer,
  QrCode,
  Search,
  Settings,
  Share2,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ReferenceLine, XAxis, YAxis } from "recharts"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { type DateRange } from "react-day-picker"

export default function ReportsAnalytics() {
  const [date, setDate] = useState<DateRange>({
    from: new Date(2025, 2, 1), // Mar 1, 2025
    to: new Date(2025, 3, 24), // Apr 24, 2025
  })

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Attendance Reports & Analytics</h1>
      </div>

      {/* Report Configuration Panel */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Course
              </label>
              <Select defaultValue="csit883">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csit883">CSIT883 - Introduction to Computer Science</SelectItem>
                  <SelectItem value="csit884">CSIT884 - Data Structures</SelectItem>
                  <SelectItem value="csit885">CSIT885 - Algorithms</SelectItem>
                  <SelectItem value="csit886">CSIT886 - Database Systems</SelectItem>
                  <SelectItem value="csit887">CSIT887 - Software Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Date Range
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    {date.from ? (
                      date.to ? (
                        <span>
                          {format(date.from, "MMM d, yyyy")} - {format(date.to, "MMM d, yyyy")}
                        </span>
                      ) : (
                        format(date.from, "MMM d, yyyy")
                      )
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={date.from}
                    selected={date}
                    onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Report Type
              </label>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="student">Student-focused</TabsTrigger>
                  <TabsTrigger value="session">Session-focused</TabsTrigger>
                  <TabsTrigger value="trends">Trends & Patterns</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="compare" />
              <label
                htmlFor="compare"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Compare to previous period
              </label>
            </div>
            <Button className="w-full md:w-auto">Generate Report</Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Visualization Dashboard */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Attendance Overview Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Attendance Overview</CardTitle>
            <CardDescription>Attendance percentages across sessions</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ChartContainer
              config={{
                attendance: {
                  label: "Attendance",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px] w-full overflow-hidden"
            >
              <BarChart
                data={attendanceData}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                width={500}
                height={300}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ReferenceLine y={75} stroke="#f59e0b" strokeDasharray="3 3" />
                <Bar dataKey="attendance" radius={[4, 4, 0, 0]} fill="var(--color-attendance)" barSize={30} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Attendance Trend Line */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Attendance Trend</CardTitle>
            <CardDescription>Attendance trends over time</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ChartContainer
              config={{
                current: {
                  label: "Current Period",
                  color: "hsl(var(--chart-1))",
                },
                previous: {
                  label: "Previous Period",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px] w-full overflow-hidden"
            >
              <LineChart
                data={trendData}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                width={500}
                height={300}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="var(--color-current)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "var(--color-current)" }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke="var(--color-previous)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: "var(--color-previous)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Student Engagement Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Student Engagement Distribution</CardTitle>
            <CardDescription>Distribution by attendance category</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ChartContainer
              config={{
                excellent: {
                  label: "Excellent (90-100%)",
                  color: "#22c55e",
                },
                good: {
                  label: "Good (80-89%)",
                  color: "#84cc16",
                },
                average: {
                  label: "Average (70-79%)",
                  color: "#f59e0b",
                },
                belowAverage: {
                  label: "Below Average (60-69%)",
                  color: "#f97316",
                },
                poor: {
                  label: "Poor (Below 60%)",
                  color: "#ef4444",
                },
              }}
              className="h-[300px] w-full overflow-hidden"
            >
              <PieChart width={500} height={300}>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Key Metrics Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Key Metrics</CardTitle>
            <CardDescription>Summary of attendance metrics</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Average Attendance</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Most Attended</p>
                <p className="text-2xl font-bold">Apr 10</p>
                <p className="text-xs text-muted-foreground">92% attendance</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Least Attended</p>
                <p className="text-2xl font-bold">Mar 15</p>
                <p className="text-xs text-muted-foreground">64% attendance</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Below Threshold</p>
                <p className="text-2xl font-bold text-red-500">12</p>
                <p className="text-xs text-muted-foreground">students at risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Attendance Tables */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Detailed Attendance</CardTitle>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="student">By Student</TabsTrigger>
              <TabsTrigger value="session">By Session</TabsTrigger>
              <TabsTrigger value="course">By Course</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search students..." className="w-full bg-background pl-8" />
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-center">Attendance</TableHead>
                  <TableHead className="text-center">Sessions</TableHead>
                  <TableHead className="text-center">Trend</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{student.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-none">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          student.attendance >= 80
                            ? "default"
                            : student.attendance >= 70
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {student.attendance}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {student.attended}/{student.total}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.trend === "up" ? (
                        <div className="flex items-center justify-center text-green-500">
                          <ArrowUp className="h-4 w-4" />
                        </div>
                      ) : student.trend === "down" ? (
                        <div className="flex items-center justify-center text-red-500">
                          <ArrowDown className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center text-muted-foreground">—</div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Send Notification</DropdownMenuItem>
                          <DropdownMenuItem>Export Data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>10</strong> of <strong>42</strong> results
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>Export your report in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <Button variant="outline" className="flex flex-col items-center justify-center gap-2 h-24">
              <FileText className="h-8 w-8" />
              <span>PDF Report</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center gap-2 h-24">
              <Download className="h-8 w-8" />
              <span>Excel/CSV</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center gap-2 h-24">
              <Printer className="h-8 w-8" />
              <span>Print View</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center gap-2 h-24">
              <Mail className="h-8 w-8" />
              <span>Email Report</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center gap-2 h-24">
              <Calendar className="h-8 w-8" />
              <span>Schedule Reports</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="mr-1 h-4 w-4" />
            Preview will be generated based on selected format
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share Report
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

// Sample data for charts
const attendanceData = [
  { date: "Mar 1", attendance: 82, color: "#22c55e" },
  { date: "Mar 8", attendance: 75, color: "#f59e0b" },
  { date: "Mar 15", attendance: 64, color: "#ef4444" },
  { date: "Mar 22", attendance: 78, color: "#f59e0b" },
  { date: "Mar 29", attendance: 85, color: "#22c55e" },
  { date: "Apr 5", attendance: 80, color: "#22c55e" },
  { date: "Apr 10", attendance: 92, color: "#22c55e" },
  { date: "Apr 17", attendance: 76, color: "#f59e0b" },
  { date: "Apr 24", attendance: 88, color: "#22c55e" },
]

const trendData = [
  { week: "Week 1", current: 82, previous: 78 },
  { week: "Week 2", current: 75, previous: 80 },
  { week: "Week 3", current: 64, previous: 72 },
  { week: "Week 4", current: 78, previous: 76 },
  { week: "Week 5", current: 85, previous: 70 },
  { week: "Week 6", current: 80, previous: 74 },
  { week: "Week 7", current: 92, previous: 82 },
  { week: "Week 8", current: 76, previous: 78 },
]

const distributionData = [
  { name: "Excellent", value: 15, fill: "#22c55e" },
  { name: "Good", value: 20, fill: "#84cc16" },
  { name: "Average", value: 25, fill: "#f59e0b" },
  { name: "Below Average", value: 18, fill: "#f97316" },
  { name: "Poor", value: 12, fill: "#ef4444" },
]

// Sample data for student table
const studentData = [
  {
    id: "S001",
    name: "Justin",
    email: "justin.j@uow.edu.au",
    initials: "JJ",
    attendance: 92,
    attended: 11,
    total: 12,
    trend: "up",
  },
  {
    id: "S002",
    name: "Deepak",
    email: "deepak.d@uow.edu.au",
    initials: "DD",
    attendance: 83,
    attended: 10,
    total: 12,
    trend: "none",
  },
  {
    id: "S003",
    name: "Thu Nguyen",
    email: "thu.n@uow.edu.au",
    initials: "TN",
    attendance: 75,
    attended: 9,
    total: 12,
    trend: "down",
  },
  {
    id: "S004",
    name: "Tuan Nguyen",
    email: "tuan.n@uow.edu.au",
    initials: "TN",
    attendance: 58,
    attended: 7,
    total: 12,
    trend: "down",
  },
  {
    id: "S005",
    name: "Chang",
    email: "chang.c@uow.edu.au",
    initials: "CC",
    attendance: 67,
    attended: 8,
    total: 12,
    trend: "up",
  },
  {
    id: "S006",
    name: "Sophia Chen",
    email: "sophia.c@university.edu",
    initials: "SC",
    attendance: 100,
    attended: 12,
    total: 12,
    trend: "none",
  },
  {
    id: "S007",
    name: "David Rodriguez",
    email: "david.r@university.edu",
    initials: "DR",
    attendance: 92,
    attended: 11,
    total: 12,
    trend: "up",
  },
  {
    id: "S008",
    name: "Olivia Martinez",
    email: "olivia.m@university.edu",
    initials: "OM",
    attendance: 50,
    attended: 6,
    total: 12,
    trend: "down",
  },
  {
    id: "S009",
    name: "William Taylor",
    email: "william.t@university.edu",
    initials: "WT",
    attendance: 83,
    attended: 10,
    total: 12,
    trend: "none",
  },
  {
    id: "S010",
    name: "Ava Anderson",
    email: "ava.a@university.edu",
    initials: "AA",
    attendance: 75,
    attended: 9,
    total: 12,
    trend: "up",
  },
]
