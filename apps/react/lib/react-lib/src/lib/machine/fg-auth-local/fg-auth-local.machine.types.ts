import { z } from 'zod';



export const SaltFileContentFgAuthLocalParser = z.object({
  publicSalt: z.string(),
});
export type SaltFileContentFgAuthLocalParser = z.infer<typeof ProfileAuthCookieFgAuthLocalParser>;

export const ProfileAuthCookieFgAuthLocalParser = z.object({
    username: z.string(),
    email: z.string(),
    admin: z.boolean(),
    cookieLifeTime: z.string(),
    active: z.boolean(),
});
export type ProfileAuthCookieFgAuthLocal = z.infer<typeof ProfileAuthCookieFgAuthLocalParser>;

export const AuthCookieFgAuthLocalParser = z.object({
    token: z.string(),
    userSalt: z.string(),
    sharedSalt: z.string(),
    profile: ProfileAuthCookieFgAuthLocalParser
});
export type AuthCookieFgAuthLocal = z.infer<typeof AuthCookieFgAuthLocalParser>;

export const ContextFgAuthLocalParser = z.object({
  auth_cookie: AuthCookieFgAuthLocalParser.optional(),
  auth_cookie_storage_key: z.string().default('fg-auth-local-cookie'),
  error: z.string().optional(),
  salt: z.string().optional(),
  salt_filename: z.string().default('salt.json'),
  path: z.string().default('./auth-local/'),
  // token: z.string().optional(),
});

export type ContextFgAuthLocal = z.infer<typeof ContextFgAuthLocalParser>;

export const CredentialsFgAuthLocalParser = z.object({
  user: z.string(),
  password: z.string(),
});
export type CredentialsFgAuthLocal = z.infer<typeof CredentialsFgAuthLocalParser>;

export const EventFgAuthLocalLoginParser = z.object({
  type: z.literal('fg.auth.local.event.login'),
  payload: CredentialsFgAuthLocalParser
});
export type EventFgAuthLocalLogin = z.infer<typeof EventFgAuthLocalLoginParser>;

export const EventFgAuthLocalLogoutParser = z.object({
  type: z.literal('fg.auth.local.event.logout'),
});
export type EventFgAuthLocalLogout = z.infer<typeof EventFgAuthLocalLogoutParser>;

export const EventFgAuthLocalAuthorizedParser = z.object({
  type: z.literal('fg.auth.local.emitted.authorized'),
  payload: z.object({
    auth_cookie: AuthCookieFgAuthLocalParser,
  }),
});
export type EventFgAuthLocalAuthorized = z.infer<typeof EventFgAuthLocalAuthorizedParser>;

export const EventFgAuthLocalUnauthorizedParser = z.object({
  type: z.literal('fg.auth.local.emitted.unauthorized'),
});
export type EventFgAuthLocalUnauthorized = z.infer<typeof EventFgAuthLocalUnauthorizedParser>;

export const EventFgAuthLocalStopParser = z.object({
  type: z.literal('fg.auth.local.event.stop'),
});
export type EventFgAuthLocalStop = z.infer<typeof EventFgAuthLocalStopParser>;
