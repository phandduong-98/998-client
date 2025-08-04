const todaysClasses = [
  {
    id: "cs101",
    name: "Computer Science 101",
    time: "9:00 AM - 10:30 AM",
    location: "Room A-204",
    status: "present" as const,
    attendance: 85,
  },
  {
    id: "math201",
    name: "Mathematics 201",
    time: "11:00 AM - 12:30 PM",
    location: "Room B-105",
    status: "upcoming" as const,
    attendance: 72,
  },
  {
    id: "phy301",
    name: "Physics 301",
    time: "2:00 PM - 3:30 PM",
    location: "Lab C-301",
    status: "absent" as const,
    attendance: 68,
  },
]

const recentActivity = [
  {
    course: "Computer Science 101",
    date: "Today, 9:15 AM",
    status: "present" as const,
  },
  {
    course: "Mathematics 201",
    date: "Yesterday, 11:10 AM",
    status: "present" as const,
  },
  {
    course: "Physics 301",
    date: "Yesterday, 2:05 PM",
    status: "absent" as const,
  },
]

export const mockData = { recentActivity, todaysClasses }
