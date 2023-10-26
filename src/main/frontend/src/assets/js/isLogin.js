/**
 * @author wheesunglee
 * @create date 2023-10-25 13:40:46
 * @modify date 2023-10-25 13:40:50
 */

const isLogin = () => !!localStorage.getItem("REFRESH_TOKEN");
export default isLogin;
