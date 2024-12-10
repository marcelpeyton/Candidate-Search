const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log(`VITE_GITHUB_TOKEN: ${import.meta.env.VITE_GITHUB_TOKEN}`);
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,         
        },
      }
    );
    //console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    //console.log('Data:', data);
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  console.log(`VITE_GITHUB_TOKEN: ${import.meta.env.VITE_GITHUB_TOKEN}`);
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {    
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,       
      },
    });
    console.log(`Response from SearchGitHubUser ${JSON.stringify(response)} | Occurred when search for ${username} username`)
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
