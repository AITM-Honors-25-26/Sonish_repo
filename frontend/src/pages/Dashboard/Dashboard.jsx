import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const metrics = [
    { label: 'Indoor temp', value: '23°C', note: '+1.2° vs yesterday' },
    { label: 'Power draw', value: '2.4 kW', note: '-12% this week' },
    { label: 'Air quality', value: 'Good', note: 'PM2.5 at 14' },
    { label: 'Humidity', value: '48%', note: 'Comfort range' },
  ];

  const rooms = [
    { name: 'Living room', temp: '23°C', mode: 'Cooling', accent: 'living' },
    { name: 'Bedroom', temp: '21°C', mode: 'Sleep mode', accent: 'bedroom' },
    { name: 'Kitchen', temp: '24°C', mode: 'Ventilation', accent: 'kitchen' },
    { name: 'Study', temp: '22°C', mode: 'Focus mode', accent: 'study' },
  ];

  const modes = ['Cool', 'Heat', 'Dry', 'Auto'];
  const fanModes = ['Low', 'Medium', 'High', 'Auto'];

  const schedule = [
    { time: '06:30', title: 'Wake up routine', detail: 'Start airflow at 22°C' },
    { time: '18:30', title: 'Evening comfort', detail: 'Boost cooling for living room' },
    { time: '22:00', title: 'Sleep mode', detail: 'Reduce temperature by 2°' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="smart-home-shell">
      <aside className="sidebar-panel">
        <div className="brand-mark">
          <span className="dot" />
          VAULT HOME
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <button className="nav-item active">Overview</button>
          <button className="nav-item">Climate</button>
          <button className="nav-item">Scenes</button>
          <button className="nav-item">Security</button>
          <button className="nav-item">Energy</button>
        </nav>

        <div className="mini-card">
          <span className="eyebrow">System status</span>
          <strong>All systems online</strong>
          <div className="status-line">
            <span className="status-indicator" />
            Stable and efficient
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <span className="eyebrow">Smart climate</span>
            <h1>Good evening, {user?.name?.split(' ')[0] || 'there'}.</h1>
          </div>

          <div className="topbar-actions">
            <button className="ghost-btn">Schedule</button>
            <button className="primary-btn">Boost mode</button>
            <button className="text-btn" onClick={handleLogout}>Log out</button>
          </div>
        </header>

        <section className="stats-grid">
          {metrics.map((metric) => (
            <article className="stat-card" key={metric.label}>
              <span className="metric-label">{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </article>
          ))}
        </section>

        <section className="climate-grid">
          <article className="panel ac-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Live control</span>
                <h2>Living room AC</h2>
              </div>
              <span className="status-pill active">Running</span>
            </div>

            <div className="ac-hero">
              <div className="temperature-wrap">
                <div className="current-temp">23°</div>
                <div className="temperature-meta">
                  <span>Target 24°</span>
                  <span>Humidity 48%</span>
                </div>
              </div>

              <div className="mode-stack">
                {modes.map((mode) => (
                  <button key={mode} className={`mode-btn ${mode === 'Cool' ? 'active' : ''}`}>
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="slider-block">
              <div className="slider-header">
                <span>Temperature</span>
                <strong>24°C</strong>
              </div>
              <input type="range" min="16" max="30" value="24" readOnly />
            </div>

            <div className="fan-block">
              <span className="fan-label">Fan speed</span>
              <div className="fan-buttons">
                {fanModes.map((fan, index) => (
                  <button key={fan} className={`fan-btn ${index === 2 ? 'active' : ''}`}>
                    {fan}
                  </button>
                ))}
              </div>
            </div>
          </article>

          <article className="panel side-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Air quality</span>
                <h2>Comfort</h2>
              </div>
              <span className="status-pill eco">Eco</span>
            </div>

            <div className="device-list">
              <div className="device-row">
                <span>Air quality</span>
                <strong>Excellent</strong>
              </div>
              <div className="device-row">
                <span>Filter life</span>
                <strong>82%</strong>
              </div>
              <div className="device-row">
                <span>Noise</span>
                <strong>Low</strong>
              </div>
              <div className="device-row">
                <span>Power mode</span>
                <strong>Balanced</strong>
              </div>
            </div>
          </article>
        </section>

        <section className="bottom-grid">
          <article className="panel room-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Rooms</span>
                <h2>Climate zones</h2>
              </div>
            </div>

            <div className="room-list">
              {rooms.map((room) => (
                <div className={`room-item ${room.accent}`} key={room.name}>
                  <div>
                    <h3>{room.name}</h3>
                    <p>{room.mode}</p>
                  </div>
                  <strong>{room.temp}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="panel schedule-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Automation</span>
                <h2>Tomorrow</h2>
              </div>
            </div>

            <ul className="schedule-list">
              {schedule.map((entry) => (
                <li key={entry.time}>
                  <span className="schedule-time">{entry.time}</span>
                  <div>
                    <strong>{entry.title}</strong>
                    <p>{entry.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
