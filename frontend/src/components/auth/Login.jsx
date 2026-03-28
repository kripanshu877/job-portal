import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message || "Something went wrong.");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) navigate("/");
    }, [])

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

                .auth-root {
                    min-height: 100vh;
                    background: #f7f5f2;
                    font-family: 'DM Sans', sans-serif;
                }

                .auth-body {
                    min-height: calc(100vh - 64px);
                    display: flex;
                    align-items: stretch;
                }

                /* LEFT PANEL */
                .auth-left {
                    display: none;
                    flex: 1;
                    background: #001f3f;
                    position: relative;
                    overflow: hidden;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 56px 52px;
                }

                @media (min-width: 1024px) {
                    .auth-left { display: flex; }
                }

                .auth-left::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 80% 60% at 20% 80%, rgba(0,90,160,0.35) 0%, transparent 60%),
                        radial-gradient(ellipse 60% 50% at 80% 20%, rgba(0,60,120,0.25) 0%, transparent 55%);
                }

                .auth-left::after {
                    content: '';
                    position: absolute;
                    top: -120px;
                    right: -120px;
                    width: 420px;
                    height: 420px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.06);
                }

                .left-circle-2 {
                    position: absolute;
                    bottom: -80px;
                    left: -80px;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.05);
                    pointer-events: none;
                }

                .left-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
                    background-size: 48px 48px;
                }

                .left-tag {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 100px;
                    padding: 6px 16px;
                    margin-bottom: 32px;
                    width: fit-content;
                }

                .left-tag-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #4fc3f7;
                    animation: pulse-dot 2s ease-in-out infinite;
                }

                @keyframes pulse-dot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.8); }
                }

                .left-tag span {
                    font-size: 11px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.6);
                    font-weight: 400;
                }

                .left-headline {
                    position: relative;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(38px, 4vw, 52px);
                    font-weight: 300;
                    color: #fff;
                    line-height: 1.15;
                    margin-bottom: 20px;
                    letter-spacing: -0.01em;
                }

                .left-headline em {
                    font-style: italic;
                    color: #90caf9;
                }

                .left-sub {
                    position: relative;
                    font-size: 14px;
                    color: rgba(255,255,255,0.45);
                    line-height: 1.7;
                    max-width: 320px;
                    font-weight: 300;
                    margin-bottom: 48px;
                }

                .left-stats {
                    position: relative;
                    display: flex;
                    gap: 40px;
                }

                .stat-item {}
                .stat-num {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 28px;
                    font-weight: 600;
                    color: #fff;
                    line-height: 1;
                }
                .stat-label {
                    font-size: 11px;
                    color: rgba(255,255,255,0.4);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-top: 4px;
                }

                /* RIGHT PANEL */
                .auth-right {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 24px;
                    background: #f7f5f2;
                }

                @media (min-width: 1024px) {
                    .auth-right {
                        width: 480px;
                        flex-shrink: 0;
                        padding: 40px 56px;
                    }
                }

                .auth-form-wrap {
                    width: 100%;
                    max-width: 360px;
                    animation: fadeUp 0.5s ease both;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .form-eyebrow {
                    font-size: 11px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #001f3f;
                    opacity: 0.45;
                    margin-bottom: 10px;
                    font-weight: 500;
                }

                .form-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 42px;
                    font-weight: 300;
                    color: #001f3f;
                    line-height: 1.1;
                    margin-bottom: 6px;
                    letter-spacing: -0.01em;
                }

                .form-sub {
                    font-size: 13px;
                    color: #8a8a8a;
                    margin-bottom: 36px;
                    font-weight: 300;
                }

                .field-group {
                    margin-bottom: 18px;
                }

                .field-label {
                    display: block;
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #001f3f;
                    opacity: 0.6;
                    margin-bottom: 7px;
                }

                .field-input {
                    width: 100%;
                    height: 44px;
                    padding: 0 14px;
                    background: #fff;
                    border: 1px solid #e2ddd8;
                    border-radius: 8px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    color: #001f3f;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    outline: none;
                }

                .field-input::placeholder { color: #c0bbb5; }

                .field-input:focus {
                    border-color: #001f3f;
                    box-shadow: 0 0 0 3px rgba(0,31,63,0.08);
                }

                .role-section {
                    margin: 24px 0;
                }

                .role-label-head {
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #001f3f;
                    opacity: 0.6;
                    margin-bottom: 12px;
                    display: block;
                }

                .role-options {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }

                .role-card {
                    position: relative;
                    cursor: pointer;
                }

                .role-card input[type="radio"] {
                    position: absolute;
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .role-card-inner {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 16px;
                    border: 1.5px solid #e2ddd8;
                    border-radius: 10px;
                    background: #fff;
                    transition: all 0.2s;
                    cursor: pointer;
                }

                .role-card input[type="radio"]:checked + .role-card-inner {
                    border-color: #001f3f;
                    background: #001f3f;
                }

                .role-card input[type="radio"]:checked + .role-card-inner .role-icon,
                .role-card input[type="radio"]:checked + .role-card-inner .role-text {
                    color: #fff;
                }

                .role-icon {
                    font-size: 18px;
                    line-height: 1;
                }

                .role-text {
                    font-size: 13px;
                    font-weight: 500;
                    color: #001f3f;
                    transition: color 0.2s;
                }

                .submit-btn {
                    width: 100%;
                    height: 46px;
                    margin-top: 24px;
                    background: #001f3f;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: background 0.2s, transform 0.15s;
                }

                .submit-btn:hover { background: #003d7a; }
                .submit-btn:active { transform: scale(0.99); }
                .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

                .form-footer {
                    text-align: center;
                    margin-top: 24px;
                    font-size: 13px;
                    color: #8a8a8a;
                }

                .form-footer a {
                    color: #001f3f;
                    font-weight: 500;
                    text-decoration: none;
                    border-bottom: 1px solid rgba(0,31,63,0.3);
                    padding-bottom: 1px;
                    transition: border-color 0.2s;
                }

                .form-footer a:hover { border-color: #001f3f; }

                .divider-line {
                    height: 1px;
                    background: linear-gradient(to right, transparent, #e2ddd8, transparent);
                    margin: 28px 0;
                }
            `}</style>

            <div className="auth-root">
                <Navbar />
                <div className="auth-body">

                    {/* LEFT DECORATIVE PANEL */}
                    <div className="auth-left">
                        <div className="left-grid" />
                        <div className="left-circle-2" />

                        <div className="left-tag">
                            <div className="left-tag-dot" />
                            <span>Job Portal</span>
                        </div>

                        <h2 className="left-headline">
                            Your next <em>opportunity</em><br />starts here.
                        </h2>

                        <p className="left-sub">
                            Connect with top recruiters, discover roles that match your ambition, and take the next step in your career.
                        </p>

                        <div className="left-stats">
                            <div className="stat-item">
                                <div className="stat-num">12K+</div>
                                <div className="stat-label">Live Jobs</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num">4.8K</div>
                                <div className="stat-label">Companies</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num">98%</div>
                                <div className="stat-label">Satisfaction</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT FORM PANEL */}
                    <div className="auth-right">
                        <div className="auth-form-wrap">
                            <p className="form-eyebrow">Welcome back</p>
                            <h1 className="form-title">Sign in</h1>
                            <p className="form-sub">Good to see you again. Let's find your next role.</p>

                            <form onSubmit={submitHandler}>
                                <div className="field-group">
                                    <label className="field-label">Email</label>
                                    <input
                                        className="field-input"
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div className="field-group">
                                    <label className="field-label">Password</label>
                                    <input
                                        className="field-input"
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="role-section">
                                    <span className="role-label-head">I am a</span>
                                    <div className="role-options">
                                        <label className="role-card">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="student"
                                                checked={input.role === 'student'}
                                                onChange={changeEventHandler}
                                            />
                                            <div className="role-card-inner">
                                                <span className="role-icon">🎓</span>
                                                <span className="role-text">Student</span>
                                            </div>
                                        </label>
                                        <label className="role-card">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="recruiter"
                                                checked={input.role === 'recruiter'}
                                                onChange={changeEventHandler}
                                            />
                                            <div className="role-card-inner">
                                                <span className="role-icon">💼</span>
                                                <span className="role-text">Recruiter</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={loading}
                                >
                                    {loading
                                        ? <><Loader2 className="animate-spin" style={{ width: 16, height: 16 }} /> Please wait</>
                                        : 'Login →'
                                    }
                                </button>
                            </form>

                            <div className="divider-line" />

                            <p className="form-footer">
                                Don't have an account?{' '}
                                <Link to="/signup">Create one</Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login
