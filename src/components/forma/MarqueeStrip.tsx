import Marquee from 'react-fast-marquee';

const ITEMS = [
  'Digital Systems', '·', 'Scalable SaaS', '·', 'Creative Technology', '·', 
  'Web Experience', '·', 'Brand Strategy', '·', 'Interactive Design', '·',
];

export function MarqueeStrip() {
  return (
    <div style={{
      borderTop: '1px solid rgba(4,50,34,0.09)',
      borderBottom: '1px solid rgba(4,50,34,0.09)',
      backgroundColor: '#F6E9D9',
      padding: '0.95rem 0',
      overflow: 'hidden',
    }}>
      <Marquee speed={28} gradient={false} pauseOnHover autoFill={true}>
        {ITEMS.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'Inter,sans-serif',
            fontSize: '0.60rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: item === '·' ? 'rgba(4,50,34,0.25)' : 'rgba(4,50,34,0.45)',
            marginRight: '2.2rem',
          }}>
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
