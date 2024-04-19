import { useQuery } from "@tanstack/react-query";

const githubRepositoriesName = ["eslint/eslint", "repo/test", "babel/babel"];

export default function GithubApi() {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["github"],
    queryFn: () =>
      Promise.all(
        githubRepositoriesName.map((repositoryName) =>
          fetch(`https://api.github.com/repos/${repositoryName}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Not Found");
              }
              return response.json();
            })
            .catch((error) => ({
              error: true,
              message: error.message,
              full_name: repositoryName,
            }))
        )
      ),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      {data.map((repository, index) => (
        <div key={index}>
          <h3>{repository.full_name}</h3>
          <p>{repository.description}</p>
          {repository.error && <p>Error: {repository.message}</p>}
          {repository.stargazers_count && (
            <p>Stars: {repository.stargazers_count}</p>
          )}
        </div>
      ))}
    </div>
  );
}
