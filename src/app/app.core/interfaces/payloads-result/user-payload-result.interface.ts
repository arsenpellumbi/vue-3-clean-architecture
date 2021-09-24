import { User } from 'oidc-client';

export type LoginPayloadResult = User | null;
export type GetUserPayloadResult = User | null;
export type SignInRedirectCallbackPayloadResult = User | null;
export type SignInSilentCallbackPayloadResult = User | null;
