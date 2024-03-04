import { hasClaim } from '@5minds/processcube_app_sdk';

export default async function DemonstrateHasClaimServer() {
  return (
    <div className="bg-white p-6 rounded shadow-md w-full">
      <h1 className="text-xl font-semibold">Has Claim (Server)</h1>
      <p className="mb-2">can_read_process_model?</p>
      <p className="text-gray-600 mb-4">{String(await hasClaim('can_read_process_model'))}</p>
    </div>
  );
}
