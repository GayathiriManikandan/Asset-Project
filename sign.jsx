import React, { useState } from 'react';

function Login() {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <>
            <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <span>Or Use Username and Password To Register</span>
                        <input type="text" placeholder="Username" required />
                        <input type="password" placeholder="Password" required />
                        <input type="password" placeholder="Re-Type Password" required />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <span>Or Use Username and Password</span>
                        <input type="text" placeholder="Username" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back</h1>
                            <p>Enter your details to access the features of this site</p>
                            <button className="hidden" onClick={toggleForm}>
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello Dear</h1>
                            <p>Enter your details and let's get started</p>
                            <button className="hidden" onClick={toggleForm}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;