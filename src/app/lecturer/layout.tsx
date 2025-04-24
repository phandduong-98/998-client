"use client";

import { type ReactNode, useState } from "react";
import { Menu, QrCode, Bell, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNav } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

// Main Layout Component
export default function LecturerLayout({ children }: { children: ReactNode }) {
  const [selectedCourse, setSelectedCourse] = useState("CSIT883");
  const pathname = usePathname();
  const showCourseSelector = pathname?.includes('qr-generation');
  
  const courses = [
    { value: "CSIT883", label: "Introduction to Computer Science - CSIT883" },
    { value: "CSIT884", label: "Data Structures - CSIT884" },
    { value: "CSIT885", label: "Algorithms - CSIT885" },
    { value: "CSIT886", label: "Database Systems - CSIT886" },
    { value: "CSIT887", label: "Software Engineering - CSIT887" }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          {/* Left section - Logo and mobile menu */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 sm:max-w-xs">
                <SidebarNav />
              </SheetContent>
            </Sheet>
            <div className="hidden items-center gap-2 md:flex">
              <QrCode className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">QR Attendance</span>
            </div>
          </div>

          {/* Middle section - Course selector, only shown on qr-generation routes */}
          <div className="flex flex-1 items-center justify-center px-4">
            {showCourseSelector ? (
              <div className="relative w-full max-w-md">
                <Select
                  defaultValue={selectedCourse}
                  onValueChange={setSelectedCourse}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem 
                        key={course.value} 
                        value={course.value}
                      >
                        {course.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              // Empty div to maintain layout spacing when selector is hidden
              <div className="w-full" />
            )}
          </div>

          {/* Right section - Notification, Theme, User */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="sr-only">Notifications</span>
                      <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        8
                      </Badge>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Sun className="h-5 w-5" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <UserNav />
          </div>
        </header>
        <div className="grid lg:grid-cols-[240px_1fr]">
          <div className="hidden border-r bg-muted/40 lg:block">
            <SidebarNav />
          </div>
          <main className="relative z-0 flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
