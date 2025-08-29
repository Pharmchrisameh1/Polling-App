import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
useEffect(() => {
const init = async () => {
try {
if (!useMock) {
const { data: { session } } = await supabase.auth.getSession()
setUser(session?.user ? { id: session.user.id, email: session.user.email } : null)
supabase.auth.onAuthStateChange((_event, session) => {
setUser(session?.user ? { id: session.user.id, email: session.user.email } : null)
})
} else {
// Mock session persists in memory only
const cached = (globalThis as any).__mock_user as User | undefined
if (cached) setUser(cached)
}
} finally {
setLoading(false)
}
}
init()
}, [useMock])


const login = async (email: string, password: string) => {
if (useMock) {
await new Promise((r) => setTimeout(r, 600))
const fake: User = { id: 'mock-user', email }
;(globalThis as any).__mock_user = fake
setUser(fake)
return
}
const { error, data } = await supabase.auth.signInWithPassword({ email, password })
if (error) throw error
setUser(data.user ? { id: data.user.id, email: data.user.email } : null)
}


const register = async (email: string, password: string) => {
if (useMock) {
await new Promise((r) => setTimeout(r, 600))
const fake: User = { id: 'mock-user', email }
;(globalThis as any).__mock_user = fake
setUser(fake)
return
}
const { error, data } = await supabase.auth.signUp({ email, password })
if (error) throw error
setUser(data.user ? { id: data.user.id, email: data.user.email } : null)
}


const logout = async () => {
if (useMock) {
delete (globalThis as any).__mock_user
setUser(null)
return
}
await supabase.auth.signOut()
setUser(null)
}


const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading])
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth = () => {
const ctx = useContext(AuthContext)
if (!ctx) throw new Error('useAuth must be used within AuthProvider')
return ctx
}
