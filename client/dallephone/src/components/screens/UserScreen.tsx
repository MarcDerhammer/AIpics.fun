import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, showMyPhotos } from '../../database/database';
import Polaroid from '../molecules/Polaroid';
import './UserScreen.css';

const UserScreen = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [photos, setPhotos] = React.useState<any[]>([]);
  const [moreExists, setMoreExists] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  let scrollTimeout:any;

  const handleScroll = () => {
    if (!moreExists) {
      return;
    }
    clearInterval(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (window.innerHeight + document.documentElement.scrollTop + 600 <
        document.documentElement.offsetHeight) return;
      setPage(prevPage => prevPage + 1);
    }, 250);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (!moreExists) {
        return;
      }
      setLoading(true);
      const newPhotos = await showMyPhotos({
        limit: 11,
        offset: page * 12,
        orderBy: 'created_at',
        ascending: false
      });
      setLoading(false);
      if (newPhotos.length === 0) {
        setMoreExists(false);
        return;
      }
      setPhotos(photos.concat(newPhotos));
      handleScroll();
    }
    )();
  }, [page]);

  return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <span style={{
            cursor: 'pointer',
            fontWeight: 'bold'
          }} onClick={async () => {
            await logout();
            navigate('/');
          }}>Logout</span>
          <h2>your photos:</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
            {
              photos.map((photo: any) => {
                return (
                  <Polaroid
                    style={{
                      transform:
                      `rotate(${Math.floor(Math.random() * 10) - 4}deg)`,
                      marginBottom: '20px'
                    }}
                    mode='grid'
                    publicImage={photo.public}
                    key={photo.id}
                    imageId={photo.id}
                    label={photo.input}
                    creator={photo.creator}
                    onDelete={() => {
                      setPhotos(photos.filter((p: any) => p.id !== photo.id));
                    }} />
                );
              })
          }
          </div>
          {
            loading && <div>Loading...</div>
          }
        </div>
  );
};

export default UserScreen;
