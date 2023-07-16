import { useNhostClient } from "@nhost/vue";
import type { AuthErrorPayload } from "@nhost/hasura-auth-js";

export default function () {
  const { nhost } = useNhostClient();

  const isLoading = useState(() => false);
  const isSuccess = useState(() => false);
  const isError = useState(() => false);
  const error = useState<AuthErrorPayload | null>(() => null);

  const signInSecurityKey = async (email: string) => {
    isLoading.value = true;

    const { error: nhostError, session, } = await nhost.auth.signIn({
      email,
      securityKey: true,
    });

    isLoading.value = false;
    error.value = nhostError;
    isError.value = !!error;
    isSuccess.value = !error && !!session;
  };

  return {
    signInSecurityKey,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
