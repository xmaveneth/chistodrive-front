import Cookies from 'js-cookie';

export const saveAuthTokens = ({
    access_token,
    refresh_token,
}: {
    access_token: string;
    refresh_token: string;
}) => {
    Cookies.set('access_token', access_token, {
        secure: true,
        sameSite: 'Strict',
    });
    Cookies.set('refresh_token', refresh_token, {
        secure: true,
        sameSite: 'Strict',
    });
};

export const getAccessToken = () => Cookies.get('access_token');

export const removeAuthTokens = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
};
