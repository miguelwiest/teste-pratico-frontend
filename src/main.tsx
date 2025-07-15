// React
import ReactDOM from "react-dom/client";
import {
    RouterProvider,
} from "react-router";

// Providers
import {ThemeProvider} from "styled-components";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'

// Routes
import {router} from "./routes/router.tsx";

// Shared Styles
import {defaultTheme} from "./shared/styles/theme.ts";
import {GlobalStyle} from "./shared/styles/global.ts";

const root = document.getElementById("root") as HTMLElement;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

ReactDOM.createRoot(root).render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </QueryClientProvider>
);