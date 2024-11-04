
# Pokemon License
The Pokémon Trainer License Project is an engaging web application that enables users to create a personalized Pokémon Trainer License. Users can input personal information, select their favorite Pokémon from the Pokémon API, and generate a custom license using HTML Canvas. The application integrates with AWS services for backend processing, image storage, and optional user data storage.

## features
1. User Input Form: Input fields for trainer name, age (18+), region selection, and a Pokémon selection dropdown.
1. Pokémon API Integration: Fetch Pokémon data (sprite, height, weight) to display on the license.
1. License Generation: Create and download a Pokémon Trainer License using HTML Canvas.
1. AWS Integration: Utilize AWS Lambda for backend logic, AWS S3 for image storage, and AWS DynamoDB for optional user data storage.

## Prerequisites
1. Node.js and npm: Ensure Node.js is installed on your system.
1. Git: Installed for version control.
1. API Access: Access to the Pokémon API for fetching Pokémon data.

## Project setup instructions
> **Important**
> * Emphasizing that this is only done once, unless u need to clone this project on another device


1. Clone the Repository
    * To clone the repository to your local machine, run the following command: 
```
git clone https://github.com/ejagojo/pokemon-license-CloudComp.git
```

2. Navigate to the Project Directory
    * Move into the project directory:
```
cd pokemon-license-CloudComp
```

3. In your project directory, you now have to install the project dependencies
    * copy and paste the following command in your project directory's terminal
```
npm i
```

4. Now you can start the development server
    * You can start by using the following command
```
npm start
```


## Instructions on maintaining project flow
> **Important**
> * When device already has cloned repo, there is no need to reclone.

* Upon openning up your project or knowing that someone made changes to the repository. Regularly pull changes
      * Use the following command
```
git pull origin main
```

## Pushing changes to the main branch
> **Important**
> * Do the following if you are done with your designated tasks.

The following are instructions to push changes from your device onto Github
1. "Add you changes" - this essentially adds a change in the working directory to the staging area
   * Use the following command
```
git add .
```

2. Commit a message for added changes
   * This can be any message but its good practice to input the feature/task you just acciomplished - an example is finishing up ui changes ```git commit -m "changed navbar style"```
```
git commit -m "Commit message"
```

3. Push changes to Github
   * This would post your commited changes to Github
```
git push -u origin main
```
