import { useState } from "react"
import { getEmptyChar } from "./App"
import { useNavigate } from "react-router"
export const Login = () =>
{
    const navigate = useNavigate();
    const validateLoginData = (username, password) => 
    {
        username = username.trim()
        password = password.trim()
        if (!username)
        {
            setMsg("please set a valid username")
            setIsError(true)
            return false;
        }
        if (!password)
        {
            setMsg("please set a valid password")
            setIsError(true)
            return false;
        }
        if (username.length < 3)
        {
            setMsg("please set a username with more than 2 caracters")
            setIsError(true)
            return false;
        }
        if (password.length < 8)
        {
            setMsg("please set a password with more than 7 caracters")
            setIsError(true)
            return false;
        }
        return true;
    }
        
    const sendLoginReq = async (e, username, password) => 
    {
        e.preventDefault()
        if (!validateLoginData(username, password))
            return ;

        let body = JSON.stringify({username:username, password:password});
        const res = await fetch('http://localhost:3000/login',
        {
            method: 'POST', 
            headers:  {'Content-Type': 'application/json'},
            body: body,
        })
        if (res.ok)
        {
            let data = await res.json();
            setIsError(data.isError);
            setMsg(data.msg);
            if (data.data && data.data.token)
            {
                navigate("/dashboard",  { replace: true })
                localStorage.setItem('token', data.data.token)
            }
        }
    }
    const [username, setUsername] = useState("");
    const [msg, setMsg] = useState(getEmptyChar());
    const [isError, setIsError] = useState(false);
    const [password, setPassword] = useState("");
    return (

        <div className="flex flex-col items-center justify-center w-full gap-10">
            <h2 className="w-full font-funnel uppercase  font-black text-4xl text-center">Login Form</h2>
            <form method="POST" className='min-h-60 
                sm:w-1/3
                px-4
                sm:px-0
                flex flex-col  justify-between 
                font-semibold text-lg font-bitter'>
            
                <div className="
                    flex flex-row
                    w-full
                    ">
                    <label htmlFor="" className="w-1/2">username</label>
                    <input type="text"
                        className="w-2/3 rounded-xs bg-transparent border-2 border-zinc-600 outline-none h-6 px-2 py-4"    
                        onChange={(e) => setUsername(e.target.value)} value={username}/>
                </div>

                <div className="
                    flex flex-row
                    w-full
                    ">
                    <label htmlFor="" className="w-1/2">password</label>
                    <input type="password"
                        className="w-2/3 rounded-xs bg-transparent border-2 border-zinc-600 outline-none h-6 px-2 py-4"    
                        onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>

                <div className="
                    flex flex-col
                    w-full items-center justify-center
                    ">
                    {
                        msg &&
                         <span className={`
                            ${isError ? "text-red-700" : "text-indigo-700"}
                            text-xs
                            `}>{msg}</span>
                    }
                    <button 
                        onClick={(e) => {sendLoginReq(e, username, password)}}
                        className="border-zinc-700 border-2 
                         hover:border-zinc-600
                            flex items-center justify-center
                            cursor-pointer
                            py-1
                            transition
                             text-zinc-200 hover:text-zinc-50
                             hover:bg-white/5
                              w-full rounded-xs mt-4">login
                        </button>
                </div>
            </form>
        </div>
    )
}
