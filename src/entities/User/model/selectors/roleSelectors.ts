import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../consts/userConsts';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isAdminSelector = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRole.ADMIN)));
export const isUserSelector = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRole.USER)));
