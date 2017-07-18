export function requireAuth(user) {
  if (!user || !user._id) {
    throw new Error('Unauthorized');
  }
}
