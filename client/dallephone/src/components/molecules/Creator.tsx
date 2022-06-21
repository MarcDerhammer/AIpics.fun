import React, { useEffect } from 'react';
import { getPublicUrl } from '../../database/database';
import { Profile } from './Polaroid';

type CreatorProps = {
    creator: Profile;
};

const Creator = ({ creator }: CreatorProps) => {
  const [imageUrl, setImageUrl] = React.useState<string>('');

  useEffect(() => {
    if (creator.image) {
      (async () => {
        const url = await getPublicUrl(creator.image || '');
        setImageUrl(url?.publicURL || '');
      })();
    }
  }, [creator.image]);

  return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '100px'
        }}>
            {imageUrl && (
                <img
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid white',
                      backgroundColor: 'grey',
                      marginBottom: '0px'
                    }} src={imageUrl} />
            )}
            <span style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              maxWidth: '100px',
              whiteSpace: 'nowrap',
              fontWeight: 'bold'
            }}>
                {creator.name}
            </span>
        </div>
  );
};
export default Creator;
