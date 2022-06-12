import React, { useEffect, useId } from 'react';
import './PolaroidStyle.css';
import html2Canvas from 'html2canvas';
import share from '../../icons/share.svg';

type Props = {
    base64Img: string;
    label?: string;
    fadeInEffect?: boolean;
    slideEffect?: boolean;
    mode?: 'grid' | 'single';
}

const Polaroid = ({
  base64Img,
  label,
  fadeInEffect = false,
  slideEffect = false,
  mode = 'grid'
}:
    Props) => {
  const id = useId();
  const imageId = useId();
  const [showControls, setShowControls] = React.useState(mode === 'grid');

  useEffect(() => {
    document.getElementById(imageId)
      ?.addEventListener('webkitAnimationEnd', () => {
        setShowControls(true);
      });
    document.getElementById(imageId)?.addEventListener('animationend', () => {
      setShowControls(true);
    });
  }, [id]);

  const shareImage = () => {
    const image =
      document.getElementById(id) as HTMLElement;
    html2Canvas(image)
      .then(canvas => {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            return;
          }
          const files =
          [new File([blob], `${new Date().getTime()}.png`,
            { type: blob.type })];
          navigator.share({
            title: label,
            files
          });
        });
      });
  };
  return (
        <div className="container">
            <div id={id}
                className={`imageContainer ${slideEffect ? 'slide' : ''}`} >
                <img
                    id={imageId}
                    className={fadeInEffect ? 'fade' : ''}
                    src={base64Img} alt={label} />
                <label className='label'>
                    {label}
                </label>
            </div>
            {showControls && (<div className={`controlRow
                ${mode === 'grid' ? 'controlRowHidden' : ''}`}>
                <img className="share"
                    onClick={shareImage} src={share} alt="share" />
            </div>)}
        </div>
  );
};

export default Polaroid;
