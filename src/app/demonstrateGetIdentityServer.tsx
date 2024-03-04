import { getIdentity } from '@5minds/processcube_app_sdk/server';

export default async function DemonstrateGetIdentityServer() {
  const identity = await getIdentity();

  return (
    <div className="bg-white p-6 rounded shadow-md w-full">
      <h2 className="text-xl font-semibold mb-2">Your User-ID (Server)</h2>
      <p className="text-gray-600 mb-4">{identity.userId}</p>
    </div>
  );
}
