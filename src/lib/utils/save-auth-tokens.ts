import Cookies from 'js-cookie';

export const saveAuthTokens = ({
    access_token,
}: {
    access_token: string;
}) => {
    Cookies.set('access_token', access_token, {
        expires: 0.0104,
        secure: true,
        sameSite: 'Strict',
    });
};

export const getAccessToken = () => Cookies.get('access_token');

export const removeAuthTokens = () => {
    Cookies.remove('access_token');
};
