import Dashboard from '@/components/dashboard/Dashboard';
import { demoWorkspace } from '@/lib/dashboard/model';
export const dynamic='force-dynamic';
export default function Demo() { return <Dashboard initial={demoWorkspace()} initialRevision={0} demo/>; }
