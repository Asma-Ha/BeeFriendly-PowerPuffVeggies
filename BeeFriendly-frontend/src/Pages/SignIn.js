
import { api } from "../utils/api";
const SignIn = () => {
   
function login() {
    api.post("/login", {
        username: "test",
        password: "test",
      })
      .then(function (res) {
        const token = res.body.token;
        localStorage.setItem(token);
      });
  }
    return ( 
        <div>

        </div>
     );
}
 
export default SignIn;