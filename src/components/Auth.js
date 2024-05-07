import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase'; // Corrected googleProvider import
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'; // Corrected imports



export default function Auth() {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    console.log(auth.currentUser?.email); 
    const SignIn = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = login;
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err.message); 
        }
    }

    const handleGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider); 
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <div>
                <input placeholder='Email...' type='text' name='email' value={login.email} onChange={handleChange} />
                <input placeholder='Password...' type='password' name='password' value={login.password} onChange={handleChange} />
                <button onClick={SignIn}>Sign In</button>
            </div>

            <div>
                <button onClick={handleGoogle}>Sign In With Google</button>
            </div>

            <div>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>


            
        </>
    );
}
