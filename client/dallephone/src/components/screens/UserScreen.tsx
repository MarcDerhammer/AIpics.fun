import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, showMyPhotos } from '../../database/database';
import Polaroid from '../molecules/Polaroid';
import './UserScreen.css';

const UserScreen = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [photos, setPhotos] = React.useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const photos = await showMyPhotos({
        limit: 8,
        offset: page * 10,
        orderBy: 'created_at',
        ascending: false
      });
      setPhotos(photos);
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
          <div>
            {
              page > 0 &&
              <span className="paging" onClick={() => {
                setPage(page - 1);
              }
              }>&lt;previous page</span>
            }
            {
              <span className="paging" onClick={() => {
                setPage(page + 1);
              }
              }>next page&gt;</span>
            }
          </div>
        </div>
  );
};

export default UserScreen;
