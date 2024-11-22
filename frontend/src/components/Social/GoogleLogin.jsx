import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

const GoogleLogin = () => {
    const {googleLogin} = useAuth();
    const navigate = useNavigate()
    const handleLogin = ()=>{
        // console.log("google login")
        googleLogin().then((userCredential)=>{
        const user= userCredential.user;
        // console.log(user)
        if(user){
            const userImp = {
                name:user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
                role :"user",
                gender :"Is not Specified",
                address: "Is not Specified",
                phone: "Is not Specified"
                
            }
         if(user.email && user.displayName){
                return axios.post('http://localhost:5000/new-user',userImp).then(()=>{
                    navigate('/')
                    return " Registration Successful"
                }).catch((err)=>{
                    throw new Error(err)
                })
            }
        }
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage= error.message;

        })
    }
  return (
    <div className="flex items-center justify-center my-3">
        <button onClick={()=>handleLogin()} className="flext items-center outline-none bg-white border border-gray-300 rounded-lg px-6 py-4 text-sm font-medium text-gray-800 hover:bg-200 focus:outline-none">
            <span>Continue with Google</span>
        </button>
    </div>
  )
}

export default GoogleLogin