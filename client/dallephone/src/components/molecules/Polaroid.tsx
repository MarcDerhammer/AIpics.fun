import React, { useEffect, useId } from 'react';
import './PolaroidStyle.css';
import html2Canvas from 'html2canvas';
import share from '../../icons/share.svg';
import trash from '../../icons/trash.svg';
import show from '../../icons/show.svg';
import hide from '../../icons/hide.svg';
import profilePic from '../../icons/profile-pic.svg';
import Creator from '../molecules/Creator';

import {
  getPublicUrl, setPublic, deleteImage, user,
  setProfilePic
}
  from '../../database/database';

export type Profile = {
  id: string;
  image?: string;
  name: string;
}

type Props = {
  imageId?: string;
  label?: string;
  fadeInEffect?: boolean;
  slideEffect?: boolean;
  mode?: 'grid' | 'single';
  style?: React.CSSProperties;
  publicImage?: boolean;
  onDelete?: () => void;
  creator?: Profile;
  onProfilePicSelected?: (image: string) => void;
  showCreator?: boolean;
}

const Polaroid = ({
  label,
  imageId,
  fadeInEffect = false,
  slideEffect = false,
  mode = 'grid',
  style,
  publicImage = false,
  onDelete = () => { },
  creator,
  onProfilePicSelected = () => { },
  showCreator = false
}:
  Props) => {
  const id = useId();
  const imageDomId = useId();
  const [showControls, setShowControls] = React.useState(mode === 'grid');
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [isPublic, setIsPublic] = React.useState(publicImage);

  const removeImage = async () => {
    if (!imageId) {
      return;
    }
    if (confirm('do you want to delete this image of "' + label + '"?')) {
      try {
        await deleteImage(imageId);
        onDelete();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const toggleVisibility = async () => {
    if (!imageId) {
      return;
    }
    const makePublic = 'make this image public so anyone can see it?';
    const makePrivate = 'make this image private? it will no longer be public';
    if (confirm(isPublic ? makePrivate : makePublic)) {
      await setPublic(imageId, !isPublic);
      setIsPublic(!isPublic);
    }
  };

  const makeProfilePic = async () => {
    if (!imageId) {
      return;
    }
    const makeProfilePic = 'make this your profile pic?';
    if (confirm(makeProfilePic)) {
      const set = await setProfilePic(imageId);
      if (set) {
        onProfilePicSelected(imageId);
      }
    }
  };

  useEffect(() => {
    if (imageId) {
      getPublicUrl(imageId).then(url => {
        setImageUrl(url?.publicURL || '');
      });
    }
  }, [imageId]);

  useEffect(() => {
    document.getElementById(imageDomId)
      ?.addEventListener('webkitAnimationEnd', () => {
        setShowControls(true);
      });
    document
      .getElementById(imageDomId)
      ?.addEventListener('animationend', () => {
        setShowControls(true);
      });
  }, []);

  const shareImage = () => {
    const image =
      document.getElementById(id) as HTMLElement;
    image.parentElement?.classList.remove('rotated');
    html2Canvas(image, {
      allowTaint: true,
      useCORS: true
    })
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
          image.parentElement?.classList.add('rotated');
        });
      });
  };
  return (
    <div style={style} className="container rotated">
      <div id={id}
        className={'imageContainer grow ' +
          `${slideEffect ? 'slide' : ''}`} >
        <img
          id={imageDomId}
          className={'image ' + (fadeInEffect ? 'fade' : '')}
          src={imageUrl} alt={label} />
        <label className='label'>
          {label}
        </label>
      </div>
      {showControls && (<div className={'controlRow'}>
      {showCreator && creator && (
              <Creator creator={creator} />)}
        <img className="controlButton"
          onClick={shareImage} src={share} alt="share" />
        {user()?.id === creator?.id && creator?.name && (
            <img className="controlButton"
              onClick={removeImage} src={trash} alt="delete" />
        )}
        {user()?.id === creator?.id && creator?.name && (
            <img className="controlButton"
              onClick={toggleVisibility}
              src={isPublic ? show : hide} alt="delete" />
        )}
        {user()?.id === creator?.id && creator?.name && (
            <img className="controlButton"
              onClick={makeProfilePic}
              src={profilePic} alt="delete" />
        )}
      </div>)}
    </div>
  );
};

export default Polaroid;
