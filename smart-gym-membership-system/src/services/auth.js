const STORAGE_KEY = 'sgms_auth'

export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return Boolean(getSession()?.user)
}

export function getUser() {
  return getSession()?.user ?? null
}

export function login({ email, password }) {
  if (!email || !password) {
    throw new Error('Email and password are required.')
  }

  const role = email.toLowerCase().includes('admin') ? 'admin' : 'member'
  const user = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    name: role === 'admin' ? 'Admin' : 'Member',
    email,
    role,
    joinedAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }))
  return user
}

export function adminLogin({ username, password }) {
  if (!username || !password) {
    throw new Error('Username and password are required.')
  }

  const user = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    name: 'Admin',
    email: `${username}@admin.gym`,
    role: 'admin',
    joinedAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }))
  return user
}

export function register({ name, email, phone, age, gender, password }) {
  if (!name || !email || !password) {
    throw new Error('Name, email and password are required.')
  }
  // Demo-only: validate and "register"; no auto-login — user is redirected to login.
  return { name, email, phone, age, gender }
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

