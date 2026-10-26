import React from 'react';

const paths = {
  arrow: <path d="M5 19 19 5M7 5h12v12" />,
  down: <path d="M12 4v16m-6-6 6 6 6-6" />,
  up: <path d="M12 20V4m-6 6 6-6 6 6" />,
  downLeft: <path d="M19 5 5 19M5 7v12h12" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  star: <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />,
  ultrasound: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M6 13h3l2-5 3 8 2-4h2M7 23h10" /></>,
  penetrant: <><path d="M12 2C9 6 5 10 5 14a7 7 0 0 0 14 0c0-4-4-8-7-12Z" /><path d="M9 15a3 3 0 0 0 3 3" /></>,
  inspection: <><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6M7 10h6M10 7v6" /></>,
};

export function Icon({ name, className = '' }) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
