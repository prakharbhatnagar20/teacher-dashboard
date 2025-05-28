"use client"

import { ChevronLeft, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const studentData = [
  {
    name: "Manish",
    score: 98,
    trend: "up",
    status: "Attentive",
    solutions: "4/9",
    notes: "5/8",
  },
  {
    name: "Ravi",
    score: 21,
    trend: "down",
    status: "Distractive",
    solutions: "4/9",
    notes: "5/8",
  },
  {
    name: "Kishan",
    score: 28,
    trend: "down",
    status: "Distractive",
    solutions: "4/9",
    notes: "5/8",
  },
  {
    name: "Ashish",
    score: 98,
    trend: "up",
    status: "Attentive",
    solutions: "4/9",
    notes: "5/8",
  },
  {
    name: "Harish",
    score: 98,
    trend: "up",
    status: "Attentive",
    solutions: "4/9",
    notes: "5/8",
  },
  {
    name: "Ajay",
    score: 4,
    trend: "down",
    status: "Distractive",
    solutions: "4/9",
    notes: "5/8",
  },
  {
    name: "Monica",
    score: 98,
    trend: "up",
    status: "Attentive",
    solutions: "4/9",
    notes: "5/8",
  },
]

const generateAttentivenessData = () => {
  const data = []
  const now = new Date()
  for (let i = 19; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000) // 1 minute intervals
    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      attentiveness: Math.floor(Math.random() * 40) + 50, // Random between 50-90
    })
  }
  return data
}

export default function StudentDashboardSummary() {
  const [attentivenessData, setAttentivenessData] = useState(generateAttentivenessData())
  const [currentAttentiveness, setCurrentAttentiveness] = useState(75)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const analyticsData = [
    {
      label: "Attentive Students",
      percentage: 63,
      count: 8,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      label: "Attentive Students",
      percentage: 38,
      count: 4,
      color: "bg-pink-500",
      textColor: "text-pink-600",
    },
    {
      label: "Camera Off Students",
      percentage: 22,
      count: 2,
      color: "bg-orange-500",
      textColor: "text-orange-600",
    },
    {
      label: "Not in Camera Students",
      percentage: 14,
      count: 1,
      color: "bg-gray-600",
      textColor: "text-gray-600",
    },
  ]

  // Simulate real-time data updates
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const now = new Date()
      const newAttentiveness = Math.floor(Math.random() * 40) + 50 // Random between 50-90

      setCurrentAttentiveness(newAttentiveness)
      setAttentivenessData((prevData) => {
        const newData = [...prevData.slice(1)] // Remove first element
        newData.push({
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          attentiveness: newAttentiveness,
        })
        return newData
      })
    }, 5000) // Update every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white w-full flex items-center gap-4 mb-8 py-4 px-10">
          <Button variant="ghost" size="sm" className="p-0">
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1 text-lg">Summary</span>
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8 px-10">Student Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 px-10">
          {/* Total Students Card */}
          <Card className="bg-orange-50 border-orange-100 relative overflow-hidden">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-600 mb-1">Total Students</p>
                  <p className="text-4xl font-bold text-orange-500 mb-2">24</p>
                  <p className="text-sm text-gray-600">Active in class</p>
                  <p className="text-2xl font-bold text-orange-400">18</p>
                </div>
                
              </div>
            </CardContent>
            <div className="absolute bottom-0 right-0 w-40 h-40 z-0 pointer-events-none">
    <Image
      src="/images/cartoon.svg"
      alt="Leaderboard Icon"
      width={160}
      height={160}
      className="object-contain"
      priority
    />
  </div>
          </Card>

          {/* Average Score Card */}
          <Card className="bg-purple-50 border-purple-100 relative overflow-hidden">
  <CardContent className="p-6 relative z-10">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-lg font-bold  text-gray-600 mb-1">Average Attentiveness</p>
        <p className="text-4xl font-bold text-purple-500 mb-2">78%</p>
        <p className="text-sm text-gray-600">Class Average</p>
        <p className="text-2xl font-bold text-purple-400">63%</p>
      </div>
    </div>
  </CardContent>

  {/* Fixed to bottom right */}
  <div className="absolute bottom-0 right-0 w-40 h-40 z-0 pointer-events-none translate-y-8">
    <Image
      src="/images/leaderboard.svg"
      alt="Leaderboard Icon"
      width={160}
      height={160}
      className="object-contain"
      priority
    />
  </div>
