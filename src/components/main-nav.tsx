"use client";

import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";

export function MainNav() {
  const [selectedCourse, setSelectedCourse] = useState({
    name: "Introduction to Computer Science - CSIT883",
    value: "csit883"
  });

  const courses = [
    { name: "Introduction to Computer Science - CSIT883", value: "csit883" },
    { name: "Data Structures and Algorithms - CSIT884", value: "csit884" },
    { name: "Web Development - CSIT885", value: "csit885" },
    { name: "Artificial Intelligence - CSIT886", value: "csit886" }
  ];

  return (
    <div className="flex items-center gap-6">
      <a href="#" className="flex items-center gap-2 font-semibold">
        <span className="text-xl font-bold text-primary">QR Attendance</span>
      </a>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-4 hidden md:flex">
            {selectedCourse.name}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {courses.map((course) => (
            <DropdownMenuItem 
              key={course.value} 
              onClick={() => setSelectedCourse(course)}
            >
              {course.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
