'use client'

import { useState, useEffect } from 'react';
import { auth, db } from '../(auth)/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

// Components
import SidebarNavigation from '../../components/SidebarNavigation';
import HealthMetricsSummary from '../../components/HealthMetricsSummary';
import TrendsChart from '../../components/TrendsChart';
import Notifications from '../../components/Notifications';
import QuickActionButton from '../../components/QuickActionButton';

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data()); // Retrieve the full data, including fullName
        } else {
          console.log('No such document!');
        }
      } else {
        router.push('/signin');
      }
    };

    fetchUserData();
  }, [router]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { fullName } = userData; // Assuming the document has a fullName field

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-4 text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          // Close (X) icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Hamburger icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Sidebar Navigation */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 bg-gray-800`}>
        <SidebarNavigation />
      </div>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Display Hello, fullName */}
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">Hello, {fullName || 'User'}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Health Metrics Summary */}
          <div className="md:col-span-2 bg-gray-800 p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Health Metrics Summary</h2>
            <HealthMetricsSummary />
          </div>

          {/* Notifications */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Notifications</h2>
            <Notifications />
          </div>

          {/* Trends Chart */}
          <div className="md:col-span-2 bg-gray-800 p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Trends</h2>
            <TrendsChart />
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <QuickActionButton action="Measure Oxygen & BPM" />
              <QuickActionButton action="Measure Weight" />
              <QuickActionButton action="Measure Height" />
              <QuickActionButton action="BIA Analysis" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
