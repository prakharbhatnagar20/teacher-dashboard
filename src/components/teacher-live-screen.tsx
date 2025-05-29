"use client";

import React, { useEffect, useState } from "react";
import { Eye, Clock, ChevronLeft } from "lucide-react";
import { io } from "socket.io-client";
import { Button } from "./ui/button";
import useMetricsStore from "@/lib/store";

interface MetricCardProps {
  title: string;
  count: number;
  imageSrc: string;
  bgColor: string;
  textColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  count,
  imageSrc,
  bgColor,
  textColor,
}) => (
  <div className={`${bgColor} rounded-xl p-6 h-45 relative shadow-md`}>
    <div className="text-xl font-medium text-gray-700 ">{title}</div>
    <div className={`text-5xl font-bold mb-1 mt-2 ${textColor}`}>{count}</div>
    
    <img
      src={imageSrc}
      alt={title}
      className="w-28 h-26 absolute bottom-0 right-0 opacity-90"
    />
  </div>
);
const socket = io("http://localhost:3000");

const ClassroomDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'solutions' | 'notes'>('solutions');

  const [metrics, setMetrics] = useState({
    attentiveCount: 4,
    inattentiveCount: 1,
    cameraOffCount: 1,    notDetectedCount: 0,
  });

  const [totalStudents, setTotalStudents] = useState(6);
  const [averageAttentiveness, setAverageAttentiveness] = useState(0);

  const mockSubmissions = Array(9).fill(null).map((_, index) => ({
    id: index + 1,
    studentName: "Anirush Sharma",
    imageUrl: "/images/notes.jpg",
  }));

  const setMetricsData = useMetricsStore((state: any) => state.setMetricsData);

    useEffect(() => {
    socket.emit("join-session", { teacherId: "teacher100" });

    socket.on("update-metrics", (data) => {
      const latest = data.graphMetrics?.[data.graphMetrics.length - 1];
      console.log("Latest metrics received:", latest);
      if (latest) {
        // setMetrics({
        //   attentiveCount: latest.attentiveCount,
        //   inattentiveCount: latest.inattentiveCount,
        //   cameraOffCount: latest.cameraOffCount,
        //   notDetectedCount: latest.notDetectedCount,
        // });
      }
    });

    return () => {
      socket.emit("leave-session", { teacherId: "teacher100" });
      socket.off("update-metrics");
    };
  }, []);
   const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
  let intervalId;

  const fetchMetrics = async () => {
    try {
      const response = await fetch("https://testsetup-er18.onrender.com/api/attendance"); // Replace with your actual API URL
      const data = await response.json();

      console.log("Fetched metrics:", data);

      if (data && typeof data === "object") {
        setMetrics({
          attentiveCount: data.attentive || 0,
          inattentiveCount: data.nonAttentive || 0,
          cameraOffCount: data.camOff || 0,
          notDetectedCount: data.notDetected || 0,
        });

        // setTotalStudents(data.totalStudents || 0);
        setAverageAttentiveness(data.averageAttentiveness || 0);

        setMetricsData(data);



      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  // Initial fetch
  fetchMetrics();

  // Poll every 10 seconds
  intervalId = setInterval(fetchMetrics, 10000);

  // Cleanup on component unmount
  return () => clearInterval(intervalId);
}, []);

   const formatTime = (secs:any) => {
    const mins = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const sec = (secs % 60).toString().padStart(2, "0");
    return `${mins}:${sec}`;
  };

  return (
    <div className="max-w-9xl mx-auto space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white w-full flex items-center gap-4 mb-8 py-4 px-10">
          <Button variant="ghost" size="sm" className="p-0">
          

            <ChevronLeft className="h-5 w-5 cursor-pointer" />
           
            <span className="ml-1 text-lg">Live Tracking</span>
          </Button>
        </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[16rem] px-10">
        
        {/* Live Classroom */}
        <div className="bg-white rounded-lg p-6 shadow-sm py-10 flex flex-col">
          {/* <h2 className="text-3xl font-bold mb-10">Live Classroom</h2> */}
          <div className="w-full h-5"></div>
           <div
        style={{
          left: 0,
          width: '100%',
          height: '100%',
          position: 'relative',
          // paddingBottom: '46.25%',
        }}
      
      >
        <div className="w-full h-10"></div>
        <iframe
          src="https://cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fyoutu.be%2FDx5qFachd3A&key=925108d922be940af814f71907a7df4b"
          style={{
            top: -10,
            left: 0,
            width: '100%',
            height: '95%',
            position: 'absolute',
            border: 0,
            borderRadius: '12px',
          }}
          allowFullScreen
          scrolling="no"
          allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *"
        ></iframe>
      </div>
          <div className="flex items-center gap-6 text-gray-600 justify-between">
            <div className="flex items-center gap-2 ">
              <Eye className="w-5 h-5 to-blue-400" />
              <span>Viewers: 12</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Duration: {formatTime(seconds)} Mins</span>
            </div>
          </div>
        </div>

        {/* Real-time Class Attention */}
        <div className="bg-white rounded-lg py-10 px-10 shadow-sm flex flex-col relative ">
          {/* Total Students (Top-right badge) */}
          <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full shadow">
            Total Students: {totalStudents}
          </div>

          <h2 className="text-3xl font-bold mb-2">Real-time Class Attention</h2>
          <p className="text-gray-500 text-lg mb-4">Live attention percentage tracking</p>
          <div className="grid grid-cols-2 gap-4">
            <MetricCard title="Attentive Students" count={metrics.attentiveCount} imageSrc="/icons/image3.png" bgColor="bg-green-50" textColor="text-green-600" />
            <MetricCard title="Non-Attentive Students" count={metrics.inattentiveCount} imageSrc="/icons/image4.png" bgColor="bg-red-50" textColor="text-red-600" />
            <MetricCard title="Camera Off Students" count={metrics.cameraOffCount} imageSrc="/icons/image5.png" bgColor="bg-orange-50" textColor="text-orange-500" />
            <MetricCard title="Not in Camera Students" count={metrics.notDetectedCount} imageSrc="/icons/image6.png" bgColor="bg-gray-50" textColor="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Student Submissions */}
      <div className="px-10 pb-2">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Student Submissions</h2>
          <div className="flex gap-2 bg-gray-100 rounded-4xl">
            <button
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'solutions'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'bg-gray-100 text-gray-500'
              }`}
              onClick={() => setActiveTab('solutions')}
            >
              Solutions
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'notes'
                  ? 'bg-white text-orange-500 shadow-sm'
                  : 'bg-gray-100 text-gray-500'
              }`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-1">
          {mockSubmissions.map((submission) => (
            <div key={submission.id} className="group">
              <div className="relative overflow-hidden rounded-lg mb-2">
                <img
                  src={submission.imageUrl}
                  alt={submission.studentName}
                  className="h-30 w-50 object-cover"
                />
              </div>
              <div className="gap-2">
                <h3 className="font-medium text-gray-900">{submission.studentName}</h3>
                <span className={
                  activeTab === 'solutions' 
                    ? 'text-green-600 font-semibold' 
                    : 'text-orange-500 font-semibold'
                }>
                  {activeTab === 'solutions' ? 'Solution' : 'Notes'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ClassroomDashboard;
