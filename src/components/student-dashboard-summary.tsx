"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const studentData = [
  { name: "Manish", score: 98, trend: "up", status: "Attentive", solutions: "4/9", notes: "5/8" },
  { name: "Ravi", score: 21, trend: "down", status: "Distractive", solutions: "4/9", notes: "5/8" },
  { name: "Kishan", score: 28, trend: "down", status: "Distractive", solutions: "4/9", notes: "5/8" },
  { name: "Ashish", score: 98, trend: "up", status: "Attentive", solutions: "4/9", notes: "5/8" },
  { name: "Harish", score: 98, trend: "up", status: "Attentive", solutions: "4/9", notes: "5/8" },
  { name: "Ajay", score: 4, trend: "down", status: "Distractive", solutions: "4/9", notes: "5/8" },
  { name: "Monica", score: 98, trend: "up", status: "Attentive", solutions: "4/9", notes: "5/8" },
]

export default function StudentDashboardSummary() {
  const analyticsData = [
    { label: "Attentive Students", percentage: 63, count: 8, color: "bg-green-500", textColor: "text-green-600" },
    { label: "Non-Attentive Students", percentage: 38, count: 4, color: "bg-pink-500", textColor: "text-pink-600" },
    { label: "Camera Off Students", percentage: 22, count: 2, color: "bg-orange-500", textColor: "text-orange-600" },
    { label: "Not in Camera Students", percentage: 14, count: 1, color: "bg-gray-600", textColor: "text-gray-600" },
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
    <div className="min-h-screen bg-gray-50 px-4">
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
        <p className="text-sm text-gray-600">Class Attentiveness</p>
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
                  <p className="text-lg font-bold text-gray-600 mb-1">Need Attention</p>
                  <p className="text-4xl font-bold text-red-500 mb-2">3</p>
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
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color.replace('bg-', '#') }}></div>
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

          {/* Chart.js Graph */}
          <Card className="h-full bg-white border-0 shadow-md p-6">
            <div className="mb-4">
              <CardTitle className="text-2xl font-bold">Student Attentiveness Overview</CardTitle>
              <p className="text-sm text-gray-500">Analytics and Performance Metrics</p>
            </div>
            <div className="h-64">
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
          <Card className="bg-white border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Student Attentiveness Overview</CardTitle>
              <p className="text-sm text-gray-500">Analytics and Performance Metrics</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Solutions</TableHead>
                    <TableHead>Notes</TableHead>
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
