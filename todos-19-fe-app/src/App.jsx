import { useState } from 'react';
import './App.css';
import Dash from './components/Dash';
import { AuthContext } from './context/AuthContext';
import Login from './routes/Login';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  return (
    <AuthContext value={[accessToken, setAccessToken]}>
      <Login />
    </AuthContext>
  );
}

export default App;
