import { forwardRef } from 'react';

const ParallaxBackground = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <div
        className="blueprint-layer"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '120%',
          height: '140%',
          backgroundImage: `
            linear-gradient(rgba(214, 179, 106, .03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(214, 179, 106, .03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          willChange: 'transform',
        }}
      />
      
      <div
        className="grid-layer"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '110%',
          height: '120%',
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, .015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, .015) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          willChange: 'transform',
        }}
      />
    </div>
  );
});

ParallaxBackground.displayName = 'ParallaxBackground';

export default ParallaxBackground;
