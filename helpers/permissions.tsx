/* Permissions */
import {PERMISSIONS, check, RESULTS, request} from 'react-native-permissions';
import {Platform} from 'react-native';

/*
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
 */

// Permissions that are equivalent for both platforms
const PLATFORM_CAMERA_PERMISSIONS = {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
}

const PLATFORM_RECORDAUDIO_PERMISSIONS = {
    ios: PERMISSIONS.IOS.MICROPHONE, // Not sure if this is the equivalent
    android: PERMISSIONS.ANDROID.RECORD_AUDIO
}

const PLATFORM_PHOTO_PERMISSIONS = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
}

const REQUEST_PERMISSION_TYPE = {
    microphone: PLATFORM_RECORDAUDIO_PERMISSIONS,
    photo: PLATFORM_PHOTO_PERMISSIONS
}

const PERMISSION_TYPE = {
    microphone: 'microphone',
    photo: 'photo'
}

class AppPermissions {

    checkPermission = async (type): Promise<boolean> => {
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]

        // If we already have permission to do this, exit
        if (!permissions) {
            return true
        }
        try {
            const result = await check(permissions)

            if (result === RESULTS.GRANTED) 
                return true;

            return this.requestPermission(permissions); //Attempt to request permission
        } 

        catch (error) {
            console.log("checkPermission failed with error: ", error);
            return false;
        }
    }

    requestPermission = async (permissions): Promise<boolean> => {
        try {
            const result = await request(permissions); 
            return result === RESULTS.GRANTED;
        }

        catch (error)
        {
            console.log("requestPermission failed with error: ", error); 
            return false;
        }
    }

}

const Permission = new AppPermissions()
export {Permission, PERMISSION_TYPE};