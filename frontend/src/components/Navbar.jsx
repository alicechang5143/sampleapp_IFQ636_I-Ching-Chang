import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.title}>Event Booking</h2>

      <div>
        {user ? (
          <>
            <span style={styles.userText}>Hello, {user.name}</span>
            <button style={styles.login} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={styles.login}>Login</button>
            </Link>

            <Link to="/register" style={{ textDecoration: 'none' }}>
              <button style={styles.register}>Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    background: '#ffffff',
    borderBottom: '1px solid #eee',
  },
  title: {
    color: '#FF4D00',
    fontWeight: '700',
    fontSize: '24px',
    margin: 0,
  },
  userText: {
    marginRight: '10px',
    color: '#444',
    fontWeight: '500',
  },
  login: {
    marginRight: '10px',
    padding: '8px 16px',
    border: '1px solid #FF4D00',
    background: 'white',
    color: '#FF4D00',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  register: {
    padding: '8px 16px',
    border: 'none',
    background: '#FF4D00',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Navbar;