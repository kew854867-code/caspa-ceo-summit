import { useEffect, useRef } from "react";
import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { ClerkProvider, Show, SignIn, SignUp, useClerk } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import SponsorshipPage from "@/pages/sponsorship";
import ProgramPage from "@/pages/program";
import UserPortalPage from "@/pages/user-portal";

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#D4AF37",
    colorForeground: "#F8FAFC",
    colorMutedForeground: "#BCC7DA",
    colorDanger: "#F87171",
    colorBackground: "#111C32",
    colorInput: "#0F172A",
    colorInputForeground: "#F8FAFC",
    colorNeutral: "#9CAAC2",
    fontFamily: "DM Sans, system-ui, sans-serif",
    borderRadius: "0px",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-[#111C32] w-[440px] max-w-full overflow-hidden border border-white/15 shadow-2xl",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-white font-serif text-2xl",
    headerSubtitle: "text-slate-300",
    socialButtonsBlockButtonText: "text-white",
    formFieldLabel: "text-slate-100",
    footerActionLink: "text-amber-400 hover:text-amber-300",
    footerActionText: "text-slate-300",
    dividerText: "text-slate-300",
    identityPreviewEditButton: "text-amber-400",
    formFieldSuccessText: "text-emerald-400",
    alertText: "text-white",
    logoBox: "flex justify-center",
    logoImage: "h-12 w-auto",
    socialButtonsBlockButton: "bg-white/5 border-white/20 hover:bg-white/10",
    formButtonPrimary: "bg-amber-500 text-slate-950 hover:bg-amber-400",
    formFieldInput: "bg-slate-950 border-white/20 text-white",
    footerAction: "bg-transparent",
    dividerLine: "bg-white/20",
    alert: "bg-red-500/10 border-red-400/30",
    otpCodeFieldInput: "bg-slate-950 border-white/20 text-white",
    formFieldRow: "gap-2",
    main: "bg-transparent",
  },
};

function SignInPage() {
  return (
    <div className="dark flex min-h-[100dvh] items-center justify-center bg-background px-4 py-24">
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
        fallbackRedirectUrl={`${basePath}/user-portal`}
      />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="dark flex min-h-[100dvh] items-center justify-center bg-background px-4 py-24">
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
        fallbackRedirectUrl={`${basePath}/user-portal`}
      />
    </div>
  );
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in"><Redirect to="/user-portal" /></Show>
      <Show when="signed-out"><Home /></Show>
    </>
  );
}

function UserPortal() {
  return (
    <>
      <Show when="signed-in"><UserPortalPage /></Show>
      <Show when="signed-out"><Redirect to="/" /></Show>
    </>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const queryClient = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        queryClient.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, queryClient]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeRedirect} />
      <Route path="/summit" component={Home} />
      <Route path="/program" component={ProgramPage} />
      <Route path="/agenda" component={ProgramPage} />
      <Route path="/sponsorship" component={SponsorshipPage} />
      <Route path="/user-portal" component={UserPortal} />
      <Route path="/sign-in/*?" component={SignInPage} />
      <Route path="/sign-up/*?" component={SignUpPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "Welcome back",
            subtitle: "Sign in to your CASPA Summit account",
          },
        },
        signUp: {
          start: {
            title: "Join the Summit",
            subtitle: "Create your CASPA Summit account",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
