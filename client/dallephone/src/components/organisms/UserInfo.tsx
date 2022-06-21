import React, { useEffect } from 'react';
import { setUserName } from '../../database/database';
import Creator from '../molecules/Creator';

import './UserInfo.css';

type UserInfoProps = {
    image?: string;
    username?: string;
}

const UserInfo = ({
  image = undefined,
  username = 'anonymous'
}: UserInfoProps) => {
  const [displayName, setDisplayName] = React.useState(username);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  useEffect(() => {
    setDisplayName(username);
  }
  , [username]);

  return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderTop: '1px solid white',
          margin: '20px 0'
        }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '0 20px'
                }}>
                    <label
                        htmlFor="name">display name</label>
                    <input
                        value={displayName}
                        className="input"
                        onKeyDown={async (e) => {
                          if (e.key === 'Enter') {
                            const save = await setUserName(displayName);
                            if (save) {
                              setSaveSuccess(true);
                            }
                          }
                        }
                        }
                        onChange={(e) => {
                          setSaveSuccess(false);
                          const element = e.target as HTMLInputElement;
                          setDisplayName(element.value);
                        }}
                        placeholder='anyone can see this' style={{
                          marginLeft: '10px'
                        }} id="name" type="text" />
                    <button
                    disabled={saving}
                    className="button" onClick={async () => {
                      if (saving) {
                        return;
                      }
                      setSaving(true);
                      const save = await setUserName(displayName);
                      setSaving(false);
                      if (save) {
                        setSaveSuccess(true);
                      }
                    }} style={{
                      borderRadius: '5px',
                      padding: '5px',
                      marginLeft: '5px'
                    }}>save</button>
                    {saveSuccess && (
                        <span style={{
                          position: 'relative',
                          bottom: 25,
                          right: -50
                        }}>
                    ✔️
                    </span>
                    )}

                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '0 20px'
                }}>
                    <Creator creator={{
                      id: '',
                      image,
                      name: displayName
                    }} />
                </div>
            </div>

        </div>
  );
};
export default UserInfo;
