// TEMPORARY preview route to view the untracked component-based Dashboard UI.
// Safe to delete — not imported by anything else.
import Dashboard from "../../components/Dashboard";
import { mockState } from "../../lib/mockState";

export default function PreviewPage() {
  return <Dashboard state={mockState} source="demo" />;
}
