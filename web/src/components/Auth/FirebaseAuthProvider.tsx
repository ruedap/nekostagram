import { useAuth } from '@redwoodjs/auth'
import React from 'react'
import { LogInOutButtons } from './LogInOutButtons'

export const FirebaseAuthProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const provider = 'github.com'
  const { isAuthenticated, currentUser } = useAuth()
  // TODO
  const adminUserEmail = 'ruedap@ruedap.com'
  const isAdminUser = adminUserEmail === currentUser?.email

  return (
    <>
      <LogInOutButtons logInOptions={provider} signUpOptions={provider} />
      {isAuthenticated && isAdminUser && children}
    </>
  )
}
