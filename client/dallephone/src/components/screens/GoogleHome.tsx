import React from 'react';

const GoogleHome = () => {
  return (
        <div>
            <ul>
                <li>
                    <b>Describe the necessary content, context,
                        or connection to the
                        app you are submitting
                    </b>
                    <p>This website (aipics.fun) allows users
                        to submit prompts which are sent to
                        an AI Model that will generate an
                        image based on the prompt </p>
                </li>
                <li>
                    <b>Explain with transparency the purpose for
                        which your application requests user data
                    </b>
                    <p>User data is requested to authenticate and
                        identify users of the site in order to credit
                        their creations and allow later retrieval of privately
                        saved content. After authenticating, users can
                        save content and create a user profile.  No private user
                        data is collected nor shared with any other party.
                        No sensitive scopes are requested.
                    </p>
                </li>
                <li>
                    <b>Thoroughly describe how your app enhances
                        user functionality
                    </b>
                    <p>By authenticating, users are able to submit creations
                        to be viewed publically and save their content for
                        later retrieval.
                    </p>
                </li>
            </ul>
        </div>
  );
};

export default GoogleHome;
