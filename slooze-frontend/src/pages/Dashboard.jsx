export default function Dashboard({ darkMode }) {
  const stats = [
    { title: 'Total Products', value: 142, trend: 'up', change: '12%' },
    { title: 'Low Stock', value: 8, trend: 'down', change: '3%' },
    { title: 'Categories', value: 6, trend: 'up', change: '2' }
  ]

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'}`}>
      <h2 className="dashboard-title">Manager Dashboard</h2>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.title}</h3>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.trend}`}>
              {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
            </div>
          </div>
        ))}
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>New shipment of Wheat received</li>
          <li>Low stock alert for Rice</li>
          <li>Price update for Coffee</li>
        </ul>
      </div>
    </div>
  )
}