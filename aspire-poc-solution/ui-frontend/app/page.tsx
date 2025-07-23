'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Intelligent Inventory System</h1>
      
      <div className="space-x-4">
        <button
          onClick={() => router.push('/hospitals')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
        >
          Go to Hospitals
        </button>

        <button
          onClick={() => router.push('/drugs')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
        >
          Go to Drugs
        </button>
      </div>
    </div>
  );
}
