"use client";

import React, { useState } from "react";
import { Eye, Clock } from "lucide-react";

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
  <div className={`${bgColor} rounded-xl p-6 h-40 relative shadow-md`}>
    <div className={`text-4xl font-bold mb-1 ${textColor}`}>{count}</div>
    <div className="text-md font-medium text-gray-700">{title}</div>
    <img
      src={imageSrc}
      alt={title}
      className="w-16 h-16 absolute bottom-3 right-3 opacity-90"
    />
  </div>
);

const ClassroomDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'solutions' | 'notes'>('solutions');

  const mockSubmissions = Array(9).fill(null).map((_, index) => ({
    id: index + 1,
    studentName: "Anirush Sharma",
    imageUrl: "/icons/chat.png",
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 bg-gray-50 min-h-screen">
      <header className="flex items-center gap-2 mb-6">
        <button className="text-gray-600">
          <span className="flex items-center gap-2">
            ← CSAT 55 : Permutation and Combination (Part 03), Probability
          </span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[28rem]">
        
        {/* Live Classroom */}
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Live Classroom</h2>
          <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
            <img 
              src="/icons/class.png"
              alt="Live classroom session"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>Viewers: 12</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Duration: 18:45 Mins</span>
            </div>
          </div>
        </div>

        {/* Real-time Class Attention */}
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col relative">
          {/* Total Students (Top-right badge) */}
          <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full shadow">
            Total Students: 18
          </div>

          <h2 className="text-2xl font-bold mb-2">Real-time Class Attention</h2>
          <p className="text-gray-500 text-sm mb-6">Live attention percentage tracking</p>
          <div className="grid grid-cols-2 gap-4">
            <MetricCard title="Attentive Students" count={9} imageSrc="/icons/image4.png" bgColor="bg-green-50" textColor="text-green-600" />
            <MetricCard title="Non-Attentive Students" count={4} imageSrc="/icons/image5.png" bgColor="bg-red-50" textColor="text-red-600" />
            <MetricCard title="Camera Off Students" count={3} imageSrc="/icons/image6.png" bgColor="bg-orange-50" textColor="text-orange-500" />
            <MetricCard title="Not in Camera Students" count={2} imageSrc="/icons/image3.png" bgColor="bg-gray-50" textColor="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Student Submissions */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Student Submissions</h2>
          <div className="flex gap-2">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockSubmissions.map((submission) => (
            <div key={submission.id} className="group">
              <div className="relative overflow-hidden rounded-lg mb-2">
                <img
                  src={submission.imageUrl}
                  alt={submission.studentName}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="flex justify-between items-center">
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
  );
};

export default ClassroomDashboard;
