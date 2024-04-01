'use client';

import { useSession, signOut } from 'next-auth/react';

export default function LogoutButton() {
  const session = useSession();

  if (session.status === 'authenticated') {
    return (
      <>
        <div className="bg-white p-6 rounded shadow-md w-full">
          <button
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
