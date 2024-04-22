import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GithubApi from './components/GithubApi.jsx';
const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GithubApi />
		</QueryClientProvider>
	);
}
