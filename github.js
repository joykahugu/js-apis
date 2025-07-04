import 'dotenv/config'
const token = process.env.GITHUB_TOKEN; //AUTHORIZATION TOKEN
async function getGitHubUser() {
    const response = await fetch("https://api.github.com/user/repos", {
        headers: {     //how to authorize using toke, include it as an argument of fetch
            Authorization: `token ${token}` 
        }
    });


    if (!response.ok) { //if response is not ok 
        console.log("Error fetching user data: ", response.statusText);
        return;
    }

    const data = await response.json(); //since it's a function that calls data from json file
    data.forEach(repo => {
        console.log(`${repo.name}: ${repo.html_url}`);
    })
}

getGitHubUser();
