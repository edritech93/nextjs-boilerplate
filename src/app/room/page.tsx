"use client";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthService from "@/services/auth/services";

export default function Room() {
  const { profile, tokenAuth, roomId, profileChange } = useAuthService();
  const router = useRouter();

  useEffect(() => {
    if (!profile) {
      router.back();
    }
  }, [profile, router]);

  if (tokenAuth) {
    return (
      <JitsiMeeting
        domain={"meet.tanyoapp.com"}
        roomName={`Tanyo-Room-${roomId}`}
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          deeplinking: {
            // If true, any checks to handoff to another application will be prevented
            // and instead the app will continue to display in the current browser.
            disabled: true,
          },
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: profile?.fullname ?? "",
          email: profile?.email ?? "",
        }}
        onApiReady={(externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
        }}
        onReadyToClose={() => {
          profileChange(null);
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100vh";
        }}
      />
    );
  } else {
    return null;
  }
}
