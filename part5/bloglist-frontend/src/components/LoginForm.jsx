const LoginForm = ({ handleSubmit, username, password, handleUsernameChange, handlePasswordChange }) => {
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    password
                    <input id="password" type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button id="login-button" type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LoginForm