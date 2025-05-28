"use client"

import { useState, useEffect } from "react"
import { Camera, Download, Eye, Clock, Users, FileText, Upload, Mic } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for real-time attention graph
const generateInitialData = () => {
  const data = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 30000) // 30 seconds intervals
    data.push({
      time: time.toLocaleTimeString([], { hour12: false, minute: "2-digit", second: "2-digit" }),
      attention: Math.floor(Math.random() * 30) + 60, // Random between 60-90
    })
  }
  return data
}

// Sample student notes data
const studentNotes = [
  {
    id: 1,
    studentName: "Emma Johnson",
    imageUrl: "/placeholder.svg?height=200&width=300&query=handwritten math notes with equations",
    timestamp: "10:30 AM",
    subject: "Quadratic Equations",
  },
  {
    id: 2,
    studentName: "Michael Chen",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math notebook with graphs and formulas",
    timestamp: "10:25 AM",
    subject: "Function Graphs",
  },
  {
    id: 3,
    studentName: "Sarah Williams",
    imageUrl: "/placeholder.svg?height=200&width=300&query=detailed math notes with diagrams",
    timestamp: "10:28 AM",
    subject: "Algebraic Solutions",
  },
  {
    id: 4,
    studentName: "David Rodriguez",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math homework with calculations",
    timestamp: "10:20 AM",
    subject: "Problem Solving",
  },
  {
    id: 5,
    studentName: "Lisa Thompson",
    imageUrl: "/placeholder.svg?height=200&width=300&query=organized math notes with highlights",
    timestamp: "10:32 AM",
    subject: "Theorem Proofs",
  },
  {
    id: 6,
    studentName: "James Wilson",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math study notes with examples",
    timestamp: "10:27 AM",
    subject: "Practice Problems",
  },
]

// Sample student submissions data
const studentSubmissions = [
  {
    id: 1,
    studentName: "Emma Johnson",
    imageUrl: "/placeholder.svg?height=200&width=300&query=completed math assignment worksheet",
    timestamp: "10:45 AM",
    assignment: "Assignment 3",
    status: "submitted",
  },
  {
    id: 2,
    studentName: "Michael Chen",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math homework solutions on paper",
    timestamp: "10:40 AM",
    assignment: "Homework 5",
    status: "submitted",
  },
  {
    id: 3,
    studentName: "Sarah Williams",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math test paper with answers",
    timestamp: "10:50 AM",
    assignment: "Quiz 2",
    status: "submitted",
  },
  {
    id: 4,
    studentName: "David Rodriguez",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math project work on graph paper",
    timestamp: "10:35 AM",
    assignment: "Project Work",
    status: "submitted",
  },
  {
    id: 5,
    studentName: "Lisa Thompson",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math exercise book with solutions",
    timestamp: "10:48 AM",
    assignment: "Exercise 4",
    status: "submitted",
  },
  {
    id: 6,
    studentName: "Alex Kumar",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math assignment in progress",
    timestamp: "10:30 AM",
    assignment: "Assignment 3",
    status: "in_progress",
  },
]

