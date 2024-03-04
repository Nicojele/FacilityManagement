'use client';

import { hasClaim } from '@5minds/processcube_app_sdk';
import { useEffect, useState } from 'react';

export default function DemonstrateHasClaimClient() {
  const [hasClaimExample, setHasClaim] = useState(false);

  useEffect(() => {
    hasClaim('can_read_process_model').then((value) => setHasClaim(value));
  });

  return (
    <div className="bg-white p-6 rounded shadow-md w-full">
      <h1 className="text-xl font-semibold">Has Claim (Client)</h1>
      <p className="mb-2">can_read_process_model?</p>
      <p className="text-gray-600 mb-4">{String(hasClaimExample)}</p>
    </div>
  );
}
