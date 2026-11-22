import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Coffee, GitCommit, Zap } from 'lucide-react';
import './App.css';

interface Ingestion {
  time: string;
  amountMg: number;
}

export default function App() {
  const [caffeineLogs, setCaffeineLogs] = useState<Ingestion[]>([]);
  const [coffeeInput, setCoffeeInput] = useState('80'); // Padrão: 1 Espresso (~80mg)

  // Adiciona um novo café registrado no horário atual
  const handleAddCoffee = () => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setCaffeineLogs([...caffeineLogs, { time: timeStr, amountMg: Number(coffeeInput) }]);
  };

  const chartData = [
    { hour: '08:00', caffeine: 0, commits: 0 },
    { hour: '10:00', caffeine: 80, commits: 2 },
    { hour: '12:00', caffeine: 60, commits: 5 },
    { hour: '14:00', caffeine: 120, commits: 9 },
    { hour: '16:00', caffeine: 90, commits: 4 },
    { hour: '18:00', caffeine: 45, commits: 1 },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#1e1e2e', color: '#cdd6f4', minHeight: '100vh' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Coffee size={32} color="#fab387" />
        <h1 style={{ margin: 0 }}>DevOps do Cafezinho</h1>
      </header>

      <section style={{ display: 'flex', gap: '16px', marginBottom: '32px', backgroundColor: '#313244', padding: '16px', borderRadius: '8px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Dose de Cafeína (mg):</label>
          <input
            type="number"
            value={coffeeInput}
            onChange={(e) => setCoffeeInput(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: 'none', width: '100px' }}
          />
        </div>
        <button
          onClick={handleAddCoffee}
          style={{
            alignSelf: 'flex-end',
            padding: '10px 16px',
            backgroundColor: '#a6e3a1',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Zap size={16} /> Registrar Xícara
        </button>
      </section>

      {/* Gráfico de Cafeína x Commits */}
      <section style={{ backgroundColor: '#313244', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitCommit size={20} color="#89b4fa" /> Nível no Sangue vs. Commits
        </h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#45475a" />
              <XAxis dataKey="hour" stroke="#a6adc8" />
              <YAxis stroke="#a6adc8" />
              <Tooltip contentStyle={{ backgroundColor: '#181825', borderColor: '#45475a' }} />
              <Line type="monotone" dataKey="caffeine" stroke="#fab387" name="Cafeína (mg)" strokeWidth={3} />
              <Line type="monotone" dataKey="commits" stroke="#89b4fa" name="Commits" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}