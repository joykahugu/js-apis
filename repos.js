import 'dotenv/config'
const token = process.env.GITHUB_TOKEN;
async function getAllRepos() {
    let allRepos = []; //creating an array with all repos 
    let page = 1;
    const perPage = 100; //limit of repos per page 

    while (true) {
        const response = await fetch(`https://api.github.com/user/repos?per_page=${perPage}&page=${page}`, { //? is a query 
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json"
            }
        });

        if (!response.ok) {
            console.log("Error fetching user data: ", response.statusText);
            break;//to prevent looping if there's an error or access denied 
        }


        const repos = await response.json();

        if (repos.length === 0) {
            break;
        }

        allRepos = allRepos.concat(repos);
        page++

        console.log(`Total repos: ${allRepos.length}`)
        repos.forEach(repo => {
            console.log(`${repo.name}: ${repo.html_url}`);
        })
    }


}

getAllRepos();