</Card>


          {/* High Performers Card */}
          <Card className="bg-green-50 border-green-100 relative overflow-hidden">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-600 mb-1">Total Students</p>
                  <p className="text-4xl font-bold text-green-500 mb-2">24</p>
                  <p className="text-sm text-gray-600">Active in class</p>
                  <p className="text-2xl font-bold text-green-400">18</p>
                </div>
                
              </div>
            </CardContent>
            <div className="absolute bottom-0 right-0 w-40 h-40 z-0 pointer-events-none translate-y-6">
    <Image
      src="/images/target.svg"
      alt="Leaderboard Icon"
      width={160}
      height={160}
      className="object-contain"
      priority
    />
  </div>
          </Card>

          {/* Needs Attention Card */}
          <Card className="bg-red-50 border-red-100 relative overflow-hidden">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-600 mb-1">Total Students</p>
                  <p className="text-4xl font-bold text-red-500 mb-2">24</p>
                  <p className="text-sm text-gray-600">Active in class</p>
                  <p className="text-2xl font-bold text-red-400">18</p>
                </div>
                
              </div>
            </CardContent>
            <div className="absolute bottom-0 right-0 w-40 h-40 z-0 pointer-events-none">
    <Image
      src="/images/warning.svg"
      alt="Leaderboard Icon"
      width={160}
      height={160}
      className="object-contain"
      priority
    />
  </div>
          </Card>
        </div>

        {/* Middle Section - Analytics and Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 px-10">
          {/* Left Side - Class Analytics */}
          <Card className="h-full bg-white border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Class Analytics Overview</CardTitle>
              <p className="text-sm text-gray-500">Real-time student engagement and camera status distribution</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {analyticsData.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        {index === 0 && <div className="w-4 h-4 rounded-full bg-green-500"></div>}
                        {index === 1 && <div className="w-4 h-4 rounded-full bg-pink-500"></div>}
                        {index === 2 && <div className="w-4 h-4 rounded-full bg-orange-500"></div>}
                        {index === 3 && <div className="w-4 h-4 rounded-full bg-gray-600"></div>}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{item.percentage}%</span>
                      <span className="text-sm text-gray-500">({item.count})</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3`}
                      style={{ width: `${item.percentage}%` }}
                    >
                      <span className="text-white text-xs font-medium">
                        {item.percentage > 20 ? `${item.percentage}%` : ""}
                      </span>
                    </div>
                    {item.percentage <= 20 && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 text-xs font-medium">
                        {item.percentage}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right Side - Attentiveness Graph */}
          <Card className="h-full bg-white border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">Real-time Attentiveness</CardTitle>
                  <p className="text-sm text-gray-500">Live class attention tracking over time</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{currentAttentiveness}%</div>
                  <div className="text-sm text-gray-500">Current</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 w-full">
                <svg className="w-full h-full" viewBox="0 0 600 200">
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((value) => (
                    <g key={value}>
                      <line
                        x1="50"
                        y1={180 - value * 1.6}
                        x2="580"
                        y2={180 - value * 1.6}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                      <text x="45" y={185 - value * 1.6} textAnchor="end" className="text-xs fill-gray-500">
                        {value}%
                      </text>
                    </g>
                  ))}

                  {/* Time labels */}
                  {attentivenessData
                    .filter((_, index) => index % 4 === 0)
                    .map((point, index) => (
                      <text
                        key={index}
                        x={50 + index * 4 * (530 / (attentivenessData.length - 1))}
                        y="195"
                        textAnchor="middle"
                        className="text-xs fill-gray-500"
                      >
                        {point.time}
                      </text>
                    ))}

                  {/* Attentiveness line */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={attentivenessData
                      .map((point, index) => {
                        const x = 50 + index * (530 / (attentivenessData.length - 1))
                        const y = 180 - (point.attentiveness / 100) * 160
                        return `${x},${y}`
                      })
                      .join(" ")}
                  />

                  {/* Data points */}
                  {attentivenessData.map((point, index) => {
                    const x = 50 + index * (530 / (attentivenessData.length - 1))
                    const y = 180 - (point.attentiveness / 100) * 160
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#3b82f6"
                        className={index === attentivenessData.length - 1 ? "animate-pulse" : ""}
                      />
                    )
                  })}
                </svg>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span>Updates every 5 seconds</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Attentiveness %</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Student Table */}
        <div className="px-10 mb-8">
        <Card className=" bg-white border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Student Attentiveness Overview</CardTitle>
            <p className="text-sm text-gray-500">Analytics and Performance Metrics</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Student</TableHead>
                  <TableHead className="font-semibold">Score</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Solutions</TableHead>
                  <TableHead className="font-semibold">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{student.score}%</span>
                        {student.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={student.status === "Attentive" ? "default" : "destructive"}
                        className={
                          student.status === "Attentive"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{student.solutions}</TableCell>
                    <TableCell className="font-medium">{student.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}
