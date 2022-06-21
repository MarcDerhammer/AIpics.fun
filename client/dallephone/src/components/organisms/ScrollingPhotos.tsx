import React, { useEffect } from 'react';
import { showPhotos } from '../../database/database';
import Polaroid from '../molecules/Polaroid';
import './ScrollingPhotos.css';

type PhotoProps = {
    user?: string | null;
    publicOnly?: boolean;
}

const ScrollingPhotos = ({
  user = null,
  publicOnly = true
}: PhotoProps) => {
  const [page, setPage] = React.useState(0);
  const [photos, setPhotos] = React.useState<any[]>([]);
  const [moreExists, setMoreExists] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  let scrollTimeout: any;

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
      const newPhotos = await showPhotos({
        limit: 11,
        offset: page * 12,
        orderBy: 'created_at',
        ascending: false,
        filterByUser: user,
        publicOnly
      });
      setLoading(false);
      if (!newPhotos || newPhotos.length === 0) {
        setMoreExists(false);
        return;
      }
      setPhotos(photos.concat(newPhotos));
      handleScroll();
    }
    )();
  }, [page]);

  return (
        <div className="photoContainer" style={{
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
                              marginBottom: '20px'
                            }}
                            mode='grid'
                            publicImage={photo.public}
                            key={photo.id}
                            imageId={photo.id}
                            label={photo.input}
                            creator={photo.creator}
                            onDelete={() => {
                              setPhotos(photos.filter(
                                (p: any) =>
                                  p.id !== photo.id));
                            }} />
                  );
                })
            }
            {
                loading && <div>loading...</div>
            }
        </div>
  );
};

export default ScrollingPhotos;
