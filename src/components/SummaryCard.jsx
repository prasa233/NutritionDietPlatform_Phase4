
function SummaryCard({ title, value, subtitle, icon }) {
  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <span className="summary-card-icon">{icon}</span>
        <h3>{title}</h3>
      </div>

      <h2>{value}</h2>

      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export default SummaryCard;
