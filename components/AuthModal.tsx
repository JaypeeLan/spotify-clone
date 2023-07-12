"use client";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <>
      <Modal
        description="login to your account"
        isOpen={isOpen}
        onChange={onChange}
        title="welcome back"
      >
        <Auth
          theme="dark"
          magicLink
          supabaseClient={supabaseClient}
          providers={["github", "google"]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#404040",
                  brandAccent: "#22c55e",
                },
              },
            },
          }}
        />
      </Modal>
    </>
  );
};

export default AuthModal;
