import { z } from 'zod';

export const fg_auth_local_salt_file_content_parser = z.object({
  public_salt: z.string(),
});
export type FG_AUTH_LOCAL_SALT_FILE = z.infer<typeof fg_auth_local_salt_file_content_parser>;

export const fg_auth_local_auth_cookie_profile_parser = z.object({
  username: z.string(),
  email: z.string(),
  admin: z.boolean(),
  cookie_life_time: z.string(),
  active: z.boolean(),
});
export type FG_AUTH_LOCAL_AUTH_COOKIE_PROFILE = z.infer<
  typeof fg_auth_local_auth_cookie_profile_parser
>;

export const fg_auth_local_auth_cookie_parser = z.object({
  token: z.string(),
  user_salt: z.string(),
  shared_salt: z.string(),
  profile: fg_auth_local_auth_cookie_profile_parser,
});
export type FG_AUTH_LOCAL_AUTH_COOKIE = z.infer<typeof fg_auth_local_auth_cookie_parser>;

export const fg_auth_local_context_parser = z.object({
  auth_cookie: fg_auth_local_auth_cookie_parser.optional(),
  auth_cookie_storage_key: z.string().default('fg-auth-local-cookie'),
  error: z.string().optional(),
  salt: z.string().optional(),
  salt_filename: z.string().default('salt.json'),
  path: z.string().default('./auth-local/'),
  // token: z.string().optional(),
});
export type FG_AUTH_LOCAL_CONTEXT = z.infer<typeof fg_auth_local_context_parser>;

export const fg_auth_local_credentials_parser = z.object({
  user: z.string(),
  password: z.string(),
});
export type FG_AUTH_LOCAL_CREDENTIALS = z.infer<
  typeof fg_auth_local_credentials_parser
>;

export const fg_auth_local_event_login_parser = z.object({
  type: z.literal('fg.auth.local.event.login'),
  data: fg_auth_local_credentials_parser,
});
export type FG_AUTH_LOCAL_EVENT_LOGIN = z.infer<typeof fg_auth_local_event_login_parser>;

export const fg_auth_local_event_logout_parser = z.object({
  type: z.literal('fg.auth.local.event.logout'),
});
export type FG_AUTH_LOCAL_EVENT_LOGOUT = z.infer<
  typeof fg_auth_local_event_logout_parser
>;

export const fg_auth_local_event_authorized_parser = z.object({
  type: z.literal('fg.auth.local.event.authorized'),
  data: z.object({
    auth_cookie: fg_auth_local_auth_cookie_parser,
  }),
});
export type FG_AUTH_LOCAL_EVENT_AUTHORIZED = z.infer<
  typeof fg_auth_local_event_authorized_parser
>;

export const fg_auth_local_event_unauthorized_parser = z.object({
  type: z.literal('fg.auth.local.event.unauthorized'),
});
export type FG_AUTH_LOCAL_EVENT_UNAUTHORIZED = z.infer<
  typeof fg_auth_local_event_unauthorized_parser
>;

export const fg_auth_local_event_stop_parser = z.object({
  type: z.literal('fg.auth.local.event.stop'),
});
export type FG_AUTH_LOCAL_EVENT_STOP = z.infer<typeof fg_auth_local_event_stop_parser>;
