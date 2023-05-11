export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('userInfo')||'{}');
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken,
               'Content-type': 'application/json' };
    } else {
      return {};
    }
}