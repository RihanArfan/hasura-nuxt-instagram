import { useNhostClient } from "@nhost/vue";
import type { AuthErrorPayload } from "@nhost/hasura-auth-js";

export default function () {
  const { nhost } = useNhostClient();

  const isLoading = useState(() => false);
  const isSuccess = useState(() => false);
  const isError = useState(() => false);
  const error = useState<AuthErrorPayload | null>(() => null);

  const signUpSecurityKey = async ({
    name,
    email,
    phone,
  }: {
    name: string;
    email: string;
    phone: string;
  }) => {
    isLoading.value = true;

    const { error: nhostError, session } = await nhost.auth.signUp({
      email,
      securityKey: true,
      options: {
        displayName: name,
      },
    });

    isLoading.value = false;
    error.value = nhostError;
    isError.value = !!error;
    isSuccess.value = !error && !!session;
  };

  return {
    signUpSecurityKey,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
