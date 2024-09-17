import Link from 'next/link';
import Image from 'next/image';

export default function SidebarNavigation() {
  return (
    <nav className="w-64 bg-gray-800 shadow-lg h-full flex flex-col">
      <div className="p-4">
        <Link href="/dashboard">
          <Image
            src="/images/logo2.png"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </Link>
      </div>
      <div className="flex-grow py-4 px-4">
        <ul className="space-y-6">
          <li className="mb-4">
            <Link href="/dashboard" className="text-purple-400 hover:text-purple-100">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link href="/health-metrics" className="text-purple-400 hover:text-purple-100">Health Metrics</Link>
          </li>
          <li className="mb-4">
            <Link href="/history" className="text-purple-400 hover:text-purple-100">History</Link>
          </li>
          <li className="mb-4">
            <Link href="/settings" className="text-purple-400 hover:text-purple-100">Settings</Link>
          </li>
          <li className="mb-4">
            <Link href="/support" className="text-purple-400 hover:text-purple-100">Support/Help</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
