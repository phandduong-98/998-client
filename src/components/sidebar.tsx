"use client";

import { usePathname } from "next/navigation";
import {
  BarChart3,
  Globe,
  Home,
  QrCode,
  Users,
  FileBarChart,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r">
      <div className="flex h-16 items-center border-b px-4">
        <span className="text-lg font-semibold">QR Attendance</span>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/lecturer"}
                >
                  <a href="/lecturer">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/lecturer/qr-generation"}
                >
                  <a href="/lecturer/qr-generation">
                    <QrCode className="h-4 w-4" />
                    <span>QR Code Generation</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === "/lecturer/attendance-tracking" ||
                    pathname === "/lecturer/attendance-tracking"
                  }
                >
                  <a href="/lecturer/attendance-tracking">
                    <BarChart3 className="h-4 w-4" />
                    <span>Attendance Tracking</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/lecturer/reports"}
                >
                  <a href="/lecturer/reports">
                    <FileBarChart className="h-4 w-4" />
                    <span>Reports & Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/lecturer/student-management"}
                >
                  <a href="/lecturer/student-management">
                    <Users className="h-4 w-4" />
                    <span>Student Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/lecturer/geolocation"}
                >
                  <a href="/geolocation">
                    <Globe className="h-4 w-4" />
                    <span>Geolocation Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/lecturer/integration"}
                >
                  <a href="/lecturer/integration">
                    <Settings className="h-4 w-4" />
                    <span>System Integration</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
