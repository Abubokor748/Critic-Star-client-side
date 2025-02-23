import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                const userInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                }
                axios.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                    })
                navigate('/');
            })
    }

    return (
        <div className='mx-auto pb-4 '>
            <div className="divider"></div>
            <button onClick={handleGoogleSignIn} className="btn w-full btn-primary text-white">
                <FaGoogle className='mr-4'></FaGoogle>
                Google
            </button>
        </div>
    );
};

export default SocialLogin;