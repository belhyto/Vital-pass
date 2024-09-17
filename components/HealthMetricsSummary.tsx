export default function HealthMetricsSummary() {
  // This is a placeholder. You'll need to fetch real data from your backend/database
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="font-semibold">Oxygen</h3>
        <p>98%</p>
      </div>
      <div>
        <h3 className="font-semibold">BPM</h3>
        <p>72</p>
      </div>
      <div>
        <h3 className="font-semibold">Weight</h3>
        <p>70 kg</p>
      </div>
      <div>
        <h3 className="font-semibold">Height</h3>
        <p>175 cm</p>
      </div>
    </div>
  );
}
