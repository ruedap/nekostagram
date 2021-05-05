import { useAuth } from '@redwoodjs/auth'
import React from 'react'
import { LogInOutButtons } from './LogInOutButtons'
// import Badge from 'src/components/Badge'

export const FirebaseAuthProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const provider = 'github.com'
  const { isAuthenticated } = useAuth()

  return (
    <>
      <LogInOutButtons logInOptions={provider} signUpOptions={provider} />
      {isAuthenticated && <div>{children} </div>}
    </>
  )
}
