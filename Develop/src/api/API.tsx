import { Candidate } from '../interfaces/Candidate.interface';

const searchGithub = async (): Promise<Candidate[]> => {
  try {
    console.log("GitHub Token:", import.meta.env.VITE_GITHUB_TOKEN);

    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API Error:', errorData);
      throw new Error(`GitHub API Error: ${errorData.message}`);
    }
    
    const users = await response.json();
    
    // Get detailed information for each user
    const detailedUsers = await Promise.all(
      users.map((user: any) => searchGithubUser(user.login))
    );
    
    return detailedUsers.filter(user => user && user.id) as Candidate[];
  } catch (err) {
    console.error('Error fetching data:', err);
    return [];
  }
};

const searchGithubUser = async (username: string): Promise<Candidate | null> => {
  try {
    console.log("GitHub Token:", import.meta.env.VITE_GITHUB_TOKEN);
    
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Invalid API response, check network tab');
    }
    
    const data = await response.json();
    return data as Candidate;
  } catch (err) {
    console.error('Error fetching user data:', err);
    return null;
  }
};

export { searchGithub, searchGithubUser };