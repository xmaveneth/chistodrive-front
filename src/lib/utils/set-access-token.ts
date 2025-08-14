import Cookies from 'js-cookie';

export type FinalSignupResponseType = {
    access_token: string;
    refresh_token: string;
};

export default function setAccessToken(data: FinalSignupResponseType) {
    Cookies.set('access_token', data.access_token, {
        secure: true,
        sameSite: 'Strict',
    });
    Cookies.set('refresh_token', data.refresh_token, {
        secure: true,
        sameSite: 'Strict',
    });
}
