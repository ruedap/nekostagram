// Ref: https://github.com/redwoodjs/playground-auth/blob/main/web/src/components/LogInOutButtons/LogInOutButtons.js
import { useAuth } from '@redwoodjs/auth'

type Props = {
  logInOptions: string
  logOutOptions?: string
  signUpOptions: string
}
export const LogInOutButtons = ({
  logInOptions,
  logOutOptions,
  signUpOptions,
}: Props) => {
  const { logIn, logOut, signUp, isAuthenticated } = useAuth()

  return (
    <>
      <button
        className="btn"
        onClick={() => {
          isAuthenticated ? logOut(logOutOptions) : logIn(logInOptions)
        }}
      >
        {isAuthenticated ? 'Log Out' : 'Log In'}
      </button>
      {!isAuthenticated && (
        <button
          className="btn btn-alt"
          onClick={() => {
            signUp(signUpOptions)
          }}
        >
          Sign Up
        </button>
      )}
    </>
  )
}