export default function TeacherLiveScreen() {
  const [attentionData, setAttentionData] = useState(generateInitialData())
  const [currentAttention, setCurrentAttention] = useState(75)
  const [isRecording, setIsRecording] = useState(false)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const newAttention = Math.floor(Math.random() * 30) + 60 // Random between 60-90

      setCurrentAttention(newAttention)
      setAttentionData((prevData) => {
        const newData = [...prevData.slice(1)] // Remove first element
        newData.push({
          time: now.toLocaleTimeString([], { hour12: false, minute: "2-digit", second: "2-digit" }),
          attention: newAttention,
        })
        return newData
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Calculate max value for graph scaling
  const maxAttention = Math.max(...attentionData.map((d) => d.attention))
  const minAttention = Math.min(...attentionData.map((d) => d.attention))
  const range = maxAttention - minAttention || 1

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-9xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Classroom</h1>
            <p className="text-gray-600">Mathematics - Class 10A • Session in Progress</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="default" className="bg-green-600">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              Live
            </Badge>
            <Button
              variant={isRecording ? "destructive" : "default"}
              onClick={() => setIsRecording(!isRecording)}
              className="flex items-center gap-2"
            >
              <div className={`w-3 h-3 rounded-full ${isRecording ? "bg-white" : "bg-red-500"}`}></div>
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
          </div>
        </div>

        {/* Top Section - Camera and Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Teacher Camera - Left */}
          <div className="lg:col-span-4">
            <Card className="h-full bg-white shadow-lg border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Teacher Camera
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  {/* Live video feed */}
                  <div className="relative w-full h-full">
                    <video
                      autoPlay
                      muted
                      controls={false}
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=300&width=400&query=video loading"
                    >
                      <source
                        src="https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8"
                        type="application/x-mpegURL"
                      />
                      <source
                        src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
                        type="application/x-mpegURL"
                      />
                      Your browser does not support the video tag.
                    </video>

                    {/* Live indicator overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 bg-black bg-opacity-50 px-2 py-1 rounded-md">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-medium">LIVE</span>
                    </div>

                    {/* Video time counter */}
                    <div className="absolute top-3 right-3 bg-black bg-opacity-50 px-2 py-1 rounded-md">
                      <span className="text-white text-xs font-medium">45:32</span>
                    </div>
                  </div>

                  {/* Camera controls overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 bg-black bg-opacity-50 border-0 hover:bg-opacity-70"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 bg-black bg-opacity-50 border-0 hover:bg-opacity-70"
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="destructive" className="h-8 px-3 py-0 text-xs">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                        REC
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Camera stats */}
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span>Viewers: 28</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>Duration: 45:32</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-blue-600" />
                    <span>1080p HD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-green-600" />
                    <span>Audio: ON</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Attention Graph - Right */}
          <div className="lg:col-span-8">
            <Card className="h-full bg-white shadow-lg border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Real-time Class Attention
                    </CardTitle>
                    <CardDescription>Live attention percentage tracking</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{currentAttention}%</div>
                    <div className="text-sm text-gray-500">Current</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 w-full">
                  {/* Graph container */}
                  <svg className="w-full h-full" viewBox="0 0 800 200">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((value) => (
                      <g key={value}>
                        <line
                          x1="60"
                          y1={180 - value * 1.6}
                          x2="780"
                          y2={180 - value * 1.6}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                        <text x="50" y={185 - value * 1.6} textAnchor="end" className="text-xs fill-gray-500">
                          {value}%
                        </text>
                      </g>
                    ))}

                    {/* Time labels */}
                    {attentionData
                      .filter((_, index) => index % 5 === 0)
                      .map((point, index) => (
                        <text
                          key={index}
                          x={60 + index * 5 * (720 / (attentionData.length - 1))}
                          y="195"
                          textAnchor="middle"
                          className="text-xs fill-gray-500"
                        >
                          {point.time}
                        </text>
                      ))}

                    {/* Attention line */}
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={attentionData
                        .map((point, index) => {
                          const x = 60 + index * (720 / (attentionData.length - 1))
                          const y = 180 - (point.attention / 100) * 160
                          return `${x},${y}`
                        })
                        .join(" ")}
                    />

                    {/* Data points */}
                    {attentionData.map((point, index) => {
                      const x = 60 + index * (720 / (attentionData.length - 1))
                      const y = 180 - (point.attention / 100) * 160
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#3b82f6"
                          className={index === attentionData.length - 1 ? "animate-pulse" : ""}
                        />
                      )
                    })}
                  </svg>
                </div>

                {/* Graph legend */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <span>Updates every 3 seconds</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Attention %</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Student Notes and Submissions */}
        <div className="space-y-6">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Student Notes ({studentNotes.length})
              </TabsTrigger>
              <TabsTrigger value="submissions" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Submissions ({studentSubmissions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="mt-6">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Student Notes</CardTitle>
                  <CardDescription>Real-time notes shared by students during the class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studentNotes.map((note) => (
                      <div key={note.id} className="space-y-3">
                        <div className="relative group">
                          <img
                            src={note.imageUrl || "/placeholder.svg"}
                            alt={`Notes by ${note.studentName}`}
                            className="w-full h-48 object-cover rounded-lg border shadow-sm group-hover:shadow-md transition-shadow"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="text-xs">
                              {note.timestamp}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium text-gray-900">{note.studentName}</h4>
                          <p className="text-sm text-gray-600">{note.subject}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submissions" className="mt-6">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Assignment Submissions</CardTitle>
                  <CardDescription>Student assignment and homework submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studentSubmissions.map((submission) => (
                      <div key={submission.id} className="space-y-3">
                        <div className="relative group">
                          <img
                            src={submission.imageUrl || "/placeholder.svg"}
                            alt={`Submission by ${submission.studentName}`}
                            className="w-full h-48 object-cover rounded-lg border shadow-sm group-hover:shadow-md transition-shadow"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              variant={submission.status === "submitted" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {submission.status === "submitted" ? "Submitted" : "In Progress"}
                            </Badge>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge variant="outline" className="text-xs bg-white">
                              {submission.timestamp}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium text-gray-900">{submission.studentName}</h4>
                          <p className="text-sm text-gray-600">{submission.assignment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
