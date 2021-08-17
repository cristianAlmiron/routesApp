import React, { createContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import { Platform } from "react-native";
import { PermissionStatus, check, request, PERMISSIONS, openSettings } from 'react-native-permissions';

export interface PermissionState {
    locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionState = {
    locationStatus: 'unavailable',
}

type PermissionContextProps = {
    permissions: PermissionState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionContextProps);

export const PermissionsProvider = ({ children }: any) => {
    const [permissions, setPermissions] = useState(permissionInitState);

    useEffect(() => {
        AppState.addEventListener('change', state => {
            if (state !== 'active') return
            checkLocationPermission();
        });
    }, [])

    const askLocationPermission = async () => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if (permissionStatus === 'blocked') {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        })
    };

    const checkLocationPermission = async () => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        })
    };

    return (<PermissionsContext.Provider value={{
        permissions,
        askLocationPermission,
        checkLocationPermission
    }}>
        {children}
    </PermissionsContext.Provider>)
}