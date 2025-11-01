const styles = {

  bodyContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'clamp(0.5rem, 2vh, 1.5rem)',
    width: '100%',
    height: '100%',
    maxWidth: '1200px',
  },

  signatureBox: {
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    animation: 'fadeInUp 1s ease-in-out',
  },

  signatureBoard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderBottom: '2px solid #eee',
    width: '100%',
    height: '100%',
    flex: 1,
    boxSizing: 'border-box',
    padding: 'clamp(0.3rem, 1vw, 0.8rem)',
  },

  board: {
    flex: 1,
    display: 'flex',
    background: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    position: 'relative',
  },

  signatureBtn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 'clamp(0.4rem, 1vh, 1rem)',
    flex: '0 0 auto',
    padding: 'clamp(0.3rem, 1vw, 0.8rem)',
  },
  
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 'clamp(0.4rem, 1vh, 1rem)',
    flex: '0 0 auto',
    padding: 'clamp(0.3rem, 1vw, 0.8rem)',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 'clamp(0.4rem, 1vh, 1rem)',
    flex: '0 0 auto',
    padding: 'clamp(0.3rem, 1vw, 0.8rem)',
  },
  actionBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  writeBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  checkIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  typeBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  actionIcons: {
    width: '60%',
    height: '60%',
  },
  
  userInput: {
    width: '100%',
    padding: '0.6rem',
    fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
    borderRadius: '10px',
    border: '1px solid #ccc',
    background: '#f5f5f5',
    outline: 'none',
  },

  '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(40px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },

};

export default styles;
