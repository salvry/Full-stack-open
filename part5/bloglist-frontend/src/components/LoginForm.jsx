const LoginForm = ({ handleSubmit, username, password, handleUsernameChange, handlePasswordChange }) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    password
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm