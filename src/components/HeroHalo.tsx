export default function HeroHalo() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '280px',
      height: '280px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(214, 179, 106, 0.25), transparent 60%)',
      filter: 'blur(32px)',
      pointerEvents: 'none',
      zIndex: -1,
    }} />
  );
}
