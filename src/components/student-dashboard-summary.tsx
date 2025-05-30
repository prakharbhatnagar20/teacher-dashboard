"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Users,
  FileText,
} from "lucide-react"
import {
  Button
} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Badge
} from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import Image from "next/image"

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import Link from "next/link"
import useMetricsStore from "@/lib/store"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const studentData = [
  { name: "Saksham", score: 98, trend: "up", status: "Attentive", solutions: "4/9", notes: "5/8" },
  { name: "Ravi", score: 21, trend: "down", status: "Distractive", solutions: "4/9", notes: "5/8" },
  { name: "Kishan", score: 28, trend: "down", status: "Distractive", solutions: "4/9", notes: "5/8" },
  { name: "Ashish", score: 98, trend: "up", status: "Attentive", solutions: "4/9", notes: "5/8" },
  { name: "Harish", score: 98, trend: "up", status: "Attentive", solutions: "4/9", notes: "5/8" },
  { name: "Ajay", score: 4, trend: "down", status: "Distractive", solutions: "4/9", notes: "5/8" },
  { name: "Monica", score: 98, trend: "up", status: "Attentive", solutions: "4/9", notes: "5/8" },
]

export default function StudentDashboardSummary() {
  const analyticsData = [
    { label: "Attentive Students", percentage: 63, count: 6, color: "bg-green-500", textColor: "text-green-600", imageSrc: "/images/eye.svg" },
    { label: "Non-Attentive Students", percentage: 18, count: 1, color: "bg-pink-500", textColor: "text-pink-600", imageSrc: "/images/notAttentive.svg" },
    { label: "Camera Off Students", percentage: 19, count: 1, color: "bg-orange-500", textColor: "text-orange-600", imageSrc: "/images/videoOn.svg" },
    { label: "Not in Frame", percentage: 0, count: 0, color: "bg-gray-600", textColor: "text-gray-600", imageSrc: "/images/notInframe.svg" },
  ]

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 12 } } },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          callback: value => `${value}%`,
          font: { size: 12 },
        },
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
      },
    },
    elements: {
      line: { tension: 0.4 },
      point: { radius: 3, hoverRadius: 5 },
    },
  }

  const chartLabels = ['5 Mins', '10 Mins', '15 Mins', '20 Mins', '25 Mins']

  const attentiveCount = useMetricsStore((state: any)=> state.attentiveCount);
const totalStudents = useMetricsStore((state: any) => state.totalStudents);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Attentive',
        data: [45, 85, 75, 90, 80],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
      {
        label: 'Non-Attentive',
        data: [15, 60, 45, 30, 80],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
      {
        label: 'Camera Off',
        data: [30, 40, 55, 45, 65],
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
      },
      {
        label: 'Not in Camera',
        data: [75, 35, 25, 40, 15],
        borderColor: '#374151',
        backgroundColor: 'rgba(55, 65, 81, 0.5)',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white w-full flex items-center gap-4 mb-8 py-4 px-10">
          <Button variant="ghost" size="sm" className="p-0">
            <Link href="/livetracking">

            <ChevronLeft className="h-5 w-5 cursor-pointer" />
            </Link>
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
                  <p className="text-4xl font-bold text-orange-500 mb-2">6</p>
                  <p className="text-sm text-gray-600">Active in class</p>
                  <p className="text-2xl font-bold text-orange-400">5</p>
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
        <p className="text-sm text-gray-600">Active in class</p>
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
                  <p className="text-lg font-bold text-gray-600 mb-1">High Performers</p>
                  <p className="text-4xl font-bold text-green-500 mb-2">2</p>
                  <p className="text-sm text-gray-600">Active in class</p>
                  <p className="text-2xl font-bold text-green-400">5</p>
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
                  <p className="text-lg font-bold text-gray-600 mb-1">Need Attention</p>
                  <p className="text-4xl font-bold text-red-500 mb-2">1</p>
                  <p className="text-sm text-gray-600">Active in class</p>
                  <p className="text-2xl font-bold text-red-400">5</p>
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

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 px-10">
          {/* Analytics Overview */}
          <Card className="h-full bg-white border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Class Analytics Overview</CardTitle>
              <p className="text-sm text-gray-500">Real-time student engagement and camera status distribution</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {analyticsData.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color.replace('bg-', '#') }}>
                        <img src={item.imageSrc} alt={item.label} className="w-6 h-6 mr-2" />
                      </div>
                      <span className="text-lg font-medium text-gray-700">{item.label}</span>
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

          {/* Chart.js Graph */}
          <Card className="h-full bg-white border-0 shadow-md p-6">
            <div className="mb-4">
              <CardTitle className="text-2xl font-bold">Student Attentiveness Overview</CardTitle>
              <p className="text-sm text-gray-500">Analytics and Performance Metrics</p>
            </div>
            <div className="h-74">
              <Line options={chartOptions} data={chartData} />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 justify-center">
              {chartData.datasets.map((dataset, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: dataset.borderColor as string }}
                  ></div>
                  <span className="text-sm text-gray-700">{dataset.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Student Table */}
        <div className="px-10 mb-8">
          <Card className="bg-white border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              
              Student Attentiveness Overview
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">Analytics and Performance Metrics</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Student</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Score</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Solutions</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentData.map((student, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-blue-50/50 transition-colors duration-200 border-b border-gray-100"
                    >
                      <TableCell className="font-medium py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="text-gray-900">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-gray-800">{student.score}%</span>
                            {student.trend === "up" ? (
                              <div className="p-1 bg-green-100 rounded-full">
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              </div>
                            ) : (
                              <div className="p-1 bg-red-100 rounded-full">
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              </div>
                            )}
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${student.score >= 80 ? "bg-green-500" : student.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${student.score}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Badge
                          variant={student.status === "Attentive" ? "default" : "destructive"}
                          className={`${
                            student.status === "Attentive"
                              ? "bg-green-500 hover:bg-green-600 text-white border-0"
                              : "bg-red-500 hover:bg-red-600 text-white border-0"
                          } px-3 py-1 rounded-full font-medium shadow-sm`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              student.status === "Attentive" ? "bg-green-200" : "bg-red-200"
                            }`}
                          ></div>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-800">{student.solutions}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="font-semibold text-gray-800">{student.notes}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}
