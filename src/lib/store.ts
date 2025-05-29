import { create } from 'zustand';

const useMetricsStore = create((set) => ({
  // Metrics
  attentiveCount: 0,
  inattentiveCount: 0,
  cameraOffCount: 0,
  notDetectedCount: 0,
  totalStudents: 0,
  averageAttentiveness: 0,

  // Setter function
  setMetricsData: (data : any) =>
    set({
      attentiveCount: data.attentive || 0,
      inattentiveCount: data.nonAttentive || 0,
      cameraOffCount: data.camOff || 0,
      notDetectedCount: data.notDetected || 0,
      totalStudents: data.totalStudents || 0,
      averageAttentiveness: data.averageAttentiveness || 0,
    }),
}));
export default useMetricsStore;
