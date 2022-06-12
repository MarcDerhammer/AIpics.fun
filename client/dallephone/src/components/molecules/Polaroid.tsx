import React from 'react';
import './PolaroidStyle.css';

type Props = {
    base64Img: string;
    label?: string;
    fadeInEffect?: boolean;
    slideEffect?: boolean;
}

const Polaroid = ({
  base64Img,
  label,
  fadeInEffect = false,
  slideEffect = false
}:
    Props) => {
  return (
        <div className={`imageContainer ${slideEffect ? 'slide' : ''}`} >
            <img
                className={fadeInEffect ? 'fade' : ''}
                src={base64Img} alt={label} />
            <label>
                {label}
            </label>
        </div>
  );
};

export default Polaroid;
