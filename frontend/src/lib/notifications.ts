import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { supabase } from './supabase';

// 포그라운드에서도 배너/목록 표시
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * 알림 권한 요청 후 Expo push token을 발급받아 push_tokens에 upsert.
 * - 시뮬레이터/에뮬레이터에서는 원격 푸시 토큰이 발급되지 않아 조용히 스킵.
 * - profiles 행이 있어야 FK가 통과하므로 닉네임 설정 이후 호출.
 */
export async function registerForPushNotifications(deviceId: string): Promise<void> {
  if (!Device.isDevice) return;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: '기본',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let status = existing;
  if (existing !== 'granted') {
    const req = await Notifications.requestPermissionsAsync();
    status = req.status;
  }
  if (status !== 'granted') return;

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;

  try {
    const tokenResp = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined,
    );
    await supabase.from('push_tokens').upsert({
      device_id: deviceId,
      expo_push_token: tokenResp.data,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {
    console.warn('[Loopin] push token 등록 실패:', e);
  }
}
